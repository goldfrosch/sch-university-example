export type ProductResponse = {
  product: Product;
  productImages: {
    imageUrl: `https://${string}`;
  }[];
  reviewData: {
    totalCount: number;
    totalScore: number;
  };
};

export type Product = {
  id: number;
  price: number;
  productName: string;
  productType: "FOODS";
};

export type ReviewInfo = {
  totalCount: number;
  totalScore: number;
};
