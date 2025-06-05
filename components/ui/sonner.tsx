"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "dark" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      
      style={
        {
          "--toast-bg": "#121212", // dark background
          "--toast-color": "#f4f4f5", // light text
          "--toast-shadow": "0 4px 12px hsl(158, 64%, 52%)",
          "--toast-border-radius": "0.5rem",
          "--toast-font-family": "var(--font-sans)",
          "--toast-z-index": "100",
          
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
