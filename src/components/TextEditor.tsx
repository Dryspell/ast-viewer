import { Component } from "solid-js";
import { MonacoEditor } from "solid-monaco";
import "../monaco.worker";

interface TextEditorProps {
	value?: string;
	onChange?: (value: string) => void;
}

const TextEditor: Component<TextEditorProps> = (props) => {
	let editor: any;

	const handleEditorDidMount = (monaco: any, ed: any) => {
		editor = ed;
		monaco.editor.setTheme("vs-dark");
		monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
			noSemanticValidation: false,
			noSyntaxValidation: false,
		});
	};

	return (
		<div style={{ padding: "20px" }}>
			<h3>Code Editor</h3>
			<div style={{
				height: "400px",
				border: "1px solid #ccc",
				"border-radius": "4px",
				overflow: "hidden",
			}}>
				<MonacoEditor
					language="typescript"
					theme="vs-dark"
					value={props.value}
					onChange={props.onChange}
					onMount={handleEditorDidMount}
					options={{
						minimap: { enabled: true },
						fontSize: 14,
						lineNumbers: "on",
						roundedSelection: false,
						scrollBeyondLastLine: false,
						readOnly: false,
						automaticLayout: true,
						scrollbar: {
							useShadows: false,
							verticalScrollbarSize: 10,
							horizontalScrollbarSize: 10,
						},
						overviewRulerLanes: 0,
						hideCursorInOverviewRuler: true,
						renderLineHighlight: "line",
						lineHeight: 21,
						padding: { top: 8, bottom: 8 },
					}}
				/>
			</div>
		</div>
	);
};

export default TextEditor;
