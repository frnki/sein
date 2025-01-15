"use client";

import { PortfolioItem } from "@/app/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PortfolioGridProps {
  items: PortfolioItem[];
}

export default function PortfolioGrid({ items }: PortfolioGridProps) {
  const router = useRouter();

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
        <motion.div
          key={item.id}
          variants={itemAnimation}
          onClick={() => router.push(`/project/${item.id}`)}
          className="group cursor-pointer"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 "
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="text-white space-y-2">
                  <p className="text-sm font-medium">{item.location}</p>
                  <p className="text-sm">{item.size}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-medium text-lg group-hover:text-primary transition-colors line-clamp-2">
                {item.code}
              </h2>
              <Badge variant="outline" className="bg-white">
                {item.category}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-gray-500 hover:text-primary transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
