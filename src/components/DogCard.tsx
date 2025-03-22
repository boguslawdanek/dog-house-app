"use client";
import React from "react";

import { motion } from "framer-motion";

const DogCard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
    >
      <div>
        <h1>Dog Card</h1>
      </div>
    </motion.div>
  );
};

export default DogCard;
