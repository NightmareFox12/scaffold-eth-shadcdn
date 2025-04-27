"use client";

import { useEffect, useState } from "react";
import { Switch } from "./shad/ui/switch";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export const SwitchTheme = ({ className }: { className?: string }) => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const isDarkMode = resolvedTheme === "dark";

  const handleToggle = () => {
    if (isDarkMode) {
      setTheme("light");
      return;
    }
    setTheme("dark");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`flex items-center space-x-2 pointer-events-auto ${className}`}>
      <Switch checked={isDarkMode} onCheckedChange={handleToggle} className="cursor-pointer" />
      {isDarkMode ? <MoonIcon className="swap-off h-5 w-5" /> : <SunIcon className="swap-on h-5 w-5" />}
    </div>
  );
};
