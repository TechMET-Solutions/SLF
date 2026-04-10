import { createRoot } from "react-dom/client";
import { AuthProvider } from "./API/Context/AuthContext.jsx";
import App from "./App.jsx";
import "./index.css";
import { PermissionProvider } from "./API/Context/PermissionContext.jsx";

createRoot(document.getElementById("root")).render(
  // <AuthProvider>
  //   <App />
  //  </AuthProvider>

<PermissionProvider>
  <AuthProvider>
    <App />
  </AuthProvider>
</PermissionProvider>
);
