import { buildSrc, upload } from "@imagekit/javascript";

export const IMAGEKIT_PUBLIC_KEY = "public_HfPCnEfXY7ev27BPnAxffR7pSFk=";
export const IMAGEKIT_URL_ENDPOINT = "https://ik.imagekit.io/h2batters";

/**
 * Get a transformed ImageKit URL
 */
export const getImageKitUrl = (path: string, width?: number, height?: number) => {
  if (!path) return "";
  if (path.startsWith("/") || (path.startsWith("http") && !path.includes("ik.imagekit.io"))) return path;

  const cleanPath = path.replace(IMAGEKIT_URL_ENDPOINT, "");
  const transformation: any[] = [{ quality: "80" }];
  if (width) transformation.push({ width: String(width) });
  if (height) transformation.push({ height: String(height) });

  return buildSrc({
    urlEndpoint: IMAGEKIT_URL_ENDPOINT,
    src: cleanPath,
    transformation,
  });
};

/**
 * Securely upload a file to ImageKit
 */
export const uploadFile = async (file: File | Blob, folder: string = "general") => {
  const fileName = (file as File).name || `upload_${Date.now()}`;
  
  console.log(`[ImageKit] Starting upload for ${fileName}...`);
  
  try {
    // 1. Fetch authentication parameters from our Vite/Backend API
    console.log("[ImageKit] Fetching auth parameters from /api/imagekit-auth...");
    const response = await fetch("/api/imagekit-auth");
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Auth server returned ${response.status}`);
    }

    const authData = await response.json();
    
    // Debug validation as requested
    console.log("[ImageKit] Auth Response Received:", {
      token: authData.token ? "PRESENT" : "MISSING",
      signature: authData.signature ? "PRESENT" : "MISSING",
      expire: authData.expire ? "PRESENT" : "MISSING",
    });

    if (!authData.token || !authData.signature || !authData.expire) {
      throw new Error("Invalid authentication data received from server");
    }

    // 2. Perform the actual upload
    console.log("[ImageKit] Uploading to ImageKit...");
    const result = await upload({
      file,
      fileName,
      publicKey: IMAGEKIT_PUBLIC_KEY,
      signature: authData.signature,
      expire: authData.expire,
      token: authData.token,
      folder,
      useUniqueFileName: true,
    });

    console.log("[ImageKit] Upload successful:", (result as any).url);

    return {
      ...result,
      secure_url: (result as any).url,
    };
  } catch (error: any) {
    console.error("[ImageKit] Upload failed:", error.message);
    throw new Error(`Upload failed: ${error.message}`);
  }
};
