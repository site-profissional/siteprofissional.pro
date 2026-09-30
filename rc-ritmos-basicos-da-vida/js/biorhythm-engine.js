/**
 * =========================================================================================
 * MOTOR CÁLCULO E DADOS: RITMOS BÁSICOS DA VIDA - PEDRO RAUL MORALES (AMORC)
 * =========================================================================================
 * Baseado fielmente na monografia oficial da Ordem Rosacruz AMORC
 * Coordenação e Supervisão: Charles Vega Parucker, Grande Mestre
 * Biblioteca Rosacruz - Grande Loja da Jurisdição de Língua Portuguesa
 * 
 * Contém a implementação matemática e os textos canônicos para:
 * 1. Biorritmos Clássicos (Físico 23d, Emocional 28d, Intelectual 33d)
 * 2. Ciclo Anual da Vida Humana (7 períodos de 52 dias a partir do aniversário)
 * 3. Ciclo Diário de Horas Significativas (7 períodos de 3h35min e Tabela A a G)
 * 4. Ciclo de 144 Anos (Degraus de 7 anos solares e propósito de vida)
 * 5. Fases Lunares e Marés Biológicas
 * =========================================================================================
 */

// Objeto principal que encapsula a lógica e as bases de conhecimento
const MoralesEngine = {

  // =========================================================================
  // 1. DADOS DOS BIORRITMOS CLÁSSICOS (CAPÍTULO III)
  // =========================================================================
  biorhythmsMeta: {
    physical: {
      name: "Físico",
      cycleDays: 23,
      color: "#ef4444", // Vermelho / Vitalidade
      positiveRange: [2, 11],
      criticalDays: [1, 12],
      negativeRange: [13, 23],
      precautionDays: [7, 18],
      description: "Rege a força muscular, resistência imunológica, estado de alerta físico, coordenação motora e vitalidade celular.",
      positiveText: "Energia abundante, vigor, rapidez de reflexos e alta resistência a infecções e fadiga. Ideal para esforço físico, treinos e atividades dinâmicas.",
      negativeText: "Fase de recarga biológica. Menor energia motora, reações mais lentas e necessidade natural de repouso reparador. Evite esgotamentos físicos desnecessários.",
      criticalText: "Dia Crítico (cruza o eixo zero). O organismo sofre instabilidade fisiológica temporária, com fadiga repentina e propensão aumentada a acidentes mecânicos. Redobre a cautela e tome mais líquidos."
    },
    emotional: {
      name: "Emocional",
      cycleDays: 28,
      color: "#38bdf8", // Ciano / Sensibilidade e Psiquismo
      positiveRange: [2, 14],
      criticalDays: [1, 15],
      negativeRange: [16, 28],
      precautionDays: [8, 22],
      description: "Rege a estabilidade do ânimo, disposição afetiva, intuição sensível, simpatia social e respostas aos estímulos externos.",
      positiveText: "Bom humor, otimismo, simpatia, estabilidade emocional e facilidade para harmonizar relacionamentos afetivos e de trabalho.",
      negativeText: "Fase de interiorização emocional. Humor instável, tendência à introspecção e melancolia passageira. Momento oportuno para autoexame e meditação; evite reagir sob impulso.",
      criticalText: "Dia Crítico Emocional. Risco de volubilidade, irritabilidade repentina e julgamentos precipitados guiados pelo sentimento. Recomenda-se serenidade, paciência e evitar discussões acaloradas."
    },
    intellectual: {
      name: "Intelectual",
      cycleDays: 33,
      color: "#10b981", // Esmeralda / Mente e Lógica
      positiveRange: [2, 16],
      criticalDays: [1, 17],
      negativeRange: [18, 33],
      precautionDays: [9, 16],
      description: "Rege a memória, lucidez mental, capacidade de síntese lógica, facilidade de aprendizagem e assimilação de novos conceitos.",
      positiveText: "Clareza mental cristalina, dinamismo psíquico aguçado, excelente retenção na memória e alta criatividade. Excelente para estudos densos, escrita, programação e cálculo.",
      negativeText: "Pensamento em ritmo mais contemplativo. Pode ocorrer lentidão temporária em cálculos complexos ou relutância a esforços intelectuais exaustivos. Bom para revisão e rotina.",
      criticalText: "Dia Crítico Intelectual. Maior propensão a equívocos em análises, lapsos de atenção e erros de digitação ou cálculo. Releia documentos e contratos com atenção dupla antes de assinar."
    }
  },

  // =========================================================================
  // 2. DADOS DO CICLO ANUAL DOS 52 DIAS (CAPÍTULO IV)
  // =========================================================================
  annualPeriods: [
    {
      period: 1,
      name: "Primeiro Período",
      title: "Início, Expansão e Poder Pessoal",
      subtitle: "Do Aniversário até 51 dias após",
      description: "A pessoa deve utilizar todo o poder e habilidade pessoal para fazer progredir seus interesses entre pessoas influentes. É um período favorável para solicitar favores, buscar empregos, empréstimos, associações, fazer investimentos e concessões especiais. Momento de seguir em frente com cuidado mas resolutamente.",
      favorable: [
        "Solicitar favores e buscar apoio de figuras influentes",
        "Iniciar novos empreendimentos, negócios ou projetos profissionais",
        "Pedir empréstimos, financiamentos e abrir sociedades",
        "Dar início a novos tratamentos médicos e mudanças de hábitos"
      ],
      unfavorable: [
        "Inércia ou procrastinação nas primeiras semanas",
        "Duvidar do próprio potencial realizador"
      ],
      health: "A saúde e a vitalidade orgânica estão em alta, restaurando-se rapidamente caso estejam abaixo do normal, desde que se leve uma vida saudável e sem excessos. Período mais apropriado para iniciar tratamentos regenerativos."
    },
    {
      period: 2,
      name: "Segundo Período",
      title: "Viagens Curtas e Negociações Rápidas",
      subtitle: "De 52 a 103 dias após o aniversário",
      description: "Período favorável para viagens curtas de negócios, mudanças de residência temporárias e negociações com empresas de transporte ou comércio dinâmico. A mente está rápida, versátil e adaptável.",
      favorable: [
        "Viagens rápidas a negócios ou aperfeiçoamento",
        "Transações que exijam agilidade documental",
        "Firmar acordos temporários devidamente registrados",
        "Reorganização de métodos de trabalho"
      ],
      unfavorable: [
        "Acordos e promessas meramente verbais (tendem a se desfazer)",
        "Assinatura de contratos duradouros sem revisão jurídica meticulosa"
      ],
      health: "O organismo pode ser afetado por pequenas indisposições transitórias, dores de cabeça, transtornos digestivos ou resfriados leves. Mantenha o ânimo alegre e não hipervalorize desconfortos passageiros."
    },
    {
      period: 3,
      name: "Terceiro Período",
      title: "Força Motora, Energia e Ação Executiva",
      subtitle: "De 104 a 155 dias após o aniversário",
      description: "Período de imensa energia dinâmica e construtividade. Os impulsos realizadores atingem o nível máximo de atividade. Contudo, exige discrição e autodomínio contra a impulsividade e atritos.",
      favorable: [
        "Trabalho produtivo intenso e colocação de planos em prática",
        "Adotar meios modernos de fabricação, propaganda e venda",
        "Superar metas comerciais arrojadas e cobranças pendentes"
      ],
      unfavorable: [
        "Brigas, desavenças e discussões judiciais (geram prejuízos para ambas as partes)",
        "Excesso de velocidade, imprudências com ferramentas ou fogo",
        "Alimentação excessivamente pesada"
      ],
      health: "Maior exposição a pequenos acidentes por afobação (queimaduras, quedas, cortes). A pressão arterial tende a elevar-se; vigie o consumo de sal, descanse à noite e evite estresse laboral."
    },
    {
      period: 4,
      name: "Quarto Período",
      title: "Estudos, Ciências e Consolidação Mental",
      subtitle: "De 156 a 207 dias após o aniversário",
      description: "A energia vibratória estimula o intelecto superior, a literatura, o conhecimento científico e a comunicação escrita. O ritmo favorece o planejamento detalhado e o aprimoramento técnico.",
      favorable: [
        "Pesquisas técnicas, estudos aprofundados e cursos de capacitação",
        "Escrita de relatórios, livros, artigos e propostas comerciais",
        "Atividades que exijam reflexão silenciosa e planejamento minucioso"
      ],
      unfavorable: [
        "Contratos apressados sem verificação de detalhes",
        "Precipitação em decisões financeiras que envolvam grande risco"
      ],
      health: "Pode haver sensação de cansaço mental ou tensão nervosa se houver sobrecarga de trabalho. Recomenda-se dormir e descansar um pouco mais do que nos períodos anteriores."
    },
    {
      period: 5,
      name: "Quinto Período",
      title: "O Período Mais Afortunado do Ano",
      subtitle: "De 208 a 259 dias após o aniversário",
      description: "É considerado o melhor período de cada ano para assuntos materiais e sociais! Os impulsos cósmicos tendem a trazer um final feliz e fecundo a todas as propostas honestas que forem iniciadas.",
      favorable: [
        "Fechamento de grandes negócios, expansão e novos investimentos",
        "Tratar de assuntos legais decisivos e cobranças difíceis",
        "Empreender viagens longas e novos contatos no exterior",
        "Casamentos, parcerias duradouras e conciliações"
      ],
      unfavorable: [
        "Atitudes egoístas ou gananciosas (quebre o fluxo de prosperidade)"
      ],
      health: "Muito favorável à vitalidade geral. Cuide preventivamente de garganta, rins e pele. Beba água com abundância, mantenha os intestinos regulares e faça caminhadas ao ar livre."
    },
    {
      period: 6,
      name: "Sexto Período",
      title: "Relações Públicas, Arte e Descanso",
      subtitle: "De 260 a 311 dias após o aniversário",
      description: "Período harmônico, ideal para promover a estética, design, descanso programado, relações públicas e colheita pacífica do trabalho já executado.",
      favorable: [
        "Relações sociais com pessoas de distinção e autoridade",
        "Campanhas publicitárias voltadas ao refinamento da marca",
        "Viagens de férias, passeios culturais e apreciação das artes",
        "Consolidação de amizades sólidas"
      ],
      unfavorable: [
        "Iniciar disputas litigiosas ou discussões desgastantes"
      ],
      health: "Excelente estabilidade orgânica. Momento adequado para procedimentos estéticos saudáveis, relaxamento consciente e revitalização mental em contato com a natureza."
    },
    {
      period: 7,
      name: "Sétimo Período",
      title: "Transição, Limpeza e Renovação Cósmica",
      subtitle: "De 312 dias até a véspera do próximo aniversário",
      description: "É o período crítico e de faxina de cada ano pessoal. Como a demolição e nivelamento de um terreno antigo para erguer um novo edifício, tudo o que não tem base sólida tende a ruir para dar lugar ao novo ciclo.",
      favorable: [
        "Finalizar tarefas pendentes, quitar dívidas e organizar arquivos",
        "Práticas de meditação, silêncio e retiro espiritual",
        "Planejar com prudência os passos do próximo ano pessoal",
        "Descartar velhos ressentimentos e hábitos nocivos"
      ],
      unfavorable: [
        "Lançar novos negócios importantes ou assumir compromissos de longo prazo",
        "Empréstimos arriscados e especulações financeiras",
        "Intervenções cirúrgicas eletivas que possam ser adiadas para o 1º período"
      ],
      health: "A vitalidade do sangue está mais baixa e o ânimo tende ao recolhimento. Proteja-se de friagens e infecções. Não inicie tratamentos agressivos repentinos, a menos que sejam de emergência."
    }
  ],

  // =========================================================================
  // 3. DADOS DOS PERÍODOS DIÁRIOS DE HORAS SIGNIFICATIVAS (CAPÍTULO II)
  // =========================================================================
  dailyWindows: [
    { index: 1, start: "00:00", end: "03:35", label: "1º Período (00:00 às 03:35)" },
    { index: 2, start: "03:35", end: "06:51", label: "2º Período (03:35 às 06:51 — Nascer do Sol)" },
    { index: 3, start: "06:51", end: "10:17", label: "3º Período (06:51 às 10:17)" },
    { index: 4, start: "10:17", end: "13:42", label: "4º Período (10:17 às 13:42)" },
    { index: 5, start: "13:42", end: "17:08", label: "5º Período (13:42 às 17:08)" },
    { index: 6, start: "17:08", end: "20:34", label: "6º Período (17:08 às 20:34)" },
    { index: 7, start: "20:34", end: "24:00", label: "7º Período (20:34 às 24:00)" }
  ],

  // Tabela semanal dos 7 períodos (Tabela 1 da página 34 do livro de Morales)
  // 0: Domingo, 1: Segunda, 2: Terça, 3: Quarta, 4: Quinta, 5: Sexta, 6: Sábado
  weeklyMatrix: {
    0: ["G", "A", "B", "C", "D", "E", "F"], // Domingo (Nascer do Sol = A / Sol)
    1: ["C", "D", "E", "F", "G", "A", "B"], // Segunda (Nascer do Sol = D / Lua)
    2: ["F", "G", "A", "B", "C", "D", "E"], // Terça   (Nascer do Sol = G / Marte)
    3: ["B", "C", "D", "E", "F", "G", "A"], // Quarta  (Nascer do Sol = C / Mercúrio)
    4: ["E", "F", "G", "A", "B", "C", "D"], // Quinta  (Nascer do Sol = F / Júpiter)
    5: ["A", "B", "C", "D", "E", "F", "G"], // Sexta   (Nascer do Sol = B / Vênus)
    6: ["D", "E", "F", "G", "A", "B", "C"]  // Sábado  (Nascer do Sol = E / Saturno)
  },

  // Definição das vibrações diárias A a G (Tabela 2 e Capítulo II)
  vibrationsInfo: {
    "A": {
      planet: "Sol",
      note: "Lá",
      title: "Período Solar (Dignidade, Autoridade e Firmeza)",
      favorable: "Tratar com funcionários públicos e autoridades, assinar procurações ou escrituras, formular planos e pedir promoções.",
      unfavorable: "Começar um negócio comercial novo, comprar imóveis ou fazer cirurgias eletivas.",
      tone: "Solene e Nobre"
    },
    "B": {
      planet: "Vênus",
      note: "Si",
      title: "Período Venusiano (Artes, Harmonia e Comércio)",
      favorable: "Assuntos artísticos, música, decoração do lar, novos acordos comerciais amistosos, cobranças e amizades.",
      unfavorable: "Litígios judiciais agressivos e cobranças violentas.",
      tone: "Harmonioso e Artístico"
    },
    "C": {
      planet: "Mercúrio",
      note: "Dó",
      title: "Período Mercuriano (Estudo, Análise e Documentos)",
      favorable: "Exame minucioso de contratos, escrita, contabilidade, estudos científicos, acordos documentados e contratação.",
      unfavorable: "Acordos meramente verbais com desconhecidos (atenção a enganos); comparecer diante de tribunais.",
      tone: "Analítico e Intelectual"
    },
    "D": {
      planet: "Lua",
      note: "Ré",
      title: "Período Lunar (Público, Ensino e Viagens)",
      favorable: "Contato com o grande público, propaganda, publicidade, educação, semeadura e novos relacionamentos sociais.",
      unfavorable: "Empréstimos arriscados, acordos sigilosos e cirurgias na cabeça.",
      tone: "Público e Magnético"
    },
    "E": {
      planet: "Saturno",
      note: "Mi",
      title: "Período Saturnino (Pesquisa, Concentração e Silêncio)",
      favorable: "Pesquisa científica e histórica, meditação espiritual solitária, redação de trabalhos que exijam profundidade.",
      unfavorable: "Especulações financeiras rápidas, festas sociais, empréstimos e novos casamentos.",
      tone: "Profundo e Meditativo"
    },
    "F": {
      planet: "Júpiter",
      note: "Fá",
      title: "Período Jupiteriano (O Mais Afortunado do Dia)",
      favorable: "Iniciar qualquer negócio novo, assinar contratos decisivos, transações financeiras vultosas e pedir favores.",
      unfavorable: "Nenhuma contraindicação séria. É a melhor janela horária de cada jornada diária!",
      tone: "Próspero e Benéfico"
    },
    "G": {
      planet: "Marte",
      note: "Sol",
      title: "Período Marciano (Ação Técnica, Mecânica e Coragem)",
      favorable: "Trabalhos com máquinas, engenharia, mecânica, consertos urgentes e decisões firmes.",
      unfavorable: "Brigas, discussões conjugais, assinatura de sociedades e lugares de risco com armas/fogo.",
      tone: "Enérgico e Combativo"
    }
  },

  // =========================================================================
  // 4. DADOS DO CICLO DE 144 ANOS / SEPTÊNIOS (CAPÍTULO IV)
  // =========================================================================
  septennialPeriods: [
    { range: [0, 7], period: 1, base: "Cultural", desc: "Assentamento das bases da educação e desenvolvimento cultural. Descoberta do mundo material objetivo e controle corporal." },
    { range: [7, 14], period: 2, base: "Físico", desc: "Transformações biológicas corporais profundas e puberdade. O corpo consolida sua constituição para a fase adulta." },
    { range: [14, 21], period: 3, base: "Psíquico e Caráter", desc: "Formação da dignidade, senso de responsabilidade civil e autoestima. O indivíduo torna-se apto a responder legalmente por seus atos." },
    { range: [21, 28], period: 4, base: "Emocional Superior", desc: "Maturação das emoções refinadas, intuição psíquica aguçada, apreço pelas artes, línguas e valores espirituais." },
    { range: [28, 35], period: 5, base: "Criação Mental e Sucesso", desc: "O grande período criador da mente. Invenções marcantes, iluminação cósmica e consolidação da carreira ou liderança." },
    { range: [35, 42], period: 6, base: "Altruísmo e Transmissão", desc: "Desejo de explorar verdades ocultas, auxiliar na criação de bibliotecas, universidades e retribuir benefícios à sociedade." },
    { range: [42, 49], period: 7, base: "Reflexão Filosófica", desc: "Início de um novo capítulo interior. A mente volta-se mais para a sabedoria transcendental, paz e serenidade." },
    { range: [49, 56], period: 8, base: "Espiritualidade Viva", desc: "O pêndulo físico inclina-se para a prioridade espiritual; compensação do desgaste material por uma rica harmonia interior." },
    { range: [56, 63], period: 9, base: "Maturidade Cósmica", desc: "A alma aproxima-se com serenidade do propósito transcendente de sua existência na Terra." },
    { range: [63, 144], period: 10, base: "Sabedoria Transcendental", desc: "Continuação do aperfeiçoamento da alma vivente até a transição cósmica do ciclo completo de 144 anos." }
  ],

  // =========================================================================
  // 5. MÉTODOS DE CÁLCULO RIGOROSOS
  // =========================================================================

  /**
   * Calcula o número exato de dias vividos utilizando a fórmula oficial do livro de Pedro Raul Morales (pág. 49-50):
   * total = (idade_anos * 365) + dias_adicionais_do_ano + anos_bissextos_vividos + 1
   */
  calcularDiasVividos: function(birthDate, targetDate) {
    const bDate = new Date(birthDate);
    const tDate = new Date(targetDate);
    
    // Anos completos de idade
    let ageYears = tDate.getFullYear() - bDate.getFullYear();
    const bMonth = bDate.getMonth();
    const bDay = bDate.getDate();
    const tMonth = tDate.getMonth();
    const tDay = tDate.getDate();

    // Se ainda não fez aniversário no ano de consulta, subtrai 1 ano
    if (tMonth < bMonth || (tMonth === bMonth && tDay < bDay)) {
      ageYears--;
    }

    // Último aniversário ocorrido
    const lastBirthday = new Date(bDate.getFullYear() + ageYears, bMonth, bDay);
    
    // Dias transcorridos desde o último aniversário até a data alvo
    const diffTime = tDate.getTime() - lastBirthday.getTime();
    const additionalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Contagem de anos bissextos vividos
    // Regra da obra: Se nasceu em ano bissexto após fevereiro, esse ano não acrescentou dia extra à sua vida
    let leapYearsCount = 0;
    for (let yr = bDate.getFullYear(); yr <= tDate.getFullYear(); yr++) {
      const isLeap = (yr % 4 === 0 && (yr % 100 !== 0 || yr % 400 === 0));
      if (isLeap) {
        if (yr === bDate.getFullYear()) {
          // Se nasceu em janeiro ou fevereiro, viveu o dia 29
          if (bMonth === 0 || (bMonth === 1 && bDay <= 29)) {
            leapYearsCount++;
          }
        } else if (yr === tDate.getFullYear()) {
          // Se a data de consulta já passou de 29 de fevereiro
          if (tMonth > 1 || (tMonth === 1 && tDay >= 29)) {
            leapYearsCount++;
          }
        } else {
          leapYearsCount++;
        }
      }
    }

    const baseDays = ageYears * 365;
    const inclusiveBirthDay = 1; // "deve-se sempre somar 1 dia a mais" (Morales, pág. 49)

    const totalDays = baseDays + additionalDays + leapYearsCount + inclusiveBirthDay;

    return {
      ageYears: ageYears,
      baseDays: baseDays,
      additionalDays: additionalDays,
      leapYearsCount: leapYearsCount,
      totalDays: totalDays
    };
  },

  /**
   * Calcula os valores numéricos dos 3 biorritmos (Físico 23, Emocional 28, Intelectual 33)
   */
  calcularBiorritmos: function(totalDays) {
    const calcRest = (days, div) => {
      const rest = days % div;
      return rest === 0 ? div : rest;
    };

    const physRest = calcRest(totalDays, 23);
    const emotRest = calcRest(totalDays, 28);
    const intelRest = calcRest(totalDays, 33);

    const getStatus = (val, meta) => {
      let isCrit = meta.criticalDays.includes(val);
      let isPrecaution = meta.precautionDays.includes(val);
      let isPositive = val >= meta.positiveRange[0] && val <= meta.positiveRange[1];
      let isNegative = val >= meta.negativeRange[0] && val <= meta.negativeRange[1];

      let phase = "Descarga Positiva";
      let phaseClass = "phase-positive";
      let text = meta.positiveText;

      if (isCrit) {
        phase = "DIA CRÍTICO";
        phaseClass = "phase-critical";
        text = meta.criticalText;
      } else if (isPrecaution) {
        phase = "Precaução Mínima";
        phaseClass = "phase-precaution";
        text = meta.criticalText;
      } else if (isNegative) {
        phase = "Recarga Negativa";
        phaseClass = "phase-negative";
        text = meta.negativeText;
      }

      // Percentual sinusoidal para renderização de curvas (-100% a +100%)
      const angle = (2 * Math.PI * (val - 1)) / meta.cycleDays;
      const percentage = Math.sin(angle) * 100;

      return {
        value: val,
        cycleDays: meta.cycleDays,
        phase: phase,
        phaseClass: phaseClass,
        isCritical: isCrit,
        isPrecaution: isPrecaution,
        isPositive: isPositive,
        percentage: Math.round(percentage),
        text: text
      };
    };

    return {
      physical: getStatus(physRest, this.biorhythmsMeta.physical),
      emotional: getStatus(emotRest, this.biorhythmsMeta.emotional),
      intellectual: getStatus(intelRest, this.biorhythmsMeta.intellectual)
    };
  },

  /**
   * Calcula o Período Anual dos 52 dias correspondente à data consultada
   */
  calcularPeriodoAnual: function(birthDate, targetDate) {
    const bDate = new Date(birthDate);
    const tDate = new Date(targetDate);
    
    // Determina o ano do último aniversário
    let refYear = tDate.getFullYear();
    let bMonth = bDate.getMonth();
    let bDay = bDate.getDate();

    let thisYearBirthday = new Date(refYear, bMonth, bDay);
    if (tDate < thisYearBirthday) {
      refYear--;
      thisYearBirthday = new Date(refYear, bMonth, bDay);
    }

    // Gera os 7 intervalos de 52 dias
    const periodsSchedule = [];
    let currentStart = new Date(thisYearBirthday);

    for (let i = 0; i < 7; i++) {
      const pData = this.annualPeriods[i];
      let durationDays = 52;
      
      // O 7º período vai até a véspera do próximo aniversário
      if (i === 6) {
        const nextBirthday = new Date(refYear + 1, bMonth, bDay);
        const diffMs = nextBirthday - currentStart;
        durationDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
      }

      const pEnd = new Date(currentStart);
      pEnd.setDate(pEnd.getDate() + (durationDays - 1));

      const isCurrent = (tDate >= currentStart && tDate <= pEnd);

      periodsSchedule.push({
        ...pData,
        startDate: new Date(currentStart),
        endDate: new Date(pEnd),
        durationDays: durationDays,
        isCurrent: isCurrent
      });

      // Avança para o início do próximo período
      currentStart = new Date(pEnd);
      currentStart.setDate(currentStart.getDate() + 1);
    }

    const currentPeriod = periodsSchedule.find(p => p.isCurrent) || periodsSchedule[0];

    return {
      schedule: periodsSchedule,
      current: currentPeriod,
      refYear: refYear
    };
  },

  /**
   * Determina o período de 7 anos no Ciclo Maior de 144 Anos
   */
  calcularSetenio: function(ageYears) {
    let p = this.septennialPeriods.find(s => ageYears >= s.range[0] && ageYears < s.range[1]);
    if (!p) {
      p = this.septennialPeriods[this.septennialPeriods.length - 1];
    }
    return p;
  },

  /**
   * Obtém os dados da janela horária atual e da vibração do dia da semana
   */
  calcularPeriodoDiario: function(currentTimeDate) {
    const now = currentTimeDate ? new Date(currentTimeDate) : new Date();
    const dayOfWeek = now.getDay(); // 0 = Domingo, 1 = Segunda, etc.
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const totalMinutes = hours * 60 + minutes;

    // Converte os intervalos de 3h35min em minutos
    const windowsMinutes = [
      { idx: 0, startMin: 0, endMin: 215 },      // 00:00 às 03:35
      { idx: 1, startMin: 215, endMin: 411 },    // 03:35 às 06:51
      { idx: 2, startMin: 411, endMin: 617 },    // 06:51 às 10:17
      { idx: 3, startMin: 617, endMin: 822 },    // 10:17 às 13:42
      { idx: 4, startMin: 822, endMin: 1028 },   // 13:42 às 17:08
      { idx: 5, startMin: 1028, endMin: 1234 },  // 17:08 às 20:34
      { idx: 6, startMin: 1234, endMin: 1440 }   // 20:34 às 24:00
    ];

    let currentWin = windowsMinutes.find(w => totalMinutes >= w.startMin && totalMinutes < w.endMin);
    if (!currentWin) currentWin = windowsMinutes[0];

    const vibrationLetter = this.weeklyMatrix[dayOfWeek][currentWin.idx];
    const vibInfo = this.vibrationsInfo[vibrationLetter];
    const windowDef = this.dailyWindows[currentWin.idx];

    // Porcentagem decorrida dentro da janela horária atual
    const elapsed = totalMinutes - currentWin.startMin;
    const totalDuration = currentWin.endMin - currentWin.startMin;
    const progressPercent = Math.min(100, Math.max(0, Math.round((elapsed / totalDuration) * 100)));

    return {
      dayOfWeek: dayOfWeek,
      window: windowDef,
      vibrationLetter: vibrationLetter,
      vibrationInfo: vibInfo,
      progressPercent: progressPercent
    };
  },

  /**
   * Calcula a vibração do momento de nascimento do usuário (se fornecida a hora)
   */
  calcularVibracaoNascimento: function(birthDate, birthTimeString) {
    if (!birthTimeString) return null;
    const [hStr, mStr] = birthTimeString.split(":");
    const h = parseInt(hStr, 10) || 0;
    const m = parseInt(mStr, 10) || 0;
    const bDate = new Date(birthDate);
    const dayOfWeek = bDate.getDay();

    const totalMinutes = h * 60 + m;
    const windowsMinutes = [
      { idx: 0, startMin: 0, endMin: 215 },
      { idx: 1, startMin: 215, endMin: 411 },
      { idx: 2, startMin: 411, endMin: 617 },
      { idx: 3, startMin: 617, endMin: 822 },
      { idx: 4, startMin: 822, endMin: 1028 },
      { idx: 5, startMin: 1028, endMin: 1234 },
      { idx: 6, startMin: 1234, endMin: 1440 }
    ];

    let currentWin = windowsMinutes.find(w => totalMinutes >= w.startMin && totalMinutes < w.endMin);
    if (!currentWin) currentWin = windowsMinutes[0];

    const vibrationLetter = this.weeklyMatrix[dayOfWeek][currentWin.idx];
    const vibInfo = this.vibrationsInfo[vibrationLetter];
    const windowDef = this.dailyWindows[currentWin.idx];

    return {
      window: windowDef,
      letter: vibrationLetter,
      info: vibInfo
    };
  },

  /**
   * Calcula a fase lunar atual (Capítulo V - Influências da Lua)
   */
  calcularFaseLunar: function(targetDate) {
    const tDate = targetDate ? new Date(targetDate) : new Date();
    // Lua Nova de referência conhecida: 11 de janeiro de 2000, 18:24 UTC
    const refNewMoon = new Date(Date.UTC(2000, 0, 11, 18, 24, 0));
    const synodicMonth = 29.53058867; // dias
    const diffDays = (tDate.getTime() - refNewMoon.getTime()) / (1000 * 60 * 60 * 24);
    const phaseAge = ((diffDays % synodicMonth) + synodicMonth) % synodicMonth;

    let phaseName = "Lua Nova";
    let icon = "🌑";
    let desc = "Maré biológica alta no sistema nervoso. Evitar estresse e cirurgias eletivas agressivas. Bom para meditação e plantar vegetais acima do solo.";

    if (phaseAge >= 1.84 && phaseAge < 9.22) {
      phaseName = "Lua Crescente";
      icon = "🌓";
      desc = "Energia vital em expansão contínua. Excelente para novos empreendimentos, tratamentos fortalecedores e assimilação orgânica.";
    } else if (phaseAge >= 9.22 && phaseAge < 16.61) {
      phaseName = "Lua Cheia";
      icon = "🌕";
      desc = "Maré biológica máxima. Pressão circulatória elevada e maior atividade mental. Evitar cirurgias por propensão a hemorragias (Capítulo V). Manter a serenidade.";
    } else if (phaseAge >= 16.61 && phaseAge < 23.99) {
      phaseName = "Lua Minguante";
      icon = "🌗";
      desc = "Período ideal para desintoxicação orgânica, cortes cirúrgicos, eliminação de toxinas e semeadura de raízes sob a terra.";
    }

    return {
      phaseAgeDays: phaseAge.toFixed(1),
      phaseName: phaseName,
      icon: icon,
      recommendation: desc
    };
  }
};

// Exporta globalmente para uso pelo app.js
if (typeof module !== "undefined" && module.exports) {
  module.exports = MoralesEngine;
}
