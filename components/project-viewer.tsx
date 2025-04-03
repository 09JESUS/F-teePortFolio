"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Github, Code, Shield, Database, Loader2, RefreshCw } from "lucide-react"
import Link from "next/link"

interface Project {
  id: string
  name: string
  description: string
  longDescription: string
  features: string[]
  technologies: string[]
  imageUrl: string
  demoUrl?: string
  repoUrl: string
  category: "security" | "development" | "database"
}

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

// Sample projects - these will be replaced by your GitHub projects
const projects: Project[] = [
  {
    id: "fireguard",
    name: "FireGuard-Simulation",
    description: "A web-based security application that mimics the behavior of a real firewall.",
    longDescription:
      "FireGuard-Simulation is a comprehensive web-based security application that accurately mimics the behavior of a real firewall by filtering network traffic based on user-defined rules. It provides a visual interface for monitoring network activity and potential threats in real-time.",
    features: [
      "Real-time network traffic monitoring",
      "Custom rule creation for traffic filtering",
      "Visual alerts for potential security threats",
      "Detailed logging of all network activities",
      "User-friendly dashboard for easy management",
    ],
    technologies: ["TypeScript", "React", "Node.js", "WebSockets", "Network Protocols"],
    imageUrl: "/placeholder.svg?height=400&width=600",
    demoUrl: "#",
    repoUrl: "https://github.com/09JESUS/FireGuard-Simulation",
    category: "security",
  },
  {
    id: "secure-file",
    name: "Secure-File-Transfer",
    description: "A secure file transfer solution with complete control over access and protection.",
    longDescription:
      "Secure-File-Transfer is a robust solution for transferring sensitive files with enhanced security features. It uses IndexedDB for persistent storage and provides complete control over access, expiration, and password protection to ensure your files remain secure throughout the transfer process.",
    features: [
      "End-to-end encryption for all file transfers",
      "Customizable access controls and permissions",
      "Automatic file expiration options",
      "Password protection for sensitive files",
      "Detailed audit logs of all file activities",
    ],
    technologies: ["JavaScript", "IndexedDB", "Encryption Algorithms", "RESTful API", "Express.js"],
    imageUrl: "/placeholder.svg?height=400&width=600",
    demoUrl: "#",
    repoUrl: "https://github.com/09JESUS/Secure-File-Transfer",
    category: "security",
  },
  {
    id: "techcare",
    name: "TechCare-Live",
    description: "An innovative platform for tech support services for individuals and businesses.",
    longDescription:
      "TechCare-Live is a comprehensive platform designed to connect users with technical support specialists. It offers a range of services from troubleshooting to advanced technical consultations, all through an intuitive and accessible interface.",
    features: [
      "Live chat with tech support specialists",
      "Screen sharing capabilities for better assistance",
      "Appointment scheduling system",
      "Knowledge base with common solutions",
      "Customer feedback and rating system",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "WebRTC", "Firebase"],
    imageUrl: "/placeholder.svg?height=400&width=600",
    demoUrl: "#",
    repoUrl: "https://github.com/09JESUS/TechCare-Live",
    category: "development",
  },
  {
    id: "fsolution-pay",
    name: "FSolution-AI-pay",
    description: "Payment solution with AI integration for enhanced security and user experience.",
    longDescription:
      "FSolution-AI-pay is an advanced payment processing system that leverages artificial intelligence to enhance security and improve the user experience. It includes fraud detection algorithms, personalized payment recommendations, and seamless integration with various payment methods.",
    features: [
      "AI-powered fraud detection",
      "Multiple payment method integration",
      "Personalized payment recommendations",
      "Real-time transaction monitoring",
      "Secure payment processing",
    ],
    technologies: ["HTML", "JavaScript", "Payment APIs", "Machine Learning", "Data Analytics"],
    imageUrl: "/placeholder.svg?height=400&width=600",
    demoUrl: "#",
    repoUrl: "https://github.com/09JESUS/FSolution-AI-pay",
    category: "development",
  },
  {
    id: "fake-news",
    name: "Fake-News-Detection",
    description: "Machine learning model to identify and flag potentially false news articles.",
    longDescription:
      "Fake-News-Detection is a sophisticated system that uses natural language processing and machine learning algorithms to analyze news articles and identify potentially false information. It evaluates various factors such as source credibility, content consistency, and linguistic patterns to determine the likelihood of misinformation.",
    features: [
      "Natural language processing for content analysis",
      "Source credibility evaluation",
      "Linguistic pattern recognition",
      "Confidence scoring for detection accuracy",
      "API for integration with news platforms",
    ],
    technologies: ["Python", "Natural Language Processing", "Machine Learning", "TensorFlow", "scikit-learn"],
    imageUrl: "/placeholder.svg?height=400&width=600",
    repoUrl: "https://github.com/09JESUS/Fake-News-Detection",
    category: "security",
  },
  {
    id: "credit-fraud",
    name: "Credit_Card_Fraud-Detection",
    description: "Security system that uses machine learning to detect fraudulent transactions.",
    longDescription:
      "Credit_Card_Fraud-Detection is a comprehensive security system that employs advanced machine learning algorithms to identify potentially fraudulent credit card transactions. It analyzes transaction patterns, user behavior, and other relevant factors to flag suspicious activities in real-time.",
    features: [
      "Real-time transaction analysis",
      "Behavioral pattern recognition",
      "Anomaly detection algorithms",
      "Risk scoring for transactions",
      "Alert system for suspicious activities",
    ],
    technologies: ["Python", "Machine Learning", "Data Analysis", "SQL", "API Integration"],
    imageUrl: "/placeholder.svg?height=400&width=600",
    repoUrl: "https://github.com/09JESUS/Credit_Card_Fraud-Detection",
    category: "security",
  },
]

