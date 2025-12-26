import { useEffect, useState } from 'react';
import assets from '../../assets/assets';
import '../../styles/earthStage.css';
import './SeasonsScene.css';

const SEASONS = [
  { title: 'ОСЕНЬ', img: assets.s1, cls: 'light-autumn' },
  { title: 'ЗИМА',  img: assets.s2, cls: 'light-winter' },
  { title: 'ВЕСНА', img: assets.s3, cls: 'light-spring' },
  { title: 'ЛЕТО',  img: assets.s4, cls: 'light-summer' },
];

export default function SeasonsScene({ onComplete }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // если дошли до ЛЕТА
    if (index === SEASONS.length - 1) {
      const endTimer = setTimeout(() => {
        onComplete?.();
      }, 3000); // ⏱ 3 секунды на ЛЕТЕ

      return () => clearTimeout(endTimer);
    }

    // обычный переход (2 секунды)
    const timer = setTimeout(() => {
      setIndex(i => i + 1);
    }, 2000);

    return () => clearTimeout(timer);
  }, [index, onComplete]);

  return (
    <div className="earth-stage">
      <div className="season-layer">
        <div className="season-title">
          {SEASONS[index].title}
        </div>

        <div className="earth-wrapper">
          {/* ЗЕМЛЯ */}
          <img
            src={assets.earth}
            alt="Earth"
            className="earth-img"
          />

          {/* СЕЗОНЫ С НАКОПЛЕНИЕМ */}
          {SEASONS.map((s, i) => (
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
