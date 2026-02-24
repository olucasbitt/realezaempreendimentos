import React from "react";
import { PROJECTS } from "./config/projects";
import InstitutionalPage from "./pages/InstitutionalPage";
import ProjectPage from "./pages/ProjectPage";
import Footer from "./components/Footer"; // vamos criar

export default function App() {
  const hostname = typeof window !== "undefined" ? window.location.hostname : "";
  const subdomain = hostname.split(".")[0];

  const project = PROJECTS[subdomain as keyof typeof PROJECTS];

  return (
    <>
      {project ? <ProjectPage project={project} /> : <InstitutionalPage />}
      <Footer />
    </>
  );
}