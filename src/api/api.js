// NASA api

export default async function APOD() {
  try {
    const today = new Date();
    const endDate = today.toISOString().slice(0, 10);

    const start = new Date();
    start.setDate(today.getDate() - 4);
    const startDate = start.toISOString().slice(0, 10);

    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${
        import.meta.env.VITE_API_KEY
      }&start_date=${startDate}&end_date=${endDate}`
    );

    if (!response.ok) {
      throw new Error('NASA API error');
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error(error);
  }
}
