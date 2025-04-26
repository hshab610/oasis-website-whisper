
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Palmtree } from "lucide-react";

export default function NileThemeToggle() {
  const [isNileTheme, setIsNileTheme] = useState(true); // Default to true

  useEffect(() => {
    // Check if theme was previously set, otherwise default to Nile theme
    const savedTheme = localStorage.getItem("nile-theme-enabled");
    if (savedTheme === "false") {
      document.body.classList.remove("nile-theme");
      setIsNileTheme(false);
    } else {
      // Default to Nile theme
      document.body.classList.add("nile-theme");
      localStorage.setItem("nile-theme-enabled", "true");
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
      className="rounded-full relative"
      title={isNileTheme ? "Switch to original theme" : "Switch to Nile theme"}
    >
      {isNileTheme ? (
        <Sun className="h-[1.2rem] w-[1.2rem] text-desertGold" />
      ) : (
        <Palmtree className="h-[1.2rem] w-[1.2rem] text-nileTeal" />
      )}
      {isNileTheme && (
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-desertGold rounded-full border border-white"></span>
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
