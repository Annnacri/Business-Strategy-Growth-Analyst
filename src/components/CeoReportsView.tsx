import React, { useState } from "react";
import { CeoReport, DecisionStatus, SupportedLanguage } from "../types/strategy";

interface CeoReportsViewProps {
  reports: CeoReport[];
  selectedReport: CeoReport | null;
  language: SupportedLanguage;
  onAddReport: (newReport: CeoReport) => void;
  onUpdateReportStatus: (id: string, status: DecisionStatus) => void;
  onToggleActionApproval: (reportId: string, actionId: string) => void;
}

export const CeoReportsView: React.FC<CeoReportsViewProps> = ({
  reports,
  selectedReport,
  language,
  onAddReport,
  onUpdateReportStatus,
  onToggleActionApproval,
}) => {
  const [activeReportId, setActiveReportId] = useState<string>(
    selectedReport?.id || reports[0]?.id || ""
  );

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [showGenerateModal, setShowGenerateModal] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  // Generator form
  const [genForm, setGenForm] = useState({
    productOrIdea: "AI Hotel Concierge",
    focusMarket: "Portugal & Dubai (UAE)",
    businessModel: "B2B SaaS + Setup Fee",
    targetPricing: "€2.490 setup + €490/mês",
  });

  const currentReport = reports.find((r) => r.id === activeReportId) || reports[0];

  const handleGenerateReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const res = await fetch("/api/strategy/generate-ceo-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...genForm,
          language: language,
        }),
      });
      const data = await res.json();

      if (data.success && data.reportMarkdown) {
        const newRep: CeoReport = {
          id: `rep-${Date.now()}`,
          title: `Relatório Estratégico: ${genForm.productOrIdea} (${genForm.focusMarket})`,
          date: new Date().toISOString().split("T")[0],
          productName: genForm.productOrIdea,
          targetMarket: genForm.focusMarket,
          status: "PENDING_CEO_APPROVAL",
          executiveSummary:
            "Análise executiva completa gerada pelo Agent 04. Recomenda a adoção do modelo de setup fee e assinatura recorrente para maximizar margens e previsibilidade de caixa.",
          bestOpportunities: [
            `Segmento premium de hospitalidade em ${genForm.focusMarket}.`,
            "Upsell de módulos complementares e parcerias de distribuição.",
          ],
          recommendedBusinessModel: genForm.businessModel,
          pricingStrategy: {
            setupFee: genForm.targetPricing.split("+")[0]?.trim() || "€2.500 setup",
            subscription: genForm.targetPricing.split("+")[1]?.trim() || "€490/mês",
            whiteLabelOrAddons: "Licenciamento de revenda para agências parceiras com 25% de comissão.",
          },
          financialProjections: {
            initialCost: "€3.500 (Estimativa Modelada)",
            monthlyOpex: "€45/mês por cliente (Estimativa)",
            estimatedCac: "€650 (Estimativa)",
            grossMargin: "85%",
            breakEven: "5 clientes",
            projectedMrr6M: "€8.500 MRR",
            transparencyNote:
              "Estimativas calculadas com base em infraestrutura Google Cloud. Decisões comerciais requerem validação humana do CEO.",
          },
          marketPositioning: "Liderança por facilidade de uso sem app e suporte multilíngue nativo.",
          risksAndMitigations: [
            {
              risk: "Ciclo de decisão hoteleiro prolongado",
              mitigation: "Oferecer piloto de 30 dias com setup garantido.",
            },
          ],
          recommendedActions: [
            { id: "act-gen-1", action: "Aprovar plano comercial e material de vendas para o mercado-alvo.", approved: false },
            { id: "act-gen-2", action: "Autorizar abertura de conversas exploratórias com 3 parceiros de distribuição.", approved: false },
          ],
          fullMarkdownReport: data.reportMarkdown,
        };

        onAddReport(newRep);
        setActiveReportId(newRep.id);
        setShowGenerateModal(false);
      }
    } catch (err) {
      console.error("Failed to generate CEO report:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyReport = () => {
    if (!currentReport) return;
    const content =
      currentReport.fullMarkdownReport ||
      `# ${currentReport.title}\n\n## 1. Sumário Executivo\n${currentReport.executiveSummary}\n\n## 3. Modelo Recomendado\n${currentReport.recommendedBusinessModel}\n\n## 4. Preço\nSetup: ${currentReport.pricingStrategy.setupFee} | Recorrente: ${currentReport.pricingStrategy.subscription}\n\n## 5. Projeções\nBreak-even: ${currentReport.financialProjections.breakEven} | Margem: ${currentReport.financialProjections.grossMargin}\n`;

    navigator.clipboard.writeText(content).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    });
  };

  return (
    <div className="space-y-8">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-slate-400">REPORTES FORMAIS AO CEO</div>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-display">
            Dossiês Estratégicos & Decisões do CEO
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Relatórios estruturados com 8 seções obrigatórias (Sumário, Oportunidades, Modelos, Preços, Projeções, Posicionamento, Riscos e Próximas Ações) submetidos para aprovação humana.
          </p>
        </div>

        <button
          onClick={() => setShowGenerateModal(true)}
          className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto shadow-sm"
        >
          + Gerar Novo Relatório Estratégico com IA
        </button>
      </div>

      {/* Report Selector Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none border-b border-slate-800">
        {reports.map((rep) => {
          const isActive = rep.id === activeReportId;
          return (
            <button
              key={rep.id}
              onClick={() => setActiveReportId(rep.id)}
              className={`px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all flex items-center gap-2 ${
                isActive
                  ? "bg-slate-800 text-white shadow-sm border border-slate-700"
                  : "bg-slate-900/40 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
              }`}
            >
              <span className="truncate max-w-[200px]">{rep.productName}</span>
              <span className="text-[10px] text-slate-500 font-mono">{rep.date}</span>
            </button>
          );
        })}
      </div>

      {/* Main Report Container */}
      {currentReport && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 sm:p-8 space-y-8">
          {/* Header Strip with Title, Metadata, and CEO Approval Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-slate-800 gap-6">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>Data: {currentReport.date}</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-400 font-semibold">{currentReport.productName}</span>
                <span aria-hidden="true">·</span>
                <span>Mercado: {currentReport.targetMarket}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                {currentReport.title}
              </h2>
            </div>

            {/* CEO Approval Status & Actions */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <div className="text-right">
                <div className="text-[11px] text-slate-400">Status de Aprovação</div>
                <div className="text-xs font-bold text-white mt-0.5">
                  {currentReport.status === "APPROVED" && (
                    <span className="text-emerald-400">Aprovado pelo CEO</span>
                  )}
                  {currentReport.status === "PENDING_CEO_APPROVAL" && (
                    <span className="text-amber-400">Aguardando Decisão do CEO</span>
                  )}
                  {currentReport.status === "IN_REVISION" && (
                    <span className="text-slate-400">Em Revisão</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onUpdateReportStatus(currentReport.id, "APPROVED")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
                    currentReport.status === "APPROVED"
                      ? "bg-emerald-500 text-slate-950"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  Aprovar Decisões
                </button>
                <button
                  onClick={handleCopyReport}
                  className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 transition-colors"
                >
                  {copySuccess ? "Copiado!" : "Copiar Relatório"}
                </button>
              </div>
            </div>
          </div>

          {/* If the report has full markdown from Gemini, render it nicely */}
          {currentReport.fullMarkdownReport ? (
            <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 space-y-4 leading-relaxed whitespace-pre-wrap font-sans">
              {currentReport.fullMarkdownReport}
            </div>
          ) : (
            /* Structured 8-Section Display */
            <div className="space-y-8 text-xs sm:text-sm text-slate-300">
              {/* Section 1: Sumário Executivo */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display flex items-center gap-2">
                  <span className="text-emerald-400">01.</span> Sumário Executivo
                </h3>
                <p className="bg-slate-950/50 p-4 rounded-lg border border-slate-800/80 leading-relaxed text-slate-200">
                  {currentReport.executiveSummary}
                </p>
              </div>

              {/* Section 2: Melhores Oportunidades de Negócio */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display flex items-center gap-2">
                  <span className="text-emerald-400">02.</span> Melhores Oportunidades de Negócio
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {currentReport.bestOpportunities.map((opp, i) => (
                    <div
                      key={i}
                      className="p-3.5 bg-slate-950/40 border border-slate-800/70 rounded-lg space-y-1"
                    >
                      <div className="font-semibold text-emerald-400 text-xs">Oportunidade {i + 1}</div>
                      <div className="text-xs text-slate-300 leading-relaxed">{opp}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3: Modelos de Negócio Recomendados */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display flex items-center gap-2">
                  <span className="text-emerald-400">03.</span> Modelos de Negócio Recomendados
                </h3>
                <div className="p-4 bg-slate-950/50 rounded-lg border border-slate-800/80 leading-relaxed text-slate-200">
                  {currentReport.recommendedBusinessModel}
                </div>
              </div>

              {/* Section 4: Recomendações de Preço */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display flex items-center gap-2">
                  <span className="text-emerald-400">04.</span> Recomendações de Preço
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 bg-slate-950/50 rounded-lg border border-slate-800/80 space-y-1">
                    <div className="text-slate-400">Taxa de Setup / Ativação:</div>
                    <div className="font-semibold text-white">{currentReport.pricingStrategy.setupFee}</div>
                  </div>
                  <div className="p-3.5 bg-slate-950/50 rounded-lg border border-slate-800/80 space-y-1">
                    <div className="text-slate-400">Assinatura Mensal (SaaS):</div>
                    <div className="font-semibold text-emerald-400 font-mono">
                      {currentReport.pricingStrategy.subscription}
                    </div>
                  </div>
                  <div className="p-3.5 bg-slate-950/50 rounded-lg border border-slate-800/80 space-y-1">
                    <div className="text-slate-400">Add-ons & White-Label:</div>
                    <div className="font-semibold text-slate-200">
                      {currentReport.pricingStrategy.whiteLabelOrAddons}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 5: Projeções Financeiras & Unit Economics */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display flex items-center gap-2">
                    <span className="text-emerald-400">05.</span> Projeções Financeiras & Unit Economics
                  </h3>
                  <span className="text-[10px] text-amber-400 font-semibold">[ESTIMATIVAS MODELADAS]</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-xs font-mono">
                  <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
                    <div className="text-[10px] text-slate-400 font-sans">Custo Inicial Dev</div>
                    <div className="font-bold text-white mt-1">{currentReport.financialProjections.initialCost}</div>
                  </div>
                  <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
                    <div className="text-[10px] text-slate-400 font-sans">OPEX / Cliente</div>
                    <div className="font-bold text-white mt-1">{currentReport.financialProjections.monthlyOpex}</div>
                  </div>
                  <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
                    <div className="text-[10px] text-slate-400 font-sans">CAC Estimado</div>
                    <div className="font-bold text-white mt-1">{currentReport.financialProjections.estimatedCac}</div>
                  </div>
                  <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
                    <div className="text-[10px] text-slate-400 font-sans">Margem Bruta</div>
                    <div className="font-bold text-emerald-400 mt-1">{currentReport.financialProjections.grossMargin}</div>
                  </div>
                  <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
                    <div className="text-[10px] text-slate-400 font-sans">Break-Even</div>
                    <div className="font-bold text-white mt-1">{currentReport.financialProjections.breakEven}</div>
                  </div>
                  <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
                    <div className="text-[10px] text-slate-400 font-sans">MRR Mês 6</div>
                    <div className="font-bold text-emerald-400 mt-1">{currentReport.financialProjections.projectedMrr6M}</div>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 italic">
                  * {currentReport.financialProjections.transparencyNote}
                </p>
              </div>

              {/* Section 6: Posicionamento de Mercado */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display flex items-center gap-2">
                  <span className="text-emerald-400">06.</span> Posicionamento de Mercado & Diferenciação
                </h3>
                <div className="p-4 bg-slate-950/50 rounded-lg border border-slate-800/80 leading-relaxed text-slate-200">
                  {currentReport.marketPositioning}
                </div>
              </div>

              {/* Section 7: Riscos e Limitações */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display flex items-center gap-2">
                  <span className="text-emerald-400">07.</span> Riscos, Limitações & Mitigações
                </h3>
                <div className="space-y-2 text-xs">
                  {currentReport.risksAndMitigations.map((r, i) => (
                    <div
                      key={i}
                      className="p-3.5 bg-slate-950/50 rounded-lg border border-slate-800/80 space-y-1"
                    >
                      <div className="text-amber-400 font-semibold">Risco {i + 1}: {r.risk}</div>
                      <div className="text-slate-300 leading-relaxed">
                        <span className="text-slate-400">Mitigação Operacional: </span>
                        {r.mitigation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 8: Próximas Ações Recomendadas (CEO Action Gate) */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display flex items-center gap-2">
                    <span className="text-emerald-400">08.</span> Próximas Ações Recomendadas (Submetidas à Decisão do CEO)
                  </h3>
                  <span className="text-[11px] text-emerald-400 font-medium">Controlo Humano Obrigatório</span>
                </div>
                <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="text-xs text-slate-400">
                    Marque as ações abaixo para autorizar formalmente a equipe a executar cada iniciativa:
                  </div>

                  <div className="space-y-2.5">
                    {currentReport.recommendedActions.map((action) => (
                      <label
                        key={action.id}
                        className="flex items-start gap-3 p-3 bg-slate-900/60 hover:bg-slate-800/60 rounded-lg border border-slate-800 cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={action.approved}
                          onChange={() => onToggleActionApproval(currentReport.id, action.id)}
                          className="mt-0.5 accent-emerald-400 w-4 h-4 rounded cursor-pointer"
                        />
                        <div className="text-xs text-slate-200 leading-relaxed flex-1">
                          {action.action}
                        </div>
                        <span
                          className={`text-[10px] font-semibold whitespace-nowrap ${
                            action.approved ? "text-emerald-400" : "text-slate-500"
                          }`}
                        >
                          {action.approved ? "AUTORIZADO PELO CEO" : "PENDENTE"}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Generator Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white font-display">
                Gerar Relatório Estratégico para o CEO
              </h3>
              <button
                onClick={() => setShowGenerateModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleGenerateReport} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Produto ou Oportunidade:
                </label>
                <input
                  type="text"
                  required
                  value={genForm.productOrIdea}
                  onChange={(e) => setGenForm({ ...genForm, productOrIdea: e.target.value })}
                  placeholder="Ex: AI Hotel Concierge"
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Foco Geográfico / Mercado-Alvo:
                </label>
                <input
                  type="text"
                  required
                  value={genForm.focusMarket}
                  onChange={(e) => setGenForm({ ...genForm, focusMarket: e.target.value })}
                  placeholder="Ex: Portugal, Dubai (UAE) e Arábia Saudita"
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Modelo de Negócio Proposto:
                </label>
                <input
                  type="text"
                  required
                  value={genForm.businessModel}
                  onChange={(e) => setGenForm({ ...genForm, businessModel: e.target.value })}
                  placeholder="Ex: B2B SaaS + Setup Fee Inicial"
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Intervalo de Preços & Condições:
                </label>
                <input
                  type="text"
                  required
                  value={genForm.targetPricing}
                  onChange={(e) => setGenForm({ ...genForm, targetPricing: e.target.value })}
                  placeholder="Ex: €2.490 setup + €490/mês"
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowGenerateModal(false)}
                  className="px-3 py-2 text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="px-4 py-2 bg-emerald-400 text-slate-950 font-semibold rounded hover:bg-emerald-300 disabled:opacity-50 transition-colors shadow-sm"
                >
                  {isGenerating ? "Redigindo Relatório Executivo..." : "Gerar Relatório Completo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
