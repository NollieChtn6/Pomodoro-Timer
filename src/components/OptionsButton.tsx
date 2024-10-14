import { Ellipsis } from "lucide-react";
import { FastForward } from "lucide-react";

type OptionsButtonProps = {
  action: "openSettings" | "skipStep";
  state: "isFocus" | "isShortBreak" | "isLongBreak" | "isPaused";
};

export function OptionsButton({ action, state }: OptionsButtonProps) {
  const icon =
    action === "openSettings" ? <Ellipsis className="icon" /> : <FastForward className="icon" />;
  return (
    <button className={`btn options-btn ${state}`} type="button">
      {icon}
    </button>
  );
}
