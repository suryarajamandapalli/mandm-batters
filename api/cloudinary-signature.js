import crypto from "crypto";

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const { timestamp, folder } = req.query;
  const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || "bicBB1MGL4hBSyq6_TjM1SvqJyc";

  if (!timestamp) {
    res.status(400).json({ error: "timestamp query parameter is required" });
    return;
  }

  const params = {};
  if (folder) params.folder = folder;
  params.timestamp = timestamp;

  const sortedKeys = Object.keys(params).sort();
  const paramString = sortedKeys.map(key => `${key}=${params[key]}`).join("&");
  const stringToSign = paramString + CLOUDINARY_API_SECRET;

  const signature = crypto.createHash("sha1").update(stringToSign).digest("hex");

  res.status(200).json({ signature });
}
