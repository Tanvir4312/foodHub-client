"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import FoodBlogModal from "./FoodBlogModal";

import { Roles } from "@/constrants/roles";
import UpdateBlogModal from "@/components/modules/adminDashboard/UpdateBlogModal";
import DeleteBlogModal from "@/components/modules/adminDashboard/DeleteBlogModal";
import { useEffect } from "react";

const FoodBlogs = ({
    blogs,
    userRole,
    showAll = false
}: {
    blogs: any[];
    userRole?: string;
    showAll?: boolean;
}) => {
    const [selectedBlog, setSelectedBlog] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    // Sort blogs by createdAt descending (newest first)
    const sortedBlogs = [...(blogs || [])].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const sliceBlogs = showAll ? sortedBlogs : sortedBlogs?.slice(0, 3);

    if (!hasMounted) return null;

    const handlOpenFoodBlogModal = (blog: any) => {
        setSelectedBlog(blog);
        setIsModalOpen(true);
    };

    return (
        <section className="py-4 px-1 md:px-4 bg-transparent transition-colors duration-300 rounded-2xl">

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {sliceBlogs?.map((blog) => (
                    <div
                        key={blog.id}
                        className="group relative bg-white dark:bg-zinc-900 rounded-[40px] overflow-hidden border border-slate-100 dark:border-white/5 hover:border-orange-500/50 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_60px_rgba(249,115,22,0.08)] flex flex-col h-full"
                    >
                        {/* Image Wrapper - Fixed Aspect Ratio for Uniformity */}
                        <div className="relative w-full aspect-[16/10] overflow-hidden">
                            <Image
                                src={blog?.image}
                                alt={blog.title}
                                fill
                                unoptimized
                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                            {/* Date Badge */}
                            <div className="absolute top-6 left-6 bg-white/95 dark:bg-black/80 backdrop-blur-md px-4 py-2 rounded-2xl text-xs font-black text-orange-600 shadow-xl flex items-center gap-2 uppercase tracking-widest">
                                <Calendar size={14} />
                                {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </div>

                            {/* Admin Actions */}
                            {userRole === Roles.admin && (
                                <div className="absolute top-6 right-6 flex items-center gap-3 z-20">
                                    <div className="hover:scale-110 transition-transform">
                                        <UpdateBlogModal blog={blog} />
                                    </div>
                                    <div className="hover:scale-110 transition-transform dark:text-white">
                                        <DeleteBlogModal blogId={blog.id} blogTitle={blog.title} />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Content Section */}
                        <div className="p-8 flex flex-col flex-1">
                            {/* Title - Fixed Line Clamp and Min Height for Alignment */}
                            <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 group-hover:text-orange-500 transition-colors duration-300 line-clamp-2 min-h-[4rem] mb-3 leading-tight tracking-tight">
                                {blog.title}
                            </h3>

                            {/* Description - Fixed Line Clamp and Min Height for Alignment */}
                            <p className="text-slate-500 dark:text-slate-100 text-sm leading-relaxed line-clamp-3 min-h-[4.5rem] mb-8">
                                {blog.description}
                            </p>

                            <div className="pt-6 mt-auto border-t border-slate-100 dark:border-white/5 flex justify-between items-center">
                                <button
                                    onClick={() => handlOpenFoodBlogModal(blog)}
                                    className="flex items-center gap-2 text-xs font-black text-orange-600 group/btn cursor-pointer uppercase tracking-[2px] hover:text-orange-700"
                                >
                                    READ STORY
                                    <span className="group-hover:translate-x-2 transition-transform duration-300">
                                        <ArrowRight size={18} />
                                    </span>
                                </button>

                                <span className="text-[10px] text-slate-300 dark:text-slate-100 font-black uppercase tracking-widest">
                                    #Journal
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Component */}
            <FoodBlogModal
                isOpen={isModalOpen}
                blog={selectedBlog}
                onClose={() => setIsModalOpen(false)}
            />
        </section>
    );
};

export default FoodBlogs;