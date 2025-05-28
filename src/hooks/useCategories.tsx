import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useCategories = () => {
  return useQuery(['categories'], async () => {
    const res = await axios.get('https://fakestoreapi.com/products/categories');
    return res.data;
  });
};
