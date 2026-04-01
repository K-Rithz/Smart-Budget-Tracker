import { useState } from 'react'
import Button from '../../components/ui/Button'
import AuthShell from './AuthShell'

function Signup({ budgetApp, onSwitchToSignIn }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    password: '',
    passkey: '',
    currency: 'USD',
    monthlyBudget: 0,
    initialBalance: 0,
    initialSavings: 0,
    goalName: '',
    goalTarget: 0,
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    budgetApp.completeOnboarding({ ...formData, theme: budgetApp.theme })
  }

  return (
    <AuthShell
      theme={budgetApp.theme}
      onToggleTheme={budgetApp.toggleTheme}
      title="Set up your budget workspace"
      subtitle="We'll store your profile details and preferences locally so your dashboard is ready the next time you open the app."
      features={[
        'Profile and security details saved in local storage',
        'Passkey confirmation for expenses and savings withdrawals',
        'Theme preference and data persisted between sessions',
      ]}
      themeLabel="Starting theme"
    >
      <form className="onboarding-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            Full name
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Jeff" required />
          </label>
          <label>
            Age
            <input
              type="number"
              min="1"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="18"
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
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
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              minLength={6}
              title="At least 6 characters with uppercase, lowercase, number, and special character"
              required
            />
          </label>
          <label>
            Passkey
            <input
              type="password"
              inputMode="numeric"
              name="passkey"
              value={formData.passkey}
              onChange={handleChange}
              placeholder="4 to 6 digits"
              pattern="[0-9]{4,6}"
              minLength={4}
              maxLength={6}
              title="Passkey must be 4 to 6 digits only"
              required
            />
          </label>
        </div>

        {budgetApp.onboardingFeedback ? <p className="form-feedback">{budgetApp.onboardingFeedback}</p> : null}

        <div className="onboarding-actions">
          <Button className="primary-button primary-button--compact" type="submit">
            Launch budget dashboard
          </Button>
          <button type="button" className="auth-link" style={{ justifySelf: 'center' }} onClick={onSwitchToSignIn}>
            Already have an account? Sign in
          </button>
        </div>
      </form>
    </AuthShell>
  )
}

export default Signup
