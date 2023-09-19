// import { createContext, useState } from "react";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import app from "../firebase-config";

// export const AuthContext = createContext();

// export const MyProvider = ({ children }) => {
//   const [user, setUser] = useState(async () => {
//     const auth = getAuth(app);
//     const log = await onAuthStateChanged(auth);
//     if (log) {
//       return true;
//     } else {
//       return false;
//     }
//   });

//   // useEffect(() => {
//   //   console.log("AMINE");
//   // }, [user]);

//   return (
//     <AuthContext.Provider value={{ user, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../firebase-config";

export const AuthContext = createContext();

export const MyProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialisez à null ou false

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(true);
        console.log("OUI");
      } else {
        setUser(false);
        console.log("NON");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
