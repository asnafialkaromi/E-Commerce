import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import Providers from "./app/providers.tsx";
import "./index.css";
import App from "./App.tsx";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import AppInitializer from "./app/AppInitializer.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <BrowserRouter>
        <Provider store={store}>
          <AppInitializer />
          <App />
        </Provider>
      </BrowserRouter>
    </Providers>
  </StrictMode>
);
