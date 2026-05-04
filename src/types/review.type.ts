export type Review = {
  name: string
  rating: number;
  comment: string;
  user: string
};


export interface ReviewsShowHomePage {
  id: string;
  name: string;
  rating: number;
  comment: string;
  meal_id: string;
  user_id: string;
  createdAt: string;
  meal: {
    name: string;
  };
}
