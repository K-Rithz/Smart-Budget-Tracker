export function getCurrentMonth() {
  return new Date().toISOString().slice(0, 7)
}

export function buildInitialAppState(overrides = {}) {
  return {
    theme: overrides.theme || 'light',
    profile: {
      name: '',
      email: '',
      password: '',
      currency: 'USD',
      monthlyBudget: 0,
      initialBalance: 0,
      initialSavings: 0,
      passkey: '',
      isOnboarded: false,
      ...(overrides.profile || {}),
    },
    transactions: overrides.transactions || [],
    savingsGoals: overrides.savingsGoals || [],
  }
}

export function createTransaction(data = {}, currency = 'USD') {
  return {
    id: data.id || `tx_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    amount: Number(data.amount) || 0,
    type: data.type || 'expense',
    category: data.category || 'Other',
    date: data.date || new Date().toISOString().slice(0, 10),
    note: data.note?.trim() || '',
    currency,
  }
}

export function createSavingsGoal(goal = {}) {
  return {
    id: goal.id || `goal_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    name: goal.name?.trim() || 'Untitled Goal',
    target: Number(goal.target) || 0,
  }
}

export function isSensitiveType(type) {
  return type === 'expense' || type === 'use_savings'
}

export function isValidPassword(password = '') {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/.test(password)
}

export function isValidPasskey(passkey = '') {
  return /^\d{4,6}$/.test(passkey)
}

export function validateTransaction(input, currentBalance, currentSavings) {
  const amount = Number(input.amount)
  const value = {
    amount,
    type: input.type,
    category: input.category?.trim() || 'Other',
    date: input.date || new Date().toISOString().slice(0, 10),
    note: input.note?.trim() || '',
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    return { ok: false, message: 'Amount must be greater than zero.' }
  }

  if (!value.category) {
    return { ok: false, message: 'Category is required.' }
  }

  if (value.type === 'expense' && !value.note) {
    return { ok: false, message: 'Expense records require a note.' }
  }

  if ((value.type === 'expense' || value.type === 'add_savings') && amount > currentBalance) {
    return { ok: false, message: 'Not enough available balance for this action.' }
  }

  if (value.type === 'use_savings' && amount > currentSavings) {
    return { ok: false, message: 'Not enough savings available for this action.' }
  }

  return { ok: true, value }
}

export function validateOnboarding(input) {
  const monthlyBudget = Number(input.monthlyBudget)
  const initialBalance = Number(input.initialBalance)
  const initialSavings = Number(input.initialSavings || 0)
  const goalTarget = Number(input.goalTarget || 0)

  if (!input.name?.trim()) {
    return { ok: false, message: 'Your name is required to finish onboarding.' }
  }

  if (!input.email?.trim()) {
    return { ok: false, message: 'Email is required to create your account.' }
  }

  if (!isValidPassword(input.password)) {
    return {
      ok: false,
      message:
        'Password must be at least 6 characters and include an uppercase letter, lowercase letter, number, and special character.',
    }
  }

  if (!isValidPasskey(input.passkey)) {
    return { ok: false, message: 'Passkey must be 4 to 6 digits and contain numbers only.' }
  }

  if (!Number.isFinite(monthlyBudget) || monthlyBudget < 0) {
    return { ok: false, message: 'Monthly budget must be zero or greater.' }
  }

  if (!Number.isFinite(initialBalance) || initialBalance < 0) {
    return { ok: false, message: 'Opening balance must be zero or greater.' }
  }

  if (!Number.isFinite(initialSavings) || initialSavings < 0) {
    return { ok: false, message: 'Opening savings must be zero or greater.' }
  }

  return {
    ok: true,
    value: {
      theme: input.theme === 'dark' ? 'dark' : 'light',
      profile: {
        name: input.name.trim(),
        email: input.email.trim().toLowerCase(),
        password: input.password,
        currency: input.currency || 'USD',
        monthlyBudget,
        initialBalance,
        initialSavings,
        passkey: input.passkey.trim(),
        isOnboarded: true,
      },
      goal:
        input.goalName?.trim() && goalTarget > 0
          ? {
              name: input.goalName.trim(),
              target: goalTarget,
            }
          : null,
    },
  }
}

export function deriveSummary(appState) {
  const { profile, transactions, savingsGoals } = appState
  const currentMonth = getCurrentMonth()

  let income = 0
  let expense = 0
  let addSavings = 0
  let useSavings = 0
  let monthlyExpense = 0

  transactions.forEach((item) => {
    if (item.type === 'income') income += item.amount
    if (item.type === 'expense') {
      expense += item.amount
      if (item.date.slice(0, 7) === currentMonth) {
        monthlyExpense += item.amount
      }
    }
    if (item.type === 'add_savings') addSavings += item.amount
    if (item.type === 'use_savings') useSavings += item.amount
  })

  const balance = profile.initialBalance + income - expense - addSavings + useSavings
  const savingsBalance = profile.initialSavings + addSavings - useSavings
  const topGoalTarget = savingsGoals.reduce((max, goal) => Math.max(max, goal.target), 0)

  return {
    totalIncome: income,
    totalExpense: expense,
    totalAddedToSavings: addSavings,
    totalUsedFromSavings: useSavings,
    balance,
    savingsBalance,
    monthlyBudget: profile.monthlyBudget,
    monthlyExpense,
    currentMonthLabel: new Date(`${currentMonth}-01`).toLocaleDateString(undefined, {
      month: 'long',
      year: 'numeric',
    }),
    topGoalTarget,
    goalCount: savingsGoals.length,
  }
}
