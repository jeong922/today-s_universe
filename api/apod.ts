import type { VercelRequest, VercelResponse } from '@vercel/node';

const TIMEOUT_MS = 30_000;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      message: 'Method Not Allowed',
    });
  }

  const count = Number(req.query.count ?? 5);

  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, TIMEOUT_MS);

  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&count=${count}`,
      {
        signal: controller.signal,
      },
    );

    if (!response.ok) {
      throw new Error(`NASA API error: ${response.status}`);
    }

    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return res.status(504).json({
        message: 'NASA API request timed out',
      });
    }

    console.error('NASA APOD error:', error);

    return res.status(500).json({
      message: 'Failed to fetch NASA APOD',
    });
  } finally {
    clearTimeout(timeoutId);
  }
}
