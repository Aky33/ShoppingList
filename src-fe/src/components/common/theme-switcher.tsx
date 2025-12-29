import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

export default function ThemeSwitcher() {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        document.body.setAttribute("data-bs-theme", theme);
    }, [theme]);

    return (
        <Button
            variant="secondary"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="ms-2"
        >
        {theme === "light" ? "🌞" : "🌙"}
        </Button>
    );
}