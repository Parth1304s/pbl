import React, { useState, useEffect } from 'react';
import WebLayout from './components/WebLayout';
import TopNavigation from './components/TopNavigation';
import CameraScanner from './components/CameraScanner';
import EmiCalculator from './components/EmiCalculator';
import RbiCheckerTab from './components/RbiCheckerTab';
import SafeLoansTab from './components/SafeLoansTab';
import HistoryTab from './components/HistoryTab';
import ProcessingOverlay from './components/ProcessingOverlay';
import ResultsDashboard from './components/ResultsDashboard';
import Login from './components/Login';

// Sample loan offers for 1-tap scanning test
const SAMPLE_LOAN_PRESETS = [
  {
    lender: "QuickLoan App (Illegal)",
    principal: 50000,
    interestRate: 24,
    tenure: 12,
    processingFee: 2000,
    hiddenInsurance: 1500,
    isRegistered: false,
    riskLevel: "danger",
    riskLabel: "48.2% APR (Trap)",
    legalFlags: ["Usurious Interest Rate (>30%)", "Mandatory Upfront Insurance", "Unregistered NBFC Entity", "Accesses Phone Contacts"],
    text: "QuickLoan Instant: ₹50,000 sanctioned for 12 months at 24% flat p.a. Upfront deductions: ₹2,000 processing fee + ₹1,500 mandatory insurance policy. Late fee: 5% per month."
  },
  {
    lender: "KreditBee Instant",
    principal: 30000,
    interestRate: 18,
    tenure: 6,
    processingFee: 500,
    hiddenInsurance: 0,
    isRegistered: true,
    riskLevel: "safe",
    riskLabel: "21.5% APR (Regulated)",
    legalFlags: [],
    text: "KreditBee Personal Loan: ₹30,000 for 6 months at 18% p.a. Processing fee ₹500. RBI Registered NBFC."
  },
  {
    lender: "CashMama Now (Banned)",
    principal: 20000,
    interestRate: 36,
    tenure: 3,
    processingFee: 3000,
    hiddenInsurance: 1000,
    isRegistered: false,
    riskLevel: "danger",
    riskLabel: "72.4% APR (Banned)",
    legalFlags: ["Banned by RBI Sachet", "Daily Compounding Penalty", "No Key Fact Statement"],
    text: "CashMama Fast Cash: ₹20,000 for 3 months at 36% p.a. Processing fee ₹3,000 + Insurance ₹1,000."
  }
];

