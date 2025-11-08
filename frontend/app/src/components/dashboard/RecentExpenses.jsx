import './RecentExpenses.css'
import { expenseCategories } from '../expense/expenseData'

function RecentExpenses({ expenses, onAddExpense }) {
  const getCategoryDisplay = (categoryId) => {
    const category = expenseCategories.find(cat => cat.id === categoryId)
    return category ? `${category.icon} ${category.name}` : categoryId
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <section className="recent-expenses">
      <h3>Recent Expenses</h3>
      <div className="expenses-content">
        {expenses.length === 0 ? (
          <p className="empty-state">No expenses found.</p>
        ) : (
          <div className="expenses-list">
            {expenses.map((expense) => (
              <div key={expense.id} className="expense-item">
                <div className="expense-info">
                  <span className="expense-title">{expense.title}</span>
                  <div className="expense-meta">
                    <span className="expense-category">{getCategoryDisplay(expense.category)}</span>
                    <span className="expense-date">{formatDate(expense.date)}</span>
                  </div>
                </div>
                <span className="expense-amount">${expense.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        )}
        <button className="add-expense-btn" onClick={onAddExpense}>
          <span className="btn-icon">➕</span>
          Add New Expense
        </button>
      </div>
    </section>
  )
}

export default RecentExpenses