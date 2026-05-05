"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CategoryType } from "@/types/categories.type";
import Image from "next/image";
import Link from "next/link";
import CategoryDelete from "@/components/categoryDelete/categoryDelete";
import { Eye, Edit3, Image as ImageIcon, Hash, Type, Settings } from "lucide-react";

interface CategoryTableProps {
  categories: CategoryType[];
  page: number;
  limit: number;
}

const CategoryTable = ({ categories, page, limit }: CategoryTableProps) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="bg-slate-50/50 dark:bg-slate-800/50 h-16">
          <TableRow className="border-none hover:bg-transparent">
            <TableHead className="pl-8 text-slate-900 dark:text-slate-100 font-bold uppercase tracking-widest text-[10px]">
              <div className="flex items-center gap-2">
                <Hash size={16} className="text-orange-500" /> SR
              </div>
            </TableHead>
            <TableHead className="text-slate-900 dark:text-slate-100 font-bold uppercase tracking-widest text-[10px]">
              <div className="flex items-center gap-2">
                <Type size={16} className="text-orange-500" /> Category Name
              </div>
            </TableHead>
            <TableHead className="text-slate-900 dark:text-slate-100 font-bold uppercase tracking-widest text-[10px]">
              <div className="flex items-center gap-2">
                <ImageIcon size={16} className="text-orange-500" /> Visual
              </div>
            </TableHead>
            <TableHead className="pr-8 text-slate-900 dark:text-slate-100 font-bold uppercase tracking-widest text-[10px] text-right">
              <div className="flex items-center gap-2 justify-end">
                <Settings size={16} className="text-orange-500" /> Operations
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category, idx) => (
            <TableRow key={category.id} className="group border-slate-50 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors h-24">
              <TableCell className="pl-8 font-black text-slate-300 dark:text-slate-700 text-lg">
                {(page - 1) * limit + idx + 1}
              </TableCell>
              <TableCell className="font-bold text-slate-900 dark:text-slate-100">
                {category.name}
              </TableCell>
              <TableCell>
                <div className="relative w-16 h-12 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 shadow-sm group-hover:scale-105 transition-transform flex items-center justify-center">
                  {category.image_url ? (
                    <Image
                      src={category.image_url}
                      alt={category.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <ImageIcon size={20} className="text-slate-300 dark:text-slate-700" />
                  )}
                </div>
              </TableCell>
              <TableCell className="pr-8">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin-dashboard/categories/details/${category.id}`}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-all active:scale-90"
                    title="View Details"
                  >
                    <Eye size={18} />
                  </Link>
                  <Link
                    href={`/admin-dashboard/categories/update/${category.id}`}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all active:scale-90"
                    title="Update Category"
                  >
                    <Edit3 size={18} />
                  </Link>
                  <div className="p-1">
                    <CategoryDelete id={category.id} />
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CategoryTable;
