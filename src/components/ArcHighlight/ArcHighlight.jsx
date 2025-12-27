import { useEffect, useState } from 'react';
import './ArcHighlight.css';

export default function ArcHighlight({
  count = 12,              // количество шагов
  durationPerStep = 400,   // длительность одного шага в мс
  color = '#FFFFFF',       // 👈 белый цвет по умолчанию
  size = 420,              // диаметр кольца в px
  thickness = 16,          // толщина кольца в px
  onComplete,
}) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= count) {
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      setStep((s) => s + 1);
    }, durationPerStep);

    return () => clearTimeout(timer);
  }, [step, count, durationPerStep, onComplete]);

  const angle = (360 / count) * step;

  // Вычисляем проценты для маски на основе толщины
  const radius = size / 2;
  const innerPercent = ((radius - thickness) / radius) * 100;
  const outerPercent = 100; // внешний край всегда 100%

  return (
    <div className="arc-overlay">
      <div
        className="arc-ring"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          background: `
            conic-gradient(
              ${color} 0deg ${angle}deg,
              transparent ${angle}deg 360deg
            )
          `,
          mask: `radial-gradient(
            circle,
            transparent ${innerPercent.toFixed(2)}%,
            black ${outerPercent}%
          )`,
          WebkitMask: `radial-gradient(
            circle,
            transparent ${innerPercent.toFixed(2)}%,
            black ${outerPercent}%
          )`,
        }}
      />
    </div>
  );
}