import { Chip } from "../components/Chip";
import { OptionsButton } from "../components/OptionsButton";
import { StartStopButton } from "../components/StartStopButton";
import { Timer } from "../components/Timer";

export function HomePage() {
  const currentState = "isShortBreak";
  const timerIsRunning = false;
  return (
    <div className={`pomodoro-container ${currentState}`}>
      <Chip state={currentState} />
      <Timer />
      <div className="btns-container">
        <OptionsButton action="openSettings" state={currentState} />
        <StartStopButton state={currentState} timerIsRunning={timerIsRunning} />
        <OptionsButton action="skipStep" state={currentState} />
      </div>
    </div>
  );
}
