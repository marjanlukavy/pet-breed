export async function fetchBreedData(
  breedId: string,
  animalType: "cat" | "dog"
) {
  let url = "";

  if (animalType === "cat") {
    url = `https://api.thecatapi.com/v1/breeds/${breedId}`;
  } else {
    url = `https://api.thedogapi.com/v1/breeds/${breedId}`;
  }

  const response = await fetch(url, {});

  if (!response.ok) {
    throw new Error("Failed to fetch breed data");
  }

  return response.json();
}
