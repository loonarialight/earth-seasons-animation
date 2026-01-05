import { useEffect, useRef, useState } from "react";
import assets from "../../../assets/assets";
import "./Scene3MonthFocus.css";
import "../../../App.css";

const MONTH_NAMES = [
  "ЯНВАРЬ","ФЕВРАЛЬ","МАРТ","АПРЕЛЬ","МАЙ","ИЮНЬ",
  "ИЮЛЬ","АВГУСТ","СЕНТЯБРЬ","ОКТЯБРЬ","НОЯБРЬ","ДЕКАБРЬ",
];

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

export default function Scene3MonthFocus({ onComplete }) {
  const containerRef = useRef(null);

  const SUN_SIZE = 200;
  const RADIUS = 200;

  const NUMBER_RADIUS = 275;
  const LABEL_RADIUS = 215; // 👈 радиус дуги текста
  const TEXT_ARC = 28;      // 👈 длина дуги под слово (градусы)

  const SEGMENT = (Math.PI * 2) / 12;
  const START_ANGLE = -Math.PI / 2 + SEGMENT / 2;

  const [center, setCenter] = useState({ x: 0, y: 0 });
  const [activeMonth, setActiveMonth] = useState(0);
  const [phase, setPhase] = useState("number");
  const [shownLabels, setShownLabels] = useState([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    setCenter({
      x: rect.width / 2,
      y: rect.height / 2,
    });
  }, []);

  useEffect(() => {
    if (activeMonth >= 12) {
      onComplete?.();
      return;
    }

    setPhase("number");

    const toLabel = setTimeout(() => {
      setPhase("label");
      setShownLabels(prev =>
        prev.includes(activeMonth) ? prev : [...prev, activeMonth]
      );
    }, 700);

    const toNext = setTimeout(() => {
      setActiveMonth(m => m + 1);
    }, 1600);

    return () => {
      clearTimeout(toLabel);
      clearTimeout(toNext);
    };
  }, [activeMonth, onComplete]);

  const { x: CX, y: CY } = center;

  return (
    <div className="orbit-scene" ref={containerRef}>
      {/* ☀️ СОЛНЦЕ */}
      <img
        src={assets.sun}
        alt="Sun"
        className="sun"
        style={{
          width: SUN_SIZE,
          height: SUN_SIZE,
          left: CX - SUN_SIZE / 2,
          top: CY - SUN_SIZE / 2,
        }}
      />

      {/* 🟦 НАЗВАНИЕ В ЦЕНТРЕ */}
      {phase === "number" && (
        <div
          className="scene3-month-title"
          style={{ left: CX, top: CY - 120 }}
        >
          {MONTH_NAMES[activeMonth]}
        </div>
      )}

      {/* 🌌 ОРБИТА */}
      <div
        className="scene2-orbit"
        style={{
          width: RADIUS * 2,
          height: RADIUS * 2,
          left: CX - RADIUS,
          top: CY - RADIUS,
        }}
      />

      {/* 🌿 ЛЕПЕСТКИ */}
      {MONTHS.map((month, i) => {
        const a = START_ANGLE + i * SEGMENT;
        return (
          <div
            key={month}
            className="scene2-month scene3-month"
            style={{
              left: CX + RADIUS * Math.cos(a),
              top: CY + RADIUS * Math.sin(a),
              backgroundColor: SEASON_COLORS[getSeason(month)],
            }}
          />
        );
      })}

      {/* 🔢 ЦИФРЫ */}
      {MONTHS.map((month, i) => {
        const a = START_ANGLE + i * SEGMENT;
        return (
          <div
            key={`num-${month}`}
            className={`month-number-layer ${
              i === activeMonth && phase === "number" ? "active" : ""
            }`}
            style={{
              left: CX + NUMBER_RADIUS * Math.cos(a),
              top: CY + NUMBER_RADIUS * Math.sin(a),
            }}
          >
            {month}
          </div>
        );
      })}

      {/* 📝 НАЗВАНИЯ МЕСЯЦЕВ — SVG + textPath */}
      <svg
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0, zIndex: 31 }}
      >
        {shownLabels.map((i) => {
          const angle = START_ANGLE + i * SEGMENT;
          const startDeg = (angle * 180) / Math.PI - TEXT_ARC / 2;
          const endDeg = startDeg + TEXT_ARC;

          const r = LABEL_RADIUS;
          const x1 = CX + r * Math.cos((startDeg * Math.PI) / 180);
          const y1 = CY + r * Math.sin((startDeg * Math.PI) / 180);
          const x2 = CX + r * Math.cos((endDeg * Math.PI) / 180);
          const y2 = CY + r * Math.sin((endDeg * Math.PI) / 180);

          const pathId = `month-path-${i}`;

          return (
            <g key={i}>
              <path
                id={pathId}
                d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
                fill="none"
              />
              <text
                fill="white"
                fontSize="12"
                fontWeight="700"
                letterSpacing="1"
              >
                <textPath
                  href={`#${pathId}`}
                  startOffset="50%"
                  textAnchor="middle"
                >
                  {MONTH_NAMES[i]}
                </textPath>
              </text>
            </g>
          );
        })}
      </svg>

      {/* 🎭 МАСКА */}
      <div
        className="scene2-mask"
        style={{
          width: RADIUS * 2,
          height: RADIUS * 2,
          left: CX - RADIUS,
          top: CY - RADIUS,
        }}
      />
    </div>
  );
}
