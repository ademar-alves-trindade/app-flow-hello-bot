import { Zap, MessageCircle, Workflow, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onDragStart: (event: React.DragEvent<HTMLDivElement>, nodeType: string) => void;
}

export function Sidebar({ isOpen, onDragStart }: SidebarProps) {
  const nodeTypes = [
    { type: 'inicio', label: 'Início', icon: Zap, color: 'text-yellow-500' },
    { type: 'sendMessage', label: 'Enviar Mensagem', icon: MessageCircle, color: 'text-blue-500' },
    { type: 'actions', label: 'Ações', icon: Workflow, color: 'text-green-500' },
    { type: 'closeChat', label: 'Encerrar Chat', icon: X, color: 'text-red-500' },
  ];

  return (
    <aside className={`bg-gray-100 p-4 transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-0'} md:w-64 overflow-hidden`}>
      <h2 className="text-lg font-bold mb-4">Tipos de Nós</h2>
      {nodeTypes.map(({ type, label, icon: Icon, color }) => (
        <div
          key={type}
          className="flex items-center bg-white p-2 mb-2 rounded cursor-move"
          onDragStart={(event) => onDragStart(event, type)}
          draggable
        >
          <Icon className={`mr-2 ${color}`} size={16} />
          <span>{label}</span>
        </div>
      ))}
    </aside>
  );
}

