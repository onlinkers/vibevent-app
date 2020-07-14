import React, { createContext, useEffect, useState } from "react";

interface ProviderProps {
  children: JSX.Element;
}

interface ContextProps {
  breakpoint: string;
  setBreakpoint: Function;
  theme: string;
}

const ThemeContext = createContext<ContextProps>({
  breakpoint: "mobile",
  setBreakpoint: () => {},
  theme: "light",
});

const ThemeProvider: React.FunctionComponent<ProviderProps> = ({
  children,
}) => {
  const [breakpoint, setBreakpoint] = useState("");
  const [theme] = useState("light");

  const updateSize = () => {
    if (window.innerWidth < 600) {
      setBreakpoint("mobile");
    } else if (window.innerWidth >= 600 && window.innerWidth < 900) {
      setBreakpoint("tablet-portrait");
    } else if (window.innerWidth >= 900 && window.innerWidth < 1200) {
      setBreakpoint("tablet-landscape");
    } else if (window.innerWidth >= 1200 && window.innerWidth < 1800) {
      setBreakpoint("desktop");
    } else if (window.innerWidth >= 1800) {
      setBreakpoint("desktop-big");
    }
  };

  window.addEventListener("resize", updateSize);

  useEffect(() => {
    updateSize();
    return () => {
      // console.log("windowWidth:", window.innerWidth, "breakpoint?", breakpoint);
    };
  }, [breakpoint]);

  return (
    <ThemeContext.Provider value={{ breakpoint, setBreakpoint, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
