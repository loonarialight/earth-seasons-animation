const COLORS = {
  winter: '#bfe7ff',
  spring: '#ffd1e6',
  summer: '#9bffb0',
  autumn: '#ffbf69',
};

// 🔑 4 равных сектора по 90°
const SECTORS = [
  { season: 'winter', start: -90, end: 0 },     // верх-право
  { season: 'spring', start: 0, end: 90 },      // низ-право
  { season: 'summer', start: 90, end: 180 },    // низ-лево
  { season: 'autumn', start: 180, end: 270 },   // верх-лево
];

function polar(cx, cy, r, angle) {
  const a = angle * Math.PI / 180;
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

export default function EarthSeasonsOverlay({ size = 360 }) {
  const c = size / 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '50%',
        pointerEvents: 'none',
      }}
    >
      {SECTORS.map(s => (
        <path
          key={s.season}
          d={sectorPath(c, c, c, s.start, s.end)}
          fill={COLORS[s.season]}
          opacity="0.6"
        />
      ))}
    </svg>
  );
}
