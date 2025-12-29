import { SEGMENTS } from "./segments";

const CENTER = 210;
const RADIUS = 230; // 🔑 ВАЖНО: больше радиуса дуги
const SEGMENT_ANGLE = 360 / 12;

export default function MonthNumbersArc({ activeIndex }) {
  return (
    <svg
      className="month-number-label"
      width="420"
      height="420"
      viewBox="0 0 420 420"
    >
      {SEGMENTS.map(seg => {
        if (seg.index > activeIndex) return null;

        const angle = -90 + (seg.index + 0.5) * SEGMENT_ANGLE;
        const rad = (angle * Math.PI) / 180;

        const x = CENTER + Math.cos(rad) * RADIUS;
        const y = CENTER + Math.sin(rad) * RADIUS;

        return (
          <text
            key={seg.index}
            x={x}
            y={y}
            fill="#000"
            fontSize="16"
            fontWeight="700"
            textAnchor="middle"
            dominantBaseline="middle"
            transform={`rotate(${angle + 90} ${x} ${y})`}
          >
            {seg.index === 0 ? 12 : seg.index}
          </text>
        );
      })}
    </svg>
  );
}
