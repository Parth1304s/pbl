import React from 'react';
import { Camera, Calculator, ShieldCheck, Landmark, History } from 'lucide-react';

const BottomNav = ({ activeTab, setActiveTab, historyCount = 0 }) => {
  const tabs = [
    { id: 'scan', label: 'Scan', icon: Camera, badge: null },
    { id: 'calculator', label: 'Calculator', icon: Calculator, badge: null },
    { id: 'rbi', label: 'RBI Audit', icon: ShieldCheck, badge: 'Live' },
    { id: 'safe', label: 'Safe Loans', icon: Landmark, badge: 'Govt' },
    { id: 'history', label: 'History', icon: History, badge: historyCount > 0 ? historyCount : null }
  ];

  return (
    <nav className="mobile-bottom-nav">
      <div className="nav-blur-bg"></div>
      <div className="nav-items-container">
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
                <IconComponent size={22} className="nav-icon" />
                {tab.badge && (
                  <span className={`tab-badge ${typeof tab.badge === 'string' ? 'badge-text' : 'badge-num'}`}>
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="nav-label">{tab.label}</span>
              {isActive && <div className="active-pill" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
