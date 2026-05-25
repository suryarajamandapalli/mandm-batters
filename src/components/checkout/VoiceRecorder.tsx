import { useRef, useState } from "react";
import { Mic, Square, Play, Trash2, Pause } from "lucide-react";

export function VoiceRecorder({
  onChange,
}: {
  onChange: (blob: Blob | null) => void;
}) {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<number | null>(null);

  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      chunksRef.current = [];
      mr.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      mr.onstop = () => {
        // Try multiple MIME types for better mobile compatibility (iOS vs Android)
        const types = ["audio/webm", "audio/mp4", "audio/ogg", "audio/wav", "audio/aac"];
        const type = types.find(t => MediaRecorder.isTypeSupported(t)) || "audio/webm";
        
        const blob = new Blob(chunksRef.current, { type });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        onChange(blob);
        stream.getTracks().forEach((t) => t.stop());
      };
      mr.start();
      mediaRecorderRef.current = mr;
      setRecording(true);
      setDuration(0);
      timerRef.current = window.setInterval(() => {
        setDuration((d) => d + 1);
      }, 1000);
    } catch {
      alert("Microphone permission required to record a voice note.");
    }
  };

  const stop = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const remove = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setDuration(0);
    onChange(null);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const fmt = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="space-y-2">
      <div className="text-sm font-semibold text-navy">
        Voice Note <span className="font-normal text-muted-foreground">(optional)</span>
      </div>

      {!audioUrl ? (
        <button
          type="button"
          onClick={recording ? stop : start}
          className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl border-2 border-dashed transition-colors ${
            recording
              ? "border-destructive bg-destructive/5 text-destructive"
              : "border-border hover:border-orange hover:bg-orange/5 text-foreground"
          }`}
        >
          {recording ? (
            <>
              <Square className="size-4 fill-current" />
              <span className="font-semibold">Stop recording · {fmt(duration)}</span>
              <span className="size-2 rounded-full bg-destructive animate-pulse" />
            </>
          ) : (
            <>
              <Mic className="size-4" />
              <span className="font-semibold">Tap to record voice note</span>
            </>
          )}
        </button>
      ) : (
        <div className="flex items-center gap-3 bg-secondary/60 rounded-xl p-3">
          <button
            type="button"
            onClick={togglePlay}
            className="size-10 rounded-full bg-orange text-navy grid place-items-center"
          >
            {playing ? <Pause className="size-4" /> : <Play className="size-4 ml-0.5" />}
          </button>
          <div className="flex-1 text-sm">
            <div className="font-semibold text-navy">Voice note recorded</div>
            <div className="text-xs text-muted-foreground">{fmt(duration)}</div>
          </div>
          <button
            type="button"
            onClick={remove}
            className="size-9 rounded-full bg-background hover:bg-destructive hover:text-white grid place-items-center text-muted-foreground transition-colors"
            aria-label="Delete recording"
          >
            <Trash2 className="size-4" />
          </button>
          <audio
            ref={audioRef}
            src={audioUrl}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
}
