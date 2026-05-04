"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, Calendar } from "lucide-react";

interface FoodBlogModalProps {
    isOpen: boolean;
    onClose: () => void;
    blog: any;
}

const FoodBlogModal = ({ isOpen, onClose, blog }: FoodBlogModalProps) => {
    // Handle escape key and body scroll lock
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            const handleEsc = (e: KeyboardEvent) => {
                if (e.key === "Escape") onClose();
            };
            window.addEventListener("keydown", handleEsc);
            return () => {
                window.removeEventListener("keydown", handleEsc);
                document.body.style.overflow = "unset";
            };
        }
    }, [isOpen, onClose]);

    if (!isOpen || !blog) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Box */}
            <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col transition-all duration-500 animate-in fade-in zoom-in slide-in-from-bottom-8">
                {/* Sticky Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 p-2 bg-black/10 hover:bg-black/20 text-gray-800 rounded-full backdrop-blur-md transition-colors"
                >
                    <X size={24} />
                </button>

                {/* Scrollable Content Container */}
                <div className="overflow-y-auto flex-1 custom-scrollbar">
                    {/* Hero Image */}
                    <div className="relative w-full h-[300px] md:h-[450px]">
                        <Image
                            src={blog.image}
                            alt={blog.title}
                            fill
                            className="object-cover"
                            priority
                            unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                    </div>

                    {/* Main Content Area */}
                    <div className="px-6 pb-12 -mt-16 md:-mt-24 relative z-10">
                        <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-sm">
                            {/* Meta info */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center gap-2 px-4 py-2 bg-orange-500/10 text-orange-500 rounded-full text-xs font-bold uppercase tracking-wider">
                                    <Calendar size={14} />
                                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </div>
                                <span className="text-gray-400 text-xs font-medium italic">
                                    #FoodHub Experience
                                </span>
                            </div>

                            {/* Title */}
                            <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-8">
                                {blog.title}
                            </h2>

                            {/* Description */}
                            <div className="prose prose-lg max-w-none">
                                <p className="text-gray-700 text-lg md:text-xl leading-relaxed whitespace-pre-line font-medium opacity-90">
                                    {blog.description}
                                </p>
                            </div>

                            {/* Footer / Call to action inside modal */}
                            <div className="mt-12 pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                                        FH
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">FoodHub Editorial</p>
                                        <p className="text-xs text-gray-500">Culinary Stories Team</p>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="px-8 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:scale-105 transition-transform"
                                >
                                    Close Story
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodBlogModal;
