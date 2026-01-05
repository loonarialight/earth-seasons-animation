import { useEffect, useState } from 'react';
import assets from '../../../assets/assets';
import "../../../styles/earthStage.css";
import './CameraWrapper.css';
import "../../../App.css";

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

/**
 * SCENE 2 — CameraWrapper
 *
 * Отвечает за переход (zoom):
 * – камера приближается к Земле
 * – сцена очищается от лишних элементов
 * – фиксируется новый масштаб
 *
 * Назначение:
 * Плавный переход от общей орбиты к детальному виду Земли.
 */
