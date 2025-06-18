import { Component, createSignal, onMount } from "solid-js";
import {
	ReactFlow,
	Controls,
	Background,
	BackgroundVariant,
	MiniMap,
	type NodeTypes,
	type Edge,
	type Node,
	BuiltInNode,
	ReactFlowProvider,
	Panel,
} from "../../lib/xyflow/index";

interface ASTFlowProps {
	ast: any;
	onNodeSelect?: (nodeData: ASTNodeData) => void;
}

interface ASTNodeData extends Record<string, unknown> {
	label: string;
	details: Record<string, unknown>;
	expanded?: boolean;
}

const nodeTypes: NodeTypes = {
	default: (props) => (
		<div
			style={{
				padding: "10px",
				background: "white",
				border: "1px solid #ddd",
				"border-radius": "5px",
				"min-width": "150px",
			}}
		>
			<div style={{ "font-weight": "bold", "margin-bottom": "5px" }}>
				{props.data.label}
			</div>
			{props.data.expanded && (
				<div style={{ "font-size": "12px" }}>
					{Object.entries(props.data.details).map(([key, value]) => (
						<div>
							<strong>{key}:</strong>{" "}
							{typeof value === "object"
								? JSON.stringify(value)
								: String(value)}
						</div>
					))}
				</div>
			)}
		</div>
	),
};

const FlowContent: Component<ASTFlowProps> = (props) => {
	const [nodes, setNodes] = createSignal<Node<ASTNodeData>[]>([]);
	const [edges, setEdges] = createSignal<Edge[]>([]);

	const layoutNodes = (nodes: Node<ASTNodeData>[]): Node<ASTNodeData>[] => {
		const levelMap = new Map<string, number>();
		const getLevel = (nodeId: string): number => {
			if (!levelMap.has(nodeId)) {
				const parentEdge = edges().find((e) => e.target === nodeId);
				levelMap.set(
					nodeId,
					parentEdge ? getLevel(parentEdge.source) + 1 : 0
				);
			}
			return levelMap.get(nodeId)!;
		};

		return nodes.map((node) => {
			const level = getLevel(node.id);
			const nodesAtLevel = nodes.filter(
				(n) => getLevel(n.id) === level
			).length;
			const index = nodes
				.filter((n) => getLevel(n.id) === level)
				.findIndex((n) => n.id === node.id);

			return {
				...node,
				position: {
					x: index * 250,
					y: level * 150,
				},
			};
		});
	};

	const convertASTToFlow = (
		ast: any,
		parentId?: string,
		index: number = 0
	) => {
		const nodeId = parentId ? `${parentId}-${index}` : "root";
		const node: Node<ASTNodeData> = {
			id: nodeId,
			type: "default",
			position: { x: 0, y: 0 },
			data: {
				label: ast.type,
				details: Object.entries(ast)
					.filter(([key]) => !["type", "range", "loc"].includes(key))
					.reduce(
						(acc, [key, value]) => ({ ...acc, [key]: value }),
						{}
					),
				expanded: false,
			},
		};

		const newNodes = [node];
		const newEdges: Edge[] = [];

		if (parentId) {
			newEdges.push({
				id: `${parentId}-${nodeId}`,
				source: parentId,
				target: nodeId,
				type: "default",
				animated: true,
			});
		}

		Object.entries(ast)
			.filter(
				([key, value]) =>
					typeof value === "object" &&
					value !== null &&
					!Array.isArray(value) &&
					"type" in value
			)
			.forEach(([key, value], idx) => {
				const { nodes: childNodes, edges: childEdges } =
					convertASTToFlow(value, nodeId, idx);
				newNodes.push(...childNodes);
				newEdges.push(...childEdges);
			});

		return { nodes: newNodes, edges: newEdges };
	};

	const handleNodeClick = (event: any, node: Node<ASTNodeData>) => {
		const updatedNodes = nodes().map((n) =>
			n.id === node.id
				? { ...n, data: { ...n.data, expanded: !n.data.expanded } }
				: n
		);
		setNodes(layoutNodes(updatedNodes));
		if (props.onNodeSelect) {
			props.onNodeSelect(node.data);
		}
	};

	onMount(() => {
		if (props.ast) {
			const { nodes: newNodes, edges: newEdges } = convertASTToFlow(
				props.ast
			);
			setNodes(layoutNodes(newNodes));
			setEdges(newEdges);
		}
	});

	return (
		<ReactFlow
			nodes={nodes()}
			edges={edges()}
			nodeTypes={nodeTypes}
			onNodeClick={handleNodeClick}
			fitView
			defaultViewport={{ x: 0, y: 0, zoom: 1 }}
		>
			<Background variant={BackgroundVariant.Dots} />
			<Controls />
			<MiniMap />
			<Panel position="top-left">
				<div
					style={{
						background: "white",
						padding: "10px",
						"border-radius": "5px",
						"box-shadow": "0 0 10px rgba(0,0,0,0.1)",
					}}
				>
					<button style={{ margin: "0 5px" }}>Zoom to Fit</button>
				</div>
			</Panel>
		</ReactFlow>
	);
};

const ASTFlow: Component<ASTFlowProps> = (props) => {
	return (
		<div style={{ width: "100%", height: "100%" }}>
			<ReactFlowProvider>
				<FlowContent {...props} />
			</ReactFlowProvider>
		</div>
	);
};

export default ASTFlow;
