const CENTER = 210;
const RADIUS = 176;
const STROKE = 30;
const SEGMENT = 360 / 12;

const SEASON_META = [
  { color: "#9CCEEC", start: 12 }, // ❄ 12,1,2
  { color: "#ADE6FF", start: 3 },  // 🌸 3,4,5
  { color: "#CBEEF7", start: 6 },  // ☀ 6,7,8
  { color: "#FEE58A", start: 9 },  // 🍂 9,10,11
];

export default function SeasonRing({ visibleSeasons, monthsInSeason }) {
  const polar = (angle, r) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: CENTER + r * Math.cos(rad),
      y: CENTER + r * Math.sin(rad),
    };
  };

  return (
    <svg width="420" height="420" viewBox="0 0 420 420">
      {SEASON_META.slice(0, visibleSeasons).map((s, i) => {
        const startAngle = -90 + s.start * SEGMENT;

        const months =
          i === visibleSeasons - 1 ? monthsInSeason : 3;

        const endAngle = startAngle + months * SEGMENT;

        const start = polar(startAngle, RADIUS);
        const end = polar(endAngle, RADIUS);

        const d = `
          M ${start.x} ${start.y}
          A ${RADIUS} ${RADIUS} 0 0 1 ${end.x} ${end.y}
        `;

        return (
          <g key={i}>
            {/* 🌈 основная дуга сезона */}
            <path
              d={d}
              fill="none"
              stroke={s.color}
              strokeWidth={STROKE}
              strokeLinecap="butt"
            />

            {/* │ разделители месяцев */}
            {/* │ разделители месяцев + линия старта */}
            {[0, 1, 2].map((m) => {
              // линия появляется, если дуга уже дошла до этого месяца
              if (m > months) return null;

              const angle = startAngle + m * SEGMENT;

              const p1 = polar(angle, RADIUS - STROKE / 2);
              const p2 = polar(angle, RADIUS + STROKE / 2);

              return (
                <line
                  key={m}
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke="#000"
                  strokeWidth="1"
                  opacity="0.6"
                />
              );
            })}

          </g>
        );
      })}
    </svg>
  );
}
