// import React from 'react'

// const AuthContext = () => {
//   return (
//     <div>

//     </div>
//   )
// }

// export default AuthContext
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

// Custom hook (easy import)
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loginUser, setLoginUser] = useState("");

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("userData") || "{}");
    setLoginUser(user.name || "");
  }, []);

  return (
    <AuthContext.Provider value={{ loginUser, setLoginUser }}>
      {children}
    </AuthContext.Provider>
  );
};
