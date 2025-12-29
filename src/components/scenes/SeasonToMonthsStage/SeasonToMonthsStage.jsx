import { useEffect, useState } from "react";

import EarthCore from "../YearDivisionStage/EarthCore";
import YearRing from "../YearDivisionStage/YearRing";
import QuarterArc from "../YearQuarterStage/QuarterArc";

import SeasonImage from "./SeasonImage";
import MonthNumbersArc from "./MonthNumbersArc";

import "./seasonToMonths.css";

const SEASONS = [
  { key: "winter", months: [11, 0, 1] },
  { key: "spring", months: [2, 3, 4] },
  { key: "summer", months: [5, 6, 7] },
  { key: "autumn", months: [8, 9, 10] },
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

    // картинка сезона
    setVisibleSeasons((prev) => [...prev, season]);

    // цифры месяцев (после дуги)
    const t1 = setTimeout(() => {
      setVisibleMonths((prev) => [...prev, ...season.months]);
    }, 900);

    // следующий сезон
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
      <EarthCore />
      <YearRing />

      {/* 🧩 КАРТИНКИ СЕЗОНОВ */}
      {visibleSeasons.map((s) => (
        <SeasonImage key={s.key} season={s.key} />
      ))}

      {/* 🎨 ЦВЕТНЫЕ СЕЗОННЫЕ ДУГИ (НЕ ПРОПАДАЮТ) */}
      {visibleSeasons.map((_, i) => (
        <QuarterArc
          key={i}
          quarterIndex={i}
          className="quarter-arc quarter-visible"
        />
      ))}

      {/* 🔢 ЦИФРЫ МЕСЯЦЕВ */}
      <MonthNumbersArc months={visibleMonths} />
    </div>
  );
}
