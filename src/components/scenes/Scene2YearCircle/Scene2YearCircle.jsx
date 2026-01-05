import { useEffect, useState } from "react";
import assets from "../../../assets/assets";
import { usePopSound } from "../../../hooks/usePopSound";
import "./Scene2YearCircle.css";
import "../../../App.css";

const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

const SEASON_COLORS = {
  winter: "#4DB5FF",
  spring: "#3CB44B",
  summer: "#FF5A5A",
  autumn: "#FFA726",
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
  const NUMBER_RADIUS = 220;

  const CENTER_X = window.innerWidth / 2;
  const CENTER_Y = window.innerHeight / 2 + CENTER_Y_OFFSET;

  const SEGMENT = (Math.PI * 2) / 12;
  const START_ANGLE = -Math.PI / 2 + SEGMENT / 2;

  const [visiblePetals, setVisiblePetals] = useState(0);
  const [visibleNumbers, setVisibleNumbers] = useState(0);

  const playPop = usePopSound(0.35);

  const MONTH_DELAY = 380;
  const NUMBER_DELAY = 140;
  const HOLD_TIME = 2000;

  useEffect(() => {
    if (visiblePetals >= 12) {
      const hold = setTimeout(() => {
        onComplete?.();
      }, HOLD_TIME);
      return () => clearTimeout(hold);
    }

    const petalTimer = setTimeout(() => {
      setVisiblePetals((v) => v + 1);
      playPop();

      // 🔢 цифра появляется ПОСЛЕ лепестка
      setTimeout(() => {
        setVisibleNumbers((n) => n + 1);
      }, NUMBER_DELAY);
    }, MONTH_DELAY);

    return () => clearTimeout(petalTimer);
  }, [visiblePetals, playPop, onComplete]);

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

      {/* 🌿 ЛЕПЕСТКИ */}
      {MONTHS.slice(0, visiblePetals).map((month, i) => {
        const angle = START_ANGLE + i * SEGMENT;
        const x = CENTER_X + RADIUS * Math.cos(angle);
        const y = CENTER_Y + RADIUS * Math.sin(angle);

        return (
          <div
            key={`petal-${month}`}
            className="scene2-month"
            style={{
              left: x,
              top: y,
              backgroundColor: SEASON_COLORS[getSeason(month)],
            }}
          />
        );
      })}

      {/* 🔢 ЦИФРЫ (ПОСЛЕ ЛЕПЕСТКОВ) */}
      {MONTHS.slice(0, visibleNumbers).map((month, i) => {
        const angle = START_ANGLE + i * SEGMENT;
        const x = CENTER_X + NUMBER_RADIUS * Math.cos(angle);
        const y = CENTER_Y + NUMBER_RADIUS * Math.sin(angle);

        return (
          <div
            key={`number-${month}`}
            className="scene2-month-number"
            style={{ left: x, top: y }}
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
