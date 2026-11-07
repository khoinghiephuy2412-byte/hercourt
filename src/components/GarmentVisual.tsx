import React from "react";

interface GarmentVisualProps {
  shape: "skirt" | "polo" | "shirt" | "set" | "shorts";
  colorHex: string;
  className?: string;
  size?: number;
}

export const GarmentVisual: React.FC<GarmentVisualProps> = ({
  shape,
  colorHex,
  className = "w-full h-full",
}) => {
  // Elegant SVG garment with dimensional lighting, stitches, folds and soft shadows
  const renderShape = () => {
    switch (shape) {
      case "skirt":
        return (
          <g>
            {/* Soft ambient shadow */}
            <ellipse cx="140" cy="290" rx="90" ry="12" fill="#000" opacity="0.25" filter="blur(8px)" />
            
            {/* Main dress/skirt silhouette */}
            <path
              d="M105 32 L88 42 L48 52 L22 112 L65 128 L82 86 L90 156 L36 270 Q140 304 244 270 L190 156 L198 86 L215 128 L258 112 L232 52 L192 42 L175 32 L158 58 L122 58 Z"
              fill={colorHex}
              stroke="#FAF9F6"
              strokeOpacity="0.2"
              strokeWidth="2.5"
            />
            {/* Subtle pleat highlights */}
            <path d="M85 160 L62 272" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2.5" strokeDasharray="3 2" />
            <path d="M115 160 L102 284" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="2.5" />
            <path d="M140 160 L140 288" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="3" />
            <path d="M165 160 L178 284" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="2.5" />
            <path d="M195 160 L218 272" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2.5" strokeDasharray="3 2" />

            {/* Neckline & collar accent */}
            <path d="M105 32 Q140 72 175 32" fill="none" stroke="#FAF9F6" strokeOpacity="0.85" strokeWidth="8" strokeLinecap="round" />
            {/* Waist band */}
            <path d="M86 152 H194" stroke="#FAF9F6" strokeOpacity="0.6" strokeWidth="6" strokeLinecap="round" />
            {/* Hem curve */}
            <path d="M64 262 Q140 285 216 262" fill="none" stroke="#FAF9F6" strokeOpacity="0.45" strokeWidth="3" />
          </g>
        );

      case "polo":
        return (
          <g>
            <ellipse cx="140" cy="275" rx="80" ry="10" fill="#000" opacity="0.25" filter="blur(7px)" />
            {/* Polo Body */}
            <path
              d="M104 35 L86 46 L40 58 L18 128 L68 144 L86 95 L94 250 H186 L194 95 L212 144 L262 128 L240 58 L194 46 L176 35 L157 60 H123 Z"
              fill={colorHex}
              stroke="#FAF9F6"
              strokeOpacity="0.25"
              strokeWidth="2.5"
            />
            {/* Polo Collar */}
            <path d="M102 35 L124 64 L140 82 L156 64 L178 35" stroke="#FAF9F6" strokeWidth="8" fill="none" strokeLinecap="round" />
            {/* Button Placket */}
            <path d="M140 82 V132" stroke="#FAF9F6" strokeWidth="5" strokeLinecap="round" />
            <circle cx="140" cy="98" r="3.5" fill="#11151B" stroke="#FAF9F6" strokeWidth="1" />
            <circle cx="140" cy="116" r="3.5" fill="#11151B" stroke="#FAF9F6" strokeWidth="1" />
            {/* Sleeve hems */}
            <path d="M19 126 L67 142" stroke="#FAF9F6" strokeOpacity="0.5" strokeWidth="4" />
            <path d="M261 126 L213 142" stroke="#FAF9F6" strokeOpacity="0.5" strokeWidth="4" />
            {/* Waist trim */}
            <path d="M94 246 H186" stroke="#FAF9F6" strokeOpacity="0.4" strokeWidth="4" />
          </g>
        );

      case "shirt":
        return (
          <g>
            <ellipse cx="140" cy="275" rx="80" ry="10" fill="#000" opacity="0.25" filter="blur(7px)" />
            {/* Sport Jersey Body */}
            <path
              d="M104 35 L86 46 L40 58 L18 128 L68 144 L86 95 L94 250 H186 L194 95 L212 144 L262 128 L240 58 L194 46 L176 35 L157 60 H123 Z"
              fill={colorHex}
              stroke="#FAF9F6"
              strokeOpacity="0.25"
              strokeWidth="2.5"
            />
            {/* Athletic crew neck */}
            <path d="M104 35 Q140 76 176 35" fill="none" stroke="#FAF9F6" strokeOpacity="0.85" strokeWidth="9" strokeLinecap="round" />
            {/* Dynamic speed stripes */}
            <path d="M72 110 L110 248" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="3" />
            <path d="M208 110 L170 248" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="3" />
            <path d="M94 246 H186" stroke="#FAF9F6" strokeOpacity="0.4" strokeWidth="4" />
          </g>
        );

      case "shorts":
        return (
          <g>
            <ellipse cx="140" cy="275" rx="85" ry="10" fill="#000" opacity="0.25" filter="blur(7px)" />
            {/* Performance Shorts */}
            <path
              d="M72 65 H208 L228 242 L150 250 L140 160 L130 250 L52 242 Z"
              fill={colorHex}
              stroke="#FAF9F6"
              strokeOpacity="0.25"
              strokeWidth="2.5"
            />
            {/* Ergonomic waistband with drawstring */}
            <path d="M71 85 H209" stroke="#FAF9F6" strokeOpacity="0.8" strokeWidth="12" strokeLinecap="round" />
            <path d="M136 85 Q132 105 125 115" stroke="#D9FF3F" strokeWidth="2.5" fill="none" />
            <path d="M144 85 Q148 105 155 115" stroke="#D9FF3F" strokeWidth="2.5" fill="none" />
            {/* Side split trims */}
            <path d="M54 235 L70 195" stroke="#FAF9F6" strokeOpacity="0.6" strokeWidth="3" />
            <path d="M226 235 L210 195" stroke="#FAF9F6" strokeOpacity="0.6" strokeWidth="3" />
          </g>
        );

      case "set":
        return (
          <g>
            <ellipse cx="140" cy="295" rx="85" ry="10" fill="#000" opacity="0.25" filter="blur(7px)" />
            {/* Top jersey */}
            <path
              d="M104 30 L86 41 L40 53 L18 123 L68 139 L86 90 L95 190 H185 L194 90 L212 139 L262 123 L240 53 L194 41 L176 30 L157 55 H123 Z"
              fill={colorHex}
              stroke="#FAF9F6"
              strokeOpacity="0.25"
              strokeWidth="2.5"
            />
            <path d="M104 30 Q140 70 176 30" fill="none" stroke="#FAF9F6" strokeOpacity="0.85" strokeWidth="8" strokeLinecap="round" />
            {/* Bottom shorts nested */}
            <g transform="translate(48, 172) scale(0.66, 0.5)">
              <path
                d="M72 65 H208 L228 242 L150 250 L140 160 L130 250 L52 242 Z"
                fill={colorHex}
                stroke="#FAF9F6"
                strokeOpacity="0.35"
                strokeWidth="3.5"
              />
              <path d="M71 85 H209" stroke="#FAF9F6" strokeOpacity="0.8" strokeWidth="12" strokeLinecap="round" />
            </g>
          </g>
        );

      default:
        return null;
    }
  };

  return (
    <svg
      viewBox="0 0 280 320"
      className={className}
      aria-label="Hình minh họa trang phục HERCOURT"
    >
      <defs>
        <radialGradient id="meshGlow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
        </radialGradient>
      </defs>
      <rect width="280" height="320" rx="16" fill="url(#meshGlow)" opacity="0.6" />
      <g transform="translate(0, 10)">{renderShape()}</g>
    </svg>
  );
};
