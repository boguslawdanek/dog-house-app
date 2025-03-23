"use client";
import { usePets, usePetfinder } from "@/hooks/usePetfinder";
import { useState } from "react";
import DogCard from "./DogCard";
import LoadingSpinner from "./LoadingSpinner";
import Pagination from "./Pagination";
import EmptyLikedPetsList from "./EmptyLikedPetsList";
import FilterPanel from "./FilterPanel";
import Header from "./Header";

const DogsContainer = () => {
  const { toggleLikePet, isPetLiked, likedPets } = usePetfinder();
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

  const displayedPets = showFavorites
    ? pets.filter((pet) => isPetLiked(pet.id))
    : pets;

  const toggleFavoritePets = () => {
    setShowFavorites((prev) => !prev);
  };

  const handleFilterChange = (type: string, values: string[]) => {
    setFilters((prev) => ({
      ...prev,
      [type]: values,
    }));
    setCurrentPage(1);
  };

  return (
    <>
      <section className="w-full max-w-7xl mx-auto mb-6">
        <Header
          likedPetsCount={likedPets.length}
          isShowingLiked={showFavorites}
          onShowLiked={toggleFavoritePets}
        />
      </section>
      <section className="w-full max-w-7xl mx-auto mb-6">
        <FilterPanel
          onChangeFilter={handleFilterChange}
          activeFilters={filters}
        />
      </section>
      <div className="mx-auto">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            {!isLoading && (
              <h2 className="text-xl font-medium">
                {showFavorites ? "Your Favorite Dogs" : "Dogs for Adoption"}
              </h2>
            )}
            {!isLoading && (
              <p className="text-sm">
                {showFavorites
                  ? `${displayedPets.length} liked ${
                      displayedPets.length === 1 ? "dog" : "dogs"
                    }`
                  : pagination?.total_count
                  ? `Showing ${displayedPets.length} of ${
                      pagination.total_count
                    } available ${
                      pagination.total_count === 1 ? "dog" : "dogs"
                    }`
                  : "No dogs found matching your criteria"}
              </p>
            )}
          </div>

          {isLoading && (
            <div className="flex flex-col w-full">
              <div className="flex flex-col items-center justify-center py-20 w-full">
                <LoadingSpinner size="large" />
                <p className="animate-pulse-light">Loading dogs...</p>
              </div>
            </div>
          )}

          {!isLoading && pets.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedPets.map((pet) => (
                <DogCard
                  key={pet.id}
                  pet={pet}
                  onToggleLike={toggleLikePet}
                  isLiked={isPetLiked(pet.id)}
                />
              ))}
            </div>
          )}

          <EmptyLikedPetsList
            isLoading={isLoading}
            displayedPets={displayedPets}
            showFavorites={showFavorites}
            toggleFavoritesView={toggleFavoritePets}
          />

          <Pagination
            isLoading={isLoading}
            showFavorites={showFavorites}
            pagination={pagination || null}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </>
  );
};

export default DogsContainer;
