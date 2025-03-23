"use client";
import { usePets } from "@/hooks/usePetfinder";
import { useState } from "react";
import DogCard from "./DogCard";
import LoadingSpinner from "./LoadingSpinner";

const DogsContainer = () => {
  const [filters, setFilters] = useState({
    size: [] as string[],
    breed: [] as string[],
    traits: [] as string[],
  });

  const [currentPage, setCurrentPage] = useState(1);

  const { pets, isLoading } = usePets(
    filters.size,
    filters.breed,
    filters.traits,
    currentPage
  );

  return (
    <div className="max-w-7xl mx-auto">
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20">
          <LoadingSpinner size="large" />
          <p className="text-muted-foreground animate-pulse-light">
            Loading dogs...
          </p>
        </div>
      )}
      {!isLoading && pets.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pets.map((pet) => (
            <DogCard key={pet.id} pet={pet} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DogsContainer;
