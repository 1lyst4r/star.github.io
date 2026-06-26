export function HomePage({ className, intro, birthdayStats }) {
  // Variables
  const introSubtitleClassName = `intro-subtitle${intro.showIntroSubtitle ? " show" : ""}`;
  const aboutSectionClassName = `about-section${intro.showAboutSection ? " show" : ""}`;
  const statsRowClassName = `stats-row${intro.showStats ? " show" : ""}`;
  const countdownClassName = `birthday-countdown${birthdayStats.countdownComplete ? " is-complete" : ""}`;

  // Functions
  return (
    <div className={className} id="home-page">
      <span className="greeting-text" id="greeting-text-el">
        {intro.typedText}
        {intro.showCursor && <span className="typing-cursor" />}
      </span>
      <span className={introSubtitleClassName} id="intro-subtitle-el">
        My name is <span className="highlighted-name">star</span>
      </span>

      <div className={aboutSectionClassName} id="about-section-el">
        <h2>About Me</h2>
        <p>
          i'm a <strong>15 year old dumbass</strong> who makes things on the internet and gets demotivated after.
        </p>
        <div className="languages-row">
          <span className="language-badge">
            <span className="flag-emoji">US</span> English
          </span>
          <span className="language-badge">
            <span className="flag-emoji">ES</span> Spanish
          </span>
        </div>

        <div className={statsRowClassName} id="stats-row-el">
          <div className="stat-item">
            <span className="stat-label">age</span>
            <span className="stat-value" id="age-value-el">
              {birthdayStats.age}
            </span>
          </div>

          <div className={countdownClassName} id="countdown-showcase-el" hidden={birthdayStats.countdownHidden}>
            <div className="countdown-kicker">until aug 16</div>
            <div className="countdown-grid" aria-label="Countdown to August 16">
              <div className="countdown-unit">
                <span className="countdown-number" id="countdown-days-el">
                  {birthdayStats.countdown.days}
                </span>
                <span className="countdown-label">Days</span>
              </div>
              <div className="countdown-unit">
                <span className="countdown-number" id="countdown-hours-el">
                  {birthdayStats.countdown.hours}
                </span>
                <span className="countdown-label">Hours</span>
              </div>
              <div className="countdown-unit">
                <span className="countdown-number" id="countdown-minutes-el">
                  {birthdayStats.countdown.minutes}
                </span>
                <span className="countdown-label">Minutes</span>
              </div>
              <div className="countdown-unit">
                <span className="countdown-number" id="countdown-seconds-el">
                  {birthdayStats.countdown.seconds}
                </span>
                <span className="countdown-label">Seconds</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
