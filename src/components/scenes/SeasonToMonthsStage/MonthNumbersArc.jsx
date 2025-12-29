const CENTER = 210;
const RADIUS = 185;
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

export default function MonthNumbersArc({ months }) {
  return (
    <>
      {months.map(({ index, mode }) => {
        const angle = -90 + (index + 1) * SEGMENT + SEGMENT / 2;
        const rad = (angle * Math.PI) / 180;

        const x = CENTER + Math.cos(rad) * RADIUS;
        const y = CENTER + Math.sin(rad) * RADIUS;

        const isName = mode === "name";

        return (
          <svg
            key={index}
            width="420"
            height="420"
            viewBox="0 0 420 420"
            className="month-number-label"
          >
            <text
              x={x}
              y={y}
              fill={isName ? "white" : "black"}
              fontSize={isName ? 11 : 16}
              fontWeight="700"
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`rotate(${angle + 90} ${x} ${y})`}
              className={isName ? "month-name" : "month-number"}
            >
              {isName ? MONTH_NAMES[index] : index + 1}
            </text>
          </svg>
        );
      })}
    </>
  );
}
