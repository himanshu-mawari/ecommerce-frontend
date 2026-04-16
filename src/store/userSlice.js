import { createSlice } from "@reduxjs/toolkit";

const loadUser = () => {
  const initialState = {
    name: "",
    phone: "",
    email: "",
  }
  try {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : initialState;
  } catch {
    return initialState;
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
       const initialState = {
    name: "",
    phone: "",
    email: "",
  }
      localStorage.removeItem("user")
      return initialState;
    },
  },
});

export const { addUser, removeUser, editUser } = userSlice.actions;
export default userSlice.reducer;
