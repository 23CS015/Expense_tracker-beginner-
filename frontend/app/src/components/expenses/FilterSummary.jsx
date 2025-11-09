import './FilterSummary.css'

function FilterSummary({ filteredExpenses }) {
  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0)
  const expenseCount = filteredExpenses.length

  // Calculate category breakdown
  const categoryTotals = filteredExpenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount
    return acc
  }, {})

  const topCategories = Object.entries(categoryTotals)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)

  return (
    <div className="filter-summary">
      <div className="summary-grid">
        <div className="summary-card">
          <div className="summary-value">{expenseCount}</div>
          <div className="summary-label">
            {expenseCount === 1 ? 'Expense' : 'Expenses'}
          </div>
        </div>
        
        <div className="summary-card">
          <div className="summary-value">${totalAmount.toFixed(2)}</div>
          <div className="summary-label">Total Amount</div>
        </div>

        {topCategories.length > 0 && (
          <div className="summary-card">
            <div className="summary-value">
              {topCategories[0][0].charAt(0).toUpperCase() + topCategories[0][0].slice(1)}
            </div>
            <div className="summary-label">
              Top Category (${topCategories[0][1].toFixed(2)})
            </div>
          </div>
        )}
      </div>

      {topCategories.length > 1 && (
        <div className="category-breakdown">
          <h4 className="breakdown-title">Category Breakdown</h4>
          <div className="category-list">
            {topCategories.map(([category, amount]) => (
              <div key={category} className="category-item">
                <span className="category-name">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </span>
                <span className="category-amount">${amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterSummary