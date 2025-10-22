import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import App from "@/App.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      {/* <ReduxProvider store={store}> */}
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
      {/* </PersistGate> */}
      {/* </ReduxProvider> */}
    </ErrorBoundary>
  </StrictMode>,
);
