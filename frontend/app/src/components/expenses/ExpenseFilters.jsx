import { useState, useEffect } from 'react'
import { EXPENSE_CATEGORIES, PAYMENT_METHODS } from '../expense/expenseData'
import './ExpenseFilters.css'

function ExpenseFilters({ expenses, onFilterChange }) {
  // Filter states
  const [dateFilter, setDateFilter] = useState('')
  const [monthFilter, setMonthFilter] = useState('')
  const [categoryFilters, setCategoryFilters] = useState([])
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('')
  const [amountRange, setAmountRange] = useState({ min: '', max: '' })
  const [tagFilter, setTagFilter] = useState('')

  // Apply filters whenever filter states change
  useEffect(() => {
    let filtered = [...expenses]

    // Date filter (specific date)
    if (dateFilter) {
      filtered = filtered.filter(expense => expense.date === dateFilter)
    }

    // Month filter (month/year)
    if (monthFilter) {
      const [year, month] = monthFilter.split('-')
      filtered = filtered.filter(expense => {
        const expenseDate = new Date(expense.date)
        return expenseDate.getFullYear() === parseInt(year) && 
               expenseDate.getMonth() === parseInt(month) - 1
      })
    }

    // Category filter (multi-select)
    if (categoryFilters.length > 0) {
      filtered = filtered.filter(expense => categoryFilters.includes(expense.category))
    }

    // Payment method filter
    if (paymentMethodFilter) {
      filtered = filtered.filter(expense => expense.paymentMethod === paymentMethodFilter)
    }

    // Amount range filter
    if (amountRange.min !== '') {
      filtered = filtered.filter(expense => expense.amount >= parseFloat(amountRange.min))
    }
    if (amountRange.max !== '') {
      filtered = filtered.filter(expense => expense.amount <= parseFloat(amountRange.max))
    }

    // Tag filter
    if (tagFilter) {
      filtered = filtered.filter(expense => 
        expense.tags && expense.tags.some(tag => 
          tag.toLowerCase().includes(tagFilter.toLowerCase())
        )
      )
    }

    onFilterChange(filtered)
  }, [expenses, dateFilter, monthFilter, categoryFilters, paymentMethodFilter, amountRange, tagFilter, onFilterChange])

  const handleCategoryChange = (category) => {
    setCategoryFilters(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const clearAllFilters = () => {
    setDateFilter('')
    setMonthFilter('')
    setCategoryFilters([])
    setPaymentMethodFilter('')
    setAmountRange({ min: '', max: '' })
    setTagFilter('')
  }

  const hasActiveFilters = dateFilter || monthFilter || categoryFilters.length > 0 || 
                          paymentMethodFilter || amountRange.min || amountRange.max || tagFilter

  return (
    <div className="expense-filters">
      <div className="filters-header">
        <h3>Filters</h3>
        {hasActiveFilters && (
          <button className="clear-filters-btn" onClick={clearAllFilters}>
            Clear All
          </button>
        )}
      </div>

      {/* Date Filter */}
      <div className="filter-section">
        <label className="filter-label">Specific Date</label>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="filter-input"
        />
      </div>

      {/* Month/Year Filter */}
      <div className="filter-section">
        <label className="filter-label">Month & Year</label>
        <input
          type="month"
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
          className="filter-input"
        />
      </div>

      {/* Category Filter */}
      <div className="filter-section">
        <label className="filter-label">Categories</label>
        <div className="checkbox-group">
          {EXPENSE_CATEGORIES.map(category => (
            <label key={category.value} className="checkbox-item">
              <input
                type="checkbox"
                checked={categoryFilters.includes(category.value)}
                onChange={() => handleCategoryChange(category.value)}
              />
              <span className="checkbox-label">
                <span className="category-icon">{category.icon}</span>
                {category.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Payment Method Filter */}
      <div className="filter-section">
        <label className="filter-label">Payment Method</label>
        <select
          value={paymentMethodFilter}
          onChange={(e) => setPaymentMethodFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Methods</option>
          {PAYMENT_METHODS.map(method => (
            <option key={method.value} value={method.value}>
              {method.icon} {method.label}
            </option>
          ))}
        </select>
      </div>

      {/* Amount Range Filter */}
      <div className="filter-section">
        <label className="filter-label">Amount Range</label>
        <div className="amount-range">
          <input
            type="number"
            placeholder="Min $"
            value={amountRange.min}
            onChange={(e) => setAmountRange(prev => ({ ...prev, min: e.target.value }))}
            className="filter-input range-input"
          />
          <span className="range-separator">to</span>
          <input
            type="number"
            placeholder="Max $"
            value={amountRange.max}
            onChange={(e) => setAmountRange(prev => ({ ...prev, max: e.target.value }))}
            className="filter-input range-input"
          />
        </div>
      </div>

      {/* Tag Filter */}
      <div className="filter-section">
        <label className="filter-label">Search Tags</label>
        <input
          type="text"
          placeholder="Enter tag to search..."
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
          className="filter-input"
        />
      </div>
    </div>
  )
}

export default ExpenseFilters