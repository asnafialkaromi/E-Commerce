import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.tsx";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import AppInitializer from "./app/AppInitializer.tsx";
import Providers from "./app/providers.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Providers>
        <BrowserRouter>
          <AppInitializer />
          <App />
        </BrowserRouter>
      </Providers>
    </Provider>
  </StrictMode>
);
