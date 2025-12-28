import './App.css';

import OrbitScene from './components/OrbitScene/OrbitScene';
import CameraWrapper from './components/CameraWrapper/CameraWrapper';
import SeasonsScene from './components/SeasonsScene/SeasonsScene';

import { useSceneTimeline } from './hooks/useSceneTimeline';
import questionData from './mock/question-786.json';

function App() {
  // ⏱ таймлайн: сцена 0 → сцена 1 → дальше сезоны
  const stage = useSceneTimeline([6300, 2000]);

  // 📦 данные месяцев (из mock / backend)
  const monthsData = questionData.question;

  return (
    <div className="scene">
      {/* 🟢 SCENE 1 — Орбита */}
      {stage === 0 && <OrbitScene />}

      {/* 🟢 SCENE 2 — Зум / камера */}
      {stage === 1 && <CameraWrapper />}

      {/* 🟢 SCENE 3–4 — Сезоны (фон + логика года) */}
      {stage >= 2 && (
        <SeasonsScene data={monthsData} />
      )}

      {/* 🔒 SCENE 5–6 TEMPORARILY DISABLED */}
    </div>
  );
}

export default App;
