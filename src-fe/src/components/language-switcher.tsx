import { ButtonGroup, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    return (
        <ButtonGroup>
            <Button
                variant={i18n.language === "cs" ? "primary" : "outline-primary"}
                onClick={() => i18n.changeLanguage("cs")}
            >
            🇨🇿 CS
            </Button>
            <Button
                variant={i18n.language === "en" ? "primary" : "outline-primary"}
                onClick={() => i18n.changeLanguage("en")}
            >
            🇬🇧 EN
            </Button>
        </ButtonGroup>
    );
}