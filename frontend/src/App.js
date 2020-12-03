import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.scss';
import Home from './views/Home/Home';
import Login from './views/Login/Login';

function App(props) {

  function auth(component) {
    return localStorage.getItem('jwt') ? component : <Redirect to="/login" />
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/login' render={() => <Login />} />
          <Route path='/' render={() => auth(<Home />)} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