function App() {
  const [activeTab, setActiveTab] = useState('scan'); // 'scan', 'calculator', 'rbi', 'safe', 'history'
  const [appState, setAppState] = useState('input'); // 'input', 'processing', 'results'
  const [extractedData, setExtractedData] = useState(null);
  const [historyList, setHistoryList] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
    }
  }, [isDarkMode]);

  // Handle process function
  const handleProcess = async (text, file, presetObj = null) => {
    setAppState('processing');
    
    // Simulate processing time for OCR scanning & RBI query
    await new Promise(resolve => setTimeout(resolve, 2600));

    let mockData = null;

    if (presetObj) {
      const netDisbursed = presetObj.principal - presetObj.processingFee - presetObj.hiddenInsurance;
      const totalRepayment = presetObj.principal + (presetObj.principal * (presetObj.interestRate / 100) * (presetObj.tenure / 12));
      const estimatedAPR = (((totalRepayment - netDisbursed) / netDisbursed) * (12 / presetObj.tenure) * 100).toFixed(1);

      mockData = {
        ...presetObj,
        trueAPR: estimatedAPR,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        id: Date.now()
      };
    } else {
      // Parse loan details from text or use defaults
      let principal = 50000;
      let interestRate = 24;
      let tenure = 12;
      let processingFee = 2000;
      let hiddenInsurance = 1500;

      if (text && typeof text === 'string' && text.trim().length > 0) {
        // Use a heuristic to extract numbers based on common keywords
        const cleanText = text.replace(/,/g, '').toLowerCase();
        
        // Rate
        const rateMatch = cleanText.match(/([\d.]+)\s*%/);
        if (rateMatch) interestRate = parseFloat(rateMatch[1]);
        
        // Tenure
        const tenureMatch = cleanText.match(/(\d+)\s*(month|yr|year)/);
        if (tenureMatch) {
          tenure = parseInt(tenureMatch[1], 10);
          if (tenureMatch[2].startsWith('y')) tenure *= 12;
        }

        // Processing Fee
        const feeMatch = cleanText.match(/processing[^\d]*(\d+)/);
        if (feeMatch) {
          processingFee = parseInt(feeMatch[1], 10);
        } else {
          processingFee = 0;
        }
        
        // Insurance
        const insMatch = cleanText.match(/insurance[^\d]*(\d+)/);
        if (insMatch) {
          hiddenInsurance = parseInt(insMatch[1], 10);
        } else {
          hiddenInsurance = 0;
        }
        
        // Principal - usually the largest number in the text
        const allNums = cleanText.match(/\d+/g);
        if (allNums) {
           const numbers = allNums.map(n => parseInt(n, 10));
           const maxNum = Math.max(...numbers);
           if (maxNum >= 1000) {
             principal = maxNum;
           }
        }
      }

      const netDisbursed = principal - processingFee - hiddenInsurance;
      const totalRepayment = principal + (principal * (interestRate / 100) * (tenure / 12));
      const estimatedAPR = (((totalRepayment - netDisbursed) / netDisbursed) * (12 / (tenure || 1)) * 100).toFixed(1);

      mockData = {
        lender: text ? (text.slice(0, 20) + "...") : "Scanned Offer Doc",
        principal,
        interestRate,
        tenure,
        processingFee,
        hiddenInsurance,
        trueAPR: estimatedAPR,
        isRegistered: false,
        legalFlags: ["Usurious Interest Rate (>30%)", "Hidden Mandatory Insurance", "Unregistered Digital Lender"],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        id: Date.now()
      };
    }

    setExtractedData(mockData);
    setAppState('results');

    // Automatically add to history log
    setHistoryList(prev => [mockData, ...prev.filter(x => x.id !== mockData.id)]);
  };

  const handleReset = () => {
    setAppState('input');
    setExtractedData(null);
  };

  const handleSelectHistoryItem = (item) => {
    setExtractedData(item);
    setAppState('results');
    setActiveTab('scan');
  };

  const handleClearHistory = () => {
    setHistoryList([]);
  };

  return (
    <div className="app-root">
      <TopNavigation 
        isAuthenticated={isAuthenticated}
        onLogout={() => setIsAuthenticated(false)}
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
        }} 
        historyCount={historyList.length}
        isDarkMode={isDarkMode} 
        setIsDarkMode={setIsDarkMode}
      />
      
      {!isAuthenticated ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '2rem' }}>
          <Login onLogin={() => setIsAuthenticated(true)} />
        </div>
      ) : (
        <WebLayout>
          {/* Main Tab Views */}
        <main className="web-content-area">
          {activeTab === 'scan' && (
            <>
              {appState === 'input' && (
                <CameraScanner 
                  onProcess={handleProcess} 
                  samplePresets={SAMPLE_LOAN_PRESETS} 
                />
              )}
              {appState === 'processing' && <ProcessingOverlay />}
              {appState === 'results' && (
                <ResultsDashboard 
                  data={extractedData} 
                  onReset={handleReset} 
                />
              )}
            </>
          )}

          {activeTab === 'calculator' && <EmiCalculator />}
          {activeTab === 'rbi' && <RbiCheckerTab />}
          {activeTab === 'safe' && <SafeLoansTab />}
          {activeTab === 'history' && (
            <HistoryTab 
              historyList={historyList} 
              onSelectHistory={handleSelectHistoryItem}
              onClearAll={handleClearHistory}
            />
          )}
        </main>
      </WebLayout>
      )}
    </div>
  );
}

export default App;
