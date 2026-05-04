export const ShowSkeleton = () => (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 animate-pulse">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <div className="h-8 bg-gray-200 rounded-md w-1/3 mb-6"></div>

                {/* Delivery Address Skeleton */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="h-12 bg-gray-100 rounded-xl w-full"></div>
                    <div className="h-12 bg-gray-100 rounded-xl w-full"></div>
                    <div className="h-12 bg-gray-100 rounded-xl w-full"></div>
                    <div className="h-24 bg-gray-100 rounded-xl w-full"></div>
                </div>

                {/* Payment Method Skeleton */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="h-16 bg-gray-100 rounded-xl w-full"></div>
                </div>

                {/* Coupon Field Skeleton */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="h-12 bg-gray-100 rounded-xl w-full"></div>
                </div>
            </div>

            <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-8 space-y-6">
                    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-6"></div>

                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        </div>
                        <div className="flex justify-between">
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        </div>
                    </div>

                    <hr className="my-4" />

                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        </div>
                        <div className="flex justify-between">
                            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        </div>
                        <div className="flex justify-between">
                            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-between items-center">
                        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                    </div>

                    <div className="h-14 bg-gray-200 rounded-xl w-full mt-8"></div>
                </div>
            </div>
        </div>
    </div>
);