/* Core */
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  const { amount = 1 } = body;

  // simulate IO latency
  await new Promise((r) => setTimeout(r, 500));

  return NextResponse.json({ data: amount });
}

// This is my trial, You can make simple api calls with these functions.
// NB: the file is always named 'route.ts', and API calls are uppercase
export async function GET(req: Request, res: Response) {
  const { host, searchParams, search } = new URL(req.url);
  const data = [
    {
      id: 23,
      name: search,
    },
  ];

  return NextResponse.json(data);
}
