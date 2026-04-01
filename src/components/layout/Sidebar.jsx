import { formatCurrency } from '../../features/utils/currency'

const navItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'add', label: 'Add Record' },
  { id: 'transactions', label: 'Transaction History' },
  { id: 'savings', label: 'Savings' },
  { id: 'settings', label: 'Settings' },
]

export default function Sidebar({ activeView, onChangeView, profile, theme, onToggleTheme, onSignOut, summary }) {
  return (
    <aside className="sidebar">
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
            onClick={() => onChangeView(item.id)}
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
      <button type="button" className="secondary-button" onClick={onSignOut} style={{ color: 'white' }}>
        Sign out
      </button>
    </aside>
  )
}
