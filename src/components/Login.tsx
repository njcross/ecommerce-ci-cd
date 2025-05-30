import { useState } from 'react';
import React, { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { login, logout } from '../store/authSlice';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      dispatch(login({ uid: user.uid, email: user.email || '' }));
      alert('Login successful!');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      alert('Logged out!');
    } catch (err: any) {
      console.error('Logout error:', err.message);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.loginTitle}>Login</h2>
      <form onSubmit={handleLogin} className={styles.loginContent}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <button
          type="submit"
          disabled={!email || !password}
          className={styles.button}
        >
          Login
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
      <button onClick={handleLogout} className={styles.button}>
        Logout
      </button>
    </div>
  );
};

export default Login;
