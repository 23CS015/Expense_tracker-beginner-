import { useState, useMemo } from 'react'
import { EXPENSE_CATEGORIES } from '../expense/expenseData'
import './ExpenseTable.css'

function ExpenseTable({ expenses, onUpdateExpense, onDeleteExpense }) {
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' })
  const [selectedExpense, setSelectedExpense] = useState(null)

  // Get category icon and label
  const getCategoryInfo = (categoryValue) => {
    const category = EXPENSE_CATEGORIES.find(cat => cat.value === categoryValue)
    return category || { icon: '📝', label: categoryValue }
  }

  // Sort expenses based on current sort configuration
  const sortedExpenses = useMemo(() => {
    if (!expenses.length) return []

    return [...expenses].sort((a, b) => {
      const { key, direction } = sortConfig
      let aValue = a[key]
      let bValue = b[key]

      // Handle different data types
      if (key === 'date') {
        aValue = new Date(aValue)
        bValue = new Date(bValue)
      } else if (key === 'amount') {
        aValue = parseFloat(aValue)
        bValue = parseFloat(bValue)
      } else if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (aValue < bValue) return direction === 'asc' ? -1 : 1
      if (aValue > bValue) return direction === 'asc' ? 1 : -1
      return 0
    })
  }, [expenses, sortConfig])

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) return '⚪'
    return sortConfig.direction === 'asc' ? '🔼' : '🔽'
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const handleViewReceipt = (expense) => {
    if (expense.receipt) {
      // Create a temporary URL for the file blob
      const url = URL.createObjectURL(expense.receipt)
      window.open(url, '_blank')
      // Clean up the URL after opening
      setTimeout(() => URL.revokeObjectURL(url), 1000)
    }
  }

  if (!expenses.length) {
    return (
      <div className="expense-table-container">
        <div className="empty-state">
          <div className="empty-icon">📊</div>
          <h3>No expenses found</h3>
          <p>No expenses match your current filters. Try adjusting your search criteria.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="expense-table-container">
      <div className="table-header">
        <h3>Expenses ({sortedExpenses.length})</h3>
      </div>

      <div className="table-wrapper">
        <table className="expense-table">
          <thead>
            <tr>
              <th 
                className="sortable"
                onClick={() => handleSort('title')}
              >
                Title {getSortIcon('title')}
              </th>
              <th 
                className="sortable"
                onClick={() => handleSort('amount')}
              >
                Amount {getSortIcon('amount')}
              </th>
              <th 
                className="sortable"
                onClick={() => handleSort('category')}
              >
                Category {getSortIcon('category')}
              </th>
              <th 
                className="sortable"
                onClick={() => handleSort('date')}
              >
                Date {getSortIcon('date')}
              </th>
              <th>Tags</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedExpenses.map((expense, index) => {
              const categoryInfo = getCategoryInfo(expense.category)
              return (
                <tr key={expense.id || index} className="expense-row">
                  <td className="expense-title">{expense.title}</td>
                  <td className="expense-amount">${expense.amount.toFixed(2)}</td>
                  <td className="expense-category">
                    <span className="category-badge">
                      <span className="category-icon">{categoryInfo.icon}</span>
                      {categoryInfo.label}
                    </span>
                  </td>
                  <td className="expense-date">{formatDate(expense.date)}</td>
                  <td className="expense-tags">
                    {expense.tags && expense.tags.length > 0 ? (
                      <div className="tags-container">
                        {expense.tags.slice(0, 2).map((tag, tagIndex) => (
                          <span key={tagIndex} className="tag">
                            {tag}
                          </span>
                        ))}
                        {expense.tags.length > 2 && (
                          <span className="tag-more">+{expense.tags.length - 2}</span>
                        )}
                      </div>
                    ) : (
                      <span className="no-tags">—</span>
                    )}
                  </td>
                  <td className="expense-actions">
                    <div className="action-buttons">
                      {expense.receipt && (
                        <button
                          className="action-btn view-btn"
                          onClick={() => handleViewReceipt(expense)}
                          title="View Receipt"
                        >
                          👁️
                        </button>
                      )}
                      <button
                        className="action-btn edit-btn"
                        onClick={() => setSelectedExpense(expense)}
                        title="Edit Expense"
                      >
                        ✏️
                      </button>
                      <button
                        className="action-btn delete-btn"
                        onClick={() => onDeleteExpense(expense.id)}
                        title="Delete Expense"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ExpenseTable