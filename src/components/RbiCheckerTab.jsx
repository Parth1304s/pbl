import React, { useState } from 'react';
import { ShieldCheck, Search, AlertOctagon, CheckCircle2, XCircle, Info, ExternalLink, ShieldAlert } from 'lucide-react';

const RbiCheckerTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Database of popular loan apps (Mocked RBI Registry)
  const appDatabase = [
    { name: 'KreditBee', status: 'Registered', nbfc: 'Krazybee Services Pvt Ltd', risk: 'safe', details: 'Licensed RBI Regulated NBFC' },
    { name: 'MoneyView', status: 'Registered', nbfc: 'Whizdm Finance Pvt Ltd', risk: 'safe', details: 'Licensed RBI Regulated Partner' },
    { name: 'FairMoney', status: 'Registered', nbfc: 'FairMoney India NBFC', risk: 'safe', details: 'Registered Digital Lender' },
    { name: 'QuickRupee Instant', status: 'UNREGISTERED', nbfc: 'Unknown Offshore Entity', risk: 'danger', details: 'Flagged by Cyber Cell for illegal harassement & 50% APR' },
    { name: 'CashMama Now', status: 'BANNED', nbfc: 'No NBFC License', risk: 'danger', details: 'Blacklisted app stealing contacts and charging daily penalty' },
    { name: 'FastCash India', status: 'UNREGISTERED', nbfc: 'Shell Company', risk: 'danger', details: 'Unregistered Sachet Portal violator' },
    { name: 'Navi Personal Loan', status: 'Registered', nbfc: 'Navi Finserv Limited', risk: 'safe', details: 'Direct RBI Registered License' },
    { name: 'Pocketly', status: 'Registered', nbfc: 'NDX P2P Pvt Ltd', risk: 'safe', details: 'Student & Salaried RBI Registered Partner' }
  ];

  const filteredApps = appDatabase.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.nbfc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="rbi-checker-tab fade-in">
      <div className="tab-header">
        <h2>
          <ShieldCheck size={26} color="var(--success)" /> RBI NBFC Registry Checker
        </h2>
        <p className="tab-subtitle">Verify if your loan app is RBI registered or an illegal predatory app</p>
      </div>

      {/* Search Input */}
      <div className="mobile-card search-card">
        <div className="search-input-wrapper">
          <Search size={20} color="var(--text-muted)" className="search-icon" />
          <input 
            type="text" 
            placeholder="Search app name e.g. KreditBee, FastCash, MoneyView..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mobile-search-input"
          />
        </div>
      </div>

      {/* App Registry Status Results */}
      <div className="app-list-container">
        {filteredApps.length > 0 ? (
          filteredApps.map((app, index) => (
            <div key={index} className={`app-status-card ${app.risk}`}>
              <div className="app-card-header">
                <div>
                  <h4 className="app-name">{app.name}</h4>
                  <span className="nbfc-name">{app.nbfc}</span>
                </div>
                <span className={`status-pill ${app.risk}`}>
                  {app.risk === 'safe' ? (
                    <><CheckCircle2 size={14} /> Registered</>
                  ) : (
                    <><XCircle size={14} /> {app.status}</>
                  )}
                </span>
              </div>
              <p className="app-card-details">{app.details}</p>
            </div>
          ))
        ) : (
          <div className="mobile-card empty-search">
            <AlertOctagon size={36} color="var(--warning)" style={{ marginBottom: '0.5rem' }} />
            <h4>App Not Found in RBI Approved List</h4>
            <p>If an app is not listed on RBI Sachet or Digital Lender directory, do NOT share your contacts or KYC documents.</p>
          </div>
        )}
      </div>

      {/* RBI Digital Lending Guidelines 2026 Checklist */}
      <div className="mobile-card rbi-guidelines-card">
        <h3 className="card-title">
          <ShieldAlert size={20} color="var(--warning)" /> RBI Red Flags & Digital Lending Norms
        </h3>
        <ul className="guideline-list">
          <li>
            <CheckCircle2 size={16} color="var(--success)" className="check-ic" />
            <strong>No Upfront Insurance Deduction:</strong> Mandatory upfront deductions from loan principal are strictly prohibited by RBI.
          </li>
          <li>
            <CheckCircle2 size={16} color="var(--success)" className="check-ic" />
            <strong>KFS (Key Fact Statement):</strong> Every lender must issue an explicit KFS showing True APR before loan disbursement.
          </li>
          <li>
            <CheckCircle2 size={16} color="var(--success)" className="check-ic" />
            <strong>Contact & Gallery Privacy:</strong> Apps are forbidden from accessing your phone contacts or photo gallery.
          </li>
          <li>
            <CheckCircle2 size={16} color="var(--success)" className="check-ic" />
            <strong>Cooling-off Period:</strong> Minimum 3-day penalty-free exit window for short term loans.
          </li>
        </ul>
        
        <a 
          href="https://sachet.rbi.org.in/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="rbi-official-link"
        >
          Verify on Official RBI Sachet Portal <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
};

export default RbiCheckerTab;
