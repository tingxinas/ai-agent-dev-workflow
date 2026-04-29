import { fitKeywords, promptModes, releaseChecklist, riskKeywords, workflowStages } from "../data/templates";

export function buildPrompt(project) {
  const base = `# ${promptModes[project.mode]} Prompt\n\n项目名称：${project.name}\n\n项目目标：\n${project.goal}\n\n技术栈：${project.stack}\n\n约束条件：\n${project.constraints}\n`;

  const templates = {
    clarify: `${base}\n请先不要写代码。请帮我澄清以下内容：\n1. 目标用户\n2. 要解决的核心问题\n3. 核心功能\n4. 非目标范围\n5. 验收标准\n6. 主要风险\n\n要求：输出结构化 Markdown，不要泛泛而谈。`,
    plan: `${base}\n请把这个项目拆成 5-7 个可执行任务。每个任务包含：\n- 目标\n- 涉及文件或模块\n- 实现要点\n- 验收标准\n- 风险点\n\n要求：按用户可见功能拆分，不要拆成过细的技术动作。`,
    build: `${base}\n请基于上述需求给出实现方案。\n要求：\n1. 先说明文件结构\n2. 再说明核心实现思路\n3. 给出关键代码\n4. 补充错误处理\n5. 最后给出验证步骤\n\n注意：不要引入不必要依赖，不要超出约束条件。`,
    debug: `${base}\n下面是一个待排查问题，请按 Debug 流程分析。\n\n现象：请在这里填写\n复现步骤：请在这里填写\n期望结果：请在这里填写\n实际结果：请在这里填写\n报错日志：请在这里填写\n相关代码：请在这里填写\n\n请输出：\n1. 可能原因，按概率排序\n2. 最小验证步骤\n3. 推荐修复方案\n4. 修复后的测试方式`,
    review: `${base}\n请审查这次项目实现，重点关注：\n1. 是否满足需求\n2. 是否存在边界条件遗漏\n3. 是否有安全或隐私风险\n4. 是否引入不必要复杂度\n5. 是否需要补充测试或文档\n\n要求：只指出重要问题，并给出可执行修改建议。`,
    ship: `${base}\n请生成公开发布前检查清单，覆盖：\n1. 敏感信息检查\n2. README 完整性\n3. 截图和示例数据脱敏\n4. 运行方式验证\n5. License 和依赖检查\n6. 发布后检查\n\n要求：输出可勾选 Markdown 清单。`
  };

  return templates[project.mode];
}

export function buildTaskPlan(project) {
  const rows = workflowStages
    .map((stage) => `| ${stage.title} | ${stage.name} | ${stage.description} | ${stage.deliverable} |`)
    .join("\n");

  return `# ${project.name} - Agentic Task Plan\n\n## 项目目标\n${project.goal}\n\n## 技术栈\n${project.stack}\n\n## 约束条件\n${project.constraints}\n\n## 工作流任务表\n\n| 阶段 | 任务 | 执行说明 | 交付物 |\n| --- | --- | --- | --- |\n${rows}\n\n## 建议里程碑\n\n1. 完成需求澄清和验收标准\n2. 完成最小可用版本\n3. 完成 Debug 和边界测试\n4. 完成文档和发布检查\n5. 发布并记录复盘\n`;
}

export function calculateAgentFit(project) {
  const text = `${project.goal} ${project.constraints} ${project.stack}`.toLowerCase();
  let score = 68;
  const matchedFits = [];
  const matchedRisks = [];

  fitKeywords.forEach((word) => {
    if (text.includes(word.toLowerCase())) {
      score += 4;
      matchedFits.push(word);
    }
  });

  riskKeywords.forEach((word) => {
    if (text.includes(word.toLowerCase())) {
      score -= 9;
      matchedRisks.push(word);
    }
  });

  score = Math.max(15, Math.min(95, score));

  return {
    score,
    level: score >= 80 ? "高" : score >= 60 ? "中" : "低",
    matchedFits,
    matchedRisks,
    recommendation:
      score >= 80
        ? "适合 Agent 深度辅助，但仍需人工验收关键结果。"
        : score >= 60
          ? "适合 Agent 部分辅助，核心逻辑和风险点需要人工确认。"
          : "不建议直接自动化，应先缩小范围并建立人工审核关卡。"
  };
}

