import Dashboard from '../dashboard/Dashboard'
import SettingsView from '../setting/Setting'
import AddTransactionForm from '../addTransaction/AddTransactionForm';

function MainView({ budgetApp }) {
  const {
    activeView,
    filters,
    filteredTransactions,
    summary,
    transactionFeedback,
    updateFilter,
    clearFilters,
    settingsFeedback,
    updateSettings,
    resetAllData,
    profile,
  } = budgetApp

  if (activeView === 'add') {
    return (
      <section className="view-section">
        <header className="section-header">
          <div>
            <p className="topdescription" style={{ color: "var(--accent)" }}>Create Record</p>
            <h1>Add a transaction</h1>
            <p>Add record for your income, expense, add-saving, and use-saving here</p>
          </div>
        </header>
        <AddTransactionForm />
      </section>
    )
  }

  if (activeView === 'transactions') {
    return (
      <section className="view-section">
        <header className="section-header">
          <div>
            <p className="topdescription" style={{ color: "var(--accent)" }}>Records</p>
            <h1>Transaction history</h1>
            <p>These are what you've spent so far</p>
          </div>
        </header>
      </section>
    )
  }

  if (activeView === 'savings') {
    return (
      <section className="view-section">
        <header className="section-header">
          <div>
            <p className="topdescription" style={{ color: "var(--accent)" }}>Savings</p>
            <h1>Savings goals and transfers</h1>
            <p>Wanting an item and not having enough money? Start saving for it now</p>
          </div>
        </header>
      </section>
    )
  }

  if (activeView === 'settings') {
    return (
        <section className="view-section">
          <header className="section-header">
            <div>
              <p className="topdescription" style={{ color: "var(--accent)" }}>Settings</p>
              <h1>Profile and security</h1>
              <p>Update your monthly budget, appearance, and passkey without leaving the app.</p>
            </div>
          </header>
          <SettingsView
          profile={profile}
          theme={budgetApp.theme}
          feedback={settingsFeedback}
          onSave={updateSettings}
          onToggleTheme={budgetApp.toggleTheme}
          onReset={resetAllData}/>
        </section>
        
    )
  }

  return (
    <Dashboard
      summary={summary}
      filters={filters}
      transactions={filteredTransactions}
      categories={budgetApp.categories}
      onFilterChange={updateFilter}
      onClearFilters={clearFilters}
      onQuickAdd={budgetApp.setActiveView}
      currency={profile.currency}
      feedback={transactionFeedback}
    />
  )
}

export default MainView
