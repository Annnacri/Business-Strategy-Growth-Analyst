import React, { useState } from "react";
import { SupportedLanguage } from "../types/strategy";

interface Message {
  sender: "user" | "agent";
  text: string;
  time: string;
}

interface StrategicAdvisorViewProps {
  language: SupportedLanguage;
}

export const StrategicAdvisorView: React.FC<StrategicAdvisorViewProps> = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "agent",
      text: "Olá, Senhor CEO. Sou o Agent 04 — Business Strategy & Growth Analyst.\n\nEstou à sua disposição para analisar novos modelos de negócio, estruturar precificações por setup e recorrência, validar mercados internacionais (Portugal, UE, Reino Unido, EUA e Golfo) e avaliar unit economics dos nossos produtos.\n\nQual oportunidade ou decisão estratégica gostaria de submeter para análise hoje?",
      time: "09:00",
    },
  ]);

  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [contextProduct, setContextProduct] = useState<string>("AI Hotel Concierge");
  const [targetMarket, setTargetMarket] = useState<string>("Portugal & Dubai");

  const quickPrompts = [
    "Qual a estrutura ideal de setup fee e recorrência para o AI Hotel Concierge no Dubai?",
    "Como podemos acelerar o break-even em Portugal com hotéis boutique?",
    "Vale a pena investir no NexusAIStore agora ou focar em Custom AI Agents?",
    "Quais as salvaguardas para projetos Web3 & RWA sem risco regulatório na UE?",
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      sender: "user",
      text,
      time: new Date().toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/strategy/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newHistory,
          contextProduct,
          targetMarket,
        }),
      });
      const data = await res.json();

      const agentReply: Message = {
        sender: "agent",
        text: data.reply || "Análise concluída pelo Agent 04.",
        time: new Date().toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, agentReply]);
    } catch (err) {
      console.error("Chat error:", err);
      const fallbackReply: Message = {
        sender: "agent",
        text: "Houve um erro temporário na conexão com o modelo de inteligência. Recomendo consultar a aba 'Relatórios ao CEO' para visualizar as análises pré-estruturadas.",
        time: new Date().toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-slate-400">CONSULTORIA ESTRATÉGICA DIRETA AO CEO</div>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-display">
            Diálogo Executivo com o Agent 04
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Sessão interativa de consultoria de crescimento, análise de precificação, trade-offs de investimento e validação de hipóteses comerciais com pensamento de consultor sênior.
          </p>
        </div>

        {/* Context Selectors */}
        <div className="flex items-center gap-2 text-xs self-start sm:self-auto">
          <select
            value={contextProduct}
            onChange={(e) => setContextProduct(e.target.value)}
            className="bg-slate-900 text-slate-300 border border-slate-800 rounded px-2.5 py-1.5 focus:outline-none focus:border-emerald-500"
          >
            <option value="AI Hotel Concierge">Foco: AI Hotel Concierge</option>
            <option value="AI Tourguide Creator">Foco: AI Tourguide Creator</option>
            <option value="Custom AI Agents">Foco: Custom AI Agents</option>
            <option value="NexusAIStore">Foco: NexusAIStore</option>
            <option value="Web3 & RWA">Foco: Web3 & RWA</option>
            <option value="Future AI Automation">Foco: Future AI Automation</option>
          </select>
        </div>
      </div>

      {/* Main Chat Layout */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-[600px]">
        {/* Messages Container */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {messages.map((m, idx) => {
            const isUser = m.sender === "user";
            return (
              <div
                key={idx}
                className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
              >
                <div className="text-[10px] text-slate-500 mb-1 px-1">
                  {isUser ? "Você (CEO)" : "Agent 04 (Business Strategy Analyst)"} · {m.time}
                </div>
                <div
                  className={`max-w-2xl rounded-xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                    isUser
                      ? "bg-emerald-600 text-white font-medium"
                      : "bg-slate-950/80 border border-slate-800/80 text-slate-200"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-emerald-400 p-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>O Agent 04 está estruturando a análise estratégica...</span>
            </div>
          )}
        </div>

        {/* Quick Prompts Strip */}
        <div className="p-3 bg-slate-950/60 border-t border-slate-800/80 flex overflow-x-auto gap-2 scrollbar-none">
          {quickPrompts.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(q)}
              className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg whitespace-nowrap transition-colors shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Message Input Form */}
        <div className="p-4 bg-slate-950 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua dúvida estratégica, modelo de precificação ou hipótese para o Agent 04..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 placeholder:text-slate-500"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 text-slate-950 font-bold text-xs sm:text-sm rounded-lg transition-colors whitespace-nowrap"
            >
              Consultar
            </button>
          </form>
          <div className="text-[10px] text-slate-500 mt-2 text-center">
            Nota de Governança: O Agent 04 avalia e recomenda de forma autônoma. Decisões consequentes e compromissos comerciais exigem aprovação humana.
          </div>
        </div>
      </div>
    </div>
  );
};
