import { useState } from 'react'
import './AddExpenseModal.css'
import AddExpenseForm from './AddExpenseForm'
import SuccessMessage from './SuccessMessage'

function AddExpenseModal({ isOpen, onClose, onExpenseAdded }) {
  const [showSuccess, setShowSuccess] = useState(false)
  const [addedExpense, setAddedExpense] = useState(null)

  const handleExpenseSubmit = (expenseData) => {
    console.log('New expense added:', expenseData)
    setAddedExpense(expenseData)
    setShowSuccess(true)
    
    // Update parent component with new expense
    onExpenseAdded(expenseData)
  }

  const handleAddAnother = () => {
    setShowSuccess(false)
    setAddedExpense(null)
    // Form will reset automatically
  }

  const handleDone = () => {
    setShowSuccess(false)
    setAddedExpense(null)
    onClose()
  }

  const handleClose = () => {
    setShowSuccess(false)
    setAddedExpense(null)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="expense-modal-overlay">
      <div className="expense-modal-backdrop" onClick={handleClose} />
      
      <div className="expense-modal-card">
        <div className="expense-modal-header">
          <h2 className="expense-modal-title">
            {showSuccess ? 'Expense Added!' : 'Add New Expense'}
          </h2>
          <button 
            className="expense-modal-close"
            onClick={handleClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="expense-modal-content">
          {showSuccess ? (
            <SuccessMessage 
              expense={addedExpense}
              onAddAnother={handleAddAnother}
              onDone={handleDone}
            />
          ) : (
            <AddExpenseForm onSubmit={handleExpenseSubmit} />
          )}
        </div>
      </div>
    </div>
  )
}

export default AddExpenseModal