import { useState } from 'react'
import Button from '../../components/ui/Button'
import AuthShell from './AuthShell'

function Signin({ budgetApp, onSwitchToSignUp }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setCredentials((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    budgetApp.signIn(credentials)
  }

  return (
    <AuthShell
      theme={budgetApp.theme}
      onToggleTheme={budgetApp.toggleTheme}
      title="Welcome back"
      subtitle="Sign in with the account stored on this device to open your saved budget dashboard with the same theme and data."
      features={[
        'Your budget data stays saved in local storage',
        'You must sign in again whenever you return to the app',
        'Theme changes here immediately match the dashboard',
      ]}
    >
      <form className="onboarding-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            Email
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
              minLength={6}
              required
            />
            {budgetApp.authFeedback ? <p className="form-feedback">{budgetApp.authFeedback}</p> : null}
          </label>
        </div>

        <div className="onboarding-actions">
          <Button className="primary-button primary-button--compact" type="submit">
            Sign in
          </Button>
          <button type="button" className="auth-link" style={{ marginTop: '-3rem' }} onClick={onSwitchToSignUp}>
            Doesn't have an account? Create one
          </button>
          <button type="button" className="auth-link" style={{ marginTop: '-3rem' }} onClick={budgetApp.resetAllData}>
            Clear local data
          </button>
        </div>
      </form>
    </AuthShell>
  )
}

export default Signin