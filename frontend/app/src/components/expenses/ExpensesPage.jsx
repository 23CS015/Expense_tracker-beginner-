import { useState } from 'react'
import './ExpensesPage.css'
import ExpenseFilters from './ExpenseFilters'
import ExpenseTable from './ExpenseTable'
import FilterSummary from './FilterSummary'

function ExpensesPage({ expenses, onUpdateExpense, onDeleteExpense }) {
  const [filteredExpenses, setFilteredExpenses] = useState(expenses)

  const handleFilterChange = (newFilteredExpenses) => {
    setFilteredExpenses(newFilteredExpenses)
  }

  return (
    <div className="expenses-page">
      <div className="expenses-header">
        <h2>All Expenses</h2>
        <p className="expenses-subtitle">Manage and track your expenses</p>
      </div>

      <div className="expenses-layout">
        {/* Left Sidebar with Filters */}
        <aside className="expenses-sidebar">
          <ExpenseFilters 
            expenses={expenses}
            onFilterChange={handleFilterChange}
          />
        </aside>

        {/* Main Content Area */}
        <main className="expenses-main">
          <FilterSummary filteredExpenses={filteredExpenses} />
          <ExpenseTable 
            expenses={filteredExpenses}
            onUpdateExpense={onUpdateExpense}
            onDeleteExpense={onDeleteExpense}
          />
        </main>
      </div>
    </div>
  )
}

export default ExpensesPage