import { createContext, useEffect, useState } from "react";
import type { User } from "../types/auth/user-type";
import type { AuthContextType } from "../types/auth/auth-context-type";

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // načteme uživatele z localStorage při startu
    useEffect(() => {
        const stored = localStorage.getItem("user");
        
        if (stored) {
            setUser(JSON.parse(stored));
        }

        setLoading(false);
    }, []);

    const login = (login: string) => {
        const newUser = { login };

        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}