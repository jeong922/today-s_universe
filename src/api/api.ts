export interface ApodResponse {
  copyright?: string;
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: 'image' | 'video';
  service_version: string;
  title: string;
  url: string;
}

export default async function APOD(count: number = 5): Promise<ApodResponse[]> {
  const TIMEOUT_MS = 30000;

  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, TIMEOUT_MS);

  try {
    const response = await fetch(`/api/apod?count=${count}`, {
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`APOD API error: ${response.status}`);
    }

    const data: ApodResponse[] | ApodResponse = await response.json();

    const results = Array.isArray(data) ? data : [data];

    return results.sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch (error: unknown) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      console.error(`APOD request aborted after ${TIMEOUT_MS / 1000}s`);

      throw new Error(`Request timed out after ${TIMEOUT_MS / 1000}s`);
    }

    if (error instanceof Error) {
      console.error('Error fetching APOD:', error.message);

      throw error;
    }

    console.error('Unexpected error fetching APOD:', error);

    throw new Error('Unexpected error');
  } finally {
    clearTimeout(timeoutId);
  }
}
