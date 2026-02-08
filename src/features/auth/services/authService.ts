import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../../api/firebaseConfig";

export const authService = {
  register: async (email: string, pass: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        pass
      );
      return userCredential.user;
    } catch (error: any) {
      // Mas maganda kung error code ang itatapon natin para mas malinis
      throw error.message || "Registration failed";
    }
  },

  login: async (email: string, pass: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        pass
      );
      return userCredential.user;
    } catch (error: any) {
      throw error.message || "Login failed";
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw error.message || "Logout failed";
    }
  },
};
