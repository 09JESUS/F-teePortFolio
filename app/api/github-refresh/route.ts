import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Fetch repositories with cache-busting query parameter
    const response = await fetch(
      "https://api.github.com/users/09JESUS/repos?sort=updated&per_page=6&timestamp=" + Date.now(),
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "Portfolio-App",
        },
        cache: "no-store", // Ensure we don't use cached data
      },
    )

    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json({
      success: true,
      data,
      refreshedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error refreshing GitHub data:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch GitHub repositories",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

