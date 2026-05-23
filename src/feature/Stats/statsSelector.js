export const selectStats = (state) => state.stats;
export const selectBannedUsers = (state) => state.stats.bannedUsers;
export const selectNewUsersToday = (state) => state.stats.newUsersToday;
export const selectMessagesToday = (state) => state.stats.messagesToday;
export const selectTotalUsers = (state) => state.stats.totalUsers;
export const selectGroupsToday = (state) =>
    state.stats.messagesToday.groupsToday;
