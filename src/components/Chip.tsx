import { Brain, Coffee, TreePalm, Pause } from "lucide-react";

export type ChipProps = {
  state: "isFocus" | "isShortBreak" | "isLongBreak" | "isPaused";
};

export function Chip({ state }: ChipProps) {
  const getLabelAndIcon = (state: string) => {
    switch (state) {
      case "isFocus":
        return { label: "Focus", icon: <Brain className="icon" /> };
      case "isShortBreak":
        return { label: "Short Break", icon: <Coffee className="icon" /> };
      case "isLongBreak":
        return { label: "Long Break", icon: <TreePalm className="icon" /> };
      case "isPaused":
        return { label: "Paused", icon: <Pause className="icon" /> };
      default:
        return { label: "", icon: null };
    }
  };

  const { label, icon } = getLabelAndIcon(state);

  return (
    <div className={`chip-container ${state}`}>
      {icon}
      <span>{label}</span>
    </div>
  );
}
