import React, { createContext, useState } from "react";

interface ContextProps {
  session: {
    isAuthenticated: boolean;
    setIsAuthenticated: Function;
    isAuthenticating: boolean;
    setIsAuthenticating: Function;
  };
}

interface ProviderProps {
  children: JSX.Element;
}

const AppContext = createContext<ContextProps>({
  session: {
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    isAuthenticating: true,
    setIsAuthenticating: () => {},
  },
});

const AppProvider: React.FunctionComponent<ProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const value = {
    session: {
      isAuthenticated,
      setIsAuthenticated,
      isAuthenticating,
      setIsAuthenticating
    }
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
