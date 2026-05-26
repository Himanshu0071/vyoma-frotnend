"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faHeart,
  faBagShopping,
} from "@fortawesome/free-solid-svg-icons";

interface ProductCardProps {
    id: string;
    title: string;
    category: string;
    price: string;
    image: string;
  }

export default function ProductCard({
    id,
    title,
    category,
    price,
    image,
}: ProductCardProps) {
  return (
    <Link href={`/product/${id}`}>
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-[32px] overflow-hidden bg-white dark:bg-[#0D1324] shadow-soft"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={500}
          height={500}
          className="w-full h-[350px] object-cover group-hover:scale-105 transition duration-500"
        />

        {/* Floating Buttons */}
        <div className="absolute top-5 right-5 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition duration-300">
          <button className="w-11 h-11 rounded-full glass flex items-center justify-center">
            <FontAwesomeIcon icon={faHeart} />
          </button>

          <button className="w-11 h-11 rounded-full glass flex items-center justify-center">
            <FontAwesomeIcon icon={faBagShopping} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {category}
        </p>

        <h3 className="text-xl font-semibold">
          {title}
        </h3>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold gradient-text">
            {price}
          </span>

          <button className="px-5 py-2 rounded-full bg-gradient-to-r from-[#7C8CFF] via-[#C084FC] to-[#FFB38A] text-white text-sm font-medium">
            Buy Now
          </button>
        </div>
      </div>
    </motion.div>
    </Link>
  );
}