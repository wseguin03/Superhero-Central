import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LandingPageComponent from './components/LandingPageComponent';
import HeaderComponent from './components/HeaderComponent';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';

function App() {
  return (
    <BrowserRouter>
      <HeaderComponent />
      <Switch>
        <Route exact path="/" component={LandingPageComponent} />
        <Route path="/login" component={LoginComponent}/>
        <Route path="/register" component={RegisterComponent} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;