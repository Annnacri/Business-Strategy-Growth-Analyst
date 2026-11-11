import { BusinessOpportunity, MarketProfile, CeoReport } from "../types/strategy";

export const INITIAL_PORTFOLIO_OPPORTUNITIES: BusinessOpportunity[] = [
  {
    id: "prod-hotel-concierge",
    name: "AI Hotel Concierge",
    category: "Hospitality AI",
    tagline: "Concierge digital multilíngue 24/7 com suporte a 7 idiomas e upsell de receitas internas para hotéis de luxo",
    targetMarket: ["Portugal", "Dubai and UAE", "Saudi Arabia", "European Union"],
    businessModel: "B2B SaaS + Setup",
    scores: {
      marketDemand: 19, // 20
      revenuePotential: 19, // 20
      profitability: 18, // 20
      implementationFeasibility: 14, // 15
      scalability: 14, // 15
      competitiveAdvantage: 9, // 10
    },
    totalScore: 93,
    priority: "HIGH_PRIORITY",
    financials: {
      initialDevCost: 3200,
      monthlyOpexPerClient: 45,
      estimatedCAC: 650,
      setupFee: 2490,
      monthlyRecurringPrice: 490,
      targetGrossMargin: 88,
      breakEvenClients: 5,
      estimatedTimeToBreakEvenMonths: 3.5,
      mrrMonth6Estimate: 9800,
      isEstimate: true,
    },
    differentiation: [
      "Suporte nativo fluente em Árabe, Inglês, Francês, Alemão, Espanhol, Italiano e Português",
      "Sem necessidade de download de app pelo hóspede (acesso imediato via QR Code in-room e web)",
      "Mecanismo proprietário de upsell de spa, restaurantes e check-out tardio integrado à receção",
      "Dashboards executivos para gerentes hoteleiros monitorarem demandas e satisfação em tempo real",
    ],
    commercialRisks: [
      {
        risk: "Complexidade de integração com PMS legados (ex: Opera)",
        mitigation: "Operar em modo híbrido independente com notificações via WhatsApp/Email e webhooks abertos.",
      },
      {
        risk: "Sazonalidade acentuada em regiões turísticas de verão (Algarve)",
        mitigation: "Contratos de fidelização anual com faturação mensal ou 15% de desconto em pagamento anual antecipado.",
      },
    ],
    distributionChannels: [
      "Venda consultiva direta a hotéis boutique de 4 e 5 estrelas",
      "Parcerias estratégicas com integradores de tecnologia hoteleira e PMS",
      "Associações hoteleiras regionais (ex: AHP em Portugal, DTCM no Dubai)",
    ],
    ceoRecommendationSummary:
      "OPORTUNIDADE ÂNCORA. Deve receber prioridade máxima de capitalização. As taxas de setup cobrem 100% dos custos de onboarding e garantem rentabilidade imediata no primeiro trimestre.",
    status: "APPROVED",
  },
  {
    id: "prod-tourguide-creator",
    name: "AI Tourguide Creator",
    category: "Creator Economy",
    tagline: "Plataforma SaaS para guias, autarquias e criadores gerarem tours interativos geolocalizados com voz de IA",
    targetMarket: ["Portugal", "European Union", "United Kingdom"],
    businessModel: "Revenue Share",
    scores: {
      marketDemand: 16, // 20
      revenuePotential: 16, // 20
      profitability: 17, // 20
      implementationFeasibility: 13, // 15
      scalability: 13, // 15
      competitiveAdvantage: 8, // 10
    },
    totalScore: 83,
    priority: "HIGH_PRIORITY",
    financials: {
      initialDevCost: 2800,
      monthlyOpexPerClient: 25,
      estimatedCAC: 380,
      setupFee: 990,
      monthlyRecurringPrice: 199,
      targetGrossMargin: 82,
      breakEvenClients: 7,
      estimatedTimeToBreakEvenMonths: 4,
      mrrMonth6Estimate: 4200,
      isEstimate: true,
    },
    differentiation: [
      "Áudio-guias sintetizados por IA com roteiros culturais validados e geolocalização precisa",
      "Possibilidade de criar tours multilíngues instantâneos para turistas de qualquer nacionalidade",
      "Cross-sell direto com o AI Hotel Concierge: o hotel oferece o tourguide aos hóspedes como atração exclusiva",
    ],
    commercialRisks: [
      {
        risk: "Resistência inicial de guias turísticos tradicionais",
        mitigation: "Posicionar a ferramenta como capacitação do guia (ele vende o tour digital como produto complementar à visita guiada física).",
      },
      {
        risk: "Dependência de densidade de pontos turísticos",
        mitigation: "Foco inicial estrito em centros urbanos densos (Lisboa, Porto, Sevilha, Roma, Londres).",
      },
    ],
    distributionChannels: [
      "Parcerias com Postos de Turismo e Câmaras Municipais (DMOs)",
      "Comunidades de guias turísticos certificados",
      "Distribuição cruzada com clientes do AI Hotel Concierge",
    ],
    ceoRecommendationSummary:
      "Excelente produto sinérgico. Recomendamos empacotar como 'Add-on Premium' para hotéis clientes do Concierge, gerando nova linha de receita sem custo adicional de aquisição.",
    status: "PENDING_CEO_APPROVAL",
  },
  {
    id: "prod-custom-ai-agents",
    name: "Custom AI Agents (Bespoke Enterprise)",
    category: "B2B Custom Agents",
    tagline: "Agentes autônomos sob medida para automação de processos em escritórios jurídicos, imobiliárias e clínicas",
    targetMarket: ["Portugal", "United Kingdom", "United States", "European Union"],
    businessModel: "High-Ticket Retainer",
    scores: {
      marketDemand: 18, // 20
      revenuePotential: 18, // 20
      profitability: 19, // 20
      implementationFeasibility: 14, // 15
      scalability: 10, // 15 (serviço mais dependente de esforço sob medida)
      competitiveAdvantage: 8, // 10
    },
    totalScore: 87,
    priority: "HIGH_PRIORITY",
    financials: {
      initialDevCost: 1500,
      monthlyOpexPerClient: 90,
      estimatedCAC: 950,
      setupFee: 7500,
      monthlyRecurringPrice: 1250,
      targetGrossMargin: 79,
      breakEvenClients: 2,
      estimatedTimeToBreakEvenMonths: 1.5,
      mrrMonth6Estimate: 12500,
      isEstimate: true,
    },
    differentiation: [
      "Soluções proprietárias conectadas a ERPs, CRMs e bancos de dados locais com rigor de segurança GDPR",
      "Receita imediata e expressiva via taxa de desenvolvimento de alto valor (€5k - €15k por projeto)",
      "Retainer mensal de manutenção, calibração e SLA garantido",
    ],
    commercialRisks: [
      {
        risk: "Gargalo operacional de entregas customizadas exigindo horas de engenharia",
        mitigation: "Padronizar 80% do pipeline em módulos reutilizáveis e personalizar apenas a integração final de 20%.",
      },
    ],
    distributionChannels: [
      "Networking direto com executivos C-level",
      "Prospecção outbound qualificada no LinkedIn (B2B)",
      "Indicações com comissão de referência para consultores de gestão",
    ],
    ceoRecommendationSummary:
      "MAIOR GERADOR DE FLUXO DE CAIXA IMEDIATO. Ideal para autofinanciar o crescimento dos produtos SaaS sem necessidade de diluição ou capital de risco externo.",
    status: "APPROVED",
  },
  {
    id: "prod-future-automation",
    name: "Future AI Automation Solutions",
    category: "Automation Pipelines",
    tagline: "Agentes de voz autônomos e automação de reservas e atendimento para central telefônica de clínicas e hospitalidade",
    targetMarket: ["United States", "United Kingdom", "Dubai and UAE"],
    businessModel: "B2B SaaS + Setup",
    scores: {
      marketDemand: 18, // 20
      revenuePotential: 17, // 20
      profitability: 16, // 20
      implementationFeasibility: 12, // 15
      scalability: 14, // 15
      competitiveAdvantage: 8, // 10
    },
    totalScore: 85,
    priority: "HIGH_PRIORITY",
    financials: {
      initialDevCost: 4500,
      monthlyOpexPerClient: 80,
      estimatedCAC: 800,
      setupFee: 1950,
      monthlyRecurringPrice: 650,
      targetGrossMargin: 80,
      breakEvenClients: 4,
      estimatedTimeToBreakEvenMonths: 3,
      mrrMonth6Estimate: 7800,
      isEstimate: true,
    },
    differentiation: [
      "Latência ultrabaixa com voz natural humanizada em múltiplos idiomas",
      "Atendimento instantâneo a chamadas telefônicas sem filas de espera, agendando diretamente na agenda médica/hoteleira",
    ],
    commercialRisks: [
      {
        risk: "Custos de APIs de voz/telefonia (Twilio + LLM) em alto volume de chamadas",
        mitigation: "Modelo de preços híbrido: mensalidade base fixa inclui minutos franquiados + cobrança por minuto excedente.",
      },
    ],
    distributionChannels: ["Campanhas de demonstração gravada via cold email para diretores de operações hoteleiras e clínicas"],
    ceoRecommendationSummary:
      "Tecnologia de ponta com forte tração nos mercados anglo-saxónicos e no Golfo. Desenvolver após a consolidação do AI Hotel Concierge.",
    status: "PENDING_CEO_APPROVAL",
  },
  {
    id: "prod-nexus-store",
    name: "NexusAIStore",
    category: "Marketplace & White-Label",
    tagline: "Marketplace corporativo de agentes e workflows de IA pré-treinados para distribuição e revenda white-label",
    targetMarket: ["European Union", "United States", "Portugal"],
    businessModel: "White-Label Licensing",
    scores: {
      marketDemand: 15, // 20
      revenuePotential: 16, // 20
      profitability: 17, // 20
      implementationFeasibility: 11, // 15
      scalability: 15, // 15
      competitiveAdvantage: 7, // 10
    },
    totalScore: 81,
    priority: "HIGH_PRIORITY",
    financials: {
      initialDevCost: 5500,
      monthlyOpexPerClient: 60,
      estimatedCAC: 1100,
      setupFee: 3500,
      monthlyRecurringPrice: 850,
      targetGrossMargin: 86,
      breakEvenClients: 6,
      estimatedTimeToBreakEvenMonths: 5,
      mrrMonth6Estimate: 6800,
      isEstimate: true,
    },
    differentiation: [
      "Permite que agências digitais revendam soluções de IA sob a sua própria marca (white-label completo)",
      "Receita previsível por taxa de licenciamento de plataforma anual + percentagem sobre consumo de tokens",
    ],
    commercialRisks: [
      {
        risk: "Efeito 'ovo e galinha' clássico de marketplaces para atrair volume de compradores e desenvolvedores",
        mitigation: "Preencher a loja inicialmente com os nossos próprios 8 agentes proprietários comprovados antes de abrir a terceiros.",
      },
    ],
    distributionChannels: ["Comunidades de agências de marketing e consultorias de software B2B"],
    ceoRecommendationSummary:
      "Grande potencial de escala a longo prazo. Deve ser abastecido prioritariamente com as soluções internas já testadas.",
    status: "IN_REVISION",
  },
  {
    id: "prod-web3-rwa",
    name: "Web3 & RWA Tokenization projects",
    category: "Web3 / RWA",
    tagline: "Estruturação tecnológica para tokenização de ativos do mundo real (hotelaria boutique fracionada e resorts sustentáveis)",
    targetMarket: ["Dubai and UAE", "Portugal", "Qatar"],
    businessModel: "Syndicate Success Fee",
    scores: {
      marketDemand: 13, // 20
      revenuePotential: 18, // 20
      profitability: 16, // 20
      implementationFeasibility: 8, // 15
      scalability: 11, // 15
      competitiveAdvantage: 6, // 10
    },
    totalScore: 72,
    priority: "MODERATE_PRIORITY",
    financials: {
      initialDevCost: 8500,
      monthlyOpexPerClient: 120,
      estimatedCAC: 2500,
      setupFee: 15000,
      monthlyRecurringPrice: 2000,
      targetGrossMargin: 74,
      breakEvenClients: 2,
      estimatedTimeToBreakEvenMonths: 8,
      mrrMonth6Estimate: 4000,
      isEstimate: true,
    },
    differentiation: [
      "Permite a investidores internacionais participarem no financiamento fracionado de empreendimentos hoteleiros de luxo",
      "Combinação de smart contracts auditados com benefícios utilitários no hotel (descontos, estadias exclusivas)",
    ],
    commercialRisks: [
      {
        risk: "Incerteza regulatória e enquadramento jurídico rigoroso na União Europeia (MiCA)",
        mitigation: "Focar estruturação nos Emirados Árabes Unidos (VARA em Dubai) e atuar apenas como provedor de software tecnológico, sem custódia de fundos.",
      },
      {
        risk: "Ciclo de venda prolongado (6 a 12 meses)",
        mitigation: "Exigir adiantamento contratual substancial (€15.000) antes do início do desenvolvimento.",
      },
    ],
    distributionChannels: ["Boutiques de Private Equity, Family Offices e promotores imobiliários turísticos no Dubai e Lisboa"],
    ceoRecommendationSummary:
      "ALERTA ESTRATÉGICO: Produto de ciclo longo e alto atrito regulatório. Não recomendamos investir capital próprio no desenvolvimento especulativo. Avançar somente se houver um promotor âncora contratado com setup pago adiantado.",
    status: "IN_REVISION",
  },
];

