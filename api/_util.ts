import type { IncomingMessage, ServerResponse } from 'node:http';

// Tiny helpers shared by the serverless functions. Written against Node's
// http types so the same handlers run under Vercel and the Vite dev middleware.

export async function readJsonBody<T = unknown>(
  req: IncomingMessage
): Promise<T> {
  // Vercel may have already parsed the body.
  const anyReq = req as IncomingMessage & { body?: unknown };
  if (anyReq.body && typeof anyReq.body === 'object') return anyReq.body as T;

  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  const raw = Buffer.concat(chunks).toString('utf8').trim();
  if (!raw) return {} as T;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return {} as T;
  }
}

export function sendJson(
  res: ServerResponse,
  status: number,
  data: unknown
): void {
  res.statusCode = status;
  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.setHeader('cache-control', 'no-store');
  res.end(JSON.stringify(data));
}

export function getQuery(req: IncomingMessage, key: string): string | null {
  const url = new URL(req.url ?? '', 'http://localhost');
  return url.searchParams.get(key);
}
