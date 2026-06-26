import { birthdayCountdown, profileStats } from "../data/contributions.js";
import { profile } from "../data/profile.js";
import { CountdownShowcase } from "../components/CountdownShowcase.jsx";
import { StatCard } from "../components/StatCard.jsx";

function AboutDescription({ parts }) {
  // Functions
  return (
    <p>
      {parts.map((part, index) =>
        part.strong ? (
          <strong key={`${part.text}-${index}`}>{part.text}</strong>
        ) : (
          <span key={`${part.text}-${index}`}>{part.text}</span>
        )
      )}
    </p>
  );
}

function LanguageBadge({ language }) {
  // Functions
  return (
    <span className="language-badge">
      <span className="flag-emoji">{language.code}</span> {language.label}
    </span>
  );
}

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
        {profile.introSubtitlePrefix} <span className="highlighted-name">{profile.displayName}</span>
      </span>

      <div className={aboutSectionClassName} id="about-section-el">
        <h2>{profile.about.title}</h2>
        <AboutDescription parts={profile.about.description} />
        <div className="languages-row">
          {profile.about.languages.map((language) => (
            <LanguageBadge language={language} key={language.code} />
          ))}
        </div>

        <div className={statsRowClassName} id="stats-row-el">
          {profileStats.map((stat) => (
            <StatCard label={stat.label} value={stat.value ?? birthdayStats[stat.valueKey]} key={stat.id} />
          ))}

          <CountdownShowcase
            className={countdownClassName}
            countdown={birthdayStats.countdown}
            countdownInfo={birthdayCountdown}
            hidden={birthdayStats.countdownHidden}
          />
        </div>
      </div>
    </div>
  );
}
