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
      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-t-xl bg-[#14161C] border-b border-white/[0.08] flex flex-col group/cover">
        {/* Charcoal Header Bar */}
        <div className="h-7 px-3.5 bg-[#181B22] border-b border-white/[0.06] flex items-center justify-between shrink-0 select-none">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-palette-red/80 group-hover/cover:bg-palette-red transition-colors" />
            <span className="w-2 h-2 rounded-full bg-palette-gold/50" />
            <span className="w-2 h-2 rounded-full bg-white/20" />
          </div>

          <div className="text-[10px] font-mono tracking-widest text-palette-muted uppercase truncate max-w-[180px]">
            EXHIBIT {indexStr} // {title.toLowerCase()}
          </div>

          <div className="flex items-center gap-1 text-[9px] font-mono text-palette-gold tracking-wider">
            <span className="w-1 h-1 rounded-full bg-palette-red animate-pulse" />
            <span className="text-palette-gold font-medium">LIVE</span>
          </div>
        </div>

        {/* Real Screenshot Viewport */}
        <div className="relative flex-1 w-full overflow-hidden bg-[#111215]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={`${title} 真实数字产品视觉`}
            className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03] opacity-95 group-hover:opacity-100"
            loading="lazy"
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111215]/50 via-transparent to-white/[0.02] pointer-events-none" />
        </div>
      </div>
    );
  }

  // Fallback: Charcoal & Gold Plinth
  return (
    <div className="relative w-full aspect-[16/10] overflow-hidden rounded-t-xl bg-[#181B22] border-b border-white/[0.08] flex flex-col justify-between p-6 select-none group/cover">
      <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-palette-muted uppercase">
        <span className="text-palette-red font-medium">EXHIBIT // {indexStr}</span>
        <span className="text-palette-gold font-medium">INDEX 2026</span>
      </div>

      <div className="my-auto text-center">
        <h4 className="text-2xl font-sans font-bold tracking-tight text-white group-hover/cover:text-palette-gold transition-colors">
          {title}
        </h4>
        <p className="text-xs font-mono tracking-wider text-palette-muted mt-1 uppercase">
          DIGITAL ARTIFACT SYSTEM
        </p>
      </div>

      <div className="flex items-center justify-between text-[9px] font-mono text-white/30">
        <span>RMS ATELIER</span>
        <span className="text-palette-gold">CORE DEPLOYMENT</span>
      </div>
    </div>
  );
};
