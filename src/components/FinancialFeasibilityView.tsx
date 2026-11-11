import React, { useState } from "react";
import { BusinessOpportunity } from "../types/strategy";

interface FinancialFeasibilityViewProps {
  opportunities: BusinessOpportunity[];
}

export const FinancialFeasibilityView: React.FC<FinancialFeasibilityViewProps> = ({
  opportunities,
}) => {
  const [selectedOppId, setSelectedOppId] = useState<string>(opportunities[0]?.id || "");

  // Model parameters (initialized with selected product values)
  const selectedOpp = opportunities.find((o) => o.id === selectedOppId) || opportunities[0];

  const [devCost, setDevCost] = useState<number>(selectedOpp.financials.initialDevCost);
  const [setupFee, setSetupFee] = useState<number>(selectedOpp.financials.setupFee);
  const [mrrPrice, setMrrPrice] = useState<number>(selectedOpp.financials.monthlyRecurringPrice);
  const [opexPerClient, setOpexPerClient] = useState<number>(selectedOpp.financials.monthlyOpexPerClient);
  const [cac, setCac] = useState<number>(selectedOpp.financials.estimatedCAC);
  const [monthlyNewClients, setMonthlyNewClients] = useState<number>(3);
  const [churnRate, setChurnRate] = useState<number>(2.5); // % per month

  // When changing product, update state
  const handleSelectProduct = (opp: BusinessOpportunity) => {
    setSelectedOppId(opp.id);
    setDevCost(opp.financials.initialDevCost);
    setSetupFee(opp.financials.setupFee);
    setMrrPrice(opp.financials.monthlyRecurringPrice);
    setOpexPerClient(opp.financials.monthlyOpexPerClient);
    setCac(opp.financials.estimatedCAC);
  };

  // Unit Economics Calculations
  const grossProfitPerClientMonth = Math.max(0, mrrPrice - opexPerClient);
  const grossMarginPercent = mrrPrice > 0 ? (grossProfitPerClientMonth / mrrPrice) * 100 : 0;
  
  // Upfront Net Margin per client on onboarding = Setup Fee - CAC
  const upfrontNetMargin = setupFee - cac;

  // Break-even client count
  // Initial dev cost covered by cumulative upfront profit + monthly recurring contribution
  const netContributionFirstMonth = upfrontNetMargin + grossProfitPerClientMonth;
  const breakEvenClients = netContributionFirstMonth > 0
    ? Math.max(1, Math.ceil(devCost / netContributionFirstMonth))
    : 15;

  const breakEvenMonths = monthlyNewClients > 0
    ? (breakEvenClients / monthlyNewClients).toFixed(1)
    : "N/A";

  // LTV (Lifetime Value) = (MRR * Gross Margin) / Churn
  const monthlyChurnDecimal = Math.max(0.005, churnRate / 100);
  const averageCustomerLifespanMonths = 1 / monthlyChurnDecimal;
  const ltv = setupFee + (grossProfitPerClientMonth * averageCustomerLifespanMonths);
  const ltvCacRatio = cac > 0 ? (ltv / cac).toFixed(2) : "0.0";

  // 12-Month Projection Array
  const projections = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const activeClients = Math.round(monthlyNewClients * month * (1 - (churnRate / 100) * (month / 2)));
    const revenueRecurring = activeClients * mrrPrice;
    const revenueSetup = monthlyNewClients * setupFee;
    const totalRevenue = revenueRecurring + revenueSetup;
    const totalOpex = activeClients * opexPerClient + (monthlyNewClients * cac);
    const netProfitMonth = totalRevenue - totalOpex;

    return {
      month,
      activeClients,
      revenueRecurring,
      revenueSetup,
      totalRevenue,
      totalOpex,
      netProfitMonth,
    };
  });

  return (
    <div className="space-y-8">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-slate-400">UNIT ECONOMICS & VIABILIDADE FINANCEIRA</div>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-display">
            Simulador Financeiro & Ponto de Equilíbrio (Break-Even)
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Modelagem rigorosa de custos de desenvolvimento, OPEX de nuvem/LLM, CAC, LTV e projeções de fluxo de caixa com distinção estrita de dados verificados.
          </p>
        </div>

        {/* Legend: Estimates vs Verified */}
        <div className="flex items-center gap-2 text-[11px] bg-slate-900 border border-slate-800 p-2 rounded-lg shrink-0">
          <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60 font-semibold">
            DADO VERIFICADO
          </span>
          <span className="text-slate-500">vs</span>
          <span className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800/60 font-semibold">
            ESTIMATIVA MODELADA
          </span>
        </div>
      </div>

      {/* Product Quick-Select Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none border-b border-slate-800">
        {opportunities.map((opp) => (
          <button
            key={opp.id}
            onClick={() => handleSelectProduct(opp)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              opp.id === selectedOppId
                ? "bg-slate-800 text-emerald-400 border border-slate-700"
                : "text-slate-400 hover:text-white bg-slate-900/40"
            }`}
          >
            {opp.name}
          </button>
        ))}
      </div>

      {/* Main Grid: Parameters Inputs (Left) vs Real-Time Outputs (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (5 Cols): Inputs Form */}
        <div className="lg:col-span-5 bg-slate-900/50 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-semibold text-white font-display">
              Parâmetros de Entrada da Oportunidade
            </h3>
            <span className="text-[11px] text-slate-500">{selectedOpp.name}</span>
          </div>

          <div className="space-y-3.5 text-xs">
            {/* Initial Dev Cost */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-slate-300 font-medium">Custo Inicial de Dev / Setup:</span>
                <span className="text-[10px] text-amber-400 font-semibold">[ESTIMATIVA]</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">€</span>
                <input
                  type="number"
                  value={devCost}
                  onChange={(e) => setDevCost(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white font-mono"
                />
              </div>
            </div>

            {/* Setup Fee Charged to Client */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-slate-300 font-medium">Taxa de Setup Cobrada ao Cliente:</span>
                <span className="text-[10px] text-emerald-400 font-semibold">[DADO VERIFICADO TABELA]</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">€</span>
                <input
                  type="number"
                  value={setupFee}
                  onChange={(e) => setSetupFee(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white font-mono"
                />
              </div>
            </div>

            {/* Monthly Subscription Price */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-slate-300 font-medium">Mensalidade Recorrente (MRR):</span>
                <span className="text-[10px] text-emerald-400 font-semibold">[DADO VERIFICADO TABELA]</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">€</span>
                <input
                  type="number"
                  value={mrrPrice}
                  onChange={(e) => setMrrPrice(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white font-mono"
                />
              </div>
            </div>

            {/* Monthly OPEX per Client */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-slate-300 font-medium">OPEX Mensal por Cliente (APIs + Cloud):</span>
                <span className="text-[10px] text-emerald-400 font-semibold">[VERIFICADO GOOGLE CLOUD]</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">€</span>
                <input
                  type="number"
                  value={opexPerClient}
                  onChange={(e) => setOpexPerClient(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white font-mono"
                />
              </div>
            </div>

            {/* Customer Acquisition Cost (CAC) */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-slate-300 font-medium">Custo de Aquisição de Cliente (CAC):</span>
                <span className="text-[10px] text-amber-400 font-semibold">[ESTIMATIVA BENCHMARK]</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">€</span>
                <input
                  type="number"
                  value={cac}
                  onChange={(e) => setCac(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white font-mono"
                />
              </div>
            </div>

            {/* Client Additions & Churn Rate */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Novos Clientes/mês:</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={monthlyNewClients}
                  onChange={(e) => setMonthlyNewClients(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Churn Mensal (%):</label>
                <input
                  type="number"
                  step="0.5"
                  min="0.5"
                  max="20"
                  value={churnRate}
                  onChange={(e) => setChurnRate(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols): Financial KPI Outputs & Unit Economics */}
        <div className="lg:col-span-7 space-y-6">
          {/* Top 4 KPI Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-1">
              <div className="text-[11px] text-slate-400">Margem Bruta</div>
              <div className="text-xl font-bold text-emerald-400 font-mono tabular-nums">
                {grossMarginPercent.toFixed(1)}%
              </div>
              <div className="text-[10px] text-slate-500">Recorrente</div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-1">
              <div className="text-[11px] text-slate-400">Break-Even (Clientes)</div>
              <div className="text-xl font-bold text-white font-mono tabular-nums">
                {breakEvenClients} clientes
              </div>
              <div className="text-[10px] text-slate-500">Ponto de Equilíbrio</div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-1">
              <div className="text-[11px] text-slate-400">Tempo para Break-Even</div>
              <div className="text-xl font-bold text-emerald-400 font-mono tabular-nums">
                {breakEvenMonths} meses
              </div>
              <div className="text-[10px] text-slate-500">Com {monthlyNewClients} novos/mês</div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-1">
              <div className="text-[11px] text-slate-400">Ratio LTV : CAC</div>
              <div className="text-xl font-bold text-white font-mono tabular-nums">
                {ltvCacRatio}x
              </div>
              <div className="text-[10px] text-emerald-400 font-medium">Saudável (&gt; 3.0x)</div>
            </div>
          </div>

          {/* Detailed Unit Economics Card */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-3">
            <h3 className="text-sm font-semibold text-white font-display border-b border-slate-800 pb-2">
              Análise de Margens & Financiamento Orgânico
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-2">
                <div className="flex justify-between text-slate-300">
                  <span>Margem Inicial na Ativação (Setup - CAC):</span>
                  <span className={`font-mono font-bold ${upfrontNetMargin >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                    €{upfrontNetMargin.toLocaleString("pt-PT")}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {upfrontNetMargin >= 0
                    ? "Excelente: A taxa de setup supera o CAC. O cliente gera caixa positivo líquido no Dia 1."
                    : "Atenção: O CAC supera a taxa de setup inicial. O payback dependerá de retenção recorrente."}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-slate-300">
                  <span>Lucro Bruto Recorrente / Cliente / Mês:</span>
                  <span className="font-mono font-bold text-emerald-400">
                    €{grossProfitPerClientMonth.toLocaleString("pt-PT")}/mês
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Valor que alimenta diretamente o fluxo de caixa mensal da empresa com margem de {grossMarginPercent.toFixed(0)}%.
                </p>
              </div>
            </div>
          </div>

          {/* 12-Month Projections Table */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white font-display">
                Projeção Financeira dos Primeiros 12 Meses
              </h3>
              <span className="text-[10px] text-amber-400 font-semibold">[MODELAGEM ESTIMADA]</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-2 px-2 font-medium">Mês</th>
                    <th className="py-2 px-2 font-medium text-center">Clientes Ativos</th>
                    <th className="py-2 px-2 font-medium text-right">MRR Recorrente</th>
                    <th className="py-2 px-2 font-medium text-right">Receita Setup</th>
                    <th className="py-2 px-2 font-medium text-right">Receita Total</th>
                    <th className="py-2 px-2 font-medium text-right text-emerald-400">Lucro Operacional</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono tabular-nums">
                  {projections.slice(0, 6).map((p) => (
                    <tr key={p.month} className="hover:bg-slate-800/30">
                      <td className="py-2 px-2 text-slate-300 font-sans font-medium">Mês {p.month}</td>
                      <td className="py-2 px-2 text-center text-slate-300">{p.activeClients}</td>
                      <td className="py-2 px-2 text-right text-slate-300">€{p.revenueRecurring.toLocaleString("pt-PT")}</td>
                      <td className="py-2 px-2 text-right text-slate-400">€{p.revenueSetup.toLocaleString("pt-PT")}</td>
                      <td className="py-2 px-2 text-right text-white font-bold">€{p.totalRevenue.toLocaleString("pt-PT")}</td>
                      <td className={`py-2 px-2 text-right font-bold ${p.netProfitMonth >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                        €{p.netProfitMonth.toLocaleString("pt-PT")}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-900/80 font-bold">
                    <td className="py-2.5 px-2 text-emerald-400 font-sans">Mês 12 (Run-Rate)</td>
                    <td className="py-2.5 px-2 text-center text-emerald-400">{projections[11].activeClients}</td>
                    <td className="py-2.5 px-2 text-right text-emerald-400">€{projections[11].revenueRecurring.toLocaleString("pt-PT")}</td>
                    <td className="py-2.5 px-2 text-right text-slate-400">€{projections[11].revenueSetup.toLocaleString("pt-PT")}</td>
                    <td className="py-2.5 px-2 text-right text-white">€{projections[11].totalRevenue.toLocaleString("pt-PT")}</td>
                    <td className="py-2.5 px-2 text-right text-emerald-400">€{projections[11].netProfitMonth.toLocaleString("pt-PT")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
