import { useEffect, useState } from "react";

const RADIUS = 1;
const CENTER = 240;
const SEGMENT = 360 / 12;

export default function ActiveArc({ index, animate = false }) {
  const [progress, setProgress] = useState(animate ? 0 : 1);

  useEffect(() => {
    if (!animate) return;

    let frame;
    let start;

    function animateArc(ts) {
      if (!start) start = ts;
      const t = Math.min((ts - start) / 600, 1);
      setProgress(t);
      if (t < 1) frame = requestAnimationFrame(animateArc);
    }

    frame = requestAnimationFrame(animateArc);
    return () => cancelAnimationFrame(frame);
  }, [animate]);

  const startAngle = -90 + index * SEGMENT;
  const endAngle = startAngle + SEGMENT * progress;

  const polar = (angle) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: CENTER + RADIUS * Math.cos(rad),
      y: CENTER + RADIUS * Math.sin(rad),
    };
  };

  const start = polar(startAngle);
  const end = polar(endAngle);

  const largeArc = progress * SEGMENT > 180 ? 1 : 0;

  const d = `
    M ${start.x} ${start.y}
    A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${end.x} ${end.y}
  `;

  return (
    <svg
      width="480"
      height="480"
      viewBox="0 0 480 480"
      className="active-number"
    >

      <path
        d={d}
        fill="none"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}
