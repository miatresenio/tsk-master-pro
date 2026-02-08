// import { onAuthStateChanged, User } from "firebase/auth";
// import React, { createContext, useContext, useEffect, useState } from "react";
// import { auth } from "../api/firebaseConfig";

// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
// }

// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   loading: true,
// });

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Ito ang listener na nagsasabi kung logged in o logged out ang user
//     const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
//       setUser(firebaseUser);
//       setLoading(false);
//     });

//     return unsubscribe; // Cleanup listener on unmount
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import { onAuthStateChanged, User } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../api/firebaseConfig";

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
