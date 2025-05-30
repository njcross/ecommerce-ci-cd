import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import styles from './AddDataForm.module.css';

interface User {
  id?: string;
  name: string;
  age: number;
}

const AddDataForm = () => {
  const [data, setData] = useState<Omit<User, 'id'>>({ name: '', age: 0 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: name === 'age' ? parseInt(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'users'), data);
      alert('Data added!');
      setData({ name: '', age: 0 });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className={styles.adddataformContainer}>
      <h2 className={styles.adddataformTitle}>Add User</h2>
      <div className={styles.adddataformContent}>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Name"
            className={styles.input}
          />
          <input
            name="age"
            type="number"
            value={data.age}
            onChange={handleChange}
            placeholder="Age"
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDataForm;
