import './ExpenseSummary.css'

function ExpenseSummary({ totalExpenses, monthlyTotal, categoryBreakdown }) {
  const isEmpty = totalExpenses === 0

  return (
    <section className="expense-summary">
      <h3>Expense Summary</h3>
      <div className="summary-content">
        {isEmpty ? (
          <p className="empty-state">Add some expenses to see your summary.</p>
        ) : (
          <div className="summary-stats">
            <div className="stat-item">
              <span className="stat-label">Total Expenses</span>
              <span className="stat-value">{totalExpenses}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Monthly Total</span>
              <span className="stat-value">${monthlyTotal}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ExpenseSummary