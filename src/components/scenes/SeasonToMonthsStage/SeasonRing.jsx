const CENTER = 210;
const RADIUS = 185;
const STROKE = 30;
const SEGMENT = 360 / 12;

const SEASON_META = [
  { color: "#9CCEEC", start: 12 }, // ❄ 12,1,2
  { color: "#ADE6FF", start: 3 },  // 🌸 3,4,5
  { color: "#CBEEF7", start: 6 },  // ☀ 6,7,8
  { color: "#FEE58A", start: 9 },  // 🍂 9,10,11
];

export default function SeasonRing({ visibleCount }) {
  const polar = (angle) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: CENTER + RADIUS * Math.cos(rad),
      y: CENTER + RADIUS * Math.sin(rad),
    };
  };

  return (
    <svg
      width="420"
      height="420"
      viewBox="0 0 420 420"
      className="season-ring"
    >
      {SEASON_META.slice(0, visibleCount).map((s, i) => {
        const startAngle = -90 + s.start * SEGMENT;
        const endAngle = startAngle + 3 * SEGMENT;

        const start = polar(startAngle);
        const end = polar(endAngle);

        const d = `
          M ${start.x} ${start.y}
          A ${RADIUS} ${RADIUS} 0 0 1 ${end.x} ${end.y}
        `;

        return (
          <path
            key={i}
            d={d}
            fill="none"
            stroke={s.color}
            strokeWidth={STROKE}
            strokeLinecap="butt"
          />
        );
      })}
    </svg>
  );
}
