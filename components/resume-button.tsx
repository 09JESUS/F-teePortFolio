"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"

export default function ResumeButton() {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    try {
      setIsDownloading(true)

      // Direct link to the PDF file
      window.open("/documents/forget-nukeri-cv.pdf", "_blank")

      // Set a fallback timer to open the HTML version if the PDF fails to load
      const fallbackTimer = setTimeout(() => {
        console.log("Falling back to HTML version...")
        window.open("/documents/forget-nukeri-cv.html", "_blank")
      }, 3000)

      // Clear the fallback timer after 3 seconds
      setTimeout(() => {
        clearTimeout(fallbackTimer)
      }, 3000)
    } catch (error) {
      console.error("Error downloading resume:", error)
      // Fallback to HTML version
      window.open("/documents/forget-nukeri-cv.html", "_blank")
    } finally {
      // Reset the button state after a delay
      setTimeout(() => {
        setIsDownloading(false)
      }, 3000)
    }
  }

  return (
    <Button
      variant="outline"
      className="border-green-500 text-green-500 hover:bg-green-500/10"
      onClick={handleDownload}
      disabled={isDownloading}
    >
      <span className="flex items-center gap-1">
        <FileText className="h-4 w-4" />
        {isDownloading ? "Opening..." : "Download Resume"}
      </span>
    </Button>
  )
}

