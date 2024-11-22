"use client";

import { useState, useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  NodeChange,
  EdgeChange,
  Connection,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Plus, Play, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AddNodeDialog from './add-node-dialog';
import CustomNode from './custom-node';
import NodeConfigDialog from './node-config-dialog';
import { toast } from './ui/use-toast';

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'custom',
    data: { 
      label: 'Custom Webhook',
      config: {},
      type: 'trigger'
    },
    position: { x: 250, y: 25 },
  },
];

export default function WorkflowBuilder() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [isAddNodeOpen, setIsAddNodeOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    []
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    []
  );

  const handleAddNode = (nodeType: string, category: string) => {
    const newNode: Node = {
      id: (nodes.length + 1).toString(),
      type: 'custom',
      data: { 
        label: nodeType,
        config: {},
        type: (category || '').toLowerCase(),
      },
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
    };

    setNodes((nds) => [...nds, newNode]);
    setIsAddNodeOpen(false);
  };

  const handleNodeClick = (event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setIsConfigOpen(true);
  };

  const handleConfigSave = (nodeId: string, config: any) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, config } }
          : node
      )
    );
    setIsConfigOpen(false);
  };

  const handleDeleteNode = (nodeId: string) => {
    // Remove all edges connected to this node
    setEdges((eds) => eds.filter(
      (edge) => edge.source !== nodeId && edge.target !== nodeId
    ));
    
    // Remove the node
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    
    // Close the config dialog if the deleted node was selected
    if (selectedNode?.id === nodeId) {
      setIsConfigOpen(false);
      setSelectedNode(null);
    }

    toast({
      title: "Node Deleted",
      description: "The node and its connections have been removed",
    });
  };

  const executeWorkflow = async () => {
    try {
      // Sort nodes by their connections to determine execution order
      const sortedNodes = [...nodes].sort((a, b) => {
        const aIncoming = edges.filter(e => e.target === a.id).length;
        const bIncoming = edges.filter(e => e.target === b.id).length;
        return aIncoming - bIncoming;
      });

      for (const node of sortedNodes) {
        // Simulate node execution
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast({
          title: `Executing ${node.data.label}`,
          description: `Processing node configuration: ${JSON.stringify(node.data.config)}`,
        });
      }

      toast({
        title: "Workflow Completed",
        description: "All nodes executed successfully",
      });
    } catch (error) {
      toast({
        title: "Execution Error",
        description: "Failed to execute workflow",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex-1 flex">
      <div className="w-64 border-r p-4">
        <div className="space-y-4">
          <Button
            className="w-full"
            onClick={() => setIsAddNodeOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Node
          </Button>
          <Button
            className="w-full"
            variant="secondary"
            onClick={executeWorkflow}
          >
            <Play className="mr-2 h-4 w-4" />
            Execute Workflow
          </Button>
        </div>
      </div>
      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={handleNodeClick}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
      <AddNodeDialog
        open={isAddNodeOpen}
        onOpenChange={setIsAddNodeOpen}
        onAddNode={handleAddNode}
      />
      {selectedNode && (
        <NodeConfigDialog
          open={isConfigOpen}
          onOpenChange={setIsConfigOpen}
          node={selectedNode}
          onSave={handleConfigSave}
          onDelete={handleDeleteNode}
        />
      )}
    </div>
  );
}