export const workflowStages = [
  {
    id: "clarify",
    title: "Clarify",
    name: "需求澄清",
    description: "把模糊想法转成目标、边界、验收标准和风险点。",
    deliverable: "需求澄清文档"
  },
  {
    id: "plan",
    title: "Plan",
    name: "任务拆解",
    description: "将需求拆成可执行任务，明确优先级、依赖和测试路径。",
    deliverable: "任务计划"
  },
  {
    id: "build",
    title: "Build",
    name: "代码实现",
    description: "使用 Agent 生成初稿、补充错误处理、重构重复逻辑。",
    deliverable: "可运行功能"
  },
  {
    id: "debug",
    title: "Debug",
    name: "问题定位",
    description: "基于现象、日志和代码形成可能原因、验证步骤和修复方案。",
    deliverable: "Debug 分析记录"
  },
  {
    id: "review",
    title: "Review",
    name: "人工审核",
    description: "检查需求符合度、安全风险、依赖变化和可维护性。",
    deliverable: "审查记录"
  },
  {
    id: "ship",
    title: "Ship",
    name: "发布交付",
    description: "整理 README、运行说明、发布检查清单和复盘记录。",
    deliverable: "发布材料"
  }
];

export const promptModes = {
  clarify: "需求澄清",
  plan: "任务拆解",
  build: "代码实现",
  debug: "问题定位",
  review: "代码审查",
  ship: "发布检查"
};

export const releaseChecklist = [
  "没有 .env 文件、Token、密钥、密码或 Cookie",
  "没有真实用户数据、客户数据或未脱敏日志",
  "README 描述准确，没有夸大效果",
  "运行方式、构建方式和已知限制清楚",
  "截图、录屏、示例数据可以公开",
  "License 和第三方依赖说明完整",
  "发布后 GitHub 页面链接可访问"
];

export const riskKeywords = ["支付", "权限", "密码", "token", "密钥", "生产", "删除", "迁移", "客户", "隐私", "数据库", "转账"];
export const fitKeywords = ["本地", "静态", "模板", "文档", "页面", "脚本", "工具", "原型", "看板", "清单"];
