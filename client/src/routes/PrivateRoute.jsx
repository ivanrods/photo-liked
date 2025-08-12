import { Navigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useRef } from "react";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  const hasShownToast = useRef(false); // controla se já mostrou o toast

  useEffect(() => {
    if (!token && !hasShownToast.current) {
      toast.error("Faça login para acessar a página");
      hasShownToast.current = true; // marca que já foi mostrado
    }
  }, [token]);

  return token ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
