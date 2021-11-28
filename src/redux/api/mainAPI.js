import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const mainAPI = createApi({
  reducerPath: "mainAPI",
  baseQuery: fetchBaseQuery(
    { baseUrl: process.env.BACKEND_DEV_URL 
    }),
  endpoints: (builder) => ({
   
//    getPricePredicted: builder.query({
//       query: () => `/predict`,
//     }),
    predict: builder.mutation({
      query: (prediction) => ({
        url: "predict",
        method: "POST",
        body: prediction,      
      }),
    }),
   
    
  }),
});
export const {
    usePredictMutation,
    useGetPricePredictedQuery
} = mainAPI;
