import { Locale } from "@/types";

type NeuralNetworkDiagramProps = {
  locale: Locale;
};

const copy = {
  en: {
    title: "A simple neural network",
    input: "Input",
    hidden: "Hidden layers",
    output: "Output",
    caption:
      "Each connection carries a learnable weight. Hidden layers transform the input step by step before the network produces an output.",
  },
  tr: {
    title: "Basit bir yapay sinir ağı",
    input: "Girdi",
    hidden: "Gizli katmanlar",
    output: "Çıktı",
    caption:
      "Her bağlantı öğrenilebilir bir ağırlığı temsil eder. Gizli katmanlar, ağ çıktı üretmeden önce girdiyi adım adım dönüştürür.",
  },
} as const;

const inputNodes = [64, 124, 184];
const firstHiddenNodes = [48, 96, 144, 192];
const secondHiddenNodes = [68, 124, 180];

export function NeuralNetworkDiagram({ locale }: NeuralNetworkDiagramProps) {
  const labels = copy[locale];

  return (
    <figure className="neural-network-diagram">
      <svg
        viewBox="0 0 620 258"
        role="img"
        aria-labelledby="neural-network-title neural-network-description"
      >
        <title id="neural-network-title">{labels.title}</title>
        <desc id="neural-network-description">{labels.caption}</desc>

        <g className="neural-network-links">
          {inputNodes.flatMap((startY) =>
            firstHiddenNodes.map((endY) => (
              <line key={`input-${startY}-${endY}`} x1="92" y1={startY} x2="248" y2={endY} />
            )),
          )}
          {firstHiddenNodes.flatMap((startY) =>
            secondHiddenNodes.map((endY) => (
              <line key={`hidden-${startY}-${endY}`} x1="272" y1={startY} x2="418" y2={endY} />
            )),
          )}
          {secondHiddenNodes.map((startY) => (
            <line key={`output-${startY}`} x1="442" y1={startY} x2="530" y2="124" />
          ))}
        </g>

        <g className="neural-network-nodes">
          {inputNodes.map((cy) => (
            <circle key={`input-node-${cy}`} cx="80" cy={cy} r="12" />
          ))}
          {firstHiddenNodes.map((cy) => (
            <circle key={`first-hidden-node-${cy}`} cx="260" cy={cy} r="12" />
          ))}
          {secondHiddenNodes.map((cy) => (
            <circle key={`second-hidden-node-${cy}`} cx="430" cy={cy} r="12" />
          ))}
          <circle className="neural-network-output" cx="542" cy="124" r="14" />
        </g>

        <g className="neural-network-labels">
          <text x="80" y="232" textAnchor="middle">
            {labels.input}
          </text>
          <text x="345" y="232" textAnchor="middle">
            {labels.hidden}
          </text>
          <text x="542" y="232" textAnchor="middle">
            {labels.output}
          </text>
        </g>
      </svg>
      <figcaption>{labels.caption}</figcaption>
    </figure>
  );
}
