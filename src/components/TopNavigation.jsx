import React from 'react';
import { Camera, Calculator, ShieldCheck, Landmark, History, Sun, Moon, Shield, LogOut } from 'lucide-react';

const TopNavigation = ({ isAuthenticated, onLogout, activeTab, setActiveTab, historyCount = 0, isDarkMode, setIsDarkMode }) => {
  const tabs = [
    { id: 'scan', label: 'Scan', icon: Camera, badge: null },
    { id: 'calculator', label: 'Calculator', icon: Calculator, badge: null },
    { id: 'rbi', label: 'RBI Audit', icon: ShieldCheck, badge: 'Live' },
    { id: 'safe', label: 'Safe Loans', icon: Landmark, badge: 'Govt' },
    { id: 'history', label: 'History', icon: History, badge: historyCount > 0 ? historyCount : null }
  ];

  return (
    <header className="top-navigation glass-panel">
      <div className="nav-container">
        {/* Brand */}
        <div className="app-brand">
          <Shield size={24} color="var(--primary-accent)" />
          <span className="brand-title">LoanGuard</span>
        </div>

        {/* Navigation Tabs */}
        {isAuthenticated && (
          <nav className="nav-tabs">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  className={`nav-tab-item ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                  type="button"
                >
                  <div className="icon-wrapper">
                    <IconComponent size={18} className="nav-icon" />
                    {tab.badge && (
                      <span className={`tab-badge ${typeof tab.badge === 'string' ? 'badge-text' : 'badge-num'}`}>
                        {tab.badge}
                      </span>
                    )}
                  </div>
                  <span className="nav-label">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        )}

        {/* Theme Toggle & Logout */}
        <div className="header-actions" style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            className="theme-toggle-btn"
            onClick={() => setIsDarkMode(!isDarkMode)}
            title="Toggle Dark/Light Mode"
          >
            {isDarkMode ? <Sun size={20} color="#f59e0b" /> : <Moon size={20} color="#6366f1" />}
          </button>
          
          {isAuthenticated && (
            <button 
              className="theme-toggle-btn"
              onClick={onLogout}
              title="Log Out"
              style={{ color: 'var(--danger)' }}
            >
              <LogOut size={20} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNavigation;
