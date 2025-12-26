import { useEffect, useState } from 'react';
import './Months.css';

const MONTHS = [
  'СЕНТЯБРЬ','ОКТЯБРЬ','НОЯБРЬ','ДЕКАБРЬ',
  'ЯНВАРЬ','ФЕВРАЛЬ','МАРТ','АПРЕЛЬ',
  'МАЙ','ИЮНЬ','ИЮЛЬ','АВГУСТ',
];

// визуальный порядок (как цифры)
const visualOrder = [9,10,11,12,1,2,3,4,5,6,7,8];

// логический порядок анимации
const animationOrder = [
  'ЯНВАРЬ','ФЕВРАЛЬ','МАРТ','АПРЕЛЬ',
  'МАЙ','ИЮНЬ','ИЮЛЬ','АВГУСТ',
  'СЕНТЯБРЬ','ОКТЯБРЬ','НОЯБРЬ','ДЕКАБРЬ',
];

export default function Months() {
  const BASE_RADIUS = 158;
  const LIFT = 28;
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= animationOrder.length) return;

    const timer = setTimeout(() => {
      setStep(s => s + 1);
    }, 400);

    return () => clearTimeout(timer);
  }, [step]);

  return (
    <div className="months-overlay">
      {visualOrder.map((num, i) => {
        // индекс месяца в визуальном массиве
        const monthIndex = (num + 3) % 12;
        const monthName = MONTHS[monthIndex];

        // 🔥 главный фикс:
        const isActive =
          animationOrder
            .slice(0, step)
            .includes(monthName);

        const angle = i * 30 - 90 + 15;

        return (
          <div
            key={num}
            className={`month-label ${isActive ? 'active' : ''}`}
            style={{
              transform: `
                rotate(${angle}deg)
                translateY(-${BASE_RADIUS + (isActive ? LIFT : 0)}px)
              `,
            }}
          >
            {monthName}
          </div>
        );
      })}
    </div>
  );
}
