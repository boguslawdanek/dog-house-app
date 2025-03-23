"use client";
import React, { useState } from "react";

import { motion } from "framer-motion";
import { Pet } from "@/types";
import { Star, MapPin } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface DogCardProps {
  pet: Pet;
  isLiked: boolean;
  onToggleLike: (id: string) => void;
}

const DogCard = ({ pet, isLiked, onToggleLike }: DogCardProps) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleImgLoad = () => {
    setImgLoaded(true);
  };

  const getDogTraits = (): string[] => {
    const traits: string[] = [];

    if (pet.attributes.spayed_neutered) {
      traits.push("Spayed/Neutered");
    }
    if (pet.attributes.house_trained) {
      traits.push("House Trained");
    }
    if (pet.attributes.declawed) {
      traits.push("Declawed");
    }

    if (pet.attributes.shots_current) {
      traits.push("Shots Current");
    }
    if (pet.attributes.special_needs) {
      traits.push("Special Needs");
    }

    return traits.slice(0, 3);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className={cn("relative overflow-hidden rounded-xl shadow-lg bg-white w-full max-w-sm mx-auto")}
    >
      <div className="relative aspect-square overflow-hidden">
        <div
          className={cn(
            "absolute inset-0 w-full h-full",
            !imgLoaded && "image-loading"
          )}
        >
          {pet.photos && pet.photos.length > 0 ? (
            <Image
              src={pet.photos[0].medium || pet.photos[0].small}
              alt={pet.name}
              className={cn(
                "w-full h-full object-cover transition-opacity duration-300",
                imgLoaded ? "opacity-100" : "opacity-0"
              )}
              width={500}
              height={500}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              onLoad={handleImgLoad}
            />
          ) : (
            <div className="w-full h-full bg-[#edf0f7] flex items-center justify-center text-black/40 text-base sm:text-lg font-semibold">
              No Image Available
            </div>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggleLike(pet.id)}
          className={cn(
            "absolute cursor-pointer top-2 left-2 sm:top-3 sm:left-3 p-1.5 sm:p-2 rounded-full z-10 transition-all duration-300",
            isLiked
              ? "bg-[#ff635f] shadow-lg"
              : "bg-white/80 hover:bg-white transition-all duration-300"
          )}
        >
          <Star
            size={16}
            className={isLiked ? "fill-white text-white" : "text-primary"}
          />
        </motion.button>
      </div>

      <div className="p-3 sm:p-5 bg-white">
        <div className="flex items-start justify-between mb-1.5 sm:mb-2">
          <div className="space-y-1 sm:space-y-2">
            <h4 className="text-base sm:text-lg font-semibold">{pet.name}</h4>
          </div>
          <span
            className={cn(
              "inline-flex items-center gap-1 font-semibold rounded-full px-2 py-0.5 text-xs",
              pet.gender === "Male" ? "bg-[#a3e7f8]" : "bg-[#ffb6c1]"
            )}
          >
            {pet.gender}
          </span>
        </div>

        <div className="flex items-center text-xs sm:text-sm text-black/70 mb-2 sm:mb-3">
          <span className="font-medium">
            {pet.breeds.primary}
            {pet.breeds.secondary && ` / ${pet.breeds.secondary}`}
          </span>
        </div>

        <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2 sm:mb-3">
          <span className="px-2 py-0.5 rounded-full text-xs bg-[#d5dbe9] font-semibold text-black/90">
            {pet.age}
          </span>
          <span className="inline-flex items-center gap-1 font-semibold bg-[#d5dbe9] rounded-full px-2 py-0.5 text-xs">
            {pet.size}
          </span>
          {getDogTraits().map((trait, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 bg-[#d5dbe9] font-semibold rounded-full px-2 py-0.5 text-xs"
            >
              {trait}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-black/30">
          <div className="flex items-center text-xs sm:text-sm text-black">
            <MapPin size={10} className="mr-1" />
            <span>
              {pet.contact.address.city}, {pet.contact.address.state}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DogCard;
