export interface MealType {
  averageRating: number;
  categories: { name: string };
  category_id: string;
  description: string;
  dietary: string;
  id: string;
  image_url: string;
  isAvailable: boolean;
  name: string;
  price: number;
  isDeleted: boolean;
  totalReviews: number;
}
