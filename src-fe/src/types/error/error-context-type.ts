export type ErrorContextType = {
  error: Error | null;
  setError: (err: Error | null) => void;
};