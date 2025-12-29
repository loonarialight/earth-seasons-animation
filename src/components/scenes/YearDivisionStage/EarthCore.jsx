import assets from "../../../assets/assets";

export default function EarthCore() {
  return (
    <div
      className="earth-core-img"
      style={{
        backgroundImage: `url(${assets.earth})`,
      }}
    />
  );
}
