import { formatCurrency } from '../../utils/currency'
import { navItems } from './navItems'

function Sidebar({
  activeView,
  onChangeView,
  profile,
  theme,
  onToggleTheme,
  onSignOut,
  summary,
  isMobileMenuOpen = false,
  onCloseMobileMenu,
}) {
  const handleNavigate = (view) => {
    onChangeView(view)
    onCloseMobileMenu?.()
  }

  return (
    <aside className={`sidebar ${isMobileMenuOpen ? 'is-mobile-open' : ''}`}>
      <div className="sidebar__brand">
        <p className="eyebrow">Smart Budget</p>
        <h2>{profile.name}&apos;s tracker</h2>
        <p>Monthly control with savings transfers and passkey confirmation.</p>
      </div>

      <nav className="sidebar__nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`sidebar__link ${activeView === item.id ? 'is-active' : ''}`}
            onClick={() => handleNavigate(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="sidebar__summary">
        <div>
          <span>Balance</span>
          <strong>{formatCurrency(summary.balance, profile.currency)}</strong>
        </div>
        <div>
          <span>Savings</span>
          <strong>{formatCurrency(summary.savingsBalance, profile.currency)}</strong>
        </div>
      </div>

      <button type="button" className="theme-switch" onClick={onToggleTheme}>
        Switch to {theme === 'dark' ? 'light' : 'dark'} mode
      </button>
      <button type="button" className="secondary-button" onClick={onSignOut} style={{ color: "white" }}>
        Sign out
      </button>
    </aside>
  )
}

export default Sidebar
