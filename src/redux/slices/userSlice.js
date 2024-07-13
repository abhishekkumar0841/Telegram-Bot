import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  points: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setPoints: (state, action) => {
      state.points = action.payload;
    },
  },
});

export const { setUserId, setPoints } = userSlice.actions;
export default userSlice.reducer;
