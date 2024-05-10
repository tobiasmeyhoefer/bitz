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
  id: string;
  title: string;
  description: string | null;
  price: number;
  currency: string;
  quantity: number;
  location: string | null;
  status: string;
  sellerId: string;
  image: string | null;
  createdAt: Date;
};