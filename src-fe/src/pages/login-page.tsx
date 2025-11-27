import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { useTranslation } from "react-i18next";

export function LoginPage() {
    const { t } = useTranslation("loginPage");
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const { login } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!username.trim()) return alert(t("alertInsertLogin"));
        //if (!password.trim()) return alert(t("alertInsertPassword"));

        login(username);
        navigate("/");
    };

    return (
        <div style={{ maxWidth: 300, margin: "100px auto" }}>
            <h2>{t("title")}</h2>

        <form onSubmit={handleSubmit}>
            <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t("name")}
                className="form-control mb-2"
            />

            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("password")}
                className="form-control mb-2"
            />
        
            <button className="btn btn-primary w-100">
                {t("login")}
            </button>
        </form>
        </div>
    );
}
