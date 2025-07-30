"use client";

import { persistor, store } from "@/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import AuthProvider from "./AuthProvider";
import ProtectedRoute from "./ProtectedRoute";

const ClientProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <Toaster position="top-center" richColors />
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <ProtectedRoute role="admin">{children}</ProtectedRoute>
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
};

export default ClientProviders;
