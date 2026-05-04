"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import FoodBlogModal from "./FoodBlogModal";

const FoodBlogs = ({ blogs }: { blogs: any[] }) => {
    const [selectedBlog, setSelectedBlog] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const sliceBlogs = blogs?.slice(0, 3);

    const handlOpenFoodBlogModal = (blog: any) => {
        setSelectedBlog(blog);
        setIsModalOpen(true);
    };

    return (
        <section className="py-16 md:py-24 px-4 md:px-12 bg-gray-50 dark:bg-gradient-to-b dark:from-[#0a0a0a] dark:to-[#121212] transition-colors duration-300 rounded-2xl">
            {/* Header Section */}
            <div className="lg:flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                <div className="max-w-2xl text-left mb-5 lg:mb-0">
                    <h4 className="text-orange-500 font-bold uppercase tracking-widest text-sm mb-2">
                        Our Journal
                    </h4>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter leading-tight">
                        Latest <span className="text-orange-500">Food</span> Stories
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg">
                        Discover tasty stories, food tips, and culinary inspiration from around the world.
                    </p>
                </div>

                <Link href="/blogs" className="px-6 py-3 border-2 border-orange-500 text-orange-500 font-bold rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 cursor-pointer md:w-[180px] text-center md:mt-5 lg:mt-0">
                    View All Posts
                </Link>
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sliceBlogs?.map((blog) => (
                    <div
                        key={blog.id}
                        className="group relative bg-white dark:bg-gray-900/50 rounded-3xl overflow-hidden border border-gray-200 dark:border-white/5 hover:border-orange-500/50 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_50px_rgba(249,115,22,0.1)]"
                    >
                        {/* Image Wrapper */}
                        <div className="relative w-full overflow-hidden">
                            <Image
                                src={blog?.image}
                                alt={blog.title}
                                width={400}
                                height={400}
                                unoptimized
                                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Date Badge */}
                            <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-orange-500 shadow-lg flex items-center gap-1.5">
                                <Calendar size={12} />
                                {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-orange-500 transition-colors duration-300 line-clamp-2">
                                {blog.title}
                            </h3>

                            <p className="mt-3 text-gray-600 dark:text-gray-600 text-sm leading-relaxed line-clamp-3">
                                {blog.description}
                            </p>

                            <div className="pt-6 mt-6 border-t border-gray-100 dark:border-white/5 flex justify-between items-center">
                                <button
                                    onClick={() => handlOpenFoodBlogModal(blog)}
                                    className="flex items-center gap-2 text-sm font-bold text-orange-500 group/btn cursor-pointer"
                                >
                                    READ STORY
                                    <span className="group-hover:translate-x-2 transition-transform duration-300">
                                        <ArrowRight size={16} />
                                    </span>
                                </button>

                                <span className="text-xs text-gray-400 dark:text-gray-600 font-medium italic">
                                    #FoodHub
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