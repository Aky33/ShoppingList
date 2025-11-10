import { useCallback } from "react"

export default function usePost<T>(url: string) {
    const postData = useCallback(async (data: T): Promise<Response> => {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        return response
    }, [url])

    return postData
}