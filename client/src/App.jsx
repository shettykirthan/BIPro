import React from 'react';
import { UploadCloud, BarChart2, MessageCircle } from 'lucide-react';
import './App.css'; 
import welcomeGIF from './assets/welcome.json';
import Lottie from 'lottie-react';

function App() {
  return (
    <div className="app-container">
      
      <main className="main-container">
        {/* Welcome Section */}
        <div className="container">
          <div className="column">
            <h1 className='site-name'>BIPro</h1>
            <h1 className="app-title">Business Insight Pro</h1>
            <p className="app-description">
              Transform your data into actionable insights with our powerful analytics tool.
            </p>
            <button className="get-started-btn" style={{ padding:"1rem",fontSize: "25px", fontFamily: "sans-serif" }}>
              Get Started
            </button>
          </div>
          <div className="column hide-on-mobile">
            <Lottie animationData={welcomeGIF} />
          </div>
        </div>

        {/* Features Section */}
        <h1 className='titles'>Features</h1>
        <div className="features-container">
          <div className="feature-item">
            <UploadCloud
              style={{
                height: '3rem',
                width: '3rem',
                color: '#3B82F6', // text-blue-500
              }}
            />
            <h2 className="feature-title">Upload CSV</h2>
            <p className="feature-description">Easily upload your CSV files for analysis</p>
          </div>

          <div className="feature-item">
            <BarChart2
              style={{
                height: '3rem',
                width: '3rem',
                color: '#22C55E', // text-green-500
              }}
            />
            <h2 className="feature-title">Interactive Dashboard</h2>
            <p className="feature-description">Visualize your data with dynamic charts and graphs</p>
          </div>

          <div className="feature-item">
            <MessageCircle
              style={{
                height: '3rem',
                width: '3rem',
                color: '#A78BFA', // text-purple-500
              }}
            />
            <h2 className="feature-title">AI-Powered Chatbot</h2>
            <p className="feature-description">Get insights by asking questions about your data</p>
          </div>
        </div>

        {/* How It Works Section */}
        <h1 className='titles' style={{ textAlign: 'center' }}>How It Works</h1>
        <div className="how-it-works-container">
          <div className="step">
            <h2 className="step-title">Step 1: Upload Your Data</h2>
            <p className="step-description">Simply drag and drop your CSV or connect to your database.</p>
          </div>

          <div className="step">
            <h2 className="step-title">Step 2: Visualize & Analyze</h2>
            <p className="step-description">Get instant insights through interactive dashboards.</p>
          </div>

          <div className="step">
            <h2 className="step-title">Step 3: Customize Your Reports</h2>
            <p className="step-description">Generate detailed reports and export them in formats like PDF or Excel.</p>
          </div>

          <div className="step">
            <h2 className="step-title">Step 4: Get AI-Driven Insights</h2>
            <p className="step-description">Leverage our chatbot to ask custom questions and get valuable predictions.</p>
          </div>
        </div>

        {/* Title and Get Started Button */}
        <div className="get-started-section">
          <h2 className="titles">Ready To Boost Your Business?</h2>
          <center>
            <button className="lastbutton" style={{ fontSize: '19px', fontFamily: 'sans-serif' }}>
              Get Started
            </button>
          </center>
        </div>    
        
        
        {/* Footer Section */}
      <footer className="Footer">
        <div className="footer-top">
          <h4 style={{ color: "#94a3b8", fontSize: "10px", fontFamily: "sans-serif" }}>
            We are Data Science Students from NMAMIT, Mangaluru
          </h4>
        </div>

        <div className="footer-container">
          {/* About Us Section */}
          <div className="footer-column">
            <h3 className="Footer-title">About Us</h3>
            <ul className="Footer-list">
              <li>Sarvajith Adyanthaya</li>
              <li>Kirthan Shetty</li>
              <li>Shreevathsa Tantry</li>
              <li>Vishanth Chandan</li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div className="footer-column">
            <h3 className="Footer-title">Contact Us</h3>
            <ul className="Footer-list">
              <li>nnm22ad048@nmamit.in</li>
              <li>nnm22ad051@nmamit.in</li>
              <li>nnm22ad054@nmamit.in</li>
              <li>nnm22ad068@nmamit.in</li>
            </ul>
          </div>

          {/* Useful Links Section */}
          <div className="footer-column">
            <h3 className="Footer-title">Page Details</h3>
            <ul className="Footer-list">
              <li><a href="#features">Features</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#get-started">Get Started</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright Notice */}
        <div className="footer-bottom">
          <p style={{ color: "#94a3b8", fontSize: "0.75rem", textAlign: "center" }}>
            &copy; {new Date().getFullYear()} Business Insight Pro. All rights reserved.
          </p>
        </div>
      </footer>

      </main>
    </div>
  );
}

export default App;
