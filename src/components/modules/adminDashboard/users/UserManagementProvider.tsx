"use client";

import { useTransition, ReactNode, createContext, useContext } from "react";

const TransitionContext = createContext<{
  isPending: boolean;
  startTransition: (callback: () => void) => void;
}>({
  isPending: false,
  startTransition: () => {},
});

export const useAppTransition = () => useContext(TransitionContext);

export const UserManagementProvider = ({ children }: { children: ReactNode }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <TransitionContext.Provider value={{ isPending, startTransition }}>
      {children}
    </TransitionContext.Provider>
  );
};
