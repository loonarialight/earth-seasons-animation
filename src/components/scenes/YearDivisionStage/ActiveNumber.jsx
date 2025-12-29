export default function ActiveNumber({ index }) {
  const SIZE = 480;        // ⬅️ было 420
  const CENTER = SIZE / 2; // 240
  const RADIUS = 183;      // центр белого кольца
  const SEGMENT = 360 / 12;

  const angle = -90 + index * SEGMENT + SEGMENT / 2;
  const rad = (angle * Math.PI) / 180;

  const x = CENTER + Math.cos(rad) * RADIUS;
  const y = CENTER + Math.sin(rad) * RADIUS;

  return (
    <svg
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="active-number"
    >
      <text
        x={x}
        y={y}
        fill="black"
        fontSize="18"
        fontWeight="700"
        textAnchor="middle"
        dominantBaseline="middle"
        transform={`rotate(${angle + 90} ${x} ${y})`}
      >
        {index + 1}
      </text>
    </svg>
  );
}
