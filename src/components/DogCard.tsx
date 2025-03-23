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
      className={cn("relative overflow-hidden rounded-xl shadow-lg")}
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
              width={1000}
              height={1000}
              onLoad={handleImgLoad}
            />
          ) : (
            <div className="w-full h-full bg-[#edf0f7] flex items-center justify-center text-black/40 text-lg font-semibold">
              No Image Available
            </div>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggleLike(pet.id)}
          className={cn(
            "absolute top-3 left-3 p-2 rounded-full z-10 transition-all duration-300",
            isLiked
              ? "bg-[#ff635f] shadow-lg"
              : "bg-white/80 hover:bg-white transition-all duration-300"
          )}
        >
          <Star
            size={20}
            className={isLiked ? "fill-white text-white" : "text-primary"}
          />
        </motion.button>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div className="space-y-2">
            <h4 className="text-lg font-semibold">{pet.name}</h4>
          </div>
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs",
              pet.gender === "Male" ? "bg-[#a3e7f8]" : "bg-[#ffb6c1]"
            )}
          >
            {pet.gender}
          </span>
        </div>

        <div className="flex items-center text-sm text-black/70 mb-3">
          <span className="font-medium">
            {pet.breeds.primary}
            {pet.breeds.secondary && ` / ${pet.breeds.secondary}`}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#6bd2a5] text-black/90">
            {pet.age}
          </span>
          <span className="inline-flex items-center gap-1 bg-[#f3993e] rounded-full px-2.5 py-0.5 text-xs">
            {pet.size}
          </span>
          {getDogTraits().map((trait, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 bg-[#d5dbe9] rounded-full px-2.5 py-0.5 text-xs"
            >
              {trait}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-secondary/30">
          <div className="flex items-center text-sm text-black">
            <MapPin size={12} className="mr-1" />
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
