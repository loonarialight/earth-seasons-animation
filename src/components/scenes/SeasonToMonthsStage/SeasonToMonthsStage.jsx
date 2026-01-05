import { useEffect, useState } from "react";
import SeasonRing from "./SeasonRing";
import MonthNumbersArc from "./MonthNumbersArc";
import SeasonImage from "./SeasonImage";
import { SEGMENTS } from "./segments";
import { usePopSound } from "../../../hooks/usePopSound.js";
import "./seasonToMonths.css";

export default function SeasonToMonthsStage({ onComplete }) {
  const [arcIndex, setArcIndex] = useState(-1);
  const [numberIndex, setNumberIndex] = useState(-1);
  const [monthIndex, setMonthIndex] = useState(-1);
  const [step, setStep] = useState(0);

  const playPop = usePopSound(0.35);

  useEffect(() => {
    if (arcIndex >= 11 && monthIndex >= 11) {
      onComplete?.();
      return;
    }

    const t = setTimeout(() => {
      // 1️⃣ дуга
      if (step % 3 === 0 && arcIndex < 11) {
        setArcIndex(i => {
          playPop();
          return i + 1;
        });
      }

      // 2️⃣ цифра
      if (step % 3 === 1 && numberIndex < arcIndex) {
        setNumberIndex(i => {
          playPop();
          return i + 1;
        });
      }

      // 3️⃣ месяц
      if (step % 3 === 2 && monthIndex < numberIndex) {
        setMonthIndex(i => {
          playPop();
          return i + 1;
        });
      }

      setStep(s => s + 1);
    }, 600);

    return () => clearTimeout(t);
  }, [step, arcIndex, numberIndex, monthIndex, onComplete, playPop]);

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

        {/* 1️⃣ КОЛЬЦО */}
        <SeasonRing activeIndex={arcIndex} />

        {/* 2️⃣ ФОН СЕЗОНА */}
        {openedSeasons.map(season => (
          <SeasonImage key={season} season={season} />
        ))}

        {/* 3️⃣ ЦИФРЫ И МЕСЯЦЫ */}
        <MonthNumbersArc
          activeNumberIndex={numberIndex}
          activeMonthIndex={monthIndex}
        />

      </div>
    </div>
  );
}
