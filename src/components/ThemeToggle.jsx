export function ThemeToggle({ theme, onToggleTheme }) {
  // Variables
  const themeIcon = String.fromCharCode(theme === "light" ? 9790 : 9728);

  // Functions
  return (
    <button className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle theme" type="button">
      <span id="theme-icon">{themeIcon}</span>
    </button>
  );
}
