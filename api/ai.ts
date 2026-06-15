import type { IncomingMessage, ServerResponse } from 'node:http';
import { readJsonBody, sendJson } from './_util';

// Serverless proxy for Claude (spec §2, §6.3). Holds ANTHROPIC_API_KEY so it
// never reaches the client. On any failure it returns a non-2xx status and the
// client falls back to the deterministic rule engine.

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';
const DEFAULT_MODEL = 'claude-sonnet-4-6';

interface AiRequest {
  system?: string;
  user?: string;
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> {
  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'method_not_allowed' });
    return;
  }

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    // No key configured → tell the client to use its rule fallback.
    sendJson(res, 503, { error: 'no_api_key' });
    return;
  }

  const { system, user } = await readJsonBody<AiRequest>(req);
  if (!user) {
    sendJson(res, 400, { error: 'missing_user_message' });
    return;
  }

  try {
    const upstream = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: process.env.AI_MODEL || DEFAULT_MODEL,
        max_tokens: 1500,
        temperature: 0.7,
        system: system ?? '',
        messages: [{ role: 'user', content: user }],
      }),
    });

    if (!upstream.ok) {
      const detail = await upstream.text().catch(() => '');
      sendJson(res, 502, { error: 'upstream_error', status: upstream.status, detail });
      return;
    }

    const data = (await upstream.json()) as {
      content?: { type: string; text?: string }[];
    };
    const text =
      data.content
        ?.filter((b) => b.type === 'text')
        .map((b) => b.text ?? '')
        .join('') ?? '';

    sendJson(res, 200, { text });
  } catch (err) {
    sendJson(res, 500, { error: 'proxy_error', detail: String(err) });
  }
}
