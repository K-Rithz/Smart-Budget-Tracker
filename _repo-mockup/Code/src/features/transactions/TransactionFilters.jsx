function TransactionFilters({ filters, onFilterChange, categories }) {
  return (
    <div className="transaction-filters">
      <label>
        Search
        <input value={filters.search} onChange={(event) => onFilterChange('search', event.target.value)} />
      </label>
      <label>
        Type
        <select value={filters.type} onChange={(event) => onFilterChange('type', event.target.value)}>
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
          <option value="add_savings">Add savings</option>
          <option value="use_savings">Use savings</option>
        </select>
      </label>
      <label>
        Category
        <select value={filters.category} onChange={(event) => onFilterChange('category', event.target.value)}>
          <option value="all">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
      <label>
        Month
        <input type="month" value={filters.month} onChange={(event) => onFilterChange('month', event.target.value)} />
      </label>
    </div>
  )
}

export default TransactionFilters