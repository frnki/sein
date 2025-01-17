"use client";

import { PortfolioItem } from "@/app/lib/mock-data";
import { motion, Variants } from "framer-motion";
import { ProjectItem } from "./ProjectItem";

interface PortfolioGridProps {
  items: PortfolioItem[];
}

export default function PortfolioGrid({ items }: PortfolioGridProps) {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemAnimation: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {items.map((item) => (
        <ProjectItem
          key={item.id}
          id={item.id}
          title={item.title}
          slug={item.slug}
          image={item.image}
          location={item.location}
          size={item.size}
          year={item.year}
          tags={item.tags}
          itemAnimation={itemAnimation}
        />
      ))}
    </motion.div>
  );
}
