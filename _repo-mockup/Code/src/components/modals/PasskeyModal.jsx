import { useState } from 'react'
import Button from '../ui/Button'

function PasskeyModal({ pendingAction, onCancel, onConfirm }) {
  const [passkey, setPasskey] = useState('')

  if (!pendingAction) return null

  const handleSubmit = (event) => {
    event.preventDefault()
    onConfirm(passkey)
    setPasskey('')
  }

  const handleClose = () => {
    setPasskey('')
    onCancel()
  }

  return (
    <div className="modal-backdrop">
      <section className="modal-card">
        <p className="eyebrow">Passkey required</p>
        <h2>Confirm sensitive action</h2>
        <p>{pendingAction.message}</p>
        <form onSubmit={handleSubmit}>
          <label>
            Enter passkey
            <input
              autoFocus
              type="password"
              inputMode="numeric"
              value={passkey}
              onChange={(event) => setPasskey(event.target.value)}
              placeholder="Passkey"
              pattern="\d{4,6}"
              minLength={4}
              maxLength={6}
            />
          </label>
          {pendingAction.error ? <p className="form-feedback">{pendingAction.error}</p> : null}
          <div className="modal-actions" style={{ marginTop: "1rem" }}>
            <Button className="secondary-button" type="button" onClick={handleClose}>
              Cancel
            </Button>
            <Button className="primary-button" type="submit" style={{ height: "4rem" }}>
              Confirm
            </Button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default PasskeyModal