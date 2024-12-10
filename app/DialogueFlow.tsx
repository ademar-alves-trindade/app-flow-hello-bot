"use client";
import React, { useState, useCallback, useRef } from "react";
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
  OnConnect,
  ReactFlowInstance,
} from "reactflow";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Download } from "lucide-react";
import "reactflow/dist/style.css";
import { customNodeTypes } from "@/components/CustomNodes";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
};

export default function DialogueFlow() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
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

      const exportableNodes = flow.nodes.map((node: Node) => {
        const exportNode = { ...node };

        switch (node.type) {
          case "sendMessage":
          case "interactions":
            exportNode.data = {
              ...node.data,
              message: node.data?.message || "",
              quickResponses: node.data?.quickResponses || [],
            };
            break;
          case "actions":
            exportNode.data = {
              ...node.data,
              actionType: node.data?.actionType || "",
              actionValue: node.data?.actionValue || "",
            };
            break;
          case "closeChat":
            exportNode.data = {
              ...node.data,
              closingMessage: node.data?.closingMessage || "",
            };
            break;
          default:
            exportNode.data = { ...node.data };
        }

        delete exportNode.data?.onDelete;
        return exportNode;
      });

      const exportableFlow = {
        ...flow,
        nodes: exportableNodes,
        edges: flow.edges,
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

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (reactFlowWrapper.current && reactFlowInstance) {
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData("application/reactflow");

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        let instanceId = 1;
        if (type === "interactions") {
          const existingInteractionsNodes = nodes.filter((node) => node.type === "interactions");
          if (existingInteractionsNodes.length > 0) {
            instanceId = Math.max(...existingInteractionsNodes.map((node) => node.data.instanceId)) + 1;
          }
        }

        const newNode: Node = {
          id: `${type}-${nodes.length + 1}`,
          type,
          position,
          data: {
            label: type === "inicio" ? "Início" : type.charAt(0).toUpperCase() + type.slice(1),
            instanceId: type === "interactions" ? instanceId : undefined,
            onDelete: () => {
              setNodes((nds) => nds.filter((node) => node.id !== newNode.id));
              setEdges((eds) => eds.filter((edge) => edge.source !== newNode.id && edge.target !== newNode.id));
            },
            message: "",
            quickResponses: [],
          },
        };

        setNodes((nds) => nds.concat(newNode));
      }
    },
    [reactFlowInstance, nodes, setNodes, setEdges]
  );

  const onEdgeClick = useCallback(
    (event: React.MouseEvent, edge: Edge) => {
      event.preventDefault();
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    },
    [setEdges]
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
                onEdgeClick={onEdgeClick}
                nodeTypes={customNodeTypes}
                fitView
              >
                <Background />
                <Controls />
                <MiniMap />
              </ReactFlow>
              <div className="absolute top-4 right-4 z-10 flex gap-2">
                <Button onClick={exportFlow} className="flex items-center gap-2">
                  <Download size={16} />
                  Exportar Fluxo
                </Button>
                <Button onClick={() => setEdges([])} variant="secondary">
                  Remover Conexões
                </Button>
                <Button onClick={deleteAll} variant="destructive">
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
