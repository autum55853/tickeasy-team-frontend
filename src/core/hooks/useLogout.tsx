import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
export const useLogout = () => {
  const navigate = useNavigate();
  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   navigate("/login");
  // };
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return { handleLogout };
};
