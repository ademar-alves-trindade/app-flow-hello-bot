"use client"
import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Download } from 'lucide-react';
import 'reactflow/dist/style.css';
import { customNodeTypes } from '@/components/CustomNodes';
import { Button } from "@/components/ui/button";
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Sidebar } from '@/components/Sidebar';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'trigger',
    data: { 
      label: 'Gatilho',
      onDelete: () => {
        setNodes((nds) => nds.filter((node) => node.id !== '1'));
        setEdges((eds) => eds.filter((edge) => edge.source !== '1' && edge.target !== '1'));
      }
    },
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    type: 'sendMessage',
    data: { 
      label: 'Enviar Mensagem',
      onDelete: () => {
        setNodes((nds) => nds.filter((node) => node.id !== '2'));
        setEdges((eds) => eds.filter((edge) => edge.source !== '2' && edge.target !== '2'));
      }
    },
    position: { x: 250, y: 100 },
  },
  {
    id: '3',
    type: 'condition',
    data: { 
      label: 'Condição',
      onDelete: () => {
        setNodes((nds) => nds.filter((node) => node.id !== '3'));
        setEdges((eds) => eds.filter((edge) => edge.source !== '3' && edge.target !== '3'));
      }
    },
    position: { x: 250, y: 200 },
  },
  {
    id: '4',
    type: 'actions',
    data: { 
      label: 'Ações',
      onDelete: () => {
        setNodes((nds) => nds.filter((node) => node.id !== '4'));
        setEdges((eds) => eds.filter((edge) => edge.source !== '4' && edge.target !== '4'));
      }
    },
    position: { x: 250, y: 300 },
  },
  {
    id: '5',
    type: 'closeChat',
    data: { 
      label: 'Encerrar Chat',
      onDelete: () => {
        setNodes((nds) => nds.filter((node) => node.id !== '5'));
        setEdges((eds) => eds.filter((edge) => edge.source !== '5' && edge.target !== '5'));
      }
    },
    position: { x: 250, y: 400 },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e3-4', source: '3', target: '4' },
  { id: 'e4-5', source: '4', target: '5' },
];

const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
};

export default function DialogueFlow() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const deleteAll = () => {
    setNodes([]);
    setEdges([]);
  };

  const exportFlow = () => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      const exportableNodes = flow.nodes.map((node: any) => {
        const exportNode = { ...node };
        switch (node.type) {
          case 'sendMessage':
            exportNode.data = {
              ...node.data,
              message: node.data.message || '',
              quickResponses: node.data.quickResponses || [],
            };
            break;
          case 'condition':
            exportNode.data = {
              ...node.data,
              condition: node.data.condition || '',
            };
            break;
          case 'actions':
            exportNode.data = {
              ...node.data,
              actionType: node.data.actionType || '',
              actionValue: node.data.actionValue || '',
            };
            break;
          case 'closeChat':
            exportNode.data = {
              ...node.data,
              closingMessage: node.data.closingMessage || '',
            };
            break;
        }
        delete exportNode.data.onDelete;
        return exportNode;
      });

      const exportableFlow = {
        ...flow,
        nodes: exportableNodes,
      };

      const blob = new Blob([JSON.stringify(exportableFlow, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "fluxo_dialogo.json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (reactFlowWrapper.current) {
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData('application/reactflow');

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const newNode: Node = {
          id: `${type}-${nodes.length + 1}`,
          type,
          position,
          data: { 
            label: type.charAt(0).toUpperCase() + type.slice(1),
            onDelete: () => {
              setNodes((nds) => nds.filter((node) => node.id !== newNode.id));
              setEdges((eds) => eds.filter((edge) => edge.source !== newNode.id && edge.target !== newNode.id));
            }
          },
        };

        setNodes((nds) => nds.concat(newNode));
      }
    },
    [reactFlowInstance, nodes, setNodes, setEdges]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col h-screen">
        <Header toggleSidebar={toggleSidebar} />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar isOpen={isSidebarOpen} onDragStart={onDragStart} />
          <ReactFlowProvider>
            <div className="flex-grow relative" ref={reactFlowWrapper}>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={setReactFlowInstance}
                onDrop={onDrop}
                onDragOver={onDragOver}
                nodeTypes={customNodeTypes}
                fitView
              >
                <Background />
                <Controls />
                <MiniMap />
              </ReactFlow>
              <div className="absolute top-4 right-4 z-10 flex gap-2">
                <Button
                  onClick={exportFlow}
                  className="flex items-center gap-2"
                >
                  <Download size={16} />
                  Exportar Fluxo
                </Button>
                <Button
                  onClick={deleteAll}
                  variant="destructive"
                >
                  Excluir Todos
                </Button>
              </div>
            </div>
          </ReactFlowProvider>
        </div>
        <Footer />
      </div>
    </DndProvider>
  );
}

