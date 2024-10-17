import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { SettingsButton } from "./SettingsButton";
import type { Pomodoro } from "../@types/types";

type SettingsModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onSave: (updatedSettings: Pomodoro) => void;
  defaultSettings: Pomodoro;
};

export function SettingsModal({ isVisible, onClose, onSave, defaultSettings }: SettingsModalProps) {
  const [workDuration, setWorkDuration] = useState<number>(defaultSettings.workDuration / 60);
  const [shortBreakDuration, setShortBreakDuration] = useState<number>(
    defaultSettings.shortBreakDuration / 60,
  );
  const [longBreakDuration, setLongBreakDuration] = useState<number>(
    defaultSettings.longBreakDuration / 60,
  );

  useEffect(() => {
    setWorkDuration(defaultSettings.workDuration / 60);
    setShortBreakDuration(defaultSettings.shortBreakDuration / 60);
    setLongBreakDuration(defaultSettings.longBreakDuration / 60);
  }, [defaultSettings]);

  useEffect(() => {
    setLongBreakDuration(shortBreakDuration * 4);
  }, [shortBreakDuration]);

  if (!isVisible) return null;

  const handleSave = () => {
    onSave({
      workDuration: workDuration * 60,
      shortBreakDuration: shortBreakDuration * 60,
      longBreakDuration: longBreakDuration * 60,
      numberOfCycles: 4,
    });
  };

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
            <h3>Short Break Duration</h3>
            <div className="controls-container">
              <SettingsButton
                action="decrement"
                onClick={() => setShortBreakDuration(shortBreakDuration - 1)}
                disabled={shortBreakDuration <= 1}
              />
              <p className="duration">{shortBreakDuration} min</p>
              <SettingsButton
                action="increment"
                onClick={() => setShortBreakDuration(shortBreakDuration + 1)}
                disabled={false}
              />
            </div>
          </div>
        </div>
        <button className="btn save-btn" onClick={handleSave} type="button">
          Save
        </button>
      </div>
    </div>
  );
}
