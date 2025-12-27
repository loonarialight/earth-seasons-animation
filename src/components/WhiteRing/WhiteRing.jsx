import { useEffect, useState } from 'react';

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

export default function WhiteRing({
  size = 420,
  outerRadius = 210,
  innerRadius = 170,
}) {
  const c = size / 2;
  const [visible, setVisible] = useState(false);

  // ▶️ запуск анимации при маунте
  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `
          translate(-50%, -50%)
          scale(${visible ? 1 : 0})
        `,
        opacity: visible ? 0.95 : 0,
        transformOrigin: 'center center',
        transition: 'transform 0.8s ease-out, opacity 0.6s ease-out',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      {Array.from({ length: 12 }).map((_, i) => {
        const start = i * 30;
        const end = start + 30;

        return (
          <path
            key={i}
            d={ringSegment(c, c, outerRadius, innerRadius, start, end)}
            fill="#ffffff"
          />
        );
      })}
    </svg>
  );
}
