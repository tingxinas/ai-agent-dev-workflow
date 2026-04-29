import { useMemo, useState } from "react";
import { Bot, Code2, LayoutDashboard, ShieldCheck } from "lucide-react";
import { OutputPanel } from "./components/OutputPanel";
import { ProjectForm } from "./components/ProjectForm";
import { ScoreCard } from "./components/ScoreCard";
import { WorkflowBoard } from "./components/WorkflowBoard";
import { buildPrompt, buildReleaseGuard, buildTaskPlan, calculateAgentFit } from "./utils/workflow";

const defaultProject = {
  name: "个人任务看板",
  goal: "做一个简单的个人任务看板，可以添加任务、标记完成、按状态筛选，并保存到本地浏览器。",
  stack: "React, Vite, localStorage",
  constraints: "不接入后端，不上传用户数据，移动端可用，代码保持简单。",
  mode: "plan"
};

function safeName(name) {
  return name.trim().replace(/\s+/g, "-") || "agentic-workflow";
}

export default function App() {
  const [project, setProject] = useState(defaultProject);

  const prompt = useMemo(() => buildPrompt(project), [project]);
  const taskPlan = useMemo(() => buildTaskPlan(project), [project]);
  const releaseGuard = useMemo(() => buildReleaseGuard(project), [project]);
  const fitResult = useMemo(() => calculateAgentFit(project), [project]);

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Local-first AI Agent Workflow Toolkit</p>
          <h1>AI Agent Dev Workflow</h1>
          <p className="hero-copy">
            一个正常可运行的前端工具项目，用于生成 Agent Prompt、拆解任务、评估任务适配度、生成发布检查清单，并把结果导出为 Markdown。
          </p>
          <div className="hero-actions">
            <a className="button" href="https://github.com/tingxinas/ai-agent-dev-workflow" target="_blank" rel="noreferrer">
              <Code2 size={18} /> GitHub
            </a>
            <a className="button secondary" href="/docs/workflow.md">
              <LayoutDashboard size={18} /> Workflow Docs
            </a>
          </div>
        </div>
        <div className="hero-card">
          <Bot size={36} />
          <strong>Human-in-the-loop</strong>
          <span>Agent 负责加速，人负责判断、审核和交付。</span>
        </div>
      </header>

      <main className="main-grid">
        <ProjectForm project={project} onChange={setProject} />

        <div className="content-stack">
          <ScoreCard result={fitResult} />
          <WorkflowBoard />
          <OutputPanel
            title="Agent Prompt"
            content={prompt}
            filename={`${safeName(project.name)}-prompt.md`}
          />
          <OutputPanel
            title="Task Plan"
            content={taskPlan}
            filename={`${safeName(project.name)}-task-plan.md`}
          />
          <OutputPanel
            title="Release Guard"
            content={releaseGuard}
            filename={`${safeName(project.name)}-release-guard.md`}
          />
        </div>
      </main>

      <footer className="footer">
        <ShieldCheck size={16} />
        Local-first by design. 不调用外部 API，不上传用户输入。
      </footer>
    </div>
  );
}
