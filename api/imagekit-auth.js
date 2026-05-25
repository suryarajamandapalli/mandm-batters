import ImageKit from "imagekit";

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const IMAGEKIT_PRIVATE_KEY = process.env.IMAGEKIT_PRIVATE_KEY;
  const IMAGEKIT_PUBLIC_KEY = "public_HfPCnEfXY7ev27BPnAxffR7pSFk=";
  const IMAGEKIT_URL_ENDPOINT = "https://ik.imagekit.io/h2batters";

  if (!IMAGEKIT_PRIVATE_KEY) {
    res.status(500).json({ error: "IMAGEKIT_PRIVATE_KEY is not configured" });
    return;
  }

  const ik = new ImageKit({
    publicKey: IMAGEKIT_PUBLIC_KEY,
    privateKey: IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: IMAGEKIT_URL_ENDPOINT,
  });

  const params = ik.getAuthenticationParameters();
  res.status(200).json(params);
}
