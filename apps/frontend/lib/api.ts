const API_URL = '';
const TOKEN_STORAGE_KEY = 'nexium_admin_token';
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'https://affectionate-magenta-kangaroo.39-61-46-46.cpanel.site/api';
const STORAGE_BASE = BACKEND_URL.replace(/\/api$/, '');

export function getStorageUrl(path: string | null | undefined): string {
  if (!path) return '';
  const cleanPath = path.startsWith('storage/') ? path.slice(8) : path;
  return `/api/storage/${cleanPath}`;
}

function fixStorageUrl(value: unknown): unknown {
  if (typeof value === 'string') {
    return value.replace(/http:\/\/localhost:\d+\/api/g, BACKEND_URL).replace(/http:\/\/localhost:\d+/g, BACKEND_URL);
  }
  if (Array.isArray(value)) {
    return value.map(fixStorageUrl);
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([k, v]) => [k, fixStorageUrl(v)])
    );
  }
  return value;
}

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: any;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}/api/${endpoint}`;
    const token = this.getToken();

    const headers: Record<string, string> = {
      'Accept': 'application/json',
      ...((options.headers as Record<string, string>) || {}),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem(TOKEN_STORAGE_KEY);
          window.location.href = '/login';
          return {} as ApiResponse<T>;
        }
        const error = new Error(data.message || 'API request failed') as any;
        error.errors = data.errors;
        error.data = data;
        throw error;
      }

      return fixStorageUrl(data) as ApiResponse<T>;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    if (body instanceof FormData) {
      return this.request<T>(endpoint, {
        method: 'POST',
        body,
      });
    }

    return this.request<T>(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  }

  async put<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    if (body instanceof FormData) {
      body.append('_method', 'PUT');
      return this.request<T>(endpoint, {
        method: 'POST',
        body,
      });
    }

    return this.request<T>(endpoint, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  }

  async patch<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const api = new ApiClient(API_URL);
