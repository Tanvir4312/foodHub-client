/* eslint-disable @typescript-eslint/no-unused-vars */

import { getMyMealByIdAction } from "@/action/meals.action";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { env } from "@/env";
import { LinkIcon } from "lucide-react";
import { revalidateTag, updateTag } from "next/cache";
import { cookies } from "next/headers";
import { toast } from "sonner";

const MyMealUpdate = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const mealData = await getMyMealByIdAction(id);
  const meal = mealData?.data;

  const updateMeal = async (formData: FormData) => {
    "use server";
    const rawName = formData.get("name") as string;
    const rawPrice = formData.get("price") as string;
    const rawDietary = formData.get("dietary") as string;
    const rawIsAvailable = formData.get("isAvailable") as string;
    const rawImageUrl = formData.get("image_url") as string;
    const rawDescription = formData.get("description") as string;

    const updateData = {
      name: rawName.trim() !== "" ? rawName : meal?.name,
      dietary: rawDietary && rawDietary !== "" ? rawDietary : meal?.dietary,
      image_url: rawImageUrl.trim() !== "" ? rawImageUrl : meal?.image_url,
      description:
        rawDescription.trim() !== "" ? rawDescription : meal?.description,
      price: rawPrice !== "" ? Number(rawPrice) : meal?.price,
      isAvailable:
        rawIsAvailable !== "" ? rawIsAvailable === "true" : meal?.isAvailable,
    };

    const API_URL = env.API_URL;
    const cookieStore = await cookies();

    const url = new URL(`${API_URL}/provider/meals/${id}`);

    const res = await fetch(url.toString(), {
      method: "PUT",
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    if (res.ok) {
      revalidateTag("newMeal-create", "max");
    }
  };

  return (
    <div className="md:w-3xl mx-auto md:my-10 p-1">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:mb-10 mb-5 px-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            Update Meal
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            Modify your meal details, pricing, and availability
          </p>
        </div>
        <div>
          <button
            form="update-form"
            type="submit"
            className="px-8 py-3 rounded-2xl bg-orange-600 text-white font-bold shadow-lg shadow-orange-200 hover:bg-orange-700 transition-all cursor-pointer"
          >
            Save Updates
          </button>
        </div>
      </div>

      {/* Right Column: Form Fields Container */}
      <div className="">
        <div className="bg-white p-8 md:p-10 rounded-4xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 pb-4">
            General Information
          </h3>

          <div className="space-y-8">
            {/* Placeholder for Input Grid */}

            <form
              id="update-form"
              action={updateMeal}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5"
            >
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="Meal Name">Meal NAme</FieldLabel>
                  <Input id="name" name="name" placeholder="Meal Name"></Input>
                </Field>
              </FieldGroup>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="Meal Price">Price</FieldLabel>
                  <Input
                    id="price"
                    name="price"
                    placeholder="Meal Price"
                    type="number"
                  ></Input>
                </Field>
              </FieldGroup>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="dietary">Dietary</FieldLabel>
                  <select
                    className="border p-2 rounded-lg"
                    id="dietary"
                    name="dietary"
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
                  <FieldLabel htmlFor="isAvailable">Is Available</FieldLabel>
                  <select
                    className="border p-2 rounded-lg"
                    id="isAvailable"
                    name="isAvailable"
                  >
                    <option value="">Select meal availability</option>
                    <option value="true">YES</option>
                    <option value="false">NO</option>
                  </select>
                </Field>
              </FieldGroup>
              <FieldGroup>
                <Field>
                  <FieldLabel
                    htmlFor="image"
                    className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2"
                  >
                    <LinkIcon size={16} className="text-[#E21B70]" />
                    Profile Image Link
                  </FieldLabel>
                  <Input
                    id="image_url"
                    name="image_url"
                    placeholder="Paste direct ImageBB link here"
                  ></Input>
                  <div className="bg-amber-50 p-3 rounded-lg mt-2 border border-amber-100">
                    <p className="text-[11px] text-amber-700 leading-tight">
                      <strong>Tip:</strong> Upload your image to{" "}
                      <a
                        href="https://imgbb.com/"
                        target="_blank"
                        className="underline font-bold"
                      >
                        imgbb.com
                      </a>{" "}
                      and use the <strong>Direct Link</strong> for best results.
                    </p>
                  </div>
                </Field>
              </FieldGroup>
              <FieldGroup>
                <Field>
                  <FieldLabel
                    htmlFor=""
                    className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1"
                  >
                    Description
                  </FieldLabel>
                  <Textarea
                    id="description"
                    name="description"
                    rows={4}
                    placeholder="Describe the ingredients, taste, and special features..."
                    className={`w-full px-4 py-2.5 rounded-xl border transition-all outline-none
                    `}
                  />
                </Field>
              </FieldGroup>
            </form>
          </div>

          <div className="mt-10 p-6 bg-orange-50/50 rounded-2xl border border-orange-100">
            <p className="text-sm text-orange-700 font-medium">
              💡 <span className="font-bold">Pro Tip:</span> Updating the meal
              price will not affect current active orders in the cart.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyMealUpdate;
