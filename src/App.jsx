import './App.css';
import assets from './assets/assets';

function App() {
  return (
    <div
      className="scene"
      style={{ backgroundImage: `url(${assets.background})` }}
    >
      <img src={assets.sun} alt="Sun" className="sun" />
      <img src={assets.earth} alt="Earth" className="earth" />
    </div>
  );
}

export default App;
