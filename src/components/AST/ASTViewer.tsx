import { Component, createSignal, Show } from "solid-js";
import { parse } from "@typescript-eslint/typescript-estree";
import ASTFlow from "./ASTFlow";
import { Node } from "@tiptap/core";
import { SolidEditorContent, useEditor } from "@vrite/tiptap-solid";

// Create the required doc node
const CustomDoc = Node.create({
	name: 'doc',
	topNode: true,
	content: 'paragraph+',
});

// Create the required text node
const CustomText = Node.create({
	name: 'text',
	group: 'inline',
});

// Create a basic paragraph node
const CustomParagraph = Node.create({
	name: 'paragraph',
	group: 'block',
	content: 'text*',
	parseHTML() {
		return [{ tag: 'p' }];
	},
	renderHTML({ HTMLAttributes }) {
		return ['p', HTMLAttributes, 0];
	},
});

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
	const [code, setCode] = createSignal(DEFAULT_CODE);
	const [ast, setAst] = createSignal<ASTNode | null>(null);

	const editor = useEditor({
		extensions: [
			CustomDoc,
			CustomText,
			CustomParagraph,
		],
		content: DEFAULT_CODE,
		editable: true,
		onUpdate: ({ editor }) => {
			const newCode = editor.getText();
			console.log("Editor content updated:", newCode);
			setCode(newCode);
			parseCode(newCode);
		}
	});

	const parseCode = (input: string) => {
		try {
			console.log("Starting parse of code:", input);
			console.log("Parser options:", {
				range: true,
				loc: true,
				tokens: true,
				comment: true,
				jsx: true,
			});
			
			const newAst = parse(input, {
				range: true,
				loc: true,
				tokens: true,
				comment: true,
				jsx: true,
			});
			
			console.log("Parse successful!");
			console.log("AST root type:", newAst.type);
			console.log("AST body length:", newAst.body?.length);
			console.log("Full AST:", JSON.stringify(newAst, null, 2));
			
			setAst(newAst);
		} catch (error: unknown) {
			const err = error as Error;
			console.error("Parse error details:", {
				name: err.name,
				message: err.message,
				stack: err.stack
			});
			setAst(null);
		}
	};

	// Parse initial code
	parseCode(DEFAULT_CODE);

	return (
		<div style={{
			display: "grid",
			"grid-template-columns": "1fr 1fr 1fr",
			gap: "1rem",
			padding: "1rem",
			height: "100vh",
			"background-color": "#1e1e1e",
		}}>
			{/* Rich Text Editor */}
			<div style={{
				padding: "1rem",
				"background-color": "#2d2d2d",
				"border-radius": "4px",
			}}>
				<h3 style={{ color: "white", "margin-bottom": "1rem" }}>Rich Text Editor</h3>
				<Show when={editor()} fallback={<div style={{ color: "white" }}>Loading editor...</div>}>
					<div style={{
						"background-color": "#1e1e1e",
						"border-radius": "4px",
						padding: "1rem",
						height: "calc(100% - 4rem)",
					}}>
						<SolidEditorContent editor={editor()!} />
					</div>
				</Show>
			</div>

			{/* Raw Code View */}
			<div style={{
				padding: "1rem",
				"background-color": "#2d2d2d",
				"border-radius": "4px",
			}}>
				<h3 style={{ color: "white", "margin-bottom": "1rem" }}>Raw Code</h3>
				<textarea
					value={code()}
					onInput={(e) => {
						const target = e.target as HTMLTextAreaElement;
						setCode(target.value);
						parseCode(target.value);
						editor()?.commands.setContent(target.value);
					}}
					style={{
						width: "100%",
						height: "calc(100% - 4rem)",
						"background-color": "#1e1e1e",
						color: "white",
						border: "none",
						outline: "none",
						"font-family": "monospace",
						"font-size": "14px",
						resize: "none",
						padding: "1rem",
						"border-radius": "4px",
					}}
					spellcheck={false}
				/>
			</div>

			{/* AST View */}
			<div style={{
				padding: "1rem",
				"background-color": "#2d2d2d",
				"border-radius": "4px",
			}}>
				<h3 style={{ color: "white", "margin-bottom": "1rem" }}>AST Visualization</h3>
				<div style={{
					height: "calc(100% - 4rem)",
					"background-color": "#1e1e1e",
					"border-radius": "4px",
					overflow: "auto",
				}}>
					<Show when={ast()} fallback={<div style={{ color: "white", padding: "1rem" }}>No AST available</div>}>
						<ASTFlow ast={ast()!} onNodeSelect={() => {}} />
					</Show>
				</div>
			</div>
		</div>
	);
};

export default ASTViewer;
