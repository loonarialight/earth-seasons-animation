import "./App.css";

import { useState } from "react";
import { useSceneTimeline } from "./hooks/useSceneTimeline";

import OrbitScene from "./components/scenes/OrbitScene/OrbitScene";
import CameraWrapper from "./components/scenes/CameraWrapper/CameraWrapper";
import SeasonsScene from "./components/scenes/SeasonsScene/SeasonsScene";
import SeasonToMonthsStage from "./components/scenes/SeasonToMonthsStage/SeasonToMonthsStage";

import questionData from "./mock/question-786.json";

/**
 * СЦЕНЫ:
 * 0 — орбита
 * 1 — зум
 * 2–3 — сезоны
 * 6 — сезон → его месяцы
 *
 * ❌ УБРАНА СЦЕНА:
 * 4 — деление года (белое кольцо)
 */
function App() {
  const autoStage = useSceneTimeline([7300, 2000]);
  const [manualStage, setManualStage] = useState(null);

  const stage = manualStage !== null ? manualStage : autoStage;
  const monthsData = questionData.question;

  return (
    <div className="scene">
      {/* 🟢 СЦЕНА 0 — Орбита */}
      {stage === 0 && <OrbitScene />}

      {/* 🟢 СЦЕНА 1 — Зум */}
      {stage === 1 && <CameraWrapper />}

      {/* 🟢 СЦЕНА 2–3 — Сезоны */}
      {stage >= 2 && stage < 4 && (
        <SeasonsScene
          data={monthsData}
          onComplete={() => setManualStage(6)} // ⬅️ сразу в сцену месяцев
        />
      )}

      {/* 🟢 СЦЕНА 6 — Сезон → месяцы */}
      {stage === 6 && (
        <SeasonToMonthsStage
          onComplete={() => {
            console.log("Season → months complete");
          }}
        />
      )}
    </div>
  );
}

export default App;
