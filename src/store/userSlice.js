import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    editUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: () => {
      
      localStorage.removeItem("user")
      return {user:null};
    },
  },
});

export const { addUser, removeUser, editUser } = userSlice.actions;
export default userSlice.reducer;
