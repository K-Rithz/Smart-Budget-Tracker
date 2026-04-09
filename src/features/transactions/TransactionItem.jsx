import { formatCurrency } from '../utils/currency'

const typeLabels = {
  income: 'Income',
  expense: 'Expense',
  add_savings: 'Add savings',
  use_savings: 'Use savings',
}

function TransactionItem({ item }) {
  return (
    <li className={`transaction-item transaction-item--${item.type}`}>
      <div>
        <strong>{item.category}</strong>
        <p>{item.note || typeLabels[item.type] || 'Transaction'}</p>
      </div>
      <div className="transaction-item__meta">
        <strong>{formatCurrency(item.amount, item.currency)}</strong>
        <span style={{ paddingLeft: "1rem" }}>{item.date}</span>
      </div>
    </li>
  )
}

export default TransactionItem
