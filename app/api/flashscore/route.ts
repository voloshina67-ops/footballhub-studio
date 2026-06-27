import { NextRequest, NextResponse } from "next/server";
import { chromium } from "playwright";

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  const browser = await chromium.launch({
    headless: true,
  });

  try {
    const page = await browser.newPage();

    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    await page.waitForTimeout(3000);

    const title = await page.title();

    return NextResponse.json({
      success: true,
      title,
      url,
    });

  } catch (error: any) {

    return NextResponse.json({
      success: false,
      error: error.message,
    });

  } finally {
    await browser.close();
  }
}
