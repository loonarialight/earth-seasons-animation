import { useEffect, useMemo, useState } from 'react';
import './Numbers.css';

const visualOrder = [9,10,11,12,1,2,3,4,5,6,7,8];

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

export default function Numbers({ data, onComplete }) {
  const [activeStep, setActiveStep] = useState(0);

  const SIZE = 420;
  const C = SIZE / 2;

  const ARC_OUTER = 210;
  const ARC_INNER = 170;
  const DIGIT_RADIUS = 225;

  const animationOrder = useMemo(
    () => [...data].sort((a,b) => a.Number - b.Number).map(x => x.Number),
    [data]
  );

  useEffect(() => {
    if (activeStep >= animationOrder.length) {
      onComplete?.();
      return;
    }
    const t = setTimeout(() => setActiveStep(s => s + 1), 250);
    return () => clearTimeout(t);
  }, [activeStep, animationOrder.length, onComplete]);

  return (
    <div className="numbers-overlay">
      <div className="numbers-circle">

        {/* ДУГИ */}
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          style={{ position: 'absolute', inset: 0 }}
        >
          {visualOrder.map((num, i) => {
            if (!animationOrder.slice(0, activeStep).includes(num)) return null;

            const start = i * 30;
            const end = start + 30;

            return (
              <path
                key={num}
                d={ringSegment(C, C, ARC_OUTER, ARC_INNER, start, end)}
                fill="#fff"
                stroke="#000"
                strokeWidth="2"
              />
            );
          })}
        </svg>

        {/* ЦИФРЫ — СТРОГО НАД ДУГАМИ */}
        {visualOrder.map((num, i) => {
          if (!animationOrder.slice(0, activeStep).includes(num)) return null;

          const angle = i * 30 - 90 + 15;

          return (
            <div
              key={num}
              className="number visible"
              style={{
                transform: `
                  rotate(${angle}deg)
                  translateY(-${DIGIT_RADIUS}px)
                `,
                color: '#000',
                fontWeight: 700,
              }}
            >
              {num}
            </div>
          );
        })}
      </div>
    </div>
  );
}
