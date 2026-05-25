/**
 * Securely upload a file to Cloudinary using signed uploads
 */
export const uploadFile = async (file: File | Blob, folder: string = "general") => {
  const fileName = (file as File).name || `upload_${Date.now()}`;
  
  console.log(`[Cloudinary] Starting upload for ${fileName}...`);
  
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const cloudName = "deuwphbza";
    const apiKey = "856997818562238";

    // 1. Fetch signature from our signature endpoint
    const response = await fetch(`/api/cloudinary-signature?timestamp=${timestamp}&folder=${folder}`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Signature server returned ${response.status}`);
    }

    const { signature } = await response.json();

    // 2. Perform upload to Cloudinary API (using auto/upload to support both image and voice notes)
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", apiKey);
    formData.append("timestamp", String(timestamp));
    formData.append("signature", signature);
    formData.append("folder", folder);

    console.log("[Cloudinary] Uploading to Cloudinary...");
    const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
      method: "POST",
      body: formData,
    });

    if (!uploadResponse.ok) {
      const errorData = await uploadResponse.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `Cloudinary returned status ${uploadResponse.status}`);
    }

    const result = await uploadResponse.json();
    console.log("[Cloudinary] Upload successful:", result.secure_url);

    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error: any) {
    console.error("[Cloudinary] Upload failed:", error.message);
    throw new Error(`Upload failed: ${error.message}`);
  }
};
