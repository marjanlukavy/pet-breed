import { Breed } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PetInfoProps {
  breedData: Breed;
  isCat: boolean;
}

const PetInfo = ({ breedData, isCat }: PetInfoProps) => {
  return (
    <div className="p-10">
      <Link
        href={"/"}
        className=" text-white max-w-[150px] w-full grid place-content-center py-2 border-2 rounded-full hover:bg-white hover:text-black transition-border duration-300 ease-in-out"
      >
        Go Back
      </Link>
      <div className="bg-white rounded-3xl shadow-md overflow-hidden max-w-5xl mx-auto my-10">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {breedData.reference_image_id && (
            <div className="relative size-[300px]">
              <Image
                src={`https://cdn2.the${isCat ? "cat" : "dog"}api.com/images/${
                  breedData.reference_image_id
                }.jpg`}
                fill
                alt={breedData.name}
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent w-full p-4 text-white">
                <h1 className="text-3xl font-bold">{breedData.name}</h1>
                <p className="text-sm">{breedData.origin}</p>
              </div>
            </div>
          )}
          <div className="p-6 md:p-8 space-y-6 flex flex-col justify-center">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Temperament
              </h2>
              <p className="text-gray-600 mt-2">{breedData.temperament}</p>
            </div>

            {isCat ? (
              <>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    Description
                  </h2>
                  <p className="text-gray-600 mt-2">{breedData.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Affection Level
                    </h2>
                    <p className="text-gray-600 mt-2">
                      {breedData.affection_level}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Child Friendly
                    </h2>
                    <p className="text-gray-600 mt-2">
                      {breedData.child_friendly}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Dog Friendly
                    </h2>
                    <p className="text-gray-600 mt-2">
                      {breedData.dog_friendly}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Energy Level
                    </h2>
                    <p className="text-gray-600 mt-2">
                      {breedData.energy_level}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Bred For
                    </h2>
                    <p className="text-gray-600 mt-2">{breedData.bred_for}</p>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Breed Group
                    </h2>
                    <p className="text-gray-600 mt-2">
                      {breedData.breed_group}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Weight
                    </h2>
                    <p className="text-gray-600 mt-2">
                      {breedData.weight.imperial} lbs ({breedData.weight.metric}{" "}
                      kg)
                    </p>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Height
                    </h2>
                    <p className="text-gray-600 mt-2">
                      {breedData.height.imperial} inches (
                      {breedData.height.metric} cm)
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default PetInfo;
