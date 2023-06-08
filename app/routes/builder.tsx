import type { LinksFunction } from "@remix-run/node";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { CheckCircle, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import type { Node } from "reactflow";
import { useReactFlow } from "reactflow";
import { useOnSelectionChange } from "reactflow";
import { useNodeId } from "reactflow";
import { ReactFlowProvider } from "reactflow";
import { MiniMap } from "reactflow";
import { Panel } from "reactflow";
import { Handle, Position } from "reactflow";
import ReactFlow, { Background, Controls } from "reactflow";
import styles from "reactflow/dist/style.css";
import {
  calculateAutoLayout,
  collapseNode,
  expandNode,
  focusNode,
} from "~/utils/graph";
import type { RFState } from "~/utils/graphStore";
import useGraphStore from "~/utils/graphStore";
import { shallow } from "zustand/shallow";
import { Textarea } from "components/ui/textarea";
import ToggleButton from "components/ui/togglebutton";
import { Switch } from "components/ui/switch";
import { cn } from "lib/utils";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

const nodeTypes = { agent: AgentNode, state: StateNode };

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
});

function BuilderPage() {
  const {
    nodes,
    edges,
    onConnect,
    onEdgesChange,
    onNodesChange,
    setEdges,
    setNodes,
  } = useGraphStore(selector, shallow);

  function addStateNode() {
    console.log({ oldNodes: nodes });
    const { nodes: newNodes, edges: newEdges } = calculateAutoLayout({
      nodes: nodes,
    });
    console.log({ edges });
    setNodes(newNodes);
    setEdges(newEdges);
  }

  return (
    <div style={{ height: "100vh" }}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          nodeTypes={nodeTypes}
          onConnect={onConnect}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          minZoom={0.3}
          onNodeDoubleClick={(_e, node) => {
            if (!node?.data?.collapsed) {
              const { nodes: newNodes, edges: newEdges } = collapseNode(
                node,
                nodes,
                edges
              );
              setNodes(newNodes);
              setEdges(newEdges);
            } else {
              const { nodes: newNodes, edges: newEdges } = expandNode(
                node,
                nodes,
                edges
              );
              setNodes(newNodes);
              setEdges(newEdges);
            }
          }}
        >
          <Background />
          <Controls />
          <NodePanel />
          <MiniMap pannable zoomable position="top-left"></MiniMap>
          <Panel position="top-right">
            <AddStateButton addStateNode={addStateNode} />
          </Panel>
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}

function AgentNode() {
  const nodeId = useNodeId();
  return (
    <div className="bg-gray-100 w-40 px-2 py-1 rounded-sm border shadow-sm">
      <div className="uppercase text-sm text-center">Agent</div>
      <div className="lowercase text-xs text-center text-gray-500">
        {nodeId}
      </div>
      <Handle type="source" position={Position.Bottom} id="bottom" />
    </div>
  );
}

function StateNode() {
  const nodeId = useNodeId();
  const getNodeById = useGraphStore((state) => state.getNodeById);
  const selectedNode = useGraphStore((state) => state.selectedNode);
  const node = getNodeById(nodeId || "");

  return (
    <div
      className={cn(
        "bg-gray-100 w-40 px-2 py-1 rounded-sm border shadow-sm",
        node?.data?.collapsed && "bg-yellow-100 border-primary",
        selectedNode?.id == nodeId && "ring-primary ring-2"
      )}
    >
      <div className="uppercase text-sm text-center">{node?.data.type}</div>
      <div className="lowercase text-xs text-center text-gray-500 truncate">
        {node?.data.name}
      </div>
      {node?.data?.text && (
        <div className="lowercase text-xs mt-4 text-center truncate">
          {node?.data.text}
        </div>
      )}
      <Handle type="source" position={Position.Bottom} id="bottom" />
      <Handle type="target" position={Position.Top} id="top" />
    </div>
  );
}

function AddStateButton({ addStateNode }: { addStateNode: () => void }) {
  return (
    <Button className="w-40" onClick={addStateNode}>
      <PlusCircle className="w-4 h-4 mr-2"></PlusCircle>
      Add State
    </Button>
  );
}

function NodePanel() {
  const { updateNodeData, selectedNode, setSelectedNode } = useGraphStore(
    (state) => ({
      updateNodeData: state.updateNodeData,
      setSelectedNode: state.setSelectedNode,
      selectedNode: state.selectedNode,
    }),
    shallow
  );
  const { setNodes, nodes, edges, setEdges } = useGraphStore(selector, shallow);
  const { fitView } = useReactFlow();

  useOnSelectionChange({
    onChange: ({ nodes }) => {
      if (nodes.length == 0) setSelectedNode(null);
      if (nodes.length == 1) {
        const node = nodes[0];
        setSelectedNode(node);
      }
    },
  });
  if (!selectedNode) return null;

  return (
    <Panel
      position="bottom-right"
      className="w-72 bg-gray-50 border rounded-sm min-h-[50%] py-4 px-4 flex flex-col justify-between"
      key={selectedNode.id}
    >
      <div className="flex-flex-col-space-y-4">
        <div>
          <Label htmlFor="text">Name</Label>
          <Input
            id="text"
            name="text"
            defaultValue={selectedNode.data.name}
            onChange={(e) =>
              updateNodeData(selectedNode?.id, {
                name: e.target.value?.replaceAll(" ", "_")?.toLowerCase(),
              })
            }
            placeholder="Enter name"
            className="nodrag"
          />
        </div>

        {selectedNode?.data?.text && (
          <div>
            <Label htmlFor="text">Text</Label>
            <Textarea
              id="text"
              name="text"
              defaultValue={selectedNode.data.text}
              onChange={(e) =>
                updateNodeData(selectedNode?.id, {
                  text: e.target.value,
                })
              }
              placeholder="Enter name"
              className="nodrag"
            />
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" />
          <Label htmlFor="airplane-mode">Published</Label>
        </div>

        <div>
          <Button
            className="w-14"
            size="sm"
            onClick={() => {
              // fitView({ nodes: [selectedNode], duration: 1000, maxZoom: 1 });
              const { nodes: newNodes, edges: newEdges } = focusNode(
                selectedNode,
                nodes,
                edges
              );

              fitView({
                nodes: newNodes.filter((n) => !n.hidden),
                duration: 1000,
                maxZoom: 1,
              });

              setNodes(newNodes);
              setEdges(newEdges);

              console.log({ newNodes });
            }}
          >
            Focus
          </Button>
        </div>
      </div>
    </Panel>
  );
}

export default BuilderPage;
