const SEASONS = [
  'autumn', 'autumn', 'autumn', // 9 10 11
  'winter', 'winter', 'winter', // 12 1 2
  'spring', 'spring', 'spring', // 3 4 5
  'summer', 'summer', 'summer', // 6 7 8
];

const COLORS = {
  winter: '#bfe7ff',
  spring: '#ffd1e6',
  summer: '#9bffb0',
  autumn: '#ffbf69',
};

function polar(cx, cy, r, angle) {
  const a = (angle - 90) * Math.PI / 180;
  return {
    x: cx + r * Math.cos(a),
    y: cy + r * Math.sin(a),
  };
}

function ringSegment(cx, cy, rOuter, rInner, start, end) {
  const p1 = polar(cx, cy, rOuter, end);
  const p2 = polar(cx, cy, rOuter, start);
  const p3 = polar(cx, cy, rInner, start);
  const p4 = polar(cx, cy, rInner, end);

  return `
    M ${p1.x} ${p1.y}
    A ${rOuter} ${rOuter} 0 0 0 ${p2.x} ${p2.y}
    L ${p3.x} ${p3.y}
    A ${rInner} ${rInner} 0 0 1 ${p4.x} ${p4.y}
    Z
  `;
}
export default function SeasonsRing({
  size = 420,
  outerRadius = 200,
  innerRadius = 160,
}) {
  const c = size / 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }}
    >
      {Array.from({ length: 12 }).map((_, i) => {
        const start = i * 30;
        const end = start + 30;

        return (
          <path
            key={i}
            d={ringSegment(c, c, outerRadius, innerRadius, start, end)}
            fill={COLORS[SEASONS[i]]}
          />
        );
      })}
    </svg>
  );
}
