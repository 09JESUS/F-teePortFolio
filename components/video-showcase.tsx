"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"

interface Video {
  id: string
  title: string
  description: string
  thumbnail: string
  videoUrl: string
}

// Sample videos - replace with your actual videos
const sampleVideos: Video[] = [
  {
    id: "1",
    title: "FireGuard-Simulation Demo",
    description: "A demonstration of the FireGuard-Simulation project showing how it filters network traffic.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    videoUrl: "#",
  },
  {
    id: "2",
    title: "Secure File Transfer Walkthrough",
    description: "A walkthrough of the secure file transfer application and its security features.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    videoUrl: "#",
  },
  {
    id: "3",
    title: "FSolution-AI-pay Overview",
    description: "An overview of the payment solution with AI integration for enhanced security.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    videoUrl: "#",
  },
]

export default function VideoShowcase() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const currentVideo = sampleVideos[currentVideoIndex]

  const nextVideo = () => {
    setIsPlaying(false)
    setCurrentVideoIndex((prev) => (prev + 1) % sampleVideos.length)
  }

  const prevVideo = () => {
    setIsPlaying(false)
    setCurrentVideoIndex((prev) => (prev - 1 + sampleVideos.length) % sampleVideos.length)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative">
        <Card className="bg-black/50 border-green-500/20 overflow-hidden">
          <CardContent className="p-0">
            <div className="aspect-video w-full relative">
              {isPlaying ? (
                <div className="w-full h-full bg-black flex items-center justify-center">
                  {/* This would be replaced with your actual video player */}
                  <p className="text-gray-400">Video is playing: {currentVideo.title}</p>
                </div>
              ) : (
                <div className="w-full h-full relative group">
                  <img
                    src={currentVideo.thumbnail || "/placeholder.svg"}
                    alt={currentVideo.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      onClick={togglePlay}
                      className="bg-green-500 hover:bg-green-600 text-black rounded-full w-16 h-16 flex items-center justify-center"
                    >
                      <Play className="h-8 w-8 ml-1" />
                    </Button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4 text-white">
                    <h3 className="text-xl font-bold text-green-500">{currentVideo.title}</h3>
                    <p className="text-gray-300 text-sm mt-1">{currentVideo.description}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Button
          onClick={prevVideo}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white rounded-full w-10 h-10 p-0"
          aria-label="Previous video"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          onClick={nextVideo}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white rounded-full w-10 h-10 p-0"
          aria-label="Next video"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        {sampleVideos.map((video, index) => (
          <div
            key={video.id}
            onClick={() => {
              setCurrentVideoIndex(index)
              setIsPlaying(false)
            }}
            className={`cursor-pointer relative rounded-lg overflow-hidden border-2 ${
              index === currentVideoIndex ? "border-green-500" : "border-transparent"
            }`}
          >
            <img
              src={video.thumbnail || "/placeholder.svg"}
              alt={video.title}
              className="w-full aspect-video object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-2">
              <p className="text-white text-xs font-medium truncate">{video.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-400 text-sm">
          To add your own videos, replace the sample videos in the{" "}
          <code className="text-green-500">components/video-showcase.tsx</code> file.
        </p>
      </div>
    </div>
  )
}

