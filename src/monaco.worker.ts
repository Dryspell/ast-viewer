import * as monaco from 'monaco-editor';

// Define the worker URLs
const workerLoaders = {
  editorWorkerUrl: new URL('monaco-editor/esm/vs/editor/editor.worker.js', import.meta.url).href,
  tsWorkerUrl: new URL('monaco-editor/esm/vs/language/typescript/ts.worker.js', import.meta.url).href,
};

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'typescript' || label === 'javascript') {
      return new Worker(workerLoaders.tsWorkerUrl, {
        type: 'module',
        name: 'ts-worker'
      });
    }
    return new Worker(workerLoaders.editorWorkerUrl, {
      type: 'module',
      name: 'editor-worker'
    });
  }
}; 