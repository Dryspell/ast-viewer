import { Component, createSignal, onMount } from 'solid-js';
import { parse } from '@typescript-eslint/parser';
import { AST_NODE_TYPES } from '@typescript-eslint/typescript-estree';
import loader from '@monaco-editor/loader';
import ASTFlow from './ASTFlow';
import styles from './ASTViewer.module.css';

interface ASTNode {
  type: string;
  range: [number, number];
  loc: {
    start: { line: number; column: number };
    end: { line: number; column: number };
  };
  [key: string]: any;
}

const ASTViewer: Component = () => {
  const [ast, setAst] = createSignal<ASTNode | null>(null);
  const [code, setCode] = createSignal<string>('');
  const [error, setError] = createSignal<string | null>(null);
  const [editor, setEditor] = createSignal<any>(null);

  onMount(async () => {
    await loader.init();
    const monaco = await loader.init();
    const editorInstance = monaco.editor.create(document.getElementById('editor')!, {
      value: code(),
      language: 'typescript',
      theme: 'vs-dark',
      automaticLayout: true,
      minimap: { enabled: true },
      scrollBeyondLastLine: false,
    });

    editorInstance.onDidChangeModelContent(() => {
      const newCode = editorInstance.getValue();
      setCode(newCode);
      parseCode(newCode);
    });

    setEditor(editorInstance);
  });

  const parseCode = (input: string) => {
    try {
      setError(null);
      const ast = parse(input, {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      });
      setAst(ast);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse code');
    }
  };

  return (
    <div class={styles.container}>
      <div class={styles.editor}>
        <div id="editor" class={styles.monacoEditor} />
      </div>
      <div class={styles.viewer}>
        {error() ? (
          <div class={styles.error}>{error()}</div>
        ) : ast() ? (
          <ASTFlow ast={ast()!} />
        ) : (
          <div class={styles.placeholder}>
            Enter TypeScript code to see the AST visualization
          </div>
        )}
      </div>
    </div>
  );
};

export default ASTViewer; 