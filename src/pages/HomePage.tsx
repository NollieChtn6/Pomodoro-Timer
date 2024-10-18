import { useState, useEffect, useCallback } from "react";

import { Chip } from "../components/Chip";
import { OptionsButton } from "../components/OptionsButton";
import { StartStopButton } from "../components/StartStopButton";
import { Timer } from "../components/Timer";
import { SettingsModal } from "../components/ModalSettings";

import type { TimerIsRunning, ActivePhase, Cycle, Pomodoro } from "../@types/types";

export function HomePage() {
  const defaultPomodoroState: Pomodoro = {
    workDuration: 25 * 60,
    shortBreakDuration: 5 * 60,
    longBreakDuration: 20 * 60,
    numberOfCycles: 4,
  };

  const [pomodoroState, setPomodoroState] = useState<Pomodoro>(defaultPomodoroState);
  const [userSettings, setUserSettings] = useState<Pomodoro>(defaultPomodoroState);

  const generatePomodoroCycles = (nbOfCycles: number): Cycle[] => {
    const cycles: Cycle[] = [];
    for (let nb = 0; nb < nbOfCycles - 1; nb++) {
      cycles.push({ focus: "isFocus", break: "isShortBreak" });
    }
    cycles.push({ focus: "isFocus", break: "isLongBreak" });
    return cycles;
  };
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [activePhase, setActivePhase] = useState<ActivePhase>("isPaused");
  const [timerIsRunning, setTimerIsRunning] = useState<TimerIsRunning>(false);
  const [remainingTime, setRemainingTime] = useState<number>(pomodoroState.workDuration);

  const [optionIsDisabled, setOptionIsDisabled] = useState<boolean>(true);

  const pomodoroCycles = generatePomodoroCycles(pomodoroState.numberOfCycles);
  const [currentCycleIndex, setCurrentCycleIndex] = useState(0);
  const [currentPhase, setCurrentPhase] = useState<"focus" | "break">("focus");

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleSkipPhase = useCallback(() => {
    if (currentPhase === "focus") {
      setCurrentPhase("break");
      setActivePhase(pomodoroCycles[currentCycleIndex].break);
      setRemainingTime(
        pomodoroCycles[currentCycleIndex].break === "isShortBreak"
          ? pomodoroState.shortBreakDuration
          : pomodoroState.longBreakDuration,
      );
    } else {
      const nextCycleIndex = (currentCycleIndex + 1) % pomodoroCycles.length;
      setCurrentCycleIndex(nextCycleIndex);
      setCurrentPhase("focus");
      setActivePhase(pomodoroCycles[nextCycleIndex].focus);
      setRemainingTime(pomodoroState.workDuration);
    }
  }, [
    currentPhase,
    currentCycleIndex,
    pomodoroCycles,
    pomodoroState.longBreakDuration,
    pomodoroState.shortBreakDuration,
    pomodoroState.workDuration,
  ]);

  const handleStartPauseTimer = () => {
    setTimerIsRunning((prev) => !prev);
    if (timerIsRunning) {
      setActivePhase("isPaused");
      setOptionIsDisabled(true);
    } else {
      setActivePhase(pomodoroCycles[currentCycleIndex].focus);
      setOptionIsDisabled(false);
    }
  };

  const handleStopTimer = () => {
    setTimerIsRunning(false);
    setCurrentCycleIndex(0);
    setCurrentPhase("focus");
    setActivePhase("isPaused");
    setRemainingTime(userSettings.workDuration);
    setOptionIsDisabled(true);
  };

  const handleResetTimer = () => {
    setTimerIsRunning(false);
    setPomodoroState(defaultPomodoroState);
    setUserSettings(pomodoroState);
    setCurrentCycleIndex(0);
    setCurrentPhase("focus");
    setActivePhase("isPaused");
    setRemainingTime(defaultPomodoroState.workDuration);
    setOptionIsDisabled(true);
  };

  const handleSaveSettings = (updatedSettings: Pomodoro) => {
    setUserSettings(updatedSettings);
    setPomodoroState(updatedSettings);
    setRemainingTime(updatedSettings.workDuration);
    handleCloseModal();
  };

  useEffect(() => {
    if (!timerIsRunning) return;
    if (remainingTime === 0) {
      handleSkipPhase();
      return;
    }
    const timeout = setTimeout(() => {
      setRemainingTime(remainingTime - 1);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [timerIsRunning, remainingTime, handleSkipPhase]);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <>
      <div className={`pomodoro-container ${activePhase}`}>
        <Chip state={activePhase} />
        <Timer minutes={minutes} seconds={seconds} />
        <div className="btns-container">
          <OptionsButton
            action="openSettings"
            state={activePhase}
            onClick={handleOpenModal}
            disabled={false}
          />
          <div className="state-management-btns-container">
            <div className="main-btn">
              <StartStopButton
                state={activePhase}
                timerIsRunning={timerIsRunning}
                onClick={handleStartPauseTimer}
              />
            </div>
            {activePhase === "isPaused" && (
              <div className="secondary-btns">
                <OptionsButton
                  action="reset"
                  onClick={handleResetTimer}
                  state={activePhase}
                  disabled={false}
                />
                <OptionsButton
                  action="stop"
                  onClick={handleStopTimer}
                  state={activePhase}
                  disabled={false}
                />
              </div>
            )}
          </div>
          <OptionsButton
            action="skipStep"
            state={activePhase}
            onClick={handleSkipPhase}
            disabled={optionIsDisabled}
          />
        </div>
        <div className="step-container">
          <p className="step">
            Next step is:{" "}
            {currentPhase === "focus"
              ? pomodoroCycles[currentCycleIndex].break === "isShortBreak"
                ? "Short Break"
                : "Long Break"
              : "Focus"}
          </p>
        </div>
      </div>
      <SettingsModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        onSave={handleSaveSettings}
        defaultSettings={userSettings}
      />
    </>
  );
}
