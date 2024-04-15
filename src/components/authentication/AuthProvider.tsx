import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import {User} from '../../redux/slices/userSlice';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../redux/store';
import {
  fetchCurrentUser,
  loginUser,
  logoutUser,
} from '../../redux/thunks/userThunks';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (loginDetails: {loginData: string; password: string}) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      getCurrentUser().finally(() => setIsLoading(false));
    } else {
      setUser(null);
      setIsLoading(false);
    }
  }, []);

  const getCurrentUser = async () => {
    try {
      const userResponse = await dispatch(fetchCurrentUser()).unwrap();
      setUser(userResponse);
    } catch (error) {
      setUser(null);
    }
  };

  const login = async (loginDetails: {loginData: string; password: string}) => {
    try {
      await dispatch(loginUser(loginDetails)).unwrap();
      const userResponse = await dispatch(fetchCurrentUser()).unwrap();
      setUser(userResponse);
    } catch (error) {
      console.error('Login error: ', error);
      localStorage.setItem('loginErrorMessage', 'Invalid login or password');
      setUser(null);
    }
  };

  const logout = () => {
    dispatch(logoutUser());
    setUser(null);
  };

  if (isLoading) {
    return 0;
  }

  return (
    <AuthContext.Provider
      value={{user, isAuthenticated: !!user, login, logout}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
