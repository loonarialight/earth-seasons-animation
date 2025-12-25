import { useEffect, useState } from 'react';
import assets from '../../assets/assets';
import '../../styles/earthStage.css';
import './CameraWrapper.css';

export default function CameraWrapper() {
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setZoom(true));
  }, []);

  return (
    <div className="earth-stage">
      <div className={`earth-wrapper zoom-target ${zoom ? 'zoom-in' : ''}`}>
        <img
          src={assets.earth}
          alt="Earth"
          className="earth-img"
        />
      </div>
    </div>
  );
}
