import React from 'react';

const WebLayout = ({ children }) => {
  return (
    <div className="web-app-wrapper">
      {/* Main Content Area */}
      <div className="web-viewport-container">
        <div className="web-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default WebLayout;
