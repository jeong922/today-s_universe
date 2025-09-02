// NASA api

export default async function APOD() {
  try {
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_API_KEY}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
