
import React from 'react';
import { UploadCloud, BarChart2, MessageCircle, Database, Eye, GitBranch, FileText, PieChart, Sliders, Filter, Layout } from 'lucide-react';
import './App.css'; 
import welcomeGIF from './assets/welcome.json';
import Lottie from 'lottie-react';

function App() {
  return (
    <div className="app-container">
      <main className="main-container">
       
       {/* Welcome Section */}
        <div className="welcome-section">
          <div className="welcome-left">
            <h1 className="site-name">BIPro</h1>
            <h1 className="app-title">Business Insight Pro</h1>
            <p className="app-description">
              Transform your data into actionable insights with our powerful analytics tool.
            </p>
            <a href="http://localhost:8501/" className="get-started-btn-link">
              <button className="get-started-btn">Get Started</button>
            </a>
          </div>
          <div className="welcome-right">
            <Lottie animationData={welcomeGIF} />
          </div>
        </div>

        {/* Features Section */}
        <h1 className='titles' style={{"textAlign":"center"}}>Features</h1>
        <div className="features-container">
          <div className="feature-item">
            <UploadCloud style={{ height: '3rem', width: '3rem', color: '#3B82F6' }} />
            <h2 className="feature-title">Upload CSV</h2>
            <p className="feature-description">Easily upload your CSV files for analysis</p>
          </div>
          <div className="feature-item">
            <BarChart2 style={{ height: '3rem', width: '3rem', color: '#22C55E' }} />
            <h2 className="feature-title">Interactive Dashboard</h2>
            <p className="feature-description">Visualize your data with dynamic charts and graphs</p>
          </div>
          <div className="feature-item">
            <MessageCircle style={{ height: '3rem', width: '3rem', color: '#A78BFA' }} />
            <h2 className="feature-title">AI-Powered Chatbot</h2>
            <p className="feature-description">Get insights by asking questions about your data</p>
          </div>
          <div className="feature-item">
            <Database style={{ height: '3rem', width: '3rem', color: '#F59E0B' }} />
            <h2 className="feature-title">Data Analysis</h2>
            <p className="feature-description">Deeply analyze data to uncover trends and patterns</p>
          </div>
          <div className="feature-item">
            <Eye style={{ height: '3rem', width: '3rem', color: '#EF4444' }} />
            <h2 className="feature-title">Data Overview</h2>
            <p className="feature-description">Get a quick summary of your data metrics</p>
          </div>
          <div className="feature-item">
            <GitBranch style={{ height: '3rem', width: '3rem', color: '#10B981' }} />
            <h2 className="feature-title">Knowledge Graph</h2>
            <p className="feature-description">Visualize relationships within your data</p>
          </div>
          <div className="feature-item">
            <FileText style={{ height: '3rem', width: '3rem', color: '#6366F1' }} />
            <h2 className="feature-title">Chat with CSV</h2>
            <p className="feature-description">Interact with CSV files through chat interface</p>
          </div>
          <div className="feature-item">
            <PieChart style={{ height: '3rem', width: '3rem', color: '#E11D48' }} />
            <h2 className="feature-title">Data Visualization</h2>
            <p className="feature-description">Advanced visualizations for better insight</p>
          </div>
          <div className="feature-item">
            <Sliders style={{ height: '3rem', width: '3rem', color: '#9333EA' }} />
            <h2 className="feature-title">Vizzu Animation</h2>
            <p className="feature-description">Dynamic animations to showcase data trends</p>
          </div>
          <div className="feature-item">
            <Filter style={{ height: '3rem', width: '3rem', color: '#6B7280' }} />
            <h2 className="feature-title">Data Cleaning</h2>
            <p className="feature-description">Clean and prepare data for accurate insights</p>
          </div>
          <div className="feature-item">
            <Layout style={{ height: '3rem', width: '3rem', color: '#F97316' }} />
            <h2 className="feature-title">Dynamic Dashboard</h2>
            <p className="feature-description">Create customizable and interactive dashboards</p>
          </div>
        </div>

        {/* How It Works Section */}
              <h1 className='titles' style={{ textAlign: 'center' }}>How It Works</h1>
              <center>
        <div className="video-container" style={{ marginTop: "1rem" }}>
          <iframe
            width="1300"
            height="715"
            src="https://www.youtube.com/embed/mOHMEGXUUfM"
            title="YouTube video tutorial"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </center>

        <div className="how-it-works-container">
  <div className="step">
    <h2 className="step-title">Step 1: Upload Your Data</h2>
    <p className="step-description">
      Simply drag and drop your CSV or connect to your database. Import data from various sources effortlessly and start your analysis instantly.
    </p>
  </div>
  <div className="step">
    <h2 className="step-title">Step 2: Visualize & Analyze</h2>
    <p className="step-description">
      Get instant insights through interactive dashboards. Uncover patterns and trends in your data with powerful visualizations.
    </p>
  </div>
  <div className="step">
    <h2 className="step-title">Step 3: Customize Your Reports</h2>
    <p className="step-description">
      Generate detailed reports and export them in formats like PDF or Excel. Tailor reports to highlight specific insights for better decision-making.
    </p>
  </div>
  <div className="step">
    <h2 className="step-title">Step 4: Get AI-Driven Insights</h2>
    <p className="step-description">
      Leverage our chatbot to ask custom questions and get valuable predictions. Enhance your analysis with predictive insights and automated recommendations.
    </p>
  </div>
</div>
<div className="get-started-section">
          <h2 className="titles">Ready To Boost Your Business?</h2>
          <center>
            <a href ="http://localhost:8501/"><button className="lastbutton" style={{ fontSize: '19px', fontFamily: 'sans-serif' }}>
              Get Started
            </button></a>
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
              <li><a href="http://localhost:8501/">Get Started</a></li>
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
