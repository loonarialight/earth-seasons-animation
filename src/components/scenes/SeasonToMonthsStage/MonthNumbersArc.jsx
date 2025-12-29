import { SEGMENTS } from "./segments";

const CENTER = 210;
const RADIUS = 178;
const SEGMENT = 360 / 12;

export default function MonthNumbersArc({ activeIndex }) {
  return (
    <svg
      className="month-number-label"
      width="420"
      height="420"
      viewBox="0 0 420 420"
    >
      {SEGMENTS.map((seg) => {
        if (seg.index > activeIndex) return null;

        // 🔑 правильный угол: сверху и по часовой
        const angle = -90 + seg.index * SEGMENT + SEGMENT / 2;
        const rad = (angle * Math.PI) / 180;

        const x = CENTER + Math.cos(rad) * RADIUS;
        const y = CENTER + Math.sin(rad) * RADIUS;

        // 0 → 12, дальше как есть
        const label = seg.index === 0 ? 12 : seg.index;

        return (
          <text
            key={seg.index}
            x={x}
            y={y}
            fill="#000"
            fontSize="14"
            fontWeight="700"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
}
