import { useEffect, useState } from 'react';
import './Numbers.css';

import p1 from '../../assets/p1.png';
import p2 from '../../assets/p2.png';
import p3 from '../../assets/p3.png';
import p4 from '../../assets/p4.png';

// порядок ДЛЯ ЧАСОВ (расположение)
const numbers = [9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8];

// порядок ДЛЯ АНИМАЦИИ
const animationOrder = [1,2,3,4,5,6,7,8,9,10,11,12];

export default function Numbers({ onComplete }) {
  const BASE_RADIUS = 185;
  const FINAL_SHIFT = 50;

  const [activeStep, setActiveStep] = useState(0);
  const [finalPhase, setFinalPhase] = useState(false);

  // ⏱ появление цифр
  useEffect(() => {
    if (activeStep >= animationOrder.length) {
      // 🔥 когда все цифры появились — запускаем финальное движение
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
  }, [activeStep, onComplete]);

  return (
    <div className="numbers-overlay">
      <div className="numbers-circle">

        {/* КОЛЬЦО */}
        <img src={p1} className="ring ring-1" />
        <img src={p2} className="ring ring-2" />
        <img src={p3} className="ring ring-3" />
        <img src={p4} className="ring ring-4" />

        {/* ЦИФРЫ */}
        {numbers.map((n, i) => {
          const angle = i * 30 - 90 + 15;

          const isVisible = animationOrder
            .slice(0, activeStep)
            .includes(n);

          return (
            <div
              key={n}
              className={`
                number
                ${isVisible ? 'visible' : ''}
                ${finalPhase ? 'final' : ''}
              `}
              style={{
                transform: `
                  rotate(${angle}deg)
                  translateY(-${BASE_RADIUS + (finalPhase ? FINAL_SHIFT : 0)}px)
                `,
              }}
            >
              {n}
            </div>
          );
        })}
      </div>
    </div>
  );
}
