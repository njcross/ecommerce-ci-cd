// src/authObserver.ts
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import store from "./store";
import { login, logout } from "./store/authSlice";

export const observeAuthState = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      store.dispatch(
        login({
          uid: user.uid,
          email: user.email,
        })
      );
    } else {
      store.dispatch(logout());
    }
  });
};
