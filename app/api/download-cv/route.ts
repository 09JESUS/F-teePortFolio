import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Redirect to the generate-resume API route
    return NextResponse.redirect(
      new URL("/api/generate-resume", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
    )
  } catch (error) {
    console.error("Error in download-cv route:", error)

    // Redirect to HTML version as fallback
    return NextResponse.redirect(
      new URL("/documents/forget-nukeri-cv.html", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
    )
  }
}

