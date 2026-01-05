import "./App.css";
import { useState } from "react";

// 🧩 сцены
import OrbitScene from "./components/scenes/OrbitScene/OrbitScene";
import Scene2YearCircle from "./components/scenes/Scene2YearCircle/Scene2YearCircle";
import Scene3MonthFocus from "./components/scenes/Scene3MonthFocus/Scene3MonthFocus";
import Scene4SeasonRays from  "./components/scenes/Scene4SeasonRays/Scene4SeasonRays";
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
  const [stage, setStage] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const monthsData = questionData.question;

  // ❗ ОБНОВИЛИ количество сцен
  const MAX_STAGE = 6;

  const changeStage = (nextStage) => {
    setIsFading(true);

    setTimeout(() => {
      setStage(nextStage);
      setIsFading(false);
    }, 500); // длительность fade
  };

  const goNext = () =>
    changeStage(Math.min(stage + 1, MAX_STAGE));

  const goBack = () =>
    changeStage(Math.max(stage - 1, 0));

  return (
    <div className="scene">
      {/* 🟢 0 — Орбита */}
      {stage === 0 && (
        <OrbitScene onComplete={() => changeStage(1)} />
      )}

      {/* 🟢 1 — Год (лепестки) */}
      {stage === 1 && (
        <Scene2YearCircle onComplete={() => changeStage(2)} />
      )}

      {/* 🟢 2 — Фокус по месяцам */}
      {stage === 2 && (
        <Scene3MonthFocus onComplete={() => changeStage(3)} />
      )}

      {/* 🟢 3 — СЕЗОН (лучи / четверть круга) */}
      {stage === 3 && (
        <Scene4SeasonRays onComplete={() => changeStage(4)} />
      )}

      {/* 🟢 4 — Зум */}
      {stage === 4 && (
        <CameraWrapper onComplete={() => changeStage(5)} />
      )}

      {/* 🟢 5 — Сезоны (классика) */}
      {stage === 5 && (
        <SeasonsScene
          data={monthsData}
          onComplete={() => changeStage(6)}
        />
      )}

      {/* 🟢 6 — Сезоны → месяцы */}
      {stage === 6 && <SeasonToMonthsStage />}

      {/* 🌫 FADE OVERLAY */}
      <div className={`fade-overlay ${isFading ? "active" : ""}`} />

      {/* 🎛 DEV-контроллер */}
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
