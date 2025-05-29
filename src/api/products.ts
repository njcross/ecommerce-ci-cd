import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Ensure this is your initialized Firestore

export const fetchProducts = async () => {
  const snapshot = await getDocs(collection(db, 'products'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addProduct = async (product: any) => {
  return await addDoc(collection(db, 'products'), product);
};

export const updateProduct = async (id: string, updates: any) => {
  const productRef = doc(db, 'products', id);
  return await updateDoc(productRef, updates);
};

export const deleteProduct = async (id: string) => {
  const productRef = doc(db, 'products', id);
  return await deleteDoc(productRef);
};