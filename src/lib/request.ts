import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { API } from '@/constants'
import { storage } from './storage'

// Add these interfaces at the top of the file
interface AuthResponse {
  id: string
  email: string
  fullName: string
  role: 'candidate' | 'recruiter'
  token?: string
}

class RequestService {
  private static instance: RequestService
  private axiosInstance: AxiosInstance

  private constructor() {
    this.axiosInstance = axios.create({
      timeout: 10000,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  static getInstance(): RequestService {
    if (!RequestService.instance) {
      RequestService.instance = new RequestService()
    }
    return RequestService.instance
  }

  private setupInterceptors(): void {
    // Request Interceptor
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = storage.getToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )

    // Response Interceptor
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        if (error.message === 'Network Error') {
          console.error('CORS or Network Error:', error)
          throw new Error('Unable to connect to the server. Please try again.')
        }

        return Promise.reject(error)
      }
    )
  }

  // Generic request methods
  async get<T>(url: string, config = {}): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config)
    return response.data
  }

  async post<T>(url: string, data = {}, config = {}): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config)
    return response.data
  }

  async put<T>(url: string, data = {}, config = {}): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, config)
    return response.data
  }

  async delete<T>(url: string, config = {}): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, config)
    return response.data
  }

  // Auth specific methods
  async login(email: string, password: string): Promise<AuthResponse> {
    return this.post<AuthResponse>(API.ENDPOINTS.AUTH.LOGIN, { email, password })
  }

  async register(data: { email: string; password: string; fullName: string; role: string }): Promise<AuthResponse> {
    return this.post<AuthResponse>(API.ENDPOINTS.AUTH.REGISTER, data)
  }

  async logout() {
    return this.post(API.ENDPOINTS.AUTH.LOGOUT)
  }

  async getProfile(): Promise<AuthResponse> {
    return this.get<AuthResponse>(API.ENDPOINTS.AUTH.ME)
  }
}

export const request = RequestService.getInstance() 