import { Metadata } from "next";
import { getPublishedProjects, getEffectiveSiteConfig } from "@/lib/projects";
import { HomeClient } from "@/components/HomeClient";

// Revalidate periodically or on demand
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const config = await getEffectiveSiteConfig();
  return {
    title: `${config.brandName} | ${config.brandTagline}`,
    description: `${config.headline} ${config.subheadline} ${config.intro}`,
  };
}

export default async function HomePage() {
  const projects = await getPublishedProjects();
  const config = await getEffectiveSiteConfig();

  return <HomeClient initialProjects={projects} initialConfig={config} />;
}
