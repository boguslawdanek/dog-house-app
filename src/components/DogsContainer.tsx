"use client";
import { usePets } from "@/hooks/usePetfinder";
import { useState } from "react";

const DogsContainer = () => {
  const [filters, setFilters] = useState({
    size: [] as string[],
    breed: [] as string[],
    traits: [] as string[],
  });

  const [currentPage, setCurrentPage] = useState(1);

  const { pets } = usePets(
    filters.size,
    filters.breed,
    filters.traits,
    currentPage
  );

  return (
    <div>
      {pets.map((pet) => (
        <div key={pet.id}>
          <h2>{pet.name}</h2>
          <p>{pet.size}</p>
        </div>
      ))}
    </div>
  );
};

export default DogsContainer;
