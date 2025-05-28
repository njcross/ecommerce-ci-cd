// src/api/products.ts
export const fetchProducts = async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    return res.json();
  };
  
  export const fetchCategories = async () => {
    const res = await fetch('https://fakestoreapi.com/products/categories');
    return res.json();
  };
  
  export const fetchProductsByCategory = async (category: string) => {
    const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    return res.json();
  };
  