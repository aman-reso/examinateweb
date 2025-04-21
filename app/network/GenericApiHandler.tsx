import {AppUtils} from "@/app/utility/AppUtils";

export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"

interface ApiRequestOptions<T> {
    url: string
    method?: HTTPMethod
    body?: T
    queryParams?: Record<string, string | number | boolean>
    headers?: Record<string, string>
}

export async function apiRequest<ResponseType = any, RequestType = any>(
    options: ApiRequestOptions<RequestType>
): Promise<ResponseType> {
    const {url, method = "GET", body, queryParams, headers = {}} = options

    const query = queryParams && Object.keys(queryParams).length > 0
        ? "?" +
        Object.entries(queryParams)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join("&")
        : ""

    const completeUrl = `${AppUtils.baseUrl}${url}${query}`

    console.log(`Request URL: ${completeUrl}`)
    console.log(`Request Method: ${method}`)
    console.log(`Request Headers:`, headers)
    if (body) {
        console.log(`Request Body:`, body)
    }

    try {
        const response = await fetch(completeUrl, {
            method,
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
            mode: "cors", // allow CORS requests
            credentials: "include", // include cookies for auth if needed
            ...(body ? { body: JSON.stringify(body) } : {}),
        })

        // Check if response has JSON content type
        const contentType = response.headers.get("Content-Type") || ""
        const isJson = contentType.includes("application/json")

        if (!response.ok) {
            const errorBody = isJson ? await response.json() : await response.text()
            throw new Error(`API error: ${response.status} - ${JSON.stringify(errorBody)}`)
        }

        return isJson ? await response.json() as ResponseType : ({} as ResponseType)
    } catch (error) {
        console.error("API request failed:", error)
        throw error
    }
}
