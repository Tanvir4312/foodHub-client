import { RoutesType } from "@/types/routes.type";

export const adminRoute: RoutesType = [
  {
    title: "Stats",
    url: "/admin-dashboard",
  },
  {
    title: "All User",
    url: "/admin-dashboard/all-user",
  },
  {
    title: "All Order",
    url: "/admin-dashboard/all-order",
  },
  {
    title: "Add Category",
    url: "/admin-dashboard/categories/add-category",
  },
  {
    title: "All Categoy",
    url: "/admin-dashboard/categories",
  },
  {
    title: "Coupons",
    url: "/admin-dashboard/coupons",
  },
  {
    title: "Blogs",
    url: "/admin-dashboard/blogs",
  },

  {
    title: "Home",
    url: "/",
  },
];
