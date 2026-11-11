import { SwotAnalysis } from "../types/strategy";

export const PRODUCT_SWOT_MAP: Record<string, SwotAnalysis> = {
  "prod-hotel-concierge": {
    strengths: [
      {
        id: "s-1",
        point: "Fluência nativa em 7 idiomas sem latência, com destaque para Árabe no Golfo e principais línguas europeias.",
        impact: "Crítico",
        strategicImplication: "Elimina a barreira de contratação de recepcionistas poliglotas, justificando taxas de setup elevadas (€2.490).",
      },
      {
        id: "s-2",
        point: "Acesso 100% web via QR Code in-room — sem atrito de download de aplicativo em lojas da Apple ou Google.",
        impact: "Alto",
        strategicImplication: "Taxa de adesão do hóspede supera 68% contra menos de 12% de apps legadas de hotéis.",
      },
      {
        id: "s-3",
        point: "Mecanismo proprietário de upsell direto (reservas de spa, mesas de restaurante, room service e late check-out).",
        impact: "Alto",
        strategicImplication: "Gera retorno financeiro direto e mensurável para a gerência do hotel no primeiro mês.",
      },
    ],
    weaknesses: [
      {
        id: "w-1",
        point: "Dependência da colaboração da equipa de receção para manter cardápios e horários de serviços atualizados.",
        impact: "Médio",
        strategicImplication: "Requer processo de onboarding simplificado com formulário automatizado de ingestão de cardápios.",
      },
      {
        id: "w-2",
        point: "Variação na infraestrutura Wi-Fi de hotéis boutique históricos ou edifícios antigos.",
        impact: "Médio",
        strategicImplication: "Interface otimizada para conexões 4G/5G com consumo ultrabaixo de dados.",
      },
    ],
    opportunities: [
      {
        id: "o-1",
        point: "Mercado de ultra-luxo no Dubai e Arábia Saudita (Vision 2030) com alta disposição a pagar por inovação.",
        impact: "Crítico",
        strategicImplication: "Potencial de cobrar tickets 2.5x superiores aos europeus (€1.200/mês vs €490/mês).",
      },
      {
        id: "o-2",
        point: "Parcerias de revenda e integração direta com Property Management Systems (PMS como Opera, Cloudbeds e Mews).",
        impact: "Alto",
        strategicImplication: "Canal de distribuição escalável sem necessidade de força de vendas outbound proporcional.",
      },
      {
        id: "o-3",
        point: "Empacotamento de cross-selling com o AI Tourguide Creator como atração de valor agregado aos hóspedes.",
        impact: "Alto",
        strategicImplication: "Eleva o ARPU do hotel em 30% sem custo de aquisição adicional.",
      },
    ],
    threats: [
      {
        id: "t-1",
        point: "Sistemas PMS tradicionais tentando adicionar módulos rudimentares de chatbot genérico.",
        impact: "Alto",
        strategicImplication: "Manter diferenciação estrita focada na fluência cultural do Árabe e foco em upsell de receita.",
      },
      {
        id: "t-2",
        point: "Sazonalidade turística de inverno em destinos balneares (ex: Algarve).",
        impact: "Médio",
        strategicImplication: "Exigir contratos anuais com faturamento nivelado mensal ou incentivo de 15% para pagamento antecipado.",
      },
    ],
  },

  "prod-tourguide-creator": {
    strengths: [
      {
        id: "s-4",
        point: "Geração instantânea de roteiros geolocalizados com áudio de voz neural em múltiplos idiomas.",
        impact: "Alto",
        strategicImplication: "Custo marginal zero por turista adicional após o roteiro ser compilado pelo criador.",
      },
      {
        id: "s-5",
        point: "Capacidade de atender guias independentes, autarquias e entidades regionais de turismo (DMOs).",
        impact: "Alto",
        strategicImplication: "Duplo canal de monetização: SaaS B2B para governos + marketplace rev-share para criadores.",
      },
    ],
    weaknesses: [
      {
        id: "w-3",
        point: "Necessidade de densidade mínima de pontos de interesse cadastrados para tornar o tour atrativo.",
        impact: "Médio",
        strategicImplication: "Priorizar capitais turísticas densas (Lisboa, Porto, Sevilha, Roma, Londres, Dubai).",
      },
      {
        id: "w-4",
        point: "Concorrência indireta com ferramentas gratuitas de navegação (Google Maps, TripAdvisor).",
        impact: "Médio",
        strategicImplication: "Focar na narrativa de storytelling imersivo e curadoria cultural exclusiva indisponível em mapas genéricos.",
      },
    ],
    opportunities: [
      {
        id: "o-4",
        point: "Cross-selling obrigatório com hotéis clientes do AI Hotel Concierge.",
        impact: "Crítico",
        strategicImplication: "O hotel disponibiliza o tour aos hóspedes como benefício VIP e rentabiliza comissão de 20%.",
      },
      {
        id: "o-5",
        point: "Subvenções públicas e fundos de digitalização do turismo na União Europeia.",
        impact: "Alto",
        strategicImplication: "Contratos de licenciamento governamental plurianuais com câmaras municipais.",
      },
    ],
    threats: [
      {
        id: "t-3",
        point: "Resistência de sindicatos ou associações corporativas de guias turísticos tradicionais.",
        impact: "Médio",
        strategicImplication: "Posicionar a plataforma como ferramenta que capacita o guia a criar o seu próprio produto digital.",
      },
    ],
  },

  "prod-custom-ai-agents": {
    strengths: [
      {
        id: "s-6",
        point: "Maior injeção imediata de capital e fluxo de caixa da empresa (€5.000 a €15.000 por projeto contratado).",
        impact: "Crítico",
        strategicImplication: "Autofinancia os custos de engenharia e crescimento da empresa sem necessidade de empréstimos ou diluição.",
      },
      {
        id: "s-7",
        point: "Margem bruta elevada (79%) em prestação de serviços com arquitetura modular reutilizável.",
        impact: "Alto",
        strategicImplication: "80% da infraestrutura é reaproveitada entre projetos, demandando apenas 20% de customização final.",
      },
    ],
    weaknesses: [
      {
        id: "w-5",
        point: "Menor escalabilidade pura em comparação com SaaS devido à necessidade de alinhamento com clientes C-level.",
        impact: "Alto",
        strategicImplication: "Limitar o volume a no máximo 3 projetos simultâneos para não canibalizar foco nos produtos SaaS.",
      },
    ],
    opportunities: [
      {
        id: "o-6",
        point: "Conversão de clientes de desenvolvimento sob medida em contratos recorrentes de SLA e suporte (€1.250/mês).",
        impact: "Crítico",
        strategicImplication: "Criação de receita recorrente de alto valor com churn próximo de zero.",
      },
      {
        id: "o-7",
        point: "Expansão para escritórios jurídicos e clínicas no Reino Unido e EUA.",
        impact: "Alto",
        strategicImplication: "Honorários em libras e dólares com poder de compra favorável.",
      },
    ],
    threats: [
      {
        id: "t-4",
        point: "Proliferação de agências digitais novatas vendendo 'chatbots' simples que desvalorizam a percepção do mercado.",
        impact: "Médio",
        strategicImplication: "Focar em integração profunda com bases de dados internas, compliance GDPR e automação de processos complexos.",
      },
    ],
  },

  "prod-future-automation": {
    strengths: [
      {
        id: "s-8",
        point: "Agentes de voz com conversação humanizada e resolução de agendamentos telefónicos sem intervenção humana.",
        impact: "Crítico",
        strategicImplication: "Atende diretamente o gargalo número 1 de hospitalidade e clínicas: chamadas telefónicas perdidas fora de horas.",
      },
      {
        id: "s-9",
        point: "Capacidade de processar dezenas de chamadas simultâneas sem espera.",
        impact: "Alto",
        strategicImplication: "Retorno imediato comprovado na redução de cancelamentos e taxa de ocupação.",
      },
    ],
    weaknesses: [
      {
        id: "w-6",
        point: "Custos variáveis de provedores de telefonia e áudio que oscilam conforme a duração da chamada.",
        impact: "Alto",
        strategicImplication: "Adotar modelo de mensalidade fixa com franquia de minutos + taxa por minuto excedente.",
      },
    ],
    opportunities: [
      {
        id: "o-8",
        point: "Escassez severa de mão de obra de receção no setor de saúde e hotelaria nos EUA, Reino Unido e Golfo.",
        impact: "Crítico",
        strategicImplication: "Proposta de valor inquestionável em termos de economia de custos de pessoal.",
      },
    ],
    threats: [
      {
        id: "t-5",
        point: "Sotaques regionais complexos ou ruído acústico severo provocando falhas de transcrição.",
        impact: "Médio",
        strategicImplication: "Fallback automático com transferência inteligente para atendente humano caso a confiança caia abaixo de 85%.",
      },
    ],
  },

  "prod-nexus-store": {
    strengths: [
      {
        id: "s-10",
        point: "Efeito de rede e potencial de modelo de plataforma escalável globalmente.",
        impact: "Alto",
        strategicImplication: "Capacidade de monetizar taxas de transação e licenciamento contínuo de ecossistema.",
      },
    ],
    weaknesses: [
      {
        id: "w-7",
        point: "Dilema clássico de marketplace: requer atração simultânea de desenvolvedores e clientes corporativos compradores.",
        impact: "Alto",
        strategicImplication: "Povoar a loja exclusivamente com os nossos agentes internos comprovados antes de abrir a terceiros.",
      },
    ],
    opportunities: [
      {
        id: "o-9",
        point: "Licenciamento de plataforma White-Label completa para agências de marketing e consultorias (€3.500 setup).",
        impact: "Crítico",
        strategicImplication: "Transforma agências parceiras em canal de distribuição ativo sem custo fixo de equipe de vendas.",
      },
    ],
    threats: [
      {
        id: "t-6",
        point: "Grandes provedores de IA desenvolvendo ecossistemas integrados proprietários.",
        impact: "Alto",
        strategicImplication: "Focar em fluxos de negócios específicos para nichos regulados europeus e do Médio Oriente.",
      },
    ],
  },

  "prod-web3-rwa": {
    strengths: [
      {
        id: "s-11",
        point: "Capacidade de estruturar captações de capital fracionadas de grande porte para resorts e hotelaria sustentável.",
        impact: "Alto",
        strategicImplication: "Potencial de taxas de sucesso muito expressivas (2.5% a 4% do montante total tokenizado).",
      },
    ],
    weaknesses: [
      {
        id: "w-8",
        point: "Incerteza regulatória severa e complexidade de compliance na União Europeia sob o enquadramento MiCA.",
        impact: "Crítico",
        strategicImplication: "Não atuar como custodiante de ativos nem intermediário financeiro; fornecer estritamente o software tecnológico.",
      },
      {
        id: "w-9",
        point: "Ciclo de vendas dilatado (6 a 12 meses) com dependência de decisões de family offices.",
        impact: "Alto",
        strategicImplication: "Exigir pagamento antecipado integral da taxa de desenvolvimento (€15.000) antes de iniciar qualquer código.",
      },
    ],
    opportunities: [
      {
        id: "o-10",
        point: "Ecossistema financeiro do Dubai sob a autoridade VARA, favorável à inovação em Real World Assets (RWA).",
        impact: "Crítico",
        strategicImplication: "Concentrar os esforços de prospecção nos Emirados Árabes Unidos e Qatar em vez da União Europeia.",
      },
    ],
    threats: [
      {
        id: "t-7",
        point: "Mudanças regulatórias repentinas ou volatilidade de reputação do setor cripto.",
        impact: "Crítico",
        strategicImplication: "Manter postura institucional conservadora, enfatizando sempre a garantia do ativo real físico subjacente.",
      },
    ],
  },
};
