import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, Camera } from 'lucide-react';

const InputSection = ({ onProcess }) => {
  const [dragActive, setDragActive] = useState(false);
  const [textInput, setTextInput] = useState('');
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    // In a real app, we would process the file here (e.g., using Tesseract.js)
    onProcess(null, file);
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (textInput.trim()) {
      onProcess(textInput, null);
    }
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div 
        className={`drop-zone glass-panel ${dragActive ? "drag-active" : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
      >
        <input 
          ref={fileInputRef}
          type="file" 
          style={{ display: 'none' }} 
          accept="image/*,.pdf" 
          onChange={handleChange} 
        />
        <UploadCloud size={48} color="var(--primary-accent)" style={{ marginBottom: '1rem' }} />
        <h3 style={{ marginBottom: '0.5rem' }}>Upload Loan Document or Screenshot</h3>
        <p style={{ color: 'var(--text-muted)' }}>Drag and drop here, or click to browse</p>
      </div>

      <div className="glass-panel">
        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileText size={20} color="var(--primary-accent)" /> 
          Or Paste Loan Terms Directly
        </h3>
        <form onSubmit={handleTextSubmit}>
          <textarea 
            className="styled-input" 
            placeholder="E.g., 50,000 INR loan for 12 months at 24% interest. Processing fee: 2000 INR. Penalty: 5% per month..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          ></textarea>
          <div style={{ marginTop: '1rem', textAlign: 'right' }}>
            <button type="submit" className="btn-primary">Analyze Text</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputSection;
