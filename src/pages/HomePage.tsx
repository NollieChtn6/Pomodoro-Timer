import { useState } from "react";

import { Chip } from "../components/Chip";
import { OptionsButton } from "../components/OptionsButton";
import { StartStopButton } from "../components/StartStopButton";
import { Timer } from "../components/Timer";
import { SettingsModal } from "../components/ModalSettings";

export function HomePage() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const currentState = "isPaused";
  const timerIsRunning = true;

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className={`pomodoro-container ${currentState}`}>
        <Chip state={currentState} />
        <Timer />
        <div className="btns-container">
          <OptionsButton action="openSettings" state={currentState} onClick={handleOpenModal} />
          <div className="state-management-btns-container">
            <div className="main-btn">
              <StartStopButton state={currentState} timerIsRunning={timerIsRunning} />
            </div>
            {currentState === "isPaused" && (
              <div className="secondary-btns">
                <OptionsButton
                  action="reset"
                  onClick={() => {
                    return null;
                  }}
                  state={currentState}
                />
                <OptionsButton
                  action="stop"
                  onClick={() => {
                    return null;
                  }}
                  state={currentState}
                />
              </div>
            )}
          </div>
          <OptionsButton
            action="skipStep"
            state={currentState}
            onClick={() => {
              return null;
            }}
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
