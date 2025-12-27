import { useEffect, useMemo, useState } from 'react';
import './DugaPainting.css';

import sp1 from '../../assets/sp1.png';
import sp2 from '../../assets/sp2.png';
import sp3 from '../../assets/sp3.png';
import sp4 from '../../assets/sp4.png';

// визуальный порядок (как часы)
const visualOrder = [9,10,11,12,1,2,3,4,5,6,7,8];

export default function DugaPainting({ data, onComplete }) {
  const BASE_RADIUS = 185;

  const [activeStep, setActiveStep] = useState(0);

  // 🔥 порядок анимации: 1 → 12 из JSON
  const animationOrder = useMemo(() => {
    return [...data]
      .sort((a, b) => a.Number - b.Number)
      .map(item => item.Number);
  }, [data]);

  // ⏱ таймлайн покраски дуг
  useEffect(() => {
    if (activeStep >= animationOrder.length) {
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      setActiveStep(s => s + 1);
    }, 400);

    return () => clearTimeout(timer);
  }, [activeStep, animationOrder.length, onComplete]);

  return (
    <div className="duga-overlay">
      <div className="duga-circle">

        {/* 🌈 4 СЕЗОННЫЕ ДУГИ */}
        <img src={sp1} className="duga duga-1" />
        <img src={sp2} className="duga duga-2" />
        <img src={sp3} className="duga duga-3" />
        <img src={sp4} className="duga duga-4" />

        {/* 🔹 АКТИВАЦИЯ СЕКТОРОВ (логика как у цифр) */}
        {visualOrder.map((num, i) => {
          const angle = i * 30 - 90 + 15;

          const isActive = animationOrder
            .slice(0, activeStep)
            .includes(num);

          return (
            <div
              key={num}
              className={`duga-mask ${isActive ? 'active' : ''}`}
              style={{
                transform: `
                  rotate(${angle}deg)
                  translateY(-${BASE_RADIUS}px)
                `,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
