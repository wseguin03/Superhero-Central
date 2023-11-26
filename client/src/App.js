import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPageComponent from './components/LandingPageComponent';
import HeaderComponent from './components/HeaderComponent';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';

function App() {
  return (
    <BrowserRouter>
     <HeaderComponent />
      <Route path="/" component={LandingPageComponent} />
      <Route path="/login" component={LoginComponent} />
      <Route path="/register" component={RegisterComponent} />

    </BrowserRouter>
  );
}

export default App;
