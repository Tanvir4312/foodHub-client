/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { deleteCategoryAction } from "@/action/categories.action";
import { toast } from "sonner";

const CategoryDelete = ({ id }: { id: string }) => {
  const handleDelete = async () => {
    const toastId = toast.loading("Deleteing...");
    try {
      const res = await deleteCategoryAction(id);
      if (res.error) {
        toast.error(res.error.message, { id: toastId });
        return;
      }
      toast.success("Delete Done", { id: toastId });
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };
  return (
    <div>
      <button onClick={handleDelete} className="cursor-pointer">
        DELETE
      </button>
    </div>
  );
};

export default CategoryDelete;
