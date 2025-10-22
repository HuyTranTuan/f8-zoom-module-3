import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCurrentUser } from "@/services/auth";
import { selectCurrentUser } from "./selectors";


export const useFetchCurrentUser = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUser());
    }, [dispatch]);
}

export const useCurrentUser = () => {
    const currentUser  = useSelector(selectCurrentUser);

    return currentUser ;
}