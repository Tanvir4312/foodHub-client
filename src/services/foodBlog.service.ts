import { env } from "@/env";
import { CreateFoodBlog } from "@/types/foodBlogs.types";
import { cookies } from "next/headers";


const API_URL = env.API_URL;
export const foodBlogsService = {
    createFoodBlogService: async (blogData: CreateFoodBlog) => {
        try {
            const url = new URL(`${API_URL}/food-blogs/create`);
            const cookieStore = await cookies();

            const res = await fetch(url.toString(), {
                method: "POST",
                headers: {
                    Cookie: cookieStore.toString(),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(blogData),
            });
            const blog = await res.json();

            if (!res.ok) {
                return {
                    data: null,
                    error: { message: blog.message || "Something went wrong!" },
                };
            }
            return { data: blog, error: null };
        } catch (err) {
            return { data: null, error: { message: "Something went wrong" } };
        }
    },
    getAllFoodBlogService: async (queryParams?: Record<string, string | number | undefined>) => {
        try {
            const url = new URL(`${API_URL}/food-blogs`);

            if (queryParams) {
                Object.entries(queryParams).forEach(([key, value]) => {
                    if (value !== undefined && value !== "") {
                        url.searchParams.append(key, value.toString());
                    }
                });
            }

            const res = await fetch(url.toString(), {
                method: "GET",
                next: { tags: ["blog-data"] },
            });
            const blog = await res.json();

            if (!res.ok) {
                return {
                    data: null,
                    error: { message: blog.message || "Something went wrong!" },
                };
            }
            return { data: blog, error: null };
        } catch (err) {
            return { data: null, error: { message: "Something went wrong" } };
        }
    },
    updateFoodBlogService: async (id: string, blogData: Partial<CreateFoodBlog>) => {
        try {
            const url = new URL(`${API_URL}/food-blogs/${id}`);
            const cookieStore = await cookies();

            const res = await fetch(url.toString(), {
                method: "PATCH",
                headers: {
                    Cookie: cookieStore.toString(),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(blogData),
            });
            const blog = await res.json();

            if (!res.ok) {
                return {
                    data: null,
                    error: { message: blog.message || "Something went wrong!" },
                };
            }
            return { data: blog, error: null };
        } catch (err) {
            return { data: null, error: { message: "Something went wrong" } };
        }
    },
    deleteFoodBlogService: async (id: string) => {
        try {
            const url = new URL(`${API_URL}/food-blogs/${id}`);
            const cookieStore = await cookies();

            const res = await fetch(url.toString(), {
                method: "DELETE",
                headers: {
                    Cookie: cookieStore.toString(),
                },
            });
            const blog = await res.json();

            if (!res.ok) {
                return {
                    data: null,
                    error: { message: blog.message || "Something went wrong!" },
                };
            }
            return { data: blog, error: null };
        } catch (err) {
            return { data: null, error: { message: "Something went wrong" } };
        }
    },
};