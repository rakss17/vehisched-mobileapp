import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../../interfaces/interfaces";

interface UserState {
  data: UserData | null;
}

const initialState: UserState = {
  data: null,
};

const personalInfoSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    fetchPersonalInfo: (state, action: PayloadAction<UserData>) => {
      state.data = action.payload;
    },
  },
});

export const { fetchPersonalInfo } = personalInfoSlice.actions;

export default personalInfoSlice.reducer;
