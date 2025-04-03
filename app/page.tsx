import { Github, Mail, Linkedin, Phone, Globe, Shield, Code, Database } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ProjectViewer from "@/components/project-viewer"
import SkillBadge from "@/components/skill-badge"
import ContactForm from "@/components/contact-form"
import VideoShowcase from "@/components/video-showcase"
import AutoRefreshGithub from "@/components/auto-refresh-github"
import ResumeButton from "@/components/resume-button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 w-full border-b border-green-500/20 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="font-bold text-xl text-green-500">FSolution.-Dev</div>
          <nav className="hidden md:flex gap-6">
            <Link href="#about" className="text-gray-400 hover:text-green-500 transition-colors">
              About
            </Link>
            <Link href="#skills" className="text-gray-400 hover:text-green-500 transition-colors">
              Skills
            </Link>
            <Link href="#projects" className="text-gray-400 hover:text-green-500 transition-colors">
              Projects
            </Link>
            <Link href="#videos" className="text-gray-400 hover:text-green-500 transition-colors">
              Videos
            </Link>
            <Link href="#contact" className="text-gray-400 hover:text-green-500 transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="border-green-500 text-green-500 hover:bg-green-500/10"
              asChild
            >
              <Link href="https://github.com/09JESUS" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-green-500 text-green-500 hover:bg-green-500/10"
              asChild
            >
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-black to-gray-900 border-b border-green-500/20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Hi, I'm <span className="text-green-500">Forget Nukeri</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  Final Year IT Student at NWU | Aspiring Cybersecurity Specialist & Software Developer
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="bg-green-500 hover:bg-green-600 text-black" asChild>
                  <Link href="#contact">Get in Touch</Link>
                </Button>
                <ResumeButton />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 md:py-24 border-b border-green-500/20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-green-500/10 px-3 py-1 text-sm text-green-500">About Me</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Cybersecurity Enthusiast & Developer
                </h2>
                <p className="text-gray-300 md:text-lg">
                  I'm a final year Information Technology student at North-West University (NWU), specializing in
                  cybersecurity and software development. My passion lies in creating secure, efficient solutions that
                  solve real-world problems.
                </p>
                <p className="text-gray-300 md:text-lg">
                  I'm the founder of <span className="text-green-500 font-semibold">FSolution.-Dev</span>, a web
                  development company where I create custom websites for clients as a part-time job. I leverage modern
                  technologies like React and Tailwind CSS to deliver exceptional digital experiences.
                </p>
                <p className="text-gray-300 md:text-lg">
                  My goal is to build a career at the intersection of cybersecurity and software engineering, where I
                  can help organizations protect their digital assets while creating innovative solutions.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-full overflow-hidden border-4 border-green-500/30 shadow-xl shadow-green-500/10">
                  <img src="/images/profile.png" alt="Forget Nukeri" className="object-cover w-full h-full" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-16 md:py-24 bg-gray-900 border-b border-green-500/20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-green-500/10 px-3 py-1 text-sm text-green-500">Skills</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Technical Expertise</h2>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-lg">
                  My skillset spans cybersecurity, software development, and database management
                </p>
              </div>

              <div className="w-full max-w-4xl mt-8">
                <h3 className="text-xl font-semibold mb-4 text-green-500 flex items-center">
                  <Shield className="mr-2 h-5 w-5" /> Cybersecurity
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
                  <SkillBadge name="Network Security" level={85} />
                  <SkillBadge name="Vulnerability Assessment" level={80} />
                  <SkillBadge name="Security Auditing" level={75} />
                  <SkillBadge name="Cryptography" level={75} />
                  <SkillBadge name="Security Protocols" level={80} />
                  <SkillBadge name="Threat Analysis" level={75} />
                  <SkillBadge name="Incident Response" level={70} />
                  <SkillBadge name="Security Compliance" level={75} />
                </div>

                <h3 className="text-xl font-semibold mb-4 text-green-500 flex items-center">
                  <Code className="mr-2 h-5 w-5" /> Development
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
                  <SkillBadge name="React" level={90} />
                  <SkillBadge name="Next.js" level={85} />
                  <SkillBadge name="JavaScript" level={90} />
                  <SkillBadge name="TypeScript" level={80} />
                  <SkillBadge name="Tailwind CSS" level={90} />
                  <SkillBadge name="Node.js" level={80} />
                  <SkillBadge name="Python" level={75} />
                  <SkillBadge name="Git" level={85} />
                </div>

                <h3 className="text-xl font-semibold mb-4 text-green-500 flex items-center">
                  <Database className="mr-2 h-5 w-5" /> Database & Other
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  <SkillBadge name="SQL (MySQL Workbench)" level={85} />
                  <SkillBadge name="Database Design" level={80} />
                  <SkillBadge name="MongoDB" level={75} />
                  <SkillBadge name="Problem Solving" level={90} />
                  <SkillBadge name="System Architecture" level={75} />
                  <SkillBadge name="UI/UX Design" level={80} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 md:py-24 border-b border-green-500/20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-green-500/10 px-3 py-1 text-sm text-green-500">Projects</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">My Projects</h2>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-lg">
                  Explore my portfolio of cybersecurity and development projects
                </p>
              </div>
              <AutoRefreshGithub>
                <ProjectViewer />
              </AutoRefreshGithub>
            </div>
          </div>
        </section>

        {/* Video Showcase Section */}
        <section id="videos" className="py-16 md:py-24 bg-gray-900 border-b border-green-500/20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-green-500/10 px-3 py-1 text-sm text-green-500">
                  Video Showcase
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">See My Work in Action</h2>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-lg">
                  Watch demonstrations of my projects and skills
                </p>
              </div>
              <VideoShowcase />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-24 bg-black">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-green-500/10 px-3 py-1 text-sm text-green-500">Contact</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Get In Touch</h2>
                <p className="text-gray-300 md:text-lg">
                  I'm always open to discussing new projects, job opportunities, or collaborations.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Mail className="h-5 w-5 text-green-500" />
                    <span>forgetnukeri585@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Phone className="h-5 w-5 text-green-500" />
                    <span>076 285 2630</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Globe className="h-5 w-5 text-green-500" />
                    <span>FSolution.-Dev</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Github className="h-5 w-5 text-green-500" />
                    <span>github.com/09JESUS</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-green-500/20 py-6 md:py-0 bg-black">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-16">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} FSolution.-Dev | Forget Nukeri. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm text-gray-400 hover:text-green-500 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-green-500 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

