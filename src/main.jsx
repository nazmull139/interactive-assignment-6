import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { store } from "./app/store.js";
import { AuthProvider } from "./contexts/Auth.jsx";
import "./index.css";
import { rootRouter } from "./router/router.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <RouterProvider router={rootRouter} />
      </Provider>
    </AuthProvider>
  </StrictMode>
);
