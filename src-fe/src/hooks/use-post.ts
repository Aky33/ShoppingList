import { useCallback } from "react"
import { httpFetch } from "../api/http-client"

export default function usePost<T>(url: string) {
    const postData = useCallback(async (data: T): Promise<Response> => {
        return httpFetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    }, [url])

    return postData
}