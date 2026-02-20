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
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const MyMeals = async () => {
  const res = await getMyMealAction();

  const meals = res?.data || [];

  return (
    <div>
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
    </div>
  );
};

export default MyMeals;
