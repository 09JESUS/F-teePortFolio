"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Loader2 } from "lucide-react"
import Link from "next/link"

interface GithubRepo {
  id: number
  name: string
  description: string
  html_url: string
  homepage: string
  topics: string[]
  language: string
  updated_at: string
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<GithubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Fetch repositories from your GitHub account
        const response = await fetch("https://api.github.com/users/09JESUS/repos?sort=updated&per_page=6")

        if (!response.ok) {
          throw new Error("Failed to fetch GitHub repositories")
        }

        const data = await response.json()
        setProjects(data)
      } catch (err) {
        console.error("Error fetching GitHub projects:", err)
        setError("Failed to load projects from GitHub. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    // Initial fetch
    fetchProjects()

    // Set up a refresh after 3 seconds to catch newly pushed projects
    const refreshTimer = setTimeout(() => {
      console.log("Refreshing GitHub projects data...")
      fetchProjects()
    }, 3000)

    // Clean up timer on component unmount
    return () => clearTimeout(refreshTimer)
  }, [])

  const refreshProjects = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        "https://api.github.com/users/09JESUS/repos?sort=updated&per_page=6&" + new Date().getTime(),
      )

      if (!response.ok) {
        throw new Error("Failed to refresh GitHub repositories")
      }

      const data = await response.json()
      setProjects(data)
    } catch (err) {
      console.error("Error refreshing GitHub projects:", err)
      setError("Failed to refresh projects from GitHub. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="w-full flex justify-center py-12">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-green-500" />
          <p className="text-gray-400">Loading projects from GitHub...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full text-center py-12">
        <p className="text-red-400">{error}</p>
        <div className="mt-4">
          <Button onClick={refreshProjects} className="bg-green-500 hover:bg-green-600 text-black">
            Refresh Projects
          </Button>
        </div>
        <p className="text-gray-400 mt-4">
          In the meantime, you can visit my{" "}
          <Link href="https://github.com/09JESUS" className="text-green-500 hover:underline">
            GitHub profile
          </Link>{" "}
          directly.
        </p>
      </div>
    )
  }

  // If no projects are found, show placeholder projects
  const displayProjects =
    projects.length > 0
      ? projects
      : [
          {
            id: 1,
            name: "FireGuard-Simulation",
            description:
              "A web-based security application that mimics the behavior of a real firewall by filtering network traffic based on user-defined rules.",
            html_url: "https://github.com/09JESUS/FireGuard-Simulation",
            homepage: "#",
            topics: ["cybersecurity", "typescript", "firewall", "security"],
            language: "TypeScript",
            updated_at: new Date().toISOString(),
          },
          {
            id: 2,
            name: "Secure-File-Transfer",
            description:
              "A secure file transfer solution using IndexedDB for persistent storage with complete control over access, expiration, and password protection.",
            html_url: "https://github.com/09JESUS/Secure-File-Transfer",
            homepage: "#",
            topics: ["security", "file-transfer", "encryption"],
            language: "JavaScript",
            updated_at: new Date().toISOString(),
          },
          {
            id: 3,
            name: "TechCare-Live",
            description:
              "An innovative platform built to offer efficient and reliable tech support services for individuals and businesses alike.",
            html_url: "https://github.com/09JESUS/TechCare-Live",
            homepage: "#",
            topics: ["tech-support", "html", "css", "service-platform"],
            language: "HTML",
            updated_at: new Date().toISOString(),
          },
          {
            id: 4,
            name: "FSolution-AI-pay",
            description:
              "Payment solution for FSolution-Dev with AI integration for enhanced security and user experience.",
            html_url: "https://github.com/09JESUS/FSolution-AI-pay",
            homepage: "#",
            topics: ["payment", "ai", "fintech"],
            language: "HTML",
            updated_at: new Date().toISOString(),
          },
          {
            id: 5,
            name: "Fake-News-Detection",
            description: "Machine learning model to identify and flag potentially false news articles and information.",
            html_url: "https://github.com/09JESUS/Fake-News-Detection",
            homepage: "#",
            topics: ["machine-learning", "python", "nlp", "cybersecurity"],
            language: "Python",
            updated_at: new Date().toISOString(),
          },
          {
            id: 6,
            name: "Credit_Card_Fraud-Detection",
            description:
              "Security system that uses machine learning algorithms to detect fraudulent credit card transactions.",
            html_url: "https://github.com/09JESUS/Credit_Card_Fraud-Detection",
            homepage: "#",
            topics: ["machine-learning", "python", "security", "fraud-detection"],
            language: "Python",
            updated_at: new Date().toISOString(),
          },
        ]

  return (
    <>
      <div className="w-full flex justify-end mb-4">
        <Button
          onClick={refreshProjects}
          variant="outline"
          className="border-green-500/30 text-green-400 hover:bg-green-500/10 text-sm"
        >
          Refresh Projects
        </Button>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8 w-full">
        {displayProjects.map((project) => (
          <Card
            key={project.id}
            className="bg-black/40 border-green-500/20 hover:border-green-500/40 transition-colors overflow-hidden"
          >
            <CardHeader>
              <h3 className="text-xl font-bold text-white">{project.name}</h3>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="flex items-center">
                  <span className={`w-3 h-3 rounded-full mr-1 ${getLanguageColor(project.language)}`}></span>
                  {project.language || "Various"}
                </span>
                <span>Updated {formatDate(project.updated_at)}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4 min-h-[60px]">{project.description || "No description provided"}</p>
              <div className="flex flex-wrap gap-2">
                {(project.topics || []).slice(0, 4).map((topic) => (
                  <Badge key={topic} variant="outline" className="border-green-500/30 text-green-400 bg-green-500/5">
                    {topic}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              {project.homepage && (
                <Button
                  variant="outline"
                  size="sm"
                  className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                  asChild
                >
                  <Link
                    href={project.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Demo
                  </Link>
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                asChild
              >
                <Link
                  href={project.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  <Github className="h-4 w-4" />
                  Code
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  )
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    return "today"
  } else if (diffDays === 1) {
    return "yesterday"
  } else if (diffDays < 30) {
    return `${diffDays} days ago`
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30)
    return `${months} ${months === 1 ? "month" : "months"} ago`
  } else {
    const years = Math.floor(diffDays / 365)
    return `${years} ${years === 1 ? "year" : "years"} ago`
  }
}

function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    TypeScript: "bg-blue-500",
    JavaScript: "bg-yellow-500",
    Python: "bg-green-600",
    HTML: "bg-orange-500",
    CSS: "bg-purple-500",
    Java: "bg-red-500",
    "C#": "bg-green-700",
    PHP: "bg-indigo-500",
    Ruby: "bg-red-600",
    Go: "bg-blue-400",
    Rust: "bg-orange-600",
    Swift: "bg-orange-500",
    Kotlin: "bg-purple-600",
  }

  return colors[language] || "bg-gray-500"
}

