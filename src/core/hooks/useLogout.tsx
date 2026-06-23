import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ModalStatusContext } from "@/context/modalStatusContext";

export const useLogout = () => {
  const navigate = useNavigate();
  const { resetLoginData } = useContext(ModalStatusContext)!;

  const handleLogout = () => {
    resetLoginData();
    navigate("/auth/logout-broadcast");
  };

  return { handleLogout };
};
