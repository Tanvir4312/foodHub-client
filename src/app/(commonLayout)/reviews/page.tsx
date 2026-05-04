import React from 'react';
import { getReviewsForHomePageAction } from '@/action/review.action';

import ShowAllReview from '@/components/modules/ShowAllReview/ShowAllReview';
import { ShowSkeleton } from '@/components/SharedSkileton/Skileton/Skileton';

const ReviewPage = async () => {
    const reviewsResponse = await getReviewsForHomePageAction();
    const reviewsRawData = reviewsResponse?.data;
    const reviews = reviewsRawData?.data || [];

    return (
        <div className='max-w-7xl mx-auto px-5'>

            <ShowAllReview reviews={reviews} />
        </div>
    );
};

export default ReviewPage;