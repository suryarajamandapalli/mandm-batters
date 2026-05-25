// build-vercel.mjs — Constructs the Vercel Build Output API
// Bundles the TanStack Start SSR server with esbuild into a single file

import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const OUTPUT = path.join(ROOT, ".vercel", "output");

// Step 1 — Run vite build
console.log("▶  Running vite build…");
execSync("npx vite build", { stdio: "inherit", cwd: ROOT });

// Step 2 — Remove previous output (keep project.json)
const projectJsonPath = path.join(ROOT, ".vercel", "project.json");
let projectJson = null;
if (fs.existsSync(projectJsonPath)) {
  projectJson = fs.readFileSync(projectJsonPath, "utf-8");
}
if (fs.existsSync(OUTPUT)) {
  fs.rmSync(OUTPUT, { recursive: true });
}
if (projectJson) {
  fs.mkdirSync(path.dirname(projectJsonPath), { recursive: true });
  fs.writeFileSync(projectJsonPath, projectJson);
}

// Step 3 — Create output dirs
const staticDir = path.join(OUTPUT, "static");
const fnDir = path.join(OUTPUT, "functions", "__ssr.func");
fs.mkdirSync(staticDir, { recursive: true });
fs.mkdirSync(fnDir, { recursive: true });

// Step 4 — Copy static assets
function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    entry.isDirectory() ? copyDirSync(s, d) : fs.copyFileSync(s, d);
  }
}

const clientDir = path.join(ROOT, "dist", "client");
if (fs.existsSync(clientDir)) {
  copyDirSync(clientDir, staticDir);
  console.log("✔  Copied static assets");
}

// Step 5 — Create entry wrapper that imports the server
const wrapperPath = path.join(ROOT, ".vercel", "_entry.mjs");
fs.writeFileSync(wrapperPath, `
import { Readable } from 'node:stream';
import server from '../dist/server/server.js';

export default async function handler(req, res) {
  try {
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
    const url = new URL(req.url || '/', protocol + '://' + host);

    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value) {
        if (Array.isArray(value)) {
          for (const v of value) headers.append(key, v);
        } else {
          headers.set(key, value);
        }
      }
    }

    let body = undefined;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      body = Readable.toWeb(Readable.from(req));
    }

    const request = new Request(url.toString(), {
      method: req.method,
      headers,
      body,
      duplex: 'half',
    });

    const response = await server.fetch(request);

    res.statusCode = response.status;
    for (const [key, value] of response.headers) {
      res.appendHeader(key, value);
    }

    if (response.body) {
      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
      res.end();
    } else {
      const text = await response.text();
      res.end(text);
    }
  } catch (error) {
    console.error('SSR Error:', error);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
}
`.trim());

// Step 6 — Bundle with esbuild into a single file
console.log("▶  Bundling server with esbuild…");
execSync(
  `npx esbuild "${wrapperPath}" --bundle --platform=node --format=esm --outfile="${path.join(fnDir, "index.mjs")}" --external:node:* --target=node22 --minify`,
  { stdio: "inherit", cwd: ROOT }
);
console.log("✔  Bundled server function");

// Cleanup temp wrapper
fs.unlinkSync(wrapperPath);

// Step 7 — .vc-config.json
fs.writeFileSync(
  path.join(fnDir, ".vc-config.json"),
  JSON.stringify({
    runtime: "nodejs22.x",
    handler: "index.mjs",
    launcherType: "Nodejs",
    shouldAddHelpers: true,
    shouldAddSourcemapSupport: false,
    maxDuration: 30,
  }, null, 2)
);
console.log("✔  Created .vc-config.json");

// Step 8 — package.json for the function
fs.writeFileSync(path.join(fnDir, "package.json"), JSON.stringify({ type: "module" }, null, 2));

// Step 9 — config.json with routes
fs.writeFileSync(
  path.join(OUTPUT, "config.json"),
  JSON.stringify({
    version: 3,
    routes: [
      { src: "^/api/imagekit-auth$", dest: "/api/imagekit-auth" },
      { src: "^/api/cloudinary-signature(.*)$", dest: "/api/cloudinary-signature$1" },
      { handle: "filesystem" },
      { src: "/(.*)", dest: "/__ssr" },
    ],
  }, null, 2)
);
console.log("✔  Created config.json");

// Step 10 — API functions
const apiSrcDir = path.join(ROOT, "api");
if (fs.existsSync(apiSrcDir)) {
  for (const file of fs.readdirSync(apiSrcDir)) {
    if (file.endsWith(".js")) {
      const name = file.replace(".js", "");
      const fd = path.join(OUTPUT, "functions", "api", `${name}.func`);
      fs.mkdirSync(fd, { recursive: true });
      fs.copyFileSync(path.join(apiSrcDir, file), path.join(fd, "index.js"));
      fs.writeFileSync(path.join(fd, ".vc-config.json"), JSON.stringify({
        runtime: "nodejs22.x", handler: "index.js", launcherType: "Nodejs",
      }, null, 2));
      console.log(`✔  API function: ${name}`);
    }
  }
}

console.log("\n🚀  Vercel Build Output ready!");
