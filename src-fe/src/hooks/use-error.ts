import { useContext } from "react";
import { ErrorContext } from "../error/error-context";

export function useError() {
    const ctx = useContext(ErrorContext);
    
    if (!ctx) 
        throw new Error("useError must be used in ErrorProvider");
    
    return ctx;
}