import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  vite: {
    optimizeDeps: {
      exclude: [
        'solid-monaco',
        '@typescript-eslint/typescript-estree',
        'monaco-editor',
        'monaco-editor/esm/vs/editor/editor.worker',
        'monaco-editor/esm/vs/language/typescript/ts.worker'
      ]
    },
    build: {
      target: 'esnext'
    }
  }
});
