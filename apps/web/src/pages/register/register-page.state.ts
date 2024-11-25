import { registerUserService } from "@/services/auth.service";
import { AsyncState, User } from "@/types";
import { createStore, useStore } from "zustand";

interface RegisterPageState {
  userType?: "business" | "expert";
  asyncStates: {
    registerUserAsyncState: AsyncState;
  };
}

interface RegisterPageActions {
  setUserType: (userType: "business" | "expert" | undefined) => void;
  registerUser: (args: User) => Promise<void>;
}

export type RegisterPage = RegisterPageState & RegisterPageActions;

export const RegisterPageState = createStore<RegisterPage>((set) => ({
  userType: undefined,
  asyncStates: {
    registerUserAsyncState: AsyncState.IDLE,
  },
  setUserType: (userType) => set({ userType }),
  registerUser: async (user) => {
    set({ asyncStates: { registerUserAsyncState: AsyncState.PENDING } });

    const registeredUser = await registerUserService(user);

    if (!registeredUser.success) {
      set({ asyncStates: { registerUserAsyncState: AsyncState.ERROR } });
      return Promise.reject(registeredUser);
    }

    set({ asyncStates: { registerUserAsyncState: AsyncState.SUCCESS } });
  },
}));

export const useRegisterPageState = () => useStore(RegisterPageState);
