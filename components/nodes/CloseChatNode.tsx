import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { X, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface CloseChatNodeProps {
  data: {
    label: string;
    onDelete: () => void;
    closingMessage?: string;
  };
}

export const CloseChatNode: React.FC<CloseChatNodeProps> = ({ data }) => {
  const [closingMessage, setClosingMessage] = useState(data.closingMessage || '');

  return (
    <Card className="w-[400px] bg-white shadow-lg">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <X className="text-red-500" />
            <h3 className="text-lg font-semibold">Encerrar Conversa</h3>
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
          className="custom-handle-close"
        />
      </div>
    </Card>
  );
};

