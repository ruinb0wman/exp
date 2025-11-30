import React, { createContext, useContext, useState, ReactNode } from 'react';
import themeConfig from '@/constants/theme';

// 定义主题类型
type Theme = 'light' | 'dark';

// 创建 Context
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: typeof themeConfig.dark; // 类型推导
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 自定义 Hook
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Provider 组件
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('dark');

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        colors: themeConfig[theme],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
