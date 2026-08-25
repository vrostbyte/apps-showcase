"use client";

import { useState } from "react";
import { Eye } from "lucide-react";

/** A 16:10 image frame that falls back to a placeholder if the screenshot is missing. */
export function ImageFrame({ src, alt }: { src: string; alt: string }) {
  const [errored, setErrored] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        background: "#0a0a0a",
        border: "1px solid #1f1f1f",
        borderRadius: "10px",
        overflow: "hidden",
        aspectRatio: "16 / 10",
      }}
    >
      {errored ? (
        <div
          style={{
            width: "100%", height: "100%",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: "8px", color: "#333",
            position: "absolute", inset: 0,
          }}
        >
          <Eye size={24} />
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "12.5px" }}>
            screenshot coming soon
          </span>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onError={() => setErrored(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}
        />
      )}
    </div>
  );
}
