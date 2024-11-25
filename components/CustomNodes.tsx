import React, { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { CloudLightningIcon as Lightning, MessageCircle, Filter, Cog, X, Plus, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const nodeTypes = ['trigger', 'sendMessage', 'condition', 'actions', 'closeChat'];

const iconMap = {
  trigger: Lightning,
  sendMessage: MessageCircle,
  condition: Filter,
  actions: Cog,
  closeChat: X,
};

const colorMap = {
  trigger: 'bg-green-100 border-green-500',
  sendMessage: 'bg-blue-100 border-blue-500',
  condition: 'bg-purple-100 border-purple-500',
  actions: 'bg-pink-100 border-pink-500',
  closeChat: 'bg-red-100 border-red-500',
};

const CustomNode = ({ data, type }: { data: { label: string, onDelete: () => void }, type: string }) => {
  const Icon = iconMap[type as keyof typeof iconMap];
  const color = colorMap[type as keyof typeof colorMap];

  return (
    <div className={`px-4 py-2 shadow-md rounded-md ${color} border-2`}>
      <Handle type="target" position={Position.Left} className="w-3 h-3" />
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Icon className="mr-2" size={16} />
          <div className="font-bold">{data.label}</div>
        </div>
        <Button variant="ghost" size="sm" onClick={data.onDelete}>
          <Trash2 className="h-4 w-4 text-gray-500" />
        </Button>
      </div>
      <Handle type="source" position={Position.Right} className="w-3 h-3" />
    </div>
  );
};

interface QuickResponse {
  id: string;
  text: string;
}

const MessageNode = ({ data }: { data: { label: string, onDelete: () => void, message?: string, quickResponses?: QuickResponse[] } }) => {
  const [message, setMessage] = useState(data.message || '');
  const [quickResponses, setQuickResponses] = useState<QuickResponse[]>(data.quickResponses || []);
  const [nextId, setNextId] = useState(1);

  const addQuickResponse = () => {
    const newResponse = { id: `${nextId}`, text: `Opção ${nextId}` };
    const updatedResponses = [...quickResponses, newResponse];
    setQuickResponses(updatedResponses);
    setNextId(nextId + 1);
    data.quickResponses = updatedResponses;
  };

  const removeQuickResponse = (id: string) => {
    const updatedResponses = quickResponses.filter(qr => qr.id !== id);
    setQuickResponses(updatedResponses);
    data.quickResponses = updatedResponses;
  };

  useEffect(() => {
    // Ensure there's always at least one output handle
    if (quickResponses.length === 0) {
      addQuickResponse();
    }
  }, []);

  return (
    <Card className="w-[400px] bg-white shadow-lg">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="text-blue-500" />
          <h3 className="text-lg font-semibold">Mensagem</h3>
          <Button variant="ghost" size="sm" onClick={data.onDelete}>
            <Trash2 className="h-4 w-4 text-gray-500" />
          </Button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Mensagem</label>
          <textarea
            className="w-full p-2 border rounded-md min-h-[100px] text-gray-700 placeholder-gray-400"
            placeholder="Digite a mensagem pré-estabelecida"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              data.message = e.target.value;
            }}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-gray-600">Respostas Rápidas</label>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={addQuickResponse}
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
              Adicionar
            </Button>
          </div>

          <div className="space-y-2">
            {quickResponses.map((qr, index) => (
              <div key={qr.id} className="flex items-center gap-2">
                <Input
                  value={qr.text}
                  onChange={(e) => {
                    setQuickResponses(
                      quickResponses.map((r) =>
                        r.id === qr.id ? { ...r, text: e.target.value } : r
                      )
                    );
                    data.quickResponses = quickResponses.map((r) =>
                        r.id === qr.id ? { ...r, text: e.target.value } : r
                      );
                  }}
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeQuickResponse(qr.id)}
                >
                  <X className="h-4 w-4 text-gray-500" />
                </Button>
                <Handle
                  type="source"
                  position={Position.Right}
                  id={`handle-${index}`}
                  className="w-3 h-3 !bg-blue-500"
                  style={{ top: `${(index + 1) * 40}px` }}
                />
              </div>
            ))}
          </div>
        </div>

        <Handle
          type="target"
          position={Position.Left}
          className="w-3 h-3 !bg-blue-500"
        />
      </div>
    </Card>
  );
};

