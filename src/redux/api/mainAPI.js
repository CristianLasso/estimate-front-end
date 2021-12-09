import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const mainAPI = createApi({
  reducerPath: "mainAPI",
  baseQuery: fetchBaseQuery(
    { baseUrl: "http://127.0.0.1:5000/"
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
    
   
    
  }),
});
export const {
    usePredictMutation,
    useGetPredictionsQuery
} = mainAPI;
