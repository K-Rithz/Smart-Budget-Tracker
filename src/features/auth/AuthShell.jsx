function AuthShell({ theme, onToggleTheme, title, subtitle, features, themeLabel = 'Theme', children }) {
  return (
    <div className={`onboarding-shell theme-${theme}`}>
      <section className="onboarding-panel">
        <div className="onboarding-copy">
          <p className="eyebrow">Smart Budget Tracker</p>
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <ul className="feature-list">
            {features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>

          <div className="theme-picker theme-picker--corner">
            <div>
              <div className="toggle-row">
                <span>{themeLabel}</span>
                <button
                  type="button"
                  className={theme === 'light' ? 'is-active' : ''}
                  onClick={() => theme !== 'light' && onToggleTheme()}
                >
                  Light
                </button>
                <button
                  type="button"
                  className={theme === 'dark' ? 'is-active' : ''}
                  onClick={() => theme !== 'dark' && onToggleTheme()}
                >
                  Dark
                </button>
              </div>
            </div>
          </div>
        </div>

        {children}
      </section>
    </div>
  )
}

export default AuthShell
