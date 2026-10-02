import React from "react";

interface ProjectCoverProps {
  title: string;
  imageUrl?: string;
  aspectRatio?: string;
}

export const ProjectCover: React.FC<ProjectCoverProps> = ({
  title,
  imageUrl,
}) => {
  // If real screenshot is available: present in a clean minimalist browser window frame
  if (imageUrl) {
    return (
      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-t-lg bg-[#ECEEF2] border-b border-brand-border flex flex-col">
        {/* Minimalist Browser Header Bar */}
        <div className="h-6 sm:h-7 px-3 bg-[#EBEEF2] border-b border-brand-border/80 flex items-center justify-between shrink-0 select-none">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#D5D9E2]" />
            <span className="w-2 h-2 rounded-full bg-[#D5D9E2]" />
            <span className="w-2 h-2 rounded-full bg-[#D5D9E2]" />
          </div>
          <div className="text-[10px] text-muted font-mono tracking-wider truncate max-w-[160px] opacity-75">
            {title.toLowerCase()}.demo
          </div>
          <div className="w-6" />
        </div>

        {/* Real Screenshot Surface - object-top keeps the critical hero/navigation visible */}
        <div className="relative flex-1 w-full overflow-hidden bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={`${title} 产品真实界面展示`}
            className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
            loading="lazy"
          />
        </div>
      </div>
    );
  }

  // Fallback: Clean typographical placeholder without decorative gradients or cosmic lines
  return (
    <div className="relative w-full aspect-[16/10] overflow-hidden rounded-t-lg bg-[#EBEEF2] border-b border-brand-border flex flex-col justify-between p-6 select-none">
      <div className="flex items-center justify-between text-[11px] font-mono text-muted tracking-wider">
        <span>DEMO PREVIEW</span>
        <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-white text-muted border border-brand-border">
          WEB APP
        </span>
      </div>

      <div className="my-auto text-center">
        <h4 className="text-xl sm:text-2xl font-sans font-semibold tracking-tight text-heading">
          {title}
        </h4>
        <p className="text-xs text-muted mt-1 font-sans">
          数字产品演示系统
        </p>
      </div>

      <div className="text-[10px] font-mono text-muted/80 text-right">
        RMS STUDIO
      </div>
    </div>
  );
};
