import React, { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { MessageCircle, X, Plus, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface QuickResponse {
  id: string;
  text: string;
}

interface InteractionsNodeProps {
  data: {
    label: string;
    onDelete: () => void;
    question?: string;
    instanceId: number;
    quickResponses?: QuickResponse[];
    message?: string;
  };
}

export const InteractionsNode: React.FC<InteractionsNodeProps> = ({ data }) => {
  const [message, setMessage] = useState(data.message || 'Digite sua avaliação aqui');
  const [quickResponses, setQuickResponses] = useState<QuickResponse[]>(data.quickResponses || []);
  const [nextId, setNextId] = useState(quickResponses.length + 1);

  const addQuickResponse = () => {
    const newResponse = { id: `${nextId}`, text: `Opção ${nextId}` };
    const updatedResponses = [...quickResponses, newResponse];
    setQuickResponses(updatedResponses);
    setNextId(nextId + 1);
    data.quickResponses = updatedResponses;
  };

  const removeQuickResponse = (id: string) => {
    const updatedResponses = quickResponses.filter((qr) => qr.id !== id);
    setQuickResponses(updatedResponses);
    data.quickResponses = updatedResponses;
  };

  const updateQuickResponse = (id: string, text: string) => {
    const updatedResponses = quickResponses.map((qr) =>
      qr.id === id ? { ...qr, text } : qr
    );
    setQuickResponses(updatedResponses);
    data.quickResponses = updatedResponses;
  };

  useEffect(() => {
    data.message = message;
    data.quickResponses = quickResponses;
  }, [message, quickResponses, data]); // Include 'data' in the dependency array

  return (
    <Card className="w-[400px] bg-white shadow-lg">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="text-blue-500" />
          <h3 className="text-lg font-semibold">Interação {data.instanceId}</h3>
          <Button variant="ghost" size="sm" onClick={data.onDelete}>
            <Trash2 className="h-4 w-4 text-gray-500" />
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="user-message" className="block text-gray-600 mb-2">
              Mensagem
            </Label>
            <Textarea
              id="user-message"
              placeholder="Digite sua avaliação aqui"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                data.message = e.target.value;
              }}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2 mt-4">
            <div className="flex justify-between items-center">
              <Label className="text-gray-600">Respostas Rápidas</Label>
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
              {quickResponses.map((qr) => (
                <div key={qr.id} className="flex items-center gap-2 relative pr-6 py-2">
                  <Input
                    value={qr.text}
                    onChange={(e) => {
                      updateQuickResponse(qr.id, e.target.value);
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
                    id={`resposta-${qr.id}`}
                    className="w-3 h-3 !bg-blue-500"
                    style={{
                      top: '50%',
                      right: '-4px',
                      transform: 'translateY(-50%)',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <Handle
          type="target"
          position={Position.Left}
          className="w-3 h-3 !bg-blue-500"
          style={{
            top: '50%',
            left: '-4px',
            transform: 'translateY(-50%)',
          }}
        />
      </div>
    </Card>
  );
};
