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

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [targetProjectTitle, setTargetProjectTitle] = useState("");

  const handleOpenContact = (projectTitle?: string) => {
    setTargetProjectTitle(projectTitle || "");
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
    <div className="min-h-screen bg-bg-warm text-brand-text flex flex-col selection:bg-brand-green selection:text-bg-warm">
      {/* Top Navbar */}
      <Navbar onOpenContact={() => handleOpenContact()} />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenContact={(title) => handleOpenContact(title)}
          onExploreProjects={handleExploreProjects}
        />

        {/* Demo Projects Showcase */}
        <ProjectsSection
          onCustomSimilar={(projectTitle) => handleOpenContact(projectTitle)}
        />

        {/* Custom Services Directions */}
        <ServicesSection onOpenContact={() => handleOpenContact()} />

        {/* 4-Step Collaboration Workflow */}
        <WorkflowSection />

        {/* Bottom Contact CTA */}
        <ContactSection onOpenContact={() => handleOpenContact()} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Contact & Inquiry Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={handleCloseContact}
        initialProjectTitle={targetProjectTitle}
      />
    </div>
  );
}
