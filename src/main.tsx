import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { ThemeProvider } from "./utils/ThemeProvider.tsx";
import GlobalModal from "./components/modal/GlobalModal.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
        <GlobalModal />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
