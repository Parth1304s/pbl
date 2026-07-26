import React, { useState } from 'react';
import { Landmark, ArrowRight, ShieldCheck, Percent, ExternalLink, UserCheck } from 'lucide-react';

const SafeLoansTab = () => {
  const [applicantType, setApplicantType] = useState('all'); // 'all', 'individual', 'business', 'vendor'

  const schemes = [
    {
      title: 'PMJDY Overdraft Scheme',
      category: 'individual',
      maxAmount: '₹10,000',
      rate: '~12% p.a.',
      benefit: 'No collateral, available to Jan Dhan account holders with 6+ months active balance.',
      badge: 'Zero Upfront Fee',
      link: 'https://pmjdy.gov.in/'
    },
    {
      title: 'MUDRA Shishu Loan',
      category: 'business',
      maxAmount: '₹50,000',
      rate: '~9% - 12% p.a.',
      benefit: 'Micro loans for small shops, artisans, and self-employed micro businesses.',
      badge: 'Govt Subsidized',
      link: 'https://www.mudra.org.in/'
    },
    {
      title: 'PM SVANidhi Scheme',
      category: 'vendor',
      maxAmount: '₹10,000 to ₹50,000',
      rate: '7% Interest Subsidy',
      benefit: 'Special micro-credit facility for street vendors & small hawkers with cashback incentives.',
      badge: '7% Interest Cashback',
      link: 'https://pmsvanidhi.mohua.gov.in/'
    },
    {
      title: 'Stand-Up India Scheme',
      category: 'business',
      maxAmount: '₹10 Lakh - ₹1 Crore',
      rate: 'Base Rate + 3%',
      benefit: 'Bank loans for SC/ST and Women entrepreneurs setting up greenfield enterprises.',
      badge: 'Women & SC/ST Support',
      link: 'https://www.standupmitra.in/'
    }
  ];

  const filteredSchemes = schemes.filter(s => applicantType === 'all' || s.category === applicantType);

  return (
    <div className="safe-loans-tab fade-in">
      <div className="tab-header">
        <h2>
          <Landmark size={26} color="var(--primary-accent)" /> Safe & Subsidized Alternatives
        </h2>
        <p className="tab-subtitle">Government backed, low-rate legal loan options to avoid predatory debt traps</p>
      </div>

      {/* Filter Tabs */}
      <div className="applicant-filter-bar">
        <button 
          className={`filter-pill ${applicantType === 'all' ? 'active' : ''}`}
          onClick={() => setApplicantType('all')}
        >
          All Schemes
        </button>
        <button 
          className={`filter-pill ${applicantType === 'individual' ? 'active' : ''}`}
          onClick={() => setApplicantType('individual')}
        >
          Personal / JanDhan
        </button>
        <button 
          className={`filter-pill ${applicantType === 'business' ? 'active' : ''}`}
          onClick={() => setApplicantType('business')}
        >
          Small Business
        </button>
        <button 
          className={`filter-pill ${applicantType === 'vendor' ? 'active' : ''}`}
          onClick={() => setApplicantType('vendor')}
        >
          Vendors
        </button>
      </div>

      {/* Schemes Grid */}
      <div className="schemes-list">
        {filteredSchemes.map((scheme, i) => (
          <div key={i} className="mobile-card scheme-card">
            <div className="scheme-card-header">
              <div>
                <span className="scheme-badge">{scheme.badge}</span>
                <h3 className="scheme-title">{scheme.title}</h3>
              </div>
              <div className="scheme-rate-tag">
                <Percent size={14} /> {scheme.rate}
              </div>
            </div>

            <p className="scheme-benefit">{scheme.benefit}</p>

            <div className="scheme-footer">
              <div className="scheme-limit">
                <span>Max Limit:</span> <strong>{scheme.maxAmount}</strong>
              </div>
              <a 
                href={scheme.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-apply-scheme"
              >
                Apply Official <ExternalLink size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Direct Comparison Banner */}
      <div className="mobile-card highlight-compare-banner">
        <div className="banner-icon">
          <ShieldCheck size={28} color="var(--success)" />
        </div>
        <div className="banner-text">
          <h4>Why Choose Govt Schemes?</h4>
          <p>Instant payday apps charge <strong>36% to 60% APR</strong> with daily penalty escalation. Govt schemes cap interest at <strong>9% to 12% p.a.</strong> with zero harassment.</p>
        </div>
      </div>
    </div>
  );
};

export default SafeLoansTab;
