import { TimerReset, StopCircle, Ellipsis, FastForward } from "lucide-react";
import { Tooltip } from "react-tooltip";

import type { ToolTip } from "../@types/types";

type OptionsButtonProps = {
  action: "openSettings" | "skipStep" | "reset" | "stop";
  state: "isFocus" | "isShortBreak" | "isLongBreak" | "isPaused";
  onClick: () => void;
  disabled: boolean;
};

export function OptionsButton({ action, state, onClick, disabled }: OptionsButtonProps) {
  const { icon, toolTip }: { icon: JSX.Element | null; toolTip: ToolTip } = (() => {
    switch (action) {
      case "openSettings":
        return {
          icon: <Ellipsis className="icon" />,
          toolTip: { id: "tooltip-settings", content: "Open settings" },
        };
      case "skipStep":
        return {
          icon: <FastForward className="icon" />,
          toolTip: { id: "tooltip-skip", content: "Skip current phase" },
        };
      case "reset":
        return {
          icon: <TimerReset className="icon" />,
          toolTip: { id: "tooltip-reset", content: "Reset timer" },
        };
      case "stop":
        return {
          icon: <StopCircle className="icon" />,
          toolTip: { id: "tooltip-stop", content: "Stop timer" },
        };
      default:
        return {
          icon: null,
          toolTip: { id: "", content: "", place: "" },
        };
    }
  })();
  const toolTipSyle = { backgroundColor: "#71797E", color: "#ffffff" };

  return (
    <>
      <button
        className={`btn options-btn ${state}`}
        type="button"
        onClick={onClick}
        disabled={disabled}
        data-tooltip-id={toolTip.id}
        data-tooltip-content={toolTip.content}
        data-tooltip-place={"bottom"}
        data-tooltip-delay-show={800}
      >
        {icon}
      </button>
      <Tooltip id={toolTip.id} style={toolTipSyle} />
    </>
  );
}
