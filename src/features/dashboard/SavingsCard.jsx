import ProgressBar from '../../components/ui/ProgressBar'
import Card from '../../components/ui/Card'
import { formatCurrency } from '../utils/currency'

function SavingsCard({ summary, currency }) {
  return (
    <Card className="metric-card metric-card--savings">
      <span className="metric-label">Savings balance</span>
      <strong>{formatCurrency(summary.savingsBalance, currency)}</strong>
      <ProgressBar value={summary.savingsBalance} max={summary.topGoalTarget || 1} />
      <p>
        {summary.goalCount} goals active, top target {formatCurrency(summary.topGoalTarget, currency)}
      </p>
    </Card>
  )
}

export default SavingsCard
