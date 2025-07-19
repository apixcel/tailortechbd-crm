"use client";

import { persistor, store } from "@/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";

const ClientProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <Toaster position="top-center" richColors />
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ClientProviders;
