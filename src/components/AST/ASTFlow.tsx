import { Component, createSignal, onMount } from 'solid-js';
import { SolidFlow, Background, Controls, MiniMap } from '@nobie-org/xyflow';
import type { Node, Edge } from '@nobie-org/xyflow';

interface ASTFlowProps {
  ast: any;
}

const ASTFlow: Component<ASTFlowProps> = (props) => {
  const [nodes, setNodes] = createSignal<Node[]>([]);
  const [edges, setEdges] = createSignal<Edge[]>([]);

  const convertASTToFlow = (ast: any, parentId?: string, index: number = 0) => {
    const nodeId = parentId ? `${parentId}-${index}` : 'root';
    const node: Node = {
      id: nodeId,
      type: 'default',
      position: { x: index * 200, y: index * 100 },
      data: { 
        label: ast.type,
        details: Object.entries(ast)
          .filter(([key]) => !['type', 'range', 'loc'].includes(key))
          .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
      }
    };

    const newNodes = [node];
    const newEdges: Edge[] = [];

    if (parentId) {
      newEdges.push({
        id: `${parentId}-${nodeId}`,
        source: parentId,
        target: nodeId,
        type: 'default'
      });
    }

    Object.entries(ast)
      .filter(([key, value]) => 
        typeof value === 'object' && 
        value !== null && 
        !Array.isArray(value) &&
        'type' in value
      )
      .forEach(([key, value], idx) => {
        const { nodes: childNodes, edges: childEdges } = convertASTToFlow(value, nodeId, idx);
        newNodes.push(...childNodes);
        newEdges.push(...childEdges);
      });

    return { nodes: newNodes, edges: newEdges };
  };

  onMount(() => {
    if (props.ast) {
      const { nodes: newNodes, edges: newEdges } = convertASTToFlow(props.ast);
      setNodes(newNodes);
      setEdges(newEdges);
    }
  });

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <SolidFlow
        nodes={nodes()}
        edges={edges()}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </SolidFlow>
    </div>
  );
};

export default ASTFlow; 