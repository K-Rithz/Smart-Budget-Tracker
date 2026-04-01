import { useState } from 'react'
import Button from '../../components/ui/Button'
import AuthShell from './AuthShell'

function AccountSetup({ budgetApp }) {
  const [accountData, setAccountData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setAccountData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    budgetApp.completeAccountSetup(accountData)
  }

  return (
    <AuthShell
      theme={budgetApp.theme}
      onToggleTheme={budgetApp.toggleTheme}
      title="Finish account setup"
      subtitle="Your saved budget data is still here. Add login credentials once so future visits require sign-in before opening the dashboard."
      features={[
        'Existing transactions and goals stay untouched',
        'This only adds account credentials to your saved profile',
        'Theme changes here use the same dashboard styling',
      ]}
    >
      <form className="onboarding-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            Email
            <input
              type="email"
              name="email"
              value={accountData.email}
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
              value={accountData.password}
              onChange={handleChange}
              placeholder="Create a password"
              minLength={6}
              title="At least 6 characters with uppercase, lowercase, number, and special character"
              required
            />
          </label>
        </div>

        {budgetApp.authFeedback ? <p className="form-feedback">{budgetApp.authFeedback}</p> : null}

        <div className="onboarding-actions">
          <Button className="primary-button" type="submit">
            Save account and continue
          </Button>
        </div>
      </form>
    </AuthShell>
  )
}

export default AccountSetup