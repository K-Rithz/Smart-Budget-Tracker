import Sidebar from './Sidebar'

function PageShell({ children, activeView, onChangeView, profile, theme, onToggleTheme, onSignOut, summary }) {
  return (
    <div className={`app-shell theme-${theme}`}>
      <Sidebar
        activeView={activeView}
        onChangeView={onChangeView}
        profile={profile}
        theme={theme}
        onToggleTheme={onToggleTheme}
        onSignOut={onSignOut}
        summary={summary}
      />
      <main className="page-content">{children}</main>
    </div>
  )
}

export default PageShell
