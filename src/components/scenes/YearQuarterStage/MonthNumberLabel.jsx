export default function MonthNumberLabel({ monthIndex }) {
  const SIZE = 420;
  const CENTER = 210;
  const RADIUS = 182;          // центр белого кольца
  const SEGMENT = 360 / 12;

  // ⬅️ сдвиг на 1 дугу вправо
  const angle = -90 + (monthIndex + 1) * SEGMENT + SEGMENT / 2;
  const rad = (angle * Math.PI) / 180;

  const x = CENTER + Math.cos(rad) * RADIUS;
  const y = CENTER + Math.sin(rad) * RADIUS;

  return (
    <svg
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
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
        {monthIndex + 1}
      </text>
    </svg>
  );
}
