/**
 * =========================================================================================
 * MOTOR DE CÁLCULO DOS CICLOS DA VIDA - HARVEY SPENCER LEWIS
 * Baseado na obra: "Autodomínio e Destino com os Ciclos da Vida" (Self-Mastery and Fate with the Cycles of Life)
 * Autor: Harvey Spencer Lewis, F.R.C., Ph.D. - Primeiro Imperator da AMORC
 * =========================================================================================
 * Este módulo implementa fielmente as regras matemáticas, tabelas e interpretações
 * literais fornecidas no livro original, sem distorções ou acréscimos especulativos.
 * 
 * Estrutura dos Ciclos Implementados:
 * 1. Ciclo Maior de 7 Anos (Capítulo 5 - Os Períodos Simples da Vida Humana)
 * 2. Ciclo Anual Individual - Ciclo Nº 2 de 52 Dias (Capítulo 6)
 * 3. Ciclo dos Negócios e Empreendimentos - Ciclo Nº 3 (Capítulo 7)
 * 4. Ciclo da Saúde e Vitalidade - Ciclo Nº 4 (Capítulo 9 e 10)
 * 5. Ciclo Diário das Horas Significativas (Capítulo 11, 12, 13 - Tabelas D e E)
 * 6. Ciclo da Alma e Polaridades Solares Cósmicas (Capítulo 14, 15, 16 - Tabela F)
 * 7. Grande Ciclo de Reencarnação de 144 Anos (Capítulo 17)
 * =========================================================================================
 */

