export const expenseCategories = [
  'Grocery',
  'Transport',
  'Education',
  'Utilities',
  'Health',
  'Entertainment',
  'Shopping',
  'Technology',
  'Other',
]

export const incomeCategories = ['Salary', 'Business', 'Freelance', 'Property-renting', 'Other']

export const savingsCategories = ['Saving', 'Emergency']

export const categoriesByType = {
  income: incomeCategories,
  expense: expenseCategories,
  add_savings: savingsCategories,
  use_savings: savingsCategories,
}

export const categories = Array.from(
  new Set([...incomeCategories, ...expenseCategories, ...savingsCategories]),
)