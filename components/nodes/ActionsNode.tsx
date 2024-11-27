import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Workflow, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ActionsNodeProps {
  data: {
    label: string;
    onDelete: () => void;
    actionType?: string;
    actionValue?: string;
  };
}

export const ActionsNode: React.FC<ActionsNodeProps> = ({ data }) => {
  const [actionType, setActionType] = useState(data.actionType || '');
  const [actionValue, setActionValue] = useState(data.actionValue || '');

  return (
    <Card className="w-[400px] bg-white shadow-lg">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Workflow className="text-green-500" />
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
          className="w-3 h-3 !bg-green-500"
        />
        <Handle
          type="source"
          position={Position.Right}
          className="w-3 h-3 !bg-green-500"
        />
      </div>
    </Card>
  );
};

