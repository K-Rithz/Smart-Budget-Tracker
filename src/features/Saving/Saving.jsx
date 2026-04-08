import Card from '../../components/ui/Card'
import SavingsGoalsPanel from './SavingsGoalsPanel'
import { formatCurrency } from '../utils/currency'

export default function Saving({ summary, profile, budgetApp }) {
  const handleAddGoal = (goal) => {
    budgetApp.addSavingsGoal(goal)
  }

  return (
    <div className="content-grid">
      <Card className="spotlight-card">
        <span className="metric-label">Savings balance</span>
        <strong>{formatCurrency(summary.savingsBalance, profile.currency)}</strong>
        <p>{summary.goalCount} active goals</p>
      </Card>
      <SavingsGoalsPanel
        goals={budgetApp.savingsGoals}
        savingsBalance={summary.savingsBalance}
        currency={profile.currency}
        onAddGoal={handleAddGoal}
      />
    </div>
  )
}
