import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "@/utils/baseQuery";

export const addressApi  = createApi({
    reducerPath: "addressApi",
    baseQuery,
    endpoints: (build) => ({
        getProvinces: build.query({
            query: () => "/address/provinces",
            keepUnusedDatafor: 5,
            transformResponse: (response) => response.data
        }),
    }),
    // refetchOnFocus: true,
    refetchOnReconnect: true
});

export const { useGetProvicesQuery } = addressApi;