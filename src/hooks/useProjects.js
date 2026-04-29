import { useEffect, useMemo, useState } from "react";
import { createDefaultProject, createDemoProjects } from "../data/defaults";

const STORAGE_KEY = "ai-agent-dev-workflow.projects.v1";

function loadProjects() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDemoProjects();
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length ? parsed : createDemoProjects();
  } catch {
    return createDemoProjects();
  }
}

export function useProjects() {
  const [projects, setProjects] = useState(loadProjects);
  const [activeId, setActiveId] = useState(() => projects[0]?.id);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  const activeProject = useMemo(
    () => projects.find((project) => project.id === activeId) || projects[0],
    [activeId, projects]
  );

  function createProject() {
    const project = createDefaultProject({ name: `新项目 ${projects.length + 1}`, goal: "描述你想用 Agent 辅助完成的项目。" });
    setProjects((current) => [project, ...current]);
    setActiveId(project.id);
  }

  function updateProject(nextProject) {
    const updated = { ...nextProject, updatedAt: new Date().toISOString() };
    setProjects((current) => current.map((project) => (project.id === updated.id ? updated : project)));
  }

  function deleteProject(id) {
    setProjects((current) => {
      if (current.length === 1) return current;
      const next = current.filter((project) => project.id !== id);
      if (activeId === id) setActiveId(next[0]?.id);
      return next;
    });
  }

  function resetWorkspace() {
    const demoProjects = createDemoProjects();
    setProjects(demoProjects);
    setActiveId(demoProjects[0].id);
  }

  return {
    projects,
    activeProject,
    activeId,
    setActiveId,
    createProject,
    updateProject,
    deleteProject,
    resetWorkspace
  };
}
