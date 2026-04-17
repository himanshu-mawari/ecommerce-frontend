import { createSlice } from "@reduxjs/toolkit";

const loadUser = () => {
  
  try {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

const savedUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: loadUser(),
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      savedUser(action.payload)
    },
    editUser: (state, action) => {
      state.user = action.payload;
      savedUser(action.payload);
    },
    removeUser: () => {
      
      localStorage.removeItem("user")
      return {user:null};
    },
  },
});

export const { addUser, removeUser, editUser } = userSlice.actions;
export default userSlice.reducer;
