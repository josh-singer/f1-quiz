import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { DRIVERS, QUESTIONS } from "@/lib/drivers";

const client = new Anthropic();

async function getWikipediaPhoto(wikiTitle: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiTitle)}`,
      { headers: { "User-Agent": "F1Quiz/1.0" } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.originalimage?.source ?? data.thumbnail?.source ?? null;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
  const { answers } = await req.json();

  if (!Array.isArray(answers) || answers.length !== 8) {
    return NextResponse.json({ error: "Expected 8 answers" }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey === "your_anthropic_api_key_here") {
    return NextResponse.json({ error: "ANTHROPIC_API_KEY is not configured in .env.local" }, { status: 500 });
  }

  const driverList = DRIVERS.map((d) => `${d.name} (${d.team})`).join("\n");

  const qa = QUESTIONS.map((q, i) => `Q${i + 1}: ${q}\nAnswer: ${answers[i]}`).join("\n\n");

  const message = await client.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `You are the ultimate F1 quiz engine. Based on these quiz answers, pick which current 2025 F1 driver this person is most like — then absolutely roast them.

Current 2025 F1 grid:
${driverList}

Quiz answers:
${qa}

Rules:
- Pick the best driver match based on personality, not performance
- Write a SAVAGE, irreverent, genuinely funny roast bio. 4-5 sentences. Be mean. Reference their specific answers. Compare them unfavorably to the driver in a funny way. No mercy. No compliments. Make it sting.
- The driverId must be the driver's last name in lowercase (e.g. "verstappen", "leclerc", "antonelli")

Respond with a JSON object ONLY — no markdown, no backticks:
{
  "driverName": "Full name",
  "driverId": "lastname",
  "team": "Team name",
  "bio": "The roast bio here"
}`,
      },
    ],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "";

  let result: { driverName: string; driverId: string; team: string; bio: string };
  try {
    result = JSON.parse(text);
  } catch {
    // Try to extract JSON if Claude added any surrounding text
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) {
      return NextResponse.json({ error: "Failed to parse Claude response" }, { status: 500 });
    }
    result = JSON.parse(match[0]);
  }

  // Find the driver's color data
  const driverData = DRIVERS.find(
    (d) => d.id === result.driverId || d.name === result.driverName
  );

  // Fetch Wikipedia photo
  const photo = driverData ? await getWikipediaPhoto(driverData.wikiTitle) : null;

  return NextResponse.json({
    ...result,
    photo,
    colors: driverData?.colors ?? { primary: "#1a1a1a", secondary: "#ffffff", text: "#ffffff" },
  });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
