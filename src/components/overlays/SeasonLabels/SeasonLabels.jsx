import './SeasonLabels.css';

const TITLES = {
  winter: 'ЗИМА',
  spring: 'ВЕСНА',
  summer: 'ЛЕТО',
  autumn: 'ОСЕНЬ',
};

export default function SeasonLabels({ season }) {
  return (
    <span className="season-text">
      {season ? TITLES[season] : ''}
    </span>
  );
}

/**
 * SeasonLabels
 *
 * Отображает названия сезонов:
 * – ЗИМА
 * – ВЕСНА
 * – ЛЕТО
 * – ОСЕНЬ
 *
 * Используется в SeasonsScene.
 * Это текстовые подписи, не месяцы.
 */
