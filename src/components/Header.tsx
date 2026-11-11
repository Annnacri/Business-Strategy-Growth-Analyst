import React from "react";
import { SupportedLanguage } from "../types/strategy";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  onNewEvaluation: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  onNewEvaluation,
}) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "scoring", label: "Decisão 0-100" },
    { id: "portfolio", label: "Portfólio" },
    { id: "markets", label: "Mercados" },
    { id: "financials", label: "Finanças & CAC" },
    { id: "reports", label: "Relatórios CEO" },
    { id: "advisor", label: "Consultor IA" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab("dashboard")}
              className="text-left group flex items-baseline gap-2"
            >
              <span className="text-base font-bold tracking-tight text-white font-display group-hover:text-emerald-400 transition-colors whitespace-nowrap">
                AGENT 04
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline whitespace-nowrap">
                · Estratégia de Negócios & Crescimento
              </span>
            </button>
            <span className="text-[11px] text-emerald-400/80 hidden md:inline border-l border-slate-800 pl-3 whitespace-nowrap">
              Reporte ao CEO
            </span>
          </div>

          {/* Zone 2: 4-7 single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? "bg-slate-800 text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action + Language Selector */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <label htmlFor="lang-select" className="sr-only">Idioma</label>
              <select
                id="lang-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
                className="bg-slate-900 text-slate-300 text-xs rounded border border-slate-800 px-2 py-1 focus:outline-none focus:border-emerald-500 cursor-pointer"
                title="Idioma de Comunicação e Análise"
              >
                <option value="pt">PT (CEO)</option>
                <option value="en">EN</option>
                <option value="ar">AR (Golfo)</option>
                <option value="es">ES</option>
                <option value="fr">FR</option>
                <option value="de">DE</option>
                <option value="it">IT</option>
              </select>
            </div>

            <button
              onClick={onNewEvaluation}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-950 bg-emerald-400 rounded-md hover:bg-emerald-300 transition-colors whitespace-nowrap shrink-0 shadow-sm font-semibold"
            >
              + Avaliar Ideia
            </button>
          </div>
        </div>

        {/* Mobile secondary navigation strip */}
        <div className="flex lg:hidden overflow-x-auto py-2 border-t border-slate-900 gap-1 scrollbar-none">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-2.5 py-1 text-xs whitespace-nowrap rounded shrink-0 ${
                activeTab === item.id
                  ? "bg-slate-800 text-emerald-400 font-medium"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
