import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    avatar: "",
    name: "",
    lastName: "",
    id: "",
    birthday: "",
    platform: { name: "", gamerTag: "" },
    error:null
  },
  reducers: {
    updateProfile: (state, action) => {
      Object.entries(action.payload).forEach(([key, value]) => {
        if (key in state) {
          state[key] = value; // Direct field update
        } else if (key === "platform" && typeof value === "object") {
          state.platform = { ...state.platform, ...value }; // Merge platform data
        }
      });
    },
    clearProfile: (state,action) => {
      return {
        avatar: "",
        name: "",
        lastName: "",
        id: "",
        birthday: "",
        platform: { name: "", gamerTag: "" },
        error:null
      };
    },
    profileError:(state,action)=>{
      state.error = action.payload
  },
  },
});

export const { updateProfile, clearProfile,profileError } = profileSlice.actions;
export default profileSlice.reducer;
