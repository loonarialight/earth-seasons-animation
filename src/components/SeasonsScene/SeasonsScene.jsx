import { useEffect, useMemo, useRef, } from 'react';
import assets from '../../assets/assets';
import './SeasonsScene.css';
import EarthSeasonsOverlay from '../EarthSeasonsOverlay/EarthSeasonsOverlay';

const SEASON_ORDER = ['winter', 'spring', 'summer', 'autumn'];

const STEP_DURATION = 2000;
const FINAL_DURATION = 3000;

export default function SeasonsScene({ data, onComplete }) {
  const completedRef = useRef(false);

  const seasons = useMemo(() => {
    const available = new Set(data.map(m => m.Season));
    return SEASON_ORDER.filter(s => available.has(s));
  }, [data]);

  useEffect(() => {
    if (!seasons.length) return;
    if (completedRef.current) return;

    const timer = setTimeout(() => {
      completedRef.current = true;
      onComplete?.();
    }, FINAL_DURATION);

    return () => clearTimeout(timer);
  }, [seasons, onComplete]);

  return (
    <div className="earth-stage">
      <div className="season-layer">

        <div className="season-title">
          ВРЕМЕНА ГОДА
        </div>

        <div className="earth-wrapper">
          {/* 🌍 Земля */}
          <img
            src={assets.earth}
            alt="Earth"
            className="earth-img"
          />

          {/* 🎨 SVG-раскраска сезонов */}
          <EarthSeasonsOverlay />
        </div>

      </div>
    </div>
  );
}
