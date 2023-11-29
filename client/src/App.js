import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPageComponent from './components/LandingPageComponent';
import HeaderComponent from './components/HeaderComponent';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import SearchComponent from './components/SearchComponent';
import MyListComponent from './components/MyListComponent';
import PublicListComponent from './components/PublicListComponent';
function App() {
  return (
    <BrowserRouter>
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<LandingPageComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/hero-search" element={<SearchComponent/>} />
        <Route path="/mylists" element={<MyListComponent/>} />
        <Route path="/public-lists" element={<PublicListComponent/>} />



      </Routes>
    </BrowserRouter>
  );
}

export default App;
