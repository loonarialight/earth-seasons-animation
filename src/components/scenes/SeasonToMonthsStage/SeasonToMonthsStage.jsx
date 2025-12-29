import { useEffect, useState } from "react";

import EarthCore from "../YearDivisionStage/EarthCore";
import SeasonRing from "./SeasonRing";
import SeasonImage from "./SeasonImage";
import MonthNumbersArc from "./MonthNumbersArc";

import "./seasonToMonths.css";

const SEASONS = [
  { key: "winter", months: [11, 0, 1] }, // 12,1,2
  { key: "spring", months: [2, 3, 4] },  // 3,4,5
  { key: "summer", months: [5, 6, 7] },  // 6,7,8
  { key: "autumn", months: [8, 9, 10] }, // 9,10,11
];

export default function SeasonToMonthsStage({ onComplete }) {
  const [step, setStep] = useState(0);
  const [visibleSeasons, setVisibleSeasons] = useState([]);
  const [visibleMonths, setVisibleMonths] = useState([]);

  useEffect(() => {
    if (step >= SEASONS.length) {
      onComplete?.();
      return;
    }

    const season = SEASONS[step];

    // 🧩 картинка сезона
    setVisibleSeasons((prev) => [...prev, season]);

    // 🔢 месяцы сезона
    const t1 = setTimeout(() => {
      setVisibleMonths((prev) => [...prev, ...season.months]);
    }, 900);

    // ➡️ следующий сезон
    const t2 = setTimeout(() => {
      setStep((s) => s + 1);
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [step, onComplete]);

  return (
    <div className="season-to-months-stage">
      {/* 🌍 Земля */}
      <EarthCore />

      {/* 🎨 СЕЗОННОЕ КОЛЬЦО (БЕЗ БЕЛОГО РИНГА) */}
      <SeasonRing visibleCount={step} />

      {/* 🧩 КАРТИНКИ СЕЗОНОВ */}
      {visibleSeasons.map((s) => (
        <SeasonImage key={s.key} season={s.key} />
      ))}

      {/* 🔢 ЦИФРЫ МЕСЯЦЕВ */}
      <MonthNumbersArc months={visibleMonths} />
    </div>
  );
}
