export function ThemeSplash({ splash }) {
  if (!splash) {
    return null;
  }

  return <div className={`theme-splash theme-splash-${splash.theme}`} key={splash.id} aria-hidden="true" />;
}
