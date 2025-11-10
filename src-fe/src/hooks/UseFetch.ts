import { useEffect, useState, useCallback } from "react"

export function useFetch<T>(url: string) {
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<string | null>(null)

    const fetchData = useCallback(() => {
        fetch(url)
            .then(res => {
                if (!res.ok)
                    throw new Error('Network error')

                return res.json()
            })
            .then(json => setData(json))
            .catch(err => setError(err.message))
    }, [url])

    useEffect(() => fetchData(), [fetchData])

    return {data, refetch: fetchData, error}
}