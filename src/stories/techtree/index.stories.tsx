import { ReactFlow, ReactFlowProvider, NodeProps, useNodesState, useEdgesState, useReactFlow, Position, Handle, Panel } from '@xyflow/react';
import type { Meta } from '@storybook/react';
import Dagre from '@dagrejs/dagre';
import '@xyflow/react/dist/style.css';
import { Card, CardBody, CardFooter, Image, Heading, Button, Text, Box } from '@chakra-ui/react';
import React from 'react';

const nodeTypes = {
  cardNode: CardNode
};


const initialNodes = [
  { id: '1', type: "cardNode", position: { x: 0, y: 0 }, data: { title: '1', button: "click" } },
  { id: '2', type: "cardNode", position: { x: 0, y: 0 }, data: { title: '2', button: "click" } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];


type CardNodeProps = {
  data: {
    title?: string;
    image?: string;
    button?: string;
  }
};

function CardNode({ data }: CardNodeProps) {
  return (
    <Card.Root maxW="sm" >
      <Image
        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt="Green double couch with wooden legs"
      />
      <Card.Body gap="2">
        <Card.Title>{data.title}</Card.Title>
        <Card.Description>
          This sofa is perfect for modern tropical spaces, baroque inspired
          spaces.
        </Card.Description>
        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
          $450
        </Text>
      </Card.Body>
      <Card.Footer gap="2">
        <Button variant="solid">{data.button}</Button>
      </Card.Footer>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </Card.Root>
  )
}


const getLayoutedElements = (nodes, edges, options) => {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: options.direction });
 
  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) =>
    g.setNode(node.id, {
      ...node,
      width: node.measured?.width ?? 0,
      height: node.measured?.height ?? 0,
    }),
  );
 
  Dagre.layout(g);
 
  return {
    nodes: nodes.map((node) => {
      const position = g.node(node.id);
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      console.log(node);
      const x = position.x - (node.measured?.width ?? 0) / 2;
      const y = position.y - (node.measured?.height ?? 0) / 2;
 
      return { ...node, position: { x, y } };
    }),
    edges,
  };
};
 



export function App() {
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
 
  const onLayout = React.useCallback(
    (direction) => {
      console.log(nodes);
      const layouted = getLayoutedElements(nodes, edges, { direction });
 
      setNodes([...layouted.nodes]);
      setEdges([...layouted.edges]);
 
      fitView();
    },
    [nodes, edges],
  )

  React.useEffect(() => {
    // Check if all nodes have been measured
    const allNodesMeasured = nodes.every(node => 
      node.measured?.width && node.measured?.height
    );
    
    if (allNodesMeasured && nodes.length > 0) {
      // Small delay to ensure DOM is updated
      const timer = setTimeout(() => {
        onLayout('TB');
      }, 10);
      
      return () => clearTimeout(timer);
    }
  }, [nodes, onLayout]);



  return (
    <Box data-state="open" _open={{animation: "fade-in 600ms ease-out"}} width='100vw' height='100vh'>
      <ReactFlow  onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} fitView nodes={nodes} edges={edges}  nodeTypes={nodeTypes} />
      <Panel position="top-right">
        <button onClick={() => onLayout('TB')}>vertical layout</button>
        <button onClick={() => onLayout('LR')}>horizontal layout</button>
      </Panel>
    </Box>
  );
}



const meta = {
  title: 'TechTree/HelloWorld',
  component: App,
  decorators: [
    (Story) => (
      <ReactFlowProvider>
        <Story />
      </ReactFlowProvider>
    ),
  ],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  
} satisfies Meta<typeof App>;


export default meta;