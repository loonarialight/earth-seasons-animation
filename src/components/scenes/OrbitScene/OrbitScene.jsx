import { useAnimationFrame } from "framer-motion";
import { useMemo, useState } from "react";
import assets from "../../../assets/assets";
import "./OrbitScene.css";
import "../../../App.css";

export default function OrbitScene({ onComplete }) {
  const START_ANGLE = -Math.PI / 2;
  const FULL_CIRCLE = Math.PI * 2;
  const CENTER_Y_OFFSET = 40;

  // 🔑 размеры
  const SUN_SIZE = 200;
  const EARTH_SIZE = 60;
  const RADIUS = 200;

  // ⏱ тайминги (мс)
  const APPEAR_TIME = 800;
  const START_MOVE_TIME = 600;
  const YEAR_HOLD_TIME = 2000;

  const [scene, setScene] = useState(0);
  const [sceneTime, setSceneTime] = useState(0);
  const [angle, setAngle] = useState(START_ANGLE);
  const [trail, setTrail] = useState([]);
  const [finished, setFinished] = useState(false);
  const [showYearLabel, setShowYearLabel] = useState(false);

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2 + CENTER_Y_OFFSET;

  useAnimationFrame((_, delta) => {
    // ⛔ полностью останавливаем сцену после завершения
    if (scene === 4) return;

    setSceneTime((t) => t + delta);

    // сцена 0 → 1 (появление)
    if (scene === 0 && sceneTime > APPEAR_TIME) {
      setScene(1);
      setSceneTime(0);
    }

    // сцена 1 → 2 (старт движения)
    if (scene === 1 && sceneTime > START_MOVE_TIME) {
      setScene(2);
      setSceneTime(0);
    }

    // 🌍 орбитальное движение
    if (scene === 2 && !finished) {
      setAngle((prev) => {
        const next = prev + 0.025;
        setTrail((t) => [...t, { angle: next }]);

        // 🔁 полный оборот
        if (next >= START_ANGLE + FULL_CIRCLE) {
          setFinished(true);
          setShowYearLabel(true);
          setScene(3);
          setSceneTime(0);
          return START_ANGLE + FULL_CIRCLE;
        }

        return next;
      });
    }

    // 🕒 удержание «1 ГОД» → завершение сцены
    if (scene === 3 && sceneTime > YEAR_HOLD_TIME) {
      setScene(4);
      onComplete?.(); // 🔑 Переход к следующей сцене
    }
  });

  // 🌍 позиция Земли
  const earthPos = useMemo(
    () => ({
      x: centerX + RADIUS * Math.cos(angle),
      y: centerY + RADIUS * Math.sin(angle),
    }),
    [angle, centerX, centerY]
  );

  const earthRotation = finished
    ? 360
    : ((angle * 180) / Math.PI) * 2;

  return (
    <div className="orbit-scene">
      {/* ☀️ SUN */}
      <img
        src={assets.sun}
        alt="Sun"
        className="sun"
        style={{
          width: SUN_SIZE,
          height: SUN_SIZE,
          left: centerX - SUN_SIZE / 2,
          top: centerY - SUN_SIZE / 2,
        }}
      />

      {/* 🕒 1 ГОД */}
      {showYearLabel && (
        <div
          className="year-label"
          style={{
            left: centerX,
            top: centerY - RADIUS - 100,
          }}
        >
          1 ГОД
        </div>
      )}

      {/* 🌌 TRAIL */}
      {trail.map((p, i) => {
        const x = centerX + RADIUS * Math.cos(p.angle);
        const y = centerY + RADIUS * Math.sin(p.angle);
        const visible = Math.floor(i / 5) % 2 === 0;

        return (
          <div
            key={i}
            className={`trail-dot ${visible ? "on" : "off"}`}
            style={{ left: x, top: y }}
          />
        );
      })}

      {/* 🌍 EARTH */}
      {scene >= 1 && (
        <img
          src={assets.earth}
          alt="Earth"
          className="earth"
          style={{
            width: EARTH_SIZE,
            height: EARTH_SIZE,
            left: earthPos.x - EARTH_SIZE / 2,
            top: earthPos.y - EARTH_SIZE / 2,
            transform: `rotate(${earthRotation}deg)`,
          }}
        />
      )}
    </div>
  );
}
