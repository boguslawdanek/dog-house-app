"use client";
import { usePets, usePetfinder } from "@/hooks/usePetfinder";
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
  const [showFavorites, setShowFavorites] = useState(false);

  const { pets, isLoading, pagination } = usePets(
    filters.size,
    filters.breed,
    filters.traits,
    currentPage
  );

  const { toggleLikePet, isPetLiked, likedPets } = usePetfinder();

  return (
    <div className="mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h2 className="text-xl font-medium">
          {showFavorites ? "Your Favorite Dogs" : "Dogs for Adoption"}
        </h2>

        {!isLoading && (
          <p className="text-sm text-muted-foreground">
            {pagination?.total_count}
          </p>
        )}
      </div>

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
            <DogCard
              key={pet.id}
              pet={pet}
              onToggleLike={toggleLikePet}
              isLiked={isPetLiked(pet.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DogsContainer;
