import React, { useState, useEffect } from 'react';
import { Search, Calculator, ShieldCheck, Sparkles } from 'lucide-react';

const ProcessingOverlay = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { icon: <Search size={22} />, text: "Running OCR & Extracting Terms..." },
    { icon: <Calculator size={22} />, text: "Calculating True APR (XIRR)..." },
    { icon: <ShieldCheck size={22} />, text: "Querying RBI NBFC Registry..." }
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setActiveStep(1), 900);
    const timer2 = setTimeout(() => setActiveStep(2), 1800);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="mobile-processing-card fade-in">
      {/* Mobile Scanner Pulsing Radar Core */}
      <div className="mobile-radar-wrapper">
        <div className="radar-ping-ring"></div>
        <div className="radar-core">
          <Sparkles size={36} color="#6366f1" className="sparkle-anim" />
        </div>
      </div>

      <h3 className="processing-title">Auditing Loan Terms...</h3>
      <p className="processing-subtitle">Scanning for hidden fees & interest traps</p>

      {/* Progress Steps List */}
      <div className="processing-steps-list">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className={`p-step-item ${index <= activeStep ? 'completed' : ''} ${index === activeStep ? 'current' : ''}`}
          >
            <div className="step-ic">{step.icon}</div>
            <span className="step-txt">{step.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessingOverlay;
