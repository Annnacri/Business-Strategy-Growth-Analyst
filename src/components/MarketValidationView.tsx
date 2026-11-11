import React, { useState } from "react";
import { MarketProfile } from "../types/strategy";
import { TARGET_MARKETS } from "../data/initialStrategyData";

export const MarketValidationView: React.FC = () => {
  const [selectedMarketId, setSelectedMarketId] = useState<string>("mkt-portugal");

  const selectedMarket = TARGET_MARKETS.find((m) => m.id === selectedMarketId) || TARGET_MARKETS[0];

  return (
    <div className="space-y-8">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-slate-400">INTELIGÊNCIA GEOGRÁFICA & HOSPITALIDADE</div>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-display">
            Validação de Mercados & Soluções Multilíngues
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            Análise aprofundada de oportunidades em Portugal, União Europeia, Reino Unido, Estados Unidos, Dubai & EAU, Arábia Saudita e Qatar. Foco estrito em soluções de IA multilíngues para hotelaria internacional.
          </p>
        </div>

        <div className="text-xs font-mono tabular-nums text-emerald-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg self-start sm:self-auto">
          7 Mercados Auditados
        </div>
      </div>

      {/* Multilingual AI Matrix Card */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white font-display">
            Estratégia de IA Multilíngue para Hospitalidade Internacional
          </h3>
          <span className="text-[11px] text-emerald-400 font-medium">7 Idiomas Nativos</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
          Hotéis de luxo recebem hóspedes com barreiras linguísticas severas. O nosso motor de IA suporta
          conversação fluente com contexto cultural em: <strong className="text-white">Português, Inglês, Árabe, Espanhol, Francês, Alemão e Italiano</strong>.
          No Médio Oriente (Dubai, Riade, Doha), a proficiência e elegância do modelo em Árabe é o fator número 1 de decisão para contratação.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 pt-2 text-xs">
          {[
            { lang: "Português", region: "Portugal / Brasil", benefit: "Turismo interno e praias" },
            { lang: "English", region: "Global / UK / US", benefit: "Padrão corporativo e negócios" },
            { lang: "العربية (Árabe)", region: "UAE / Saudita / Qatar", benefit: "Requisito indispensável no Golfo" },
            { lang: "Español", region: "Espanha / LatAm", benefit: "2º maior destino mundial" },
            { lang: "Français", region: "França / Suíça / Mónaco", benefit: "Hóspedes de alta renda" },
            { lang: "Deutsch", region: "Alemanha / Áustria", benefit: "Maior emissor turístico europeu" },
            { lang: "Italiano", region: "Itália", benefit: "Turismo cultural e gastronomia" },
          ].map((item, i) => (
            <div key={i} className="p-2.5 bg-slate-950/60 border border-slate-800/80 rounded-lg space-y-1">
              <div className="font-semibold text-white truncate">{item.lang}</div>
              <div className="text-[10px] text-emerald-400/90">{item.region}</div>
              <div className="text-[10px] text-slate-400 leading-tight">{item.benefit}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Selector & Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (4 Cols): Market List */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-semibold text-slate-400 px-1 mb-2">
            Regiões Analisadas:
          </div>
          {TARGET_MARKETS.map((mkt) => {
            const isSelected = mkt.id === selectedMarketId;
            return (
              <div
                key={mkt.id}
                onClick={() => setSelectedMarketId(mkt.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? "bg-slate-900 border-emerald-500/80 shadow-md"
                    : "bg-slate-900/40 border-slate-800/80 hover:bg-slate-800/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-white text-xs">{mkt.name}</div>
                  <div className="text-xs font-mono font-bold text-emerald-400">
                    {mkt.priorityScore}/100
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 truncate">
                  {mkt.region} · Moeda: {mkt.currency}
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/60 text-[10px] text-slate-400">
                  <span>Prontidão: {mkt.hospitalityReadiness}</span>
                  <span>Setup: {mkt.setupFeeTolerance.split(" ")[0]}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column (8 Cols): Market Deep-Dive Profile */}
        <div className="lg:col-span-8">
          {selectedMarket && (
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-6">
              {/* Market Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-800 gap-4">
                <div>
                  <div className="text-xs text-emerald-400 font-semibold">
                    {selectedMarket.region}
                  </div>
                  <h2 className="text-xl font-bold text-white font-display mt-0.5">
                    {selectedMarket.name}
                  </h2>
                </div>

                <div className="text-right">
                  <div className="text-xs text-slate-400">Prioridade de Entrada</div>
                  <div className="text-2xl font-bold font-mono text-emerald-400">
                    {selectedMarket.priorityScore}
                    <span className="text-xs text-slate-500 font-normal"> / 100</span>
                  </div>
                </div>
              </div>

              {/* 3 Metric Summary Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-slate-950/60 p-3.5 rounded-lg border border-slate-800/80">
                  <div className="text-[11px] text-slate-400">TAM Hospitalidade</div>
                  <div className="text-sm font-bold text-white font-mono mt-1">
                    {selectedMarket.tamHospitalityEstimate}
                  </div>
                </div>

                <div className="bg-slate-950/60 p-3.5 rounded-lg border border-slate-800/80">
                  <div className="text-[11px] text-slate-400">Ticket Médio Mensal</div>
                  <div className="text-sm font-bold text-emerald-400 font-mono mt-1">
                    {selectedMarket.averageHotelTicketMonthly}
                  </div>
                </div>

                <div className="bg-slate-950/60 p-3.5 rounded-lg border border-slate-800/80">
                  <div className="text-[11px] text-slate-400">Tolerância a Setup Fee</div>
                  <div className="text-sm font-bold text-white font-mono mt-1">
                    {selectedMarket.setupFeeTolerance}
                  </div>
                </div>
              </div>

              {/* Strengths & Market Dynamics */}
              <div className="space-y-3">
                <div className="text-xs font-semibold text-slate-300">
                  Forças & Dinâmica do Mercado Turístico:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedMarket.strengths.map((str, i) => (
                    <div
                      key={i}
                      className="p-3 bg-slate-950/40 rounded-lg border border-slate-800/60 text-slate-300 leading-relaxed"
                    >
                      <span className="text-emerald-400 font-bold mr-1.5">•</span>
                      {str}
                    </div>
                  ))}
                </div>
              </div>

              {/* Regulatory Environment */}
              <div className="space-y-1.5 text-xs bg-slate-950/50 p-4 rounded-lg border border-slate-800/80">
                <div className="font-semibold text-amber-400">
                  Enquadramento Regulatório & Conformidade:
                </div>
                <div className="text-slate-300 leading-relaxed">
                  {selectedMarket.regulatoryConsiderations}
                </div>
              </div>

              {/* Recommendation for CEO */}
              <div className="space-y-1.5 text-xs bg-emerald-950/20 border border-emerald-900/40 p-4 rounded-lg">
                <div className="font-semibold text-emerald-400">
                  Recomendação de Go-to-Market do Agent 04:
                </div>
                <div className="text-slate-200 leading-relaxed">
                  {selectedMarket.marketEntryRecommendation}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
