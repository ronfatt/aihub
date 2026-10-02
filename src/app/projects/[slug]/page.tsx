import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedProjectBySlug, getPublishedProjects } from "@/lib/projects";
import { ProjectDetailClient } from "./ProjectDetailClient";
import { siteConfig } from "@/data/siteConfig";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getPublishedProjectBySlug(params.slug);
  if (!project) {
    return {
      title: `作品未找到 | ${siteConfig.brandName}`,
    };
  }

  return {
    title: `${project.title} 演示介绍 | ${siteConfig.brandName}`,
    description: project.description || `${project.title} 在线演示与定制开发说明`,
  };
}

// Generate static params for existing published projects
export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProjectDetailPage({ params }: Props) {
  const project = await getPublishedProjectBySlug(params.slug);

  // Hidden projects cannot be viewed by directly visiting URL
  if (!project || !project.visible) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
