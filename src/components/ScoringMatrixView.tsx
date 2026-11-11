import React, { useState } from "react";
import { BusinessOpportunity, OpportunityScore } from "../types/strategy";

interface ScoringMatrixViewProps {
  opportunities: BusinessOpportunity[];
  onUpdateOpportunityScore: (id: string, scores: OpportunityScore) => void;
  onAddOpportunity: (newOpp: BusinessOpportunity) => void;
}

export const ScoringMatrixView: React.FC<ScoringMatrixViewProps> = ({
  opportunities,
  onUpdateOpportunityScore,
  onAddOpportunity,
}) => {
  const [selectedOppId, setSelectedOppId] = useState<string>(opportunities[0]?.id || "");
  const [isAiEvaluating, setIsAiEvaluating] = useState<boolean>(false);
  const [showNewModal, setShowNewModal] = useState<boolean>(false);

  // Form state for evaluating new opportunity with AI
  const [newOppForm, setNewOppForm] = useState({
    name: "",
    category: "Hospitality AI" as BusinessOpportunity["category"],
    targetMarket: "Portugal & Dubai (UAE)",
    businessModel: "B2B SaaS + Setup" as BusinessOpportunity["businessModel"],
    devBudget: "€3.500",
    targetPrice: "€1.990 setup + €490/mês",
    description: "",
  });

  const selectedOpp = opportunities.find((o) => o.id === selectedOppId) || opportunities[0];

  const handleScoreChange = (field: keyof OpportunityScore, value: number) => {
    if (!selectedOpp) return;
    const updatedScores = {
      ...selectedOpp.scores,
      [field]: value,
    };
    onUpdateOpportunityScore(selectedOpp.id, updatedScores);
  };

  const handleEvaluateWithAi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOppForm.name) return;

    setIsAiEvaluating(true);
    try {
      const res = await fetch("/api/strategy/evaluate-opportunity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOppForm),
      });
      const data = await res.json();

      if (data.success && data.evaluation) {
        const evalData = data.evaluation;
        const total =
          (evalData.scores?.marketDemand || 15) +
          (evalData.scores?.revenuePotential || 15) +
          (evalData.scores?.profitability || 15) +
          (evalData.scores?.implementationFeasibility || 12) +
          (evalData.scores?.scalability || 12) +
          (evalData.scores?.competitiveAdvantage || 7);

        const newOpp: BusinessOpportunity = {
          id: `opp-${Date.now()}`,
          name: newOppForm.name,
          category: newOppForm.category,
          tagline: newOppForm.description || "Nova oportunidade analisada pelo Agent 04",
          targetMarket: newOppForm.targetMarket.split(",").map((s) => s.trim()),
          businessModel: newOppForm.businessModel,
          scores: {
            marketDemand: evalData.scores?.marketDemand || 16,
            revenuePotential: evalData.scores?.revenuePotential || 16,
            profitability: evalData.scores?.profitability || 16,
            implementationFeasibility: evalData.scores?.implementationFeasibility || 12,
            scalability: evalData.scores?.scalability || 12,
            competitiveAdvantage: evalData.scores?.competitiveAdvantage || 7,
          },
          totalScore: total,
          priority: total >= 80 ? "HIGH_PRIORITY" : total >= 65 ? "MODERATE_PRIORITY" : "LOW_PRIORITY",
          financials: {
            initialDevCost: 3500,
            monthlyOpexPerClient: 50,
            estimatedCAC: 700,
            setupFee: 1990,
            monthlyRecurringPrice: 490,
            targetGrossMargin: 82,
            breakEvenClients: 5,
            estimatedTimeToBreakEvenMonths: 4,
            mrrMonth6Estimate: 7500,
            isEstimate: true,
          },
          differentiation: [
            "Avaliação inicial gerada pelo Agent 04 com base no modelo de rentabilidade recorrente",
          ],
          commercialRisks: (evalData.commercialRisks || []).map((r: string) => ({
            risk: r,
            mitigation: "Acompanhar métricas de retenção no primeiro ciclo de 90 dias.",
          })),
          distributionChannels: ["Vendas diretas B2B e canais de parcerias"],
          ceoRecommendationSummary: evalData.strategicRecommendation || "Submetido à revisão do CEO.",
          status: "PENDING_CEO_APPROVAL",
        };

        onAddOpportunity(newOpp);
        setSelectedOppId(newOpp.id);
        setShowNewModal(false);
      }
    } catch (err) {
      console.error("Failed to evaluate with AI:", err);
    } finally {
      setIsAiEvaluating(false);
    }
  };

  const getPriorityLabel = (score: number) => {
    if (score >= 80) return { label: "ALTA PRIORIDADE COMERCIAL (Investir / Pilotar)", color: "text-emerald-400" };
    if (score >= 65) return { label: "PRIORIDADE MODERADA (Refinar Modelo / Validar)", color: "text-amber-400" };
    return { label: "DEPRIORIZAR (Alto Risco / Baixa Recorrência)", color: "text-rose-400" };
  };

  return (
    <div className="space-y-8">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-slate-400">DECISION FRAMEWORK OFICIAL</div>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-display">
            Matriz de Decisão & Pontuação (0 a 100 Pontos)
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Framework estrito que pondera Demanda (20), Receita (20), Rentabilidade (20), Viabilidade (15), Escalabilidade (15) e Diferenciação (10). Prioriza investimentos contidos e alta previsibilidade de receita recorrente.
          </p>
        </div>

        <button
          onClick={() => setShowNewModal(true)}
          className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto shadow-sm"
        >
          + Submeter Nova Ideia para Pontuação
        </button>
      </div>

      {/* Main Two-Column Scoring Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (5 Cols): Product Selector List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-semibold text-slate-400 px-1">
            Selecione uma Oportunidade para Analisar:
          </div>
          <div className="space-y-2">
            {opportunities.map((opp) => {
              const isSelected = opp.id === selectedOppId;
              const { label, color } = getPriorityLabel(opp.totalScore);
              return (
                <div
                  key={opp.id}
                  onClick={() => setSelectedOppId(opp.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? "bg-slate-900 border-emerald-500/80 shadow-md"
                      : "bg-slate-900/40 border-slate-800/80 hover:bg-slate-800/40 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white truncate max-w-[220px]">
                      {opp.name}
                    </span>
                    <span className="font-mono tabular-nums text-sm font-bold text-white">
                      {opp.totalScore}
                      <span className="text-xs text-slate-500 font-normal">/100</span>
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                    {opp.tagline}
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-800/60 text-[11px]">
                    <span className="text-slate-400">{opp.businessModel}</span>
                    <span className={`font-medium ${color}`}>{opp.priority === "HIGH_PRIORITY" ? "Alta Prioridade" : opp.priority === "MODERATE_PRIORITY" ? "Moderada" : "Baixa"}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (7 Cols): Interactive Score Sliders & Breakdown */}
        <div className="lg:col-span-7">
          {selectedOpp ? (
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-6">
              {/* Product Title & Total Score */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-800 gap-4">
                <div>
                  <div className="text-xs text-emerald-400 font-semibold">
                    {selectedOpp.category} · {selectedOpp.businessModel}
                  </div>
                  <h2 className="text-lg font-bold text-white font-display mt-0.5">
                    {selectedOpp.name}
                  </h2>
                </div>

                <div className="text-right">
                  <div className="text-xs text-slate-400">Score Total Calculado</div>
                  <div className="text-3xl font-extrabold font-mono tabular-nums text-emerald-400">
                    {selectedOpp.totalScore}
                    <span className="text-sm text-slate-500 font-normal"> / 100</span>
                  </div>
                </div>
              </div>

              {/* Priority Verdict Banner */}
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3.5 flex items-center justify-between gap-4">
                <div className="text-xs">
                  <span className="text-slate-400">Veredicto do Agent 04: </span>
                  <span className={`font-semibold ${getPriorityLabel(selectedOpp.totalScore).color}`}>
                    {getPriorityLabel(selectedOpp.totalScore).label}
                  </span>
                </div>
                <div className="text-xs text-slate-400 font-mono tabular-nums shrink-0">
                  Setup: €{selectedOpp.financials.setupFee} · Recorrente: €{selectedOpp.financials.monthlyRecurringPrice}/mês
                </div>
              </div>

              {/* Interactive Criteria Sliders */}
              <div className="space-y-4">
                <div className="text-xs font-semibold text-slate-300">
                  Calibração dos 6 Critérios do Framework:
                </div>

                {/* 1. Demanda de Mercado (max 20) */}
                <div className="space-y-1.5 bg-slate-900/40 p-3.5 rounded-lg border border-slate-800/60">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-200">
                      1. Demanda de Mercado (peso máx: 20 pts)
                    </span>
                    <span className="font-mono tabular-nums text-emerald-400 font-bold">
                      {selectedOpp.scores.marketDemand} / 20
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={selectedOpp.scores.marketDemand}
                    onChange={(e) => handleScoreChange("marketDemand", parseInt(e.target.value))}
                    className="w-full accent-emerald-400 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-[11px] text-slate-500">
                    Urgência de dor do cliente, tamanho de mercado endereçável (TAM) e tração inicial.
                  </div>
                </div>

                {/* 2. Potencial de Receita (max 20) */}
                <div className="space-y-1.5 bg-slate-900/40 p-3.5 rounded-lg border border-slate-800/60">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-200">
                      2. Potencial de Receita (peso máx: 20 pts)
                    </span>
                    <span className="font-mono tabular-nums text-emerald-400 font-bold">
                      {selectedOpp.scores.revenuePotential} / 20
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={selectedOpp.scores.revenuePotential}
                    onChange={(e) => handleScoreChange("revenuePotential", parseInt(e.target.value))}
                    className="w-full accent-emerald-400 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-[11px] text-slate-500">
                    Capacidade de gerar receita recorrente previsível (MRR/ARR) e valor médio do contrato (ARPU).
                  </div>
                </div>

                {/* 3. Rentabilidade / Margens (max 20) */}
                <div className="space-y-1.5 bg-slate-900/40 p-3.5 rounded-lg border border-slate-800/60">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-200">
                      3. Rentabilidade & Margens Brutas (peso máx: 20 pts)
                    </span>
                    <span className="font-mono tabular-nums text-emerald-400 font-bold">
                      {selectedOpp.scores.profitability} / 20
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={selectedOpp.scores.profitability}
                    onChange={(e) => handleScoreChange("profitability", parseInt(e.target.value))}
                    className="w-full accent-emerald-400 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-[11px] text-slate-500">
                    Margem bruta esperada (&gt;80% para SaaS) e cobertura de custos de onboarding via setup fee.
                  </div>
                </div>

                {/* 4. Viabilidade de Implementação (max 15) */}
                <div className="space-y-1.5 bg-slate-900/40 p-3.5 rounded-lg border border-slate-800/60">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-200">
                      4. Viabilidade de Implementação (peso máx: 15 pts)
                    </span>
                    <span className="font-mono tabular-nums text-emerald-400 font-bold">
                      {selectedOpp.scores.implementationFeasibility} / 15
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="15"
                    value={selectedOpp.scores.implementationFeasibility}
                    onChange={(e) => handleScoreChange("implementationFeasibility", parseInt(e.target.value))}
                    className="w-full accent-emerald-400 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-[11px] text-slate-500">
                    Velocidade de go-to-market, dependência técnica, integrações com PMS/APIs legadas.
                  </div>
                </div>

                {/* 5. Escalabilidade (max 15) */}
                <div className="space-y-1.5 bg-slate-900/40 p-3.5 rounded-lg border border-slate-800/60">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-200">
                      5. Escalabilidade (peso máx: 15 pts)
                    </span>
                    <span className="font-mono tabular-nums text-emerald-400 font-bold">
                      {selectedOpp.scores.scalability} / 15
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="15"
                    value={selectedOpp.scores.scalability}
                    onChange={(e) => handleScoreChange("scalability", parseInt(e.target.value))}
                    className="w-full accent-emerald-400 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-[11px] text-slate-500">
                    Capacidade de expansão para novos hotéis ou cidades sem custo marginal de pessoal proporcional.
                  </div>
                </div>

                {/* 6. Vantagem Competitiva (max 10) */}
                <div className="space-y-1.5 bg-slate-900/40 p-3.5 rounded-lg border border-slate-800/60">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-200">
                      6. Vantagem Competitiva & Diferenciação (peso máx: 10 pts)
                    </span>
                    <span className="font-mono tabular-nums text-emerald-400 font-bold">
                      {selectedOpp.scores.competitiveAdvantage} / 10
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={selectedOpp.scores.competitiveAdvantage}
                    onChange={(e) => handleScoreChange("competitiveAdvantage", parseInt(e.target.value))}
                    className="w-full accent-emerald-400 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-[11px] text-slate-500">
                    Suporte nativo multilíngue (ex: Árabe fluente), facilidade sem app, barreira de entrada.
                  </div>
                </div>
              </div>

              {/* Strategic Directive Summary */}
              <div className="pt-4 border-t border-slate-800 text-xs space-y-2">
                <div className="text-slate-400 font-semibold">Resumo da Recomendação ao CEO:</div>
                <div className="text-slate-300 bg-slate-950/40 p-3 rounded-lg border border-slate-800/80 leading-relaxed">
                  {selectedOpp.ceoRecommendationSummary}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-8 text-center text-slate-400 text-xs">
              Selecione uma oportunidade à esquerda para inspecionar ou ajustar.
            </div>
          )}
        </div>
      </div>

      {/* Modal for Submitting New Opportunity to Agent 04 AI */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white font-display">
                Submeter Nova Ideia para Avaliação do Agent 04
              </h3>
              <button
                onClick={() => setShowNewModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEvaluateWithAi} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Nome do Produto / Oportunidade:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: AI Event Planner & Banqueting Assistant"
                  value={newOppForm.name}
                  onChange={(e) => setNewOppForm({ ...newOppForm, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Categoria:</label>
                  <select
                    value={newOppForm.category}
                    onChange={(e) =>
                      setNewOppForm({
                        ...newOppForm,
                        category: e.target.value as BusinessOpportunity["category"],
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Hospitality AI">Hospitality AI</option>
                    <option value="Creator Economy">Creator Economy</option>
                    <option value="Marketplace & White-Label">Marketplace & White-Label</option>
                    <option value="B2B Custom Agents">B2B Custom Agents</option>
                    <option value="Web3 / RWA">Web3 / RWA</option>
                    <option value="Automation Pipelines">Automation Pipelines</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Modelo de Negócio:</label>
                  <select
                    value={newOppForm.businessModel}
                    onChange={(e) =>
                      setNewOppForm({
                        ...newOppForm,
                        businessModel: e.target.value as BusinessOpportunity["businessModel"],
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="B2B SaaS + Setup">B2B SaaS + Setup</option>
                    <option value="White-Label Licensing">White-Label Licensing</option>
                    <option value="Revenue Share">Revenue Share</option>
                    <option value="High-Ticket Retainer">High-Ticket Retainer</option>
                    <option value="Syndicate Success Fee">Syndicate Success Fee</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Mercado-Alvo:</label>
                  <input
                    type="text"
                    value={newOppForm.targetMarket}
                    onChange={(e) => setNewOppForm({ ...newOppForm, targetMarket: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Preço Almejado:</label>
                  <input
                    type="text"
                    value={newOppForm.targetPrice}
                    onChange={(e) => setNewOppForm({ ...newOppForm, targetPrice: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Descrição da Solução & Proposta de Valor:
                </label>
                <textarea
                  rows={3}
                  placeholder="Explique o problema resolvido, a diferenciação e quem toma a decisão de compra..."
                  value={newOppForm.description}
                  onChange={(e) => setNewOppForm({ ...newOppForm, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-white focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-3 py-2 text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isAiEvaluating}
                  className="px-4 py-2 bg-emerald-400 text-slate-950 font-semibold rounded-md hover:bg-emerald-300 disabled:opacity-50 transition-colors shadow-sm"
                >
                  {isAiEvaluating ? "Avaliação em Curso..." : "Calcular Score 0-100 com IA"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
