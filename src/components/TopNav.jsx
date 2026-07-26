import React from 'react';
import { Camera, Calculator, ShieldCheck, Landmark, History, Sun, Moon, Activity } from 'lucide-react';

const TopNav = ({ activeTab, setActiveTab, historyCount = 0, isDarkMode, setIsDarkMode }) => {
  const navItems = [
    { id: 'scan', label: 'Scan Offer', icon: Camera, badge: null },
    { id: 'calculator', label: 'EMI & APR Calculator', icon: Calculator, badge: null },
    { id: 'rbi', label: 'RBI Registry Audit', icon: ShieldCheck, badge: 'Live' },
    { id: 'safe', label: 'Safe Govt Loans', icon: Landmark, badge: 'Govt' },
    { id: 'history', label: 'Audit History', icon: History, badge: historyCount > 0 ? historyCount : null }
  ];

  return (
    <header className="web-header glass-panel">
      <div className="header-container">
        {/* Brand Logo & Title */}
        <div className="header-brand" onClick={() => setActiveTab('scan')} style={{ cursor: 'pointer' }}>
          <div className="brand-logo-icon">
            <Activity size={26} color="var(--primary-accent)" />
          </div>
          <div>
            <h1 className="brand-name">LoanGuard <span className="brand-badge">Pro</span></h1>
            <p className="brand-subtitle">AI Predatory Loan & True APR Analyzer</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="header-nav-links">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`nav-link-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
                type="button"
              >
                <IconComponent size={18} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`link-badge ${typeof item.badge === 'number' ? 'badge-num' : ''}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Theme Toggle Button */}
        <div className="header-right-actions">
          <button 
            className="theme-toggle-btn"
            onClick={() => setIsDarkMode(!isDarkMode)}
            title="Toggle Dark/Light Theme"
          >
            {isDarkMode ? <Sun size={20} color="#f59e0b" /> : <Moon size={20} color="#6366f1" />}
            <span className="theme-label">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
