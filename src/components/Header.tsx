import { Dog, Star, Shuffle } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface HeaderProps {
  likedPetsCount: number;
  onShowLiked: () => void;
  isShowingLiked: boolean;
  onFetchRandom: () => void;
  onReset?: () => void;
}

const Header = ({
  likedPetsCount,
  onShowLiked,
  isShowingLiked,
  onFetchRandom,
  onReset,
}: HeaderProps) => {
  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 py-3 sm:py-4 transition-all duration-300 bg-white shadow-xs border-b"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <h1
              onClick={onReset}
              className="italic text-xl sm:text-2xl font-bold tracking-tight flex items-center cursor-pointer hover:opacity-80 transition-opacity"
            >
              <span className="bg-clip-text text-[#ff635f]">
                Pet<span className="text-black/80">House</span> App
              </span>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Dog className="ml-1.5 sm:ml-2 text-primary" size={20} />
              </motion.div>
            </h1>
          </motion.div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              onClick={onFetchRandom}
              variant="outline"
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all bg-white hover:bg-gray-50 border border-gray-300 text-sm sm:text-base"
            >
              <Shuffle size={16} className="sm:hidden" />
              <Shuffle size={18} className="hidden sm:block" />
              <span className="font-medium hidden sm:inline">Random Dog</span>
            </Button>
            <Button
              onClick={onShowLiked}
              variant={isShowingLiked ? "default" : "outline"}
              className={cn(
                "flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all text-sm sm:text-base",
                isShowingLiked
                  ? "bg-[#ff635f] text-white hover:text-white hover:bg-[#ff635f]"
                  : "bg-white hover:bg-gray-50 border border-gray-300"
              )}
            >
              <Star size={16} className={cn("sm:hidden", isShowingLiked && "fill-white")} />
              <Star size={18} className={cn("hidden sm:block", isShowingLiked && "fill-white")} />
              <span className="font-medium">
                {isShowingLiked
                  ? "Show All Dogs"
                  : `Favorites (${likedPetsCount})`}
              </span>
            </Button>
          </div>
        </div>
      </header>

      <section className="pb-6 sm:pb-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl sm:text-4xl font-light tracking-tight"
          >
            Find your{" "}
            <span className="font-semibold text-[#ff635f]">new dog</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-3 sm:mt-4 text-base sm:text-lg italic text-black/50 max-w-2xl mx-auto"
          >
            Find unique adoptable dogs nearby – all waiting for your loving
            home.
          </motion.p>
        </div>
      </section>
    </>
  );
};

export default Header;
