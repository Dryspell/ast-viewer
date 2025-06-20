import { Component, createSignal, Show } from "solid-js";
import { parse } from "@typescript-eslint/typescript-estree";
import ASTFlow from "./ASTFlow";
import { clientOnly } from "@solidjs/start";
import Tabs from "../ui/Tabs";
import CollapsiblePanel from "../ui/CollapsiblePanel";
import LogViewer, { type Log } from "./LogViewer";
import LoadingSpinner from "../ui/LoadingSpinner";
import { showToast } from "~/components/ui/toast";

// TODO: Add support for different parsers (Flow, Babel, etc.)
const MonacoEditorClient = clientOnly(() => import("../TextEditor"));

interface ASTNode {
	type: string;
	range: [number, number];
	loc: {
		start: { line: number; column: number };
		end: { line: number; column: number };
	};
	[key: string]: any;
}

interface FileTab {
	id: string;
	title: string;
	content: string;
	active: boolean;
}

const DEFAULT_CODE = `// Enter your TypeScript code here
function greet(name: string): string {
	return \`Hello, \${name}!\`;
}`;

const ASTViewer: Component = () => {
	// TODO: Add file persistence and recent files list
	const [files, setFiles] = createSignal<FileTab[]>([
		{ id: "1", title: "example.ts", content: DEFAULT_CODE, active: true }
	]);
	const [ast, setAst] = createSignal<ASTNode | null>(null);
	const [logs, setLogs] = createSignal<Log[]>([]);

	// TODO: Add log filtering and search functionality
	const addLog = (log: Omit<Log, "timestamp">) => {
		setLogs(prev => [...prev, { ...log, timestamp: new Date() }]);
	};

	// TODO: Add support for different parser configurations
	const parseCode = (input: string) => {
		try {
			addLog({
				type: "info",
				message: "Starting parse of code",
				details: {
					options: {
						range: true,
						loc: true,
						tokens: true,
						comment: true,
						jsx: true,
					}
				}
			});
			
			const newAst = parse(input, {
				range: true,
				loc: true,
				tokens: true,
				comment: true,
				jsx: true,
			});
			
			addLog({
				type: "success",
				message: "Parse successful",
				details: {
					rootType: newAst.type,
					bodyLength: newAst.body?.length
				}
			});

			showToast({
				title: "Parse successful",
				description: `AST generated with ${newAst.body?.length || 0} nodes`,
				variant: "success",
			});
			
			setAst(newAst);
		} catch (error: unknown) {
			const err = error as Error;
			addLog({
				type: "error",
				message: "Parse failed",
				details: {
					name: err.name,
					message: err.message,
					stack: err.stack
				}
			});

			showToast({
				title: "Parse failed",
				description: err.message,
				variant: "destructive",
			});

			setAst(null);
		}
	};

	// TODO: Add autosave functionality
	const handleEditorChange = (value: string) => {
		const activeFile = files().find(f => f.active);
		if (activeFile) {
			setFiles(prev => prev.map(f => 
				f.id === activeFile.id ? { ...f, content: value } : f
			));
			parseCode(value);
		}
	};

	// TODO: Add file import/export functionality
	const handleTabChange = (tabId: string) => {
		setFiles(prev => prev.map(f => ({
			...f,
			active: f.id === tabId
		})));
		const newActiveFile = files().find(f => f.id === tabId);
		if (newActiveFile) {
			parseCode(newActiveFile.content);
		}
	};

	// Parse initial code
	parseCode(DEFAULT_CODE);

	return (
		<div class="h-screen bg-[#1e1e1e] relative overflow-hidden">
			{/* TODO: Add file management buttons (new, open, save) */}
			<div class="h-12 bg-[#2d2d2d] border-b border-gray-700">
				<Tabs
					initialTabs={files()}
					onTabChange={handleTabChange}
				/>
			</div>

			{/* Main Content */}
			<div class="h-[calc(100vh-48px)] relative">
				{/* TODO: Add log level filtering and search */}
				<CollapsiblePanel
					title="Logs"
					side="left"
					defaultWidth={400}
					defaultCollapsed={true}
				>
					<LogViewer logs={logs()} />
				</CollapsiblePanel>

				{/* TODO: Add editor settings panel */}
				<CollapsiblePanel
					title="Code Editor"
					side="right"
					defaultWidth={500}
					defaultCollapsed={false}
				>
					<MonacoEditorClient
						value={files().find(f => f.active)?.content}
						onChange={handleEditorChange}
						fallback={
							<div class="h-full flex items-center justify-center bg-[#1e1e1e]">
								<LoadingSpinner size="lg" class="text-white/60" />
							</div>
						}
					/>
				</CollapsiblePanel>

				{/* TODO: Add AST visualization controls (zoom, pan, layout) */}
				<div class="h-full w-full bg-[#1e1e1e] overflow-hidden">
					<Show when={ast()} fallback={
						<div class="flex items-center justify-center h-full text-white">
							<LoadingSpinner size="md" class="text-white/60" />
						</div>
					}>
						<ASTFlow ast={ast()!} onNodeSelect={() => {}} />
					</Show>
				</div>
			</div>
		</div>
	);
};

export default ASTViewer;
