export type TimerIsRunning = boolean;

export type ActivePhase = "isFocus" | "isLongBreak" | "isShortBreak" | "isPaused";

export type Cycle = { focus: ActivePhase; break: ActivePhase };

export type Pomodoro = {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  numberOfCycles: number;
};
