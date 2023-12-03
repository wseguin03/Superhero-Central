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
import MyProfileComponent from './components/MyProfileComponent';
import AdminComponent from './components/AdminComponent';
import PrivacyPolicy from './components/PolicyComponents/privacyPolicy';
import DmcaPolicy from './components/PolicyComponents/dmcaPolicy';
import Policy from './components/PolicyComponents/PolicyComponent';
import FooterComponent from './components/FooterComponent';
import MorePolicyComponent from './components/PolicyComponents/MorePolicyComponent';
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
        <Route path = '/my-profile' element = {<MyProfileComponent/>} />
        <Route path = '/admin' element = {<AdminComponent/>} />
        <Route path = 'policy/:name' element = {<Policy/>} />
        <Route path = 'policy/more' element = {<MorePolicyComponent/>} />
      </Routes>
      <FooterComponent/>
    </BrowserRouter>
  );
}

export default App;
