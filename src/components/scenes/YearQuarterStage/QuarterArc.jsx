const CENTER = 210;
const RADIUS = 185;          // совпадает с YearRing
const SEGMENT = 360 / 12;

const COLORS = [
  "#9CCEEC", // зима
  "#ADE6FF", // весна
  "#CBEEF7", // лето
  "#FEE58A", // осень
];

export default function QuarterArc({ quarterIndex }) {
  const startAngle = -90 + quarterIndex * 3 * SEGMENT;
  const endAngle = startAngle + 3 * SEGMENT;

  const polar = (angle) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: CENTER + RADIUS * Math.cos(rad),
      y: CENTER + RADIUS * Math.sin(rad),
    };
  };

  const start = polar(startAngle);
  const end = polar(endAngle);

  const d = `
    M ${start.x} ${start.y}
    A ${RADIUS} ${RADIUS} 0 0 1 ${end.x} ${end.y}
  `;

  return (
    <svg
      width="420"
      height="420"
      viewBox="0 0 420 420"
      className="quarter-arc"
    >
      <path
        d={d}
        fill="none"
        stroke={COLORS[quarterIndex]}
        strokeWidth="30"
        strokeLinecap="round"
      />
    </svg>
  );
}
