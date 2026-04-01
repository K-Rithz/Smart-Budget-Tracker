import { useState } from 'react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'

function SettingsView({ profile, theme, feedback, onSave, onToggleTheme, onReset }) {
  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email,
    password: profile.password,
    currency: profile.currency,
    monthlyBudget: profile.monthlyBudget,
    passkey: profile.passkey,
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSave(formData)
  }

  return (
    <div className="content-grid">
      <Card>
        <div className="section-heading">
          <div>
            <h2>Account settings</h2>
            <p>Changes save directly to localStorage.</p>
          </div>
        </div>

        <form className="settings-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input name="name" value={formData.name} onChange={handleChange} />
          </label>
          <label>
            Email
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>
          <label>
            Password
            <input
              type="password"
              minLength={6}
              name="password"
              value={formData.password}
              onChange={handleChange}
              title="At least 6 characters with uppercase, lowercase, number, and special character"
            />
          </label>
          <label>
            Currency
            <select name="currency" value={formData.currency} onChange={handleChange}>
              <option value="USD">USD</option>
              <option value="KHR">KHR</option>
              <option value="EUR">EUR</option>
            </select>
          </label>
          <label>
            Monthly budget
            <input
              type="number"
              min="0"
              step="0.01"
              name="monthlyBudget"
              value={formData.monthlyBudget}
              onChange={handleChange}
            />
          </label>
          <label>
            Passkey
            <input
              type="password"
              inputMode="numeric"
              minLength={4}
              maxLength={6}
              pattern="\d{4,6}"
              name="passkey"
              value={formData.passkey}
              onChange={handleChange}
              title="Passkey must be 4 to 6 digits only"
            />
          </label>

          {feedback ? <p className="form-feedback">{feedback}</p> : null}

          <Button className="primary-button" type="submit">
            Save changes
          </Button>
        </form>
      </Card>

      <Card>
        <div className="section-heading">
          <div>
            <h2>Appearance and reset</h2>
            <p>Theme changes apply immediately across the workspace.</p>
          </div>
        </div>

        <div className="settings-actions">
          <div className="settings-row">
            <div>
              <strong>Current theme</strong>
              <p>{theme === 'dark' ? 'Dark mode enabled' : 'Light mode enabled'}</p>
            </div>
            <Button className="secondary-button" onClick={onToggleTheme}>
              Toggle theme
            </Button>
          </div>
          <div className="settings-row danger-zone">
            <div>
              <strong>Reset all local data</strong>
              <p>This clears onboarding, transactions, goals, and preferences.</p>
            </div>
            <Button className="danger-button" onClick={onReset}>
              Reset app
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default SettingsView