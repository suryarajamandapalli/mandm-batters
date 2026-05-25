import { useState, useRef } from "react";
import { Link, X, Image as ImageIcon, Video, CheckCircle, Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { uploadFile } from "@/lib/cloudinary";

type MediaType = "image" | "video" | "any";

interface MediaUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  mediaType?: MediaType;
  className?: string;
  /** Called when user clears the current value */
  onClear?: () => void;
  folder?: string;
}

export function MediaUpload({
  value,
  onChange,
  label = "Media",
  mediaType = "image",
  className = "",
  onClear,
  folder = "cms",
}: MediaUploadProps) {
  const [urlInput, setUrlInput] = useState(value || "");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isVideo = mediaType === "video" || (value && /\.(mp4|webm|mov|ogg)$/i.test(value)) || (value && value.includes("youtube.com"));

  const handleUrlApply = () => {
    if (!urlInput.trim()) return;
    onChange(urlInput.trim());
    toast.success(`${label} URL applied!`);
  };

  const handleClear = () => {
    onChange("");
    setUrlInput("");
    onClear?.();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic validation
    if (mediaType === "image" && !file.type.startsWith("image/")) {
      toast.error("Please upload an image file.");
      return;
    }
    if (mediaType === "video" && !file.type.startsWith("video/")) {
      toast.error("Please upload a video file.");
      return;
    }

    setIsUploading(true);
    const toastId = toast.loading(`Uploading ${label}...`);

    try {
      const result = await uploadFile(file, folder);
      onChange(result.secure_url);
      toast.success(`${label} uploaded successfully!`, { id: toastId });
    } catch (error: any) {
      console.error("Upload failed:", error);
      toast.error(`Upload failed: ${error.message || "Unknown error"}`, { id: toastId });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <label className="text-xs font-bold uppercase text-muted-foreground block">{label}</label>

      {/* Preview */}
      {value ? (
        <div className="relative rounded-2xl overflow-hidden bg-secondary border border-border group">
          {isVideo ? (
            <div className="aspect-video w-full bg-black flex items-center justify-center">
              {value.includes("youtube.com") || value.includes("youtu.be") ? (
                <Video className="size-10 text-white/20" />
              ) : (
                <video
                  src={value}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                />
              )}
            </div>
          ) : (
            <img
              src={value}
              alt={label}
              className="w-full aspect-video object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleClear}
              className="bg-red-500 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-red-600 transition-colors shadow-lg"
            >
              <X className="size-4" /> Remove
            </button>
          </div>
        </div>
      ) : (
        <div className="border border-border rounded-2xl overflow-hidden bg-secondary/30 p-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-border hover:border-orange hover:bg-orange/5 transition-all group"
            >
              {isUploading ? (
                <Loader2 className="size-6 text-orange animate-spin" />
              ) : (
                <Upload className="size-6 text-muted-foreground group-hover:text-orange" />
              )}
              <span className="text-xs font-bold text-navy">Upload File</span>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept={mediaType === "image" ? "image/*" : mediaType === "video" ? "video/*" : "*/*"}
              />
            </button>

            <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-border">
              <Link className="size-6 text-muted-foreground" />
              <span className="text-xs font-bold text-navy">Paste Link</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder={mediaType === "video" ? "YouTube or MP4 link" : "Image URL (PNG, JPG, etc.)"}
                className="w-full border rounded-xl p-3 pr-12 text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 bg-white"
                onKeyDown={(e) => e.key === "Enter" && handleUrlApply()}
              />
              <button
                type="button"
                onClick={handleUrlApply}
                disabled={!urlInput.trim() || isUploading}
                className="absolute right-2 top-1/2 -translate-y-1/2 size-8 bg-navy text-white rounded-lg flex items-center justify-center hover:bg-orange transition-colors disabled:opacity-40"
              >
                <CheckCircle className="size-4" />
              </button>
            </div>
            <p className="text-[10px] text-muted-foreground text-center">
              Powered by <strong>Cloudinary</strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

