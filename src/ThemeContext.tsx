import { FC, ReactNode, createContext, useCallback, useState } from "react";

type Theme = "light" | "dark";

type ContextType = {
  theme: Theme;
  update: () => void;
};

export const ThemeContext = createContext<ContextType>({
  theme: "light",
  update: () => {},
});

export const ThemeProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("light");
  const update = useCallback(() => {
    setTheme((c) => (c === "light" ? "dark" : "light"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, update }}>
      {children}
    </ThemeContext.Provider>
  );
};
