import PetInfo from "@/components/PetInfo";
import { fetchBreedData } from "@/utils/api";
import React, { Suspense, useEffect, useState } from "react";

const AnimalPage = async ({
  params: { breed },
}: {
  params: { breed: string };
}) => {
  const animalType = isNaN(Number(breed)) ? "cat" : "dog";
  const data = await fetchBreedData(breed, animalType);

  return <PetInfo breedData={data} isCat={animalType === "cat"} />;
};

export default AnimalPage;
