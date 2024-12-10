import React, { useState } from 'react';
import { Trash2, Plus, X, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface QuickResponse {
  id: string;
  text: string;
}

interface ServiceEvaluationNodeProps {
  data: {
    label: string;
    onDelete: () => void;
  };
}

export const ServiceEvaluationNode: React.FC<ServiceEvaluationNodeProps> = ({ data }) => {
  const [userEvaluation, setUserEvaluation] = useState('');
  const [quickResponses, setQuickResponses] = useState<QuickResponse[]>([]);
  const [nextId, setNextId] = useState(1);

  const addQuickResponse = () => {
    const newResponse = { id: `${nextId}`, text: `Opção ${nextId}` };
    const updatedResponses = [...quickResponses, newResponse];
    setQuickResponses(updatedResponses);
    setNextId(nextId + 1);
  };

  const removeQuickResponse = (id: string) => {
    const updatedResponses = quickResponses.filter(qr => qr.id !== id);
    setQuickResponses(updatedResponses);
  };

  return (
    <Card className="w-[400px] bg-white shadow-lg">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Star className="text-yellow-500" />
            <h3 className="text-lg font-semibold">Avaliação do Serviço</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={data.onDelete}>
            <Trash2 className="h-4 w-4 text-gray-500" />
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="user-evaluation" className="block text-gray-600 mb-2">
              Avaliação do Usuário
            </Label>
            <Textarea
              id="user-evaluation"
              placeholder="Digite sua avaliação aqui"
              value={userEvaluation}
              onChange={(e) => setUserEvaluation(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2 mt-4">
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
              {quickResponses.map((qr) => (
                <div key={qr.id} className="flex items-center gap-2 py-2">
                  <Input
                    value={qr.text}
                    onChange={(e) => {
                      setQuickResponses(
                        quickResponses.map((r) =>
                          r.id === qr.id ? { ...r, text: e.target.value } : r
                        )
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
