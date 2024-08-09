import { Breed } from "@/types/types";

export async function getBreeds(): Promise<Breed[]> {
  const API_KEY = process.env.API_KEY;
  if (!API_KEY) {
    throw new Error("API_KEY is not defined");
  }

  const fetchBreeds = async (url: string): Promise<Breed[]> => {
    const response = await fetch(url, {
      headers: {
        "x-api-key": API_KEY,
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch breeds from ${url}`);
    }

    return response.json();
  };

  const fetchImage = async (imageId: string): Promise<string> => {
    const response = await fetch(
      `https://api.thecatapi.com/v1/images/${imageId}`,
      {
        headers: {
          "x-api-key": API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch image with id ${imageId}`);
    }

    const data = await response.json();
    return data.url;
  };

  try {
    const [dogs, cats] = await Promise.all([
      fetchBreeds("https://api.thedogapi.com/v1/breeds?limit=10"),
      fetchBreeds("https://api.thecatapi.com/v1/breeds?limit=10"),
    ]);

    const catsWithImages = await Promise.all(
      cats.map(async (cat) => {
        const imageUrl = await fetchImage(cat.reference_image_id);
        return { ...cat, image: { url: imageUrl } };
      })
    );

    return [...dogs, ...catsWithImages];
  } catch (error) {
    console.error("Error fetching breeds:", error);
    throw error;
  }
}
