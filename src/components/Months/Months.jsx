  import { useEffect, useMemo, useState } from 'react';
  import './Months.css';

  // порядок РАСПОЛОЖЕНИЯ на круге (как цифры часов)
  const visualOrder = [9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8];

  export default function Months({ data }) {
    const BASE_RADIUS = 155;
    const LIFT = 27;

    const [step, setStep] = useState(0);

    // 🛡 защита от undefined
    const safeData = Array.isArray(data) ? data : [];

    // 🔥 порядок анимации: январь → декабрь
    const animationOrder = useMemo(() => {
      return [...safeData].sort((a, b) => a.Number - b.Number);
    }, [safeData]);

    // ⏱ таймлайн появления месяцев
    useEffect(() => {
      if (step >= animationOrder.length) return;

      const timer = setTimeout(() => {
        setStep(s => s + 1);
      }, 400);

      return () => clearTimeout(timer);
    }, [step, animationOrder.length]);

    if (safeData.length === 0) return null;

    return (
      <div className="months-overlay">
        {visualOrder.map((num, i) => {
          const monthObj = safeData.find(m => m.Number === num);
          if (!monthObj) return null;

          const animationIndex = animationOrder.findIndex(
            m => m.Number === monthObj.Number
          );

          const isActive = animationIndex < step;
          const angle = i * 30 - 90 + 15;

          return (
            <div
              key={num}
              className={`month-item ${isActive ? 'active' : ''}`}
              style={{
                transform: `
                  rotate(${angle}deg)
                  translateY(-${BASE_RADIUS + (isActive ? LIFT : 0)}px)
                `,
              }}
            >
              {/* 📝 ТЕКСТ МЕСЯЦА */}
              <div
                className="month-text"
                style={{
                  // transform: `rotate(${-angle}deg)`,
                }}
              >
                {monthObj.Text.toUpperCase()}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
