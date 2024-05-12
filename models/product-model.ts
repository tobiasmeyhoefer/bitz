export type ProductType = {
  title: string;
  description: string;
  price: number;
  currency: string;
  quantity: number;
  location: string;
  status: string;
};

export type FullProductType = {
  title: string;
  description: string;
  price: number;
  currency: string;
  quantity: number;
  location: string;
  status: string;
  sellerId: string;
  createdAt: Date;
  image: string;
};