import { useEffect, useState } from "react";
import { MONTH_ITEMS } from "./monthItems";
import "./monthsArrayStage.css";

export default function MonthsArrayStage({ onComplete }) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount >= MONTH_ITEMS.length) {
      onComplete?.();
      return;
    }

    const t = setTimeout(() => {
      setVisibleCount(c => c + 1);
    }, 200);

    return () => clearTimeout(t);
  }, [visibleCount, onComplete]);

  return (
    <div className="months-array-stage">
      <div className="months-row">
        {MONTH_ITEMS.slice(0, visibleCount).map((m) => (
          <div key={m.id} className="month-cell">
            {m.value}
          </div>
        ))}
      </div>
    </div>
  );
}
