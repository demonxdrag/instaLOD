import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
import Home from './views/Home/Home';
import Login from './views/Login/Login';

function App(props) {

  useEffect(() => {
    const isLogged = localStorage.getItem('jwt');
    if (!isLogged) props.history.push('/login');
  }, [props.history]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/login' render={() => <Login />} />
          <Route path='/' render={() => <Home />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
