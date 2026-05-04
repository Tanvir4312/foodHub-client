"use server"
import { foodBlogsService } from "@/services/foodBlog.service";
import { CreateFoodBlog } from "@/types/foodBlogs.types";
import { updateTag } from "next/cache";

export const createFoodBlogAction = async (blogData: CreateFoodBlog) => {
    const result = await foodBlogsService.createFoodBlogService(blogData);
    updateTag("blog-data");
    return result;
};

export const getAllFoodBlogAction = async () => {
    return await foodBlogsService.getAllFoodBlogService();
};
