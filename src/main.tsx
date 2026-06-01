import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import "./index.css";
import { App } from "./App.tsx";
import { Provider } from "./provider/Provider.tsx";

const AppRouter = import.meta.env.PROD ? HashRouter : BrowserRouter;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <AppRouter>
        <App />
      </AppRouter>
    </Provider>
  </StrictMode>,
);
