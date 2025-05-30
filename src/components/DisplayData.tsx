import React, { useState, useEffect } from 'react';
import styles from './DisplayData.module.css';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

interface User {
  id?: string;
  name: string;
  age: number;
}

const DisplayData = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newAge, setNewAge] = useState<string>('');
  const [newName, setNewName] = useState<string>('');

  const updateUser = async (
    userId: string | undefined,
    updatedData: { name?: string; age?: string }
  ) => {
    if (!userId) return console.error('❌ updateUser failed: userId is undefined');

    try {
      const userDoc = doc(db, 'users', userId);
      await updateDoc(userDoc, updatedData);
      console.log('✅ User updated successfully');
    } catch (error) {
      console.error('❌ Error updating user:', error);
    }
  };

  const deleteUser = async (userId: string | undefined) => {
    if (!userId) return console.error('❌ deleteUser failed: userId is undefined');

    try {
      await deleteDoc(doc(db, 'users', userId));
      console.log('✅ User deleted successfully');
    } catch (error) {
      console.error('❌ Error deleting user:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const dataArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as User[];
      setUsers(dataArray);
    };

    fetchData();
  }, []);

  return (
    <div className={styles.displaydataContainer}>
      <h2 className={styles.displaydataTitle}>Users List</h2>
      <div className={styles.displaydataContent}>
        {users.map((user) => (
          <div key={user.id} className={styles.userCard}>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Age:</strong> {user.age}</p>

            <input
              onChange={(e) => setNewName(e.target.value)}
              type="text"
              placeholder="Enter new name"
              className={styles.input}
            />
            <button
              className={styles.button}
              onClick={() => updateUser(user.id, { name: newName })}
            >
              Update Name
            </button>

            <input
              onChange={(e) => setNewAge(e.target.value)}
              type="number"
              placeholder="Enter new age"
              className={styles.input}
            />
            <button
              className={styles.button}
              onClick={() => updateUser(user.id, { age: newAge })}
            >
              Update Age
            </button>

            <button
              className={`${styles.button} ${styles.deleteButton}`}
              onClick={() => deleteUser(user.id)}
            >
              Delete User
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayData;
