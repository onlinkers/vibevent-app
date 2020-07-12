import React, { createContext, useEffect, useState } from "react";

interface ProviderProps {
  children: JSX.Element;
}

interface ContextProps {
  breakpoint: string;
  setBreakpoint: Function;
}

const SizeContext = createContext<ContextProps>({
  breakpoint: "mobile",
  setBreakpoint: () => {},
});

const SizeProvider: React.FunctionComponent<ProviderProps> = ({ children }) => {
  const [breakpoint, setBreakpoint] = useState("");

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
      console.log("windowWidth:", window.innerWidth, "breakpoint?", breakpoint);
    };
  }, [breakpoint]);

  return (
    <SizeContext.Provider value={{ breakpoint, setBreakpoint }}>
      {children}
    </SizeContext.Provider>
  );
};

export { SizeContext, SizeProvider };
