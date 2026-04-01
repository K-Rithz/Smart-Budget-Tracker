import { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { navItems } from './navItems'

function PageShell({ children, activeView, onChangeView, profile, theme, onToggleTheme, onSignOut, summary }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const activeItem = navItems.find((item) => item.id === activeView) ?? navItems[0]

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMobileMenuOpen])

  const handleChangeView = (view) => {
    onChangeView(view)
    setIsMobileMenuOpen(false)
  }

  return (
    <div className={`app-shell theme-${theme}`}>
      <div
        className={`mobile-nav-backdrop ${isMobileMenuOpen ? 'is-visible' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden={!isMobileMenuOpen}
      />
      <Sidebar
        activeView={activeView}
        onChangeView={handleChangeView}
        profile={profile}
        theme={theme}
        onToggleTheme={onToggleTheme}
        onSignOut={onSignOut}
        summary={summary}
        isMobileMenuOpen={isMobileMenuOpen}
        onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
      />
      <main className="page-content">
        <header className="mobile-topbar">
          <button
            type="button"
            className="mobile-topbar__menu"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <span />
            <span />
            <span />
          </button>
          <div className="mobile-topbar__copy">
            <p className="eyebrow">Smart Budget</p>
            <strong>{activeItem.label}</strong>
          </div>
          <button type="button" className="mobile-topbar__theme" onClick={onToggleTheme}>
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
        </header>
        {children}
      </main>
    </div>
  )
}

export default PageShell
