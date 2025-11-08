import { useState } from 'react'
import './AuthOverlay.css'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

function AuthOverlay({ onAuthSuccess }) {
  const [activeTab, setActiveTab] = useState('login') // 'login' or 'signup'

  const handleAuthSuccess = (userData) => {
    console.log('Auth successful:', userData)
    onAuthSuccess(userData)
  }

  return (
    <div className="auth-overlay">
      <div className="auth-backdrop" />
      
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Welcome to ExpenseTracker</h2>
          <p className="auth-subtitle">Track your expenses with ease</p>
        </div>

        {/* Tab Navigation */}
        <div className="auth-tabs">
          <button 
            className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button 
            className={`auth-tab ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
        </div>

        {/* Tab Content */}
        <div className="auth-content">
          {activeTab === 'login' ? (
            <LoginForm onSuccess={handleAuthSuccess} />
          ) : (
            <SignupForm onSuccess={handleAuthSuccess} />
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthOverlay