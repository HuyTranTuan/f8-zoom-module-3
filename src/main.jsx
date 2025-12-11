import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import App from "@/App.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { store, persistor } from "./store/stores.js";
import "@/index.css";
import i18n from "@/i18n/i18n.js";
import { ThemeProvider } from "./components/ThemeProvider/ThemeProvider.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <ErrorBoundary>
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={<div>Loading...</div>}>
          <ThemeProvider />
          <App />
        </Suspense>
      </PersistGate>
    </ReduxProvider>
  </ErrorBoundary>,
  // </StrictMode>,
);
