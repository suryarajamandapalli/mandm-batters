import { defineConfig, loadEnv } from "vite";
import { defineConfig as defineLovableConfig } from "@lovable.dev/vite-tanstack-config";
import ImageKit from "@imagekit/nodejs";
import crypto from "crypto";

export default defineLovableConfig({
  cloudflare: false,
  tanstackStart: {
    ssr: true,
    server: {
      preset: 'vercel'
    }
  },
  vite: {
    plugins: [
      {
        name: 'imagekit-auth-provider',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === '/api/imagekit-auth') {
              const env = loadEnv('', process.cwd(), '');
              
              const privateKey = env.IMAGEKIT_PRIVATE_KEY;
              const publicKey = "public_HfPCnEfXY7ev27BPnAxffR7pSFk=";
              const urlEndpoint = "https://ik.imagekit.io/h2batters";

              if (!privateKey) {
                console.error("[ImageKit-Auth] ERROR: IMAGEKIT_PRIVATE_KEY is missing in .env");
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: "IMAGEKIT_PRIVATE_KEY is missing in .env" }));
                return;
              }

              try {
                // Initialize the official Node.js SDK
                const ik = new ImageKit({
                  publicKey,
                  privateKey,
                  urlEndpoint,
                });

                // Use the correct method path for the latest Node SDK version
                const authData = ik.helper.getAuthenticationParameters();
                
                console.log("[ImageKit-Auth] SUCCESS: Generated parameters for upload.");
                
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(authData));
                return;
              } catch (error: any) {
                console.error("[ImageKit-Auth] ERROR during parameter generation:", error);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: error.message || "ImageKit generation failed" }));
                return;
              }
            }

            if (req.url && req.url.startsWith('/api/cloudinary-signature')) {
              const env = loadEnv('', process.cwd(), '');
              const urlObj = new URL(req.url, 'http://localhost');
              const timestamp = urlObj.searchParams.get("timestamp");
              const folder = urlObj.searchParams.get("folder");
              
              const apiSecret = env.CLOUDINARY_API_SECRET || "bicBB1MGL4hBSyq6_TjM1SvqJyc";
              
              if (!timestamp) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: "timestamp is required" }));
                return;
              }
              
              const params: Record<string, string> = {};
              if (folder) params.folder = folder;
              params.timestamp = timestamp;
              
              const sortedKeys = Object.keys(params).sort();
              const paramString = sortedKeys.map(key => `${key}=${params[key]}`).join("&");
              const stringToSign = paramString + apiSecret;
              
              const signature = crypto.createHash("sha1").update(stringToSign).digest("hex");
              
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ signature }));
              return;
            }

            next();
          });
        }
      }
    ]
  }
});
