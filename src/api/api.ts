// NASA api

export interface ApodResponse {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: 'image' | 'video';
  service_version: string;
  title: string;
  url: string;
}

export default async function APOD(count: number = 5): Promise<ApodResponse[]> {
  try {
    const results: ApodResponse[] = [];
    let endDate = new Date();

    while (results.length < count) {
      const startDate = new Date(endDate);
      startDate.setDate(startDate.getDate() - (count - results.length - 1));

      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_API_KEY}&start_date=${startDate
          .toISOString()
          .slice(0, 10)}&end_date=${endDate.toISOString().slice(0, 10)}`
      );

      if (!response.ok) {
        throw new Error(`NASA API error: ${response.status}`);
      }

      const data: ApodResponse[] | ApodResponse = await response.json();
      const arr = Array.isArray(data) ? data : [data];

      results.push(...arr);

      const oldest = new Date(startDate);
      oldest.setDate(oldest.getDate() - 1);
      endDate = oldest;
    }

    return results.sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, count);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(String(error));
    }
  }
}

// export default async function APOD(count: number = 5): Promise<ApodResponse[]> {
//   try {
//     const response = await fetch(
//       `https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_API_KEY}&count=${count}`
//     );

//     if (!response.ok) {
//       throw new Error(`NASA API error: ${response.status}`);
//     }

//     const data: ApodResponse[] | ApodResponse = await response.json();
//     const results = Array.isArray(data) ? data : [data];

//     return results.sort((a, b) => (a.date < b.date ? 1 : -1));
//   } catch (error) {
//     console.error('Error fetching NASA APOD:', error);
//     throw error;
//   }
// }
