import './App.css'
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import GemGem400 from './pages/GemGem400';
import Content from './pages/Content';
import ForParents from './pages/ForParents';
import About from './pages/About';
import { useTranslation } from 'react-i18next';

// 실제 앱 컨텐츠를 위한 새로운 컴포넌트
const AppContent: React.FC = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const langCode = pathSegments[0];
    const supportedLangs = ['en', 'ko'];
  
    if (location.pathname === '/') {
      i18n.changeLanguage('ko');
      return;
    }
  
    if (!langCode || !supportedLangs.includes(langCode)) {
      const newPath = `/ko${location.pathname.endsWith('/') ? '' : '/'}${location.search}`;
      navigate(newPath, { replace: true });
    } else {
      i18n.changeLanguage(langCode);
    }
  }, [location.pathname]);

  return (
    <div className="w-full min-h-screen">
      <div className="mx-auto">
        <Navbar />
        <main className="w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:lang">
              <Route index element={<Home />} />
              <Route path="gemgem400" element={<GemGem400 />} />
              <Route path="content" element={<Content />} />
              <Route path="for-parents" element={<ForParents />} />
              <Route path="about" element={<About />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
};

// 메인 App 컴포넌트
const App: React.FC = () => {
  return (
      <Router>
        <AppContent />
      </Router>
  );
};

export default App;
