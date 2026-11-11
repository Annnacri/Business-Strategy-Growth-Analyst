export interface OpportunityScore {
  marketDemand: number; // max 20
  revenuePotential: number; // max 20
  profitability: number; // max 20
  implementationFeasibility: number; // max 15
  scalability: number; // max 15
  competitiveAdvantage: number; // max 10
}

export type PriorityLevel = "HIGH_PRIORITY" | "MODERATE_PRIORITY" | "LOW_PRIORITY";
export type DecisionStatus = "PENDING_CEO_APPROVAL" | "APPROVED" | "REJECTED" | "IN_REVISION";

export interface SwotItem {
  id: string;
  point: string;
  impact: "Alto" | "Médio" | "Crítico";
  strategicImplication?: string;
}

export interface SwotAnalysis {
  strengths: SwotItem[];
  weaknesses: SwotItem[];
  opportunities: SwotItem[];
  threats: SwotItem[];
}

export interface BusinessOpportunity {
  id: string;
  name: string;
  category: "Hospitality AI" | "Creator Economy" | "Marketplace & White-Label" | "B2B Custom Agents" | "Web3 / RWA" | "Automation Pipelines";
  tagline: string;
  targetMarket: string[];
  businessModel: "B2B SaaS + Setup" | "White-Label Licensing" | "Revenue Share" | "High-Ticket Retainer" | "Syndicate Success Fee";
  scores: OpportunityScore;
  totalScore: number;
  priority: PriorityLevel;
  financials: {
    initialDevCost: number; // in EUR
    monthlyOpexPerClient: number; // in EUR
    estimatedCAC: number; // in EUR
    setupFee: number; // in EUR
    monthlyRecurringPrice: number; // in EUR
    targetGrossMargin: number; // in %
    breakEvenClients: number;
    estimatedTimeToBreakEvenMonths: number;
    mrrMonth6Estimate: number;
    isEstimate: boolean;
  };
  differentiation: string[];
  commercialRisks: { risk: string; mitigation: string }[];
  distributionChannels: string[];
  ceoRecommendationSummary: string;
  status: DecisionStatus;
  swot?: SwotAnalysis;
}

export interface MarketProfile {
  id: string;
  name: string;
  region: string;
  currency: string;
  hospitalityReadiness: "Muito Alta" | "Alta" | "Média";
  tamHospitalityEstimate: string;
  averageHotelTicketMonthly: string;
  setupFeeTolerance: "Muito Alta (€4k-€10k)" | "Alta (€2k-€4k)" | "Média (€1k-€2k)";
  keyLanguages: string[];
  strengths: string[];
  regulatoryConsiderations: string;
  marketEntryRecommendation: string;
  priorityScore: number;
}

export interface CeoReport {
  id: string;
  title: string;
  date: string;
  productName: string;
  targetMarket: string;
  status: DecisionStatus;
  executiveSummary: string;
  bestOpportunities: string[];
  recommendedBusinessModel: string;
  pricingStrategy: {
    setupFee: string;
    subscription: string;
    whiteLabelOrAddons: string;
  };
  financialProjections: {
    initialCost: string;
    monthlyOpex: string;
    estimatedCac: string;
    grossMargin: string;
    breakEven: string;
    projectedMrr6M: string;
    transparencyNote: string;
  };
  marketPositioning: string;
  risksAndMitigations: { risk: string; mitigation: string }[];
  recommendedActions: { id: string; action: string; approved: boolean }[];
  fullMarkdownReport?: string;
}

export type SupportedLanguage = "pt" | "en" | "es" | "fr" | "de" | "it" | "ar";
