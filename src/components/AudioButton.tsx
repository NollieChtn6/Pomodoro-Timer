import { Volume2, VolumeOff } from "lucide-react";

import type { ToolTip } from "../@types/types";

type AudioButtonProps = {
  soundIsActive: boolean;
  onClick: () => void;
};

export function AudioButton({ onClick, soundIsActive }: AudioButtonProps) {
  const { icon, toolTip }: { icon: JSX.Element | null; toolTip: ToolTip } = (() => {
    switch (soundIsActive) {
      case true:
        return {
          icon: <Volume2 className="icon" />,
          toolTip: { id: "tooltip-audio", content: "Mute" },
        };
      case false:
        return {
          icon: <VolumeOff className="icon" />,
          toolTip: { id: "tooltip-audio", content: "Unmute" },
        };

      default:
        return {
          icon: null,
          toolTip: { id: "", content: "", place: "" },
        };
    }
  })();

  return (
    <button
      className="btn audio-btn"
      onClick={onClick}
      type="button"
      data-tooltip-id={toolTip.id}
      data-tooltip-content={toolTip.content}
      data-tooltip-place={"bottom"}
      data-tooltip-delay-show={800}
    >
      {icon}
    </button>
  );
}
