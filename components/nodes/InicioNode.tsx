import React from 'react';
import { Handle, Position } from 'reactflow';
import { Zap, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface InicioNodeProps {
  data: { label: string; onDelete: () => void };
}

export const InicioNode: React.FC<InicioNodeProps> = ({ data }) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-gray-200">
      <Handle type="target" position={Position.Left} className="w-3 h-3" />
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Zap className="mr-2 text-yellow-500" size={16} />
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

