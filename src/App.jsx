import { useState } from 'react';
import './App.css';

import OrbitScene from './components/OrbitScene/OrbitScene';
import CameraWrapper from './components/CameraWrapper/CameraWrapper';
import SeasonsScene from './components/SeasonsScene/SeasonsScene';
import Numbers from './components/Numbers/Numbers';
import Months from './components/Months/Months';
import ArcHighlight from './components/ArcHighlight/ArcHighlight';
import { useSceneTimeline } from './hooks/useSceneTimeline';

import questionData from './mock/question-786.json';
console.log('JSON from backend:', questionData.question);

function App() {
  const stage = useSceneTimeline([6300, 2000]);

  const [showNumbers, setShowNumbers] = useState(false);
  const [showMonths, setShowMonths] = useState(false);

  const [showArc, setShowArc] = useState(false);
  // 🔥 единый источник данных
  const monthsData = questionData.question;

  return (
    <div className="scene">
      {stage === 0 && <OrbitScene />}
      {stage === 1 && <CameraWrapper />}

      {stage >= 2 && (
        <SeasonsScene
          data={monthsData}
          onComplete={() => setShowNumbers(true)}
        />
      )}

      {showNumbers && (
      <Numbers
        data={monthsData}
        onComplete={() => setShowArc(true)}
      />
      )}

      {showArc && (
        <ArcHighlight
          count={12}
          onComplete={() => setShowMonths(true)}
        />
      )}

      {showMonths && (
        <Months data={monthsData} />
      )}
    </div>
  );
}

export default App;
