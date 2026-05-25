import ImageKit from "imagekit";

export async function onRequestGet(context) {
  const { env } = context;
  
  const IMAGEKIT_PRIVATE_KEY = env.IMAGEKIT_PRIVATE_KEY;
  const IMAGEKIT_PUBLIC_KEY = "public_HfPCnEfXY7ev27BPnAxffR7pSFk=";
  const IMAGEKIT_URL_ENDPOINT = "https://ik.imagekit.io/h2batters";

  if (!IMAGEKIT_PRIVATE_KEY) {
    return new Response(JSON.stringify({ error: "IMAGEKIT_PRIVATE_KEY not set in Cloudflare" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  const ik = new ImageKit({
    publicKey: IMAGEKIT_PUBLIC_KEY,
    privateKey: IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: IMAGEKIT_URL_ENDPOINT,
  });

  const params = ik.getAuthenticationParameters();
  
  return new Response(JSON.stringify(params), {
    headers: { "Content-Type": "application/json" }
  });
}
