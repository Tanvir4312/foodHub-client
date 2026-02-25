import { Card, CardContent } from "@/components/ui/card";
import { categoryServices } from "@/services/category.services";
import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";

const CategoryDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const res = await categoryServices.getCategoryServiceById(id);
  const category = res?.data;

  return (
    <div className="m-4 md:m-0">
      <Card className="group md:w-3xl p-4 md:p-0 mx-auto overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500 rounded-3xl bg-white">
        {/* Image Section */}
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            src={category.image_url}
            alt={category.name}
            unoptimized
            fill
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

          {/* Badge */}
          <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
            <p className="text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-1">
              <MapPin size={10} className="text-orange-400" /> Authentic
            </p>
          </div>
        </div>

        {/* Content Section */}
        <CardContent className="p-6 relative">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight group-hover:text-orange-600 transition-colors">
                {category.name}
              </h3>
              <div className="h-1 w-8 bg-orange-500 rounded-full mt-1 group-hover:w-16 transition-all duration-500" />
            </div>

            <button className="p-2 bg-slate-50 text-slate-400 rounded-full group-hover:bg-orange-500 group-hover:text-white transition-all">
              <ArrowRight size={18} />
            </button>
          </div>

          <p className="text-sm text-slate-500 leading-relaxed font-medium">
            {category.description}
          </p>

          {/* Stats Preview (Subtle) */}
          <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              Available Region
            </span>
            <span className="text-[10px] font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
              Bangladesh
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryDetails;
