import { Link } from "react-router-dom";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

function Navbar() {
  const [darkMode, setDarkMode] = useState(() => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
  document.documentElement.classList.remove("dark");
} else {
  document.documentElement.classList.add("dark");
}

  return savedTheme ? savedTheme === "dark" : true;
});

  function toggleDarkMode() {
    const isDark =
      document.documentElement.classList.contains(
        "dark"
      );

    if (isDark) {
      document.documentElement.classList.remove(
        "dark"
      );
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add(
        "dark"
      );
      localStorage.setItem("theme", "dark");
    }

    setDarkMode(!isDark);
  }

  return (
    <nav className="flex items-center justify-between p-4 border-b">
      <div className="flex gap-4">
        <Link to="/">Dashboard</Link>

        <Link to="/watchlist">
          Watchlist
        </Link>
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={toggleDarkMode}
      >
        {darkMode ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </Button>
    </nav>
  );
}

export default Navbar;