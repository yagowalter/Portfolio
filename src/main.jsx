import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "../web/css/style.css";
import "./react-enhancements.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
