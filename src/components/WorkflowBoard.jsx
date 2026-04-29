import { CheckCircle2 } from "lucide-react";
import { workflowStages } from "../data/templates";

export function WorkflowBoard() {
  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Workflow</p>
          <h2>Agentic Development 流程</h2>
        </div>
        <span className="badge">6 stages</span>
      </div>

      <div className="workflow-grid">
        {workflowStages.map((stage, index) => (
          <article className="stage-card" key={stage.id}>
            <div className="stage-index">{String(index + 1).padStart(2, "0")}</div>
            <h3>{stage.title}</h3>
            <strong>{stage.name}</strong>
            <p>{stage.description}</p>
            <div className="deliverable">
              <CheckCircle2 size={16} />
              {stage.deliverable}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
