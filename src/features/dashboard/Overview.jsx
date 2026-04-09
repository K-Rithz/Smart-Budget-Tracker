import BalanceCard from './BalanceCard'
import BudgetCard from './BudgetCard'
import SavingsCard from './SavingsCard'
import Charts from './Charts'
import TransactionList from './TransactionList'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'

function Overview({
  summary,
  filters,
  transactions,
  categories,
  onFilterChange,
  onClearFilters,
  onQuickAdd,
  currency,
  feedback,
}) {
  return (
    <section className="dashboard">
      <header className="section-header">
        <div>
          <p className="eyebrow" style={{ color: 'var(--accent)' }}>Overview</p>
          <h1>Budget Control Center</h1>
          <p>Track balance, this month's budget usage, savings transfers, and the latest records in one place.</p>
        </div>
        <Button className="primary-button" onClick={() => onQuickAdd('add')}>
          Add transaction
        </Button>
      </header>

      {feedback ? (
        <Card className="feedback-card">
          <p className="eyebrow">Recent Activity</p>
          <p>{feedback.toUpperCase()}</p>
        </Card>
      ) : null}

      <div className="dashboard__cards">
        <BalanceCard summary={summary} currency={currency} />
        <BudgetCard summary={summary} currency={currency} />
        <SavingsCard summary={summary} currency={currency} />
      </div>

      <div className="content-grid">
        <Charts summary={summary} currency={currency} />
        <TransactionList
          transactions={transactions.slice(0, 6)}
          filters={filters}
          onFilterChange={onFilterChange}
          onClearFilters={onClearFilters}
          categories={categories}
        />
      </div>
    </section>
  )
}

export default Overview