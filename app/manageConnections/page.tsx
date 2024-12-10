"use client";

import React, { useState } from "react";
import { Wifi, WifiOff, PlugZap, LogOut } from "lucide-react";

// Status Type Definition
interface StatusType {
  isConnected: boolean;
  lastPing?: Date | null;
  error?: string | null;
}

// ConnectionStatus Component
interface ConnectionStatusProps {
  status: StatusType;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ status }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center space-x-4">
        {status.isConnected ? (
          <Wifi className="h-6 w-6 text-green-500" />
        ) : (
          <WifiOff className="h-6 w-6 text-red-500" />
        )}
        <div>
          <h3 className="font-medium">
            Status: {status.isConnected ? "Connected" : "Disconnected"}
          </h3>
          {status.lastPing && (
            <p className="text-sm text-gray-500">
              Last ping: {status.lastPing.toLocaleString()}
            </p>
          )}
          {status.error && (
            <p className="text-sm text-red-500">{status.error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Main ManagerConnection Component
const ManagerConnection: React.FC = () => {
  const [token, setToken] = useState("");
  const [phoneNumberID, setPhoneNumberID] = useState("");
  const [connectionStatus, setConnectionStatus] = useState<StatusType>({
    isConnected: false,
    lastPing: null,
    error: null,
  });

  const handleConnect = async () => {
    if (token && phoneNumberID) {
      try {
        const response = await fetch(
          `https://graph.facebook.com/v17.0/${phoneNumberID}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const result = await response.json();
        if (response.ok) {
          setConnectionStatus({
            isConnected: true,
            lastPing: new Date(),
            error: null,
          });
        } else {
          setConnectionStatus({
            isConnected: false,
            lastPing: null,
            error: result.error?.message || "Unknown error",
          });
        }
      } catch (error) {
        if (error instanceof Error) {
          setConnectionStatus({
            isConnected: false,
            lastPing: null,
            error: error.message,
          });
        } else {
          setConnectionStatus({
            isConnected: false,
            lastPing: null,
            error: "An unknown error occurred",
          });
        }
      }
    }
  };

  const handleDisconnect = () => {
    setConnectionStatus({
      isConnected: false,
      lastPing: null,
      error: null,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Connection Management */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-bold mb-4">Gerenciar Conexão</h2>
          <div className="space-y-4">
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Digite o Token de Acesso"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={phoneNumberID}
              onChange={(e) => setPhoneNumberID(e.target.value)}
              placeholder="Digite o ID do Número de Telefone"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-4">
              <button
                onClick={handleConnect}
                className="flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
              >
                <PlugZap className="h-5 w-5" /> Verificar Conexão
              </button>
              <button
                onClick={handleDisconnect}
                className="flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                <LogOut className="h-5 w-5" /> Desconectar
              </button>
            </div>
          </div>
        </div>

        {/* Connection Status */}
        <ConnectionStatus status={connectionStatus} />
      </div>
    </div>
  );
};

export default ManagerConnection;
