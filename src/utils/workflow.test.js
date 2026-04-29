import { describe, expect, it } from "vitest";
import { createDefaultProject } from "../data/defaults";
import { buildPrompt, buildReadinessReport, buildTaskPlan, calculateAgentFit, calculateRiskMatrix } from "./workflow";

const project = createDefaultProject({
  id: "test-id",
  name: "测试项目",
  goal: "构建一个本地静态工具，用于生成项目计划。",
  stack: "React, Vite",
  constraints: "不上传数据，不涉及支付。"
});

describe("workflow utils", () => {
  it("builds prompt with project context", () => {
    const prompt = buildPrompt(project);
    expect(prompt).toContain("测试项目");
    expect(prompt).toContain("React, Vite");
  });

  it("builds task plan", () => {
    const plan = buildTaskPlan(project);
    expect(plan).toContain("Agentic Task Plan");
    expect(plan).toContain("Clarify");
  });

  it("calculates fit score", () => {
    const result = calculateAgentFit(project);
    expect(result.score).toBeGreaterThan(0);
    expect(result.level).toBeTruthy();
  });

  it("calculates risk matrix", () => {
    const matrix = calculateRiskMatrix(project);
    expect(matrix).toHaveLength(5);
    expect(matrix[0]).toHaveProperty("score");
  });

  it("builds readiness report", () => {
    const fit = calculateAgentFit(project);
    const matrix = calculateRiskMatrix(project);
    const report = buildReadinessReport(project, fit, matrix);
    expect(report).toContain("AI Readiness Report");
    expect(report).toContain("Risk Matrix");
  });
});
