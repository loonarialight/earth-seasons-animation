export default function MonthNumbersArc({ months }) {
  const CENTER = 210;
  const RADIUS = 185;
  const SEGMENT = 360 / 12;

  return (
    <>
      {months.map((m) => {
        // ⬅️ СДВИГ НА 1 ДУГУ ВПРАВО
        const angle = -90 + (m + 1) * SEGMENT + SEGMENT / 2;
        const rad = (angle * Math.PI) / 180;

        const x = CENTER + Math.cos(rad) * RADIUS;
        const y = CENTER + Math.sin(rad) * RADIUS;

        return (
          <svg
            key={m}
            width="420"
            height="420"
            viewBox="0 0 420 420"
            className="month-number-label"
          >
            <text
              x={x}
              y={y}
              fill="black"
              fontSize="16"
              fontWeight="700"
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`rotate(${angle + 90} ${x} ${y})`}
            >
              {m + 1}
            </text>
          </svg>
        );
      })}
    </>
  );
}
