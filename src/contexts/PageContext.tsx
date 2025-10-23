"use client";
import { createContext, useContext, ReactNode } from "react";

interface PageContextType {
  bnbPrice: number;
  setBnbPrice: (value: number) => void;
}

export const PageContext = createContext<PageContextType | undefined>(
  undefined
);

export function useData() {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("useData must be used within a ModalProvider");
  }
  return context;
}

interface PageProviderProps {
  children: ReactNode;
}

export function PageProvider({ children }: PageProviderProps) {

  const pageContextValue: PageContextType = {
    bnbPrice: 101,
    setBnbPrice: (value: number) => { },
  };
  return (
    <PageContext.Provider value={pageContextValue}>
      {children}
    </PageContext.Provider>
  );
}
