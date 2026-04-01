import Card from '../../components/ui/Card'
import { formatCurrency } from '../../utils/currency'

function Charts({ summary, currency }) {
  const items = [
    { label: 'Income', value: summary.totalIncome, tone: 'income' },
    { label: 'Expense', value: summary.totalExpense, tone: 'expense' },
    { label: 'Add Savings', value: summary.totalAddedToSavings, tone: 'savings' },
    { label: 'Use Savings', value: summary.totalUsedFromSavings, tone: 'withdrawal' },
  ]

  const max = Math.max(...items.map((item) => item.value), 1)
  const total = items.reduce((sum, item) => sum + item.value, 0)
  const radius = 64
  const circumference = 2 * Math.PI * radius
  const toneColors = {
    income: '#46a06f',
    expense: '#d35f4d',
    savings: '#2a7f8d',
    withdrawal: '#8c63d6',
  }

  let offset = 0
  const slices = items.map((item) => {
    const fraction = total ? item.value / total : 0
    const strokeLength = fraction * circumference
    const dashArray = `${strokeLength} ${circumference - strokeLength}`
    const strokeDashoffset = -offset
    offset += strokeLength

    return {
      ...item,
      percent: fraction * 100,
      dashArray,
      strokeDashoffset,
      color: toneColors[item.tone],
    }
  })

  return (
    <Card className="chart-card">
      <div className="section-heading">
        <div>
          <h2>Record mix</h2>
          <p>Analysis from your budget records</p>
        </div>
      </div>

      <div className="chart-visual">
        <div className="chart-pie" aria-hidden="true">
          <svg viewBox="0 0 180 180" role="img">
            <circle className="chart-pie__base" cx="90" cy="90" r={radius} />
            <g transform="rotate(-90 90 90)">
              {slices.map((item) =>
                item.value ? (
                  <circle
                    key={item.label}
                    cx="90"
                    cy="90"
                    r={radius}
                    fill="none"
                    stroke={item.color}
                    strokeWidth="28"
                    strokeDasharray={item.dashArray}
                    strokeDashoffset={item.strokeDashoffset}
                  />
                ) : null
              )}
            </g>
          </svg>
          <div className="chart-pie__center">
            <strong>{formatCurrency(total, currency)}</strong>
            <span>Total</span>
          </div>
        </div>

        <div className="chart-legend">
          {slices.map((item) => (
            <div className="chart-legend__item" key={item.label}>
              <span className={`chart-dot chart-dot--${item.tone}`} />
              <div>
                <strong>{item.label}</strong>
                <p>{total ? `${item.percent.toFixed(0)}% of total records` : '0% of total records'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="chart-bars">
        {items.map((item) => (
          <div className="chart-row" key={item.label}>
            <div className="chart-row__meta">
              <span>{item.label}</span>
              <strong>{formatCurrency(item.value, currency)}</strong>
            </div>
            <div className="chart-track">
              <div
                className={`chart-fill chart-fill--${item.tone}`}
                style={{ width: `${Math.max((item.value / max) * 100, item.value ? 12 : 0)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default Charts