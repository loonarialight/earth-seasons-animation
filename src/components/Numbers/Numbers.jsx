import { useEffect, useMemo, useState } from 'react';
import './Numbers.css';

import winter from '../../assets/winter.png';
import spring from '../../assets/spring.png';
import summer from '../../assets/summer.png';
import autumn from '../../assets/autumn.png';
import p1 from '../../assets/p1.png';
import p2 from '../../assets/p2.png';
import p3 from '../../assets/p3.png';
import p4 from '../../assets/p4.png';


// визуальный порядок (как часы)
const visualOrder = [9,10,11,12,1,2,3,4,5,6,7,8];

export default function Numbers({ data, onComplete }) {
  const BASE_RADIUS = 185;
  const FINAL_SHIFT = 50;

  const [activeStep, setActiveStep] = useState(0);
  const [finalPhase, setFinalPhase] = useState(false);

  // 🔥 порядок анимации: 1 → 12 из JSON
  const animationOrder = useMemo(() => {
    return [...data]
      .sort((a, b) => a.Number - b.Number)
      .map(item => item.Number);
  }, [data]);

  // ⏱ таймлайн появления цифр
  useEffect(() => {
    if (activeStep >= animationOrder.length) {
      setTimeout(() => {
        setFinalPhase(true);
        onComplete?.();
      }, 600);
      return;
    }

    const timer = setTimeout(() => {
      setActiveStep(s => s + 1);
    }, 250);

    return () => clearTimeout(timer);
  }, [activeStep, animationOrder.length, onComplete]);

  return (
    <div className="numbers-overlay">
      <div className="numbers-circle">
        {/* ПОДЛОЖКИ */}
        <img src={p1} className="podlozhka podlozhka-1" />
        <img src={p2} className="podlozhka podlozhka-2" />
        <img src={p3} className="podlozhka podlozhka-3" />
        <img src={p4} className="podlozhka podlozhka-4" />

        {/* КОЛЬЦО */}
        <img src={winter} className="ring ring-1" />
        <img src={spring} className="ring ring-2" />
        <img src={summer} className="ring ring-3" />
        <img src={autumn} className="ring ring-4" />

        {/* 🔢 ЦИФРЫ ИЗ JSON */}
        {visualOrder.map((num, i) => {
          const angle = i * 30 - 90 + 15;

          const isVisible = animationOrder
            .slice(0, activeStep)
            .includes(num);

          return (
            <div
              key={num}
              className={`
                number
                ${isVisible ? 'visible' : ''}
                ${finalPhase ? 'final' : ''}
              `}
              style={{
              transform: `
                rotate(${angle}deg)
                translateY(-${BASE_RADIUS + (finalPhase ? FINAL_SHIFT : 0)}px)
                scale(${finalPhase ? 1.05 : 1})
              `,
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
