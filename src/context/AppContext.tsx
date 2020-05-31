import React, { createContext, useState } from "react";

interface ContextProps {
  session: {
    isAuthenticated: Boolean;
    setIsAuthenticated: Function;
    isAuthenticating: Boolean;
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
  const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false);
  const [isAuthenticating, setIsAuthenticating] = useState<Boolean>(false);
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
