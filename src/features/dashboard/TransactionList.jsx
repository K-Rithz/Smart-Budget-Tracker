import Card from '../../components/ui/Card'
import TransactionItem from '../transactions/TransactionItem'
import TransactionFilters from '../transactions/TransactionFilters'

function TransactionList({
  transactions = [],
  filters = {},
  onFilterChange,
  onClearFilters,
  categories = [],
  fullWidth = false,
}) {
  return (
    <Card className={`transaction-panel ${fullWidth ? 'transaction-panel--full' : ''}`}>
      <div className="transaction-panel__controls">
        <div className="section-heading">
          <div>
            <h2 className="transaction-panel__title">Transactions</h2>
            <p className="transaction-panel__subtitle">
              Filtered, view-only history with every record type.
            </p>
          </div>
        </div>

        <TransactionFilters
          filters={filters}
          onFilterChange={onFilterChange}
          onClearFilters={onClearFilters}
          categories={categories}
        />
      </div>

      <div className="transaction-panel__divider" style={{ marginTop: "0.5rem" }}/>

      <ul className="transaction-list">
        {transactions.length ? (
          transactions.map((item) => <TransactionItem key={item.id} item={item} />)
        ) : (
          <li className="empty-state">No transactions match the current filters.</li>
        )}
      </ul>
    </Card>
  )
}

export default TransactionList