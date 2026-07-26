import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, RefreshCw, ExternalLink, Info, ShieldAlert, ArrowLeft, Share2, Copy, Check, ChevronRight } from 'lucide-react';

const ResultsDashboard = ({ data, onReset, onSaveToHistory }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('summary'); // 'summary', 'spiral', 'compliance'

  if (!data) return null;

  const { interestRate, tenure, trueAPR, isRegistered, legalFlags, principal, lender, processingFee, hiddenInsurance } = data;
  const isPredatory = trueAPR > 30 || !isRegistered;

  // Debt Spiral calculation
  const spiralData = [];
  let currentDebt = principal;
  for (let i = 0; i <= 6; i++) {
    spiralData.push(Math.round(currentDebt));
    if (i > 0) currentDebt = currentDebt + (currentDebt * 0.05); // 5% penalty monthly
  }
  const maxDebt = spiralData[spiralData.length - 1];

  // Plain language cost difference
  const advertisedInterest = principal * (interestRate / 100);
  const trueInterest = principal * (trueAPR / 100);
  const costDifference = Math.round(Math.abs(trueInterest - advertisedInterest));

  const handleShareWhatsApp = () => {
    const reportText = `🚨 *LOANGUARD AUDIT REPORT* 🚨\n\n` +
      `📱 *App:* ${lender || 'Loan App'}\n` +
      `💰 *Loan:* ₹${principal.toLocaleString('en-IN')}\n` +
      `📢 *Advertised Rate:* ${interestRate}% p.a.\n` +
      `⚡ *REAL TRUE APR (XIRR):* ${trueAPR}%\n` +
      `💸 *Hidden Extra Cost:* ₹${costDifference.toLocaleString('en-IN')}\n` +
      `🏛️ *RBI Status:* ${isRegistered ? 'Registered NBFC' : 'UNREGISTERED / ILLEGAL'}\n\n` +
      `VERDICT: ${isPredatory ? '⛔ DANGEROUS PREDATORY LOAN TRAP!' : '✅ SAFE REGULATED OFFER'}`;

    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="results-dashboard-mobile fade-in">
      {/* Back Button / Navigation */}
      <div className="results-top-bar">
        <button className="btn-back-scanner" onClick={onReset}>
          <ArrowLeft size={18} /> New Scan
        </button>
        <button className="btn-share-report" onClick={handleShareWhatsApp}>
          {copied ? <Check size={16} color="var(--success)" /> : <Share2 size={16} />}
          {copied ? 'Copied Share Link!' : 'Share Audit'}
        </button>
      </div>

      {/* Verdict Alert Header Card */}
      <div className={`mobile-card verdict-banner-card ${isPredatory ? 'verdict-danger' : 'verdict-success'}`}>
        <div className="verdict-header">
          <div className="verdict-icon-bubble">
            {isPredatory ? <AlertTriangle size={32} /> : <CheckCircle size={32} />}
          </div>
          <div>
            <span className="verdict-tag">{isPredatory ? 'PREDATORY RISK WARNING' : 'APPROVED OFFER'}</span>
            <h2>{isPredatory ? 'High Cost Debt Trap' : 'Fair Regulated Loan'}</h2>
          </div>
        </div>

        <p className="verdict-text">
          Advertised as <strong>{interestRate}% p.a.</strong>, but actual cost is <strong className="highlight-rate">{trueAPR}% True APR</strong>.
          You pay <strong className="highlight-diff">₹{costDifference.toLocaleString('en-IN')} extra</strong> due to upfront fee deductions.
        </p>

        {isPredatory && (
          <div className="verdict-warning-pill">
            <ShieldAlert size={16} /> Avoid taking this loan! Unregistered penalty rates compound rapidly.
          </div>
        )}
      </div>

      {/* Segmented Sub-Tab Switcher */}
      <div className="segmented-control">
        <button 
          className={`segment-btn ${activeTab === 'summary' ? 'active' : ''}`}
          onClick={() => setActiveTab('summary')}
        >
          Breakdown
        </button>
        <button 
          className={`segment-btn ${activeTab === 'spiral' ? 'active' : ''}`}
          onClick={() => setActiveTab('spiral')}
        >
          Debt Spiral
        </button>
        <button 
          className={`segment-btn ${activeTab === 'compliance' ? 'active' : ''}`}
          onClick={() => setActiveTab('compliance')}
        >
          RBI Compliance
        </button>
      </div>

      {/* 1. Summary Breakdown Tab */}
      {activeTab === 'summary' && (
        <div className="mobile-card tab-content-fade">
          <h3 className="card-title">Detailed Financial Breakdown</h3>
          <div className="detail-rows-container">
            <div className="detail-row">
              <span className="label">Lender App Name:</span>
              <strong className="val">{lender || 'Scanned Loan'}</strong>
            </div>

            <div className="detail-row">
              <span className="label">Sanctioned Principal:</span>
              <strong className="val">₹{principal?.toLocaleString('en-IN')}</strong>
            </div>

            <div className="detail-row">
              <span className="label">Advertised Interest Rate:</span>
              <strong className="val">{interestRate}% p.a.</strong>
            </div>

            <div className="detail-row">
              <span className="label">Tenure Duration:</span>
              <strong className="val">{tenure} Months</strong>
            </div>

            <div className="detail-row warning-row">
              <span className="label">Processing Fee Deducted:</span>
              <strong className="val text-warning">₹{processingFee?.toLocaleString('en-IN')}</strong>
            </div>

            <div className="detail-row warning-row">
              <span className="label">Mandatory Insurance:</span>
              <strong className="val text-warning">₹{hiddenInsurance?.toLocaleString('en-IN')}</strong>
            </div>

            <div className="detail-row total-row">
              <span className="label">True APR (Real Cost):</span>
              <strong className={`val-large ${isPredatory ? 'text-danger' : 'text-success'}`}>{trueAPR}%</strong>
            </div>
          </div>
        </div>
      )}

      {/* 2. Debt Spiral Simulator Tab */}
      {activeTab === 'spiral' && (
        <div className="mobile-card tab-content-fade">
          <h3 className="card-title">Penalty Debt Spiral Simulator</h3>
          <p className="card-subtitle">
            What happens if you miss <strong>1 EMI</strong> and trigger their 5% monthly compounding penalty:
          </p>

          <div className="debt-spiral-chart-mobile">
            {spiralData.map((val, index) => {
              const heightPercent = Math.max(15, (val / maxDebt) * 100);
              return (
                <div key={index} className="spiral-bar-col">
                  <span className="bar-value">₹{val >= 1000 ? (val/1000).toFixed(1) + 'k' : val}</span>
                  <div 
                    className={`bar-fill ${index === 0 ? 'base-bar' : 'penalty-bar'}`}
                    style={{ height: `${heightPercent}%` }}
                  ></div>
                  <span className="bar-label">M{index}</span>
                </div>
              );
            })}
          </div>

          <div className="spiral-info-box">
            <Info size={16} color="var(--warning)" style={{ flexShrink: 0 }} />
            <span>By Month 6 of delay, total debt grows from ₹{principal.toLocaleString('en-IN')} to <strong>₹{maxDebt.toLocaleString('en-IN')}</strong> (+{(((maxDebt - principal)/principal)*100).toFixed(0)}%).</span>
          </div>
        </div>
      )}

      {/* 3. RBI Compliance Tab */}
      {activeTab === 'compliance' && (
        <div className="mobile-card tab-content-fade">
          <h3 className="card-title">RBI Legal Compliance Check</h3>
          <div className="compliance-status-row">
            <span>Lender NBFC License:</span>
            {isRegistered ? (
              <span className="badge success">Registered RBI Partner</span>
            ) : (
              <span className="badge danger">Unregistered App</span>
            )}
          </div>

          <div className="flags-section">
            <h4 style={{ margin: '1rem 0 0.5rem 0' }}>Identified Violation Flags:</h4>
            {legalFlags && legalFlags.length > 0 ? (
              <ul className="legal-flags-list">
                {legalFlags.map((flag, i) => (
                  <li key={i} className="flag-item">
                    <AlertTriangle size={16} color="var(--danger)" />
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="clean-flags">
                <CheckCircle size={18} color="var(--success)" /> No illegal terms identified.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Action Footer */}
      <div className="results-bottom-actions">
        <button className="btn-mobile-secondary" onClick={onReset}>
          <RefreshCw size={18} /> Analyze Another
        </button>
      </div>
    </div>
  );
};

export default ResultsDashboard;
