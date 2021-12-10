import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const mainAPI = createApi({
  reducerPath: "mainAPI",
  baseQuery: fetchBaseQuery(
    { baseUrl: "https://estimate-price-property.herokuapp.com/"
    }),
  endpoints: (builder) => ({
   
   getPredictions: builder.query({
      query: (userId) => `predictions/${userId}`,
    }),
    predict: builder.mutation({
      query: (prediction) => ({
        url: "predict",
        method: "POST",
        body: prediction,      
      }),
    }),
    nearHouses: builder.mutation({
      query: (latlng) => ({
        url: "houses",
        method: "POST",
        body: latlng,      
      }),
    }),
    
   
    
  }),
});
export const {
    usePredictMutation,
    useGetPredictionsQuery,
    useNearHousesMutation
} = mainAPI;
