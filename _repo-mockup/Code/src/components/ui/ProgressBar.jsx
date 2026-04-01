function ProgressBar({ value = 0, max = 100 }) {
  const safeMax = max <= 0 ? 100 : max
  const percent = Math.min(100, Math.max(0, (value / safeMax) * 100))

  return (
    <div className="progress">
      <div className="progress__bar" style={{ width: `${percent}%` }} />
    </div>
  )
}

export default ProgressBar