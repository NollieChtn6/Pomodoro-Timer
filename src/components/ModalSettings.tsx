import { useState } from "react";
import { X } from "lucide-react";
import { SettingsButton } from "./SettingsButton";

type SettingsModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

export function SettingsModal({ isVisible, onClose }: SettingsModalProps) {
  const [workDuration, setWorkDuration] = useState<number>(25);
  const [breakDuration, setBreakDuration] = useState<number>(5);

  if (!isVisible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-btn" onClick={onClose} type="button">
          <X />
        </button>
        <h2>Pomodoro Settings</h2>
        <div className="duration-settings">
          <div className="setting">
            <h3>Work Duration</h3>
            <div className="controls-container">
              <SettingsButton
                action="decrement"
                onClick={() => setWorkDuration(workDuration - 1)}
                disabled={workDuration <= 1}
              />
              <p className="duration">{workDuration} min</p>
              <SettingsButton
                action="increment"
                onClick={() => setWorkDuration(workDuration + 1)}
                disabled={false}
              />
            </div>
          </div>
          <div className="setting">
            <h3>Break Duration</h3>
            <div className="controls-container">
              <SettingsButton
                action="decrement"
                onClick={() => setBreakDuration(breakDuration - 1)}
                disabled={breakDuration <= 1}
              />
              <p className="duration">{breakDuration} min</p>
              <SettingsButton
                action="increment"
                onClick={() => setBreakDuration(breakDuration + 1)}
                disabled={false}
              />
            </div>
          </div>
        </div>
        <button className="btn save-btn" onClick={onClose} type="button">
          Save
        </button>
      </div>
    </div>
  );
}
