export type Product = {
  title: string;
  reviews: number;
  price: number;
  discountedPrice: number;
  id: number;
  category: string;
  gender: string;
  size: string;
  color: string;
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
};
