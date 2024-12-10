import Link from "next/link";
import {
  Zap,
  MessageCircle,
  Workflow,
  X,
  Clock,
  ThumbsUp,
  Star,
  ChevronDown,
  Database,
  MessageSquare,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

interface SidebarProps {
  isOpen: boolean;
  onDragStart: (event: React.DragEvent<HTMLDivElement>, nodeType: string) => void;
}

const flowNodeTypes = [
  { type: "inicio", label: "Início", icon: Zap, color: "yellow" },
  { type: "interactions", label: "Interações", icon: MessageCircle, color: "blue" },
  { type: "actions", label: "Ações", icon: Workflow, color: "green" },
  { type: "closeChat", label: "Encerrar Chat", icon: X, color: "red" },
  { type: "inactivity", label: "Fechar por Inatividade", icon: Clock, color: "orange" },
  { type: "thankYou", label: "Agradecimento", icon: ThumbsUp, color: "green" },
  { type: "serviceEvaluation", label: "Avaliação do Serviço", icon: Star, color: "yellow" },
];

const whatsappIntegrationItems = [
  { type: "manageConnections", label: "Gerência de Conexões", icon: Database, color: "teal" },
  { type: "sendMessage", label: "Envio de Mensagem", icon: MessageSquare, color: "violet" },
];

export function Sidebar({ isOpen, onDragStart }: SidebarProps) {
  return (
    <aside
      className={`w-72 bg-white border-r border-gray-200 p-6 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 overflow-hidden`}
    >
      {/* Flow Nodes Section */}
      <Collapsible defaultOpen>
        <SidebarGroup>
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger className="flex items-center justify-between w-full hover:bg-accent rounded-md p-2">
              <span className="text-lg font-semibold text-gray-600">Tipos de Nós</span>
              <ChevronDown className="h-4 w-4 transition-transform ui-open:rotate-180" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent className="space-y-2">
              {flowNodeTypes.map(({ type, icon: Icon, label, color }) => (
                <div
                  key={type}
                  className="flex items-center gap-2 p-4 bg-white rounded-md cursor-move border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
                  draggable
                  onDragStart={(e) => onDragStart(e, type)}
                >
                  <div className={`p-1 rounded-md bg-${color}-50`}>
                    <Icon className={`w-4 h-4 text-${color}-500`} />
                  </div>
                  <span className="text-xs font-medium text-gray-700">{label}</span>
                </div>
              ))}
            </SidebarGroupContent>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>

  {/* WhatsApp Integration Section */}
  <Collapsible defaultOpen>
        <SidebarGroup>
          <SidebarGroupLabel asChild>
          <CollapsibleTrigger className="flex items-center justify-between w-full hover:bg-accent rounded-md p-2">
              <span className="text-lg font-semibold text-gray-600">Integração Meta</span>
              <ChevronDown className="h-4 w-4 transition-transform ui-open:rotate-180" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
          <SidebarGroupContent className="space-y-2">
              {whatsappIntegrationItems.map(({ type, icon: Icon, label, color }) => (
                <Link
                  href={
                    type === "sendMessage"
                      ? "/sendMessage"
                      : type === "manageConnections"
                      ? "/manageConnections"
                      : "#"
                  }
                  key={type}                  
                >
                  <div
                  className="flex items-center gap-2 p-4 bg-white rounded-md cursor-pointer border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
                  >
                  <div className={`p-1 rounded-md bg-${color}-50`}>
                    <Icon className={`w-4 h-4 text-${color}-500`} />
                  </div>
                  <span className="text-xs font-medium text-gray-700">{label}</span>
                </div>
                </Link>
              ))}
            </SidebarGroupContent>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>
    </aside>
  );
}