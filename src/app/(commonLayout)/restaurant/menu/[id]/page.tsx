import MealDetailsClient from "@/components/modules/meals/mealDetailsClient";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { providerServices } from "@/services/provider.services";
import { MealType } from "@/types/meal.type";
import { Info, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProviderDetailsWithMenu = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data: providerData } = await providerServices.getProviderById(
    id as string,
  );

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <section className="w-full lg:w-3/4 mx-auto mb-16 bg-white rounded-3xl shadow-sm border overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 h-64 md:h-auto relative">
              <Image
                src={providerData?.logo_url}
                alt={providerData?.name}
                width={200}
                height={200}
                unoptimized
                className="w-full h-full object-cover"
              />
            </div>

            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                {providerData?.name}
              </h1>

              <div className="space-y-3">
                <div className="flex items-center text-gray-600 gap-2">
                  <MapPin className="w-5 h-5 text-orange-500" />
                  <span>{providerData?.location}</span>
                </div>

                <div className="flex items-center text-gray-600 gap-2">
                  <Phone className="w-5 h-5 text-orange-500" />
                  <span>{providerData?.phone_number}</span>
                </div>

                <div className="mt-4">
                  <div className="flex items-start gap-2 text-gray-600">
                    <Info className="w-5 h-5 text-orange-500 mt-1 shrink-0" />
                    <p className="leading-relaxed">
                      {providerData?.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="mb-16 border-gray-100" />

        <section>
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-gray-800 uppercase tracking-wide">
              Our Menu
            </h2>
            <p className="text-gray-500 mt-2">
              Choose from our variety of fresh and healthy meals
            </p>
          </div>

          {/* Meal Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {providerData?.meals?.length === 0 && (
              <div className="col-span-full text-center text-2xl font-bold text-red-500 py-20 rounded-2xl border border-gray-200 bg-gray-50 tracking-wide shadow-sm">
                No meals Available right now
              </div>
            )}

            {providerData?.meals?.map((meal: MealType) => (
              <div
                key={meal.id}
                className="bg-white dark:bg-zinc-900 rounded-[32px] overflow-hidden border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-xl dark:hover:border-orange-500/30 transition-all duration-300 group flex flex-col h-full"
              >
                {/* Meal Image */}
                <Link href={`/meals/${meal.id}`} className="relative block h-56 overflow-hidden">
                  <Image
                    src={meal?.image_url as string}
                    alt={meal?.name as string}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/95 dark:bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-black text-orange-600 shadow-xl border border-white/20">
                    ${meal.price}
                  </div>
                </Link>

                {/* Meal Info */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-black text-gray-800 dark:text-slate-100 line-clamp-1 group-hover:text-orange-500 transition-colors mb-4">
                    {meal.name}
                  </h3>

                  {/* Buttons */}
                  <div className="mt-auto flex flex-col gap-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="w-full cursor-pointer bg-orange-500 hover:bg-orange-600 text-white py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] shadow-lg shadow-orange-200 dark:shadow-none">
                          Order Now
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader className="sr-only">
                          <DialogTitle>Meal Details</DialogTitle>
                        </DialogHeader>

                        <MealDetailsClient
                          meal={meal}
                          forceOpen={true}
                          text="order"
                        />
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="w-full border-2 cursor-pointer border-orange-500/20 dark:border-orange-500/30 text-orange-600 dark:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]">
                          Add to Cart
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader className="sr-only">
                          <DialogTitle>Meal Details</DialogTitle>
                        </DialogHeader>

                        <MealDetailsClient
                          meal={meal}
                          forceOpen={true}
                          text="cart"
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProviderDetailsWithMenu;
