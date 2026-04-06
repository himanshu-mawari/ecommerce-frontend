import { createSlice } from "@reduxjs/toolkit";

const loadUser = () => {
  try {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: loadUser(),
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: () => {
      return null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
