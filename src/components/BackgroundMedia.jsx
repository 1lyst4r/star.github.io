export function BackgroundMedia({ theme, darkVideoRef, lightVideoRef }) {
  // Variables
  const darkVideoClassName = `background-video${theme === "dark" ? " is-visible" : ""}`;
  const lightVideoClassName = `background-video${theme === "light" ? " is-visible" : ""}`;

  // Functions
  return (
    <div className="background-media">
      <video className={darkVideoClassName} id="dark-bg-video" ref={darkVideoRef} autoPlay muted loop playsInline>
        <source src="https://files.catbox.moe/k7dbli.mp4" type="video/mp4" />
      </video>
      <video className={lightVideoClassName} id="light-bg-video" ref={lightVideoRef} autoPlay muted loop playsInline>
        <source src="https://files.catbox.moe/r8o3bv.mp4" type="video/mp4" />
      </video>
      <div className="background-blur" />
    </div>
  );
}
