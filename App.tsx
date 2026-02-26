import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import RealtorProfile from './components/pages/RealtorProfile';
import BlogPost from './components/pages/BlogPost';
import FirstTimeBuyers from './components/pages/FirstTimeBuyers';
import MortgageCalculator from './components/pages/MortgageCalculator';
import RelocationServices from './components/pages/RelocationServices';
import BuyersGuide from './components/pages/BuyersGuide';
import HomeValuation from './components/pages/HomeValuation';
import SellersGuide from './components/pages/SellersGuide';
import MarketingYourHome from './components/pages/MarketingYourHome';
import AboutUs from './components/pages/AboutUs';
import PrivacyPolicy from './components/pages/PrivacyPolicy';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/agent/:id" element={<RealtorProfile />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        {/* Resource Pages */}
        <Route path="/first-time-buyers" element={<FirstTimeBuyers />} />
        <Route path="/mortgage-calculator" element={<MortgageCalculator />} />
        <Route path="/relocation-services" element={<RelocationServices />} />
        <Route path="/buyers-guide" element={<BuyersGuide />} />
        <Route path="/home-valuation" element={<HomeValuation />} />
        <Route path="/sellers-guide" element={<SellersGuide />} />
        <Route path="/marketing-your-home" element={<MarketingYourHome />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        {/* Fallback */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;