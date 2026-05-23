import { createSlice } from "@reduxjs/toolkit";

const statsSlice = createSlice({
    name: "stats",
    initialState: {
        bannedUsers: 0,
        newUsersToday: 0,
        messagesToday: 0,
        groupsToday: 0,
        totalUsers: 0,
    },
    reducers: {
        setStats: (state, { payload }) => ({ ...state, ...payload }),
    },
});

export const { setStats } = statsSlice.actions;
export default statsSlice.reducer;
