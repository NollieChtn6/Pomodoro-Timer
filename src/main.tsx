import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// https://www.codingdeft.com/posts/react-18-typescript-error/
const rootElement = document.getElementById("root");

const root = createRoot(rootElement as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
