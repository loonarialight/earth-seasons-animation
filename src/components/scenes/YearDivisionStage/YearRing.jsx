export default function YearRing() {
  return (
    <svg
      width="420"
      height="420"
      viewBox="0 0 420 420"
      className="year-ring"
    >
      {/* Основное кольцо */}
      <circle
        cx="210"
        cy="210"
        r="185"
        fill="none"
        stroke="white"
        strokeWidth="30"
      />

      {/* Делители */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 360) / 12;
        return (
          <line
            key={i}
            x1="210"
            y1="40"   // 210 - 170
            x2="210"
            y2="10"   // 210 - 200
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="3"
            transform={`rotate(${angle} 210 210)`}
          />
        );
      })}
    </svg>
  );
}
