"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { WorkflowSection } from "@/components/WorkflowSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ContactModal } from "@/components/ContactModal";
import { Project, SiteConfig, siteConfig as defaultSiteConfig, projectsData } from "@/data/siteConfig";

interface HomeClientProps {
  initialProjects?: Project[];
  initialConfig?: SiteConfig;
}

export const HomeClient: React.FC<HomeClientProps> = ({
  initialProjects = projectsData,
}) => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [targetProjectTitle, setTargetProjectTitle] = useState("");
  const [targetProjectUrl, setTargetProjectUrl] = useState("");

  const handleOpenContact = (projectTitle?: string, projectUrl?: string) => {
    setTargetProjectTitle(projectTitle || "");
    setTargetProjectUrl(projectUrl || "");
    setIsContactOpen(true);
  };

  const handleCloseContact = () => {
    setIsContactOpen(false);
  };

  const handleExploreProjects = () => {
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0C0E] text-white flex flex-col selection:bg-atelier-emerald selection:text-black">
      {/* Top Navbar */}
      <Navbar onOpenContact={() => handleOpenContact()} />

      <main className="flex-1">
        {/* Compact Hero Section (380-460px height) */}
        <Hero
          onOpenContact={(title) => handleOpenContact(title)}
          onExploreProjects={handleExploreProjects}
        />

        {/* Demo Projects Showcase (Dominant Body of Home) */}
        <ProjectsSection
          initialProjects={initialProjects}
          onCustomSimilar={(projectTitle, projectUrl) =>
            handleOpenContact(projectTitle, projectUrl)
          }
        />

        {/* Streamlined Services Section */}
        <ServicesSection />

        {/* Concise 4-Step Collaboration Workflow */}
        <WorkflowSection />

        {/* Focused Contact CTA Bar */}
        <ContactSection onOpenContact={() => handleOpenContact()} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Contact & Inquiry Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={handleCloseContact}
        initialProjectTitle={targetProjectTitle}
        initialProjectUrl={targetProjectUrl}
      />
    </div>
  );
};
