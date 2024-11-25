import { CloudLightningIcon as Lightning, MessageCircle, Filter, Cog, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onDragStart: (event: React.DragEvent<HTMLDivElement>, nodeType: string) => void;
}

export function Sidebar({ isOpen, onDragStart }: SidebarProps) {
  const nodeTypes = [
    { type: 'trigger', label: 'Gatilho', icon: Lightning, color: 'purple' },
    { type: 'sendMessage', label: 'Enviar Mensagem', icon: MessageCircle, color: 'blue' },
    { type: 'condition', label: 'Condição', icon: Filter, color: 'purple' },
    { type: 'actions', label: 'Ações', icon: Cog, color: 'pink' },
    { type: 'closeChat', label: 'Encerrar Chat', icon: X, color: 'red' },
  ];

  return (
    <aside className={`bg-white p-4 border-r border-gray-200 transition-all duration-300 ease-in-out ${isOpen ? 'w-72' : 'w-0'
      } overflow-hidden`}
    >
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Node Types</h2>
      <div className="space-y-3">
        {nodeTypes.map(({ type, icon: Icon, label, color }) => (
          <div
            key={type}
            className="flex items-center gap-3 p-4 bg-white rounded-lg cursor-move border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
            draggable
            onDragStart={(e) => onDragStart(e, type)}
          >
            <div className={`p-2 rounded-lg bg-${color}-50`}>
              <Icon className={`w-5 h-5 text-${color}-500`} />
            </div>
            <span className="text-sm font-medium text-gray-700">{label}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}

