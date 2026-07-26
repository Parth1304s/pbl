import React, { useState, useRef } from 'react';
import { Camera, Image as ImageIcon, Zap, ZapOff, UploadCloud, FileText, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';

const CameraScanner = ({ onProcess, samplePresets = [] }) => {
  const [activeInputMode, setActiveInputMode] = useState('options'); // 'options', 'camera', 'upload', 'text'
  const [flashOn, setFlashOn] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [isCapturing, setIsCapturing] = useState(false);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleCapture = () => {
    // Trigger actual device camera
    cameraInputRef.current?.click();
  };

  const handleCameraUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setIsCapturing(true);
      setTimeout(() => {
        setIsCapturing(false);
        onProcess(null, e.target.files[0]);
      }, 800);
    }
  };

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      onProcess(null, e.target.files[0]);
    }
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (textInput.trim()) {
      onProcess(textInput, null);
    }
  };

  return (
    <div className="camera-scanner-tab fade-in">
      {/* Top Scanner Header Mode Selector */}
      <div className="scanner-mode-selector">
        <button 
          className={`mode-pill ${activeInputMode === 'camera' ? 'active' : ''}`}
          onClick={() => setActiveInputMode('camera')}
        >
          <Camera size={16} /> Live Scanner
        </button>
        <button 
          className={`mode-pill ${activeInputMode === 'upload' ? 'active' : ''}`}
          onClick={() => setActiveInputMode('upload')}
        >
          <UploadCloud size={16} /> Gallery / File
        </button>
        <button 
          className={`mode-pill ${activeInputMode === 'text' ? 'active' : ''}`}
          onClick={() => setActiveInputMode('text')}
        >
          <FileText size={16} /> Text Input
        </button>
      </div>

      {/* 0. Initial Options Mode */}
      {activeInputMode === 'options' && (
        <div className="mobile-card options-container" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
          <Sparkles size={48} color="var(--primary-accent)" style={{ marginBottom: '1.5rem' }} />
          <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Add Loan Document</h2>
          <p className="card-subtitle" style={{ marginBottom: '2rem' }}>
            Choose how you want to provide your loan agreement details for scanning and analysis.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
            <button 
              className="btn-mobile-primary" 
              style={{ width: '100%', maxWidth: '300px', padding: '1.25rem', fontSize: '1.1rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}
              onClick={() => setActiveInputMode('upload')}
            >
              <UploadCloud size={24} /> Upload Document
            </button>
            <button 
              className="btn-mobile-secondary" 
              style={{ width: '100%', maxWidth: '300px', padding: '1.25rem', fontSize: '1.1rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}
              onClick={() => setActiveInputMode('camera')}
            >
              <Camera size={24} /> Scan from Camera
            </button>
          </div>
        </div>
      )}

      {/* 1. Camera Viewfinder Mode */}
      {activeInputMode === 'camera' && (
        <div className="viewfinder-container">
          <div className={`viewfinder-screen ${flashOn ? 'flash-active' : ''}`}>
            {/* Viewfinder Reticle & Target Lines */}
            <div className="scanner-reticle">
              <div className="corner-tl"></div>
              <div className="corner-tr"></div>
              <div className="corner-bl"></div>
              <div className="corner-br"></div>
              <div className="scan-line-anim"></div>
            </div>

            {/* Simulated Document Preview inside Scanner */}
            <div className="simulated-doc-preview">
              <div className="doc-header-line">LOAN AGREEMENT SUMMARY</div>
              <div className="doc-content-mock">
                <span>Sanctioned: ₹50,000</span>
                <span>Rate: 24% Flat p.a.</span>
                <span>Processing: ₹2,000</span>
                <span>Insurance: ₹1,500</span>
                <span className="red-line">Late Penalty: 5%/mo</span>
              </div>
            </div>

            {/* Flash & Controls Top Overlay */}
            <div className="viewfinder-top-bar">
              <button 
                className={`flash-btn ${flashOn ? 'on' : ''}`}
                onClick={() => setFlashOn(!flashOn)}
              >
                {flashOn ? <Zap size={18} color="#f59e0b" /> : <ZapOff size={18} />}
              </button>
              <span className="ocr-status-tag">
                <Sparkles size={14} className="sparkle-anim" /> AI OCR Ready
              </span>
            </div>

            {/* Capture Flash Overlay */}
            {isCapturing && <div className="camera-shutter-flash"></div>}
          </div>

          {/* Shutter Controls */}
          <div className="shutter-controls">
            <button 
              className="gallery-quick-pick"
              onClick={() => fileInputRef.current?.click()}
              title="Upload photo"
            >
              <ImageIcon size={22} />
            </button>

            <button 
              className={`shutter-button ${isCapturing ? 'capturing' : ''}`}
              onClick={handleCapture}
            >
              <div className="shutter-inner"></div>
            </button>

            <div className="quick-help-icon" title="Point camera at loan agreement screenshot">
              <AlertCircle size={22} color="var(--text-muted)" />
            </div>
          </div>
        </div>
      )}

      {/* 2. Upload Mode */}
      {activeInputMode === 'upload' && (
        <div className="mobile-card drop-zone-card">
          <UploadCloud size={52} color="var(--primary-accent)" style={{ marginBottom: '0.75rem' }} />
          <h3>Select Document or Photo</h3>
          <p className="card-subtitle">PNG, JPG, PDF screenshots up to 10MB</p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '1rem', width: '100%', justifyContent: 'center' }}>
            <button className="btn-mobile-primary" onClick={() => fileInputRef.current?.click()}>
              Browse Files
            </button>
            <button className="btn-mobile-primary" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }} onClick={() => cameraInputRef.current?.click()}>
              Open Camera
            </button>
          </div>
        </div>
      )}

      {/* 3. Text Input Mode */}
      {activeInputMode === 'text' && (
        <div className="mobile-card">
          <h3 className="card-title">
            <FileText size={20} color="var(--primary-accent)" /> Direct Loan Terms
          </h3>
          <form onSubmit={handleTextSubmit}>
            <textarea 
              className="mobile-textarea"
              placeholder="Paste loan offer text e.g. '50,000 INR loan for 12 months at 24% interest. Processing fee 2000 INR, insurance 1500 INR...'"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
            <button type="submit" className="btn-mobile-primary" style={{ marginTop: '1rem', width: '100%' }}>
              Analyze Terms <ArrowRight size={18} />
            </button>
          </form>
        </div>
      )}

      {/* Hidden File Inputs for Camera and Upload Modes */}
      <input 
        ref={fileInputRef}
        type="file" 
        accept="image/*,.pdf"
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />
      <input 
        ref={cameraInputRef}
        type="file" 
        accept="image/*"
        capture="environment"
        style={{ display: 'none' }}
        onChange={handleCameraUpload}
      />

      {/* 1-Tap Quick Sample Loan Presets */}
      <div className="presets-section">
        <h4 className="presets-header">
          <Sparkles size={16} color="var(--primary-accent)" /> 1-Tap Sample Offer Scans:
        </h4>
        <div className="presets-grid">
          {samplePresets.map((preset, i) => (
            <div 
              key={i} 
              className={`preset-card risk-${preset.riskLevel}`}
              onClick={() => onProcess(preset.text, null, preset)}
            >
              <div className="preset-header">
                <span className="preset-lender">{preset.lender}</span>
                <span className={`risk-tag ${preset.riskLevel}`}>{preset.riskLabel}</span>
              </div>
              <div className="preset-body">
                <div className="preset-stat">
                  <span>Loan:</span> <strong>₹{preset.principal.toLocaleString('en-IN')}</strong>
                </div>
                <div className="preset-stat">
                  <span>Adv. Rate:</span> <strong>{preset.interestRate}%</strong>
                </div>
              </div>
              <div className="preset-action">
                Scan Sample <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CameraScanner;
