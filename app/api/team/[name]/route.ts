import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(
  request: Request,
  context: { params: Promise<{ name: string }> }
) {
  const { name } = await context.params;

  try {
    const file = await fs.readFile(
      path.join(
        process.cwd(),
        "data",
        "teams",
        `${name.toLowerCase()}.json`
      ),
      "utf8"
    );

    return NextResponse.json(JSON.parse(file));
  } catch {
    return NextResponse.json({
      name,
      players: []
    });
  }
}
