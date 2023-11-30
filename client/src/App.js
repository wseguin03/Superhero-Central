import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPageComponent from './components/LandingPageComponent';
import HeaderComponent from './components/HeaderComponent';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import SearchComponent from './components/SearchComponent';
import MyListComponent from './components/MyListComponent';
import PublicListComponent from './components/PublicListComponent';
import EditListComponent from './components/EditListComponent';
import ReviewComponent from './components/ReviewComponent';
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
        <Route path = '/lists/:id' element = {<EditListComponent/>} />
        <Route path = 'lists/:id/review' element = {<ReviewComponent/>} />




      </Routes>
    </BrowserRouter>
  );
}

export default App;
