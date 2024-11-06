import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Appearance } from "react-native";

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    const updateTheme = () => {
      if (theme === "system") {
        const systemTheme = Appearance.getColorScheme();
        setTheme(systemTheme || "light");
      }
    };

    updateTheme();

    const appearanceListener = Appearance.addChangeListener(updateTheme);

    return () => appearanceListener.remove();
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
