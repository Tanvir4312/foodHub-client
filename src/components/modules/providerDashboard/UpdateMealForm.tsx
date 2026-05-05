"use client";

import { updateMyMealAction } from "@/action/meals.action";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LinkIcon, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

interface UpdateMealFormProps {
  meal: any;
  id: string;
}

const UpdateMealForm = ({ meal, id }: UpdateMealFormProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleUpdate = async (formData: FormData) => {
    const rawName = formData.get("name") as string;
    const rawPrice = formData.get("price") as string;
    const rawDietary = formData.get("dietary") as string;
    const rawIsAvailable = formData.get("isAvailable") as string;
    const rawImageUrl = formData.get("image_url") as string;
    const rawDescription = formData.get("description") as string;

    const updateData: any = {
      name: rawName.trim() !== "" ? rawName : meal?.name,
      dietary: rawDietary && rawDietary !== "" ? rawDietary : meal?.dietary,
      image_url: rawImageUrl.trim() !== "" ? rawImageUrl : meal?.image_url,
      description: rawDescription.trim() !== "" ? rawDescription : meal?.description,
      price: rawPrice !== "" ? Number(rawPrice) : meal?.price,
      isAvailable: rawIsAvailable !== "" ? rawIsAvailable === "true" : meal?.isAvailable,
    };

    startTransition(async () => {
      const res = await updateMyMealAction(id, updateData);

      if (res.data) {
        toast.success("Meal updated successfully");
        router.push("/provider-dashboard/my-meals");
        router.refresh();
      } else {
        toast.error(res.error?.message || "Failed to update meal");
      }
    });
  };

  return (
    <div className="md:w-3xl mx-auto md:my-10 p-1">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:mb-10 mb-5 px-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            Update <span className="text-orange-600">Meal</span>
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            Modify your meal details, pricing, and availability
          </p>
        </div>
        <div>
          <button
            form="update-form"
            type="submit"
            disabled={isPending}
            className="px-8 py-3 rounded-2xl bg-orange-600 text-white font-bold shadow-lg shadow-orange-200 hover:bg-orange-700 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Save size={20} />
            {isPending ? "Saving..." : "Save Updates"}
          </button>
        </div>
      </div>

      <div className="bg-white p-8 md:p-10 rounded-4xl border border-gray-100 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 pb-4">
          General Information
        </h3>

        <form
          id="update-form"
          action={handleUpdate}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Meal Name</FieldLabel>
              <Input 
                id="name" 
                name="name" 
                defaultValue={meal?.name} 
                placeholder="Meal Name" 
              />
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="price">Price</FieldLabel>
              <Input
                id="price"
                name="price"
                defaultValue={meal?.price}
                placeholder="Meal Price"
                type="number"
              />
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="dietary">Dietary</FieldLabel>
              <select
                className="w-full px-4 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                id="dietary"
                name="dietary"
                defaultValue={meal?.dietary}
              >
                <option value="">Select dietary type</option>
                <option value="VEGAN">Vegan</option>
                <option value="VEGETARIAN">Vegetarian</option>
                <option value="GLUTEN_FREE">Gluten Free</option>
                <option value="KETO">Keto</option>
                <option value="NON_VEGETARIAN">Non Vegetarian</option>
                <option value="DAIRY_FREE">Dairy Free</option>
                <option value="NUT_FREE">Nut Free</option>
                <option value="EGG_FREE">Egg Free</option>
                <option value="LOW_CARB">Low Carb</option>
                <option value="LOW_FAT">Low Fat</option>
                <option value="HIGH_PROTEIN">High Protein</option>
              </select>
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="isAvailable">Availability</FieldLabel>
              <select
                className="w-full px-4 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                id="isAvailable"
                name="isAvailable"
                defaultValue={meal?.isAvailable ? "true" : "false"}
              >
                <option value="true">Available</option>
                <option value="false">Unavailable</option>
              </select>
            </Field>
          </FieldGroup>

          <FieldGroup className="md:col-span-2">
            <Field>
              <FieldLabel htmlFor="image_url" className="flex items-center gap-2">
                <LinkIcon size={16} className="text-orange-600" />
                Image Link
              </FieldLabel>
              <Input
                id="image_url"
                name="image_url"
                defaultValue={meal?.image_url}
                placeholder="Paste direct image link here"
              />
              <div className="bg-amber-50 p-3 rounded-lg mt-2 border border-amber-100">
                <p className="text-[11px] text-amber-700 leading-tight">
                  <strong>Tip:</strong> Upload your image to{" "}
                  <a
                    href="https://imgbb.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-bold"
                  >
                    imgbb.com
                  </a>{" "}
                  and use the <strong>Direct Link</strong> for best results.
                </p>
              </div>
            </Field>
          </FieldGroup>

          <FieldGroup className="md:col-span-2">
            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                id="description"
                name="description"
                defaultValue={meal?.description}
                rows={4}
                placeholder="Describe the ingredients, taste, etc..."
                className="w-full px-4 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
              />
            </Field>
          </FieldGroup>
        </form>

        <div className="mt-10 p-6 bg-orange-50/50 rounded-2xl border border-orange-100">
          <p className="text-sm text-orange-700 font-medium italic">
            💡 Pro Tip: Updating the meal price will not affect current active orders.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpdateMealForm;
