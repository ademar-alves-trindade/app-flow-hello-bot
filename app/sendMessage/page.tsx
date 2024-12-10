"use client";

import { useState } from "react";

export default function SendMessage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [messageTemplate, setMessageTemplate] = useState("hello_world");
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    const WHATSAPP_API_URL =
      "https://graph.facebook.com/v16.0/416696148203445/messages";
    const ACCESS_TOKEN =
      "EAAM283mZALTwBOwYntyb6uhzSQgqkb7kxWi8CgbipzQfizcXro7dwsPnaZABt7JunPN2hVN9UL9cQLQmpczYcSBUZBG1FKkjOlZBuDJ4zZBl2RyjmsxR7e9pwJ9iJC7suhCXZAcgtRumdN7hbDcAAy3osYjp8KfKG6ZBCTfiNGisE6JsFRet4a2Rh34AZAmc8alX8IH3T6iDcSkPbAx1c3NJiI5w2SfoDLJZAUWsZD"; // Insira seu token de acesso

    try {
      const res = await fetch(WHATSAPP_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: phoneNumber,
          type: "template",
          template: {
            name: messageTemplate,
            language: {
              code: "en_US",
            },
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Resposta da API:", data); // Usar a variável data para registrar a resposta no console
        setResponseMessage("Mensagem enviada com sucesso!");
        setErrorMessage("");
      } else {
        const errorData = await res.json();
        setErrorMessage(errorData.error || "Falha ao enviar mensagem");
        setResponseMessage("");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Ocorreu um erro inesperado");
      setResponseMessage("");
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>API WhatsApp - Enviar Mensagem</h1>
      <form onSubmit={sendMessage} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Número de Telefone:
            <input
              type="text"
              placeholder="+5565984263599"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              style={{ marginLeft: "10px", padding: "5px", width: "300px" }}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Modelo de Mensagem:
            <select
              value={messageTemplate}
              onChange={(e) => setMessageTemplate(e.target.value)}
              style={{ marginLeft: "10px", padding: "5px" }}
            >
              <option value="hello_world">Hello World</option>
              {/* Adicione outros modelos disponíveis aqui */}
            </select>
          </label>
        </div>
        <button
          type="submit"
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          Enviar Mensagem
        </button>
      </form>
      {responseMessage && <p style={{ color: "green" }}>{responseMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
}
