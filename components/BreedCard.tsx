import React from "react";
import { Breed } from "@/types/types";
import Link from "next/link";
import Image from "next/image";

interface BreedCardProps {
  breed: Breed;
  id: string;
}

export default function BreedCard({ breed, id }: BreedCardProps) {
  return (
    <Link
      href={`${id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-2 cursor-pointer"
    >
      <div className="relative size-56">
        <Image
          src={breed.image?.url || "/api/placeholder/400/300"}
          alt={breed?.name}
          fill
          className="w-full h-56 object-cover"
        />
        {breed?.breed_group ? (
          <div className="absolute bottom-0 left-0 bg-indigo-600 bg-opacity-75 text-white text-xs font-semibold px-4 py-1 rounded-tr-lg">
            {breed?.breed_group}
          </div>
        ) : null}
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2 text-gray-800">{breed?.name}</h2>
        {breed?.temperament && (
          <p className="text-gray-600 text-sm mb-4">{breed?.temperament}</p>
        )}
      </div>
    </Link>
  );
}
