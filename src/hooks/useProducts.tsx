import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useProducts = (category?: string) => {
  const url = category
    ? `https://fakestoreapi.com/products/category/${category}`
    : 'https://fakestoreapi.com/products';

  return useQuery(['products', category], async () => {
    const res = await axios.get(url);
    return res.data;
  });
};
