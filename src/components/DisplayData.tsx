// DisplayData.tsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

interface User {
  id?: string; // id is optional, as it will only be available after data is fetched
  name: string;
  age: number;
}

const DisplayData = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newAge, setNewAge] = useState<string>('');
  const [newName, setNewName] = useState<string>('');

// Update user function
const updateUser = async (
  userId: string | undefined,
  updatedData: { name?: string; age?: string }
) => {
  if (!userId) {
    console.error('❌ updateUser failed: userId is undefined');
    return;
  }

  try {
    const userDoc = doc(db, 'users', userId);
    await updateDoc(userDoc, updatedData);
    console.log('✅ User updated successfully');
  } catch (error) {
    console.error('❌ Error updating user:', error);
  }
};

// Delete user function
const deleteUser = async (userId: string | undefined) => {
  if (!userId) {
    console.error('❌ deleteUser failed: userId is undefined');
    return;
  }

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
    <div>
      <h2>Users List</h2>
      {users.map((user) => (
        <div
          key={user.id}
          style={{ border: '2px solid black', margin: '10px' }}
        >
          <div key={user.id}>
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
          </div>
          <input
            onChange={(e) => setNewName(e.target.value)}
            type="string"
            placeholder="Enter new name:"
          />
          <button onClick={() => updateUser(user.id, { name: newName })}>
            Update Name
          </button>
          <input
            onChange={(e) => setNewAge(e.target.value)}
            type="number"
            placeholder="Enter new age:"
          />
          <button onClick={() => updateUser(user.id, { age: newAge })}>
            Update Age
          </button>
          <button style={{ backgroundColor: 'crimson'}} onClick={() => deleteUser(user.id)}>Delete User</button>
        </div>
      ))}
    </div>
  );
};

export default DisplayData;