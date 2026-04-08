import { formatCurrency } from '../utils/currency'
import Card from '../../components/ui/Card'

function BalanceCard({ summary, currency }) {
  return (
    <Card className="metric-card metric-card--balance">
      <span className="metric-label">Available balance</span>
      <strong>{formatCurrency(summary.balance, currency)}</strong>
      <p>
        Income {formatCurrency(summary.totalIncome, currency)} vs expenses {formatCurrency(summary.totalExpense, currency)}
      </p>
    </Card>
  )
}

export default BalanceCard
