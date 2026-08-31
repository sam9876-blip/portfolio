import React, { createContext, useContext, useEffect } from 'react'

const ThemeContext = createContext<{ theme: 'dark'; toggle: () => void }>({
  theme: 'dark',
  toggle: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  const toggle = () => {}

  return <ThemeContext.Provider value={{ theme: 'dark', toggle }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
