import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../services/baseQueryWithReauth";

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Users", "Groups", "Stats"],
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: ({ page = 1, limit = 20, search = "" }) =>
                `/users?page=${page}&limit=${limit}&search=${search}`,
            providesTags: ["Users"],
        }),
        banUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}/ban`,
                method: "PATCH",
            }),
            invalidatesTags: ["Users"],
        }),
        unbanUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}/unban`,
                method: "PATCH",
            }),
            invalidatesTags: ["Users"],
        }),
        editUser: builder.mutation({
            query: ({ id, body }) => ({
                url: `/users/${id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Users"],
        }),
        getGroups: builder.query({
            query: ({ page = 1, limit = 20, search = "" }) =>
                `/groups?page=${page}&limit=${limit}&search=${search}`,
            providesTags: ["Groups"],
        }),
        updateGroup: builder.mutation({
            query: ({ id, body }) => ({
                url: `/groups/${id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Groups"],
        }),
        deleteGroup: builder.mutation({
            query: (id) => ({
                url: `/groups/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Groups"],
        }),
        getTodayStats: builder.query({
            query: () => "/stats/today",
            providesTags: ["Stats"],
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetTodayStatsQuery,
    useBanUserMutation,
    useUnbanUserMutation,
    useGetGroupsQuery,
    useEditUserMutation,
    useDeleteGroupMutation,
    useUpdateGroupMutation,
} = adminApi;