const ConditionNode = ({ data }: { data: { label: string, onDelete: () => void, condition?: string } }) => {
  const [condition, setCondition] = useState(data.condition || '');

  return (
    <Card className="w-[400px] bg-white shadow-lg">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="text-purple-500" />
          <h3 className="text-lg font-semibold">Condição</h3>
          <Button variant="ghost" size="sm" onClick={data.onDelete}>
            <Trash2 className="h-4 w-4 text-gray-500" />
          </Button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Condição</label>
          <Input
            placeholder="Digite a condição"
            value={condition}
            onChange={(e) => {
              setCondition(e.target.value);
              data.condition = e.target.value;
            }}
          />
        </div>

        <Handle
          type="target"
          position={Position.Left}
          className="w-3 h-3 !bg-purple-500"
        />
        <Handle
          type="source"
          position={Position.Right}
          id="true"
          className="w-3 h-3 !bg-green-500"
          style={{ top: '25%' }}
        />
        <Handle
          type="source"
          position={Position.Right}
          id="false"
          className="w-3 h-3 !bg-red-500"
          style={{ top: '75%' }}
        />
      </div>
    </Card>
  );
};

const ActionNode = ({ data }: { data: { label: string, onDelete: () => void, actionType?: string, actionValue?: string } }) => {
  const [actionType, setActionType] = useState(data.actionType || '');
  const [actionValue, setActionValue] = useState(data.actionValue || '');

  return (
    <Card className="w-[400px] bg-white shadow-lg">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Cog className="text-pink-500" />
          <h3 className="text-lg font-semibold">Ação</h3>
          <Button variant="ghost" size="sm" onClick={data.onDelete}>
            <Trash2 className="h-4 w-4 text-gray-500" />
          </Button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Tipo de Ação</label>
          <Select 
            onValueChange={(value) => {
              setActionType(value);
              data.actionType = value;
            }}
            value={actionType}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo de ação" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="setVariable">Definir Variável</SelectItem>
              <SelectItem value="apiCall">Chamada de API</SelectItem>
              <SelectItem value="customAction">Ação Personalizada</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Valor da Ação</label>
          <Input
            placeholder="Digite o valor da ação"
            value={actionValue}
            onChange={(e) => {
              setActionValue(e.target.value);
              data.actionValue = e.target.value;
            }}
          />
        </div>

        <Handle
          type="target"
          position={Position.Left}
          className="w-3 h-3 !bg-pink-500"
        />
        <Handle
          type="source"
          position={Position.Right}
          className="w-3 h-3 !bg-pink-500"
        />
      </div>
    </Card>
  );
};

const CloseChatNode = ({ data }: { data: { label: string, onDelete: () => void, closingMessage?: string } }) => {
  const [closingMessage, setClosingMessage] = useState(data.closingMessage || '');

  return (
    <Card className="w-[400px] bg-white shadow-lg">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <X className="text-red-500" />
            <h3 className="text-lg font-semibold">Encerrar Chat</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={data.onDelete}>
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Mensagem de Encerramento</label>
          <textarea
            className="w-full p-2 border rounded-md min-h-[100px] text-gray-700 placeholder-gray-400"
            placeholder="Digite a mensagem de encerramento"
            value={closingMessage}
            onChange={(e) => {
              setClosingMessage(e.target.value);
              data.closingMessage = e.target.value;
            }}
          />
        </div>

        <Handle
          type="target"
          position={Position.Left}
          className="w-3 h-3 !bg-red-500"
        />
      </div>
    </Card>
  );
};

export const customNodeTypes = {
  ...nodeTypes.reduce((acc, type) => {
    acc[type] = (props: any) => <CustomNode {...props} type={type} />;
    return acc;
  }, {} as { [key: string]: React.FC<any> }),
  sendMessage: MessageNode,
  condition: ConditionNode,
  actions: ActionNode,
  closeChat: CloseChatNode,
};

