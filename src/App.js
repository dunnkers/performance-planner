import './App.css';
import 'antd/dist/antd.css';
import JournalMaker from './JournalMaker';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Performance Planner <span style={{color:"#ccc", display: "inline"}}>Assembler</span>
      </header>
      <content>
        <JournalMaker />
      </content>
    </div>
  );
}

export default App;
