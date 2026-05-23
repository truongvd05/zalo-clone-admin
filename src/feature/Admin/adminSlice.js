import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    admin: null,
    accessToken: localStorage.getItem("access_token") || null,
};

const userSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setUser(state, action) {
            const { user, token } = action.payload;
            state.admin = user;
            state.accessToken = token.access_token;
            localStorage.setItem("access_token", token.access_token);
            localStorage.setItem("refresh_token", token.refresh_token);
        },
        setAccessToken(state, action) {
            state.accessToken = action.payload;
            localStorage.setItem("access_token", action.payload);
        },
        logOut(state, action) {
            state.admin = null;
            state.accessToken = null;
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
        },
    },
});

export const { setUser, logOut, setAccessToken } = userSlice.actions;
export default userSlice.reducer;
