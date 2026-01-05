import "./App.css";
import { useState } from "react";
import { useSceneTimeline } from "./hooks/useSceneTimeline";

// 🧩 сцены
import OrbitScene from "./components/scenes/OrbitScene/OrbitScene";
import Scene2YearCircle from "./components/scenes/Scene2YearCircle/Scene2YearCircle";
import CameraWrapper from "./components/scenes/CameraWrapper/CameraWrapper";
import SeasonsScene from "./components/scenes/SeasonsScene/SeasonsScene";
import SeasonToMonthsStage from "./components/scenes/SeasonToMonthsStage/SeasonToMonthsStage";

// 📊 данные
import questionData from "./mock/question-786.json";

// 🎛 MUI
import { Button, Stack, Paper } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function App() {
  // ⏱ авто — только для первой сцены
  const autoStage = useSceneTimeline([7300]);

  // 🎮 ручное управление
  const [manualStage, setManualStage] = useState(null);

  const stage = manualStage !== null ? manualStage : autoStage;
  const monthsData = questionData.question;

  // 🔢 всего сцен
  const MAX_STAGE = 4;

  const goNext = () => {
    setManualStage(s => (s === null ? autoStage + 1 : Math.min(s + 1, MAX_STAGE)));
  };

  const goBack = () => {
    setManualStage(s => (s === null ? 0 : Math.max(s - 1, 0)));
  };

  return (
    <div className="scene">
      {/* 🟢 0 — Орбита */}
      {stage === 0 && <OrbitScene />}

      {/* 🟢 1 — Год по орбите */}
      {stage === 1 && (
        <Scene2YearCircle onComplete={() => setManualStage(2)} />
      )}

      {/* 🟢 2 — Зум */}
      {stage === 2 && <CameraWrapper />}

      {/* 🟢 3 — Сезоны */}
      {stage === 3 && (
        <SeasonsScene
          data={monthsData}
          onComplete={() => setManualStage(4)}
        />
      )}

      {/* 🟢 4 — Сезон → месяцы */}
      {stage === 4 && <SeasonToMonthsStage />}

      {/* 🎛 DEV-КОНТРОЛЛЕР СЦЕН */}
      <Paper
        elevation={6}
        sx={{
          position: "fixed",
          right: 20,
          bottom: 20,
          padding: "10px 12px",
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(6px)",
          zIndex: 9999,
        }}
      >
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            size="small"
            startIcon={<ArrowBackIcon />}
            onClick={goBack}
            disabled={stage === 0}
          >
            Back
          </Button>

          <Button
            variant="contained"
            size="small"
            endIcon={<ArrowForwardIcon />}
            onClick={goNext}
            disabled={stage === MAX_STAGE}
          >
            Next
          </Button>
        </Stack>
      </Paper>
    </div>
  );
}

export default App;
