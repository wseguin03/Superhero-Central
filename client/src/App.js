import React from 'react';
import SuperheroComponent from './components/SuperheroComponent'; // Add this line
import './App.css';
import {Fragment} from 'react';
import SideBarComponent from './components/SideBarComponent';

function App() {
  return (
    <Fragment>
      <div className="App">
        <SideBarComponent></SideBarComponent>
        <SuperheroComponent></SuperheroComponent>
      </div>
    </Fragment>
  );
}

export default App;