import ProgressBar from '../../components/ui/ProgressBar'
import Card from '../../components/ui/Card'
import { formatCurrency } from '../../utils/currency'

function BudgetCard({ summary, currency }) {
  return (
    <Card className="metric-card metric-card--budget">
      <span className="metric-label">Monthly budget</span>
      <strong>{formatCurrency(summary.monthlyBudget, currency)}</strong>
      <ProgressBar value={summary.monthlyExpense} max={summary.monthlyBudget || 1} />
      <p>
        {formatCurrency(summary.monthlyExpense, currency)} spent in {summary.currentMonthLabel}
      </p>
    </Card>
  )
}

export default BudgetCard