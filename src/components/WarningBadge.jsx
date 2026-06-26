import { WarningIcon } from "./icons.jsx";

export function WarningBadge({ message }) {
  // Functions
  if (!message) {
    return null;
  }

  return (
    <span className="warning-wrapper">
      <span className="warning-icon">
        <WarningIcon />
      </span>
      <span className="warning-tooltip">{message}</span>
    </span>
  );
}
