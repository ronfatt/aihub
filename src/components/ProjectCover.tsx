import React from "react";

interface ProjectCoverProps {
  title: string;
  pattern?: "rings" | "grid" | "orbit" | "zen" | "compass" | "cards" | "hex" | "wave";
  accentColor?: string;
  imageUrl?: string;
}

export const ProjectCover: React.FC<ProjectCoverProps> = ({
  title,
  pattern = "wave",
  accentColor = "#173D35",
  imageUrl,
}) => {
  if (imageUrl) {
    return (
      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-t-xl bg-[#EFECE4]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={`${title} 产品预览`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
    );
  }

  // Refined modern oriental geometric background patterns
  return (
    <div
      className="relative w-full aspect-[16/10] overflow-hidden rounded-t-xl transition-all duration-500 group-hover:brightness-105 flex flex-col justify-between p-5 select-none"
      style={{
        background: `linear-gradient(145deg, #1C423A 0%, ${accentColor} 60%, #0F2621 100%)`,
      }}
    >
      {/* Decorative vector pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        {pattern === "wave" && (
          <svg className="w-full h-full" viewBox="0 0 400 250" fill="none">
            <path
              d="M-50 180 C80 120 180 240 320 140 C400 80 450 160 500 130"
              stroke="#B49761"
              strokeWidth="1.5"
            />
            <path
              d="M-50 150 C90 90 200 210 330 110 C390 60 460 140 500 110"
              stroke="#F7F5F0"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <circle cx="200" cy="120" r="40" stroke="#B49761" strokeWidth="0.8" />
          </svg>
        )}

        {pattern === "orbit" && (
          <svg className="w-full h-full" viewBox="0 0 400 250" fill="none">
            <ellipse cx="200" cy="125" rx="140" ry="60" stroke="#B49761" strokeWidth="1.2" transform="rotate(-15 200 125)" />
            <ellipse cx="200" cy="125" rx="90" ry="40" stroke="#F7F5F0" strokeWidth="0.8" strokeDasharray="3 3" transform="rotate(25 200 125)" />
            <circle cx="200" cy="125" r="16" fill="#B49761" fillOpacity="0.4" />
          </svg>
        )}

        {pattern === "compass" && (
          <svg className="w-full h-full" viewBox="0 0 400 250" fill="none">
            <circle cx="200" cy="125" r="75" stroke="#B49761" strokeWidth="1" />
            <circle cx="200" cy="125" r="55" stroke="#F7F5F0" strokeWidth="0.8" strokeDasharray="4 3" />
            <circle cx="200" cy="125" r="35" stroke="#B49761" strokeWidth="0.6" />
            <line x1="200" y1="35" x2="200" y2="215" stroke="#B49761" strokeWidth="0.8" strokeDasharray="2 4" />
            <line x1="110" y1="125" x2="290" y2="125" stroke="#B49761" strokeWidth="0.8" strokeDasharray="2 4" />
          </svg>
        )}

        {pattern === "rings" && (
          <svg className="w-full h-full" viewBox="0 0 400 250" fill="none">
            <circle cx="200" cy="125" r="85" stroke="#B49761" strokeWidth="0.8" />
            <circle cx="200" cy="125" r="65" stroke="#B49761" strokeWidth="1" />
            <circle cx="200" cy="125" r="45" stroke="#F7F5F0" strokeWidth="0.8" strokeDasharray="5 3" />
            <circle cx="200" cy="125" r="25" stroke="#B49761" strokeWidth="1.2" />
          </svg>
        )}

        {pattern === "hex" && (
          <svg className="w-full h-full" viewBox="0 0 400 250" fill="none">
            <polygon points="200,55 260,90 260,160 200,195 140,160 140,90" stroke="#B49761" strokeWidth="1.2" />
            <polygon points="200,75 240,98 240,145 200,168 160,145 160,98" stroke="#F7F5F0" strokeWidth="0.8" strokeDasharray="4 3" />
            <line x1="200" y1="55" x2="200" y2="195" stroke="#B49761" strokeWidth="0.6" strokeDasharray="2 2" />
          </svg>
        )}

        {pattern === "zen" && (
          <svg className="w-full h-full" viewBox="0 0 400 250" fill="none">
            <path d="M140 125 C 140 85, 260 85, 260 125 C 260 165, 140 165, 140 125" stroke="#B49761" strokeWidth="1.2" />
            <circle cx="200" cy="125" r="4" fill="#B49761" />
            <line x1="80" y1="125" x2="320" y2="125" stroke="#F7F5F0" strokeWidth="0.8" strokeDasharray="6 4" />
          </svg>
        )}

        {pattern === "grid" && (
          <svg className="w-full h-full" viewBox="0 0 400 250" fill="none">
            <line x1="100" y1="75" x2="300" y2="75" stroke="#B49761" strokeWidth="0.8" />
            <line x1="100" y1="125" x2="300" y2="125" stroke="#B49761" strokeWidth="1" />
            <line x1="100" y1="175" x2="300" y2="175" stroke="#B49761" strokeWidth="0.8" />
            <line x1="150" y1="45" x2="150" y2="205" stroke="#B49761" strokeWidth="0.8" />
            <line x1="200" y1="45" x2="200" y2="205" stroke="#F7F5F0" strokeWidth="1" strokeDasharray="4 3" />
            <line x1="250" y1="45" x2="250" y2="205" stroke="#B49761" strokeWidth="0.8" />
          </svg>
        )}

        {pattern === "cards" && (
          <svg className="w-full h-full" viewBox="0 0 400 250" fill="none">
            <rect x="150" y="60" width="70" height="110" rx="6" stroke="#B49761" strokeWidth="1.2" transform="rotate(-8 185 115)" />
            <rect x="180" y="60" width="70" height="110" rx="6" stroke="#F7F5F0" strokeWidth="1" strokeDasharray="3 3" transform="rotate(8 215 115)" />
          </svg>
        )}
      </div>

      {/* Top Header Tag */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-[10px] tracking-[0.2em] font-mono text-[#B49761] uppercase border border-[#B49761]/30 rounded-full px-2.5 py-0.5 bg-[#173D35]/40 backdrop-blur-sm">
          Interactive Demo
        </span>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] tracking-wider text-emerald-300 font-medium">LIVE</span>
        </div>
      </div>

      {/* Center Branding Showcase */}
      <div className="relative z-10 my-auto text-center transform transition-transform duration-300 group-hover:scale-102">
        <div className="inline-block px-4 py-2 border border-brand-gold/25 rounded-lg bg-black/15 backdrop-blur-xs">
          <h4 className="text-xl sm:text-2xl font-serif tracking-wide text-[#F7F5F0] drop-shadow-sm font-medium">
            {title}
          </h4>
        </div>
      </div>

      {/* Bottom Sub-label */}
      <div className="relative z-10 flex items-center justify-between text-[11px] text-[#F7F5F0]/70 font-mono tracking-wider">
        <span>RMS · PROTOTYPE</span>
        <span className="text-[#B49761]">VERCEL / CLOUD</span>
      </div>
    </div>
  );
};
