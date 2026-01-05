import { useEffect, useState } from "react";
import SeasonRing from "./SeasonRing";
import MonthNumbersArc from "./MonthNumbersArc";
import SeasonImage from "./SeasonImage";
import { SEGMENTS } from "./segments";
import "./seasonToMonths.css";

export default function SeasonToMonthsStage({ onComplete }) {
  const [arcIndex, setArcIndex] = useState(-1);
  const [numberIndex, setNumberIndex] = useState(-1);
  const [monthIndex, setMonthIndex] = useState(-1);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (arcIndex >= 11 && monthIndex >= 11) {
      onComplete?.();
      return;
    }

    const t = setTimeout(() => {
      if (step % 3 === 0 && arcIndex < 11) {
        setArcIndex(i => i + 1);
      }

      if (step % 3 === 1 && numberIndex < arcIndex) {
        setNumberIndex(i => i + 1);
      }

      if (step % 3 === 2 && monthIndex < numberIndex) {
        setMonthIndex(i => i + 1);
      }

      setStep(s => s + 1);
    }, 600);

    return () => clearTimeout(t);
  }, [step, arcIndex, numberIndex, monthIndex, onComplete]);

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

        {/* 1️⃣ КОЛЬЦО (низ) */}
        <SeasonRing activeIndex={arcIndex} />

        {/* 2️⃣ ФОН СЕЗОНА */}
        {openedSeasons.map(season => (
          <SeasonImage key={season} season={season} />
        ))}

        {/* 3️⃣ ТЕКСТ (САМЫЙ ВЕРХ) */}
        <MonthNumbersArc
          activeNumberIndex={numberIndex}
          activeMonthIndex={monthIndex}
        />

      </div>
    </div>
  );
}