export function buildReleaseGuard(project) {
  const checks = releaseChecklist.map((item) => `- [ ] ${item}`).join("\n");
  return `# ${project.name} - Release Guard\n\n## 发布前检查\n\n${checks}\n\n## 额外说明\n\n- 高风险文件需要在提交前人工复核。\n- 如果误提交过密钥，应立即废弃旧密钥并清理 Git 历史。\n- 公开仓库中的效果数据应保守、可解释、不过度营销。\n`;
}

export function calculateRiskMatrix(project) {
  const text = `${project.goal} ${project.constraints} ${project.stack}`.toLowerCase();
  const riskHits = riskKeywords.filter((word) => text.includes(word.toLowerCase()));
  const fitHits = fitKeywords.filter((word) => text.includes(word.toLowerCase()));
  const hasLocal = text.includes("本地") || text.includes("local") || text.includes("localstorage");
  const hasSimple = text.includes("简单") || text.includes("原型") || text.includes("静态");
  const hasData = text.includes("数据") || text.includes("数据库") || text.includes("用户");

  const clarity = Math.min(95, 55 + Math.min(project.goal.length, 120) / 3 + fitHits.length * 3);
  const automationFit = Math.max(20, Math.min(95, 62 + fitHits.length * 6 - riskHits.length * 8));
  const dataSensitivity = Math.max(10, Math.min(95, (hasData ? 34 : 18) + riskHits.length * 10 - (hasLocal ? 8 : 0)));
  const irreversibleRisk = Math.max(8, Math.min(95, riskHits.some((word) => ["删除", "迁移", "支付", "转账", "生产"].includes(word)) ? 72 : 18 + riskHits.length * 6));
  const humanReviewNeed = Math.max(25, Math.min(98, 45 + riskHits.length * 10 + (hasSimple ? -8 : 6)));

  return [
    { id: "clarity", label: "需求清晰度", score: Math.round(clarity), type: "positive" },
    { id: "automation", label: "自动化适合度", score: Math.round(automationFit), type: "positive" },
    { id: "sensitivity", label: "数据敏感度", score: Math.round(dataSensitivity), type: "risk" },
    { id: "irreversible", label: "不可逆风险", score: Math.round(irreversibleRisk), type: "risk" },
    { id: "review", label: "人工审核必要性", score: Math.round(humanReviewNeed), type: "risk" }
  ];
}

export function buildReadinessReport(project, fitResult, riskMatrix) {
  const completed = project.completedStages?.length || 0;
  const notes = workflowStages
    .map((stage) => `- **${stage.title} / ${stage.name}**：${project.stageNotes?.[stage.id] || "暂无记录"}`)
    .join("\n");
  const risks = riskMatrix.map((item) => `| ${item.label} | ${item.score}/100 | ${item.type === "risk" ? "风险维度" : "能力维度"} |`).join("\n");

  return `# ${project.name} - AI Readiness Report\n\n## 项目概述\n\n${project.goal}\n\n## 技术栈\n\n${project.stack}\n\n## 约束条件\n\n${project.constraints}\n\n## Agent Fit Score\n\n- 评分：${fitResult.score}/100\n- 等级：${fitResult.level}\n- 建议：${fitResult.recommendation}\n\n## Risk Matrix\n\n| 维度 | 分数 | 类型 |\n| --- | --- | --- |\n${risks}\n\n## 工作流进度\n\n已完成 ${completed}/${workflowStages.length} 个阶段。\n\n${notes}\n\n## 推荐下一步\n\n1. 先补齐未完成阶段的交付物和人工审核意见。\n2. 对高风险维度增加明确的人工确认步骤。\n3. 使用 Release Guard 检查公开发布风险。\n4. 将本报告和 Task Plan 一起保存到项目文档中。\n`;
}

export function downloadMarkdown(filename, content) {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
