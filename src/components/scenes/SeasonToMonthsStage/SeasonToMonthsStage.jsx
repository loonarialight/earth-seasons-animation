import { useEffect, useState } from "react";
import SeasonRing from "./SeasonRing";
import MonthNumbersArc from "./MonthNumbersArc";
import SeasonImage from "./SeasonImage";
import { SEGMENTS } from "./segments";
import "./seasonToMonths.css";

export default function SeasonToMonthsStage({ onComplete }) {
  const [arcIndex, setArcIndex] = useState(-1);
  const [numberIndex, setNumberIndex] = useState(-1);
  const [step, setStep] = useState(0); // 👈 ТОЛЬКО ЛОГИКА

  useEffect(() => {
    if (arcIndex >= 11 && numberIndex >= 11) {
      onComplete?.();
      return;
    }

    const t = setTimeout(() => {
      // чётные шаги — дуги
      if (step % 2 === 0 && arcIndex < 11) {
        setArcIndex(i => i + 1);
      }

      // нечётные шаги — цифры
      if (step % 2 === 1 && numberIndex < arcIndex) {
        setNumberIndex(i => i + 1);
      }

      setStep(s => s + 1);
    }, 600);

    return () => clearTimeout(t);
  }, [step, arcIndex, numberIndex, onComplete]);

  // 🌳 сезоны открываются ТОЛЬКО по дугам
  const openedSeasons = Array.from(
    new Set(
      SEGMENTS
        .filter(seg => seg.index <= arcIndex)
        .map(seg => seg.season)
    )
  );

  return (
    <div className="season-to-months-stage">
      <div className="scene-wrapper">

        <SeasonRing activeIndex={arcIndex} />
        <MonthNumbersArc activeIndex={numberIndex} />

        {openedSeasons.map(season => (
          <SeasonImage key={season} season={season} />
        ))}

      </div>
    </div>
  );
}
