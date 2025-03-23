import { Pet } from "@/types";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface EmptyLikedPetsListProps {
  isLoading: boolean;
  displayedPets: Pet[];
  showFavorites: boolean;
  toggleFavoritesView: () => void;
}

const EmptyLikedPetsList = ({
  isLoading,
  displayedPets,
  showFavorites,
  toggleFavoritesView,
}: EmptyLikedPetsListProps) => {
  return (
    <>
      {!isLoading && displayedPets.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="bg-[#d5dbe9]/50 rounded-full p-6 mb-4">
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
              transition={{ repeat: Infinity, repeatDelay: 4, duration: 1 }}
            >
              <Star size={40} className="text-primary" />
            </motion.div>
          </div>
          <h3 className="text-xl font-medium mb-2">
            {showFavorites
              ? "You haven't chosen a favorite dog yet"
              : "No dogs were found"}
          </h3>
          <p className="max-w-md">
            {showFavorites
              ? "No dogs have been added to your favorites. Explore our available dogs and click the start to save them."
              : "Try changing your filters to get more results"}
          </p>

          {showFavorites && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={toggleFavoritesView}
              className="mt-6 px-6 py-2 text-xl text-black/80 bg-[#d5dbe9]/50 rounded-full"
            >
              Browse Dogs
            </motion.button>
          )}
        </div>
      )}
    </>
  );
};

export default EmptyLikedPetsList;
