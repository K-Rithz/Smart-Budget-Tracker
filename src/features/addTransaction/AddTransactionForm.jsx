import { useState } from "react";
import { categoriesByType as defaultCategoriesByType } from "./data/categories";

const noteHints = {
  income: 'Salary, freelance, side hustle...',
  expense: 'Required note for expense verification',
  add_savings: 'Optional note for moving money to savings',
  use_savings: 'Why are you using savings?',
}

function AddTransactionForm({ onSubmit, feedback, categoriesByType: categoriesByTypeProp }) {
  const categoriesByType = categoriesByTypeProp ?? defaultCategoriesByType
  const transactionTypes = Object.keys(categoriesByType)
  const initialType = categoriesByType.expense ? 'expense' : (transactionTypes[0] ?? 'expense')
  const fallbackCategories = categoriesByType?.[initialType] ?? []
  const [formData, setFormData] = useState({
    amount: '',
    type: initialType,
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
    <section className="atform-card">
      <form className="add-transaction" onSubmit={handleSubmit}>
        <div className="atform-grid">
          <label>
            Amount
            <input
              type="number"
              name="amount"
              min="0"
              step="0.01"
              value={formData.amount}
              onChange={handleChange}
            />
          </label>
          <label>
            Type
            <select name="type" value={formData.type} onChange={handleChange}>
              {transactionTypes.map((type) => (
                <option key={type} value={type}>
                  {type.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
                </option>
              ))}
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
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </label>
          <label className="atform-grid__wide">
            Note
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder={noteHints[formData.type]}
            />
          </label>
        </div>

        {feedback && (
          <p className="form-feedback" style={{ color: "var(--accent)" }}>{feedback}</p>
        )}

        <button className="savebtn" type="submit">Save Record</button>
      </form>
    </section>
  )
}

export default AddTransactionForm
