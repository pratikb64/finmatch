import { LoginArgs, loginUserService } from "@/services/auth.service";
import { AsyncState } from "@/types";
import { createStore, useStore } from "zustand";

interface LoginPageState {
  userType?: "business" | "expert";
  asyncStates: {
    loginUserAsyncState: AsyncState;
  };
}

interface LoginPageActions {
  setUserType: (userType: "business" | "expert" | undefined) => void;
  loginUser: (args: LoginArgs) => Promise<void>;
}

export type LoginPage = LoginPageState & LoginPageActions;

export const LoginPageState = createStore<LoginPage>((set) => ({
  userType: undefined,
  asyncStates: {
    loginUserAsyncState: AsyncState.IDLE,
  },
  setUserType: (userType) => set({ userType }),
  loginUser: async (user) => {
    set({ asyncStates: { loginUserAsyncState: AsyncState.PENDING } });

    const loggedInUser = await loginUserService(user);

    if (!loggedInUser.success) {
      set({ asyncStates: { loginUserAsyncState: AsyncState.ERROR } });
      return Promise.reject(loggedInUser);
    }

    localStorage.setItem("session", loggedInUser.data);

    set({ asyncStates: { loginUserAsyncState: AsyncState.SUCCESS } });
  },
}));

export const useLoginPageState = () => useStore(LoginPageState);
