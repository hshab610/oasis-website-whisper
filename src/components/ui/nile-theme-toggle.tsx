
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export default function NileThemeToggle() {
  const [isNileTheme, setIsNileTheme] = useState(false);

  useEffect(() => {
    // Check if theme was previously set
    const savedTheme = localStorage.getItem("nile-theme-enabled");
    if (savedTheme === "true") {
      document.body.classList.add("nile-theme");
      setIsNileTheme(true);
    }
  }, []);

  const toggleNileTheme = () => {
    const newState = !isNileTheme;
    setIsNileTheme(newState);
    
    if (newState) {
      document.body.classList.add("nile-theme");
      localStorage.setItem("nile-theme-enabled", "true");
    } else {
      document.body.classList.remove("nile-theme");
      localStorage.setItem("nile-theme-enabled", "false");
    }
  };

  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={toggleNileTheme}
      className="rounded-full"
      title={isNileTheme ? "Switch to original theme" : "Switch to Nile theme"}
    >
      {isNileTheme ? (
        <Sun className="h-[1.2rem] w-[1.2rem] text-desertGold" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] text-nileTeal" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
