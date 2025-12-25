import { useAnimationFrame } from 'framer-motion';
import { useRef, useState } from 'react';

export function useSceneTimeline(stages = []) {
  const [stage, setStage] = useState(0);
  const elapsedRef = useRef(0);

  useAnimationFrame((_, delta) => {
    // если дошли до последней сцены — стоп
    if (stage >= stages.length) return;

    elapsedRef.current += delta;

    if (elapsedRef.current >= stages[stage]) {
      elapsedRef.current = 0;
      setStage(s => s + 1);
    }
  });

  return stage;
}
