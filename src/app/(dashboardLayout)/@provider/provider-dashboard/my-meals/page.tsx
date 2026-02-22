import { getMyMealAction } from "@/action/meals.action";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MealType } from "@/types/meal.type";
import { Plus, UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const MyMeals = async () => {
  const res = await getMyMealAction();

  const meals = res?.data || [];

  return (
    <div>
      {meals.length > 0 ? (
        <Table className="border">
          <TableHeader>
            <TableRow>
              <TableHead className="text-xl">SR</TableHead>
              <TableHead className="text-xl">Meal Name</TableHead>
              <TableHead className="text-xl">Price</TableHead>
              <TableHead className="text-xl">Is Available</TableHead>
              <TableHead className="text-xl">Action</TableHead>
              <TableHead className="text-xl">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {meals?.map((meal: MealType, idx: number) => (
              <TableRow key={meal.id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{meal?.name}</TableCell>
                <TableCell>{meal?.price}</TableCell>
                <TableCell
                  className={`${meal?.isAvailable ? "text-green-600" : "text-red-600"}`}
                >
                  {meal?.isAvailable ? "Yes" : "No"}
                </TableCell>
                <TableCell className="cursor-pointer hover:text-amber-600">
                  <Link
                    href={`/provider-dashboard/my-meals/update/${meal?.id}`}
                    className="flex items-center gap-1"
                  >
                    Update <FaArrowRightLong />
                  </Link>
                </TableCell>
                <TableCell className="cursor-pointer hover:text-amber-600">
                  <Link
                    href={`/provider-dashboard/my-meals/details/${meal?.id}`}
                    className="flex items-center gap-1"
                  >
                    Details <FaArrowRightLong />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50 transition-all hover:bg-slate-50">
          {/* Visual Icon */}
          <div className="relative mb-6">
            <div className="p-5 bg-white rounded-2xl shadow-sm border border-slate-100">
              <UtensilsCrossed className="h-12 w-12 text-slate-300" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-indigo-500 p-1.5 rounded-full border-4 border-white">
              <Plus className="h-3 w-3 text-white" />
            </div>
          </div>

          {/* Message */}
          <div className="text-center max-w-sm">
            <h3 className="text-xl font-bold text-slate-800 tracking-tight">
              Your Menu is Empty
            </h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              It looks like you haven&apos;t added any meals yet. Start adding
              your delicious dishes to reach more customers!
            </p>
          </div>

          {/* Call to Action */}
          <Link
            href="/provider-dashboard/add-meal"
            className="mt-8 flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Plus className="h-4 w-4" />
            Create Your First Meal
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyMeals;
