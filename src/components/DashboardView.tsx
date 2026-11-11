import React from "react";
import { BusinessOpportunity, CeoReport } from "../types/strategy";

interface DashboardViewProps {
  opportunities: BusinessOpportunity[];
  reports: CeoReport[];
  setActiveTab: (tab: string) => void;
  onSelectOpportunity: (opp: BusinessOpportunity) => void;
  onOpenReport: (report: CeoReport) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  opportunities,
  reports,
  setActiveTab,
  onSelectOpportunity,
  onOpenReport,
}) => {
  const topOpportunity = [...opportunities].sort((a, b) => b.totalScore - a.totalScore)[0];
  const highPriorityCount = opportunities.filter((o) => o.priority === "HIGH_PRIORITY").length;
  const approvedCount = opportunities.filter((o) => o.status === "APPROVED").length;
  const pendingCount = opportunities.filter((o) => o.status === "PENDING_CEO_APPROVAL").length;
  const totalPotentialMrr = opportunities.reduce(
    (acc, curr) => acc + (curr.priority === "HIGH_PRIORITY" ? curr.financials.mrrMonth6Estimate : 0),
    0
  );

  return (
    <div className="space-y-8">
      {/* Executive Briefing Banner */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="text-emerald-400 font-semibold">DIRETRIZ ESTRATÉGICA ATIVA</span>
              <span aria-hidden="true">·</span>
              <span>Reporte Executivo para o CEO</span>
              <span aria-hidden="true">·</span>
              <span>Novembro 2026</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display text-balance">
              Transformando Inteligência de Mercado em Estratégias de Crescimento e Lucratividade
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              O Agent 04 monitora continuamente os 6 produtos do portfólio, avalia novos modelos de negócio e
              valida oportunidades nos mercados de Portugal, UE, Reino Unido, EUA e Golfo (Dubai, Arábia Saudita e Qatar),
              priorizando soluções de baixo investimento inicial e alta receita recorrente.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={() => setActiveTab("reports")}
              className="px-4 py-2.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap text-center shadow-sm"
            >
              Ver Relatórios ao CEO
            </button>
            <button
              onClick={() => setActiveTab("scoring")}
              className="px-4 py-2.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap text-center border border-slate-700"
            >
              Avaliar com Framework 0-100
            </button>
          </div>
        </div>

        {/* Governance & Compliance Strip */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-medium">Cláusula de Governança:</span>
            <span>Todas as decisões de investimento e compromissos comerciais exigem aprovação humana explícita.</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              {approvedCount} Aprovadas
            </span>
            <span className="inline-flex items-center gap-1.5 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              {pendingCount} Aguardando CEO
            </span>
          </div>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-5 space-y-1">
          <div className="text-xs text-slate-400 font-medium">Oportunidade Âncora nº 1</div>
          <div className="text-lg font-bold text-white font-display truncate">
            {topOpportunity.name}
          </div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono tabular-nums">
            <span>Score: {topOpportunity.totalScore}/100</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400">Alta Prioridade</span>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-5 space-y-1">
          <div className="text-xs text-slate-400 font-medium">Pipeline MRR Projetado (Mês 6)</div>
          <div className="text-lg font-bold text-emerald-400 font-mono tabular-nums">
            €{totalPotentialMrr.toLocaleString("pt-PT")}/mês
          </div>
          <div className="text-xs text-slate-500">
            Baseado nos {highPriorityCount} produtos de alta prioridade
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-5 space-y-1">
          <div className="text-xs text-slate-400 font-medium">Margem Bruta Média Almejada</div>
          <div className="text-lg font-bold text-white font-mono tabular-nums">
            83.2%
          </div>
          <div className="text-xs text-slate-500">
            SaaS B2B + Taxas de Setup antecipadas
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-5 space-y-1">
          <div className="text-xs text-slate-400 font-medium">Mercados Internacionais Mapeados</div>
          <div className="text-lg font-bold text-white font-display">
            7 Regiões
          </div>
          <div className="text-xs text-slate-400">
            Foco Primário: Portugal, Dubai & Arábia Saudita
          </div>
        </div>
      </div>

      {/* Main Grid: Priority Ranking Table + Strategic Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Decision Framework Opportunity Ranking */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-white font-display">
                Classificação de Oportunidades do Portfólio (Framework 0–100)
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Pontuação rigorosa com base em demanda (20), receita (20), margem (20), viabilidade (15), escala (15) e diferenciação (10).
              </p>
            </div>
            <button
              onClick={() => setActiveTab("scoring")}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-medium whitespace-nowrap"
            >
              Ver Detalhes →
            </button>
          </div>

          <div className="bg-slate-900/30 border border-slate-800 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/60">
                    <th className="py-3 px-4 font-medium">Produto / Oportunidade</th>
                    <th className="py-3 px-3 font-medium">Modelo</th>
                    <th className="py-3 px-3 font-medium text-right">Setup + MRR</th>
                    <th className="py-3 px-3 font-medium text-center">Score</th>
                    <th className="py-3 px-3 font-medium">Status CEO</th>
                    <th className="py-3 px-4 font-medium text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {opportunities.map((opp) => {
                    const isHigh = opp.totalScore >= 80;
                    const isModerate = opp.totalScore >= 65 && opp.totalScore < 80;
                    return (
                      <tr
                        key={opp.id}
                        className="hover:bg-slate-800/30 transition-colors group cursor-pointer"
                        onClick={() => {
                          onSelectOpportunity(opp);
                          setActiveTab("portfolio");
                        }}
                      >
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-white group-hover:text-emerald-300 transition-colors">
                            {opp.name}
                          </div>
                          <div className="text-[11px] text-slate-400 truncate max-w-xs">
                            {opp.category} · {opp.targetMarket.slice(0, 2).join(", ")}
                          </div>
                        </td>
                        <td className="py-3.5 px-3 text-slate-300 whitespace-nowrap">
                          {opp.businessModel}
                        </td>
                        <td className="py-3.5 px-3 text-right font-mono tabular-nums text-slate-200 whitespace-nowrap">
                          <span>€{opp.financials.setupFee}</span>
                          <span className="text-slate-500"> + </span>
                          <span className="text-emerald-400">€{opp.financials.monthlyRecurringPrice}/m</span>
                        </td>
                        <td className="py-3.5 px-3 text-center font-mono tabular-nums font-bold">
                          <span
                            className={
                              isHigh
                                ? "text-emerald-400"
                                : isModerate
                                ? "text-amber-400"
                                : "text-rose-400"
                            }
                          >
                            {opp.totalScore}
                          </span>
                          <span className="text-slate-600 font-normal">/100</span>
                        </td>
                        <td className="py-3.5 px-3 whitespace-nowrap">
                          {opp.status === "APPROVED" && (
                            <span className="text-emerald-400 text-[11px]">Aprovado</span>
                          )}
                          {opp.status === "PENDING_CEO_APPROVAL" && (
                            <span className="text-amber-400 text-[11px]">Aguardando CEO</span>
                          )}
                          {opp.status === "IN_REVISION" && (
                            <span className="text-slate-400 text-[11px]">Em Revisão</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectOpportunity(opp);
                              setActiveTab("portfolio");
                            }}
                            className="text-slate-400 hover:text-white text-xs underline decoration-slate-700 underline-offset-4"
                          >
                            Analisar
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Strategic Directives & Recent Reports */}
        <div className="space-y-6">
          {/* Key Strategic Pillars Card */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-semibold text-white font-display">
              3 Pilares de Crescimento Recomendados
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="space-y-1">
                <div className="font-semibold text-emerald-400">
                  1. Setup Fees Antecipadas (Financiamento Orgânico)
                </div>
                <div className="text-slate-400 leading-relaxed">
                  Cobrar entre €1.500 e €3.500 na ativação de cada propriedade hoteleira. Cobre os custos de onboarding no Dia 1 e elimina dependência de capital externo.
                </div>
              </li>
              <li className="space-y-1">
                <div className="font-semibold text-emerald-400">
                  2. Cross-Selling Concierge + Tourguide
                </div>
                <div className="text-slate-400 leading-relaxed">
                  Oferecer o AI Tourguide Creator como upsell imediato aos mesmos diretores de hotel, elevando o ARPU médio em 30% sem CAC adicional.
                </div>
              </li>
              <li className="space-y-1">
                <div className="font-semibold text-emerald-400">
                  3. Arbitragem Geográfica no Golfo (Dubai & KSA)
                </div>
                <div className="text-slate-400 leading-relaxed">
                  Após validar o produto em Portugal com CAC reduzido, transferir a força comercial para o Dubai e Arábia Saudita, onde a tolerância a preços é 2.5x superior.
                </div>
              </li>
            </ul>
          </div>

          {/* Recent CEO Reports Card */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white font-display">
                Relatórios Recentes ao CEO
              </h3>
              <button
                onClick={() => setActiveTab("reports")}
                className="text-xs text-emerald-400 hover:text-emerald-300"
              >
                Ver Todos
              </button>
            </div>

            <div className="space-y-2.5">
              {reports.map((rep) => (
                <div
                  key={rep.id}
                  onClick={() => {
                    onOpenReport(rep);
                    setActiveTab("reports");
                  }}
                  className="p-3 bg-slate-900/70 hover:bg-slate-800/60 border border-slate-800/80 rounded-lg cursor-pointer transition-colors space-y-1"
                >
                  <div className="text-xs font-medium text-white line-clamp-1">
                    {rep.title}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span>{rep.date}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-400 font-medium">{rep.productName}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveTab("reports")}
              className="w-full mt-2 py-2 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 rounded-lg transition-colors border border-slate-700/60 text-center"
            >
              + Gerar Novo Relatório para o CEO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
