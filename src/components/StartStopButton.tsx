import { Play, Pause } from "lucide-react";
import { Tooltip } from "react-tooltip";
import type { ToolTip } from "../@types/types";

type StartStopButtonProps = {
  state: "isFocus" | "isShortBreak" | "isLongBreak" | "isPaused";
  timerIsRunning: boolean;
  onClick: () => void;
};

export function StartStopButton({ state, timerIsRunning, onClick }: StartStopButtonProps) {
  const { icon, toolTip }: { icon: JSX.Element; toolTip: ToolTip } = timerIsRunning
    ? {
        icon: <Pause className="icon" />,
        toolTip: { id: "tooltip-pause", content: "Pause timer" },
      }
    : {
        icon: <Play className="icon" />,
        toolTip: { id: "tooltip-play", content: "Start timer" },
      };

  return (
    <>
      <button
        className={`btn start-stop-btn ${state}`}
        type="button"
        onClick={onClick}
        data-tooltip-id={toolTip.id}
        data-tooltip-content={toolTip.content}
        data-tooltip-place="bottom"
        data-tooltip-delay-show={800}
      >
        {icon}
      </button>
      <Tooltip id={toolTip.id} className="toolTip" />
    </>
  );
}
