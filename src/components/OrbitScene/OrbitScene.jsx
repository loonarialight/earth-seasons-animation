import { useAnimationFrame } from 'framer-motion';
import { useMemo, useState } from 'react';
import assets from '../../assets/assets';
import './OrbitScene.css';

export default function OrbitScene() {
  const START_ANGLE = -Math.PI / 2;
  const FULL_CIRCLE = Math.PI * 2;

  const [scene, setScene] = useState(0);
  const [sceneTime, setSceneTime] = useState(0);
  const [angle, setAngle] = useState(START_ANGLE);
  const [trail, setTrail] = useState([]);
  const [finished, setFinished] = useState(false);
  const [blackout, setBlackout] = useState(false); // ⬅️ ЧЁРНЫЙ ЭКРАН

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const RADIUS = 220;

  useAnimationFrame((_, delta) => {
    // если уже полностью всё закончили — ничего не делаем
    if (blackout && sceneTime > 1000) return;

    setSceneTime(t => t + delta);

    // сцена появления
    if (scene === 0 && sceneTime > 800) {
      setScene(1);
      setSceneTime(0);
    }

    // старт орбиты
    if (scene === 1 && sceneTime > 600) {
      setScene(2);
      setSceneTime(0);
    }

    // орбитальное движение
    if (scene === 2 && !finished) {
      setAngle(prev => {
        const next = prev + 0.025;

        setTrail(t => [...t, { angle: next }]);

        // полный круг завершён
        if (next >= START_ANGLE + FULL_CIRCLE) {
          setFinished(true);
          setScene(3);       // сцена стопа
          setSceneTime(0);
          return START_ANGLE + FULL_CIRCLE;
        }

        return next;
      });
    }

    // сцена стопа → включаем blackout
    if (scene === 3 && sceneTime > 300) {
      setBlackout(true);
      setScene(4);
      setSceneTime(0);
    }
  });

  // позиция Земли
  const earthPos = useMemo(() => ({
    x: centerX + RADIUS * Math.cos(angle),
    y: centerY + RADIUS * Math.sin(angle),
  }), [angle, centerX, centerY]);

  // вращение Земли — замирает
  const earthRotation = finished
    ? 360
    : angle * 180 / Math.PI * 2;

  return (
    <div className="orbit-scene">
      {/* SUN */}
      {!blackout && (
        <img
          src={assets.sun}
          alt="Sun"
          className="sun"
          style={{
            left: centerX - 70,
            top: centerY - 70,
          }}
        />
      )}

      {/* TRAIL */}
      {!blackout && trail.map((p, i) => {
        const x = centerX + RADIUS * Math.cos(p.angle);
        const y = centerY + RADIUS * Math.sin(p.angle);
        const visible = Math.floor(i / 5) % 2 === 0;

        return (
          <div
            key={i}
            className={`trail-dot ${visible ? 'on' : 'off'}`}
            style={{ left: x, top: y }}
          />
        );
      })}

      {/* EARTH */}
      {!blackout && scene >= 1 && (
        <img
          src={assets.earth}
          alt="Earth"
          className="earth"
          style={{
            left: earthPos.x - 35,
            top: earthPos.y - 35,
            transform: `rotate(${earthRotation}deg)`,
          }}
        />
      )}

      {/* BLACKOUT OVERLAY */}
      {blackout && <div className="blackout" />}
    </div>
  );
}
//СЦЕНА 1 — Орбита
