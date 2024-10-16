type TimerProps = {
  minutes: number;
  seconds: number;
};
export function Timer({ minutes, seconds }: TimerProps) {
  return (
    <div className="timer-container">
      <p className="minutes-container">{String(minutes).padStart(2, "0")}</p>
      <p className="seconds-container">{String(seconds).padStart(2, "0")}</p>
    </div>
  );
}
