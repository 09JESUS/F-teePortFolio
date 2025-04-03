import { NextResponse } from "next/server"
import puppeteer from "puppeteer"

export async function GET() {
  try {
    // Get the site URL from environment variables
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

    // Launch a headless browser
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    })

    // Create a new page
    const page = await browser.newPage()

    // Navigate to the resume HTML page
    await page.goto(`${siteUrl}/documents/forget-nukeri-cv.html`, {
      waitUntil: "networkidle0",
    })

    // Generate PDF
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20px",
        right: "20px",
        bottom: "20px",
        left: "20px",
      },
    })

    // Close the browser
    await browser.close()

    // Return the PDF with appropriate headers
    return new NextResponse(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="forget-nukeri-cv.pdf"',
      },
    })
  } catch (error) {
    console.error("Error generating PDF:", error)

    // Redirect to HTML version as fallback
    return NextResponse.redirect(
      new URL("/documents/forget-nukeri-cv.html", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
    )
  }
}

