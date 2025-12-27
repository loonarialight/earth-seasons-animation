const COLORS = {
  winter: '#9CCEEC',
  spring: '#ADE6FF',
  summer: '#CBEEF7',
  autumn: '#FEE58A',
};

const TITLES = {
  winter: 'ЗИМА',
  spring: 'ВЕСНА',
  summer: 'ЛЕТО',
  autumn: 'ОСЕНЬ',
};

// 4 сектора по часовой стрелке
const SECTORS = [
  { season: 'winter', start: -90, end: 0 },
  { season: 'spring', start: 0, end: 90 },
  { season: 'summer', start: 90, end: 180 },
  { season: 'autumn', start: 180, end: 270 },
];

function polar(cx, cy, r, angleDeg) {
  const a = (angleDeg * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(a),
    y: cy + r * Math.sin(a),
  };
}

function sectorPath(cx, cy, r, start, end) {
  const p1 = polar(cx, cy, r, start);
  const p2 = polar(cx, cy, r, end);

  return `
    M ${cx} ${cy}
    L ${p1.x} ${p1.y}
    A ${r} ${r} 0 0 1 ${p2.x} ${p2.y}
    Z
  `;
}

export default function EarthSeasonsOverlay({
  size = 360,
  visibleCount = 0,
}) {
  const c = size / 2;
  const textRadius = size * 0.35; // 🔹 глубина текста внутри сектора

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
    >
      {SECTORS.slice(0, visibleCount).map(s => {
        const midAngle = (s.start + s.end) / 2;
        const pos = polar(c, c, textRadius, midAngle);

        return (
          <g key={s.season}>
            {/* СЕКТОР */}
            <path
              d={sectorPath(c, c, c, s.start, s.end)}
              fill={COLORS[s.season]}
            />

            {/* ТЕКСТ ВНУТРИ СЕКТОРА */}
            <text
              x={pos.x}
              y={pos.y}
              fill="#ffffff"
              fontSize="22"
              fontWeight="600"
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`rotate(${midAngle + 90}, ${pos.x}, ${pos.y})`}
              style={{
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.08em',
              }}
            >
              {TITLES[s.season]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
