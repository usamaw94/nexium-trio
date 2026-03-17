import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'https://affectionate-magenta-kangaroo.39-61-46-46.cpanel.site/api';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const url = `${BACKEND_URL}/storage/${path.join('/')}`;

  const response = await fetch(url, {
    headers: { 'User-Agent': 'NextJS-Image-Proxy/1.0' },
  });

  if (!response.ok) {
    return new NextResponse(null, { status: response.status });
  }

  const contentType = response.headers.get('Content-Type') || 'application/octet-stream';
  const buffer = await response.arrayBuffer();

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
