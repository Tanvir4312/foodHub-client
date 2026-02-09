import { CategoryType } from "@/types/categories.type";
import Image from "next/image";
import React from "react";


import Link from "next/link";

const CategoryCard = ({ category }: { category: CategoryType }) => {
 const {image_url, name} = category || {}

  return (
    <div>
      <Link href={`/categories/${category.id}`}>
        <div className="group cursor-pointer">
          <div className="relative h-24 w-24 md:h-32 md:w-32 mx-auto overflow-hidden rounded-full border-2 border-transparent transition-all hover:border-orange-500 shadow-md">
            <Image
              src={image_url}
              alt=""
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <p className="mt-3 text-center font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
            {name}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
