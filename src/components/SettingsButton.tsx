import { Plus, Minus } from "lucide-react";

type SettingsButtonProps = {
  action: "increment" | "decrement";
  disabled: boolean;
  onClick: () => void;
};

export function SettingsButton({ action, disabled, onClick }: SettingsButtonProps) {
  const icon = action === "increment" ? <Plus className="icon" /> : <Minus className="icon" />;

  return (
    <button className="btn settings-btn" onClick={onClick} disabled={disabled} type="button">
      {icon}
    </button>
  );
}
