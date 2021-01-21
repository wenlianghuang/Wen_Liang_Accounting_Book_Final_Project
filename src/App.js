import './App.css';
import { BrowserRouter as Router} from 'react-router-dom';
/*import CreateUser from './components/create_user.js';
import CreateEmail from './components/change_email.js';
import LoginUser from './components/login_user.js';
import Stock_Platform from './components/stock_platform';
import Deal from './components/deal';
import homearr from './externalHomeArr';
*/
import Home from './containers/home';
import './css/templatemo-style.css';
import './css/responsive.css';

function App() { 
  return (
    
  <Router>
    <Home/>
  </Router>


  );
}

export default App;
