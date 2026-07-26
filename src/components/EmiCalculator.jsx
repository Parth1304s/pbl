import React, { useState } from 'react';
import { Calculator, AlertTriangle, CheckCircle, Info, RefreshCw } from 'lucide-react';

const EmiCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [tenureMonths, setTenureMonths] = useState('');
  const [processingFee, setProcessingFee] = useState('');
  const [hiddenInsurance, setHiddenInsurance] = useState('');

  // EMI Calculation: Flat interest vs Reducing balance simulation
  const p = Number(principal) || 0;
  const r = Number(interestRate) || 0;
  const t = Number(tenureMonths) || 12; // Prevent divide by zero
  const pf = Number(processingFee) || 0;
  const hi = Number(hiddenInsurance) || 0;

  const totalAdvertisedInterest = p * (r / 100) * (t / 12);
  const totalRepayment = p + totalAdvertisedInterest;
  const emi = Math.round(totalRepayment / t);

  // Net Disbursed after deductions
  const netDisbursed = Math.max(1, p - pf - hi);
  
  // True APR calculation
  const totalExtraCost = totalRepayment - netDisbursed;
  const trueAPR = (((totalExtraCost / netDisbursed) / (t / 12)) * 100).toFixed(1);
  const isPredatory = p > 0 && (trueAPR > 30 || pf + hi > p * 0.05);

  return (
    <div className="emi-calculator-tab fade-in">
      <div className="tab-header">
        <h2>
          <Calculator size={24} color="var(--primary-accent)" /> Loan APR & EMI Simulator
        </h2>
        <p className="tab-subtitle">Adjust sliders to see how hidden fees skyrocket your True APR</p>
      </div>

      {/* Main Interactive Card */}
      <div className="mobile-card">
        {/* Sliders Form */}
        <div className="slider-group">
          <div className="slider-header" style={{ alignItems: 'center' }}>
            <label>Loan Amount (Principal)</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <span style={{ fontWeight: '700', color: 'var(--text-main)' }}>₹</span>
              <input 
                type="number" 
                value={principal} 
                onChange={(e) => setPrincipal(e.target.value === '' ? '' : Number(e.target.value))}
                style={{
                  background: 'rgba(0,0,0,0.2)', border: '1px solid var(--surface-border)', 
                  color: 'var(--text-main)', borderRadius: '6px', padding: '0.35rem 0.5rem', 
                  width: '100px', fontWeight: '700', textAlign: 'right', fontFamily: 'inherit'
                }}
              />
            </div>
          </div>
        </div>

        <div className="slider-group">
          <div className="slider-header" style={{ alignItems: 'center' }}>
            <label>Advertised Interest Rate</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <input 
                type="number" 
                value={interestRate} 
                onChange={(e) => setInterestRate(e.target.value === '' ? '' : Number(e.target.value))}
                style={{
                  background: 'rgba(0,0,0,0.2)', border: '1px solid var(--surface-border)', 
                  color: 'var(--text-main)', borderRadius: '6px', padding: '0.35rem 0.5rem', 
                  width: '70px', fontWeight: '700', textAlign: 'right', fontFamily: 'inherit'
                }}
              />
              <span style={{ fontWeight: '700', color: 'var(--text-main)' }}>% p.a.</span>
            </div>
          </div>
        </div>

        <div className="slider-group">
          <div className="slider-header" style={{ alignItems: 'center' }}>
            <label>Tenure (Months)</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <input 
                type="number" 
                value={tenureMonths} 
                onChange={(e) => setTenureMonths(e.target.value === '' ? '' : Number(e.target.value))}
                style={{
                  background: 'rgba(0,0,0,0.2)', border: '1px solid var(--surface-border)', 
                  color: 'var(--text-main)', borderRadius: '6px', padding: '0.35rem 0.5rem', 
                  width: '70px', fontWeight: '700', textAlign: 'right', fontFamily: 'inherit'
                }}
              />
              <span style={{ fontWeight: '700', color: 'var(--text-main)' }}>Months</span>
            </div>
          </div>
        </div>

        <div className="slider-group">
          <div className="slider-header" style={{ alignItems: 'center' }}>
            <label>Processing Fee</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <span style={{ fontWeight: '700', color: 'var(--warning)' }}>₹</span>
              <input 
                type="number" 
                value={processingFee} 
                onChange={(e) => setProcessingFee(e.target.value === '' ? '' : Number(e.target.value))}
                style={{
                  background: 'rgba(0,0,0,0.2)', border: '1px solid var(--surface-border)', 
                  color: 'var(--warning)', borderRadius: '6px', padding: '0.35rem 0.5rem', 
                  width: '100px', fontWeight: '700', textAlign: 'right', fontFamily: 'inherit'
                }}
              />
            </div>
          </div>
        </div>

        <div className="slider-group">
          <div className="slider-header" style={{ alignItems: 'center' }}>
            <label>Hidden Insurance / Mandates</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <span style={{ fontWeight: '700', color: 'var(--warning)' }}>₹</span>
              <input 
                type="number" 
                value={hiddenInsurance} 
                onChange={(e) => setHiddenInsurance(e.target.value === '' ? '' : Number(e.target.value))}
                style={{
                  background: 'rgba(0,0,0,0.2)', border: '1px solid var(--surface-border)', 
                  color: 'var(--warning)', borderRadius: '6px', padding: '0.35rem 0.5rem', 
                  width: '100px', fontWeight: '700', textAlign: 'right', fontFamily: 'inherit'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Calculation Results Comparison */}
      <div className={`mobile-card result-comparison-card ${isPredatory ? 'predatory' : 'safe'}`}>
        <div className="comparison-verdict">
          <div className="verdict-icon">
            {isPredatory ? <AlertTriangle size={32} color="var(--danger)" /> : <CheckCircle size={32} color="var(--success)" />}
          </div>
          <div>
            <h3 style={{ color: isPredatory ? 'var(--danger)' : 'var(--success)' }}>
              True APR: {trueAPR}%
            </h3>
            <p className="verdict-desc">
              Advertised: {interestRate}% | True Cost increase: +{(trueAPR - interestRate).toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="calc-metrics-grid">
          <div className="metric-box">
            <span className="metric-label">Actual Cash Received</span>
            <span className="metric-val text-success">₹{p === 0 ? 0 : netDisbursed.toLocaleString('en-IN')}</span>
          </div>

          <div className="metric-box">
            <span className="metric-label">Monthly EMI</span>
            <span className="metric-val">₹{emi.toLocaleString('en-IN')}</span>
          </div>

          <div className="metric-box">
            <span className="metric-label">Total Upfront Fees</span>
            <span className="metric-val text-warning">₹{(pf + hi).toLocaleString('en-IN')}</span>
          </div>

          <div className="metric-box">
            <span className="metric-label">Total Out-of-Pocket</span>
            <span className="metric-val text-danger">₹{totalRepayment.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmiCalculator;
