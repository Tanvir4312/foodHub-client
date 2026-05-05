"use server"
import { foodBlogsService } from "@/services/foodBlog.service";
import { CreateFoodBlog } from "@/types/foodBlogs.types";
import { updateTag } from "next/cache";

export const createFoodBlogAction = async (blogData: CreateFoodBlog) => {
    const result = await foodBlogsService.createFoodBlogService(blogData);
    updateTag("blog-data");
    return result;
};

export const updateFoodBlogAction = async (id: string, blogData: Partial<CreateFoodBlog>) => {
    const result = await foodBlogsService.updateFoodBlogService(id, blogData);
    updateTag("blog-data");
    return result;
};

export const deleteFoodBlogAction = async (id: string) => {
    const result = await foodBlogsService.deleteFoodBlogService(id);
    updateTag("blog-data");
    return result;
};export const getAllFoodBlogAction = async (queryParams?: Record<string, string | number | undefined>) => {
    return await foodBlogsService.getAllFoodBlogService(queryParams);
};
