import { useState } from 'react';
import './App.css';

import OrbitScene from './components/OrbitScene/OrbitScene';
import CameraWrapper from './components/CameraWrapper/CameraWrapper';
import SeasonsScene from './components/SeasonsScene/SeasonsScene';
import Numbers from './components/Numbers/Numbers';
import Months from './components/Months/Months';
import { useSceneTimeline } from './hooks/useSceneTimeline';

function App() {
  const stage = useSceneTimeline([6300, 2000]);

  const [showNumbers, setShowNumbers] = useState(false);
  const [showMonths, setShowMonths] = useState(false);

  return (
    <div className="scene">
      {stage === 0 && <OrbitScene />}
      {stage === 1 && <CameraWrapper />}

      {stage >= 2 && (
        <SeasonsScene onComplete={() => setShowNumbers(true)} />
      )}

      {showNumbers && (
        <Numbers onComplete={() => setShowMonths(true)} />
      )}

      {showMonths && <Months />}
    </div>
  );
}

export default App;
