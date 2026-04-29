export function RiskMatrix({ items }) {
  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Risk Matrix</p>
          <h2>多维风险矩阵</h2>
        </div>
        <span className="badge">5 dimensions</span>
      </div>

      <div className="risk-list">
        {items.map((item) => (
          <div className="risk-row" key={item.id}>
            <div>
              <strong>{item.label}</strong>
              <small>{item.type === "risk" ? "风险越高越需要人工审核" : "分数越高越适合 Agent 辅助"}</small>
            </div>
            <div className="meter" aria-label={`${item.label} ${item.score}`}>
              <span style={{ width: `${item.score}%` }} className={item.type === "risk" ? "risk-fill" : "fit-fill"} />
            </div>
            <b>{item.score}</b>
          </div>
        ))}
      </div>
    </section>
  );
}