export default function ProjectViewer() {
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0])
  const [activeTab, setActiveTab] = useState("all")
  const [githubRepos, setGithubRepos] = useState<GithubRepo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGithubRepos = async () => {
      setIsLoading(true)
      try {
        const response = await fetch("https://api.github.com/users/09JESUS/repos?sort=updated&per_page=6")

        if (!response.ok) {
          throw new Error("Failed to fetch GitHub repositories")
        }

        const data = await response.json()
        setGithubRepos(data)

        // Update projects with GitHub data if available
        if (data.length > 0) {
          // Map GitHub repos to our project structure
          const updatedProjects = projects.map((project) => {
            // Find matching GitHub repo by name
            const matchingRepo = data.find(
              (repo) => repo.name.toLowerCase() === project.name.toLowerCase() || project.repoUrl.includes(repo.name),
            )

            if (matchingRepo) {
              return {
                ...project,
                description: matchingRepo.description || project.description,
                repoUrl: matchingRepo.html_url,
                demoUrl: matchingRepo.homepage || project.demoUrl,
                technologies:
                  matchingRepo.topics.length > 0
                    ? matchingRepo.topics.map((t) => t.charAt(0).toUpperCase() + t.slice(1))
                    : matchingRepo.language
                      ? [matchingRepo.language, ...project.technologies.slice(1)]
                      : project.technologies,
              }
            }
            return project
          })

          // Update the first project to be selected
          setSelectedProject(updatedProjects[0])
        }
      } catch (err) {
        console.error("Error fetching GitHub projects:", err)
        setError("Failed to load projects from GitHub")
      } finally {
        setIsLoading(false)
      }
    }

    fetchGithubRepos()

    // Refresh after 3 seconds to catch newly pushed projects
    const refreshTimer = setTimeout(() => {
      console.log("Refreshing GitHub projects data...")
      fetchGithubRepos()
    }, 3000)

    return () => clearTimeout(refreshTimer)
  }, [])

  const refreshGithubRepos = async () => {
    setIsLoading(true)
    try {
      // Add timestamp to prevent caching
      const response = await fetch(`https://api.github.com/users/09JESUS/repos?sort=updated&per_page=6&t=${Date.now()}`)

      if (!response.ok) {
        throw new Error("Failed to refresh GitHub repositories")
      }

      const data = await response.json()
      setGithubRepos(data)

      // Same logic as in useEffect to update projects
      if (data.length > 0) {
        // Map GitHub repos to our project structure
        const updatedProjects = projects.map((project) => {
          const matchingRepo = data.find(
            (repo) => repo.name.toLowerCase() === project.name.toLowerCase() || project.repoUrl.includes(repo.name),
          )

          if (matchingRepo) {
            return {
              ...project,
              description: matchingRepo.description || project.description,
              repoUrl: matchingRepo.html_url,
              demoUrl: matchingRepo.homepage || project.demoUrl,
              technologies:
                matchingRepo.topics.length > 0
                  ? matchingRepo.topics.map((t) => t.charAt(0).toUpperCase() + t.slice(1))
                  : matchingRepo.language
                    ? [matchingRepo.language, ...project.technologies.slice(1)]
                    : project.technologies,
            }
          }
          return project
        })

        // Keep the currently selected project if possible
        const currentProjectIndex = updatedProjects.findIndex((p) => p.id === selectedProject.id)
        if (currentProjectIndex >= 0) {
          setSelectedProject(updatedProjects[currentProjectIndex])
        } else {
          setSelectedProject(updatedProjects[0])
        }
      }
    } catch (err) {
      console.error("Error refreshing GitHub projects:", err)
      setError("Failed to refresh projects from GitHub")
    } finally {
      setIsLoading(false)
    }
  }

  const filteredProjects = activeTab === "all" ? projects : projects.filter((project) => project.category === activeTab)

  return (
    <div className="w-full">
      <div className="flex justify-end mb-4">
        <Button
          onClick={refreshGithubRepos}
          variant="outline"
          className="border-green-500/30 text-green-400 hover:bg-green-500/10 text-sm flex items-center gap-1"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-3 w-3 animate-spin" />
              <span>Refreshing...</span>
            </>
          ) : (
            <>
              <RefreshCw className="h-3 w-3" />
              <span>Refresh Projects</span>
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-center mb-6">
          <TabsList className="bg-black/40 border border-green-500/20">
            <TabsTrigger value="all" className="data-[state=active]:bg-green-500 data-[state=active]:text-black">
              All Projects
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-green-500 data-[state=active]:text-black">
              <Shield className="mr-2 h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger
              value="development"
              className="data-[state=active]:bg-green-500 data-[state=active]:text-black"
            >
              <Code className="mr-2 h-4 w-4" />
              Development
            </TabsTrigger>
            <TabsTrigger value="database" className="data-[state=active]:bg-green-500 data-[state=active]:text-black">
              <Database className="mr-2 h-4 w-4" />
              Database
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid grid-cols-2 gap-4 h-fit">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedProject.id === project.id ? "scale-105 shadow-lg shadow-green-500/10" : "hover:scale-105"
                  }`}
                >
                  <Card
                    className={`h-full bg-black/40 border-green-500/20 ${
                      selectedProject.id === project.id ? "border-green-500" : "hover:border-green-500/40"
                    }`}
                  >
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={project.imageUrl || "/placeholder.svg"}
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="p-3">
                      <h3 className="text-sm font-bold text-white truncate">{project.name}</h3>
                    </CardHeader>
                  </Card>
                </div>
              ))}
            </div>

            <Card className="bg-black/40 border-green-500/20">
              <CardHeader>
                <h3 className="text-xl font-bold text-green-500">{selectedProject.name}</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedProject.technologies.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="outline" className="border-green-500/30 text-green-400 bg-green-500/5">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <div className="aspect-video w-full overflow-hidden mb-4 rounded-md">
                  <img
                    src={selectedProject.imageUrl || "/placeholder.svg"}
                    alt={selectedProject.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-gray-300 mb-4">{selectedProject.longDescription}</p>
                <div className="mt-4">
                  <h4 className="font-semibold text-white mb-2">Key Features:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-300">
                    {selectedProject.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                {selectedProject.demoUrl && (
                  <Button
                    variant="outline"
                    className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                    asChild
                  >
                    <Link
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Demo
                    </Link>
                  </Button>
                )}
                <Button variant="outline" className="border-green-500/30 text-green-400 hover:bg-green-500/10" asChild>
                  <Link
                    href={selectedProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                  >
                    <Github className="h-4 w-4" />
                    View Code
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="mt-0">
          {/* Same structure as "all" tab but with filtered projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid grid-cols-2 gap-4 h-fit">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedProject.id === project.id ? "scale-105 shadow-lg shadow-green-500/10" : "hover:scale-105"
                  }`}
                >
                  <Card
                    className={`h-full bg-black/40 border-green-500/20 ${
                      selectedProject.id === project.id ? "border-green-500" : "hover:border-green-500/40"
                    }`}
                  >
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={project.imageUrl || "/placeholder.svg"}
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="p-3">
                      <h3 className="text-sm font-bold text-white truncate">{project.name}</h3>
                    </CardHeader>
                  </Card>
                </div>
              ))}
            </div>

            {filteredProjects.length > 0 ? (
              <Card className="bg-black/40 border-green-500/20">
                <CardHeader>
                  <h3 className="text-xl font-bold text-green-500">{selectedProject.name}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedProject.technologies.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="outline" className="border-green-500/30 text-green-400 bg-green-500/5">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video w-full overflow-hidden mb-4 rounded-md">
                    <img
                      src={selectedProject.imageUrl || "/placeholder.svg"}
                      alt={selectedProject.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-gray-300 mb-4">{selectedProject.longDescription}</p>
                  <div className="mt-4">
                    <h4 className="font-semibold text-white mb-2">Key Features:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-300">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  {selectedProject.demoUrl && (
                    <Button
                      variant="outline"
                      className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                      asChild
                    >
                      <Link
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View Demo
                      </Link>
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                    asChild
                  >
                    <Link
                      href={selectedProject.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      <Github className="h-4 w-4" />
                      View Code
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-400">No security projects found</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="development" className="mt-0">
          {/* Same structure as "security" tab */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid grid-cols-2 gap-4 h-fit">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedProject.id === project.id ? "scale-105 shadow-lg shadow-green-500/10" : "hover:scale-105"
                  }`}
                >
                  <Card
                    className={`h-full bg-black/40 border-green-500/20 ${
                      selectedProject.id === project.id ? "border-green-500" : "hover:border-green-500/40"
                    }`}
                  >
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={project.imageUrl || "/placeholder.svg"}
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="p-3">
                      <h3 className="text-sm font-bold text-white truncate">{project.name}</h3>
                    </CardHeader>
                  </Card>
                </div>
              ))}
            </div>

            {filteredProjects.length > 0 ? (
              <Card className="bg-black/40 border-green-500/20">
                <CardHeader>
                  <h3 className="text-xl font-bold text-green-500">{selectedProject.name}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedProject.technologies.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="outline" className="border-green-500/30 text-green-400 bg-green-500/5">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video w-full overflow-hidden mb-4 rounded-md">
                    <img
                      src={selectedProject.imageUrl || "/placeholder.svg"}
                      alt={selectedProject.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-gray-300 mb-4">{selectedProject.longDescription}</p>
                  <div className="mt-4">
                    <h4 className="font-semibold text-white mb-2">Key Features:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-300">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  {selectedProject.demoUrl && (
                    <Button
                      variant="outline"
                      className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                      asChild
                    >
                      <Link
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View Demo
                      </Link>
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                    asChild
                  >
                    <Link
                      href={selectedProject.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      <Github className="h-4 w-4" />
                      View Code
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-400">No development projects found</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="database" className="mt-0">
          {/* Same structure as "security" tab */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid grid-cols-2 gap-4 h-fit">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedProject.id === project.id ? "scale-105 shadow-lg shadow-green-500/10" : "hover:scale-105"
                  }`}
                >
                  <Card
                    className={`h-full bg-black/40 border-green-500/20 ${
                      selectedProject.id === project.id ? "border-green-500" : "hover:border-green-500/40"
                    }`}
                  >
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={project.imageUrl || "/placeholder.svg"}
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="p-3">
                      <h3 className="text-sm font-bold text-white truncate">{project.name}</h3>
                    </CardHeader>
                  </Card>
                </div>
              ))}
            </div>

            {filteredProjects.length > 0 ? (
              <Card className="bg-black/40 border-green-500/20">
                <CardHeader>
                  <h3 className="text-xl font-bold text-green-500">{selectedProject.name}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedProject.technologies.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="outline" className="border-green-500/30 text-green-400 bg-green-500/5">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video w-full overflow-hidden mb-4 rounded-md">
                    <img
                      src={selectedProject.imageUrl || "/placeholder.svg"}
                      alt={selectedProject.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-gray-300 mb-4">{selectedProject.longDescription}</p>
                  <div className="mt-4">
                    <h4 className="font-semibold text-white mb-2">Key Features:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-300">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  {selectedProject.demoUrl && (
                    <Button
                      variant="outline"
                      className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                      asChild
                    >
                      <Link
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View Demo
                      </Link>
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                    asChild
                  >
                    <Link
                      href={selectedProject.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      <Github className="h-4 w-4" />
                      View Code
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-400">No database projects found</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

