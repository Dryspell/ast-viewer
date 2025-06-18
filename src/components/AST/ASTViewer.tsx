import { Component, createSignal, Show } from "solid-js";
import { parse } from "@typescript-eslint/typescript-estree";
import ASTFlow from "./ASTFlow";

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
			"grid-template-columns": "1fr 1fr",
			gap: "1rem",
			padding: "1rem",
			height: "100vh",
			"background-color": "#1e1e1e",
		}}>
			<div style={{
				padding: "1rem",
				"background-color": "#2d2d2d",
				"border-radius": "4px",
			}}>
				<textarea
					value={code()}
					onInput={(e) => {
						const target = e.target as HTMLTextAreaElement;
						console.log("onInput event fired");
						console.log("New value:", target.value);
						console.log("Previous value:", code());
						setCode(target.value);
						parseCode(target.value);
					}}
					onChange={(e) => {
						const target = e.target as HTMLTextAreaElement;
						console.log("onChange event fired");
						console.log("New value:", target.value);
						console.log("Previous value:", code());
						setCode(target.value);
						parseCode(target.value);
					}}
					style={{
						width: "100%",
						height: "100%",
						"background-color": "transparent",
						color: "white",
						border: "none",
						outline: "none",
						"font-family": "monospace",
						"font-size": "14px",
						resize: "none",
						padding: "1rem",
						"min-height": "300px",
					}}
					spellcheck={false}
				/>
			</div>
			<div style={{
				padding: "1rem",
				"background-color": "#2d2d2d",
				"border-radius": "4px",
			}}>
				<Show when={ast()} fallback={<div>No AST available</div>}>
					<ASTFlow ast={ast()!} onNodeSelect={() => {}} />
				</Show>
			</div>
		</div>
	);
};

export default ASTViewer;
