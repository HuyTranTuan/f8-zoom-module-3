import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { authService } from "@/services/authServices";

export const useFetchCurrentUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authService.getCurrentUser());
  }, [dispatch]);
};

export const useCurrentUser = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  return currentUser;
};
