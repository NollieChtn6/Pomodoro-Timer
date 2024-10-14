import { Play, Pause } from "lucide-react";

type StartStopButtonProps = {
  state: "isFocus" | "isShortBreak" | "isLongBreak" | "isPaused";
  timerIsRunning: boolean;
};

export function StartStopButton({ state, timerIsRunning }: StartStopButtonProps) {
  const icon = timerIsRunning ? <Pause className="icon" /> : <Play className="icon" />;

  return (
    <button className={`btn start-stop-btn ${state}`} type="button">
      {icon}
    </button>
  );
}
