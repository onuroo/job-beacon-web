export const API = {
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
      LOGOUT: '/api/auth/logout',
      ME: '/api/auth/me'
    },
    CV: {
      CREATE: '/api/cv',
      UPDATE: '/api/cv/:id',
      GET_MY: '/api/cv/me'
    }
  }
} as const

export const ROUTES = {
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password'
  },
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  CV: {
    CREATE: '/cv/create',
    EDIT: '/cv/edit',
    VIEW: '/cv/:id'
  }
} as const

export const STORAGE_KEYS = {
  USER: 'user',
  TOKEN: 'token',
  THEME: 'theme',
  PREFERENCES: 'preferences'
} as const

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
} as const 