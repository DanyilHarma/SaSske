import { SiteStat } from "@/entities/statsTable/ui/model/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const siteStatApi = createApi({
    reducerPath: "siteStatApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    endpoints: (builder) => ({
        getSiteStats: builder.query<SiteStat[], void>({
            query: () => "/site-stat",
        }),
    }),
});

export const { useGetSiteStatsQuery } = siteStatApi;
