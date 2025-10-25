import type { ApodResponse } from './api';

export const mockApodData: ApodResponse[] = [
  {
    date: '2025-10-25',
    explanation: 'A dazzling nebula captured in full spectrum by the James Webb Space Telescope.',
    hdurl: 'https://apod.nasa.gov/apod/image/2410/nebula_hd.jpg',
    media_type: 'image',
    service_version: 'v1',
    title: 'The Radiant Nebula',
    url: 'https://apod.nasa.gov/apod/image/2410/nebula_1024.jpg',
    copyright: '',
  },
  {
    date: '2025-10-24',
    explanation: 'A crescent Moon rising over a calm ocean, illuminating the night sky.',
    hdurl: 'https://apod.nasa.gov/apod/image/2410/moonrise_hd.jpg',
    media_type: 'image',
    service_version: 'v1',
    title: 'Moonrise over the Sea',
    url: 'https://apod.nasa.gov/apod/image/2410/moonrise_1024.jpg',
    copyright: '',
  },
  {
    date: '2025-10-23',
    explanation: 'The Milky Way galaxy arches over a remote desert landscape.',
    hdurl: 'https://apod.nasa.gov/apod/image/2410/milkyway_hd.jpg',
    media_type: 'image',
    service_version: 'v1',
    title: 'Milky Way over the Desert',
    url: 'https://apod.nasa.gov/apod/image/2410/milkyway_1024.jpg',
    copyright: '',
  },
  {
    date: '2025-10-22',
    explanation: 'An artistic composite showing a solar eclipse sequence.',
    hdurl: 'https://apod.nasa.gov/apod/image/2410/eclipse_hd.jpg',
    media_type: 'image',
    service_version: 'v1',
    title: 'Path of the Eclipse',
    url: 'https://apod.nasa.gov/apod/image/2410/eclipse_1024.jpg',
    copyright: '',
  },
  {
    date: '2025-10-21',
    explanation: "A breathtaking view of Saturn's rings captured by the Cassini spacecraft.",
    hdurl: 'https://apod.nasa.gov/apod/image/2410/saturn_hd.jpg',
    media_type: 'image',
    service_version: 'v1',
    title: "Saturn's Rings in Detail",
    url: 'https://apod.nasa.gov/apod/image/2410/saturn_1024.jpg',
    copyright: '',
  },
];

export default async function mockAPOD(count: number = 5): Promise<ApodResponse[]> {
  try {
    await new Promise((res) => setTimeout(res, 300));
    return mockApodData.slice(0, count);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(String(error));
    }
  }
}
