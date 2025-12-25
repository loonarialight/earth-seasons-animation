import './App.css';
import OrbitScene from './components/OrbitScene/OrbitScene';
import CameraWrapper from './components/CameraWrapper/CameraWrapper';
import SeasonsScene from './components/SeasonsScene/SeasonsScene';
import { useSceneTimeline } from './hooks/useSceneTimeline';

function App() {
  const stage = useSceneTimeline([
    6300, // OrbitScene
    2000, // CameraWrapper (зум)
    // SeasonsScene — финальная, без таймера
  ]);

  return (
    <div className="scene">
      {stage === 0 && <OrbitScene />}
      {stage === 1 && <CameraWrapper />}
      {stage >= 2 && <SeasonsScene />}
    </div>
  );
}

export default App;
