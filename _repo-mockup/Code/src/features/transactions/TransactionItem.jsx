import { formatCurrency } from '../../utils/currency'

const typeLabels = {
  income: 'Income',
  expense: 'Expense',
  add_savings: 'Add Savings',
  use_savings: 'Use Savings',
}

function TransactionItem({ item }) {
  if (!item) return null

  return (
    <li className="transaction-item">
      <div className="transaction-item__main">
        <div className="transaction-item__title">
          <strong>{item.category}</strong>
          <span className={`record-badge record-badge--${item.type}`}>{typeLabels[item.type]}</span>
        </div>
        <p>{item.note || 'No note added'}</p>
      </div>

      <div className="transaction-item__meta">
        <strong>{formatCurrency(item.amount, item.currency)}</strong>
        <span>{new Date(item.date).toLocaleDateString()}</span>
      </div>
    </li>
  )
}

export default TransactionItem