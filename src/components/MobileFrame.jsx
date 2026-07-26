import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, Wifi, Battery, Signal, Sun, Moon } from 'lucide-react';

const MobileFrame = ({ children, isDarkMode, setIsDarkMode }) => {
  const [isPhoneMockup, setIsPhoneMockup] = useState(true);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mobile-app-wrapper">
      {/* Top Header Control Bar */}
      <div className="view-mode-bar glass-panel">
        <div className="app-brand">
          <span className="brand-dot pulse-anim"></span>
          <span className="brand-title">LoanGuard Mobile</span>
          <span className="version-badge">v2.0 Native</span>
        </div>
        
        <div className="header-actions">
          <button 
            className="theme-toggle-btn"
            onClick={() => setIsDarkMode(!isDarkMode)}
            title="Toggle Dark/Light Mode"
          >
            {isDarkMode ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#6366f1" />}
          </button>
          
          <div className="mode-toggle-group">
            <button 
              className={`mode-btn ${isPhoneMockup ? 'active' : ''}`} 
              onClick={() => setIsPhoneMockup(true)}
              title="Smartphone Shell View"
            >
              <Smartphone size={16} /> Phone View
            </button>
            <button 
              className={`mode-btn ${!isPhoneMockup ? 'active' : ''}`} 
              onClick={() => setIsPhoneMockup(false)}
              title="Fullscreen View"
            >
              <Monitor size={16} /> Full Screen
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Viewport */}
      <div className={`viewport-container ${isPhoneMockup ? 'phone-mockup-mode' : 'fullscreen-mode'}`}>
        {isPhoneMockup ? (
          <div className="phone-device-shell">
            {/* Phone Hardware Details */}
            <div className="phone-camera-notch">
              <div className="camera-lens"></div>
              <div className="speaker-grille"></div>
            </div>
            <div className="phone-volume-up"></div>
            <div className="phone-volume-down"></div>
            <div className="phone-power"></div>

            {/* Inner Screen */}
            <div className="phone-screen">
              {/* iOS / Android Status Bar */}
              <div className="status-bar">
                <span className="status-time">{currentTime || '09:41'}</span>
                <div className="status-icons">
                  <Signal size={13} />
                  <Wifi size={13} />
                  <span className="battery-percent">98%</span>
                  <Battery size={15} className="battery-icon" />
                </div>
              </div>

              {/* Mobile Content Scroll Area */}
              <div className="phone-screen-content">
                {children}
              </div>

              {/* iOS Home Gesture Bar Indicator */}
              <div className="home-indicator-bar">
                <div className="home-indicator"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="fullscreen-mobile-container">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileFrame;
