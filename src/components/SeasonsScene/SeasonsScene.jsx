import { useEffect, useState } from 'react';
import assets from '../../assets/assets';

import EarthSeasonsOverlay from '../EarthSeasonsOverlay/EarthSeasonsOverlay';
import SeasonLabels from '../SeasonLabels/SeasonLabels';
import EarthLabelAnchor from '../EarthLabelAnchor/EarthLabelAnchor';

import './SeasonsScene.css';

const SEASON_ORDER = ['winter', 'spring', 'summer', 'autumn'];
const STEP_DURATION = 1500;

export default function SeasonsScene({ onComplete }) {
  // 🔑 ВАЖНО: стартуем с 1
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (step > SEASON_ORDER.length) {
      onComplete?.();
      return;
    }

    const t = setTimeout(() => {
      setStep(s => s + 1);
    }, STEP_DURATION);

    return () => clearTimeout(t);
  }, [step, onComplete]);

  return (
    <div className="earth-stage">
      <div className="earth-wrapper">
        <img
          src={assets.earth}
          className="earth-img"
          alt="Earth"
        />

        <EarthSeasonsOverlay
          size={320}
          visibleCount={step}
        />

        {/* ⬇️ ТЕКСТ ТЕПЕРЬ ГАРАНТИРОВАННО ЕСТЬ */}
        <EarthLabelAnchor>
          <SeasonLabels season={SEASON_ORDER[step - 1]} />
        </EarthLabelAnchor>
      </div>
    </div>
  );
}
