import React from "react";

interface ProjectCoverProps {
  title: string;
  imageUrl?: string;
  index?: number;
}

export const ProjectCover: React.FC<ProjectCoverProps> = ({
  title,
  imageUrl,
  index = 1,
}) => {
  const indexStr = String(index).padStart(2, "0");

  if (imageUrl) {
    return (
      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-t-xl bg-[#0E1115] border-b border-white/[0.08] flex flex-col group/cover">
        {/* Gallery Casing Header */}
        <div className="h-7 px-3.5 bg-[#12161C] border-b border-white/[0.06] flex items-center justify-between shrink-0 select-none">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white/20 group-hover/cover:bg-atelier-emerald transition-colors" />
            <span className="w-2 h-2 rounded-full bg-white/15" />
            <span className="w-2 h-2 rounded-full bg-white/15" />
          </div>

          <div className="text-[10px] font-mono tracking-widest text-atelier-muted uppercase truncate max-w-[180px]">
            EXHIBIT {indexStr} // {title.toLowerCase()}
          </div>

          <div className="flex items-center gap-1 text-[9px] font-mono text-atelier-emerald tracking-wider">
            <span className="w-1 h-1 rounded-full bg-atelier-emerald animate-pulse" />
            <span>LIVE</span>
          </div>
        </div>

        {/* Real Screenshot Viewport */}
        <div className="relative flex-1 w-full overflow-hidden bg-[#0A0C0E]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={`${title} 真实数字产品视觉`}
            className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03] opacity-95 group-hover:opacity-100"
            loading="lazy"
          />
          {/* Subtle top glare/gradient for museum glass effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0E]/40 via-transparent to-white/[0.03] pointer-events-none" />
        </div>
      </div>
    );
  }

  // Fallback: Architectural Typographic Plinth
  return (
    <div className="relative w-full aspect-[16/10] overflow-hidden rounded-t-xl bg-[#111418] border-b border-white/[0.08] flex flex-col justify-between p-6 select-none group/cover">
      <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-atelier-muted uppercase">
        <span>EXHIBITION DOSSIER // {indexStr}</span>
        <span className="text-atelier-gold font-medium">INDEX 2026</span>
      </div>

      <div className="my-auto text-center">
        <h4 className="text-2xl font-sans font-bold tracking-tight text-white group-hover/cover:text-atelier-emerald transition-colors">
          {title}
        </h4>
        <p className="text-xs font-mono tracking-wider text-atelier-muted mt-1 uppercase">
          DIGITAL SANCTUARY SYSTEM
        </p>
      </div>

      <div className="flex items-center justify-between text-[9px] font-mono text-white/30">
        <span>RMS ATELIER</span>
        <span>INTERACTIVE CORE</span>
      </div>
    </div>
  );
};
