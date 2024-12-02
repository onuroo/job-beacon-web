import { STORAGE_KEYS, THEMES } from '@/constants'

type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS]
type Theme = typeof THEMES[keyof typeof THEMES]

interface StorageItems {
  [STORAGE_KEYS.USER]: {
    id: string
    email: string
    fullName: string
    role: 'candidate' | 'recruiter'
  } | null
  [STORAGE_KEYS.TOKEN]: string | null
  [STORAGE_KEYS.THEME]: Theme | null
  [STORAGE_KEYS.PREFERENCES]: Record<string, unknown> | null
}

class StorageService {
  private static instance: StorageService
  
  private constructor() {}

  static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService()
    }
    return StorageService.instance
  }

  setItem<K extends StorageKey>(key: K, value: StorageItems[K]): void {
    try {
      const serializedValue = JSON.stringify(value)
      localStorage.setItem(key, serializedValue)
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error)
    }
  }

  getItem<K extends StorageKey>(key: K): StorageItems[K] {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error)
      return null
    }
  }

  removeItem(key: StorageKey): void {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error)
    }
  }

  clear(): void {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('Error clearing localStorage:', error)
    }
  }

  // Specific methods for common operations
  setUser(user: StorageItems[typeof STORAGE_KEYS.USER]): void {
    this.setItem(STORAGE_KEYS.USER, user)
  }

  getUser(): StorageItems[typeof STORAGE_KEYS.USER] {
    return this.getItem(STORAGE_KEYS.USER)
  }

  setToken(token: string): void {
    this.setItem(STORAGE_KEYS.TOKEN, token)
  }

  getToken(): string | null {
    return this.getItem(STORAGE_KEYS.TOKEN)
  }

  clearAuth(): void {
    this.removeItem(STORAGE_KEYS.USER)
    this.removeItem(STORAGE_KEYS.TOKEN)
  }
}

// Export singleton instance
export const storage = StorageService.getInstance() 