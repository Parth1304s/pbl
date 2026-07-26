import React, { useState } from 'react';
import { History, Share2, Trash2, AlertTriangle, CheckCircle, ArrowRightLeft, Sparkles, Copy, Check } from 'lucide-react';

const HistoryTab = ({ historyList = [], onSelectHistory, onDeleteHistory, onClearAll }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState([]);

  const toggleCompareSelect = (item) => {
    if (selectedForCompare.find(x => x.id === item.id)) {
      setSelectedForCompare(selectedForCompare.filter(x => x.id !== item.id));
    } else {
      if (selectedForCompare.length < 2) {
        setSelectedForCompare([...selectedForCompare, item]);
      }
    }
  };

  const handleCopyShareCard = (item, index) => {
    const isPredatory = item.trueAPR > 30 || !item.isRegistered;
    const text = `🚨 *LOANGUARD AUDIT REPORT* 🚨\n\n` +
      `📱 *App Name:* ${item.lender}\n` +
      `💰 *Principal:* ₹${item.principal?.toLocaleString('en-IN')}\n` +
      `📢 *Advertised Rate:* ${item.interestRate}% p.a.\n` +
      `⚠️ *REAL TRUE APR (XIRR):* ${item.trueAPR}%\n` +
      `🏛️ *RBI Status:* ${item.isRegistered ? 'Registered' : 'UNREGISTERED / ILLEGAL'}\n\n` +
      `VERDICT: ${isPredatory ? '⛔ DANGEROUS PREDATORY LOAN TRAP!' : '✅ SAFE REGULATED OFFER'}\n` +
      `Analyzed via LoanGuard Mobile App`;

    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="history-tab fade-in">
      <div className="tab-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2>
              <History size={26} color="var(--primary-accent)" /> Audit History & Compare
            </h2>
            <p className="tab-subtitle">View past loan scans and compare offers side-by-side</p>
          </div>
          {historyList.length > 0 && (
            <button className="clear-btn" onClick={onClearAll}>
              <Trash2 size={16} /> Clear All
            </button>
          )}
        </div>
      </div>

      {/* Compare Mode Toggle */}
      {historyList.length >= 2 && (
        <div className="mobile-card compare-toggle-bar">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>
              <ArrowRightLeft size={18} color="var(--primary-accent)" style={{ display: 'inline', marginRight: '6px' }} />
              Compare Mode ({selectedForCompare.length}/2 selected)
            </span>
            <button 
              className={`mode-pill ${compareMode ? 'active' : ''}`}
              onClick={() => {
                setCompareMode(!compareMode);
                setSelectedForCompare([]);
              }}
            >
              {compareMode ? 'Exit Compare' : 'Select 2 Offers'}
            </button>
          </div>
        </div>
      )}

      {/* Side by Side Offer Comparison Drawer */}
      {compareMode && selectedForCompare.length === 2 && (
        <div className="mobile-card side-compare-card fade-in">
          <h3 className="card-title">
            <Sparkles size={18} color="var(--primary-accent)" /> Side-by-Side Offer Comparison
          </h3>
          <div className="compare-grid">
            <div className="compare-col">
              <h4 className="compare-lender">{selectedForCompare[0].lender}</h4>
              <div className="compare-row">
                <span>Adv Rate:</span> <strong>{selectedForCompare[0].interestRate}%</strong>
              </div>
              <div className="compare-row highlight">
                <span>True APR:</span> <strong className={selectedForCompare[0].trueAPR > 30 ? 'text-danger' : 'text-success'}>{selectedForCompare[0].trueAPR}%</strong>
              </div>
              <div className="compare-row">
                <span>Total Fees:</span> <span>₹{((selectedForCompare[0].processingFee || 0) + (selectedForCompare[0].hiddenInsurance || 0)).toLocaleString('en-IN')}</span>
              </div>
              <div className="compare-row">
                <span>RBI NBFC:</span> <span>{selectedForCompare[0].isRegistered ? '✅ Yes' : '❌ No'}</span>
              </div>
            </div>

            <div className="compare-divider">vs</div>

            <div className="compare-col">
              <h4 className="compare-lender">{selectedForCompare[1].lender}</h4>
              <div className="compare-row">
                <span>Adv Rate:</span> <strong>{selectedForCompare[1].interestRate}%</strong>
              </div>
              <div className="compare-row highlight">
                <span>True APR:</span> <strong className={selectedForCompare[1].trueAPR > 30 ? 'text-danger' : 'text-success'}>{selectedForCompare[1].trueAPR}%</strong>
              </div>
              <div className="compare-row">
                <span>Total Fees:</span> <span>₹{((selectedForCompare[1].processingFee || 0) + (selectedForCompare[1].hiddenInsurance || 0)).toLocaleString('en-IN')}</span>
              </div>
              <div className="compare-row">
                <span>RBI NBFC:</span> <span>{selectedForCompare[1].isRegistered ? '✅ Yes' : '❌ No'}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* History Items List */}
      <div className="history-list">
        {historyList.length > 0 ? (
          historyList.map((item, index) => {
            const isPredatory = item.trueAPR > 30 || !item.isRegistered;
            const isSelected = selectedForCompare.some(x => x.id === item.id);

            return (
              <div 
                key={item.id || index} 
                className={`mobile-card history-item-card ${isPredatory ? 'predatory-border' : 'safe-border'} ${isSelected ? 'compare-selected' : ''}`}
              >
                <div className="history-item-top">
                  <div className="history-lender-info">
                    <span className="history-time">{item.timestamp || 'Just now'}</span>
                    <h4 className="history-lender-title">{item.lender || 'Loan Offer'}</h4>
                  </div>
                  <span className={`risk-badge ${isPredatory ? 'danger' : 'success'}`}>
                    {isPredatory ? <AlertTriangle size={12} /> : <CheckCircle size={12} />}
                    {isPredatory ? 'High Risk' : 'Regulated'}
                  </span>
                </div>

                <div className="history-metrics-row">
                  <div className="h-metric">
                    <span>Principal</span>
                    <strong>₹{item.principal?.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="h-metric">
                    <span>Advertised</span>
                    <strong>{item.interestRate}%</strong>
                  </div>
                  <div className="h-metric">
                    <span>True APR</span>
                    <strong className={isPredatory ? 'text-danger' : 'text-success'}>{item.trueAPR}%</strong>
                  </div>
                </div>

                <div className="history-actions-row">
                  {compareMode ? (
                    <button 
                      className={`btn-compare-select ${isSelected ? 'active' : ''}`}
                      onClick={() => toggleCompareSelect(item)}
                    >
                      {isSelected ? '✓ Selected for Compare' : '+ Add to Compare'}
                    </button>
                  ) : (
                    <>
                      <button className="btn-view-scan" onClick={() => onSelectHistory(item)}>
                        View Full Details
                      </button>
                      <button 
                        className="btn-share-whatsapp"
                        onClick={() => handleCopyShareCard(item, index)}
                        title="Copy share card for WhatsApp"
                      >
                        {copiedIndex === index ? <Check size={16} color="var(--success)" /> : <Share2 size={16} />}
                        {copiedIndex === index ? 'Copied Report!' : 'Share'}
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="mobile-card empty-history">
            <History size={48} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
            <h3>No Loan Scans Yet</h3>
            <p>Go to the Scan tab to analyze your first loan screenshot or paste loan terms!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryTab;
