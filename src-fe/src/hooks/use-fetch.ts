import { useEffect, useState, useCallback } from "react"
import { httpFetch } from "../api/http-client"

export function useFetch<T>(url?: string | null) {
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<string | null>(null)

    const fetchData = useCallback(() => {
        if (!url) return

        httpFetch(url)
            .then(res => {
                if (!res.ok)
                    throw new Error('Network error')

                return res.json()
            })
            .then(json => {
                console.log("Fetched data:", url, json);
                setData(json)
            })
            .catch(err => {
                console.error("Fetch error:", url, err);
                setError(err.message)
            })
    }, [url])

    useEffect(() => {
        if (!url) return

        fetchData()
    }, [fetchData, url])

    return {data, refetch: fetchData, error}
}