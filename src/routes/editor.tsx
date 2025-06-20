import { Component, Suspense } from "solid-js";
import { clientOnly } from "@solidjs/start";
import LoadingSpinner from "../components/ui/LoadingSpinner";

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
      <Suspense fallback={
        <div class="min-h-[400px] flex items-center justify-center bg-[#1e1e1e] rounded-lg">
          <LoadingSpinner size="lg" class="text-white/60" />
        </div>
      }>
        <TextEditor />
      </Suspense>
    </div>
  );
};

export default EditorRoute; 