import { useCallback } from "react"
import { httpFetch } from "../api/http-client.js"

export default function useDelete(url: string) {
    return useCallback(async (id: string): Promise<Response> => {
        console.log("Deleting item with id:", id);

        return httpFetch(url, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        })
    }, [url])
}
