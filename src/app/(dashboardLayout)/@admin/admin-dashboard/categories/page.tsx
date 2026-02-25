import { getCategoriesAction } from "@/action/categories.action";
import CategoryDelete from "@/components/categoryDelete/categoryDelete";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CategoryType } from "@/types/categories.type";
import Image from "next/image";

import Link from "next/link";

const AllCategory = async () => {
  const res = await getCategoriesAction();

  const categories = res?.data?.data;

  return (
    <div>
      {categories.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xl">SR</TableHead>
              <TableHead className="text-xl">Categoy Name</TableHead>
              <TableHead className="text-xl">Image</TableHead>
              <TableHead className="text-xl">Action</TableHead>
              <TableHead className="text-xl">Action</TableHead>
              <TableHead className="text-xl">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories?.map((category: CategoryType, idx: number) => (
              <TableRow key={category.id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <Image
                    className="rounded"
                    src={category.image_url}
                    alt={category?.name}
                    width={70}
                    height={50}
                    unoptimized
                  ></Image>
                </TableCell>
                <TableCell className="font-bold hover:text-amber-600 cursor-pointer">
                  <Link
                    href={`/admin-dashboard/categories/details/${category.id}`}
                  >
                    DETAILS
                  </Link>
                </TableCell>
                <TableCell className="font-bold hover:text-amber-600 cursor-pointer">
                  <Link
                    href={`/admin-dashboard/categories/update/${category.id}`}
                  >
                    UPDATE
                  </Link>
                </TableCell>
                <TableCell className="font-bold hover:text-amber-600 cursor-pointer">
                  <CategoryDelete id={category?.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-red-500 text-2xl">
          You do not have any incoming orders right now
        </p>
      )}
    </div>
  );
};

export default AllCategory;
