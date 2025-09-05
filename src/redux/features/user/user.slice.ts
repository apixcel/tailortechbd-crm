import { IRole, IRoleAction, IUser } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TUserRole = Omit<IRole, "actions"> & { actions: IRoleAction[] };
type TAuthState = {
  user: IUser | null;
  isLoading: boolean;
  token: string | null;
  role: TUserRole | null;
};
const initialState: TAuthState = {
  user: null,
  isLoading: true,
  token: null,
  role: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
      state.isLoading = false;
    },

    logout(state) {
      state.user = null;
      state.isLoading = false;
      state.token = null;
      state.role = null;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action?.payload || false;
    },

    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },

    setState(_state, action: PayloadAction<TAuthState>) {
      return action.payload;
    },

    setRole: (state, action: PayloadAction<TUserRole | null>) => {
      state.role = action.payload;
    },
  },
});

export const { setUser, setToken, logout, setLoading, setState, setRole } = userSlice.actions;
export default userSlice.reducer;
