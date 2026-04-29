import { promptModes } from "../data/templates";

export function ProjectForm({ project, onChange }) {
  const update = (key, value) => onChange({ ...project, [key]: value });

  return (
    <section className="panel form-panel">
      <div>
        <p className="eyebrow">Project Input</p>
        <h2>项目信息</h2>
      </div>

      <label htmlFor="project-name">项目名称</label>
      <input
        id="project-name"
        value={project.name}
        onChange={(event) => update("name", event.target.value)}
      />

      <label htmlFor="project-goal">项目目标 / 问题描述</label>
      <textarea
        id="project-goal"
        value={project.goal}
        onChange={(event) => update("goal", event.target.value)}
      />

      <label htmlFor="project-stack">技术栈</label>
      <input
        id="project-stack"
        value={project.stack}
        onChange={(event) => update("stack", event.target.value)}
      />

      <label htmlFor="project-constraints">约束条件</label>
      <textarea
        id="project-constraints"
        value={project.constraints}
        onChange={(event) => update("constraints", event.target.value)}
      />

      <label htmlFor="prompt-mode">Prompt 模式</label>
      <select
        id="prompt-mode"
        value={project.mode}
        onChange={(event) => update("mode", event.target.value)}
      >
        {Object.entries(promptModes).map(([value, label]) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    </section>
  );
}
