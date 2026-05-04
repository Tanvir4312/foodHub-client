import { getAllFoodBlogAction } from "@/action/foodBlog.action";
import ShowAllBlogs from "@/components/modules/ShowAllBlogs/ShowAllBlogs";


const BlogPage = async () => {
    const res = await getAllFoodBlogAction();
    const blogs = res?.data?.data || [];
    return (
        <div className='max-w-7xl mx-auto px-5 my-5'>
            <div >
                {blogs.map((blog: any) => (
                    <ShowAllBlogs key={blog.id} blogs={blogs} />
                ))}
            </div>
        </div>
    );
};

export default BlogPage;