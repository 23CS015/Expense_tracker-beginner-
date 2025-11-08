import { useState, useMemo } from 'react'
import './App.css'
import Header from './components/layout/Header'
import ExpenseSummary from './components/dashboard/ExpenseSummary'
import RecentExpenses from './components/dashboard/RecentExpenses'
import AuthOverlay from './components/auth/AuthOverlay'
import AddExpenseModal from './components/expense/AddExpenseModal'

function App() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  // Add Expense Modal state
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false)

  // Expenses state
  const [expenses, setExpenses] = useState([
    // Sample data for demonstration - remove this when connecting to backend
    // { title: 'Groceries', amount: 85.50, category: 'food', date: '2025-11-08' },
    // { title: 'Gas', amount: 45.00, category: 'transportation', date: '2025-11-07' }
  ])

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

  const handleAuthSuccess = (userData) => {
    console.log('Authentication successful:', userData)
    setUser(userData)
    setIsAuthenticated(true)
  }

  const handleAddExpense = () => {
    setIsAddExpenseOpen(true)
  }

  const handleCloseAddExpense = () => {
    setIsAddExpenseOpen(false)
  }

  const handleExpenseAdded = (newExpense) => {
    setExpenses(prev => [newExpense, ...prev])
    console.log('New expense added to state:', newExpense)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
    console.log('User logged out')
  }

  return (
    <div className="app">
      {/* Authentication Overlay - shown when not authenticated */}
      {!isAuthenticated && (
        <AuthOverlay onAuthSuccess={handleAuthSuccess} />
      )}

      {/* Add Expense Modal */}
      <AddExpenseModal 
        isOpen={isAddExpenseOpen && isAuthenticated}
        onClose={handleCloseAddExpense}
        onExpenseAdded={handleExpenseAdded}
      />

      {/* Main Dashboard - always rendered but blurred when not authenticated */}
      <div className={`dashboard-container ${!isAuthenticated ? 'blurred' : ''}`}>
        <Header />
        
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
              onAddExpense={handleAddExpense}
            />
          </div>
        </main>

        {/* Debug: Logout button for testing - remove in production */}
        {isAuthenticated && (
          <button 
            onClick={handleLogout}
            style={{
              position: 'fixed',
              top: '10px',
              right: '10px',
              padding: '0.5rem 1rem',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              fontSize: '0.75rem'
            }}
          >
            Logout (Debug)
          </button>
        )}
      </div>
    </div>
  )
}

export default App
