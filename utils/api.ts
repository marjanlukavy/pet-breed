// utils/api.ts

import { Breed } from "@/types/types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY is not defined");
}

const headers = {
  "x-api-key": API_KEY,
};

async function fetchBreeds(url: string): Promise<Breed[]> {
  const response = await fetch(url, {
    headers,
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch breeds from ${url}`);
  }

  return response.json();
}

export async function getBreeds(): Promise<Breed[]> {
  try {
    const [dogs, cats] = await Promise.all([
      fetchBreeds("https://api.thedogapi.com/v1/breeds?limit=10"),
      fetchBreeds("https://api.thecatapi.com/v1/breeds?limit=10"),
    ]);

    const fetchImage = async (imageId: string): Promise<string> => {
      const response = await fetch(
        `https://api.thecatapi.com/v1/images/${imageId}`,
        { headers }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch image with id ${imageId}`);
      }

      const data = await response.json();
      return data.url;
    };

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

export async function fetchBreedData(
  breedId: string,
  animalType: "cat" | "dog"
): Promise<Breed> {
  let url = "";

  if (animalType === "cat") {
    url = `https://api.thecatapi.com/v1/breeds/${breedId}`;
  } else {
    url = `https://api.thedogapi.com/v1/breeds/${breedId}`;
  }

  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error("Failed to fetch breed data");
  }

  return response.json();
}

export async function searchBreeds(
  query: string,
  animalType: "cat" | "dog"
): Promise<Breed[]> {
  const url = `https://api.the${animalType}api.com/v1/breeds/search?q=${query}`;

  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(`Failed to search breeds with query: ${query}`);
  }

  return response.json();
}
