import { useState } from 'react'
import Button from '../../components/ui/Button'

const noteHints = {
  income: 'Salary, freelance, side hustle...',
  expense: 'Required note for expense verification',
  add_savings: 'Optional note for moving money to savings',
  use_savings: 'Why are you using savings?',
}

function AddTransactionForm({ onSubmit, feedback, categoriesByType }) {
  const fallbackCategories = categoriesByType?.expense ?? []
  const [formData, setFormData] = useState({
    amount: '',
    type: 'expense',
    category: fallbackCategories[0] ?? '',
    date: new Date().toISOString().slice(0, 10),
    note: '',
  })

  const availableCategories = categoriesByType?.[formData.type] ?? fallbackCategories

  const handleChange = (event) => {
    const { name, value } = event.target
    if (name === 'type') {
      const nextCategories = categoriesByType?.[value] ?? fallbackCategories
      setFormData((prev) => ({
        ...prev,
        type: value,
        category: nextCategories.includes(prev.category) ? prev.category : nextCategories[0] ?? '',
      }))
      return
    }
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const result = onSubmit(formData)

    if (result?.ok) {
      setFormData((prev) => ({
        ...prev,
        amount: '',
        note: '',
        date: new Date().toISOString().slice(0, 10),
      }))
    }
  }

  return (
    <section className="form-card">
      <form className="add-transaction" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            Amount
            <input type="number" name="amount" min="0" step="0.01" value={formData.amount} onChange={handleChange} />
          </label>
          <label>
            Type
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
              <option value="add_savings">Add savings</option>
              <option value="use_savings">Use savings</option>
            </select>
          </label>
          <label>
            Category
            <select name="category" value={formData.category} onChange={handleChange}>
              {availableCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
          <label>
            Date
            <input type="date" name="date" value={formData.date} onChange={handleChange} />
          </label>
          <label className="form-grid__wide">
            Note
            <textarea
              rows="4"
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder={noteHints[formData.type]}
            />
          </label>
        </div>

        {feedback ? (
          <p className="form-feedback form-feedback--success add-transaction__feedback">
            {feedback.toUpperCase()}
          </p>
        ) : null}

        <Button className="primary-button" type="submit" style={{ height: "4rem", marginTop: "1.5rem" }}>
          Save record
        </Button>
      </form>
    </section>
  )
}

export default AddTransactionForm