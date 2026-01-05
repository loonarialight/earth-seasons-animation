import { useEffect, useState } from "react";
import assets from "../../../assets/assets";
import { usePopSound } from "../../../hooks/usePopSound";
import "./Scene2YearCircle.css";
import "../../../App.css";

const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

// 🎨 цвета сезонов
const SEASON_COLORS = {
  winter: "#4DB5FF", // 12,1,2
  spring: "#3CB44B", // 3,4,5
  summer: "#FF5A5A", // 6,7,8
  autumn: "#FFA726", // 9,10,11
};

function getSeason(month) {
  if (month === 12 || month === 1 || month === 2) return "winter";
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  return "autumn";
}

export default function Scene2YearCircle({ onComplete }) {
  const CENTER_Y_OFFSET = 40;

  const SUN_SIZE = 200;
  const RADIUS = 200;

  const CENTER_X = window.innerWidth / 2;
  const CENTER_Y = window.innerHeight / 2 + CENTER_Y_OFFSET;
  const LABEL_RADIUS = RADIUS;

  const SEGMENT = (Math.PI * 2) / 12;

  // 🔑 ВАЖНО: старт С ПОЛОВИНЫ сегмента
  const START_ANGLE = -Math.PI / 2 + SEGMENT / 2;

  const [visibleCount, setVisibleCount] = useState(0);
  const playPop = usePopSound(0.35);

  const MONTH_DELAY = 380;
  const HOLD_TIME = 2000;

  useEffect(() => {
    if (visibleCount >= 12) {
      const hold = setTimeout(() => {
        onComplete?.();
      }, HOLD_TIME);
      return () => clearTimeout(hold);
    }

    const t = setTimeout(() => {
      setVisibleCount(v => v + 1);
      playPop();
    }, MONTH_DELAY);

    return () => clearTimeout(t);
  }, [visibleCount, playPop, onComplete]);

  return (
    <div className="orbit-scene">
      {/* ☀️ СОЛНЦЕ */}
      <img
        src={assets.sun}
        alt="Sun"
        className="sun"
        style={{
          width: SUN_SIZE,
          height: SUN_SIZE,
          left: CENTER_X - SUN_SIZE / 2,
          top: CENTER_Y - SUN_SIZE / 2,
        }}
      />

      {/* 🕒 ЗАГОЛОВОК */}
      <div
        className="year-label"
        style={{
          left: CENTER_X,
          top: CENTER_Y - RADIUS - 100,
          opacity: 1,
          animation: "none",
        }}
      >
        1 ГОД
      </div>

      {/* 🌌 ОРБИТА */}
      <div
        className="scene2-orbit"
        style={{
          width: RADIUS * 2,
          height: RADIUS * 2,
          left: CENTER_X - RADIUS,
          top: CENTER_Y - RADIUS,
        }}
      />

      {/* 🔵 МЕСЯЦЫ */}
      {MONTHS.slice(0, visibleCount).map((month, i) => {
        const angle = START_ANGLE + i * SEGMENT;
        const x = CENTER_X + LABEL_RADIUS * Math.cos(angle);
        const y = CENTER_Y + LABEL_RADIUS * Math.sin(angle);

        return (
          <div
            key={month}
            className="scene2-month"
            style={{
              left: x,
              top: y,
              backgroundColor: SEASON_COLORS[getSeason(month)],
            }}
          >
            {month}
          </div>
        );
      })}

      {/* 🎭 МАСКА */}
      <div
        className="scene2-mask"
        style={{
          width: RADIUS * 2 - 20,
          height: RADIUS * 2 - 20,
          left: CENTER_X - RADIUS + 10,
          top: CENTER_Y - RADIUS + 10,
        }}
      />
    </div>
  );
}
