import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#E96326",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
        }}
      >
        {/* Lock icon */}
        <svg
          width="18"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" fill="white" stroke="none" />
          <path d="M7 11V7a5 5 0 0110 0v4" stroke="white" strokeWidth="2.5" />
          <circle cx="12" cy="16" r="1.5" fill="#E96326" />
        </svg>
      </div>
    ),
    size
  );
}
