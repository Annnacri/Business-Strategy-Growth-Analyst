import { useState } from "react";
import { Header } from "./components/Header";
import { DashboardView } from "./components/DashboardView";
import { ScoringMatrixView } from "./components/ScoringMatrixView";
import { PortfolioStrategyView } from "./components/PortfolioStrategyView";
import { MarketValidationView } from "./components/MarketValidationView";
import { FinancialFeasibilityView } from "./components/FinancialFeasibilityView";
import { CeoReportsView } from "./components/CeoReportsView";
import { StrategicAdvisorView } from "./components/StrategicAdvisorView";

import {
  BusinessOpportunity,
  CeoReport,
  DecisionStatus,
  OpportunityScore,
  SupportedLanguage,
  SwotAnalysis as SwotAnalysisType,
} from "./types/strategy";
import {
  INITIAL_PORTFOLIO_OPPORTUNITIES,
  INITIAL_CEO_REPORTS,
} from "./data/initialStrategyData";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [language, setLanguage] = useState<SupportedLanguage>("pt");
  const [opportunities, setOpportunities] = useState<BusinessOpportunity[]>(
    INITIAL_PORTFOLIO_OPPORTUNITIES
  );
  const [reports, setReports] = useState<CeoReport[]>(INITIAL_CEO_REPORTS);
  const [selectedOpportunity, setSelectedOpportunity] = useState<BusinessOpportunity | null>(
    INITIAL_PORTFOLIO_OPPORTUNITIES[0]
  );
  const [selectedReport, setSelectedReport] = useState<CeoReport | null>(INITIAL_CEO_REPORTS[0]);

  // Handler to update score of an opportunity
  const handleUpdateOpportunityScore = (id: string, newScores: OpportunityScore) => {
    setOpportunities((prev) =>
      prev.map((opp) => {
        if (opp.id !== id) return opp;
        const total =
          newScores.marketDemand +
          newScores.revenuePotential +
          newScores.profitability +
          newScores.implementationFeasibility +
          newScores.scalability +
          newScores.competitiveAdvantage;

        const priority =
          total >= 80 ? "HIGH_PRIORITY" : total >= 65 ? "MODERATE_PRIORITY" : "LOW_PRIORITY";

        return {
          ...opp,
          scores: newScores,
          totalScore: total,
          priority,
        };
      })
    );
  };

  // Handler to add a newly evaluated opportunity
  const handleAddOpportunity = (newOpp: BusinessOpportunity) => {
    setOpportunities((prev) => [newOpp, ...prev]);
    setSelectedOpportunity(newOpp);
  };

  // Handler to update approval status of an opportunity
  const handleUpdateOpportunityStatus = (id: string, status: DecisionStatus) => {
    setOpportunities((prev) =>
      prev.map((opp) => (opp.id === id ? { ...opp, status } : opp))
    );
  };

  // Handler to add new generated CEO report
  const handleAddReport = (newRep: CeoReport) => {
    setReports((prev) => [newRep, ...prev]);
    setSelectedReport(newRep);
  };

  // Handler to update CEO approval status of a report
  const handleUpdateReportStatus = (id: string, status: DecisionStatus) => {
    setReports((prev) =>
      prev.map((rep) => (rep.id === id ? { ...rep, status } : rep))
    );
  };

  // Handler to toggle an approval checkmark on a recommended action
  const handleToggleActionApproval = (reportId: string, actionId: string) => {
    setReports((prev) =>
      prev.map((rep) => {
        if (rep.id !== reportId) return rep;
        return {
          ...rep,
          recommendedActions: rep.recommendedActions.map((act) =>
            act.id === actionId ? { ...act, approved: !act.approved } : act
          ),
        };
      })
    );
  };

  // Handler to update SWOT analysis of an opportunity
  const handleUpdateSwot = (productId: string, updatedSwot: SwotAnalysisType) => {
    setOpportunities((prev) =>
      prev.map((opp) => (opp.id === productId ? { ...opp, swot: updatedSwot } : opp))
    );
  };

  // Quick trigger from portfolio card to generate report
  const handleGenerateReportForProduct = (productName: string) => {
    const opp = opportunities.find((o) => o.name === productName);
    if (opp) {
      setSelectedOpportunity(opp);
    }
    setActiveTab("reports");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Top Bar Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        onNewEvaluation={() => setActiveTab("scoring")}
      />

      {/* Main Viewport Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === "dashboard" && (
          <DashboardView
            opportunities={opportunities}
            reports={reports}
            setActiveTab={setActiveTab}
            onSelectOpportunity={(opp) => setSelectedOpportunity(opp)}
            onOpenReport={(rep) => setSelectedReport(rep)}
          />
        )}

        {activeTab === "scoring" && (
          <ScoringMatrixView
            opportunities={opportunities}
            onUpdateOpportunityScore={handleUpdateOpportunityScore}
            onAddOpportunity={handleAddOpportunity}
          />
        )}

        {activeTab === "portfolio" && (
          <PortfolioStrategyView
            opportunities={opportunities}
            selectedOpportunity={selectedOpportunity}
            onUpdateOpportunityStatus={handleUpdateOpportunityStatus}
            onGenerateReportForProduct={handleGenerateReportForProduct}
            onUpdateSwot={handleUpdateSwot}
          />
        )}

        {activeTab === "markets" && <MarketValidationView />}

        {activeTab === "financials" && (
          <FinancialFeasibilityView opportunities={opportunities} />
        )}

        {activeTab === "reports" && (
          <CeoReportsView
            reports={reports}
            selectedReport={selectedReport}
            language={language}
            onAddReport={handleAddReport}
            onUpdateReportStatus={handleUpdateReportStatus}
            onToggleActionApproval={handleToggleActionApproval}
          />
        )}

        {activeTab === "advisor" && <StrategicAdvisorView language={language} />}
      </main>

      {/* Quiet Corporate Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400 font-display">AGENT 04</span>
            <span aria-hidden="true">·</span>
            <span>Business Strategy & Growth Analyst</span>
            <span aria-hidden="true">·</span>
            <span>Reporting Directly to the CEO Agent</span>
          </div>

          <div className="text-center sm:text-right text-[11px] text-slate-400">
            Regra Autônoma: Todas as decisões consequentes e investimentos exigem aprovação humana.
          </div>
        </div>
      </footer>
    </div>
  );
}
