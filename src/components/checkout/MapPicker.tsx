import { useEffect, useRef, useState } from "react";
import { MapPin, Loader2, Crosshair } from "lucide-react";
import L from "leaflet";
import { toast } from "sonner";

// Fix default Leaflet icon paths in bundled environments
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export type Location = {
  lat: number;
  lng: number;
  address?: string;
};

export function MapPicker({
  location,
  onChange,
}: {
  location: Location | null;
  onChange: (loc: Location) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [detecting, setDetecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialise map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const initial: [number, number] = location
      ? [location.lat, location.lng]
      : [16.99938, 81.79770]; // Rajahmundry fallback

    const map = L.map(containerRef.current, {
      center: initial,
      zoom: location ? 16 : 12,
      scrollWheelZoom: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(map);

    const marker = L.marker(initial, { draggable: true, icon: DefaultIcon }).addTo(
      map,
    );
    marker.on("dragend", async () => {
      const { lat, lng } = marker.getLatLng();
      const address = await reverseGeocode(lat, lng);
      onChange({ lat, lng, address });
    });

    mapRef.current = map;
    markerRef.current = marker;

    return () => {
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync external location changes to marker/map
  useEffect(() => {
    if (!mapRef.current || !markerRef.current || !location) return;
    const ll: [number, number] = [location.lat, location.lng];
    markerRef.current.setLatLng(ll);
    mapRef.current.setView(ll, 16);
  }, [location?.lat, location?.lng]);

  const detect = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported on this browser.");
      return;
    }
    setDetecting(true);
    setError(null);
    
    // Use a slightly longer timeout and allow lower accuracy fallback if needed
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const address = await reverseGeocode(latitude, longitude);
        onChange({ lat: latitude, lng: longitude, address });
        setDetecting(false);
      },
      (err) => {
        console.error("Geolocation error:", err);
        let msg = "Couldn't detect your location. Please drag the pin manually.";
        if (err.code === err.PERMISSION_DENIED) {
          msg = "Location permission denied. Please allow location access or drag the pin.";
        } else if (err.code === err.TIMEOUT) {
          msg = "Location request timed out. Drag the pin to your spot.";
        }
        setError(msg);
        setDetecting(false);
      },
      { 
        enableHighAccuracy: true, 
        timeout: 15000, 
        maximumAge: 0 
      }
    );
  };

  // Auto-detect on mount if no location yet
  useEffect(() => {
    if (!location) detect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-navy">
          <MapPin className="size-4 text-orange" />
          Delivery Location
        </div>
        <button
          type="button"
          onClick={detect}
          disabled={detecting}
          className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-full bg-secondary hover:bg-orange hover:text-navy transition-colors disabled:opacity-60"
        >
          {detecting ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <Crosshair className="size-3.5" />
          )}
          {detecting ? "Detecting..." : "Auto-detect"}
        </button>
      </div>

      <div
        ref={containerRef}
        className="h-[280px] w-full rounded-2xl overflow-hidden border border-border"
      />

      {error && (
        <div className="text-xs text-destructive bg-destructive/10 px-3 py-2 rounded-lg">
          {error}
        </div>
      )}

      {location && (
        <div className="text-xs text-muted-foreground bg-secondary/60 px-3 py-2 rounded-lg">
          <span className="font-semibold text-navy">Pin:</span>{" "}
          {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
          {location.address && (
            <div className="mt-1 text-foreground">{location.address}</div>
          )}
        </div>
      )}
      <div className="text-[11px] text-muted-foreground">
        Tip: drag the pin to fine-tune your exact spot.
      </div>
    </div>
  );
}

async function reverseGeocode(lat: number, lng: number): Promise<string | undefined> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18`,
      { headers: { Accept: "application/json" } },
    );
    if (!res.ok) return undefined;
    const data = (await res.json()) as { display_name?: string };
    return data.display_name;
  } catch {
    return undefined;
  }
}
