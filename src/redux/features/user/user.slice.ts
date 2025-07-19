import { IUser } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TAuthState = {
  user: IUser | null;
  isLoading: boolean;
  token: string | null;
};
const initialState: TAuthState = {
  user: null,
  isLoading: true,
  token: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
  },
});

export const { setUser, setToken } = userSlice.actions;
export default userSlice.reducer;
