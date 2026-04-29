import { AlertTriangle, ShieldCheck, Sparkles } from "lucide-react";

export function ScoreCard({ result }) {
  return (
    <section className="panel score-panel">
      <div>
        <p className="eyebrow">Agent Fit Score</p>
        <h2>任务适配度</h2>
      </div>

      <div className="score-row">
        <div className="score-number">{result.score}</div>
        <div>
          <span className={`level level-${result.level}`}>{result.level}</span>
          <p>{result.recommendation}</p>
        </div>
      </div>

      <div className="signal-grid">
        <div className="signal-card">
          <Sparkles size={18} />
          <strong>适合 Agent 的信号</strong>
          <p>{result.matchedFits.length ? result.matchedFits.join("、") : "暂无明显信号"}</p>
        </div>
        <div className="signal-card">
          <AlertTriangle size={18} />
          <strong>需要谨慎的信号</strong>
          <p>{result.matchedRisks.length ? result.matchedRisks.join("、") : "暂无明显风险"}</p>
        </div>
        <div className="signal-card">
          <ShieldCheck size={18} />
          <strong>建议策略</strong>
          <p>让 Agent 负责初稿和分析，让人负责验收、权限、安全和发布决策。</p>
        </div>
      </div>
    </section>
  );
}
