import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();


export const ThemeProvider = ({ children }) => {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState(systemTheme || 'light');


  const STORAGE_KEY = 'user-theme';
  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    await AsyncStorage.setItem(STORAGE_KEY, newTheme);

  };



  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedTheme) {
        setTheme(savedTheme);
      } else {
        setTheme(systemTheme || 'light'); // fallback
      }
    };
    loadTheme();
  }, [systemTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


export const useTheme = () => useContext(ThemeContext);
