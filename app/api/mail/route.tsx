import type { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);

  return Response.json(200);
}
