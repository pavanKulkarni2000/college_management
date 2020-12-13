import './styles/App.css';
import Router from './components/Router'
import axios from 'axios'

axios.defaults.baseURL='http://localhost:1500/api/'
axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('x-auth-token')


function App() {
  return (
    <div className="App">
      <Router/>
    </div>
  );
}

export default App;
