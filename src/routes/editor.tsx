import { Component, lazy } from "solid-js";
import { clientOnly } from "@solidjs/start";

const TextEditor = clientOnly(() => import("../components/TextEditor"));

const EditorRoute: Component = () => {
  return (
    <div style={{
      "min-height": "100vh",
      "background-color": "#f9fafb",
      "padding": "2rem"
    }}>
      <h2 style={{
        "font-size": "2rem",
        "font-weight": "bold",
        "margin-bottom": "2rem",
        "color": "#111827"
      }}>
        Text Editor Demo
      </h2>
      <TextEditor />
    </div>
  );
};

export default EditorRoute; 