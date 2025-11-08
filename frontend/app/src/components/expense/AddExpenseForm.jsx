import { useState } from 'react'
import './AddExpenseForm.css'
import { expenseCategories, paymentMethods } from './expenseData'
import ReceiptUpload from './ReceiptUpload'

function AddExpenseForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0], // Today's date
    paymentMethod: '',
    notes: '',
    tags: '',
    receipt: null
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

  const handleReceiptChange = (file) => {
    setFormData(prev => ({
      ...prev,
      receipt: file
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }

    if (!formData.amount) {
      newErrors.amount = 'Amount is required'
    } else {
      const amount = parseFloat(formData.amount)
      if (isNaN(amount) || amount <= 0) {
        newErrors.amount = 'Amount must be greater than 0'
      }
    }

    if (!formData.category) {
      newErrors.category = 'Category is required'
    }

    if (!formData.date) {
      newErrors.date = 'Date is required'
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Payment method is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const expenseData = {
        ...formData,
        amount: parseFloat(formData.amount),
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        id: Date.now(), // Temporary ID
        createdAt: new Date().toISOString()
      }

      onSubmit(expenseData)
      setIsLoading(false)
      
      // Reset form
      setFormData({
        title: '',
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        paymentMethod: '',
        notes: '',
        tags: '',
        receipt: null
      })
      setErrors({})
    }, 1000)
  }

  return (
    <form className="add-expense-form" onSubmit={handleSubmit}>
      {/* Title */}
      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Title <span className="required">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className={`form-input ${errors.title ? 'error' : ''}`}
          value={formData.title}
          onChange={handleInputChange}
          placeholder="e.g. Lunch at restaurant"
          required
        />
        {errors.title && <span className="error-text">{errors.title}</span>}
      </div>

      {/* Amount and Category Row */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="amount" className="form-label">
            Amount <span className="required">*</span>
          </label>
          <div className="amount-input-wrapper">
            <span className="currency-symbol">$</span>
            <input
              type="number"
              id="amount"
              name="amount"
              className={`form-input amount-input ${errors.amount ? 'error' : ''}`}
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="0.00"
              min="0.01"
              step="0.01"
              required
            />
          </div>
          {errors.amount && <span className="error-text">{errors.amount}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="category" className="form-label">
            Category <span className="required">*</span>
          </label>
          <select
            id="category"
            name="category"
            className={`form-input ${errors.category ? 'error' : ''}`}
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select category</option>
            {expenseCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.icon} {category.name}
              </option>
            ))}
          </select>
          {errors.category && <span className="error-text">{errors.category}</span>}
        </div>
      </div>

      {/* Date and Payment Method Row */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="date" className="form-label">
            Date <span className="required">*</span>
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className={`form-input ${errors.date ? 'error' : ''}`}
            value={formData.date}
            onChange={handleInputChange}
            required
          />
          {errors.date && <span className="error-text">{errors.date}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="paymentMethod" className="form-label">
            Payment Method <span className="required">*</span>
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            className={`form-input ${errors.paymentMethod ? 'error' : ''}`}
            value={formData.paymentMethod}
            onChange={handleInputChange}
            required
          >
            <option value="">Select method</option>
            {paymentMethods.map((method) => (
              <option key={method.id} value={method.id}>
                {method.icon} {method.name}
              </option>
            ))}
          </select>
          {errors.paymentMethod && <span className="error-text">{errors.paymentMethod}</span>}
        </div>
      </div>

      {/* Tags */}
      <div className="form-group">
        <label htmlFor="tags" className="form-label">Tags</label>
        <input
          type="text"
          id="tags"
          name="tags"
          className="form-input"
          value={formData.tags}
          onChange={handleInputChange}
          placeholder="work, business, personal (separated by commas)"
        />
        <small className="form-hint">Separate tags with commas</small>
      </div>

      {/* Notes */}
      <div className="form-group">
        <label htmlFor="notes" className="form-label">Notes</label>
        <textarea
          id="notes"
          name="notes"
          className="form-input form-textarea"
          value={formData.notes}
          onChange={handleInputChange}
          placeholder="Additional details about this expense..."
          rows="3"
        />
      </div>

      {/* Receipt Upload */}
      <div className="form-group">
        <label className="form-label">Receipt</label>
        <ReceiptUpload 
          onFileChange={handleReceiptChange}
          currentFile={formData.receipt}
        />
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        className="add-expense-submit-btn"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="loading-spinner"></span>
            Adding Expense...
          </>
        ) : (
          <>
            <span className="btn-icon">💰</span>
            Add Expense
          </>
        )}
      </button>
    </form>
  )
}

export default AddExpenseForm