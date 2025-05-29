// src/types.ts
export type Product = {
  id?: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  stock: number;
};


// types.ts
export type Order = {
  id: string;
  userId: string;
  createdAt: { seconds: number }; // or `Timestamp` if you're importing from firebase/firestore
  total: number;
  items: Array<{
    productId: string;
    title: string;
    price: number;
    quantity: number;
  }>;
};

