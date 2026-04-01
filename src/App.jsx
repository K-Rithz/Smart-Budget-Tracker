import { useState } from 'react'
import PageShell from './components/layout/PageShell'
import AccountSetup from './features/auth/AccountSetup'
import Signin from './features/auth/Signin'
import Signup from './features/auth/Signup'
import { useBudgetApp } from './hooks/useBudgetApp'

export default function App() {
  const budgetApp = useBudgetApp()

  if (!budgetApp.profile.isOnboarded) {
    return <AuthGate budgetApp={budgetApp} initialMode="signup" />
  }

  if (!budgetApp.hasStoredCredentials) {
    return <AccountSetup budgetApp={budgetApp} />
  }

  if (!budgetApp.isAuthenticated) {
    return <AuthGate budgetApp={budgetApp} initialMode="signin" />
  }

  return (
    <PageShell
      activeView={budgetApp.activeView}
      onChangeView={budgetApp.setActiveView}
      profile={budgetApp.profile}
      theme={budgetApp.theme}
      onToggleTheme={budgetApp.toggleTheme}
      onSignOut={budgetApp.signOut}
      summary={budgetApp.summary}
    >
      <section className="dashboard-placeholder">
        <p className="eyebrow">Dashboard</p>
        <h1>Start building here</h1>
        <p>Add cards, charts, and tables once the team is ready.</p>
      </section>
    </PageShell>
  )
}

function AuthGate({ budgetApp, initialMode }) {
  const [mode, setMode] = useState(initialMode)

  return mode === 'signup' ? (
    <Signup budgetApp={budgetApp} onSwitchToSignIn={() => setMode('signin')} />
  ) : (
    <Signin budgetApp={budgetApp} onSwitchToSignUp={() => setMode('signup')} />
  )
}
