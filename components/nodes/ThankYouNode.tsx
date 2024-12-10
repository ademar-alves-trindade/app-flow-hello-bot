import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { ThumbsUp, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ThankYouNodeProps {
  data: {
    label: string;
    onDelete: () => void;
    message?: string;
  };
}

export const ThankYouNode: React.FC<ThankYouNodeProps> = ({ data }) => {
  const [message, setMessage] = useState(data.message || 'Obrigado por utilizar nosso serviço!');

  return (
    <Card className="w-[400px] bg-white shadow-lg">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <ThumbsUp className="text-green-500" />
          <h3 className="text-lg font-semibold">Agradecimento</h3>
          <Button variant="ghost" size="sm" onClick={data.onDelete}>
            <Trash2 className="h-4 w-4 text-gray-500" />
          </Button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Mensagem de Agradecimento</label>
          <textarea
            className="w-full p-2 border rounded-md min-h-[100px] text-gray-700 placeholder-gray-400"
            placeholder="Digite a mensagem de agradecimento"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              data.message = e.target.value;
            }}
          />
        </div>

        <Handle
          type="target"
          position={Position.Left}
          className="w-3 h-3 !bg-green-500"
        />
      </div>
    </Card>
  );
};