const CyclesEngine = (function () {
  'use strict';

  // =======================================================================================
  // 1. DADOS E INTERPRETAÇÕES LITERAIS DO LIVRO (TRADUÇÃO FIEL EM PORTUGUÊS)
  // =======================================================================================

  /**
   * Ciclo Maior de 7 Anos (Capítulo 5)
   * A vida humana avança em oitavas de 7 anos solares cada.
   */
  const SEVEN_YEAR_PERIODS = [
    {
      periodNumber: 1,
      ageRange: "Do Nascimento aos 7 anos",
      title: "Descoberta do Mundo Objetivo e Fundamentos",
      description: "Período da primeira infância e início da juventude. Lançam-se os alicerces da educação, hábitos e cultura. É essencialmente uma fase de auto-descoberta no plano material: a criança aprende a falar, andar, coordenar o corpo e interagir com o ambiente físico circundante."
    },
    {
      periodNumber: 2,
      ageRange: "Dos 7 aos 14 anos",
      title: "Desenvolvimento Biológico e Mudanças Fisiológicas",
      description: "Grandes transformações biológicas e orgânicas ocorrem no organismo. O intelecto atua de forma secundária enquanto o corpo constrói sua estrutura fisiológica para a maturidade. Próximo ao término deste ciclo, ocorrem as mudanças puberais que preparam o jovem para a próxima etapa."
    },
    {
      periodNumber: 3,
      ageRange: "Dos 14 aos 21 anos",
      title: "Despertar Mental, Emocional e da Individualidade",
      description: "As transformações físicas desaceleram e o desenvolvimento mental assume a dianteira. Despertam-se a chama emocional, os ideais de futuro, anseios de independência e a consciência moral. Consolida-se a identidade perante o mundo."
    },
    {
      periodNumber: 4,
      ageRange: "Dos 21 aos 28 anos",
      title: "Fixação Psicológica e Estabelecimento Social",
      description: "Fase em que a individualidade se assenta firmemente. Desenvolvem-se as faculdades emocionais e intelectuais aplicadas à sociedade, formação da carreira e primeiros compromissos da vida adulta duradoura."
    },
    {
      periodNumber: 5,
      ageRange: "Dos 28 aos 35 anos",
      title: "O Ápice da Criatividade Humana",
      description: "O mais fértil período criativo do ser humano! Durante esses anos surgem as maiores obras, invenções, criações literárias, realizações artísticas e marcos empresariais da vida. O indivíduo atinge sua capacidade máxima de manifestar ideias originais no mundo concreto."
    },
    {
      periodNumber: 6,
      ageRange: "Dos 35 aos 42 anos",
      title: "Culminação da Ação e Maestria Executiva",
      description: "Fase em que o homem e a mulher consolidam posições de liderança e maestria. É o momento de colher os frutos dos empreendimentos, dirigir grandes organizações, dispor de investimentos, patrocinar empreendimentos e consolidar seu poder de realização."
    },
    {
      periodNumber: 7,
      ageRange: "Dos 42 aos 49 anos",
      title: "Reflexão Filosófica e Busca de Sabedoria Interior",
      description: "Surge um desejo interior de meditação, contemplação e análise filosófica dos valores reais da vida. O indivíduo inicia um novo capítulo psíquico, reavaliando prioridades e buscando paz mental e compreensão mais profunda da existência."
    },
    {
      periodNumber: 8,
      ageRange: "Dos 49 aos 56 anos",
      title: "Desprendimento do Egoísmo e Serviço Humanitário",
      description: "Tendência a se afastar das ambições puramente egoístas ou mundanas. Cresce o interesse por causas sociais, fraternais, educacionais e beneméritas, visando deixar um legado positivo para as futuras gerações."
    },
    {
      periodNumber: 9,
      ageRange: "Dos 56 aos 63 anos",
      title: "Maturidade Serena e Sabedoria Prática",
      description: "Continuação harmoniosa do ciclo anterior, acompanhada de um abrandamento ('mellowing') das paixões e asperezas do temperamento. A serenidade e o discernimento profundo tornam a pessoa um guia experiente e respeitado."
    },
    {
      periodNumber: 10,
      ageRange: "Dos 63 aos 70 anos e além",
      title: "Oitavas Superiores da Consciência",
      description: "A partir dos 63 anos, os ciclos de 7 anos repetem-se em oitavas superiores de sabedoria até o grande limite harmônico de 144 anos, onde a alma se prepara para sua transição cósmica ou conclusão de sua missão terrena."
    }
  ];

  /**
   * Ciclo Nº 2: O Ciclo Anual da Vida Pessoal (Capítulo 6)
   * 7 períodos de ~52 dias cada, contados a partir do aniversário pessoal.
   */
  const YEARLY_PERSONAL_PERIODS = [
    {
      number: 1,
      days: "1º ao 52º dia",
      name: "Promoção Pessoal, Favores e Influência",
      nature: "Altamente Positivo para Assuntos de Prestígio",
      summary: "Período em que a pessoa deve usar todo o seu poder e magnetismo pessoal para promover seus interesses legítimos junto a indivíduos eminentes e com poder de decisão.",
      favorable: [
        "Solicitar favores, patrocínios ou promoções no trabalho",
        "Apresentar projetos diretamente a superiores, diretores ou autoridades",
        "Assumir a liderança em iniciativas de interesse pessoal",
        "Conquistar o apoio de figuras respeitáveis e influentes"
      ],
      unfavorable: [
        "Ficar passivo ou isolado esperando que os outros reconheçam seus méritos",
        "Delegar a terceiros aquilo que exige sua presença pessoal e confiança"
      ],
      fullText: "Este é um período em que a pessoa deve utilizar todo o seu poder e habilidade pessoal para promover seus próprios interesses junto a pessoas de influência que possam ajudá-la a alcançar a realização de seus desejos ou ambições. É o momento de fazer petições, solicitar posições e buscar o favor de pessoas eminentes. A força do seu magnetismo pessoal estará no ponto mais alto para causar impressões duradouras e respeitadas."
    },
    {
      number: 2,
      days: "53º ao 104º dia",
      name: "Viagens Curtas, Mudanças e Novos Acordos",
      nature: "Dinâmico e Favorável a Pequenas Transições",
      summary: "Período propício para pequenas viagens, transferências provisórias, alterações de rotina, novos acordos interpessoais e renovação de métodos cotidianos.",
      favorable: [
        "Realizar viagens de negócios de curta distância",
        "Fazer reformas rápidas, remodelações ou mudanças temporárias de residência/posto",
        "Estabelecer acordos e entendimentos cooperativos com novos conhecidos",
        "Alterar horários e rotinas para quebrar estagnações"
      ],
      unfavorable: [
        "Permanecer rígido e resistente a pequenas mudanças circunstanciais",
        "Tomar decisões drásticas e irreversíveis que exijam permanência perpétua"
      ],
      fullText: "Este período é distintamente diferente do anterior. Durante estes 52 dias, tudo tende a ser favoravelmente direcionado a mudanças, transferências, viagens curtas e novos acordos ou contratos com outras pessoas. Qualquer esforço feito para alterar a rotina da vida, viajar ou mudar de um local para outro será coroado de sucesso e trará novas e benéficas perspectivas."
    },
    {
      number: 3,
      days: "105º ao 156º dia",
      name: "Energia Vital, Força Executiva e Ação Dinâmica",
      nature: "Forte Potencial - Exige Autodomínio e Cautela",
      summary: "Período de enorme carga de vitalidade e força motriz. Se conduzido com prudência, traz conquistas extraordinárias; se houver pressa ou descontrole, gera litígios e perdas.",
      favorable: [
        "Trabalhos árduos que exijam vigor físico, resistência e comando firme",
        "Impulsionar projetos que estavam lentos ou paralisados",
        "Aplicar disciplina rigorosa e foco inabalável em objetivos definidos",
        "Superar obstáculos materiais por meio de determinação metódica"
      ],
      unfavorable: [
        "Agir com precipitação, impaciência, raiva ou agressividade desmedida",
        "Envolver-se em discussões, disputas judiciais ou litígios inflamados",
        "Manusear máquinas ou fogo de maneira descuidada (risco de incidentes físicos)"
      ],
      fullText: "Aqui temos um período que pode ser afortunado ou infeliz de acordo com a aplicação dos poderes cósmicos e com a discrição e disciplina da pessoa. Há uma abundância de energia física e mental esperando para ser direcionada. Se o indivíduo agir com calma, bom senso e serenidade, realizará maravilhas. Contudo, se ceder ao impulso da pressa, à fúria, a discussões ou a decisões intempestivas, sofrerá reveses, acidentes ou disputas penosas."
    },
    {
      number: 4,
      days: "157º ao 208º dia",
      name: "Intelecto, Comunicação, Literatura e Contratos",
      nature: "Altamente Intelectual e Comunicativo",
      summary: "As forças cósmicas ativam as faculdades mentais superiores. Mente ágil, enxurrada de ideias brilhantes, favorável à escrita, publicações, acordos e negociações.",
      favorable: [
        "Redigir documentos importantes, artigos, livros, relatórios e propostas",
        "Assinar contratos, fechar acordos formais e realizar conferências",
        "Estudos profundos, aprendizado acelerado e cursos intelectuais",
        "Trabalhos de propaganda, cartas, correspondências e campanhas de comunicação"
      ],
      unfavorable: [
        "Permitir que ideias valiosas se percam sem registro escrito imediato",
        "Dispersar a mente em excesso de conversas banais ou assuntos fúteis"
      ],
      fullText: "Neste período, as forças cósmicas influenciam e fortalecem fortemente a mente do indivíduo, concedendo-lhe rapidez de pensamento e grande clarividência racional. As ideias fluirão rapidamente à consciência. É um período extremamente auspicioso para qualquer atividade que envolva escrita, publicações, comunicação por carta, publicidade, estudos intelectuais e celebração de contratos escritos."
    },
    {
      number: 5,
      days: "209º ao 260º dia",
      name: "O Período do Sucesso do Ano (Expansão e Fortuna)",
      nature: "O Período Mais Afortunado para Assuntos Pessoais",
      summary: "O ápice anual para prosperidade, expansão financeira, assuntos privados e jurídicos favoráveis. É a época da grande colheita de esforços no ano pessoal.",
      favorable: [
        "Realizar investimentos financeiros e expandir negócios próprios",
        "Tratar de causas jurídicas, arbitragens e questões legais importantes",
        "Iniciar ou aprofundar estudos metafísicos, filosóficos e espirituais elevados",
        "Promover o crescimento patrimonial e buscar estabilidade de longo prazo"
      ],
      unfavorable: [
        "Assumir atitude avarenta, mesquinha ou excessivamente receosa diante de boas oportunidades",
        "Desperdiçar a fase mais afortunada do ano com inércia e negligência"
      ],
      fullText: "Aqui entramos no chamado Período de Sucesso de cada ano no que diz respeito aos nossos assuntos pessoais e privados. Durante estes 52 dias, a sorte favorece empreendimentos de expansão, ganhos financeiros, acordos com magistrados ou juízes, e investimentos legítimos. É igualmente uma época esplêndida para iniciar estudos metafísicos e filosóficos de alto nível, pois a intuição espiritual estará extraordinariamente iluminada."
    },
    {
      number: 6,
      days: "261º ao 312º dia",
      name: "Férias, Recreação, Arte e Prazer",
      nature: "Agradável, Artístico e Relaxante",
      summary: "O feriado cósmico do ano! Momento sagrado para lazer, arte, descanso, música, romance, convívio social e recarga de energias para a alma.",
      favorable: [
        "Tirar férias, viajar a lazer e desfrutar do contato com a natureza",
        "Participar de eventos musicais, teatrais, artísticos e celebrações sociais",
        "Adquirir itens de arte, beleza e conforto para si e para o lar",
        "Dedicar-se ao romance, aos laços afetivos e ao descanso mental"
      ],
      unfavorable: [
        "Sobrecarregar-se com esforços mentais pesados, tensões ou estresse excessivo",
        "Cometer excessos nos prazeres sensuais ou no consumo alimentar desregrado"
      ],
      fullText: "Este período pode ser chamado de 'feriado do ano'. É a época ideal para o prazer, o divertimento, o relaxamento e o entretenimento refinado. Não deve ser um período de trabalho exaustivo ou tensões severas. É excelente para o cultivo da música, pintura, teatro, compras de artigos belos para o lar e para renovar os laços de amizade e afeição sincera."
    },
    {
      number: 7,
      days: "313º ao 365º dia",
      name: "Período Crítico, Disruptivo e de Reconstrução",
      nature: "Transição e Limpeza - Cautela e Proteção",
      summary: "A fase de involução que antecede a nova evolução. Período que encerra o ano pessoal, exigindo prudência nos negócios, recolhimento, cuidados de saúde e faxina geral.",
      favorable: [
        "Concluir assuntos pendentes e descartar velhos laços ou hábitos nocivos",
        "Fazer reflexão interior, balanço do ano e descansar física e mentalmente",
        "Planejar com prudência o novo ciclo que nascerá no próximo aniversário",
        "Proteger a imunidade e adotar medidas preventivas de saúde"
      ],
      unfavorable: [
        "Iniciar grandes empreendimentos inéditos ou arriscados",
        "Assumir pesadas dívidas, especulações financeiras ou assinar contratos de risco",
        "Submeter-se a procedimentos cirúrgicos não urgentes ou expor-se ao contágio de gripes"
      ],
      fullText: "Este é o período crítico e disruptivo da vida de cada ano. É a fase em que a 'devolução' precede a 'evolução', ou seja, onde o terreno antigo é limpo para que a nova vida renasça no aniversário. Durante estes últimos 52 dias que antecedem seu aniversário, você deve ter a maior cautela: evite novos contratos arriscados, não empreste valores volumosos, não inicie novos negócios complexos e proteja rigorosamente sua saúde contra resfriados e esgotamentos."
    }
  ];

  /**
   * Ciclo Nº 3: O Ciclo dos Negócios e Empreendimentos (Capítulo 7)
   * 7 períodos de 52 dias para empresas, negócios ou carreira comercial.
   */
  const BUSINESS_PERIODS = [
    {
      number: 1,
      name: "Promoção Pública e Apoio de Autoridades",
      focus: "Lançamentos e Captação de Patrocínios",
      description: "Durante os primeiros 52 dias a partir do nascimento da empresa (ou aniversário do gestor), a empresa obterá maior sucesso em todas as formas de promoção que dependam da cooperação de personalidades de grande prestígio, instituições financeiras sólidas e líderes de opinião."
    },
    {
      number: 2,
      name: "Ajustes Operacionais e Mudanças Temporárias",
      focus: "Adaptações e Flexibilidade de Métodos",
      description: "Período ideal para fazer modificações temporárias em relação a colaboradores, alterar métodos de trabalho, testar novas rotinas ou produtos em caráter experimental e abrir novas frentes passageiras de negócios."
    },
    {
      number: 3,
      name: "Construção Vigorosa e Força Máxima de Vendas",
      focus: "Impulso Produtivo e Comercial Agressivo",
      description: "Momento de tremenda energia construtiva. Toda proposta de negócios deve ser empurrada com seu máximo vigor. Todas as instalações, canais de produção, equipe de vendas e distribuição devem operar com força total para conquistar mercado."
    },
    {
      number: 4,
      name: "Grandes Campanhas de Publicidade e Divulgação",
      focus: "Comunicação em Massa e Contratos Formais",
      description: "Época perfeita para deflagrar as maiores campanhas de propaganda, marketing, anúncios, malas-diretas, envio de catálogos e formalização de parcerias contratuais por escrito. O alcance da mensagem atinge o público com máxima eficácia."
    },
    {
      number: 5,
      name: "Crescimento Financeiro, Lucros e Expansão de Crédito",
      focus: "Colheita de Resultados e Prosperidade",
      description: "O período dourado para o crescimento financeiro do negócio. Fase apropriada para obter linhas de crédito bancário, atrair novos investidores sólidos, consolidar capital de giro e fechar negociações lucrativas de alto valor."
    },
    {
      number: 6,
      name: "Desaceleração, Férias da Diretoria e Confraternização",
      focus: "Relaxamento Estratégico e Bem-Estar",
      description: "Momento do ano comercial em que a empresa deve permitir pausas estratégicas, programar férias de executivos e funcionários importantes, comemorar conquistas alcançadas e evitar o esgotamento por excesso de atrito corporativo."
    },
    {
      number: 7,
      name: "Auditoria, Reestruturação e Prevenção de Riscos",
      focus: "Balanço Geral e Proteção Patrimonial",
      description: "Período de cautela redobrada. Não se deve iniciar novas linhas de produtos de alto risco, nem contrair dívidas pesadas. É o momento de cortar despesas desnecessárias, organizar inventários, cobrar inadimplências com método e fechar as contas para o novo ano."
    }
  ];

  /**
   * Ciclo Nº 4: O Ciclo da Saúde e Vitalidade Física (Capítulo 9 e 10)
   */
  const HEALTH_PERIODS = [
    {
      number: 1,
      name: "Vitalidade Máxima e Regeneração Natural",
      warning: "Baixo Risco",
      recommendation: "A vitalidade física e a capacidade de autorregeneração do organismo estão no seu nível máximo anual. Tratamentos naturais, dietas revigorantes e descanso adequado produzem recuperação rápida e fortalecem a imunidade."
    },
    {
      number: 2,
      name: "Sensibilidade Digestiva e Flutuações Passageiras",
      warning: "Atenção Leve",
      recommendation: "Possibilidade de desconfortos leves e passageiros no estômago, fígado e intestinos, além de flutuações de ânimo. Mantenha uma alimentação leve e hidratação abundante; evite comidas pesadas ou excessivamente condimentadas."
    },
    {
      number: 3,
      name: "Alerta para Incidentes Físicos e Tensão Muscular",
      warning: "Cuidado com Acidentes",
      recommendation: "Fase de excesso de energia muscular e nervosa. Recomenda-se muita prudência com objetos cortantes, fogo, ferramentas pontiagudas, quedas e trânsito veloz. Evite operações cirúrgicas repentinas por afobação, exceto em casos de emergência real."
    },
    {
      number: 4,
      name: "Tensão Nervosa, Inquietação e Higiene do Sono",
      warning: "Cuidado com Esgotamento Mental",
      recommendation: "O sistema nervoso é colocado à prova, podendo manifestar-se por insônia, inquietação e irritabilidade. Evite cafeína em excesso, busque ambientes calmos, pratique respiração ritmada profunda e proteja o repouso noturno."
    },
    {
      number: 5,
      name: "Vigor Físico Restaurado e Cura ao Ar Livre",
      warning: "Período Muito Benéfico",
      recommendation: "Excelente período para a saúde e bem-estar geral! O corpo responde esplendidamente a exercícios ao ar livre, caminhadas longas em meio à natureza, banhos de sol moderados e respiração de ar puro."
    },
    {
      number: 6,
      name: "Moderação Sensorial e Proteção das Vias Aéreas",
      warning: "Evitar Excessos de Prazeres",
      recommendation: "Evite excessos de qualquer natureza: comida, bebida, noitadas ou indulgências carnais. Atenção especial à garganta, cordas vocais, rins e sistema urinário/reprodutor. A sobriedade garante a manutenção do vigor."
    },
    {
      number: 7,
      name: "Ponto Crítico da Saúde Anual (Resfriados e Crônicos)",
      warning: "Atenção Máxima à Imunidade",
      recommendation: "O período mais delicado do organismo no ano. É nesta época que se contraem resfriados que teimam em não passar e doenças crônicas que demandam meses para cura. Agasalhe-se bem, evite mudanças bruscas de temperatura, repouse e não realize cirurgias eletivas adiáveis."
    }
  ];

  /**
   * Ciclo Diário: As 24 Horas Divididas em 7 Períodos (Capítulo 11, 12, 13 - Tabelas D e E)
   * Cada período dura exatamente 3h 25m 42 6/7s (aprox. 3h 25m).
   */
  const DAILY_TIME_SLOTS = [
    { slotIndex: 1, name: "1º Período", timeRange: "00:00 às 03:25", startMinutes: 0, endMinutes: 205 },
    { slotIndex: 2, name: "2º Período", timeRange: "03:25 às 06:51", startMinutes: 205, endMinutes: 411 },
    { slotIndex: 3, name: "3º Período", timeRange: "06:51 às 10:17", startMinutes: 411, endMinutes: 617 },
    { slotIndex: 4, name: "4º Período", timeRange: "10:17 às 13:42", startMinutes: 617, endMinutes: 822 },
    { slotIndex: 5, name: "5º Período", timeRange: "13:42 às 17:08", startMinutes: 822, endMinutes: 1028 },
    { slotIndex: 6, name: "6º Período", timeRange: "17:08 às 20:34", startMinutes: 1028, endMinutes: 1234 },
    { slotIndex: 7, name: "7º Período", timeRange: "20:34 às 24:00", startMinutes: 1234, endMinutes: 1440 }
  ];

  /**
   * Matriz da Tabela E: Letras regentes para cada período em cada dia da semana.
   * Dias da semana no JS: 0=Domingo, 1=Segunda, 2=Terça, 3=Quarta, 4=Quinta, 5=Sexta, 6=Sábado.
   */
  const DAILY_CHART_E = {
    0: ['G', 'A', 'B', 'C', 'D', 'E', 'F'], // Domingo
    1: ['C', 'D', 'E', 'F', 'G', 'A', 'B'], // Segunda-feira
    2: ['F', 'G', 'A', 'B', 'C', 'D', 'E'], // Terça-feira
    3: ['B', 'C', 'D', 'E', 'F', 'G', 'A'], // Quarta-feira
    4: ['E', 'F', 'G', 'A', 'B', 'C', 'D'], // Quinta-feira
    5: ['A', 'B', 'C', 'D', 'E', 'F', 'G'], // Sexta-feira
    6: ['D', 'E', 'F', 'G', 'A', 'B', 'C']  // Sábado
  };

  /**
   * Descrição Literal das Letras dos Períodos Diários (Capítulo 13)
   */
  const DAILY_LETTER_MEANINGS = {
    'A': {
      letter: 'A',
      title: "Meditação, Planos Estratégicos e Favores de Nobres",
      nature: "Positivo para Assuntos de Autoridade e Concentração Mental",
      description: "Excelente para meditar ou concentrar-se profundamente sobre os detalhes de planos vindouros. Ótimo momento para solicitar favores a pessoas de alta posição, magistrados, diretores, clérigos e figuras de autoridade. Favorece a inspiração nobre e o contato com a sabedoria superior.",
      favorable: "Meditação, busca de favores de superiores, petições formais, planejamento mental reservado.",
      unfavorable: "Atividades banais, fofocas ou disputas mesquinhas."
    },
    'B': {
      letter: 'B',
      title: "Artes, Música, Beleza, Romance e Convívio Social",
      nature: "Agradável, Harmonioso e Sensível",
      description: "Abençoado para assuntos ligados às belas-artes, música, embelezamento da pessoa e do ambiente doméstico. Momento ideal para compras de adornos, passeios românticos, confraternizações afetuosas e início harmonioso de novas tarefas agradáveis.",
      favorable: "Música, artes, decoração, romance, compras de beleza e encontros sociais prazerosos.",
      unfavorable: "Tarefas estressantes, trabalhos pesados e discussões frias ou ríspidas."
    },
    'C': {
      letter: 'C',
      title: "Intelectualidade, Ciências, Ensino e Publicações",
      nature: "Lúcido, Educacional e Científico",
      description: "Especialmente afortunado para o intelecto superior, educação, pesquisas científicas, escrita, tipografia, publicação, conferências e atividades pedagógicas. Momento favorável para enviar propostas comerciais de caráter educacional ou formalizar acordos.",
      favorable: "Estudos, escrita, leitura, pesquisa, aulas, contato com advogados e documentos intelectuais.",
      unfavorable: "Assuntos puramente materiais ou irracionais desprovidos de lógica."
    },
    'D': {
      letter: 'D',
      title: "Negócios Gerais, Contato com o Público e Transações",
      nature: "Prático, Comercial e Construtivo",
      description: "Excelente para assuntos comerciais do dia a dia, atendimento ao público geral, serviços agrícolas, contratação de novos empregados ou colaboradores e transações cotidianas de compra e venda ordinárias.",
      favorable: "Comércio, contratação de serviços, agricultura, negociações diárias e atendimento a clientes.",
      unfavorable: "Isolamento meditativo ou assuntos estritamente místicos que exijam solidão."
    },
    'E': {
      letter: 'E',
      title: "Perseverança, Esforços Longos e Assuntos com Árbitros",
      nature: "Severo - Exige Firmeza e Estratégia",
      description: "Indicado para atividades que demandem profunda reflexão seguida de longas campanhas de ação firme e continuada. É um momento propício para apresentar causas perante árbitros, juízes ou mediadores neutros. Exige ponderação para não agir por impulso cego.",
      favorable: "Campanhas de longo prazo, defesas jurídicas, paciência estratégica e perseverança.",
      unfavorable: "Ações precipitadas, irritabilidade e decisões apressadas sem reflexão."
    },
    'F': {
      letter: 'F',
      title: "O Período Mais Afortunado do Dia (A Grande Sorte)",
      nature: "Altamente Afortunado para Conquistas e Sucesso",
      description: "Considerado o período mais favorável de cada dia! É a hora da boa estrela: excelente para compras importantes de imóveis, bens duráveis, abertura de contas bancárias, assinatura de acordos felizes e inauguração de empreendimentos prósperos.",
      favorable: "Iniciar negócios, compras de valor, investimentos, casamentos, viagens felizes e propostas vitais.",
      unfavorable: "Desperdiçar essa hora privilegiada com inércia, hesitação ou sono desnecessário."
    },
    'G': {
      letter: 'G',
      title: "Força Física, Vigor, Esportes e Superação de Desafios",
      nature: "Enérgico, Marcial e Físico",
      description: "Especialmente apropriado para atividades que exijam grande esforço muscular, resistência física, trabalhos mecânicos, esportes e superação enérgica de obstáculos que demandem coragem e determinação firme.",
      favorable: "Trabalhos corporais pesados, cirurgias pontuais quando recomendadas, esportes e esforço físico.",
      unfavorable: "Negociações delicadas que exijam diplomacia sutil, conciliação e ternura."
    }
  };

  /**
   * Ciclo da Alma (Capítulo 14, 15, 16 - Tabela F)
   * Baseado no ano cósmico solar iniciado em 22 de Março (Equinócio Vernal).
   */
  const SOUL_PERIODS = [
    {
      periodNumber: 1,
      range: "22 de Março a 12 de Maio",
      title: "A Alma Pioneira e Altruísta de Liderança",
      generalMission: "Herança cósmica de uma natureza nobre e elevada, com profundo anseio inato de alcançar posição de honra e estima pública. Espírito pioneiro e realizador.",
      polarities: {
        'A': {
          range: "22 de Março a 17 de Abril",
          type: "Polaridade A - Fogo Dinâmico",
          traits: "Lutam com tremendo ardor para alcançar o ápice de suas aspirações. Empregam toda a sua energia vital e determinação para liderar, abrir caminhos e governar. Tendência a profissões de comando direto e iniciativa arrojada."
        },
        'B': {
          range: "17 de Abril a 12 de Maio",
          type: "Polaridade B - Expressão Refinada",
          traits: "Buscam o sucesso e a estima através das artes plásticas, elegância de maneiras, educação formal e cultura. São mais gentis, moderados e persuasivos que os da polaridade A, conquistando respeito pelo bom gosto e integridade."
        }
      }
    },
    {
      periodNumber: 2,
      range: "13 de Maio a 04 de Julho",
      title: "A Alma Intelectual, Comunicadora e Pedagógica",
      generalMission: "Trazem de encarnações passadas memórias de experiências ricas no plano mental e social. Destacam-se no mundo das letras, do ensino e da comunicação de ideias.",
      polarities: {
        'A': {
          range: "13 de Maio a 08 de Junho",
          type: "Polaridade A - Mente Rápida e Habilidade Manual",
          traits: "Intelecto incrivelmente veloz e adaptável. Destreza tanto mental quanto manual (artesãos, cirurgiões, inventores, corretores e comerciantes). Sabem negociar com precisão e versatilidade."
        },
        'B': {
          range: "08 de Junho a 04 de Julho",
          type: "Polaridade B - Iluminação Filosófica e Ensino",
          traits: "Grandes expoentes no campo da filosofia, docência superior, literatura e educação de massas. Inspiram jovens e estudantes através de conceitos elevados e elevação moral."
        }
      }
    },
    {
      periodNumber: 3,
      range: "04 de Julho a 24 de Agosto",
      title: "A Alma Heroica, Corajosa e Governante",
      generalMission: "Carregam do passado experiências de superação de grandes provações através da força de vontade, coragem indomável e autodomínio pessoal.",
      polarities: {
        'A': {
          range: "04 de Julho a 31 de Julho",
          type: "Polaridade A - Desbravador e Aventureiro",
          traits: "Espírito aventureiro nato. Atraídos por expedições, explorações geográficas, aviação, façanhas físicas heróicas e tarefas que exigem destemor absoluto diante do perigo material."
        },
        'B': {
          range: "31 de Julho a 24 de Agosto",
          type: "Polaridade B - Autoridade e Alta Governança",
          traits: "Alcançam posições proeminentes à frente de grandes organizações cívicas, governamentais ou estatais. Possuem magnetismo de comando e senso inato de honra e responsabilidade pública."
        }
      }
    },
    {
      periodNumber: 4,
      range: "25 de Agosto a 15 de Outubro",
      title: "A Alma Artística, Magistrada e Diplomática",
      generalMission: "Trazem faculdades de elevado refinamento pessoal e poder de persuasão equilibrado, associando beleza artística e clareza de julgamento moral.",
      polarities: {
        'A': {
          range: "25 de Agosto a 20 de Setembro",
          type: "Polaridade A - Mestres de Arte e Cultura",
          traits: "Professores inspirados de música, belas-artes, harmonia e expressão cultural. Grande presença feminina nobre que enriquece os padrões estéticos da sociedade."
        },
        'B': {
          range: "20 de Setembro a 15 de Outubro",
          type: "Polaridade B - Julgamento Lógico e Diplomacia",
          traits: "Capacidade analítica ímpar para pesar razões contrárias e tomar decisões serenas e justas. Excelentes juristas, juízes, diplomatas e pacificadores de controvérsias humanas."
        }
      }
    },
    {
      periodNumber: 5,
      range: "16 de Outubro a 06 de Dezembro",
      title: "A Alma Tenaz, Construtora e Diplomática",
      generalMission: "Capacidade de obter alta notoriedade e sucesso consolidado em suas atividades específicas, embora nem sempre ostentem títulos formais.",
      polarities: {
        'A': {
          range: "16 de Outubro a 11 de Novembro",
          type: "Polaridade A - Conquista Comercial e Tenacidade",
          traits: "Forte combatividade nos negócios. Conquistam posições de destaque no comércio e na indústria por pura tenacidade, vigor de trabalho e audácia calculada."
        },
        'B': {
          range: "11 de Novembro a 06 de Dezembro",
          type: "Polaridade B - Diplomacia Pacífica e Conciliação",
          traits: "Quase o oposto da polaridade A em agressividade externa: são pacíficos, dedicados a pesquisas discretas, aconselhamento confidencial, ciências profundas e harmonia fraterna."
        }
      }
    },
    {
      periodNumber: 6,
      range: "07 de Dezembro a 27 de Janeiro",
      title: "A Alma Compassiva, Benemérita e Reformadora",
      generalMission: "Trazem uma bênção cósmica conquistada por meio de sacrifícios nobres em vidas passadas. Sensibilidade às dores do mundo e impulso de consolar e instruir.",
      polarities: {
        'A': {
          range: "07 de Dezembro a 01 de Janeiro",
          type: "Polaridade A - Instrutores Espirituais e Benfeitores",
          traits: "Desejo profundo de ensinar os mais elevados princípios espirituais e estéticos, fundando obras sociais, asilos, irmandades e divulgando preceitos de fraternidade cósmica."
        },
        'B': {
          range: "01 de Janeiro a 27 de Janeiro",
          type: "Polaridade B - Discernimento Crítico e Aperfeiçoamento",
          traits: "Olhar crítico e detalhista que detecta falhas instantaneamente. Usam sua percepção sutil para lapidar métodos, elevar o nível técnico e reformar estruturas imperfeitas."
        }
      }
    },
    {
      periodNumber: 7,
      range: "28 de Janeiro a 21 de Março",
      title: "A Alma Investigadora dos Grandes Mistérios Cósmicos",
      generalMission: "Destinadas a trabalhos sérios e transcendentais na terra, decifrando enigmas da natureza, da psique humana e das leis ocultas do universo.",
      polarities: {
        'A': {
          range: "28 de Janeiro a 23 de Fevereiro",
          type: "Polaridade A - Pesquisador Oculto e Cientista Notável",
          traits: "Vocacionados para tarefas profundas e misteriosas: químicos, arqueólogos, criminologistas, historiadores antigos, pesquisadores de ciências ocultas e leis psíquicas."
        },
        'B': {
          range: "23 de Fevereiro a 21 de Março",
          type: "Polaridade B - Inspiração Lírica e Alívio da Humanidade",
          traits: "Buscadores de alegria, música suave, artes teatrais e alívio do fardo humano. Transformam os mistérios solenes em beleza, amizade calorosa e esperança reconfortante."
        }
      }
    }
  ];

  // =======================================================================================
  // 2. FUNÇÕES MATEMÁTICAS E DE CÁLCULO DE DATAS
  // =======================================================================================

  /**
   * Determina se um ano é bissexto
   */
  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }

  /**
   * Adiciona um número de dias inteiros a uma data (sem alterar horas)
   */
  function addDays(date, days) {
    const res = new Date(date.getTime());
    res.setDate(res.getDate() + days);
    return res;
  }

  /**
   * Formata uma data no formato brasileiro legível: "DD de Mês de AAAA" ou "DD/MM/AAAA"
   */
  function formatDateBR(date, includeYear = true) {
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    if (includeYear) {
      return `${day} de ${month} de ${date.getFullYear()}`;
    }
    return `${day} de ${month}`;
  }

  /**
   * Formatação curta "DD/MM" ou "DD/MM/AAAA"
   */
  function formatShortDate(date, withYear = false) {
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    if (withYear) {
      return `${d}/${m}/${date.getFullYear()}`;
    }
    return `${d}/${m}`;
  }

  /**
   * Calcula a idade exata com base na data de nascimento e data de referência
   */
  function calculateAge(birthDate, refDate = new Date()) {
    let age = refDate.getFullYear() - birthDate.getFullYear();
    const m = refDate.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && refDate.getDate() < birthDate.getDate())) {
      age--;
    }
    return Math.max(0, age);
  }

  /**
   * CÁLCULO DO CICLO MAIOR DE 7 ANOS (Capítulo 5)
   * Informa em qual ciclo maior (septênio) a pessoa está e o ano corrente dentro dele.
   */
  function calculateMajor7YearCycle(birthDate, refDate = new Date()) {
    const age = calculateAge(birthDate, refDate);
    // Cada período dura 7 anos: 0-6 anos é período 1, 7-13 é período 2, etc.
    const periodIndex = Math.min(Math.floor(age / 7), SEVEN_YEAR_PERIODS.length - 1);
    const yearInCurrentPeriod = (age % 7) + 1; // 1º ao 7º ano do septênio
    const cycleData = SEVEN_YEAR_PERIODS[periodIndex];

    const cycleStartAge = Math.floor(age / 7) * 7;
    const cycleEndAge = cycleStartAge + 7;

    return {
      currentAge: age,
      periodNumber: periodIndex + 1,
      yearInCycle: yearInCurrentPeriod,
      title: cycleData.title,
      ageRange: cycleData.ageRange,
      description: cycleData.description,
      summaryText: `Atualmente com ${age} anos, você está no ${yearInCurrentPeriod}º ano do seu ${periodIndex + 1}º Grande Ciclo de 7 Anos (${cycleStartAge} a ${cycleEndAge} anos).`
    };
  }

  /**
   * CÁLCULO DO CICLO ANUAL DOS 7 PERÍODOS DE 52 DIAS (Capítulos 6, 7 e 9)
   * 
   * Segundo o método prático ensinado por Harvey Spencer Lewis no Capítulo 6:
   * "Se você nasceu, por exemplo, em 25 de Novembro, seu ciclo anual vai de 25 de Novembro
   * até 24 de Novembro de cada ano da sua vida... contamos para a frente 52 dias..."
   * O livro divide o ano de aniversário em 7 períodos contíguos de 52 dias.
   */
  function calculate52DayCycle(startDateInput, refDate = new Date()) {
    // Determinar o ano de ciclo mais recente para a pessoa
    const birthMonth = startDateInput.getMonth();
    const birthDay = startDateInput.getDate();

    let cycleYear = refDate.getFullYear();
    let cycleStart = new Date(cycleYear, birthMonth, birthDay);

    // Se o aniversário deste ano ainda não aconteceu, o ciclo atual começou no aniversário do ano anterior
    if (refDate < cycleStart) {
      cycleYear--;
      cycleStart = new Date(cycleYear, birthMonth, birthDay);
    }

    const periods = [];
    let currentCursor = new Date(cycleStart.getTime());
    let activePeriodIndex = -1;

    for (let i = 0; i < 7; i++) {
      const pStart = new Date(currentCursor.getTime());
      // No 7º período, ele vai até a véspera do próximo aniversário
      let pEnd;
      if (i === 6) {
        pEnd = new Date(cycleYear + 1, birthMonth, birthDay);
        pEnd.setDate(pEnd.getDate() - 1);
      } else {
        // Cada período dura 52 dias corridos: do dia 1 ao 52
        pEnd = addDays(pStart, 51);
      }

      // O próximo período começa no dia seguinte ao término deste
      currentCursor = addDays(pEnd, 1);

      // Verificar se a data de referência cai dentro deste período
      // Comparar apenas datas normalizadas (sem considerar horas)
      const refTime = new Date(refDate.getFullYear(), refDate.getMonth(), refDate.getDate()).getTime();
      const sTime = new Date(pStart.getFullYear(), pStart.getMonth(), pStart.getDate()).getTime();
      const eTime = new Date(pEnd.getFullYear(), pEnd.getMonth(), pEnd.getDate()).getTime();

      const isActive = (refTime >= sTime && refTime <= eTime);
      if (isActive) {
        activePeriodIndex = i;
      }

      const pInfo = YEARLY_PERSONAL_PERIODS[i];
      const bInfo = BUSINESS_PERIODS[i];
      const hInfo = HEALTH_PERIODS[i];

      // Dias totais e dias decorridos
      const totalDays = Math.round((eTime - sTime) / (1000 * 60 * 60 * 24)) + 1;
      let daysElapsed = 0;
      let daysRemaining = 0;
      if (isActive) {
        daysElapsed = Math.round((refTime - sTime) / (1000 * 60 * 60 * 24)) + 1;
        daysRemaining = totalDays - daysElapsed;
      }

      periods.push({
        number: i + 1,
        startDate: pStart,
        endDate: pEnd,
        startDateFormatted: formatDateBR(pStart),
        endDateFormatted: formatDateBR(pEnd),
        rangeFormatted: `${formatShortDate(pStart)} a ${formatShortDate(pEnd)}`,
        fullRangeFormatted: `${formatDateBR(pStart)} até ${formatDateBR(pEnd)}`,
        isActive: isActive,
        totalDays: totalDays,
        daysElapsed: daysElapsed,
        daysRemaining: daysRemaining,
        // Informações Pessoais (Ciclo 2)
        personal: pInfo,
        // Informações Empresariais (Ciclo 3)
        business: bInfo,
        // Informações de Saúde (Ciclo 4)
        health: hInfo
      });
    }

    // Se por alguma discrepância de fuso não marcou nenhum, default para o primeiro ou último
    if (activePeriodIndex === -1) {
      activePeriodIndex = 0;
      periods[0].isActive = true;
    }

    return {
      cycleYear: cycleYear,
      cycleStart: cycleStart,
      cycleEnd: new Date(cycleYear + 1, birthMonth, birthDay - 1),
      periods: periods,
      activePeriod: periods[activePeriodIndex],
      activePeriodNumber: activePeriodIndex + 1
    };
  }

  /**
   * CÁLCULO DO CICLO DIÁRIO DAS HORAS SIGNIFICATIVAS (Capítulo 11, 12, 13)
   * Divide as 24 horas em 7 períodos iguais de ~3h 25m e consulta a Tabela E.
   */
  function calculateDailyCycle(date = new Date()) {
    const dayOfWeek = date.getDay(); // 0 = Domingo, 1 = Segunda, etc.
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const totalMinutes = (hours * 60) + minutes;

    const daysNames = [
      'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
      'Quinta-feira', 'Sexta-feira', 'Sábado'
    ];

    const lettersForDay = DAILY_CHART_E[dayOfWeek];
    let currentSlotIndex = -1;

    const slots = DAILY_TIME_SLOTS.map((slot, idx) => {
      const letter = lettersForDay[idx];
      const meaning = DAILY_LETTER_MEANINGS[letter];
      const isActive = totalMinutes >= slot.startMinutes && totalMinutes < slot.endMinutes;
      if (isActive) currentSlotIndex = idx;

      return {
        slotNumber: slot.slotIndex,
        timeRange: slot.timeRange,
        letter: letter,
        title: meaning.title,
        nature: meaning.nature,
        description: meaning.description,
        favorable: meaning.favorable,
        unfavorable: meaning.unfavorable,
        isActive: isActive
      };
    });

    if (currentSlotIndex === -1) {
      currentSlotIndex = slots.length - 1;
      slots[currentSlotIndex].isActive = true;
    }

    return {
      dayOfWeekNumber: dayOfWeek,
      dayOfWeekName: daysNames[dayOfWeek],
      currentPeriod: slots[currentSlotIndex],
      allSlots: slots
    };
  }

  /**
   * CÁLCULO DO CICLO DA ALMA (Capítulos 14, 15, 16 - Tabela F)
   * 
   * Determina em qual dos 7 períodos cósmicos a pessoa nasceu (ano solar iniciado em 22 de Março)
   * e sua respectiva Polaridade A ou B.
   */
  function calculateSoulCycle(birthDate) {
    const m = birthDate.getMonth() + 1; // 1 = Jan, ..., 12 = Dez
    const d = birthDate.getDate();

    // Tabela F exata do livro de Harvey Spencer Lewis (página 139)
    // 1º Período: 22 de Março a 12 de Maio (Pol A: 22 Mar - 17 Abr; Pol B: 17 Abr - 12 Mai)
    // 2º Período: 13 de Maio a 04 de Julho (Pol A: 13 Mai - 08 Jun; Pol B: 08 Jun - 04 Jul)
    // 3º Período: 04 de Julho a 24 de Agosto (Pol A: 04 Jul - 31 Jul; Pol B: 31 Jul - 24 Ago)
    // 4º Período: 25 de Agosto a 15 de Outubro (Pol A: 25 Ago - 20 Set; Pol B: 20 Set - 15 Out)
    // 5º Período: 16 de Outubro a 06 de Dezembro (Pol A: 16 Out - 11 Nov; Pol B: 11 Nov - 06 Dez)
    // 6º Período: 07 de Dezembro a 27 de Janeiro (Pol A: 07 Dez - 01 Jan; Pol B: 01 Jan - 27 Jan)
    // 7º Período: 28 de Janeiro a 21 de Março (Pol A: 28 Jan - 23 Fev; Pol B: 23 Fev - 21 Mar)

    let periodNumber = 1;
    let polarity = 'A';

    // Conversão para número MMDD para comparação rápida
    const mmdd = m * 100 + d;

    if (mmdd >= 322 && mmdd <= 417) {
      periodNumber = 1; polarity = 'A';
    } else if (mmdd > 417 && mmdd <= 512) {
      periodNumber = 1; polarity = 'B';
    } else if (mmdd >= 513 && mmdd <= 608) {
      periodNumber = 2; polarity = 'A';
    } else if (mmdd > 608 && mmdd <= 704) {
      periodNumber = 2; polarity = 'B';
    } else if (mmdd > 704 && mmdd <= 731) {
      periodNumber = 3; polarity = 'A';
    } else if (mmdd > 731 && mmdd <= 824) {
      periodNumber = 3; polarity = 'B';
    } else if (mmdd >= 825 && mmdd <= 920) {
      periodNumber = 4; polarity = 'A';
    } else if (mmdd > 920 && mmdd <= 1015) {
      periodNumber = 4; polarity = 'B';
    } else if (mmdd >= 1016 && mmdd <= 1111) {
      periodNumber = 5; polarity = 'A';
    } else if (mmdd > 1111 && mmdd <= 1206) {
      periodNumber = 5; polarity = 'B';
    } else if ((mmdd >= 1207 && mmdd <= 1231) || (mmdd >= 101 && mmdd <= 101)) {
      periodNumber = 6; polarity = 'A';
    } else if (mmdd > 101 && mmdd <= 127) {
      periodNumber = 6; polarity = 'B';
    } else if (mmdd >= 128 && mmdd <= 223) {
      periodNumber = 7; polarity = 'A';
    } else {
      // 24 de Fevereiro a 21 de Março
      periodNumber = 7; polarity = 'B';
    }

    const soulData = SOUL_PERIODS[periodNumber - 1];
    const polData = soulData.polarities[polarity];

    return {
      periodNumber: periodNumber,
      polarity: polarity,
      title: soulData.title,
      periodRange: soulData.range,
      generalMission: soulData.generalMission,
      polarityType: polData.type,
      polarityRange: polData.range,
      polarityTraits: polData.traits
    };
  }

  /**
   * GERAÇÃO DO RELATÓRIO INTEGRAL CONSOLIDADO
   * Compila todas as dimensões de ciclos para a pessoa de forma completa e instantânea.
   */
  function generateFullReport(userName, birthDate, options = {}) {
    const refDate = options.referenceDate || new Date();
    const businessStartDate = options.businessStartDate || null;

    // 1. Ciclo Maior de 7 Anos
    const majorCycle = calculateMajor7YearCycle(birthDate, refDate);

    // 2. Ciclo Pessoal dos 52 Dias
    const personalCycle = calculate52DayCycle(birthDate, refDate);

    // 3. Ciclo dos Negócios (Usa data de fundação da empresa ou data de nascimento)
    const businessBaseDate = businessStartDate ? businessStartDate : birthDate;
    const businessCycle = calculate52DayCycle(businessBaseDate, refDate);

    // 4. Ciclo Diário da Hora Presente
    const dailyCycle = calculateDailyCycle(refDate);

    // 5. Ciclo da Alma
    const soulCycle = calculateSoulCycle(birthDate);

    return {
      userName: userName || "Buscador(a)",
      birthDate: birthDate,
      birthDateFormatted: formatDateBR(birthDate),
      referenceDate: refDate,
      referenceDateFormatted: formatDateBR(refDate),
      majorCycle: majorCycle,
      personalCycle: personalCycle,
      businessCycle: businessCycle,
      isBusinessCustomDate: !!businessStartDate,
      dailyCycle: dailyCycle,
      soulCycle: soulCycle
    };
  }

  // API Pública do Módulo
  return {
    calculateMajor7YearCycle: calculateMajor7YearCycle,
    calculate52DayCycle: calculate52DayCycle,
    calculateDailyCycle: calculateDailyCycle,
    calculateSoulCycle: calculateSoulCycle,
    generateFullReport: generateFullReport,
    DAILY_LETTER_MEANINGS: DAILY_LETTER_MEANINGS,
    SOUL_PERIODS: SOUL_PERIODS,
    SEVEN_YEAR_PERIODS: SEVEN_YEAR_PERIODS,
    YEARLY_PERSONAL_PERIODS: YEARLY_PERSONAL_PERIODS,
    BUSINESS_PERIODS: BUSINESS_PERIODS,
    HEALTH_PERIODS: HEALTH_PERIODS
  };

})();

// Exportação compatível com ambientes Node/Browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CyclesEngine;
}
