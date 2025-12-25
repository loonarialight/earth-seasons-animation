import { useEffect, useState } from 'react';
import assets from '../../assets/assets';
import '../../styles/earthStage.css';
import './SeasonsScene.css';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const SEASONS = [
  { title: 'ОСЕНЬ', img: assets.s1, cls: 'light-autumn' },
  { title: 'ЗИМА',  img: assets.s2, cls: 'light-winter' },
  { title: 'ВЕСНА', img: assets.s3, cls: 'light-spring' },
  { title: 'ЛЕТО',  img: assets.s4, cls: 'light-summer' },
];

export default function SeasonsScene() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    requestAnimationFrame(() => setVisible(true));
  }, [index]);

  const season = SEASONS[index];

  return (
    <div className="earth-stage">
      <div className="season-layer">
        <div className="season-title">{season.title}</div>

        <div className="earth-wrapper">
          <img
            src={assets.earth}
            alt="Earth"
            className="earth-img"
          />

          <img
            src={season.img}
            alt="Season light"
            className={`light-ellipse ${season.cls} ${visible ? 'visible' : ''}`}
          />
        </div>
      </div>

      {/* КНОПКА MATERIAL UI */}
      <Stack
        direction="row"
        spacing={2}
        sx={{
          position: 'fixed',
          bottom: 24,
        }}
      >
        <Button
          variant="contained"
          onClick={() => setIndex((index + 1) % SEASONS.length)}
        >
          Следующий сезон
        </Button>
      </Stack>
    </div>
  );
}
