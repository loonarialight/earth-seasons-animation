import { useAnimationFrame } from "framer-motion";
import { useMemo, useState } from "react";
import assets from "../../../assets/assets";
import "./OrbitScene.css";
import "../../../App.css";

export default function OrbitScene() {
  const START_ANGLE = -Math.PI / 2;
  const FULL_CIRCLE = Math.PI * 2;

  // 🔑 ЕДИНЫЙ ИСТОЧНИК РАЗМЕРОВ
  const SUN_SIZE = 200;
  const EARTH_SIZE = 60; // было 90 → уменьшили на 30

  const [scene, setScene] = useState(0);
  const [sceneTime, setSceneTime] = useState(0);
  const [angle, setAngle] = useState(START_ANGLE);
  const [trail, setTrail] = useState([]);
  const [finished, setFinished] = useState(false);
  const [blackout, setBlackout] = useState(false);

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const RADIUS = 220;

  useAnimationFrame((_, delta) => {
    if (blackout && sceneTime > 1000) return;

    setSceneTime((t) => t + delta);

    if (scene === 0 && sceneTime > 800) {
      setScene(1);
      setSceneTime(0);
    }

    if (scene === 1 && sceneTime > 600) {
      setScene(2);
      setSceneTime(0);
    }

    if (scene === 2 && !finished) {
      setAngle((prev) => {
        const next = prev + 0.025;
        setTrail((t) => [...t, { angle: next }]);

        if (next >= START_ANGLE + FULL_CIRCLE) {
          setFinished(true);
          setScene(3);
          setSceneTime(0);
          return START_ANGLE + FULL_CIRCLE;
        }

        return next;
      });
    }

    if (scene === 3 && sceneTime > 300) {
      setBlackout(true);
      setScene(4);
      setSceneTime(0);
    }
  });

  // 🌍 позиция центра Земли
  const earthPos = useMemo(
    () => ({
      x: centerX + RADIUS * Math.cos(angle),
      y: centerY + RADIUS * Math.sin(angle),
    }),
    [angle, centerX, centerY]
  );

  const earthRotation = finished ? 360 : (angle * 180) / Math.PI * 2;

  return (
    <div className="orbit-scene">
      {/* ☀️ SUN */}
      {!blackout && (
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
      )}

      {/* 🌌 TRAIL */}
      {!blackout &&
        trail.map((p, i) => {
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
      {!blackout && scene >= 1 && (
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

      {/* 🌑 BLACKOUT */}
      {blackout && <div className="blackout" />}
    </div>
  );
}
