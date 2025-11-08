import './SuccessMessage.css'
import { expenseCategories, paymentMethods } from './expenseData'

function SuccessMessage({ expense, onAddAnother, onDone }) {
  const getCategoryName = (categoryId) => {
    const category = expenseCategories.find(cat => cat.id === categoryId)
    return category ? `${category.icon} ${category.name}` : categoryId
  }

  const getPaymentMethodName = (methodId) => {
    const method = paymentMethods.find(m => m.id === methodId)
    return method ? `${method.icon} ${method.name}` : methodId
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="success-message">
      <div className="success-icon">✅</div>
      
      <div className="success-content">
        <h3 className="success-title">Expense Added Successfully!</h3>
        <p className="success-subtitle">Your expense has been recorded.</p>
        
        <div className="expense-summary">
          <div className="expense-summary-header">
            <div className="expense-title">{expense.title}</div>
            <div className="expense-amount">${expense.amount.toFixed(2)}</div>
          </div>
          
          <div className="expense-details">
            <div className="expense-detail">
              <span className="detail-label">Category:</span>
              <span className="detail-value">{getCategoryName(expense.category)}</span>
            </div>
            
            <div className="expense-detail">
              <span className="detail-label">Date:</span>
              <span className="detail-value">{formatDate(expense.date)}</span>
            </div>
            
            <div className="expense-detail">
              <span className="detail-label">Payment:</span>
              <span className="detail-value">{getPaymentMethodName(expense.paymentMethod)}</span>
            </div>
            
            {expense.tags.length > 0 && (
              <div className="expense-detail">
                <span className="detail-label">Tags:</span>
                <div className="tags-list">
                  {expense.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            )}
            
            {expense.notes && (
              <div className="expense-detail">
                <span className="detail-label">Notes:</span>
                <span className="detail-value">{expense.notes}</span>
              </div>
            )}
            
            {expense.receipt && (
              <div className="expense-detail">
                <span className="detail-label">Receipt:</span>
                <span className="detail-value">📎 Attached</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="success-actions">
          <button 
            className="success-btn secondary-btn"
            onClick={onAddAnother}
          >
            <span className="btn-icon">➕</span>
            Add Another
          </button>
          <button 
            className="success-btn primary-btn"
            onClick={onDone}
          >
            <span className="btn-icon">✓</span>
            Done
          </button>
        </div>
      </div>
    </div>
  )
}

export default SuccessMessage