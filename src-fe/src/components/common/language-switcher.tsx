import { ButtonGroup, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    return (
        <ButtonGroup style={{ marginLeft: 20 }}>
            <Button
                variant={i18n.language === "cs" ? "secondary" : "outline-secondary"}
                onClick={() => i18n.changeLanguage("cs")}
            >
            🇨🇿 CS
            </Button>
            <Button
                variant={i18n.language === "en" ? "secondary" : "outline-secondary"}
                onClick={() => i18n.changeLanguage("en")}
            >
            🇬🇧 EN
            </Button>
        </ButtonGroup>
    );
}