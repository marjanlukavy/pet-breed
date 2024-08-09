import React, { useState } from "react";

import { getBreeds } from "@/utils/getBreeds";
import BreedCard from "@/components/BreedCard";
import { Breed } from "@/types/types";

export default async function Home() {
  let breeds: Breed[] = [];
  let error: string | null = null;

  try {
    breeds = await getBreeds();
  } catch (e) {
    error = "Failed to load breeds. Please try again later.";
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Random Cat and Dog Breeds</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {breeds.map((breed) => (
          <BreedCard key={breed.id} breed={breed} id={breed.id} />
        ))}
      </div>
    </main>
  );
}
