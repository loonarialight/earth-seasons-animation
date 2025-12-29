import assets from "../../../assets/assets";
import "./earthCore.css";

export default function EarthCore() {
  return (
    <div
      className="earth-core"
      style={{ backgroundImage: `url(${assets.earth})` }}
    />
  );
}
