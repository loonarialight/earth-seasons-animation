import { useEffect, useState } from "react";
import YearRing from "./YearRing";
import ActiveArc from "./ActiveArc";
import ActiveNumber from "./ActiveNumber";
import EarthCore from "./EarthCore";
import "./yearDivision.css";

/**
 * SCENE 5 — Деление года на 12 частей
 */
export default function YearDivisionStage({ onComplete }) {
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState("arc"); 
  // phase: "arc" → "number"

  useEffect(() => {
    if (step >= 12) {
      onComplete?.();
      return;
    }

    if (phase === "arc") {
      const t = setTimeout(() => {
        setPhase("number");
      }, 200);

      return () => clearTimeout(t);
    }

    if (phase === "number") {
      const t = setTimeout(() => {
        setPhase("arc");
        setStep((s) => s + 1);
      }, 200);

      return () => clearTimeout(t);
    }
  }, [step, phase, onComplete]);

  return (
    <div className="year-division-stage">
      {/* 🌍 Земля */}
      <EarthCore />

      {/* ⭕ Кольцо */}
      <YearRing />

      {/* 🟡 Зафиксированные дуги */}
      {Array.from({ length: step }).map((_, i) => (
        <ActiveArc key={i} index={i} />
      ))}

      {/* 🟡 Активная дуга */}
      {step < 12 && <ActiveArc index={step} animate />}

      🔢 Цифра
      {phase === "number" && step < 12 && (
        <ActiveNumber index={step} />
      )}
    </div>
  );
}
