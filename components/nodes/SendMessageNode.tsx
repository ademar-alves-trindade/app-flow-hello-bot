import React, { useState, useEffect, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { MessageCircle, X, Plus, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface QuickResponse {
  id: string;
  text: string;
}

interface SendMessageNodeProps {
  data: {
    label: string;
    onDelete: () => void;
    message?: string;
    quickResponses?: QuickResponse[];
    messageNumber: number;
  };
}

export const SendMessageNode: React.FC<SendMessageNodeProps> = ({ data }) => {
  const [message, setMessage] = useState(data.message || '');
  const [quickResponses, setQuickResponses] = useState<QuickResponse[]>(data.quickResponses || []);
  const [nextId, setNextId] = useState(1);

  const addQuickResponse = useCallback(() => {
    const newResponse = { id: `${nextId}`, text: `Opção ${nextId}` };
    const updatedResponses = [...quickResponses, newResponse];
    setQuickResponses(updatedResponses);
    setNextId(nextId + 1);
    data.quickResponses = updatedResponses;
  }, [quickResponses, nextId, data]);

  const removeQuickResponse = (id: string) => {
    const updatedResponses = quickResponses.filter(qr => qr.id !== id);
    setQuickResponses(updatedResponses);
    data.quickResponses = updatedResponses;
  };

  useEffect(() => {
    if (quickResponses.length === 0) {
      addQuickResponse();
    }
  }, [quickResponses.length, addQuickResponse]);

  return (
    <Card className="w-[400px] bg-white shadow-lg relative">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="text-blue-500" />
          <h3 className="text-lg font-semibold">Mensagem {data.messageNumber}</h3>
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
              <div key={qr.id} className="flex items-center gap-2 relative pr-6 py-2">
                <Input
                  value={qr.text}
                  onChange={(e) => {
                    const updatedResponses = quickResponses.map((r) =>
                      r.id === qr.id ? { ...r, text: e.target.value } : r
                    );
                    setQuickResponses(updatedResponses);
                    data.quickResponses = updatedResponses;
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
                  id={`resposta-${index + 1}`}
                  className="w-3 h-3 !bg-blue-500"
                  style={{
                    top: 'auto',
                    bottom: 'auto',
                    right: '-4px',
                    left: 'auto',
                    transform: 'translateY(-50%)',
                  }}
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
