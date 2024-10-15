import { TimerReset, StopCircle, Ellipsis, FastForward } from "lucide-react";

type OptionsButtonProps = {
  action: "openSettings" | "skipStep" | "reset" | "stop";
  state: "isFocus" | "isShortBreak" | "isLongBreak" | "isPaused";
  onClick: () => void;
};

export function OptionsButton({ action, state, onClick }: OptionsButtonProps) {
  const icon = (() => {
    switch (action) {
      case "openSettings":
        return <Ellipsis className="icon" />;
      case "skipStep":
        return <FastForward className="icon" />;
      case "reset":
        return <TimerReset className="icon" />;
      case "stop":
        return <StopCircle className="icon" />;
      default:
        return null;
    }
  })();

  return (
    <button className={`btn options-btn ${state}`} type="button" onClick={onClick}>
      {icon}
    </button>
  );
}
