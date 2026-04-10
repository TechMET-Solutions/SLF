import { createContext, useContext, useEffect, useState } from "react";

const PermissionContext = createContext();

export const PermissionProvider = ({ children }) => {
  const [permissions, setPermissions] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(sessionStorage.getItem("userData"));

    if (storedData) {
      setUserData(storedData);
      setPermissions(storedData.permissions || {});
    }
  }, []);

  return (
    <PermissionContext.Provider value={{ permissions, userData }}>
      {children}
    </PermissionContext.Provider>
  );
};

// Custom hook (easy use)
export const usePermission = () => {
  return useContext(PermissionContext);
};
