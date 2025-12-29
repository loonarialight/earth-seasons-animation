import { useEffect, useState } from "react";
import YearRing from "../YearDivisionStage/YearRing";
import EarthCore from "../YearDivisionStage/EarthCore";
import QuarterArc from "./QuarterArc";
import MonthNumberLabel from "./MonthNumberLabel";
import "./yearQuarter.css";

const QUARTER_MONTHS = [
  [11, 0, 1],  // ❄ Зима: 12, 1, 2
  [2, 3, 4],   // 🌸 Весна: 3, 4, 5
  [5, 6, 7],   // ☀ Лето: 6, 7, 8
  [8, 9, 10],  // 🍂 Осень: 9, 10, 11
];

export default function YearQuarterStage({ onComplete }) {
  const [step, setStep] = useState(0); // 0..4

  useEffect(() => {
    // ⏸ ПАУЗА ПОСЛЕ ОСЕНИ
    if (step === 4) {
      const t = setTimeout(() => {
        onComplete?.();
      }, 1500); // ← задержка после осени

      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setStep((s) => s + 1);
    }, 1200);

    return () => clearTimeout(t);
  }, [step, onComplete]);

  return (
    <div className="year-quarter-stage">
      <EarthCore />
      <YearRing />

      {/* 🎨 СЕЗОННЫЕ ДУГИ */}
      {Array.from({ length: step }).map((_, i) => (
        <QuarterArc key={i} quarterIndex={i} />
      ))}

      {/* 🔢 ЦИФРЫ МЕСЯЦЕВ */}
      {Array.from({ length: step }).flatMap((_, q) =>
        QUARTER_MONTHS[q].map((monthIndex) => (
          <MonthNumberLabel
            key={`${q}-${monthIndex}`}
            monthIndex={monthIndex}
          />
        ))
      )}
    </div>
  );
}
