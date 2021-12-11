import { Component } from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import NotFound from './Components/NotFound';
import { Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoutes from './Components/ProtectedRoutes';

class App extends Component {
  render() {
    return <>

      <Navbar />
      <Switch>
        <Route path="/Login" component={Login} />
        <Route path="/Register" component={Register} />
        <ProtectedRoutes path="/Home" component={Home} />
        <Redirect exact from="/" to="Login" />
        <Route path="*" component={NotFound} />
      </Switch>

    </>
  }
}

export default App;