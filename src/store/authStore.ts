import { create } from 'zustand';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  checkAuth: () => Promise<void>; // Yeni fonksiyon
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: (user: User) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  setLoading: (loading: boolean) => set({ isLoading: loading }),

  // JWT token kontrolü yapan fonksiyon
  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        set({ user: data.user, isAuthenticated: true });
        console.log('Kullanıcı oturumu doğrulandı:', data.user);
      } else {
        // Eğer istek başarısız olursa mevcut oturumu temizle
        const errorData = await response.json();
        console.warn('Oturum doğrulama başarısız:', errorData.error);
        set({ user: null, isAuthenticated: false });
      }
    } catch (error) {
      console.error('Oturum kontrolü sırasında hata:', error);
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },
}));
