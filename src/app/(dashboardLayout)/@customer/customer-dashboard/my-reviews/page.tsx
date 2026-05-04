import { getMyReviewsAction } from "@/action/review.action";
import MyReviews from "@/components/customerDashboard/My_Reviews/MyReviews";



const MyReviewsPage = async () => {
    const res = await getMyReviewsAction();
    const reviews = res?.data?.data || [];

    return (
        <div>
            <MyReviews myReviews={reviews} />
        </div>
    );
};

export default MyReviewsPage;