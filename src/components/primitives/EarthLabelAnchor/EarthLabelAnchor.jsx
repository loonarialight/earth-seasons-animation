import './EarthLabelAnchor.css';

export default function EarthLabelAnchor({ children }) {
  return (
    <div className="earth-label-anchor">
      {children}
    </div>
  );
}

/**
 * EarthLabelAnchor
 *
 * Якорная точка для подписей на Земле.
 *
 * Используется для:
 * – правильного позиционирования текстов
 * – привязки сезонов / меток к кругу Земли
 *
 * Сам НИЧЕГО не рисует — только задаёт координаты.
 */
