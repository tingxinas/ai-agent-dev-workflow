import { Plus, RotateCcw, Trash2 } from "lucide-react";

function formatDate(value) {
  return new Date(value).toLocaleDateString("zh-CN", { month: "2-digit", day: "2-digit" });
}

export function WorkspaceSidebar({ projects, activeId, onSelect, onCreate, onDelete, onReset }) {
  return (
    <aside className="panel workspace-panel">
      <div className="section-heading compact-heading">
        <div>
          <p className="eyebrow">Workspace</p>
          <h2>项目工作区</h2>
        </div>
        <button type="button" onClick={onCreate} aria-label="创建项目">
          <Plus size={16} />
        </button>
      </div>

      <div className="project-list">
        {projects.map((project) => (
          <button
            key={project.id}
            type="button"
            className={`project-item ${project.id === activeId ? "active" : ""}`}
            onClick={() => onSelect(project.id)}
          >
            <span>
              <strong>{project.name}</strong>
              <small>更新于 {formatDate(project.updatedAt)}</small>
            </span>
          </button>
        ))}
      </div>

      <div className="workspace-actions">
        <button type="button" className="secondary" onClick={() => onDelete(activeId)} disabled={projects.length === 1}>
          <Trash2 size={16} /> 删除当前
        </button>
        <button type="button" className="secondary" onClick={onReset}>
          <RotateCcw size={16} /> 重置示例
        </button>
      </div>
    </aside>
  );
}
