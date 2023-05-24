// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

document.addEventListener("turbo:load", () => {
  const root = createRoot(
    document.body.appendChild(document.createElement("div"))
  );
  root.render(React.createElement(App, null, null));
});