export const TARGET_MARKETS: MarketProfile[] = [
  {
    id: "mkt-portugal",
    name: "Portugal",
    region: "Península Ibérica / Sul da Europa",
    currency: "EUR (€)",
    hospitalityReadiness: "Muito Alta",
    tamHospitalityEstimate: "€18.5M (1.800+ hotéis e alojamentos turísticos qualificados)",
    averageHotelTicketMonthly: "€350 - €600",
    setupFeeTolerance: "Alta (€2k-€4k)",
    keyLanguages: ["Português", "Inglês", "Espanhol", "Francês"],
    strengths: [
      "Turismo representa mais de 17% do PIB nacional",
      "Forte concentração de hotéis de 4 e 5 estrelas em Lisboa, Porto, Algarve e Madeira",
      "Mercado de teste de proximidade ideal para pilotos rápidos e estudos de caso locais",
      "Elevada proficiência em inglês dos diretores de hotel",
    ],
    regulatoryConsiderations: "Conformidade integral com RGPD (GDPR) e diretrizes europeias de IA responsável.",
    marketEntryRecommendation:
      "Mercado de partida imediato. Estabelecer 3 hotéis âncora no Algarve e Lisboa para produzir métricas de ROI verificadas.",
    priorityScore: 94,
  },
  {
    id: "mkt-uae",
    name: "Dubai and UAE",
    region: "Médio Oriente / Golfo Pérsico",
    currency: "AED / USD / EUR",
    hospitalityReadiness: "Muito Alta",
    tamHospitalityEstimate: "€42.0M (Resorts de ultra-luxo e hospitalidade internacional)",
    averageHotelTicketMonthly: "€800 - €1.800",
    setupFeeTolerance: "Muito Alta (€4k-€10k)",
    keyLanguages: ["Árabe", "Inglês", "Russo", "Francês"],
    strengths: [
      "Maior ADR (Average Daily Rate) e RevPAR médio do turismo mundial",
      "Apetite extremo por inovação tecnológica de ponta e automação de luxo",
      "Altíssima tolerância a taxas de setup elevadas (€5.000 - €10.000)",
      "Fluxo constante de turistas internacionais que exigem suporte em múltiplos idiomas",
    ],
    regulatoryConsiderations: "Regime favorável a negócios, sem entraves de impostos diretos; foco em privacidade corporativa.",
    marketEntryRecommendation:
      "MAIOR POTENCIAL DE MARGEM E REVENUES. Exige interface impecável em Árabe com tom de voz sofisticado e parcerias com integradores locais.",
    priorityScore: 98,
  },
  {
    id: "mkt-saudi",
    name: "Saudi Arabia (KSA)",
    region: "Médio Oriente / Golfo Pérsico",
    currency: "SAR / USD",
    hospitalityReadiness: "Muito Alta",
    tamHospitalityEstimate: "€65.0M (Mega-projetos Vision 2030, NEOM, Red Sea Project, AlUla)",
    averageHotelTicketMonthly: "€1.000 - €2.500",
    setupFeeTolerance: "Muito Alta (€4k-€10k)",
    keyLanguages: ["Árabe", "Inglês"],
    strengths: [
      "Investimento governamental de mais de $800 bilhões no setor de turismo e lazer",
      "Mandato governamental para adoção de Inteligência Artificial nativa",
      "Oportunidades em mega-resorts recém-inaugurados sem legado de software antigo",
    ],
    regulatoryConsiderations: "Soberania de dados e conformidade estrita com regulação de dados local e respeito a normas culturais.",
    marketEntryRecommendation:
      "Alvo prioritário para contratos enterprise através de parceiros locais certificados.",
    priorityScore: 96,
  },
  {
    id: "mkt-eu",
    name: "European Union (ES, FR, IT, DE)",
    region: "Europa Ocidental",
    currency: "EUR (€)",
    hospitalityReadiness: "Alta",
    tamHospitalityEstimate: "€140M (Espanha, França e Itália lideram chegadas globais de turistas)",
    averageHotelTicketMonthly: "€450 - €850",
    setupFeeTolerance: "Alta (€2k-€4k)",
    keyLanguages: ["Espanhol", "Francês", "Italiano", "Alemão", "Inglês"],
    strengths: [
      "Espanha e França são os 2 destinos mais visitados do planeta",
      "Necessidade crítica de comunicação fluente com turistas de múltiplas origens linguísticas",
      "Mercado maduro para SaaS de gestão hoteleira",
    ],
    regulatoryConsiderations: "EU AI Act (Lei de IA Europeia) e RGPD. Os modelos devem garantir proteção total de dados de hóspedes.",
    marketEntryRecommendation:
      "Expansão gradual a partir de Espanha (Baleares e Costa do Sol) aproveitando sinergias ibéricas.",
    priorityScore: 91,
  },
  {
    id: "mkt-uk",
    name: "United Kingdom",
    region: "Norte da Europa",
    currency: "GBP (£)",
    hospitalityReadiness: "Alta",
    tamHospitalityEstimate: "€32.0M (Londres e hotéis boutique de campo)",
    averageHotelTicketMonthly: "£450 - £900 (€520 - €1.050)",
    setupFeeTolerance: "Alta (€2k-€4k)",
    keyLanguages: ["Inglês"],
    strengths: [
      "Elevada disposição a pagar por software que reduz custos operacionais de mão de obra",
      "Escassez crónica de pessoal de receção e atendimento hoteleiro pós-Brexit",
    ],
    regulatoryConsiderations: "UK GDPR e regime de IA pró-inovação.",
    marketEntryRecommendation:
      "Focar no argumento de redução de sobrecarga da receção e atendimento noturno 24/7.",
    priorityScore: 89,
  },
  {
    id: "mkt-usa",
    name: "United States",
    region: "América do Norte",
    currency: "USD ($)",
    hospitalityReadiness: "Muito Alta",
    tamHospitalityEstimate: "€210M (Cadeias de hotéis, resorts e hospitalidade independente)",
    averageHotelTicketMonthly: "$650 - $1.400",
    setupFeeTolerance: "Muito Alta (€4k-€10k)",
    keyLanguages: ["Inglês", "Espanhol"],
    strengths: [
      "Maior mercado SaaS do mundo com rápida decisão de compra se comprovado ROI",
      "Alta adesão a pagamentos anuais no cartão de crédito corporativo",
    ],
    regulatoryConsiderations: "Conformidade com CCPA (Califórnia) e regras estaduais de privacidade.",
    marketEntryRecommendation:
      "Mercado de alta concorrência. Não entrar via outbound frio sem ter estudos de caso europeus consolidados.",
    priorityScore: 86,
  },
  {
    id: "mkt-qatar",
    name: "Qatar",
    region: "Médio Oriente",
    currency: "QAR / USD",
    hospitalityReadiness: "Alta",
    tamHospitalityEstimate: "€14.0M (Hotéis de luxo em Doha e turismo corporativo de conferências)",
    averageHotelTicketMonthly: "€750 - €1.500",
    setupFeeTolerance: "Muito Alta (€4k-€10k)",
    keyLanguages: ["Árabe", "Inglês"],
    strengths: [
      "Turismo de altíssimo padrão aquisitivo",
      "Eventos diplomáticos e conferências globais contínuas",
    ],
    regulatoryConsiderations: "Políticas rigorosas de hospitalidade nacional e segurança da informação.",
    marketEntryRecommendation:
      "Abordar em conjunto com a expansão nos Emirados e Arábia Saudita.",
    priorityScore: 87,
  },
];

