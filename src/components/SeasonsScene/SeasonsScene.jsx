import { useEffect, useState } from 'react';
import assets from '../../assets/assets';

import EarthSeasonsOverlay from '../EarthSeasonsOverlay/EarthSeasonsOverlay';
import SeasonLabels from '../SeasonLabels/SeasonLabels';

import './SeasonsScene.css';

const SEASON_ORDER = ['winter', 'spring', 'summer', 'autumn'];
const STEP_DURATION = 1500;

export default function SeasonsScene({ onComplete }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step > SEASON_ORDER.length) {
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      setStep(s => s + 1);
    }, STEP_DURATION);

    return () => clearTimeout(timer);
  }, [step, onComplete]);

  return (
    <div className="earth-stage">
      <div className="earth-wrapper">
        <img
          src={assets.earth}
          alt="Earth"
          className="earth-img"
        />

        {/* ⬇️ ВОТ ЗДЕСЬ */}
        <EarthSeasonsOverlay
          size={360}
          visibleCount={step}
        />

        <SeasonLabels
          season={SEASON_ORDER[step - 1]}
        />
      </div>
    </div>
  );
}
