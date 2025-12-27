import { useEffect, useMemo, useRef, useState } from 'react';
import assets from '../../assets/assets';
import '../../styles/earthStage.css';
import './SeasonsScene.css';

const SEASON_META = {
  winter: { title: 'ЗИМА', img: assets.s2, cls: 'light-winter' },
  spring: { title: 'ВЕСНА', img: assets.s3, cls: 'light-spring' },
  summer: { title: 'ЛЕТО', img: assets.s4, cls: 'light-summer' },
  autumn: { title: 'ОСЕНЬ', img: assets.s1, cls: 'light-autumn' },
};

// 🔥 правильный порядок года
const SEASON_ORDER = ['autumn', 'winter', 'spring', 'summer'];

const STEP_DURATION = 2000;
const FINAL_DURATION = 3000;

export default function SeasonsScene({ data, onComplete }) {
  const [index, setIndex] = useState(0);
  const completedRef = useRef(false);

  // ✅ сезоны: порядок фиксированный, но только те, что есть в JSON
  const seasons = useMemo(() => {
    const available = new Set(data.map(m => m.Season));
    return SEASON_ORDER
      .filter(season => available.has(season))
      .map(season => SEASON_META[season]);
  }, [data]);

  useEffect(() => {
    if (!seasons.length) return;

    if (index === seasons.length - 1) {
      if (completedRef.current) return;
      completedRef.current = true;

      const timer = setTimeout(() => {
        onComplete?.();
      }, FINAL_DURATION);

      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setIndex(i => i + 1);
    }, STEP_DURATION);

    return () => clearTimeout(timer);
  }, [index, seasons, onComplete]);

  if (!seasons.length) return null;

  return (
    <div className="earth-stage">
      <div className="season-layer">
        <div className="season-title">
          {seasons[index].title}
        </div>

        <div className="earth-wrapper">
          <img
            src={assets.earth}
            alt="Earth"
            className="earth-img"
          />

          {seasons.map((s, i) => (
            <img
              key={s.title}
              src={s.img}
              alt={s.title}
              className={`light-ellipse ${s.cls} ${i <= index ? 'visible' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
