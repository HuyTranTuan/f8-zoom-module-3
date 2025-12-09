import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCurrentUser } from "@/services";

export const useFetchCurrentUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
};

export const useCurrentUser = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  return currentUser;
};
