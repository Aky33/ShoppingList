import { createContext, useState, type ReactNode } from "react";
import type { ErrorContextType } from "../types/error/error-context-type";

export const ErrorContext = createContext<ErrorContextType | null>(null);

export function ErrorProvider({ children }: { children: ReactNode }) {
    const [error, setError] = useState<Error | null>(null);

    return (
        <ErrorContext.Provider value={{ error, setError }}>
            {children}
        </ErrorContext.Provider>
    );
}