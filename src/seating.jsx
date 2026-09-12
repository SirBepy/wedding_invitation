import React from "react";
import ReactDOM from "react-dom/client";
import SeatingPage from "./pages/Seating/SeatingPage";
import "./styles/main.scss";

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <SeatingPage />
  </React.StrictMode>,
);
