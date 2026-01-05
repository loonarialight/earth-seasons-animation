import { SEGMENTS } from "./segments";

const CENTER = 210;
const RADIUS = 176;
const STROKE = 30;
const SEGMENT_ANGLE = 360 / 12;

const INNER_RADIUS = RADIUS - STROKE / 2;
const OUTER_RADIUS = RADIUS + STROKE / 2;

export default function SeasonRing({ activeIndex }) {
  const polar = (angle, r) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: CENTER + r * Math.cos(rad),
      y: CENTER + r * Math.sin(rad),
    };
  };

  return (
    <svg
      className="season-ring"
      width="420"
      height="420"
      viewBox="0 0 420 420"
      pointerEvents="none"   // 👈 ВАЖНО
    >
      {SEGMENTS.map(seg => {
        if (seg.index > activeIndex) return null;

        const startAngle = -90 + seg.index * SEGMENT_ANGLE;
        const endAngle = startAngle + SEGMENT_ANGLE;

        const start = polar(startAngle, RADIUS);
        const end = polar(endAngle, RADIUS);

        const d = `
          M ${start.x} ${start.y}
          A ${RADIUS} ${RADIUS} 0 0 1 ${end.x} ${end.y}
        `;

        const dividerAngle = startAngle;
        const p1 = polar(dividerAngle, INNER_RADIUS);
        const p2 = polar(dividerAngle, OUTER_RADIUS);

        return (
          <g key={seg.index}>
            <path
              d={d}
              fill="none"
              stroke={seg.color}
              strokeWidth={STROKE}
              strokeLinecap="butt"   // 👈 ЧЁТКИЙ КРАЙ, НЕ ЗАЛЕЗАЕТ
            />
            <line
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke="#000"
              strokeWidth="1"
              opacity="0.5"
            />
          </g>
        );
      })}
    </svg>
  );
}
