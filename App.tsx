import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// Lazy load all page components
const HomePage = lazy(() => import('./components/pages/HomePage'));
const RealtorProfile = lazy(() => import('./components/pages/RealtorProfile'));
const BlogPost = lazy(() => import('./components/pages/BlogPost'));
const FirstTimeBuyers = lazy(() => import('./components/pages/FirstTimeBuyers'));
const MortgageCalculator = lazy(() => import('./components/pages/MortgageCalculator'));
const RelocationServices = lazy(() => import('./components/pages/RelocationServices'));
const BuyersGuide = lazy(() => import('./components/pages/BuyersGuide'));
const HomeValuation = lazy(() => import('./components/pages/HomeValuation'));
const SellersGuide = lazy(() => import('./components/pages/SellersGuide'));
const MarketingYourHome = lazy(() => import('./components/pages/MarketingYourHome'));
const PrivacyPolicy = lazy(() => import('./components/pages/PrivacyPolicy'));
const Reviews = lazy(() => import('./components/pages/Reviews'));
const AboutUs = lazy(() => import('./components/pages/AboutUs'));
const CommunityEvents = lazy(() => import('./components/pages/CommunityEvents'));
const NotFound = lazy(() => import('./components/pages/NotFound'));

// Global loading fallback
const PageLoader = () => (
  <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
    <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
  </div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
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
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/community" element={<CommunityEvents />} />
          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;