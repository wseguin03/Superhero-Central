import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPageComponent from './components/LandingPageComponent';

// const App = () => (
//   <Router>
//     <Routes>
//       <Route path="/" element={<LandingPageComponent />} />
//     </Routes>
//   </Router>
// );


function App() {
  return (
  <Fragment>
    <div className="App">
      <LandingPageComponent></LandingPageComponent>
    </div>
  </Fragment>
);
}
export default App;
// return (
//   <Fragment>
//     <div className="App">
//       <SideBarComponent></SideBarComponent>
//       <SuperheroComponent></SuperheroComponent>
//     </div>
//   </Fragment>
// );