import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../services/baseQueryWithReauth";

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Users", "Groups", "Stats"],
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: ({ page = 1, limit = 20, search = "" }) =>
                `/admin/users?page=${page}&limit=${limit}&search=${search}`,
            providesTags: ["Users"],
        }),
        banUser: builder.mutation({
            query: (id) => ({
                url: `/admin/users/${id}/ban`,
                method: "PATCH",
            }),
            invalidatesTags: ["Users"],
        }),
        unbanUser: builder.mutation({
            query: (id) => ({
                url: `/admin/users/${id}/unban`,
                method: "PATCH",
            }),
            invalidatesTags: ["Users"],
        }),
        editUser: builder.mutation({
            query: ({ id, body }) => ({
                url: `/admin/users/${id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Users"],
        }),
        getGroups: builder.query({
            query: ({ page = 1, limit = 20, search = "" }) =>
                `/admin/groups?page=${page}&limit=${limit}&search=${search}`,
            providesTags: ["Groups"],
        }),
        lockGroup: builder.mutation({
            query: ({ id }) => ({
                url: `/admin/groups/${id}`,
                method: "PATCH",
                body: {
                    status: "LOCK",
                },
            }),
        }),
        unLockGroup: builder.mutation({
            query: ({ id }) => ({
                url: `/admin/groups/${id}`,
                method: "PATCH",
                body: {
                    status: "ACTIVE",
                },
            }),
        }),
        deleteGroup: builder.mutation({
            query: (id) => ({
                url: `/admin/groups/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Groups"],
        }),
        getTodayStats: builder.query({
            query: () => "admin/stats/today",
            providesTags: ["Stats"],
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetTodayStatsQuery,
    useLockGroupMutation,
    useUnLockGroupMutation,
    useBanUserMutation,
    useUnbanUserMutation,
    useGetGroupsQuery,
    useEditUserMutation,
    useDeleteGroupMutation,
} = adminApi;
