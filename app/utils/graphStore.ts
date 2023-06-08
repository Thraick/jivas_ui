import { create } from "zustand";
import type {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
} from "reactflow";
import { addEdge, applyNodeChanges, applyEdgeChanges } from "reactflow";
import { calculateAutoLayout, createNodes } from "./graph";
import { agent } from "./agent";

const { nodes: initialNodes, edges: initialEdges } = calculateAutoLayout({
  nodes: createNodes(agent),
});

export type RFState = {
  nodes: Node[];
  edges: Edge[];
  selectedNode: Node | null;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  updateNodeData: (nodeId: string, data: Record<any, any>) => void;
  getNodeById: (nodeId: string) => Node | undefined;
  setSelectedNode: (node: Node | null) => void;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useGraphStore = create<RFState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  selectedNode: null,
  setNodes: (nodes: Node[]) => {
    set({
      nodes,
    });
  },
  setEdges: (edges: Edge[]) => {
    set({
      edges,
    });
  },
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  updateNodeData: (nodeId: string, data: Record<any, any>) => {
    const { nodes } = get();
    const node = nodes.find((node) => node.id === nodeId);
    if (!node) return;

    node.data = { ...node.data, ...data };

    set({
      nodes: [...nodes],
    });
  },
  getNodeById: (nodeId: string) => {
    const { nodes } = get();
    return nodes.find((node) => node.id === nodeId);
  },
  setSelectedNode: (node: Node | null) => {
    set({
      selectedNode: node,
    });
  },
}));

export default useGraphStore;
