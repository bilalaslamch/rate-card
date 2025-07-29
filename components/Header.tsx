"use client";

import { Volume2, VolumeX, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Logo } from "@/assets";
import { useTheme } from "@/providers/theme-provider";
import { useSound } from "@/providers/sound-provider";

export function Header() {
  const { isMuted, toggleMute } = useSound();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="bg-[#320056]  rounded-lg p-4 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src={Logo} alt="logo" />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="text-white hover:bg-white/20 h-8 w-8"
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-white hover:bg-white/20 h-8 w-8"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
