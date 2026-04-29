import { useMemo } from "react";
import { Bot, Code2, LayoutDashboard, ShieldCheck } from "lucide-react";
import { OutputPanel } from "./components/OutputPanel";
import { ProjectForm } from "./components/ProjectForm";
import { RiskMatrix } from "./components/RiskMatrix";
import { ScoreCard } from "./components/ScoreCard";
import { WorkflowBoard } from "./components/WorkflowBoard";
import { WorkflowKanban } from "./components/WorkflowKanban";
import { WorkspaceSidebar } from "./components/WorkspaceSidebar";
import { useProjects } from "./hooks/useProjects";
import {
  buildPrompt,
  buildReadinessReport,
  buildReleaseGuard,
  buildTaskPlan,
  calculateAgentFit,
  calculateRiskMatrix
} from "./utils/workflow";

function safeName(name) {
  return name.trim().replace(/\s+/g, "-") || "agentic-workflow";
}

export default function App() {
  const {
    projects,
    activeProject,
    activeId,
    setActiveId,
    createProject,
    updateProject,
    deleteProject,
    resetWorkspace
  } = useProjects();

  const prompt = useMemo(() => buildPrompt(activeProject), [activeProject]);
  const taskPlan = useMemo(() => buildTaskPlan(activeProject), [activeProject]);
  const releaseGuard = useMemo(() => buildReleaseGuard(activeProject), [activeProject]);
  const fitResult = useMemo(() => calculateAgentFit(activeProject), [activeProject]);
  const riskMatrix = useMemo(() => calculateRiskMatrix(activeProject), [activeProject]);
  const readinessReport = useMemo(
    () => buildReadinessReport(activeProject, fitResult, riskMatrix),
    [activeProject, fitResult, riskMatrix]
  );

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">AI Agent Workflow Studio</p>
          <h1>AI Agent Dev Workflow</h1>
          <p className="hero-copy">
            一个 Local-first 的 AI Agent 开发工作台：管理多个项目、跟踪工作流阶段、生成 Prompt 和任务计划、评估风险矩阵，并导出完整 AI Readiness Report。
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
          <strong>Workflow Studio</strong>
          <span>从一次性 Prompt 生成器升级为项目级 Agent 工作流管理工具。</span>
        </div>
      </header>

      <main className="studio-grid">
        <WorkspaceSidebar
          projects={projects}
          activeId={activeId}
          onSelect={setActiveId}
          onCreate={createProject}
          onDelete={deleteProject}
          onReset={resetWorkspace}
        />

        <div className="studio-content">
          <ProjectForm project={activeProject} onChange={updateProject} />
          <ScoreCard result={fitResult} />
          <RiskMatrix items={riskMatrix} />
          <WorkflowKanban project={activeProject} onChange={updateProject} />
          <WorkflowBoard />
          <OutputPanel title="Agent Prompt" content={prompt} filename={`${safeName(activeProject.name)}-prompt.md`} />
          <OutputPanel title="Task Plan" content={taskPlan} filename={`${safeName(activeProject.name)}-task-plan.md`} />
          <OutputPanel title="Release Guard" content={releaseGuard} filename={`${safeName(activeProject.name)}-release-guard.md`} />
          <OutputPanel title="AI Readiness Report" content={readinessReport} filename={`${safeName(activeProject.name)}-readiness-report.md`} />
        </div>
      </main>

      <footer className="footer">
        <ShieldCheck size={16} />
        Local-first by design. 项目数据保存在浏览器本地，不调用外部 API，不上传用户输入。
      </footer>
    </div>
  );
}
