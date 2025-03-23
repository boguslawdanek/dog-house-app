import { DOG_BREEDS, DOG_TRAITS } from "@/utils/consts";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, ChevronDown, ChevronUp, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

interface FilterPanelProps {
  onChangeFilter: (type: string, values: string[]) => void;
  activeFilters: {
    size: string[];
    breed: string[];
    traits: string[];
  };
}

const FilterPanel = ({ onChangeFilter, activeFilters }: FilterPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>("size");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFilter = (type: "size" | "breed" | "traits", value: string) => {
    const currentValues = [...activeFilters[type]];
    const index = currentValues.indexOf(value);

    if (index === -1) {
      onChangeFilter(type, [...currentValues, value]);
    } else {
      currentValues.splice(index, 1);
      onChangeFilter(type, currentValues);
    }
  };

  const clearAllFilters = () => {
    onChangeFilter("size", []);
    onChangeFilter("breed", []);
    onChangeFilter("traits", []);
  };

  const totalFilters =
    activeFilters.size.length +
    activeFilters.breed.length +
    activeFilters.traits.length;

  const filteredBreeds = searchQuery
    ? DOG_BREEDS.filter((breed) =>
        breed.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : DOG_BREEDS;

  const handleClickOpen = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setActiveSection("size");
    }
  };

  return (
    <div className="relative z-30 w-full max-w-7xl mx-auto">
      <motion.div
        initial={false}
        animate={isOpen ? { height: "auto" } : { height: "auto" }}
        className="rounded-xl bg-white/95 backdrop-blur-lg shadow-lg overflow-hidden"
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-primary" />
            <span className="font-medium">Filters</span>
            {totalFilters > 0 && (
              <span className="bg-[#6bd2a5] font-semibold text-stone-50 text-xs rounded-full h-5 min-w-5 inline-flex items-center justify-center px-1.5">
                {totalFilters}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {totalFilters > 0 && (
              <Button
                onClick={clearAllFilters}
                className="text-sm bg-[#d5dbe9]/80 hover:bg-[#d5dbe9]/60 transition-all duration-300"
                size="sm"
              >
                Clear all
              </Button>
            )}
            <Button
              onClick={handleClickOpen}
              variant="default"
              className="flex items-center gap-1 font-medium  bg-[#d5dbe9]/80 hover:bg-[#d5dbe9]/60"
            >
              {isOpen ? (
                <>
                  <span>Close</span>
                  <ChevronUp size={16} />
                </>
              ) : (
                <>
                  <span>Open</span>
                  <ChevronDown size={16} />
                </>
              )}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="px-4 pb-4 overflow-hidden"
            >
              <Tabs
                defaultValue="size"
                className="w-full"
                onValueChange={(value) => setActiveSection(value)}
              >
                <TabsList className="w-full grid-cols-3 mb-4 gap-2 transition-all duration-300">
                  <TabsTrigger
                    className="font-semibold bg-[#d5dbe9]/80 hover:bg-[#d5dbe9]/60 transition-all duration-300 data-[state=active]:bg-[#6bd2a5] data-[state=active]:text-stone-50 text-black"
                    value="size"
                  >
                    Size
                  </TabsTrigger>
                  <TabsTrigger
                    className="bg-[#d5dbe9]/80 hover:bg-[#d5dbe9]/60 transition-all duration-300 data-[state=active]:bg-[#6bd2a5] data-[state=active]:text-stone-50 text-black"
                    value="breed"
                  >
                    Breed
                  </TabsTrigger>
                  <TabsTrigger
                    className="bg-[#d5dbe9]/80 hover:bg-[#d5dbe9]/60 transition-all duration-300 data-[state=active]:bg-[#6bd2a5] data-[state=active]:text-stone-50 text-black"
                    value="traits"
                  >
                    Traits
                  </TabsTrigger>
                </TabsList>

                <AnimatePresence mode="wait">
                  {activeSection === "size" && (
                    <motion.div
                      key="size"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-2"
                    >
                      <div className="flex flex-wrap gap-2 items-center justify-center">
                        {["Small", "Medium", "Large", "Extra Large"].map(
                          (size: string) => (
                            <button
                              key={size}
                              onClick={() => toggleFilter("size", size)}
                              className={cn(
                                "px-3 py-1 text-xs rounded-full transition-colors font-semibold",
                                activeFilters.size.includes(size)
                                  ? "bg-[#6bd2a5] transition-all duration-300 text-stone-50"
                                  : "bg-[#d5dbe9]/80 hover:bg-[#d5dbe9]/60 transition-all duration-300"
                              )}
                            >
                              {size}
                            </button>
                          )
                        )}
                      </div>
                    </motion.div>
                  )}

                  {activeSection === "breed" && (
                    <motion.div
                      key="breed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-2 space-y-3"
                    >
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 " />
                        <Input
                          placeholder="Search breeds..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-9"
                        />
                      </div>
                      <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-1">
                        {filteredBreeds.map((breed) => (
                          <button
                            key={breed}
                            onClick={() => toggleFilter("breed", breed)}
                            className={cn(
                              "px-3 py-1 text-xs rounded-full transition-colors font-semibold",
                              activeFilters.breed.includes(breed)
                                ? "bg-[#6bd2a5] transition-all duration-300 text-stone-50 "
                                : "bg-[#d5dbe9]/80 hover:bg-[#d5dbe9]/60 transition-all duration-300"
                            )}
                          >
                            {breed}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeSection === "traits" && (
                    <motion.div
                      key="traits"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-2"
                    >
                      <div className="flex flex-wrap gap-2">
                        {DOG_TRAITS.map((trait) => (
                          <button
                            key={trait}
                            onClick={() => toggleFilter("traits", trait)}
                            className={cn(
                              "px-3 py-1 text-xs text-black rounded-full transition-colors font-semibold",
                              activeFilters.traits.includes(trait)
                                ? "bg-[#6bd2a5] transition-all duration-300 text-stone-50 "
                                : "bg-[#d5dbe9]/80 hover:bg-[#d5dbe9]/60 transition-all duration-300"
                            )}
                          >
                            {trait}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Tabs>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default FilterPanel;
