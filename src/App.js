import './App.css';
import 'antd/dist/antd.css';
import JournalMaker from './components/JournalMaker';
import moment from 'moment';

function App() {
  const currentYear = moment().year();

  return (
    <div className="App">
      <div className="App-content">
        <header className="App-header">
          Performance Planner 
          <small style={{color:"#ccc", display: "inline"}}>
            Assembler ✨
          </small>
        </header>
        <JournalMaker />
      </div>
      <footer className='App-footer'>
        <small>
          © {currentYear}.
          Built with ♥ by&nbsp;
          <a className="App-link" href="https://jeroenoverschie.nl/">Jeroen Overschie</a>
        </small>
      </footer>
    </div>
  );
}

export default App;