export const INITIAL_CEO_REPORTS: CeoReport[] = [
  {
    id: "rep-001",
    title: "Relatório de Lançamento Comercial: AI Hotel Concierge nos Mercados de Portugal e Dubai",
    date: "2026-11-06",
    productName: "AI Hotel Concierge",
    targetMarket: "Portugal & Dubai (UAE)",
    status: "APPROVED",
    executiveSummary:
      "O AI Hotel Concierge apresenta o melhor alinhamento estratégico da empresa em 2026. Combina baixo custo de desenvolvimento incremental (€3.200) com alta tolerância de mercado a taxas de setup (€2.490). Recomendamos a execução imediata de um piloto em 5 hotéis em Portugal para construir casos de sucesso antes da entrada em escala no mercado hoteleiro do Dubai.",
    bestOpportunities: [
      "Hotéis de 4 e 5 estrelas no Algarve e Lisboa que enfrentam sobrecarga na receção no check-in/check-out.",
      "Resorts de luxo no Dubai que necessitam de atendimento multilíngue simultâneo em Árabe e Inglês sem barreiras de app.",
      "Venda cruzada direta do AI Tourguide Creator para os mesmos clientes hoteleiros.",
    ],
    recommendedBusinessModel:
      "Modelo Híbrido: Setup Fee de ativação (€2.490) + Subscrição SaaS Mensal Recorrente (€490/mês por hotel). Contratos de 12 meses com faturamento mensal.",
    pricingStrategy: {
      setupFee: "€2.490 por propriedade (inclui configuração, cardápios e personalização de marca)",
      subscription: "€490/mês (até 150 quartos) ou €790/mês (resorts acima de 150 quartos)",
      whiteLabelOrAddons: "Add-on de integração PMS: +€150/mês. Licenciamento White-label para agências: €1.500/ano.",
    },
    financialProjections: {
      initialCost: "€3.200 (Estimativa Modelada de Engenharia e Integração)",
      monthlyOpex: "€45/mês por cliente (APIs de LLM + Cloud) (Estimativa)",
      estimatedCac: "€650 por cliente fechado via outbound especializado (Estimativa)",
      grossMargin: "88% de margem bruta em operação de regime",
      breakEven: "5 clientes ativos (atingível no 3º mês de operação)",
      projectedMrr6M: "€9.800 MRR (com 20 hotéis ativos no Mês 6)",
      transparencyNote: "Os custos operacionais de API baseiam-se em testes com a infraestrutura da Google Cloud. Métricas de conversão comercial são projeções modeladas sujeitas a validação empírica nos pilotos.",
    },
    marketPositioning:
      "Líder em facilidade de uso para hóspedes (sem download de app, acesso via QR Code instantâneo) e pioneiro no suporte nativo ao Árabe para mercados do Golfo.",
    risksAndMitigations: [
      {
        risk: "Resistência de diretores operacionais com receio de substituir a equipa humana.",
        mitigation: "Posicionar o produto como 'Assistente dos Recepcionistas', liberando a equipa de responder perguntas repetitivas sobre Wi-Fi e horários de pequeno-almoço.",
      },
      {
        risk: "Sazonalidade no Algarve.",
        mitigation: "Contratos de fidelização anual com preço diluído ou pagamento anual com desconto.",
      },
    ],
    recommendedActions: [
      { id: "act-1", action: "Aprovar início do programa piloto com 3 hotéis boutique em Portugal com setup subsidiado em troca de depoimento.", approved: true },
      { id: "act-2", action: "Finalizar pacote de marketing e demonstração em vídeo em Inglês e Árabe.", approved: true },
      { id: "act-3", action: "Iniciar contactos com 2 integradores de software hoteleiro no Dubai.", approved: false },
    ],
  },
  {
    id: "rep-002",
    title: "Avaliação Estratégica: Riscos e Monetização de Web3 & RWA Tokenization",
    date: "2026-11-04",
    productName: "Web3 and RWA Tokenization projects",
    targetMarket: "Dubai & União Europeia",
    status: "IN_REVISION",
    executiveSummary:
      "A tokenização de ativos do mundo real possui potencial de receita elevado, mas traz atrito regulatório extremo sob a legislação europeia (MiCA) e um ciclo de vendas dilatado (6 a 9 meses). O Agent 04 recomenda NÃO alocar capital próprio em desenvolvimento especulativo desta frente, mantendo-a apenas como serviço sob encomenda caso surja cliente âncora com setup antecipado pago.",
    bestOpportunities: [
      "Promotores imobiliários turísticos no Dubai operando sob as diretrizes da autoridade VARA.",
      "Projetos de hotelaria ecológica fracionada no Alentejo/Comporta com fundos de capital de risco.",
    ],
    recommendedBusinessModel:
      "Taxa de Estruturação Tecnológica (€25.000) + Success Fee de 2.5% sobre o montante captado na oferta.",
    pricingStrategy: {
      setupFee: "€15.000 a €25.000 (taxa fixa de desenvolvimento do smart contract e portal)",
      subscription: "€2.000/mês de manutenção de infraestrutura e custódia tecnológica",
      whiteLabelOrAddons: "Success fee de 2% a 3% do volume total tokenizado",
    },
    financialProjections: {
      initialCost: "€8.500 (Estimativa de auditoria e smart contract)",
      monthlyOpex: "€120/mês (infraestrutura e nós blockchain)",
      estimatedCac: "€2.500 (Ciclo de venda executivo complexo)",
      grossMargin: "74%",
      breakEven: "2 projetos contratados",
      projectedMrr6M: "€4.000 MRR (mais taxas pontuais de sucesso)",
      transparencyNote: "Custos de pareceres jurídicos e compliance MiCA não estão incluídos nesta estimativa e devem ser suportados integralmente pelo cliente.",
    },
    marketPositioning:
      "Provedor puramente tecnológico (SaaS/B2B Tech Provider), sem atuar como intermediário financeiro ou custodiante.",
    risksAndMitigations: [
      {
        risk: "Alterações regulatórias na UE e risco de sanções MiCA.",
        mitigation: "Limitar o escopo ao software tecnológico e exigir que o cliente obtenha as licenças financeiras.",
      },
    ],
    recommendedActions: [
      { id: "act-4", action: "Suspender alocação de horas de desenvolvimento proativo até assinatura de contrato com cliente pagante.", approved: true },
      { id: "act-5", action: "Concentrar os esforços de crescimento no AI Hotel Concierge e Custom AI Agents.", approved: true },
    ],
  },
];
