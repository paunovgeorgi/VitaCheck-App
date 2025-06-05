"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
           "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--shadow": "var(--accent)",
          "--border-radius": "0.5rem",
          "--font-family": "var(--font-sans)",
          "--z-index": "100",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
