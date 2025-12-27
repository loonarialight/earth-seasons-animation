const COLORS = {
  winter: '#9CCEEC',
  spring: '#ADE6FF',
  summer: '#CBEEF7',
  autumn: '#FEE58A',
};

// строго по часовой стрелке
const SECTORS = [
  { season: 'winter', start: -90, end: 0 },
  { season: 'spring', start: 0, end: 90 },
  { season: 'summer', start: 90, end: 180 },
  { season: 'autumn', start: 180, end: 270 },
];

function polar(cx, cy, r, angle) {
  const a = (angle * Math.PI) / 180;
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
      {SECTORS.slice(0, visibleCount).map(s => (
        <path
          key={s.season}
          d={sectorPath(c, c, c, s.start, s.end)}
          fill={COLORS[s.season]}
        />
      ))}
    </svg>
  );
}
