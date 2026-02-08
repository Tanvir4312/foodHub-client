"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const bannerData = [
  {
    id: 1,
    image: "/images/hero-1.jpg",
    title: "Grilled Lobster Special",
    description:
      "Freshly caught lobster grilled to perfection with butter and garlic herbs.",
  },
  {
    id: 2,
    image: "/images/hero-2.jpg",
    title: "Layered Tiramisu Delight",
    description:
      "Authentic Italian dessert with coffee-soaked ladyfingers and creamy mascarpone.",
  },
  {
    id: 3,
    image: "/images/hero-3.jpg",
    title: "Spicy Chicken Skewers",
    description:
      "Juicy chicken chunks marinated in exotic spices and flame-grilled on skewers.",
  },
  {
    id: 4,
    image: "/images/hero-4.jpg",
    title: "Classic Double Burger",
    description:
      "A mouth-watering double patty burger served with crispy fries and melted cheese.",
  },
  {
    id: 5,
    image: "/images/hero-5.jpg",
    title: "Creamy Pasta Primavera",
    description:
      "Al dente pasta tossed with fresh tomatoes, basil, and a rich creamy sauce.",
  },
  {
    id: 6,
    image: "/images/hero-6.jpg",
    title: "Royal Chicken Biryani",
    description:
      "Fragrant basmati rice cooked with tender chicken and traditional aromatic spices.",
  },
];

export function Hero() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );

  return (
    <Carousel
      opts={{
        loop: true,
      }}
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {bannerData.map((item) => (
          <CarouselItem key={item.id}>
            <div className="p-1">
              {" "}
              <Card className="overflow-hidden border-none shadow-sm rounded-xl">
                <CardContent className="relative h-125 w-full p-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    priority={item.id === 1}
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent pointer-events-none text-white flex flex-col justify-end p-8 md:p-16 animate-in slide-in-from-bottom">
                   <p className="text-2xl font-semibold"> {item.title}</p>
                   <p className="text-xl opacity-50">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="hidden md:flex -left-12" />
      <CarouselNext className="hidden md:flex -right-12" />
    </Carousel>
  );
}
