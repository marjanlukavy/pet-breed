import { ApiResponse, Breed } from "@/types/types";

async function fetchBreeds(apiUrl: string): Promise<Breed[]> {
  const response = await fetch(apiUrl, {});

  if (!response.ok) {
    throw new Error("Failed to fetch breeds");
  }

  const data: ApiResponse = await response.json();
  return data[Object.keys(data)[0]];
}

export async function fetchDogBreeds(): Promise<Breed[]> {
  return fetchBreeds("https://api.thedogapi.com/v1/breeds?limit=10");
}

export async function fetchCatBreeds(): Promise<Breed[]> {
  return fetchBreeds("https://api.thecatapi.com/v1/breeds?limit=10");
}
