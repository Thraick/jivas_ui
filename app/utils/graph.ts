import { stratify, tree } from "d3-hierarchy";
import { nanoid } from "nanoid";
import type { Edge, Node } from "reactflow";
import type { Agent } from "./agent";

type NodeType = {
  name: string;
  data: Record<any, any>;
  type: string;
  parent: string;
};

export function generateTree({ nodes }: { nodes: Node[] }) {
  const oldNodes = nodes.map((node) => {
    const { id, data, type } = node;
    return {
      name: id,
      data: data as Record<any, any>,
      type: type as string,
      parent: data.parent as string,
    };
  });

  // d3 hierarchy
  const data = stratify<NodeType>()
    .id(function (d) {
      return d.name;
    })
    .parentId(function (d) {
      return d.parent;
    })(oldNodes);

  const treeLayout = tree<NodeType>().nodeSize([180, 250]);

  treeLayout(data);
  return data;
}

export function calculateAutoLayout({ nodes }: { nodes: Node[] }): {
  nodes: Node[];
  edges: Edge[];
} {
  const data = generateTree({ nodes });
  console.log({ data, rootChildren: data.descendants() });
  const newNodes = data.descendants().map((node) => {
    const { x, y } = node as typeof node & { x: number; y: number };
    const { type, name, data } = node.data;

    return {
      id: name,
      position: {
        x,
        y,
      },
      data,
      type: type,
    };
  });

  const newEdges = data
    .descendants()
    .map((node) => {
      const { parent } = node.data;
      if (!parent) return null;

      return {
        id: `${parent}-${node.data.name}`,
        source: parent,
        target: node.data.name,
      };
    })
    .filter(Boolean) as any;

  console.log({ newEdges });
  console.log({ newNodes });

  return { edges: newEdges, nodes: newNodes };
}

export function getNodeDescendants(
  node: Node,
  nodes: Node[]
): Node[] | undefined {
  const tree = generateTree({ nodes });
  const root = tree.find((d) => d.id === node.id);
  if (!root) return [];

  const descendants = root
    .descendants()
    .map((node) => {
      return nodes.find((d) => d.id === node.id);
    })
    .filter(Boolean) as Node[];

  return descendants;
}

// used to only show the nodes and edges that are descendants of the node that is clicked
// this includes the node that is clicked
export function focusNode(node: Node, nodes: Node[], edges: Edge[]) {
  const descendants = getNodeDescendants(node, nodes);
  console.log({ descendants });
  if (!descendants) return { nodes, edges };

  const newNodes = nodes.map((currentNode) => {
    const { id } = currentNode;

    const isDescendant = descendants.find((descendant) => {
      return descendant.id === id;
    });

    if (isDescendant || currentNode.id === node.id) return currentNode;

    return {
      ...currentNode,
      hidden: true,
    };
  });

  const newEdges = edges.map((edge) => {
    const { source, target } = edge;

    const isDescendant = descendants.find((descendant) => {
      return (
        (descendant.id === source || descendant.id === target) &&
        descendant.id !== node.id
      );
    });

    if (isDescendant) return edge;

    return {
      ...edge,
      hidden: true,
    };
  });

  return { nodes: newNodes, edges: newEdges };
}

export function collapseNode(node: Node, nodes: Node[], edges: Edge[]) {
  const descendants = getNodeDescendants(node, nodes);
  if (!descendants) return { nodes, edges };

  // hide all descendants
  const newNodes = nodes.map((currentNode) => {
    const { id } = currentNode;

    if (currentNode.id === node.id)
      return {
        ...currentNode,
        data: { ...currentNode.data, collapsed: true },
      };

    const isDescendant = descendants.find((descendant) => {
      return descendant.id === id;
    });

    if (isDescendant || currentNode.id === node.id)
      return { ...currentNode, hidden: true };

    return currentNode;
  });

  // hide all edges that are connected to descendants
  const newEdges = edges.map((edge) => {
    const { source, target } = edge;

    const isDescendant = descendants.find((descendant) => {
      return (
        (descendant.id === source || descendant.id === target) &&
        descendant.id !== node.id
      );
    });

    if (isDescendant) return { ...edge, hidden: true };

    return edge;
  });

  return { nodes: newNodes, edges: newEdges };
}

export function expandNode(node: Node, nodes: Node[], edges: Edge[]) {
  const descendants = getNodeDescendants(node, nodes);
  if (!descendants) return { nodes, edges };

  // hide all descendants
  const newNodes = nodes.map((currentNode) => {
    const { id } = currentNode;

    if (currentNode.id === node.id)
      return {
        ...currentNode,
        data: { ...currentNode.data, collapsed: false },
      };

    const isDescendant = descendants.find((descendant) => {
      return descendant.id === id;
    });

    if (isDescendant || currentNode.id === node.id)
      return { ...currentNode, hidden: false };

    return currentNode;
  });

  // hide all edges that are connected to descendants
  const newEdges = edges.map((edge) => {
    const { source, target } = edge;

    const isDescendant = descendants.find((descendant) => {
      return (
        (descendant.id === source || descendant.id === target) &&
        descendant.id !== node.id
      );
    });

    if (isDescendant) return { ...edge, hidden: false };

    return edge;
  });

  return { nodes: newNodes, edges: newEdges };
}

export function createNodes(agent: Agent) {
  // console.log(data)
  let nodes: Node[] = [];

  // agent
  let agentNode: Node = {
    id: agent["name"],
    type: "agent",
    data: {
      name: agent.name,
      published: agent.published,
      description: agent.description,
      intent_confidence: agent.intent_confidence,
      entity_confidence: agent.entity_confidence,
      sentiment_confidence: agent.sentiment_confidence,
      response_confidence: agent.response_confidence,
      parent: null,
    },
    position: { x: 0, y: 0 },
  };

  nodes.push(agentNode);

  // states
  for (let state of agent.states) {
    let stateNode = createStateNode(state, agent.name);
    // generate response nodes for this state
    state.state_responses.forEach((response) => {
      let responseNode = createResponseNode(response, state.name);
      nodes.push(responseNode);
    });
    nodes.push(stateNode);
  }

  return nodes;
}

export function createStateNode(
  state: Agent["states"][number],
  parent: string
) {
  let stateNode: Node = {
    id: state.name,
    type: "state",
    data: {
      name: state.name,
      published: state.published,
      prompts: state.prompts,
      replies: state.replies,
      parent: parent,
      type: state.type,
    },
    position: { x: 0, y: 0 },
  };

  return stateNode;
}

export function createResponseNode(
  response: Agent["states"][number]["state_responses"][number],
  parent: string
) {
  let stateNode: Node = {
    id: nanoid(),
    type: "state",
    data: {
      name: nanoid(),
      type: response.type,
      published: response.published,
      text: response.text || "",
      parent: parent,
    },
    position: { x: 0, y: 0 },
  };

  return stateNode;
}
