
export interface ApiResponse<T> {
  statusCode?: string
  data?: T
  error?: string
}