import { useState } from 'react'
import './LoginForm.css'

function LoginForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate login process
    setTimeout(() => {
      console.log('Login attempt:', formData)
      setIsLoading(false)
      onSuccess({ 
        email: formData.email, 
        type: 'email_login',
        name: 'User' 
      })
    }, 1000)
  }

  const handleGoogleSignIn = () => {
    setIsLoading(true)
    // Simulate Google sign-in
    setTimeout(() => {
      console.log('Google sign-in')
      setIsLoading(false)
      onSuccess({ 
        email: 'user@gmail.com', 
        type: 'google_signin',
        name: 'Google User'
      })
    }, 1000)
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      {/* Google Sign-In Button */}
      <button 
        type="button" 
        className="google-btn" 
        onClick={handleGoogleSignIn}
        disabled={isLoading}
      >
        <img 
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE3LjY0IDkuMjA0NTVDMTcuNjQgOC41NjM2NCAxNy41ODM2IDcuOTUyNzMgMTcuNDggNy4zNjM2NEg5VjEwLjg0NDJIMT3UNDA2VjExLjg1NDVDMTMuNDAyMyAxMS42MiAxMy4xMTk0IDExLjQwOTEgMTIuODM2NCAxMS4yMjczTDEzLjE2MzYgMTMuOTEwOUMxNC45ODU5IDEyLjcxMzYgMTYuMDkyMyAxMC43ODY0IDE2LjA5MjMgOC4zOTU0NUMxNi4wOTIzIDcuOTUyNzMgMTYuMDY0NSA3LjUxODE4IDE2IDcuMDkwOTFIMTcuNjRaIiBmaWxsPSIjNDI4NUY0Ii8+CjxwYXRoIGQ9Ik05IDE4QzExLjQzIDE4IDEzLjQ2NzIgMTcuMTk0MSAxNC45NTY4IDE1LjgwNTlMMTIuODc4MSAxMy43NDEyQzEyLjM1IDEzLjE4MjMgMTEuNzMgMTMgOSAxM0M2LjY5NzUgMTMgNC43NTkxIDEzLjM2NjMgMi45MjczIDEzLjk5ODJMMy4xMjUgMTMuMDAzM0w0Ljc5NTUgMTEuODc3N0M1LjQxODIgMTEuMjc3MyA2LjU2ODIgMTEgOSAxMVoiIGZpbGw9IiMzNEE4NTMiLz4KPHBhdGggZD0iTTQuNzk1NSAxMS44Nzc3QzQuNDcwNSAxMS4yNDU5IDQuMjk1NSAxMC44NDUgNC4yOTU1IDEwQzQuMjk1NSA5LjE1NSA0LjQ3MDUgOC43NTQxIDQuNzk1NSA4LjEyMjNWNS45OTc3TDIuOTI3MyA2LjAwMTU2QzMuOTk1NCA0LjY4MTQgNS41ODYzIDMuODQyNzMgOS4wMDQ1IDMuODQyNzNDMTEuODUwOSAzLjg0MjczIDEzLjQzNDEgNS4xNTkwOSAxMy44MjI3IDYuMzQwOTFMMTUuNDU0NSA0LjcwOTA5QzEzLjQ2NzIgMy4wNzgxOCAxMS40MyAyIDkgMkM1LjU3MDQ1IDIgMi42MTM2NCA0LjAwOTA5IDEuNjMxODIgNS4yMzE4MkwyLjkyNzMgNi4wMDE1Nkw0Ljc5NTUgOC4xMjIzWiIgZmlsbD0iI0ZCQkMwNCIvPgo8cGF0aCBkPSJNOS4wMDQ1IDMuODQyNzNDMTEuODUwOSAzLjg0MjczIDEzLjQzNDEgNS4xNTkwOSAxMy44MjI3IDYuMzQwOTFMMTYuNDU0NSA0LjcwOTA5QzE0LjQ2NzIgMy4wNzgxOCAxMS40MyAyIDkgMkM2LjU3MDQ1IDIgMy42MTM2NCA0LjAwOTA5IDEuNjMxODIgNS4yMzE4MkwyLjkyNzMgNi4wMDE1NkM0LjcwNDUgNC4xNzI3MyA2LjY5NzUgMy44NDI3MyA5LjAwNDUgMy44NDI3M1oiIGZpbGw9IiNFQTQzMzUiLz4KPC9zdmc+" 
          alt="Google logo" 
          className="google-icon"
        />
        Continue with Google
      </button>

      <div className="divider">
        <span className="divider-text">or</span>
      </div>

      {/* Email Input */}
      <div className="form-group">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-input"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
          required
        />
      </div>

      {/* Password Input */}
      <div className="form-group">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          className="form-input"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Enter your password"
          required
        />
      </div>

      {/* Forgot Password Link */}
      <div className="forgot-password">
        <button type="button" className="forgot-link">
          Forgot your password?
        </button>
      </div>

      {/* Login Button */}
      <button 
        type="submit" 
        className="login-btn"
        disabled={isLoading}
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  )
}

export default LoginForm