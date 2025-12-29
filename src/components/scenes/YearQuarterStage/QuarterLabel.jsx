export default function QuarterLabel({ value, index }) {
  const CENTER = 210;
  const RADIUS = 185;

  const angle = -90 + index * 90 + 45; // центр квартала
  const rad = (angle * Math.PI) / 180;

  const x = CENTER + Math.cos(rad) * RADIUS;
  const y = CENTER + Math.sin(rad) * RADIUS;

  return (
    <svg
      width="420"
      height="420"
      viewBox="0 0 420 420"
      className="quarter-label"
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
        {value}
      </text>
    </svg>
  );
}
