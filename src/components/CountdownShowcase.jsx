export function CountdownShowcase({ className, countdown, countdownInfo, hidden }) {
  // Functions
  return (
    <div className={className} id="countdown-showcase-el" hidden={hidden}>
      <div className="countdown-kicker">{countdownInfo.kicker}</div>
      <div className="countdown-grid" aria-label={countdownInfo.ariaLabel}>
        {countdownInfo.units.map((unit) => (
          <div className="countdown-unit" key={unit.key}>
            <span className="countdown-number">{countdown[unit.key]}</span>
            <span className="countdown-label">{unit.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
