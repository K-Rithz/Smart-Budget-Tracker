import { useState } from 'react'
import PageShell from './components/layout/PageShell'
import Passkey from './components/popup/Passkey'
import AccountSetup from './features/auth/AccountSetup'
import Signin from './features/auth/Signin'
import Signup from './features/auth/Signup'
import { useBudgetApp } from './hooks/useBudgetApp'
import MainView from './features/app/MainView'

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
    <>
      <PageShell
        activeView={budgetApp.activeView}
        onChangeView={budgetApp.setActiveView}
        profile={budgetApp.profile}
        theme={budgetApp.theme}
        onToggleTheme={budgetApp.toggleTheme}
        onSignOut={budgetApp.signOut}
        summary={budgetApp.summary}
      >
        <MainView budgetApp={budgetApp} />
      </PageShell>
      <Passkey
        pendingAction={budgetApp.pendingAction}
        onCancel={budgetApp.cancelPendingAction}
        onConfirm={budgetApp.confirmPendingAction}
      />
    </>
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
