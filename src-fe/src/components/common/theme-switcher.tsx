import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function ThemeSwitcher() {
    const [theme, setTheme] = useState("light");
    const { t } = useTranslation();

    useEffect(() => {
        document.body.setAttribute("data-bs-theme", theme);
    }, [theme]);

    return (
        <Button
            variant="secondary"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="ms-2"
        >
        {t("theme")}: {theme === "light" ? "🌞" : "🌙"}
        </Button>
    );
}