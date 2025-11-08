import { useState } from 'react'
import './SignupForm.css'

function SignupForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters'
    }
    
    if (!formData.age) {
      newErrors.age = 'Age is required'
    } else if (formData.age < 13) {
      newErrors.age = 'You must be at least 13 years old'
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    
    // Simulate signup process
    setTimeout(() => {
      console.log('Signup attempt:', formData)
      setIsLoading(false)
      onSuccess({ 
        name: formData.name,
        username: formData.username,
        email: formData.email, 
        age: formData.age,
        type: 'email_signup'
      })
    }, 1500)
  }

  const handleGoogleSignUp = () => {
    setIsLoading(true)
    // Simulate Google sign-up
    setTimeout(() => {
      console.log('Google sign-up')
      setIsLoading(false)
      onSuccess({ 
        name: 'Google User',
        username: 'google_user',
        email: 'user@gmail.com', 
        type: 'google_signup'
      })
    }, 1000)
  }

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      {/* Google Sign-Up Button */}
      <button 
        type="button" 
        className="google-btn" 
        onClick={handleGoogleSignUp}
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

      <div className="form-row">
        {/* Name Input */}
        <div className="form-group">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className={`form-input ${errors.name ? 'error' : ''}`}
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
            required
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        {/* Username Input */}
        <div className="form-group">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className={`form-input ${errors.username ? 'error' : ''}`}
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Choose a username"
            required
          />
          {errors.username && <span className="error-text">{errors.username}</span>}
        </div>
      </div>

      {/* Age Input */}
      <div className="form-group">
        <label htmlFor="age" className="form-label">Age</label>
        <input
          type="number"
          id="age"
          name="age"
          className={`form-input ${errors.age ? 'error' : ''}`}
          value={formData.age}
          onChange={handleInputChange}
          placeholder="Enter your age"
          min="13"
          max="120"
          required
        />
        {errors.age && <span className="error-text">{errors.age}</span>}
      </div>

      {/* Email Input */}
      <div className="form-group">
        <label htmlFor="signup-email" className="form-label">Email</label>
        <input
          type="email"
          id="signup-email"
          name="email"
          className={`form-input ${errors.email ? 'error' : ''}`}
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
          required
        />
        {errors.email && <span className="error-text">{errors.email}</span>}
      </div>

      <div className="form-row">
        {/* Password Input */}
        <div className="form-group">
          <label htmlFor="signup-password" className="form-label">Password</label>
          <input
            type="password"
            id="signup-password"
            name="password"
            className={`form-input ${errors.password ? 'error' : ''}`}
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Create password"
            required
          />
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>

        {/* Confirm Password Input */}
        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm password"
            required
          />
          {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
        </div>
      </div>

      {/* Terms and Privacy */}
      <div className="terms-text">
        By signing up, you agree to our Terms of Service and Privacy Policy.
      </div>

      {/* Sign Up Button */}
      <button 
        type="submit" 
        className="signup-btn"
        disabled={isLoading}
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </button>
    </form>
  )
}

export default SignupForm