import './App.css';
import 'antd/dist/antd.css';
import JournalMaker from './components/JournalMaker';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Performance Planner 
        <small style={{color:"#ccc", display: "inline"}}>
          Assembler ✨
        </small>
      </header>
      <JournalMaker />
    </div>
  );
}

export default App;
