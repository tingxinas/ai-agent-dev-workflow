import { CheckCircle2, Circle } from "lucide-react";
import { workflowStages } from "../data/templates";

export function WorkflowKanban({ project, onChange }) {
  const completed = new Set(project.completedStages || []);

  function toggleStage(stageId) {
    const nextCompleted = completed.has(stageId)
      ? (project.completedStages || []).filter((id) => id !== stageId)
      : [...(project.completedStages || []), stageId];
    onChange({ ...project, completedStages: nextCompleted });
  }

  function updateNote(stageId, value) {
    onChange({
      ...project,
      stageNotes: {
        ...(project.stageNotes || {}),
        [stageId]: value
      }
    });
  }

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Kanban</p>
          <h2>工作流阶段看板</h2>
        </div>
        <span className="badge">{completed.size}/{workflowStages.length} done</span>
      </div>

      <div className="kanban-grid">
        {workflowStages.map((stage) => {
          const done = completed.has(stage.id);
          return (
            <article className={`kanban-card ${done ? "done" : ""}`} key={stage.id}>
              <button type="button" className="stage-toggle" onClick={() => toggleStage(stage.id)}>
                {done ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                <span>{stage.title}</span>
              </button>
              <strong>{stage.name}</strong>
              <p>{stage.description}</p>
              <label htmlFor={`note-${stage.id}`}>阶段备注</label>
              <textarea
                id={`note-${stage.id}`}
                value={(project.stageNotes || {})[stage.id] || ""}
                onChange={(event) => updateNote(stage.id, event.target.value)}
                placeholder="记录交付物、人工审核意见或下一步..."
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}
