import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">ExpenseTracker</h1>
        <nav className="nav">
          <button className="nav-item active">
            <span className="nav-icon">📊</span>
            Dashboard
          </button>
          <button className="nav-item">
            <span className="nav-icon">📝</span>
            Expenses
          </button>
          <button className="nav-item">
            <span className="nav-icon">➕</span>
            Add
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header