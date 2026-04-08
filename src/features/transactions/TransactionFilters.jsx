import '../../styles/transaction.css'
function TransactionFilters({ filters, onFilterChange, onClearFilters, categories = [] }) {
  return (
    <div className="transaction-filters">
      <label>
        <span>Search</span>
        <input
          type="search"
          value={filters.search}
          onChange={(event) => onFilterChange('search', event.target.value)}
        />
      </label>

      <label>
        <span>Type</span>
        <select value={filters.type} onChange={(event) => onFilterChange('type', event.target.value)}>
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
          <option value="add_savings">Add savings</option>
          <option value="use_savings">Use savings</option>
        </select>
      </label>

      <label>
        <span>Category</span>
        <select value={filters.category} onChange={(event) => onFilterChange('category', event.target.value)}>
          <option value="all">All</option>
          {categories.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>Month</span>
        <input
          type="month"
          value={filters.month}
          onChange={(event) => onFilterChange('month', event.target.value)}
        />
      </label>

      <button className="transaction-filters__clear" type="button" onClick={onClearFilters}>
        Clear filters
      </button>
    </div>
  )
}

export default TransactionFilters
