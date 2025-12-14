import { useCallback } from "react"
import { httpFetch } from "../api/http-client.js"

export default function usePut<T>(url: string) {
    return useCallback(async (data: T): Promise<Response> => {
        return httpFetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
    }, [url])
}
