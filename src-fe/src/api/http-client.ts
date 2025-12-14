import { USE_MOCKS } from "../config.js"
import { mockFetch } from "./mock-fetch.js"

export function httpFetch(
    url: string,
    options?: RequestInit
): Promise<Response> {
    console.log("Using mock:", USE_MOCKS);

    if (USE_MOCKS) {
        return mockFetch(url, options)
    }

    return fetch(url, options)
}
