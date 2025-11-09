import { useMemo } from 'react'
import ExpenseSummary from '../dashboard/ExpenseSummary'
import RecentExpenses from '../dashboard/RecentExpenses'
import './DashboardPage.css'

function DashboardPage({ expenses, user, onAddExpense }) {
  // Calculate summary data for ExpenseSummary component
  const summaryData = useMemo(() => {
    const totalExpenses = expenses.length
    const monthlyTotal = expenses.reduce((sum, expense) => sum + expense.amount, 0)
    
    return {
      totalExpenses,
      monthlyTotal: monthlyTotal.toFixed(2),
      categoryBreakdown: {} // Can be expanded later for category-wise breakdown
    }
  }, [expenses])

  return (
    <main className="main-content">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <p className="dashboard-subtitle">
          {user ? `Welcome back, ${user.name}! Overview of your expenses` : 'Overview of your expenses'}
        </p>
      </div>

      <div className="dashboard-grid">
        <ExpenseSummary 
          totalExpenses={summaryData.totalExpenses}
          monthlyTotal={summaryData.monthlyTotal}
          categoryBreakdown={summaryData.categoryBreakdown}
        />
        
        <RecentExpenses 
          expenses={expenses}
          onAddExpense={onAddExpense}
        />
      </div>
    </main>
  )
}

export default DashboardPage