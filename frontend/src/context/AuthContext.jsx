import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  loginRequest,
} from "../services/authService";

const AuthContext = createContext(null);

const getStoredUser = () => {
  const storedUser =
    localStorage.getItem(
      "salaryManagementUser"
    );

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    localStorage.removeItem(
      "salaryManagementUser"
    );

    return null;
  }
};

function AuthProvider({ children }) {
  const [token, setToken] = useState(
    () =>
      localStorage.getItem(
        "salaryManagementToken"
      )
  );

  const [user, setUser] = useState(
    getStoredUser
  );

  useEffect(() => {
    const handleUnauthorized = () => {
      setToken(null);
      setUser(null);
    };

    window.addEventListener(
      "auth:unauthorized",
      handleUnauthorized
    );

    return () => {
      window.removeEventListener(
        "auth:unauthorized",
        handleUnauthorized
      );
    };
  }, []);

  const login = async (
    email,
    password
  ) => {
    const data = await loginRequest(
      email,
      password
    );

    localStorage.setItem(
      "salaryManagementToken",
      data.token
    );

    localStorage.setItem(
      "salaryManagementUser",
      JSON.stringify(data.user)
    );

    setToken(data.token);
    setUser(data.user);

    return data;
  };

  const logout = () => {
    localStorage.removeItem(
      "salaryManagementToken"
    );

    localStorage.removeItem(
      "salaryManagementUser"
    );

    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    isAuthenticated: Boolean(token),
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};

export {
  AuthProvider,
  useAuth,
};