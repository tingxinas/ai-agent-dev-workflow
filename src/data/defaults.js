import { workflowStages } from "./templates";

export function createDefaultProject(overrides = {}) {
  const now = new Date().toISOString();
  const id = overrides.id || crypto.randomUUID();

  return {
    id,
    name: overrides.name || "个人任务看板",
    goal: overrides.goal || "做一个简单的个人任务看板，可以添加任务、标记完成、按状态筛选，并保存到本地浏览器。",
    stack: overrides.stack || "React, Vite, localStorage",
    constraints: overrides.constraints || "不接入后端，不上传用户数据，移动端可用，代码保持简单。",
    mode: overrides.mode || "plan",
    stageNotes: overrides.stageNotes || {},
    completedStages: overrides.completedStages || [],
    createdAt: overrides.createdAt || now,
    updatedAt: overrides.updatedAt || now
  };
}

export function createDemoProjects() {
  return [
    createDefaultProject(),
    createDefaultProject({
      name: "数据清洗脚本",
      goal: "把杂乱 CSV 文件清洗成统一字段，输出质量报告和异常行列表。",
      stack: "Python, Pandas, Markdown Report",
      constraints: "只处理本地文件，不上传数据，需要保留异常记录。",
      mode: "plan",
      completedStages: [workflowStages[0].id]
    })
  ];
}
