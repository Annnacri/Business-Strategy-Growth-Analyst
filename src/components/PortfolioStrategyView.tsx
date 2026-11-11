import React, { useState } from "react";
import { BusinessOpportunity, DecisionStatus, SwotAnalysis as SwotAnalysisType } from "../types/strategy";
import { SwotAnalysis } from "./SwotAnalysis";

interface PortfolioStrategyViewProps {
  opportunities: BusinessOpportunity[];
  selectedOpportunity: BusinessOpportunity | null;
  onUpdateOpportunityStatus: (id: string, status: DecisionStatus) => void;
  onGenerateReportForProduct: (productName: string) => void;
  onUpdateSwot?: (productId: string, updatedSwot: SwotAnalysisType) => void;
}

export const PortfolioStrategyView: React.FC<PortfolioStrategyViewProps> = ({
  opportunities,
  selectedOpportunity,
  onUpdateOpportunityStatus,
  onGenerateReportForProduct,
  onUpdateSwot,
}) => {
  const [activeId, setActiveId] = useState<string>(
    selectedOpportunity?.id || opportunities[0]?.id || ""
  );

  const product = opportunities.find((o) => o.id === activeId) || opportunities[0];

  return (
    <div className="space-y-8">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-slate-400">ESTRATÉGIA DE PRODUTO & COMERCIAL</div>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-display">
            Análise Estratégica dos 6 Produtos do Portfólio
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Posicionamento comercial, diferenciação, modelos de precificação (setup + mensalidade), oportunidades de cross-selling e canais de distribuição.
          </p>
        </div>

        <button
          onClick={() => onGenerateReportForProduct(product.name)}
          className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto shadow-sm"
        >
          Gerar Relatório CEO deste Produto →
        </button>
      </div>

      {/* Product Selection Tab Strip */}
      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none border-b border-slate-800">
        {opportunities.map((opp) => {
          const isActive = opp.id === activeId;
          return (
            <button
              key={opp.id}
              onClick={() => setActiveId(opp.id)}
              className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-2 ${
                isActive
                  ? "bg-slate-800 text-white shadow-sm border border-slate-700"
                  : "bg-slate-900/40 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
              }`}
            >
              <span>{opp.name}</span>
              <span className="font-mono text-[11px] text-emerald-400 font-bold">
                {opp.totalScore}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Product Card */}
      {product && (
        <div className="space-y-6">
          {/* Header Card */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 sm:p-7 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="text-emerald-400 font-semibold">{product.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>Modelo: {product.businessModel}</span>
                  <span aria-hidden="true">·</span>
                  <span>Score: {product.totalScore}/100</span>
                </div>
                <h2 className="text-2xl font-bold text-white font-display">
                  {product.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                  {product.tagline}
                </p>
              </div>

              {/* Status and Action Buttons */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <div className="text-[11px] text-slate-400">Estado de Aprovação</div>
                  <div className="text-xs font-bold text-emerald-400 mt-0.5">
                    {product.status === "APPROVED" && "Aprovado pelo CEO"}
                    {product.status === "PENDING_CEO_APPROVAL" && "Aguardando Decisão do CEO"}
                    {product.status === "IN_REVISION" && "Em Revisão Estratégica"}
                  </div>
                </div>

                <div className="flex gap-1.5">
                  <button
                    onClick={() => onUpdateOpportunityStatus(product.id, "APPROVED")}
                    className={`px-3 py-1.5 text-xs rounded transition-colors ${
                      product.status === "APPROVED"
                        ? "bg-emerald-500 text-slate-950 font-bold"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    Aprovar
                  </button>
                  <button
                    onClick={() => onUpdateOpportunityStatus(product.id, "IN_REVISION")}
                    className={`px-3 py-1.5 text-xs rounded transition-colors ${
                      product.status === "IN_REVISION"
                        ? "bg-amber-500 text-slate-950 font-bold"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    Revisar
                  </button>
                </div>
              </div>
            </div>

            {/* Target Markets Badges */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2 text-xs">
              <span className="text-slate-400">Mercados Prioritários:</span>
              <div className="flex flex-wrap gap-2 text-slate-200">
                {product.targetMarket.map((m, i) => (
                  <span key={i} className="text-slate-300">
                    {m}{i < product.targetMarket.length - 1 ? " · " : ""}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 3-Column Detailed Strategy Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Col 1: Commercial Pricing & Packaging */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-4">
              <h3 className="text-sm font-semibold text-white font-display border-b border-slate-800 pb-2">
                Estratégia de Precificação & Modelo
              </h3>

              <div className="space-y-3 text-xs">
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80 space-y-1">
                  <div className="text-slate-400">Taxa de Setup Inicial:</div>
                  <div className="text-lg font-bold text-white font-mono tabular-nums">
                    €{product.financials.setupFee.toLocaleString("pt-PT")}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Cobre custos de onboarding, cardápios e parametrização.
                  </div>
                </div>

                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80 space-y-1">
                  <div className="text-slate-400">Mensalidade Recorrente (MRR):</div>
                  <div className="text-lg font-bold text-emerald-400 font-mono tabular-nums">
                    €{product.financials.monthlyRecurringPrice.toLocaleString("pt-PT")}/mês
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Fidelização de 12 meses com faturamento mensal antecipado.
                  </div>
                </div>

                <div className="space-y-1 pt-1">
                  <div className="font-medium text-slate-300">Oportunidades de Upsell & Cross-Sell:</div>
                  <div className="text-slate-400 text-xs leading-relaxed">
                    {product.name === "AI Hotel Concierge" &&
                      "Integração com AI Tourguide Creator para passeios (+€150/mês); Módulo de comissão de reservas de restaurantes locais (10% rev-share)."}
                    {product.name === "AI Tourguide Creator" &&
                      "Pacote Enterprise para postos de turismo municipais com marca própria e suporte de tradução em tempo real."}
                    {product.name === "Custom AI Agents" &&
                      "Contratos de Suporte & SLA avançado de 24h (+€950/mês); Novos fluxos de automação faturados por sprint."}
                    {product.name === "NexusAIStore" &&
                      "Taxa de destaque na loja; Distribuição white-label personalizada para agências de marketing."}
                    {product.name === "Future AI Automation Solutions" &&
                      "Pacotes de minutos adicionais de telefonia/voz; Integração direta com CRM proprietário."}
                    {product.name === "Web3 & RWA Tokenization projects" &&
                      "Taxa de sucesso na liquidez secundária; Consultoria técnica contínua para investidores."}
                  </div>
                </div>
              </div>
            </div>

            {/* Col 2: Differentiation & Positioning */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-4">
              <h3 className="text-sm font-semibold text-white font-display border-b border-slate-800 pb-2">
                Diferenciação & Vantagem Competitiva
              </h3>

              <div className="space-y-2.5 text-xs">
                {product.differentiation.map((diff, index) => (
                  <div
                    key={index}
                    className="p-2.5 bg-slate-950/50 rounded-lg border border-slate-800/60 text-slate-300 leading-relaxed"
                  >
                    <span className="text-emerald-400 font-bold mr-1.5">{index + 1}.</span>
                    {diff}
                  </div>
                ))}
              </div>

              <div className="pt-2 text-xs space-y-1">
                <div className="font-medium text-slate-300">Canais de Distribuição Prioritários:</div>
                <ul className="list-disc list-inside text-slate-400 space-y-1">
                  {product.distributionChannels.map((ch, i) => (
                    <li key={i}>{ch}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Col 3: Commercial Risks & Mitigations */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-4">
              <h3 className="text-sm font-semibold text-white font-display border-b border-slate-800 pb-2">
                Riscos Comerciais & Mitigações
              </h3>

              <div className="space-y-3 text-xs">
                {product.commercialRisks.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-950/50 rounded-lg border border-slate-800/80 space-y-1.5"
                  >
                    <div className="text-amber-400 font-medium">Risco {idx + 1}: {item.risk}</div>
                    <div className="text-slate-400 leading-relaxed">
                      <span className="text-slate-300 font-semibold">Mitigação: </span>
                      {item.mitigation}
                    </div>
                  </div>
                ))}

                <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                  <div className="text-slate-300 font-semibold">Diretiva do Analista:</div>
                  <div>
                    {product.ceoRecommendationSummary}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SWOT Analysis Visual Breakdown Component */}
          <SwotAnalysis
            product={product}
            onUpdateSwot={onUpdateSwot}
          />
        </div>
      )}
    </div>
  );
};
