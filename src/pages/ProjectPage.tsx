import React from "react";
import { PROJECTS, ProjectKey } from "../config/projects";
import { ProjectBlock } from "../components/ProjectBlock";

function getSubdomain(): string | null {
  const host = window.location.hostname; // ex: aurora.realeza.com.br
  const parts = host.split(".");
  if (parts.length < 3) return null; // sem subdomínio
  return parts[0];
}

export default function ProjectPage() {
  const sub = getSubdomain();
  const project = sub ? PROJECTS[sub as ProjectKey] : null;

  if (!project) {
    // fallback: se não achou subdomínio/projeto
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold">Projeto não encontrado</h1>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-hidden">
      {/* Seu Navbar/WhatsAppButton etc */}
      <section className="pt-32 pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <ProjectBlock project={project} withDivider={false} />
        </div>
      </section>
    </div>
  );
}