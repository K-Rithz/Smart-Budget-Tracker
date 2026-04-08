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
      passkey: '',
      isOnboarded: false,
      ...(overrides.profile || {}),
    },
    transactions: overrides.transactions || [],
  }
}

export function isValidPassword(password = '') {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/.test(password)
}

export function isValidPasskey(passkey = '') {
  return /^\d{4,6}$/.test(passkey)
}

export function validateOnboarding(input) {
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

  return {
    ok: true,
    value: {
      theme: input.theme === 'dark' ? 'dark' : 'light',
      profile: {
        name: input.name.trim(),
        email: input.email.trim().toLowerCase(),
        password: input.password,
        currency: input.currency || 'USD',
        passkey: input.passkey.trim(),
        isOnboarded: true,
      },
    },
  }
}

export function deriveSummary(appState) {
  const { profile, transactions } = appState

  let income = 0
  let expense = 0
  let addSavings = 0
  let useSavings = 0

  transactions.forEach((item) => {
    if (item.type === 'income') income += item.amount
    if (item.type === 'expense') {
      expense += item.amount
    }
    if (item.type === 'add_savings') addSavings += item.amount
    if (item.type === 'use_savings') useSavings += item.amount
  })

  const balance = income - expense - addSavings + useSavings
  const savingsBalance = addSavings - useSavings

  return {
    balance,
    savingsBalance,
  }
}
