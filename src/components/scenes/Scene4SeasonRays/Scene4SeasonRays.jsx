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

function getSeason(month) {
  if (month === 12 || month === 1 || month === 2) return "winter";
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  return "autumn";
}

export default function Scene4SeasonRays({ onComplete }) {
  const CENTER_Y_OFFSET = 40;

  const SUN_SIZE = 200;
  const RADIUS = 200;

  const LABEL_RADIUS = 215;
  const TEXT_ARC = 28;

  const CENTER_X = window.innerWidth / 2;
  const CENTER_Y = window.innerHeight / 2 + CENTER_Y_OFFSET;

  const SEGMENT = (Math.PI * 2) / 12;
  const START_ANGLE = -Math.PI / 2 + SEGMENT / 2;

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

      {/* 🌿 ЛЕПЕСТКИ (СТАТИКА) */}
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

      {/* 📝 НАЗВАНИЯ МЕСЯЦЕВ — КОНСТАНТНО */}
      <svg
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0, zIndex: 31 }}
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
                  {name}
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
          left: CENTER_X - RADIUS,
          top: CENTER_Y - RADIUS,
        }}
      />
    </div>
  );
}
