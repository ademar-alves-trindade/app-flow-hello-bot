import React, { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { Zap, Trash2, Plus, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface QuickResponse {
  id: string;
  text: string;
}

interface InicioNodeProps {
  data: {
    label: string;
    onDelete: () => void;
    question?: string;
    message?: string;
    quickResponses?: QuickResponse[];
  };
}

export const InicioNode: React.FC<InicioNodeProps> = ({ data }) => {
  const [message, setMessage] = useState(data.message || 'Bem-vindo! Como posso ajudar?');
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
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap className="text-yellow-500" />
            <h3 className="text-lg font-semibold">Início</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={data.onDelete}>
            <Trash2 className="h-4 w-4 text-gray-500" />
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="welcome-message" className="block text-gray-600 mb-2">
              Mensagem de Boas-vindas
            </Label>
            <Textarea
              id="welcome-message"
              placeholder="Digite a mensagem de boas-vindas"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                data.message = e.target.value;
              }}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
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
                    className="custom-handle-message"
                    style={{
                      top: '50%',
                      right: '-20px',
                      transform: 'translateY(-50%)',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
