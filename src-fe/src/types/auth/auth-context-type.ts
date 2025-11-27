import type { User } from "./user-type";

export type AuthContextType = {
    user: User | null;
    loading: boolean;
    login: (login: string) => void;
    logout: () => void;
};