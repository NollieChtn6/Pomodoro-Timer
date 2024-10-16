import { useState } from "react";

import { Chip } from "../components/Chip";
import { OptionsButton } from "../components/OptionsButton";
import { StartStopButton } from "../components/StartStopButton";
import { Timer } from "../components/Timer";
import { SettingsModal } from "../components/ModalSettings";

type TimerIsRunning = boolean;
type ActivePhase = "isFocus" | "isLongBreak" | "isShortBreak" | "isPaused";

export function HomePage() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [activePhase, setActivePhase] = useState<ActivePhase>("isPaused");
  const [timerIsRunning, setTimerIsRunning] = useState<TimerIsRunning>(false);
  const [optionIsDisabled, setOptionIsDisabled] = useState<boolean>(true);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleSkipPhase = () => {
    setActivePhase("isShortBreak"); // phase du cycle +1
  };

  const handleStartPauseTimer = () => {
    if (!timerIsRunning) {
      setActivePhase("isFocus");
      setTimerIsRunning(true);
      setOptionIsDisabled(false);
    } else {
      if (timerIsRunning) {
        setActivePhase("isPaused");
        setTimerIsRunning(false);
        setOptionIsDisabled(false);
      }
    }
  };

  const handleStopTimer = () => {
    // reset timer to user settings
    // reset workingCycle to 0
  };

  const handleResetTimer = () => {
    // reset timer to default settings: 25/5
    setActivePhase("isPaused");
  };

  return (
    <>
      <div className={`pomodoro-container ${activePhase}`}>
        <Chip state={activePhase} />
        <Timer />
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
          <p className="step">Next step is: Long Break (25min)</p>
        </div>
      </div>
      <SettingsModal isVisible={isModalVisible} onClose={handleCloseModal} />
    </>
  );
}
