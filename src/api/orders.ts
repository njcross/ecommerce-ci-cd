import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, query, where, Timestamp, doc, getDoc } from 'firebase/firestore';
import type { Order } from '../types'; 

export const createOrder = async (orderData: any) => {
  return await addDoc(collection(db, 'orders'), {
    ...orderData,
    createdAt: Timestamp.now(),
  });
};

export const fetchUserOrders = async (userId: string): Promise<Order[]> => {
  const q = query(collection(db, 'orders'), where('userId', '==', userId));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Order[];
};


export const fetchOrderById = async (orderId: string): Promise<Order> => {
  const docRef = doc(db, 'orders', orderId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error('Order not found');
  }

  return {
    id: docSnap.id,
    ...(docSnap.data() as Omit<Order, 'id'>),
  };
};
