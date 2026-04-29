import { Copy, Download } from "lucide-react";
import { downloadMarkdown } from "../utils/workflow";

export function OutputPanel({ title, content, filename }) {
  const copy = async () => {
    await navigator.clipboard.writeText(content);
  };

  return (
    <section className="panel output-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Generated Artifact</p>
          <h2>{title}</h2>
        </div>
        <div className="actions compact">
          <button type="button" className="secondary" onClick={copy}>
            <Copy size={16} /> 复制
          </button>
          <button type="button" onClick={() => downloadMarkdown(filename, content)}>
            <Download size={16} /> 导出
          </button>
        </div>
      </div>
      <pre>{content}</pre>
    </section>
  );
}
