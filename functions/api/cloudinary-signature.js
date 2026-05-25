export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const timestamp = url.searchParams.get("timestamp");
  const folder = url.searchParams.get("folder");

  const CLOUDINARY_API_SECRET = env.CLOUDINARY_API_SECRET || "bicBB1MGL4hBSyq6_TjM1SvqJyc";

  if (!timestamp) {
    return new Response(JSON.stringify({ error: "timestamp query parameter is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  const params = {};
  if (folder) params.folder = folder;
  params.timestamp = timestamp;

  // Sort keys alphabetically and construct the string to sign
  const sortedKeys = Object.keys(params).sort();
  const paramString = sortedKeys.map(key => `${key}=${params[key]}`).join("&");
  const stringToSign = paramString + CLOUDINARY_API_SECRET;

  // Compute SHA-1 hash using Web Crypto API
  const utf8 = new TextEncoder().encode(stringToSign);
  const hashBuffer = await crypto.subtle.digest("SHA-1", utf8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const signature = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

  return new Response(JSON.stringify({ signature }), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }
  });
}
