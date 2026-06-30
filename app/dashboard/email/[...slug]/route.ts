import { NextResponse } from "next/server";

export function GET(request: Request, { params }: { params: { slug: string[] } }) {
  return NextResponse.redirect(new URL(`/email/${params.slug.join("/")}`, request.url));
}
