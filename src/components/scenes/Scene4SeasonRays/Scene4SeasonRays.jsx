import { useEffect, useState } from "react";
import assets from "../../../assets/assets";
import "./Scene4SeasonRays.css";
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

const SEASONS = [
  { key: "winter", title: "ЗИМА", start: -120, end: -30 },
  { key: "spring", title: "ВЕСНА", start: -30, end: 60 },
  { key: "summer", title: "ЛЕТО", start: 60, end: 150 },
  { key: "autumn", title: "ОСЕНЬ", start: 150, end: 240 },
];

const GAP_DEG = 0.3;

function getSeason(month) {
  if (month === 12 || month === 1 || month === 2) return "winter";
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  return "autumn";
}

export default function Scene4SeasonRays() {
  const CENTER_Y_OFFSET = 0;
  const SEASON_OUTER_RADIUS = 170; // ← меньше, чем RADIUS (200)


  const SUN_SIZE = 200;
  const RADIUS = 200;
  const LABEL_RADIUS = 215;
  const TEXT_ARC = 28;

  const CENTER_X = window.innerWidth / 2;
  const CENTER_Y = window.innerHeight / 2 + CENTER_Y_OFFSET;

  const SEGMENT = (Math.PI * 2) / 12;
  const START_ANGLE = -Math.PI / 2 + SEGMENT / 2;

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (activeIndex >= SEASONS.length - 1) return;

    const t = setTimeout(() => {
      setActiveIndex(i => i + 1);
    }, 2600);

    return () => clearTimeout(t);
  }, [activeIndex]);

  const activeSeason = SEASONS[activeIndex];

  return (
    <div className="orbit-scene">

      {/* 🌿 ЛЕПЕСТКИ МЕСЯЦЕВ */}
      {MONTHS.map((month, i) => {
        const a = START_ANGLE + i * SEGMENT;
        return (
          <div
            key={month}
            className="scene2-month scene3-month"
            style={{
              left: CENTER_X + RADIUS * Math.cos(a),
              top: CENTER_Y + RADIUS * Math.sin(a),
              backgroundColor: SEASON_COLORS[getSeason(month)],
            }}
          />
        );
      })}

      {/* 📝 НАЗВАНИЯ МЕСЯЦЕВ */}
      <svg
        width="100%"
        height="100%"
        className="month-labels"
        style={{ position: "absolute", inset: 0 }}
      >
        {MONTH_NAMES.map((name, i) => {
          const angle = START_ANGLE + i * SEGMENT;
          const startDeg = (angle * 180) / Math.PI - TEXT_ARC / 2;
          const endDeg = startDeg + TEXT_ARC;

          const r = LABEL_RADIUS;
          const x1 = CENTER_X + r * Math.cos((startDeg * Math.PI) / 180);
          const y1 = CENTER_Y + r * Math.sin((startDeg * Math.PI) / 180);
          const x2 = CENTER_X + r * Math.cos((endDeg * Math.PI) / 180);
          const y2 = CENTER_Y + r * Math.sin((endDeg * Math.PI) / 180);

          const pathId = `month-path-${i}`;

          return (
            <g key={i}>
              <path
                id={pathId}
                d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
                fill="none"
              />
              <text fill="white" fontSize="12" fontWeight="700">
                <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
                  {name}
                </textPath>
              </text>
            </g>
          );
        })}
      </svg>

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

      {/* 🏷 НАЗВАНИЕ СЕЗОНА — ПО ДУГЕ */}
      <svg
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 40,
        }}
      >
        {(() => {
          const midDeg = (activeSeason.start + activeSeason.end) / 2;
          const ARC_SPAN = 48;          // ✅ ИСПРАВЛЕНО
          const r = RADIUS - 60;

          const startDeg = midDeg - ARC_SPAN / 2;
          const endDeg = midDeg + ARC_SPAN / 2;

          const x1 = CENTER_X + r * Math.cos((startDeg * Math.PI) / 180);
          const y1 = CENTER_Y + r * Math.sin((startDeg * Math.PI) / 180);
          const x2 = CENTER_X + r * Math.cos((endDeg * Math.PI) / 180);
          const y2 = CENTER_Y + r * Math.sin((endDeg * Math.PI) / 180);

          const pathId = `season-path-${activeSeason.key}`;

          return (
            <>
              <path
                id={pathId}
                d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
                fill="none"
              />
              <text
                fill="white"
                fontSize="34"
                fontWeight="800"
                letterSpacing="4"
                dy="-2"
              >
                <textPath
                  href={`#${pathId}`}
                  startOffset="50%"
                  textAnchor="middle"
                  textLength={ARC_SPAN * 3.6}
                  lengthAdjust="spacing"
                >
                  {activeSeason.title}
                </textPath>
              </text>
            </>
          );
        })()}
      </svg>

      {/* ❄️ СЕЗОННЫЕ ДУГИ */}
      {SEASONS.slice(0, activeIndex + 1).map((season) => (
        <svg
          key={season.key}
          className="season-rays"
          width={RADIUS * 2}
          height={RADIUS * 2}
          viewBox={`0 0 ${RADIUS * 2} ${RADIUS * 2}`}
          style={{
            position: "absolute",
            left: CENTER_X - RADIUS,
            top: CENTER_Y - RADIUS,
            pointerEvents: "none",
          }}
        >
          <g>
            {Array.from({ length: 260 }).map((_, i) => {
              const startDeg = season.start + GAP_DEG / 2;
              const endDeg = season.end - GAP_DEG / 2;
              const angle =
                (startDeg + (i / 260) * (endDeg - startDeg)) *
                (Math.PI / 180);

              return (
                <line
                  key={i}
                  x1={RADIUS + (SUN_SIZE / 2) * Math.cos(angle)}
                  y1={RADIUS + (SUN_SIZE / 2) * Math.sin(angle)}
                  x2={RADIUS + RADIUS * Math.cos(angle)}
                  y2={RADIUS + RADIUS * Math.sin(angle)}
                  stroke={SEASON_COLORS[season.key]}
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              );
            })}
          </g>
        </svg>
      ))}

      {/* 🎭 МАСКА */}
      <div
        className="scene2-mask"
        style={{
          width: RADIUS * 2,
          height: RADIUS * 2,
          left: CENTER_X - RADIUS,
          top: CENTER_Y - RADIUS,
        }}
      />
    </div>
  );
}
