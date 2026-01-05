import { SEGMENTS } from "./segments";

const CENTER = 210;
const BASE_RADIUS = 178;

const NUMBER_RADIUS_SHIFT = 30; // цифры
const MONTH_RADIUS_SHIFT = 26;  // месяцы ВЫШЕ дуг (важно)

const SEGMENT = 360 / 12;

const MONTH_NAMES = [
  "ЯНВАРЬ",
  "ФЕВРАЛЬ",
  "МАРТ",
  "АПРЕЛЬ",
  "МАЙ",
  "ИЮНЬ",
  "ИЮЛЬ",
  "АВГУСТ",
  "СЕНТЯБРЬ",
  "ОКТЯБРЬ",
  "НОЯБРЬ",
  "ДЕКАБРЬ",
];

export default function MonthNumbersArc({
  activeNumberIndex = -1,
  activeMonthIndex = -1,
}) {
  const NUMBER_RADIUS = BASE_RADIUS + NUMBER_RADIUS_SHIFT;
  const MONTH_RADIUS = BASE_RADIUS + MONTH_RADIUS_SHIFT;

  return (
    <svg
      className="month-numbers"
      width="420"
      height="420"
      viewBox="0 0 420 420"
      pointerEvents="none"
    >
      {/* ===== PATHS ДЛЯ МЕСЯЦЕВ ===== */}
      <defs>
        {SEGMENTS.map(seg => {
          if (seg.index > activeMonthIndex) return null;

          const startAngle = -90 + seg.index * SEGMENT;
          const endAngle = startAngle + SEGMENT;

          const startRad = (startAngle * Math.PI) / 180;
          const endRad = (endAngle * Math.PI) / 180;

          const x1 = CENTER + Math.cos(startRad) * MONTH_RADIUS;
          const y1 = CENTER + Math.sin(startRad) * MONTH_RADIUS;

          const x2 = CENTER + Math.cos(endRad) * MONTH_RADIUS;
          const y2 = CENTER + Math.sin(endRad) * MONTH_RADIUS;

          return (
            <path
              key={`month-path-${seg.index}`}
              id={`month-path-${seg.index}`}
              d={`M ${x1} ${y1} A ${MONTH_RADIUS} ${MONTH_RADIUS} 0 0 1 ${x2} ${y2}`}
              fill="none"
            />
          );
        })}
      </defs>

      {/* ===== ЦИФРЫ (БАЗА) ===== */}
      {SEGMENTS.map(seg => {
        if (seg.index > activeNumberIndex) return null;

        const angle = -90 + seg.index * SEGMENT + SEGMENT / 2;
        const rad = (angle * Math.PI) / 180;

        return (
          <text
            key={`num-${seg.index}`}
            x={CENTER + Math.cos(rad) * NUMBER_RADIUS}
            y={CENTER + Math.sin(rad) * NUMBER_RADIUS}
            fill="#ffffffff"
            fontSize="14"
            fontWeight="700"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {seg.index + 1}
          </text>
        );
      })}

      {/* ===== МЕСЯЦЫ (ПОВЕРХ ДУГ, ПО ДУГЕ) ===== */}
      {SEGMENTS.map(seg => {
        if (seg.index > activeMonthIndex) return null;

        return (
          <text
            key={`month-${seg.index}`}
            fill="#000"
            fontSize="12"
            fontWeight="600"
            dy="30"
            dominantBaseline="middle"
          >
            <textPath
              href={`#month-path-${seg.index}`}
              startOffset="50%"
              textAnchor="middle"
            >
              {MONTH_NAMES[seg.index]}
            </textPath>
          </text>
        );
      })}
    </svg>
  );
}
