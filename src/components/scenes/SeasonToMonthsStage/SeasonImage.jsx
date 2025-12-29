import assets from "../../../assets/assets";
import "./seasonToMonths.css";
    
export default function SeasonImage({ season }) {
  return (
    <div
      className={`season-image season-${season}`}
      style={{
        backgroundImage: `url(${assets.seasons[season]})`,
      }}
    />
  );
}
