import { Play, Pause } from "lucide-react";

type StartStopButtonProps = {
  state: "isFocus" | "isShortBreak" | "isLongBreak" | "isPaused";
  timerIsRunning: boolean;
  onClick: () => void;
};

export function StartStopButton({ state, timerIsRunning, onClick }: StartStopButtonProps) {
  const icon = timerIsRunning ? <Pause className="icon" /> : <Play className="icon" />;

  return (
    <button className={`btn start-stop-btn ${state}`} type="button" onClick={onClick}>
      {icon}
    </button>
  );
}
