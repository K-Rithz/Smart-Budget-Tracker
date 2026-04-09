
import { useState } from 'react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import ProgressBar from '../../components/ui/ProgressBar'
import { formatCurrency } from '../utils/currency'

function SavingsGoalsPanel({ goals, savingsBalance, currency, onAddGoal }) {
  const [goalForm, setGoalForm] = useState({ name: '', target: '' })

  const handleSubmit = (event) => {
    event.preventDefault()
    onAddGoal(goalForm)
    setGoalForm({ name: '', target: '' })
  }

  return (
    <Card className="goals-card">
      <div className="section-heading">
        <div>
          <h2>Savings goals</h2>
          <p>Each goal compares against the total savings you currently hold.</p>
        </div>
      </div>

      <form className="inline-form" onSubmit={handleSubmit}>
        <input
          placeholder="Goal name"
          value={goalForm.name}
          onChange={(event) => setGoalForm((prev) => ({ ...prev, name: event.target.value }))}
        />
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="Target"
          value={goalForm.target}
          onChange={(event) => setGoalForm((prev) => ({ ...prev, target: event.target.value }))}
        />
        <Button className="sprimary-button" type="submit">
          Add goal
        </Button>
      </form>

      <div className="goal-list">
        {goals.length ? (
          goals.map((goal) => (
            <article className="goal-item" key={goal.id}>
              <div className="goal-item__header">
                <strong>{goal.name}</strong>
                <span>{formatCurrency(goal.target, currency)}</span>
              </div>
              <ProgressBar value={savingsBalance} max={goal.target || 1} />
              <p>
                {formatCurrency(savingsBalance, currency)} saved toward {goal.name}
              </p>
            </article>
          ))
        ) : (
          <p className="empty-state">No goals yet. Add one to track savings progress.</p>
        )}
      </div>
    </Card>
  )
}

export default SavingsGoalsPanel
