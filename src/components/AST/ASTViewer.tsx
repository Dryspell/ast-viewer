import { Component, createSignal, onMount, Show } from 'solid-js';
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

interface NodeDetails {
  type: string;
  range: [number, number];
  details: Record<string, unknown>;
}

const DEFAULT_CODE = `// Enter your TypeScript code here
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}`;

const ASTViewer: Component = () => {
  const [ast, setAst] = createSignal<ASTNode | null>(null);
  const [code, setCode] = createSignal<string>(DEFAULT_CODE);
  const [error, setError] = createSignal<string | null>(null);
  const [editor, setEditor] = createSignal<any>(null);
  const [selectedNode, setSelectedNode] = createSignal<NodeDetails | null>(null);
  const [isLoading, setIsLoading] = createSignal(false);

  onMount(async () => {
    await loader.init();
    const monaco = await loader.init();
    
    // Configure TypeScript settings
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
    });
    
    // Add basic TypeScript definitions
    monaco.languages.typescript.typescriptDefaults.addExtraLib(`
      interface Window {
        [key: string]: any;
      }
      declare var window: Window;
    `);

    const editorInstance = monaco.editor.create(document.getElementById('editor')!, {
      value: code(),
      language: 'typescript',
      theme: 'vs-dark',
      automaticLayout: true,
      minimap: { enabled: true },
      scrollBeyondLastLine: false,
      fontSize: 14,
      lineNumbers: 'on',
      renderWhitespace: 'selection',
      formatOnPaste: true,
      formatOnType: true,
      tabSize: 2,
      wordWrap: 'on',
      suggest: {
        showMethods: true,
        showFunctions: true,
        showConstructors: true,
        showFields: true,
        showVariables: true,
        showClasses: true,
        showStructs: true,
        showInterfaces: true,
        showModules: true,
      },
    });

    let debounceTimer: number;
    editorInstance.onDidChangeModelContent(() => {
      const newCode = editorInstance.getValue();
      setCode(newCode);
      
      // Debounce the parsing to avoid excessive updates
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => parseCode(newCode), 500) as unknown as number;
    });

    setEditor(editorInstance);
    parseCode(DEFAULT_CODE);
  });

  const parseCode = async (input: string) => {
    setIsLoading(true);
    try {
      setError(null);
      const ast = parse(input, {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        },
        tokens: true,
        comment: true,
      });
      setAst(ast);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse code');
      setAst(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNodeSelect = (nodeData: any) => {
    const details: NodeDetails = {
      type: nodeData.label,
      range: nodeData.details.range || [-1, -1],
      details: nodeData.details,
    };
    setSelectedNode(details);

    // Highlight the code range in the editor
    if (details.range[0] >= 0 && details.range[1] >= 0) {
      const editorInstance = editor();
      if (editorInstance) {
        const start = editorInstance.getModel().getPositionAt(details.range[0]);
        const end = editorInstance.getModel().getPositionAt(details.range[1]);
        editorInstance.setSelection({
          startLineNumber: start.lineNumber,
          startColumn: start.column,
          endLineNumber: end.lineNumber,
          endColumn: end.column,
        });
        editorInstance.revealPositionInCenter(start);
      }
    }
  };

  return (
    <div class={styles.container}>
      <div class={styles.editor}>
        <div id="editor" class={styles.monacoEditor} />
      </div>
      <div class={styles.viewer}>
        <Show when={isLoading()}>
          <div class={styles.loading}>Parsing code...</div>
        </Show>
        <Show when={error()}>
          <div class={styles.error}>
            <h3>Parse Error</h3>
            <pre>{error()}</pre>
          </div>
        </Show>
        <Show when={ast() && !error() && !isLoading()}>
          <ASTFlow ast={ast()!} onNodeSelect={handleNodeSelect} />
        </Show>
        <Show when={!ast() && !error() && !isLoading()}>
          <div class={styles.placeholder}>
            Enter TypeScript code to see the AST visualization
          </div>
        </Show>
      </div>
      <Show when={selectedNode()}>
        <div class={styles.nodeDetails}>
          <h3>Selected Node: {selectedNode()?.type}</h3>
          <div class={styles.nodeProperties}>
            {Object.entries(selectedNode()?.details || {}).map(([key, value]) => (
              <div class={styles.property}>
                <strong>{key}:</strong>{" "}
                <span>{typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}</span>
              </div>
            ))}
          </div>
        </div>
      </Show>
    </div>
  );
};

export default ASTViewer; 