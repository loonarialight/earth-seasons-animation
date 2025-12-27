import { useEffect, useState } from 'react';
import './Numbers.css';

const TOTAL = 12;
const STEP_DURATION = 250;

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

export default function Numbers({ onComplete }) {
  const [step, setStep] = useState(0);

  const size = 420;
  const c = size / 2;
  const outerRadius = 210;
  const innerRadius = 160;

  useEffect(() => {
    if (step >= TOTAL) {
      onComplete?.();
      return;
    }

    const t = setTimeout(() => {
      setStep(s => s + 1);
    }, STEP_DURATION);

    return () => clearTimeout(t);
  }, [step, onComplete]);

  return (
    <div className="numbers-overlay">
      <svg
        className="numbers-circle"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        {Array.from({ length: step }).map((_, i) => {
          const start = i * 30;
          const end = start + 30;

          const mid = start + 15;
          const textPos = polar(c, c, outerRadius + 22, mid);

          return (
            <g key={i}>
              {/* ДУГА 1/12 */}
              <path
                d={ringSegment(c, c, outerRadius, innerRadius, start, end)}
                fill="#ffffff"
                stroke="#000000"
                strokeWidth="2"
              />

              {/* ЦИФРА */}
              <text
                x={textPos.x}
                y={textPos.y}
                fill="#000000"
                fontSize="16"
                fontWeight="700"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {i + 1}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
