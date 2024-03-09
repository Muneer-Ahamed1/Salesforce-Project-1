import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isLogin.login) {
      navigate("/");
    }
  }, [auth, navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;
