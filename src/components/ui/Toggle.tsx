"use client";
import { useState } from "react";
const Toggle = ({
  onToggle,
  defaultActive,
  disabled,
}: {
  onToggle: (boolean: boolean) => void;
  defaultActive?: boolean;
  disabled?: boolean;
}) => {
  const [isActive, setIsActive] = useState(Boolean(defaultActive));
  const handleToggleActive = async () => {
    setIsActive(!isActive);
    onToggle(!isActive);
  };

  return (
    <button
      disabled={disabled}
      onClick={() => handleToggleActive()}
      className={`relative inline-flex h-[24px] w-[44px] cursor-pointer items-center rounded-full transition-colors duration-200 disabled:cursor-not-allowed ${
        isActive ? "bg-primary" : "bg-primary/10"
      }`}
      style={{
        boxShadow: isActive ? "none" : "0px 1px 2px rgba(0, 0, 0, 0.2) inset",
      }}
      title={`Toggle ${isActive ? "off" : "on"}`}
    >
      <span
        className={`inline-block h-[16px] w-[16px] transform rounded-full bg-white transition-transform duration-200 ${
          isActive ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
};

export default Toggle;
