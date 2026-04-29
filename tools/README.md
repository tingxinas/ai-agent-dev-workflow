# Agentic Dev Toolkit

这是一个离线可用的网页工具箱，位于 `tools/index.html`。它不需要后端、不调用外部 API，所有输入都只在浏览器本地处理。

## 功能

### 1. Prompt Builder

根据项目名称、目标、技术栈和约束条件生成结构化 Agent Prompt。

支持模式：

- Clarify：需求澄清；
- Plan：任务拆解；
- Build：代码实现；
- Debug：问题定位；
- Review：代码审查；
- Ship：发布检查。

### 2. Task Planner

自动生成 Agentic Development Workflow 的任务计划表，包含：

- 阶段；
- Agent 职责；
- 人工审核点；
- 验收标准；
- 建议里程碑。

### 3. Agent Fit Score

根据项目描述和约束条件，给出任务是否适合交给 Agent 辅助的经验评分。

评分不是严格模型，只用于提醒开发者：

- 哪些任务适合 AI 辅助；
- 哪些任务必须人工确认；
- 是否涉及高风险关键词。

### 4. Release Guard

生成公开发布 GitHub 仓库前的 Markdown 检查清单，覆盖敏感信息、文档、截图、示例数据和发布后检查。

## 使用方式

直接用浏览器打开：

```text
tools/index.html
```

或者通过 GitHub Pages / 静态服务器访问。

## 设计原则

- 离线可用；
- 不上传数据；
- 输出 Markdown；
- 强调人工审核；
- 适合个人项目和小团队复用。
