"use client";

import { Button } from "@/components/ui/button";
import { useSound } from "@/providers/sound-provider";

interface RadioOption {
  value: string;
  label: string;
  badge?: string;
  badgeColor?: "blue" | "red";
}

interface RadioGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  options: RadioOption[];
}

export function RadioGroup({ value, onValueChange, options }: RadioGroupProps) {
  const { playClickSound } = useSound();

  const handleSelect = (optionValue: string) => {
    playClickSound();
    onValueChange(optionValue);
  };

  return (
    <div className="space-y-2">
      {options.map((option) => (
        <Button
          key={option.value}
          variant={value === option.value ? "secondary" : "outline"}
          onClick={() => handleSelect(option.value)}
          className="w-full justify-between h-12 px-4"
        >
          <span>{option.label}</span>
          {option.badge && (
            <span
              className={`text-xs px-2 py-0.5 rounded ${
                option.badgeColor === "red"
                  ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                  : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
              }`}
            >
              {option.badge}
            </span>
          )}
        </Button>
      ))}
    </div>
  );
}
