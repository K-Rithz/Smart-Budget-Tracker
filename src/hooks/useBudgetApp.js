import { useEffect, useMemo, useState } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { categories } from '../features/addTransaction/data/categories'
import {
  buildInitialAppState,
  deriveSummary,
  getCurrentMonth,
  isValidPasskey,
  isValidPassword,
  validateOnboarding,
} from '../features/utils/data'

const STORAGE_KEY = 'smart-budget-tracker.app'

export function useBudgetApp() {
  const [appState, setAppState] = useLocalStorage(STORAGE_KEY, buildInitialAppState())
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeView, setActiveView] = useState('overview')
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    category: 'all',
    month: getCurrentMonth(),
  })
  const [settingsFeedback, setSettingsFeedback] = useState('')
  const [onboardingFeedback, setOnboardingFeedback] = useState('')
  const [authFeedback, setAuthFeedback] = useState('')

  const hasStoredCredentials = Boolean(appState.profile.email && appState.profile.password)

  useEffect(() => {
    document.documentElement.dataset.theme = appState.theme
  }, [appState.theme])

  const summary = useMemo(() => deriveSummary(appState), [appState])

  const filteredTransactions = useMemo(() => {
    return appState.transactions.filter((item) => {
      const matchesSearch = filters.search
        ? `${item.category} ${item.note}`.toLowerCase().includes(filters.search.toLowerCase())
        : true
      const matchesType = filters.type === 'all' ? true : item.type === filters.type
      const matchesCategory = filters.category === 'all' ? true : item.category === filters.category
      const matchesMonth = filters.month ? item.date.slice(0, 7) === filters.month : true
      return matchesSearch && matchesType && matchesCategory && matchesMonth
    })
  }, [appState.transactions, filters])

  const completeOnboarding = (input) => {
    const validation = validateOnboarding(input)
    if (!validation.ok) {
      setOnboardingFeedback(validation.message)
      return validation
    }

    const nextState = buildInitialAppState({
      theme: validation.value.theme,
      profile: validation.value.profile,
    })

    setAppState(nextState)
    setIsAuthenticated(true)
    setOnboardingFeedback('')
    setAuthFeedback('')
    return { ok: true }
  }

  const signIn = (input) => {
    const email = input.email?.trim().toLowerCase()
    const password = input.password ?? ''

    if (!email || !password) {
      setAuthFeedback('Enter your email and password to continue.')
      return { ok: false }
    }

    if (email !== appState.profile.email || password !== appState.profile.password) {
      setAuthFeedback('Incorrect email or password.')
      return { ok: false }
    }

    setIsAuthenticated(true)
    setAuthFeedback('')
    return { ok: true }
  }

  const completeAccountSetup = (input) => {
    const email = input.email?.trim().toLowerCase()
    const password = input.password ?? ''

    if (!email) {
      setAuthFeedback('Email is required to finish account setup.')
      return { ok: false }
    }

    if (!isValidPassword(password)) {
      setAuthFeedback(
        'Password must be at least 6 characters and include an uppercase letter, lowercase letter, number, and special character.',
      )
      return { ok: false }
    }

    setAppState((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        email,
        password,
      },
    }))
    setIsAuthenticated(true)
    setAuthFeedback('')
    return { ok: true }
  }

  const signOut = () => {
    setIsAuthenticated(false)
    setActiveView('overview')
    setAuthFeedback('')
  }

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      type: 'all',
      category: 'all',
      month: getCurrentMonth(),
    })
  }

  const updateSettings = (input) => {
    if (!input.name.trim()) {
      setSettingsFeedback('Name is required.')
      return
    }
    if (!input.email.trim()) {
      setSettingsFeedback('Email is required.')
      return
    }
    if (!isValidPassword(input.password)) {
      setSettingsFeedback(
        'Password must be at least 6 characters and include an uppercase letter, lowercase letter, number, and special character.',
      )
      return
    }
    if (!isValidPasskey(input.passkey)) {
      setSettingsFeedback('Passkey must be 4 to 6 digits and contain numbers only.')
      return
    }

    setAppState((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        name: input.name.trim(),
        email: input.email.trim().toLowerCase(),
        password: input.password,
        currency: input.currency,
        passkey: input.passkey.trim(),
      },
    }))
    setSettingsFeedback('Settings saved successfully.')
  }

  const toggleTheme = () => {
    setAppState((prev) => ({
      ...prev,
      theme: prev.theme === 'dark' ? 'light' : 'dark',
    }))
  }

  const resetAllData = () => {
    setAppState(buildInitialAppState())
    setIsAuthenticated(false)
    setActiveView('overview')
    setSettingsFeedback('')
    setOnboardingFeedback('')
    setAuthFeedback('')
  }

  return {
    isAuthenticated,
    hasStoredCredentials,
    activeView,
    setActiveView,
    filters,
    updateFilter,
    clearFilters,
    filteredTransactions,
    settingsFeedback,
    onboardingFeedback,
    authFeedback,
    completeOnboarding,
    completeAccountSetup,
    signIn,
    signOut,
    profile: appState.profile,
    theme: appState.theme,
    toggleTheme,
    summary,
    categories,
    updateSettings,
    resetAllData,
  }
}
