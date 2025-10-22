import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getList as getProductsList } from "@/services/product";
import { selectList as selectProductsList } from "./selectors";


export const useFetchProductsList = ({limit, page} = {}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsList({ limit, page }));
    }, [dispatch, limit, page]);
}

export const useProductsList = () => {
    const products = useSelector(selectProductsList);

    return products;
}