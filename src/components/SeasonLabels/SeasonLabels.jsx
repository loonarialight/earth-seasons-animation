import './SeasonLabels.css';

const TITLES = {
  winter: 'ЗИМА',
  spring: 'ВЕСНА',
  summer: 'ЛЕТО',
  autumn: 'ОСЕНЬ',
};

export default function SeasonLabels({ season }) {
  if (!season) return null;

  return (
    <div className="season-label">
      {TITLES[season]}
    </div>
  );
}
