import React, { useState, useEffect } from "react";
import { Clock, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface InactivityNodeProps {
  data: {
    label: string;
    onDelete: () => void;
    inactivityTime?: number;
    onUpdateInactivityTime?: (time: number) => void;
  };
}

export const InactivityNode: React.FC<InactivityNodeProps> = ({ data }) => {
  const [inactivityTime, setInactivityTime] = useState(data.inactivityTime || 300);

  useEffect(() => {
    if (data.onUpdateInactivityTime) {
      data.onUpdateInactivityTime(inactivityTime);
    }
  }, [inactivityTime, data]);

  return (
    <Card className="w-[400px] bg-white shadow-lg">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="text-orange-500" />
          <h3 className="text-lg font-semibold">Fechar por Inatividade</h3>
          <Button variant="ghost" size="sm" onClick={data.onDelete}>
            <Trash2 className="h-4 w-4 text-gray-500" />
          </Button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Tempo de Inatividade (segundos)</label>
          <Input
            type="number"
            value={inactivityTime}
            onChange={(e) => setInactivityTime(Number(e.target.value))}
            min={1}
          />
        </div>

        <p className="text-sm text-gray-500">
          Condições para o encerramento: após {inactivityTime} segundos de inatividade, o chat será encerrado.
        </p>
      </div>
    </Card>
  );
};
