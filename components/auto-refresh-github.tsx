"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

interface AutoRefreshGithubProps {
  children: React.ReactNode
}

export default function AutoRefreshGithub({ children }: AutoRefreshGithubProps) {
  const [isRefreshing, setIsRefreshing] = useState(true)
  const [refreshCount, setRefreshCount] = useState(0)

  useEffect(() => {
    // Initial page load - wait 3 seconds then refresh GitHub data
    const timer = setTimeout(async () => {
      try {
        const response = await fetch("/api/github-refresh")
        if (response.ok) {
          console.log("GitHub data refreshed successfully")
          setRefreshCount((prev) => prev + 1)
        }
      } catch (error) {
        console.error("Error during GitHub refresh:", error)
      } finally {
        setIsRefreshing(false)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative">
      {isRefreshing && (
        <div className="absolute top-0 right-0 p-2 z-10 flex items-center gap-2 bg-black/80 rounded-md text-xs text-green-400">
          <Loader2 className="h-3 w-3 animate-spin" />
          <span>Refreshing GitHub data...</span>
        </div>
      )}
      {children}
    </div>
  )
}

