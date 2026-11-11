import React, { useState } from "react";
import { BusinessOpportunity, SwotAnalysis as SwotAnalysisType, SwotItem } from "../types/strategy";
import { PRODUCT_SWOT_MAP } from "../data/swotData";

interface SwotAnalysisProps {
  product: BusinessOpportunity;
  onUpdateSwot?: (productId: string, updatedSwot: SwotAnalysisType) => void;
}

type SwotCategory = "all" | "strengths" | "weaknesses" | "opportunities" | "threats";
type ViewMode = "matrix" | "cards";

export const SwotAnalysis: React.FC<SwotAnalysisProps> = ({ product, onUpdateSwot }) => {
  const [activeCategory, setActiveCategory] = useState<SwotCategory>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("matrix");
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [modalCategory, setModalCategory] = useState<"strengths" | "weaknesses" | "opportunities" | "threats">("strengths");
  const [newPoint, setNewPoint] = useState<string>("");
  const [newImplication, setNewImplication] = useState<string>("");
  const [newImpact, setNewImpact] = useState<"Alto" | "Médio" | "Crítico">("Alto");

  // Local state for SWOT or fall back to pre-defined map or product.swot
  const currentSwot: SwotAnalysisType =
    product.swot || PRODUCT_SWOT_MAP[product.id] || {
      strengths: [
        {
          id: "s-def",
          point: "Alinhamento com arquitetura de alta recorrência (SaaS B2B).",
          impact: "Alto",
          strategicImplication: "Garante previsibilidade de fluxo de caixa.",
        },
      ],
      weaknesses: [
        {
          id: "w-def",
          point: "Dependência de validação comercial em campo.",
          impact: "Médio",
          strategicImplication: "Exige pilotos de curta duração.",
        },
      ],
      opportunities: [
        {
          id: "o-def",
          point: "Expansão para mercados internacionais de alto poder de compra.",
          impact: "Crítico",
          strategicImplication: "Acelera amortização de custos de engenharia.",
        },
      ],
      threats: [
        {
          id: "t-def",
          point: "Entrada de novos concorrentes com ferramentas genéricas.",
          impact: "Alto",
          strategicImplication: "Manter diferenciação em contexto cultural e integrações.",
        },
      ],
    };

  const handleAddSwotItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPoint.trim()) return;

    const newItem: SwotItem = {
      id: `swot-${Date.now()}`,
      point: newPoint.trim(),
      impact: newImpact,
      strategicImplication: newImplication.trim() || undefined,
    };

    const updated: SwotAnalysisType = {
      ...currentSwot,
      [modalCategory]: [...currentSwot[modalCategory], newItem],
    };

    if (onUpdateSwot) {
      onUpdateSwot(product.id, updated);
    }

    setNewPoint("");
    setNewImplication("");
    setShowAddModal(false);
  };

  const totalFactors =
    currentSwot.strengths.length +
    currentSwot.weaknesses.length +
    currentSwot.opportunities.length +
    currentSwot.threats.length;

  const internalCount = currentSwot.strengths.length + currentSwot.weaknesses.length;
  const externalCount = currentSwot.opportunities.length + currentSwot.threats.length;

  const getImpactColor = (impact: "Alto" | "Médio" | "Crítico") => {
    switch (impact) {
      case "Crítico":
        return "text-rose-400";
      case "Alto":
        return "text-amber-400";
      case "Médio":
        return "text-slate-400";
    }
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 sm:p-7 space-y-6">
      {/* Top Header & Strategic Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="text-emerald-400 font-semibold">DIAGNÓSTICO ESTRATÉGICO SWOT</span>
            <span aria-hidden="true">·</span>
            <span>{product.name}</span>
            <span aria-hidden="true">·</span>
            <span>{totalFactors} Fatores Mapeados</span>
          </div>
          <h3 className="text-xl font-bold text-white font-display mt-0.5">
            Análise SWOT — Forças, Fraquezas, Oportunidades & Ameaças
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Avaliação multidimensional cruzando capacidades internas da empresa com dinâmicas externas dos mercados de Portugal, UE, Reino Unido e Golfo.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
          {/* View Mode Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-slate-950/80 rounded-lg border border-slate-800">
            <button
              onClick={() => setViewMode("matrix")}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                viewMode === "matrix"
                  ? "bg-slate-800 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Matriz 2×2
            </button>
            <button
              onClick={() => setViewMode("cards")}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                viewMode === "cards"
                  ? "bg-slate-800 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Lista Detalhada
            </button>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap shadow-sm"
          >
            + Adicionar Fator
          </button>
        </div>
      </div>

      {/* Strategic Balance Strip (Internal vs External) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-800/80 space-y-1">
          <div className="text-slate-400">Origem Interna</div>
          <div className="text-base font-bold text-white font-mono tabular-nums">
            {internalCount} Fatores
          </div>
          <div className="text-[11px] text-slate-500">Forças & Fraquezas da Solução</div>
        </div>

        <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-800/80 space-y-1">
          <div className="text-slate-400">Origem Externa</div>
          <div className="text-base font-bold text-emerald-400 font-mono tabular-nums">
            {externalCount} Fatores
          </div>
          <div className="text-[11px] text-slate-500">Oportunidades & Riscos de Mercado</div>
        </div>

        <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-800/80 space-y-1">
          <div className="text-slate-400">Fatores de Impacto Crítico</div>
          <div className="text-base font-bold text-rose-400 font-mono tabular-nums">
            {[...currentSwot.strengths, ...currentSwot.weaknesses, ...currentSwot.opportunities, ...currentSwot.threats].filter(
              (i) => i.impact === "Crítico"
            ).length} Alertas
          </div>
          <div className="text-[11px] text-slate-500">Exigem Decisão do CEO</div>
        </div>

        <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-800/80 space-y-1">
          <div className="text-slate-400">Postura Estratégica</div>
          <div className="text-base font-bold text-emerald-400 font-display">
            {currentSwot.strengths.length >= currentSwot.weaknesses.length ? "Ofensiva / Escala" : "Mitigação"}
          </div>
          <div className="text-[11px] text-slate-500">Vantagem Competitiva Sólida</div>
        </div>
      </div>

      {/* Category Filter Tabs (Interactive filter buttons) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            activeCategory === "all"
              ? "bg-slate-800 text-white font-medium shadow-sm"
              : "text-slate-400 hover:text-white bg-slate-950/40"
          }`}
        >
          Todos os Quadrantes ({totalFactors})
        </button>
        <button
          onClick={() => setActiveCategory("strengths")}
          className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            activeCategory === "strengths"
              ? "bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 font-medium"
              : "text-slate-400 hover:text-emerald-400 bg-slate-950/40"
          }`}
        >
          <span>Forças (Strengths)</span>
          <span className="font-mono text-[11px]">({currentSwot.strengths.length})</span>
        </button>
        <button
          onClick={() => setActiveCategory("weaknesses")}
          className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            activeCategory === "weaknesses"
              ? "bg-amber-950/80 text-amber-300 border border-amber-800/60 font-medium"
              : "text-slate-400 hover:text-amber-400 bg-slate-950/40"
          }`}
        >
          <span>Fraquezas (Weaknesses)</span>
          <span className="font-mono text-[11px]">({currentSwot.weaknesses.length})</span>
        </button>
        <button
          onClick={() => setActiveCategory("opportunities")}
          className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            activeCategory === "opportunities"
              ? "bg-sky-950/80 text-sky-300 border border-sky-800/60 font-medium"
              : "text-slate-400 hover:text-sky-400 bg-slate-950/40"
          }`}
        >
          <span>Oportunidades (Opportunities)</span>
          <span className="font-mono text-[11px]">({currentSwot.opportunities.length})</span>
        </button>
        <button
          onClick={() => setActiveCategory("threats")}
          className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            activeCategory === "threats"
              ? "bg-rose-950/80 text-rose-300 border border-rose-800/60 font-medium"
              : "text-slate-400 hover:text-rose-400 bg-slate-950/40"
          }`}
        >
          <span>Ameaças (Threats)</span>
          <span className="font-mono text-[11px]">({currentSwot.threats.length})</span>
        </button>
      </div>

      {/* Main Grid: 2x2 Matrix Layout */}
      <div
        className={
          viewMode === "matrix"
            ? "grid grid-cols-1 md:grid-cols-2 gap-5"
            : "grid grid-cols-1 gap-5"
        }
      >
        {/* Quadrant 1: Forças (Strengths) */}
        {(activeCategory === "all" || activeCategory === "strengths") && (
          <div className="bg-slate-950/60 border border-emerald-900/40 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-2.5 border-b border-emerald-900/30">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <h4 className="text-sm font-bold text-white font-display">
                  FORÇAS (Strengths)
                </h4>
              </div>
              <span className="text-[11px] text-emerald-400 font-mono">
                {currentSwot.strengths.length} {currentSwot.strengths.length === 1 ? "fator" : "fatores"}
              </span>
            </div>

            <div className="space-y-3">
              {currentSwot.strengths.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="p-3 bg-slate-900/70 border border-emerald-900/30 rounded-lg space-y-1.5"
                >
                  <div className="flex items-start justify-between gap-3 text-xs">
                    <span className="text-slate-200 font-medium leading-relaxed">
                      {item.point}
                    </span>
                    <span className={`text-[10px] font-semibold whitespace-nowrap ${getImpactColor(item.impact)}`}>
                      · {item.impact}
                    </span>
                  </div>
                  {item.strategicImplication && (
                    <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/60 leading-relaxed">
                      <span className="text-emerald-400 font-semibold">Implicação Estratégica: </span>
                      {item.strategicImplication}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quadrant 2: Fraquezas (Weaknesses) */}
        {(activeCategory === "all" || activeCategory === "weaknesses") && (
          <div className="bg-slate-950/60 border border-amber-900/40 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-2.5 border-b border-amber-900/30">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <h4 className="text-sm font-bold text-white font-display">
                  FRAQUEZAS (Weaknesses)
                </h4>
              </div>
              <span className="text-[11px] text-amber-400 font-mono">
                {currentSwot.weaknesses.length} {currentSwot.weaknesses.length === 1 ? "fator" : "fatores"}
              </span>
            </div>

            <div className="space-y-3">
              {currentSwot.weaknesses.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="p-3 bg-slate-900/70 border border-amber-900/30 rounded-lg space-y-1.5"
                >
                  <div className="flex items-start justify-between gap-3 text-xs">
                    <span className="text-slate-200 font-medium leading-relaxed">
                      {item.point}
                    </span>
                    <span className={`text-[10px] font-semibold whitespace-nowrap ${getImpactColor(item.impact)}`}>
                      · {item.impact}
                    </span>
                  </div>
                  {item.strategicImplication && (
                    <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/60 leading-relaxed">
                      <span className="text-amber-400 font-semibold">Plano de Mitigação: </span>
                      {item.strategicImplication}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quadrant 3: Oportunidades (Opportunities) */}
        {(activeCategory === "all" || activeCategory === "opportunities") && (
          <div className="bg-slate-950/60 border border-sky-900/40 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-2.5 border-b border-sky-900/30">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                <h4 className="text-sm font-bold text-white font-display">
                  OPORTUNIDADES (Opportunities)
                </h4>
              </div>
              <span className="text-[11px] text-sky-400 font-mono">
                {currentSwot.opportunities.length} {currentSwot.opportunities.length === 1 ? "fator" : "fatores"}
              </span>
            </div>

            <div className="space-y-3">
              {currentSwot.opportunities.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="p-3 bg-slate-900/70 border border-sky-900/30 rounded-lg space-y-1.5"
                >
                  <div className="flex items-start justify-between gap-3 text-xs">
                    <span className="text-slate-200 font-medium leading-relaxed">
                      {item.point}
                    </span>
                    <span className={`text-[10px] font-semibold whitespace-nowrap ${getImpactColor(item.impact)}`}>
                      · {item.impact}
                    </span>
                  </div>
                  {item.strategicImplication && (
                    <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/60 leading-relaxed">
                      <span className="text-sky-400 font-semibold">Alavanca de Crescimento: </span>
                      {item.strategicImplication}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quadrant 4: Ameaças (Threats) */}
        {(activeCategory === "all" || activeCategory === "threats") && (
          <div className="bg-slate-950/60 border border-rose-900/40 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-2.5 border-b border-rose-900/30">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                <h4 className="text-sm font-bold text-white font-display">
                  AMEAÇAS (Threats)
                </h4>
              </div>
              <span className="text-[11px] text-rose-400 font-mono">
                {currentSwot.threats.length} {currentSwot.threats.length === 1 ? "fator" : "fatores"}
              </span>
            </div>

            <div className="space-y-3">
              {currentSwot.threats.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="p-3 bg-slate-900/70 border border-rose-900/30 rounded-lg space-y-1.5"
                >
                  <div className="flex items-start justify-between gap-3 text-xs">
                    <span className="text-slate-200 font-medium leading-relaxed">
                      {item.point}
                    </span>
                    <span className={`text-[10px] font-semibold whitespace-nowrap ${getImpactColor(item.impact)}`}>
                      · {item.impact}
                    </span>
                  </div>
                  {item.strategicImplication && (
                    <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/60 leading-relaxed">
                      <span className="text-rose-400 font-semibold">Salvaguarda Preventiva: </span>
                      {item.strategicImplication}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Synthesis Box for CEO Decision */}
      <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-lg text-xs space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-slate-300 font-semibold">Síntese Estratégica do Agent 04 para o CEO:</span>
          <span className="text-[11px] text-emerald-400 font-mono">Recomendação Acionável</span>
        </div>
        <p className="text-slate-300 leading-relaxed">
          {product.name === "AI Hotel Concierge" &&
            "A combinação de Força linguística (Árabe fluente e sem app) com a Oportunidade do mercado do Golfo compensa com folga a Fraqueza de adoção pelas equipas de receção. Recomendamos focar na cobrança de taxas de ativação antecipadas (€2.490) para amortizar os custos de onboarding no primeiro trimestre."}
          {product.name === "AI Tourguide Creator" &&
            "A grande alavanca é a sinergia direta com o Concierge: vender aos mesmos hotéis elimina o custo de aquisição e neutraliza a ameaça de guias tradicionais."}
          {product.name === "Custom AI Agents" &&
            "Utilizar o fluxo de caixa rápido deste serviço para financiar a expansão do portfólio SaaS, mantendo governança rígida para não sobrecarregar as horas dos engenheiros."}
          {product.name === "Future AI Automation Solutions" &&
            "Proposta de valor inquestionável na contenção de custos de mão de obra; estruturar precificação com franquia de minutos para blindar a margem operacional contra custos de APIs de voz."}
          {product.name === "NexusAIStore" &&
            "Priorizar modelo White-Label para agências de marketing, gerando receita de licenciamento previsível antes de investir em captação de tráfego aberto."}
          {product.name === "Web3 & RWA Tokenization projects" &&
            "Risco regulatório crítico na UE (MiCA). Restringir a prospecção a promotores no Dubai (VARA) e exigir honorários antecipados de €15.000 antes do desenvolvimento."}
        </p>
      </div>

      {/* Add Factor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="text-sm font-bold text-white font-display">
                Adicionar Ponto à Matriz SWOT
              </h4>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSwotItem} className="space-y-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Quadrante SWOT:
                </label>
                <select
                  value={modalCategory}
                  onChange={(e) =>
                    setModalCategory(
                      e.target.value as "strengths" | "weaknesses" | "opportunities" | "threats"
                    )
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="strengths">Força (Strengths)</option>
                  <option value="weaknesses">Fraqueza (Weaknesses)</option>
                  <option value="opportunities">Oportunidade (Opportunities)</option>
                  <option value="threats">Ameaça (Threats)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Nível de Impacto Estratégico:
                </label>
                <select
                  value={newImpact}
                  onChange={(e) =>
                    setNewImpact(e.target.value as "Alto" | "Médio" | "Crítico")
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Crítico">Crítico (Prioridade Imediata do CEO)</option>
                  <option value="Alto">Alto (Impacto Comercial Significativo)</option>
                  <option value="Médio">Médio (Fator Secundário / Operacional)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Descrição do Fator / Ponto:
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Ex: Excelente penetração em cadeias hoteleiras no Algarve..."
                  value={newPoint}
                  onChange={(e) => setNewPoint(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Implicação Estratégica / Ação Recomendada:
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex: Estruturar parceria com associação hoteleira regional..."
                  value={newImplication}
                  onChange={(e) => setNewImplication(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-400 text-slate-950 font-bold rounded hover:bg-emerald-300 transition-colors shadow-sm"
                >
                  Salvar Fator
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
