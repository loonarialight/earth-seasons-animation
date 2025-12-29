import EarthCore from "../YearDivisionStage/EarthCore";
import YearRing from "../YearDivisionStage/YearRing";
import QuarterArc from "../YearQuarterStage/QuarterArc";

import SeasonImage from "./SeasonImage";
import MonthNumbersArc from "./MonthNumbersArc";




import "./seasonToMonths.css";

/**
 * СЦЕНА:
 * Картинка сезона → сезонная дуга → цифры месяцев
 * Всё НАКАПЛИВАЕТСЯ (пазл)
 */

const SEASONS = [
  { key: "winter", months: [11, 0, 1] }, // 12, 1, 2
  { key: "spring", months: [2, 3, 4] },  // 3, 4, 5
  { key: "summer", months: [5, 6, 7] },  // 6, 7, 8
  { key: "autumn", months: [8, 9, 10] }, // 9, 10, 11
];

export default function SeasonToMonthsStage({ onComplete }) {
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState("image"); // image → arc → numbers

  const [visibleSeasons, setVisibleSeasons] = useState([]);
  const [visibleMonths, setVisibleMonths] = useState([]);

  useEffect(() => {
    if (step >= SEASONS.length) {
      onComplete?.();
      return;
    }

    const season = SEASONS[step];

    // 🧩 добавляем картинку сезона
    setVisibleSeasons((prev) => [...prev, season]);

    setPhase("image");

    // 🎨 сезонная дуга
    const t1 = setTimeout(() => {
      setPhase("arc");
    }, 600);

    // 🔢 добавляем цифры (НАВСЕГДА)
    const t2 = setTimeout(() => {
      setVisibleMonths((prev) => [...prev, ...season.months]);
      setPhase("numbers");
    }, 1200);

    // ➡️ следующий сезон
    const t3 = setTimeout(() => {
      setStep((s) => s + 1);
    }, 2600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [step, onComplete]);

  return (
    <div className="season-to-months-stage">
      {/* 🌍 Земля */}
      <EarthCore />

      {/* ⭕ Кольцо */}
      <YearRing />

      {/* 🧩 КАРТИНКИ СЕЗОНОВ (НЕ ПРОПАДАЮТ) */}
      {visibleSeasons.map((s) => (
        <SeasonImage key={s.key} season={s.key} />
      ))}

      {/* 🎨 СЕЗОННЫЕ ДУГИ */}
      {phase !== "image" &&
        visibleSeasons.map((_, i) => (
          <QuarterArc key={i} quarterIndex={i} />
        ))}

      {/* 🔢 ЦИФРЫ МЕСЯЦЕВ (НАКАПЛИВАЮТСЯ) */}
      <MonthNumbersArc months={visibleMonths} />
    </div>
  );
}
