import React, { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";
import * as serviceWorker from "./utils/serviceWorker";

const PlainPortfolio = lazy(
  () => import("./components/PlainPortfolio/PlainPortfolio")
);

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/window/:windowId" element={<App />} />
        <Route path="/window/:windowId/:slug" element={<App />} />
        <Route
          path="/plain"
          element={
            <Suspense fallback={null}>
              <PlainPortfolio />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  </React.StrictMode>
);

serviceWorker.register({
  onSuccess: () => {
    console.log("PWA: Content cached successfully for offline use");
  },
  onUpdate: registration => {
    console.log("PWA: New content available, please refresh");
    if (confirm("New version available! Refresh to update?")) {
      if (registration.waiting) {
        registration.waiting.postMessage({ type: "SKIP_WAITING" });
        window.location.reload();
      }
    }
  },
});

serviceWorker.initializePWAPrompt();
serviceWorker.initializeNetworkStatus();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
