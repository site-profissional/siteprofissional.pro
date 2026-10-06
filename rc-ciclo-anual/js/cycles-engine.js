/**
 * =========================================================================================
 * MOTOR DE CÁLCULO DOS CICLOS DA VIDA - HARVEY SPENCER LEWIS (BILÍNGUE: PT-BR / EN-US)
 * Baseado na obra: "Autodomínio e Destino com os Ciclos da Vida" (Self-Mastery and Fate with the Cycles of Life - 1929)
 * Autor: Harvey Spencer Lewis, F.R.C., Ph.D. - Primeiro Imperator da AMORC
 * =========================================================================================
 * Este módulo implementa fielmente as regras matemáticas, tabelas e interpretações
 * literais fornecidas no livro original em inglês de 1929 e na tradução oficial em português.
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
  // 1. DADOS E INTERPRETAÇÕES LITERAIS EM PORTUGUÊS (PT-BR) E INGLÊS (EN-US)
  // =======================================================================================

  const SEVEN_YEAR_PERIODS_PT = [
  {
    "periodNumber": 1,
    "ageRange": "Do Nascimento aos 7 anos",
    "title": "Descoberta do Mundo Objetivo e Fundamentos",
    "description": "Período da primeira infância e início da juventude. Lançam-se os alicerces da educação, hábitos e cultura. É essencialmente uma fase de auto-descoberta no plano material: a criança aprende a falar, andar, coordenar o corpo e interagir com o ambiente físico circundante."
  },
  {
    "periodNumber": 2,
    "ageRange": "Dos 7 aos 14 anos",
    "title": "Desenvolvimento Biológico e Mudanças Fisiológicas",
    "description": "Grandes transformações biológicas e orgânicas ocorrem no organismo. O intelecto atua de forma secundária enquanto o corpo constrói sua estrutura fisiológica para a maturidade. Próximo ao término deste ciclo, ocorrem as mudanças puberais que preparam o jovem para a próxima etapa."
  },
  {
    "periodNumber": 3,
    "ageRange": "Dos 14 aos 21 anos",
    "title": "Despertar Mental, Emocional e da Individualidade",
    "description": "As transformações físicas desaceleram e o desenvolvimento mental assume a dianteira. Despertam-se a chama emocional, os ideais de futuro, anseios de independência e a consciência moral. Consolida-se a identidade perante o mundo."
  },
  {
    "periodNumber": 4,
    "ageRange": "Dos 21 aos 28 anos",
    "title": "Fixação Psicológica e Estabelecimento Social",
    "description": "Fase em que a individualidade se assenta firmemente. Desenvolvem-se as faculdades emocionais e intelectuais aplicadas à sociedade, formação da carreira e primeiros compromissos da vida adulta duradoura."
  },
  {
    "periodNumber": 5,
    "ageRange": "Dos 28 aos 35 anos",
    "title": "O Ápice da Criatividade Humana",
    "description": "O mais fértil período criativo do ser humano! Durante esses anos surgem as maiores obras, invenções, criações literárias, realizações artísticas e marcos empresariais da vida. O indivíduo atinge sua capacidade máxima de manifestar ideias originais no mundo concreto."
  },
  {
    "periodNumber": 6,
    "ageRange": "Dos 35 aos 42 anos",
    "title": "Culminação da Ação e Maestria Executiva",
    "description": "Fase em que o homem e a mulher consolidam posições de liderança e maestria. É o momento de colher os frutos dos empreendimentos, dirigir grandes organizações, dispor de investimentos, patrocinar empreendimentos e consolidar seu poder de realização."
  },
  {
    "periodNumber": 7,
    "ageRange": "Dos 42 aos 49 anos",
    "title": "Reflexão Filosófica e Busca de Sabedoria Interior",
    "description": "Surge um desejo interior de meditação, contemplação e análise filosófica dos valores reais da vida. O indivíduo inicia um novo capítulo psíquico, reavaliando prioridades e buscando paz mental e compreensão mais profunda da existência."
  },
  {
    "periodNumber": 8,
    "ageRange": "Dos 49 aos 56 anos",
    "title": "Desprendimento do Egoísmo e Serviço Humanitário",
    "description": "Tendência a se afastar das ambições puramente egoístas ou mundanas. Cresce o interesse por causas sociais, fraternais, educacionais e beneméritas, visando deixar um legado positivo para as futuras gerações."
  },
  {
    "periodNumber": 9,
    "ageRange": "Dos 56 aos 63 anos",
    "title": "Maturidade Serena e Sabedoria Prática",
    "description": "Continuação harmoniosa do ciclo anterior, acompanhada de um abrandamento ('mellowing') das paixões e asperezas do temperamento. A serenidade e o discernimento profundo tornam a pessoa um guia experiente e respeitado."
  },
  {
    "periodNumber": 10,
    "ageRange": "Dos 63 aos 70 anos e além",
    "title": "Oitavas Superiores da Consciência",
    "description": "A partir dos 63 anos, os ciclos de 7 anos repetem-se em oitavas superiores de sabedoria até o grande limite harmônico de 144 anos, onde a alma se prepara para sua transição cósmica ou conclusão de sua missão terrena."
  }
];
  const SEVEN_YEAR_PERIODS_EN = [
  {
    "periodNumber": 1,
    "ageRange": "Birth to 7th Year",
    "title": "Discovery of the Objective World and Foundations",
    "description": "Consider the first period of seven years. This is the time during which our babyhood and early youth occurs, and when the fundamentals of our education and cultural development are laid. It is really a period of self-discovery, as far as the objective material world and our relation to it are concerned. We learn to walk and talk, control our bodies, and relate ourselves properly to our physical and material environments."
  },
  {
    "periodNumber": 2,
    "ageRange": "7th to 14th Year",
    "title": "Biological Development and Physiological Changes",
    "description": "In this period certain physical changes take place in our development, and the mental side of our nature takes a secondary place in the changes going on. It is just before the fulfillment of the second period that the important physical changes in both the male and female occur, preparing the child for the third stage. If these changes do not occur before the end of the second period, the child is psychologically and physiologically subnormal, and both physiology and psychology have unconsciously recognized this second period in the cycle of life."
  },
  {
    "periodNumber": 3,
    "ageRange": "14th to 21st Year",
    "title": "Mental and Emotional Awakening of Individuality",
    "description": "In this period the physical changes drop back into secondary place together with the mental, and the psychic side of human nature is developed primarily. This brings about the sense of responsibility, giving dignity, poise, and character to the individual. It is during this process that the individual attains that degree of psychic or psychological, as well as mental and physiological development, that establishes the individual as a capable entity, qualified to assume legal responsibilities. The person who does not attain this degree by the 21st year is backward in the progress that should have been made, and is classified as subnormal."
  },
  {
    "periodNumber": 4,
    "ageRange": "21st to 28th Year",
    "title": "Psychological Settling and Social Establishment",
    "description": "In this period there is a development strongly centered in the emotional nature carrying on the unfoldment of the emotional spark that was awakened in the preceding period. During these years, the individual acquires stability, a further sense of responsibility, a softening of the nature, and a gradual activity in those higher, dormant faculties known as intuition, mental telepathy, unconscious psychometry, and similar psychic faculties, together with an awakening interest in music, art, language, and what may be termed the religious and higher things in life. An absence of any manifestation of the development of these faculties during this period would indicate to the psychologist or psychiatrist a subnormal development."
  },
  {
    "periodNumber": 5,
    "ageRange": "28th to 35th Year",
    "title": "The Peak of Human Creativity",
    "description": "In this period we find the creative processes of the mind most active, and the ability to visualize, imagine, and mentally create greatly developed, with a developing attunement with the Cosmic Consciousness and the ethical standards of life. It is during this period that the greatest inventors have made most progress, and the business man has become energetic and successful. It is also noteworthy that it is during this period that many of the world’s greatest philosophers, avatars, and mystics found the sudden Cosmic Illumination which is called complete attunement with the Cosmic Consciousness. The greatest of these have begun their world-wide missions and written their greatest works during this period."
  },
  {
    "periodNumber": 6,
    "ageRange": "35th to 42nd Year",
    "title": "Culmination of Action and Executive Mastery",
    "description": "In this period people enter a stage of development that induces the desire to explore, investigate, and reveal great knowledge and the hidden facts of life. A restlessness comes into their nature which makes them dissatisfied with the monotony of selfish and personal attainment, and quickens in their being the humanitarian and brotherly emotion which makes them want to share what they have with the world. Yet even if they have little else than time and knowledge to share, they want to explore or discover and bring these revealed things to the masses for their benefit. It is during this period that people start disposing of great wealth that they have accumulated or inherited by building libraries or contributing to the arts, the sciences, schools, colleges, universities, or explorative and inventive expeditions and speculations. It is truly the culminating period of all the years that have preceded in the life of the average human being, and starts the system of compensation in the average individual’s life whereby the individual feels the need of returning to the Cosmic and to mankind some of the benefits he has enjoyed."
  },
  {
    "periodNumber": 7,
    "ageRange": "42nd to 49th Year",
    "title": "Philosophical Reflection and Inner Wisdom",
    "description": "In this period the desire to rest, meditate, and philosophically speculate builds up in the human being a new chapter, which unfolds strongly and uniquely in each case until the individual becomes a new person with new hopes, new desires, a new viewpoint in life, and a new goal and ideal toward which to labor. The mind is turned more strongly toward religion and philosophy than to business. It is also turned to those humanitarian activities that bring consolation and peace, by giving help, health, and happiness to the downtrodden, disconsolate, or despondent. So surely does this period work out in the average person’s life, to some degree, that one may easily judge the approximate age of any eminent character by noting the tendencies of his habits and the trend of his thoughts, even when such a person is in very moderate circumstances and can do nothing more than wish he were able to do the things that he has in his mind and heart."
  },
  {
    "periodNumber": 8,
    "ageRange": "49th to 56th Year",
    "title": "Detachment from Selfishness and Humanitarian Service",
    "description": "In this period we find a tendency toward further retirement from personal or selfish ambition, accompanied by a gradual lessening of the vitality and physical prowess, but compensated for by a highly attuned psychic and mental nature. Here the pendulum is beginning to swing from the building up of a physical being to the building up of a spiritual being, and for this reason the physical body begins to lose its power to combat disease and to surmount the strains of accidents and undue strains upon the vitality. Vital statistics prepared by insurance companies and government bureaus plainly show the great changes in the physical body which take place during this period and the preceding one as the pendulum begins to swing from the physical to the spiritual."
  },
  {
    "periodNumber": 9,
    "ageRange": "56th to 63rd Year",
    "title": "Serene Maturity and Practical Wisdom",
    "description": "In this period there is a continuation of the conditions in the preceding period, but accompanied now by a mellowing of the mental faculties together with the weakening of the physical prowess, leaving the individual more and more a psychic and spiritual being in harmony with the entire purpose of the cycle of progression. As man is born to become a living soul, and not merely a soul-animated physical body, so he evolves, period by period, from birth to his 63rd year, from a physical being to a spiritual being, thereby approaching more closely the inevitable purpose of his existence."
  },
  {
    "periodNumber": 10,
    "ageRange": "63rd Year to 70th Year and Beyond",
    "title": "Higher Octaves of Consciousness",
    "description": "The other periods of seven years each contribute to the spiritual development and the gradual breaking down of the physical body. The end of the cycles is approximately at the 144th year, in order that the cycle of life may harmonize with other cycles and other periods. From age 63 onward, the seven-year cycles repeat in higher harmonic octaves of wisdom up to the great cosmic boundary of 144 years."
  }
];

  const YEARLY_PERSONAL_PERIODS_PT = [
  {
    "number": 1,
    "days": "1º ao 52º dia",
    "name": "Promoção Pessoal, Favores e Influência",
    "nature": "Altamente Positivo para Assuntos de Prestígio",
    "summary": "Período em que a pessoa deve usar todo o seu poder e magnetismo pessoal para promover seus interesses legítimos junto a indivíduos eminentes e com poder de decisão.",
    "favorable": [
      "Solicitar favores, patrocínios ou promoções no trabalho",
      "Apresentar projetos diretamente a superiores, diretores ou autoridades",
      "Assumir a liderança em iniciativas de interesse pessoal",
      "Conquistar o apoio de figuras respeitáveis e influentes"
    ],
    "unfavorable": [
      "Ficar passivo ou isolado esperando que os outros reconheçam seus méritos",
      "Delegar a terceiros aquilo que exige sua presença pessoal e confiança"
    ],
    "fullText": "Este é um período em que a pessoa deve utilizar todo o seu poder e habilidade pessoal para promover seus próprios interesses junto a pessoas de influência que possam ajudá-la a alcançar a realização de seus desejos ou ambições. É o momento de fazer petições, solicitar posições e buscar o favor de pessoas eminentes. A força do seu magnetismo pessoal estará no ponto mais alto para causar impressões duradouras e respeitadas."
  },
  {
    "number": 2,
    "days": "53º ao 104º dia",
    "name": "Viagens Curtas, Mudanças e Novos Acordos",
    "nature": "Dinâmico e Favorável a Pequenas Transições",
    "summary": "Período propício para pequenas viagens, transferências provisórias, alterações de rotina, novos acordos interpessoais e renovação de métodos cotidianos.",
    "favorable": [
      "Realizar viagens de negócios de curta distância",
      "Fazer reformas rápidas, remodelações ou mudanças temporárias de residência/posto",
      "Estabelecer acordos e entendimentos cooperativos com novos conhecidos",
      "Alterar horários e rotinas para quebrar estagnações"
    ],
    "unfavorable": [
      "Permanecer rígido e resistente a pequenas mudanças circunstanciais",
      "Tomar decisões drásticas e irreversíveis que exijam permanência perpétua"
    ],
    "fullText": "Este período é distintamente diferente do anterior. Durante estes 52 dias, tudo tende a ser favoravelmente direcionado a mudanças, transferências, viagens curtas e novos acordos ou contratos com outras pessoas. Qualquer esforço feito para alterar a rotina da vida, viajar ou mudar de um local para outro será coroado de sucesso e trará novas e benéficas perspectivas."
  },
  {
    "number": 3,
    "days": "105º ao 156º dia",
    "name": "Energia Vital, Força Executiva e Ação Dinâmica",
    "nature": "Forte Potencial - Exige Autodomínio e Cautela",
    "summary": "Período de enorme carga de vitalidade e força motriz. Se conduzido com prudência, traz conquistas extraordinárias; se houver pressa ou descontrole, gera litígios e perdas.",
    "favorable": [
      "Trabalhos árduos que exijam vigor físico, resistência e comando firme",
      "Impulsionar projetos que estavam lentos ou paralisados",
      "Aplicar disciplina rigorosa e foco inabalável em objetivos definidos",
      "Superar obstáculos materiais por meio de determinação metódica"
    ],
    "unfavorable": [
      "Agir com precipitação, impaciência, raiva ou agressividade desmedida",
      "Envolver-se em discussões, disputas judiciais ou litígios inflamados",
      "Manusear máquinas ou fogo de maneira descuidada (risco de incidentes físicos)"
    ],
    "fullText": "Aqui temos um período que pode ser afortunado ou infeliz de acordo com a aplicação dos poderes cósmicos e com a discrição e disciplina da pessoa. Há uma abundância de energia física e mental esperando para ser direcionada. Se o indivíduo agir com calma, bom senso e serenidade, realizará maravilhas. Contudo, se ceder ao impulso da pressa, à fúria, a discussões ou a decisões intempestivas, sofrerá reveses, acidentes ou disputas penosas."
  },
  {
    "number": 4,
    "days": "157º ao 208º dia",
    "name": "Intelecto, Comunicação, Literatura e Contratos",
    "nature": "Altamente Intelectual e Comunicativo",
    "summary": "As forças cósmicas ativam as faculdades mentais superiores. Mente ágil, enxurrada de ideias brilhantes, favorável à escrita, publicações, acordos e negociações.",
    "favorable": [
      "Redigir documentos importantes, artigos, livros, relatórios e propostas",
      "Assinar contratos, fechar acordos formais e realizar conferências",
      "Estudos profundos, aprendizado acelerado e cursos intelectuais",
      "Trabalhos de propaganda, cartas, correspondências e campanhas de comunicação"
    ],
    "unfavorable": [
      "Permitir que ideias valiosas se percam sem registro escrito imediato",
      "Dispersar a mente em excesso de conversas banais ou assuntos fúteis"
    ],
    "fullText": "Neste período, as forças cósmicas influenciam e fortalecem fortemente a mente do indivíduo, concedendo-lhe rapidez de pensamento e grande clarividência racional. As ideias fluirão rapidamente à consciência. É um período extremamente auspicioso para qualquer atividade que envolva escrita, publicações, comunicação por carta, publicidade, estudos intelectuais e celebração de contratos escritos."
  },
  {
    "number": 5,
    "days": "209º ao 260º dia",
    "name": "O Período do Sucesso do Ano (Expansão e Fortuna)",
    "nature": "O Período Mais Afortunado para Assuntos Pessoais",
    "summary": "O ápice anual para prosperidade, expansão financeira, assuntos privados e jurídicos favoráveis. É a época da grande colheita de esforços no ano pessoal.",
    "favorable": [
      "Realizar investimentos financeiros e expandir negócios próprios",
      "Tratar de causas jurídicas, arbitragens e questões legais importantes",
      "Iniciar ou aprofundar estudos metafísicos, filosóficos e espirituais elevados",
      "Promover o crescimento patrimonial e buscar estabilidade de longo prazo"
    ],
    "unfavorable": [
      "Assumir atitude avarenta, mesquinha ou excessivamente receosa diante de boas oportunidades",
      "Desperdiçar a fase mais afortunada do ano com inércia e negligência"
    ],
    "fullText": "Aqui entramos no chamado Período de Sucesso de cada ano no que diz respeito aos nossos assuntos pessoais e privados. Durante estes 52 dias, a sorte favorece empreendimentos de expansão, ganhos financeiros, acordos com magistrados ou juízes, e investimentos legítimos. É igualmente uma época esplêndida para iniciar estudos metafísicos e filosóficos de alto nível, pois a intuição espiritual estará extraordinariamente iluminada."
  },
  {
    "number": 6,
    "days": "261º ao 312º dia",
    "name": "Férias, Recreação, Arte e Prazer",
    "nature": "Agradável, Artístico e Relaxante",
    "summary": "O feriado cósmico do ano! Momento sagrado para lazer, arte, descanso, música, romance, convívio social e recarga de energias para a alma.",
    "favorable": [
      "Tirar férias, viajar a lazer e desfrutar do contato com a natureza",
      "Participar de eventos musicais, teatrais, artísticos e celebrações sociais",
      "Adquirir itens de arte, beleza e conforto para si e para o lar",
      "Dedicar-se ao romance, aos laços afetivos e ao descanso mental"
    ],
    "unfavorable": [
      "Sobrecarregar-se com esforços mentais pesados, tensões ou estresse excessivo",
      "Cometer excessos nos prazeres sensuais ou no consumo alimentar desregrado"
    ],
    "fullText": "Este período pode ser chamado de 'feriado do ano'. É a época ideal para o prazer, o divertimento, o relaxamento e o entretenimento refinado. Não deve ser um período de trabalho exaustivo ou tensões severas. É excelente para o cultivo da música, pintura, teatro, compras de artigos belos para o lar e para renovar os laços de amizade e afeição sincera."
  },
  {
    "number": 7,
    "days": "313º ao 365º dia",
    "name": "Período Crítico, Disruptivo e de Reconstrução",
    "nature": "Transição e Limpeza - Cautela e Proteção",
    "summary": "A fase de involução que antecede a nova evolução. Período que encerra o ano pessoal, exigindo prudência nos negócios, recolhimento, cuidados de saúde e faxina geral.",
    "favorable": [
      "Concluir assuntos pendentes e descartar velhos laços ou hábitos nocivos",
      "Fazer reflexão interior, balanço do ano e descansar física e mentalmente",
      "Planejar com prudência o novo ciclo que nascerá no próximo aniversário",
      "Proteger a imunidade e adotar medidas preventivas de saúde"
    ],
    "unfavorable": [
      "Iniciar grandes empreendimentos inéditos ou arriscados",
      "Assumir pesadas dívidas, especulações financeiras ou assinar contratos de risco",
      "Submeter-se a procedimentos cirúrgicos não urgentes ou expor-se ao contágio de gripes"
    ],
    "fullText": "Este é o período crítico e disruptivo da vida de cada ano. É a fase em que a 'devolução' precede a 'evolução', ou seja, onde o terreno antigo é limpo para que a nova vida renasça no aniversário. Durante estes últimos 52 dias que antecedem seu aniversário, você deve ter a maior cautela: evite novos contratos arriscados, não empreste valores volumosos, não inicie novos negócios complexos e proteja rigorosamente sua saúde contra resfriados e esgotamentos."
  }
];
  const YEARLY_PERSONAL_PERIODS_EN = [
  {
    "number": 1,
    "days": "1st to 52nd day",
    "name": "Personal Promotion, Favors and Influence",
    "nature": "Highly Positive for Prestige and Personal Endeavors",
    "summary": "A period when a person should utilize every personal power and ability to advance legitimate interests among persons of influence who have powers or privileges to grant.",
    "favorable": [
      "Solicit favors, honors, employment, loans, partnerships, and special concessions",
      "Present propositions directly to superiors, executives, and persons in authority",
      "Settle lawsuits, arrange stays or delays in court, and achieve amicable compromises",
      "Advance plans with quiet dignity, poise, and firm determination"
    ],
    "unfavorable": [
      "Beginning a lawsuit or entering into contentious legal arguments",
      "Purchasing items requiring heavy investments or costly luxuries",
      "Remaining passive or diffident when personal representation is required"
    ],
    "fullText": "This is a period when a person should utilize every personal power and ability to advance his own interests among persons of influence who have powers or privileges to grant or give. It is a period when solicitation should be made for favors, either in seeking employment, benefits, loans, partnerships, investments, special concessions, releases, or even favors in the form of time or postponements or dismissals in court. It is an especially good period to seek favors or honors, help or recognition, from persons who are in high power or high positions such as government officials, judges, mayors, governors, senators, people at the head of large corporations or big business, or persons who hold valuable papers, documents, and matters that may be of great importance, and which may be released, modified, or otherwise affected by your solicitation. This is also a good period for advancing one’s own personal self among the populace, or with the people of your city, state, or country, or in building up your credit standing or your reputation with newspapers and influential people. It is a time to push yourself forward with discrimination and yet determination, for all of the cosmic vibrations are in favor of boosting and helping you personally so far as your name, reputation, honor, and integrity among high persons or the multitudes are concerned."
  },
  {
    "number": 2,
    "days": "53rd to 104th day",
    "name": "Short Journeys, Changes and New Agreements",
    "nature": "Dynamic and Favorable for Short-Term Transitions",
    "summary": "Everything tends to be favorably directed toward journeys of short duration, moving home or business, temporary changes in routine, and agreements of immediate effect.",
    "favorable": [
      "Undertake short, quick journeys by water or rail of immediate importance",
      "Move your home, business, or occupation to a new location",
      "Execute short-time plans, brief advertising campaigns, and concise articles",
      "Engage new employees or assistants and make operational adjustments"
    ],
    "unfavorable": [
      "Entering into long-term leaseholds, enduring contracts, or permanent commitments",
      "Buying homes, large properties, or embarking upon heavy multi-year investments",
      "Lending or borrowing money, building permanent structures, or market speculation"
    ],
    "fullText": "This period is distinctly different from the foregoing period, for during these 52 days everything will tend to be favorably directed toward your plans regarding any journeys, especially those that are not for many months’ or a year’s duration, but those that are short, quick, and of immediate importance rather than of importance in the future. Journeys by water or by train are generally favored during this period. It is also an excellent time for moving your home to a new location, or moving your business, or moving your occupation, if it is something under your own control. In other words, this is a period for changes which are quick and soon over with. In a business way this period will be found very favorable for such activities pertaining to movable things, and things of indefinite location. The moving of freight or the dealing with freight business, expressage, automobiles, wagons, carriages, trucks, public conveyances, public lectures, shows, performances, and things of this kind will be found successful. Strange to say, this period is also an excellent one for those who are dealing with liquids, chemicals, milk, water, water power, gasoline, or other things of a liquid nature. Dealing with people who are in lines of business associated with all of the foregoing will also be more successful in this period than in any other. Inversely, one should not plan a change of business or start a new career in business or attempt to build a permanent thing upon any change that is made during this period. Moving one’s home may be successful if done during this period, but at the same time the buying of a new home during this period will be very apt to result in a future change because a change made during this particular period does not make for permanency. Therefore, all things done during this time should be of such a nature as to begin during the period and end shortly afterward or as to be of the present months or year rather than the future. This period is also good for persons who are in business such as catering to transients, or to fluctuating business affairs, such as those who conduct hotels, or traffic, or who cater to persons who are constantly moving or passing by. It is also a good period in which to engage new employees or servants, or to begin any agricultural developments or planting. Contracts, agreements, legal papers, and other business affairs that are intended to continue over a period of years or remain permanent matters should not be started or completed during this period. It is an unfavorable period in which to loan money or even borrow money, and is not good for the construction of any building or the starting of any business that has a considerable investment to last over a long period. Certainly it is an unfavorable period to speculate in the stock market or to gamble in any form."
  },
  {
    "number": 3,
    "days": "105th to 156th day",
    "name": "Vital Energy, Executive Force and Dynamic Action",
    "nature": "Strong Potential - Requires Self-Mastery and Discretion",
    "summary": "Fills the individual with fiery energy and impulse to accomplish great things. Demands strict self-mastery, calm judgment, and caution to prevent disputes or accidents.",
    "favorable": [
      "Push forward undertakings requiring great physical effort, stamina, and persistence",
      "Dynamic salesmanship, forceful public lecturing, and vigorous leadership",
      "Overcome material resistance through disciplined vitality and determination",
      "Maintain calm deliberation, serene self-control, and tact in all relationships"
    ],
    "unfavorable": [
      "Acting with hasty anger, fiery irritability, or entering into quarrels and fights",
      "Beginning lawsuits, dealing with police or judges, or handling munitions and military matters",
      "Carelessness with fire, sharp tools, machinery, or driving (high hazard of physical injury)",
      "Contracting hasty marriages or entering into heated marital disagreements"
    ],
    "fullText": "Here we have a period that may be fortunate or unfortunate according to the application of the cosmic powers, and the discretion and discrimination that a person uses. This period fills the individual with an almost uncontrollable impulse to want to do great and important things, and the fiery energy that goes through the human system during this period wants to express itself in many ways. If directed carefully, this period can be one of the greatest in the whole year for the building up of a business and the accomplishment of those things that call for great physical energy, physical effort, endurance, vitality, determination, and persistency. On the other hand, if the energy is misspent, or applied without discrimination and judgment, great tasks may be undertaken or started that will not be completed in a long time, and too much for one person may be started through the restless energy that wants to express itself. This is an excellent period in which to overcome those obstacles and conditions that in the past periods seemed to check every advancement because of the energy and labor required. It is an excellent period to begin anything that has to start with a bang and have a great impulse during the first month or two of its career. Certainly this is an excellent period for dealing with affairs of the army, the navy, military engineering, munitions, or with those persons or lines of business that deal with heavy muscular or extreme vital energy. It is likewise an excellent period for the building up of a business or interests dealing with iron, steel, cutlery, sharp instruments, or things connected with electrical machinery, furnaces, and fire. It is also a fine period in which to deal with enemies, competitors, and rivals, who have heretofore been obstacles in the path, but it is a poor time to attempt to master those obstacles or persons with arguments or with contracts, papers, or agreements. If sheer energy, persistency, and long hours of activity and hard work will affect competitors or obstacles in the way, this is the period in which to overcome them in this manner. It is during this period that many quarrels, arguments, and business strifes occur, and these should be avoided because they are not apt to end very successfully for any person involved. It is an excellent period for salesmen or lecturers or others who must depend upon very forceful oratory or fiery argument to convince."
  },
  {
    "number": 4,
    "days": "157th to 208th day",
    "name": "Intellect, Communication, Literature and Contracts",
    "nature": "Highly Intellectual, Nervous and Communicative",
    "summary": "Cosmic forces strongly stimulate mental, nervous, and psychic faculties. Highly charged with new ideas, books, plays, plans, study, advertising, and formal written contracts.",
    "favorable": [
      "Write and create books, plays, plans, advertisements, and business schemes",
      "Capture inspirations immediately as they arise from the Cosmic Mind",
      "Purchase books, begin courses of study, attend lectures, and pursue scientific research",
      "Deal with editors, publishers, printers, lawyers, educators, and execute short-term contracts"
    ],
    "unfavorable": [
      "Allowing valuable inspirations to pass unrecorded or unapplied",
      "Overstraining the nervous system without adequate sleep and quiet relaxation",
      "Entering into marriage, hiring servants, manual labor, or buying livestock and lands"
    ],
    "fullText": "This period is considerably different from the preceding one, inasmuch as in it we have the cosmic forces strongly influencing and strengthening the mental, nervous, and psychic side of the nature rather than the physical. It is an excellent period for the writing and mental creation of books, plays, plans, business schemes, and other matters requiring a fertile mind, quick thinking, smooth-flowing language, and an unusual ability to express the thoughts in the mind. In fact, the mind will seem to be highly charged with new thoughts, new ideas, and easily contacted expressions of the Cosmic Mind. Incidentally, it has been noticed that since the mind is very fertile and very sensitive during this period, ideas, impulses, and urges are apt to flow into the mental consciousness very rapidly. To take advantage of most of these, the person must act upon impulse and quickly grasp the ideas and put them into practical application before others crowd them out. Therefore, it is is a dependable period for acting upon impulses or so-called intuitive hunches. The nature of the person becomes optimistic and, because of the mental activity, somewhat nervous and restless, with the imagination highly charged. It is a good period in which to deal with literary persons, reporters, messengers, to engage stenographers and writers, bookkeepers, engravers, artists, and persons whose work is primarily mental and rapid in expression. Artists are more inspired and more nimble in their work during this time. A warning must be given here, however, that great deceptions can be practiced upon persons during this period. Stories, reports, papers, documents, or other written or spoken matter that may come to your attention during this period must be carefully analyzed before being accepted, because it is a period when falsehood is as nimble and eloquently expressed in words or writing as is the truth. Deception, therefore, is not only very easy, but very frequent. Forgeries in regard to personal and business papers, and counterfeits of important papers or money must be watched at this time. Many of the great losses in life through thievery, robbery, or deception occur during this period, and proper precaution should be taken to prevent these things. It is a good time for study and for the absorption of special knowledge and for the building up of a quick and nimble mind and tongue. It is not a good time to enter into marriage, to hire servants, or to return from a long journey or to buy homes, business propositions, or lands."
  },
  {
    "number": 5,
    "days": "209th to 260th day",
    "name": "The Success Period of the Year (Expansion and Fortune)",
    "nature": "The Most Fortunate Period for Personal and Private Affairs",
    "summary": "The success period of each year for personal and private affairs. Cosmic tendencies bring happy fruition, financial expansion, legal favors, and deep metaphysical illumination.",
    "favorable": [
      "Expand personal affairs, increase prosperity, and secure legitimate business returns",
      "Deal with judges, lawyers, magistrates, clergymen, physicians, and persons of wealth",
      "Begin long-distance journeys and embark upon extended travel",
      "Pursue philosophical works, metaphysical studies, and collect outstanding debts"
    ],
    "unfavorable": [
      "Engaging in tricky, illegitimate speculations or dishonest maneuvers",
      "Dealing in livestock, wholesale meat products, or marine ventures",
      "Failing to embrace legitimate opportunities through unwarranted hesitation"
    ],
    "fullText": "Here we enter into what may be called the success period of each year, as far as our personal, private affairs are concerned. During these 52 days the cosmic impulses and tendencies are to bring happy fruition and successful termination of the things with which we have been laboring, or the things we have planned or put into action. It is during this time that our personal affairs expand, grow, and increase in prosperity. The mind of the person becomes filled with higher ideas of courtesy, religion, science, and law, and there is a tendency toward good fellowship, sociability, benevolence, honesty, and sympathy. It is an excellent period for dealing with lawyers or judges of the court, government offi cials, clergymen, physicians, merchants, or people of wealth. It is also a good period in which to begin a long journey in contradistinction to the good period for short journeys which occurs during the second period of this cycle. This is also a very fine period for renewing or starting interests in philosophical works, metaphysical studies, the preparation of sermons, or legal briefs, or those things requiring very favorable influences to bring to a successful issue. For that reason it is a fine time in which to collect money that is owing or to buy for the purpose of selling, and to sell or speculate or even to borrow. Any attempts during this period, however, to deal with tricky affairs that are not legitimate speculations, or to deal with cattle, to buy or sell cattle, or to deal with meat products on a large scale, or to deal with marine affairs, will prove unsuccessful."
  },
  {
    "number": 6,
    "days": "261st to 312th day",
    "name": "Vacation, Recreation, Art and Pleasure",
    "nature": "Pleasant, Artistic, Social and Relaxing",
    "summary": "The holiday of the year: a time for pleasure, amusement, relaxation, entertainment, music, fine arts, social visiting, and wholesome recreation.",
    "favorable": [
      "Make visits for relaxation, cultivate wholesome friendships, and enjoy entertainment",
      "Promote affairs connected with art, music, drama, poetry, personal adornments, and comfort",
      "Undertake enjoyable short journeys on land and engage in social gatherings",
      "Consummate transactions of a speculative nature, buy stocks, or engage assistants"
    ],
    "unfavorable": [
      "Subjecting oneself to exhausting labor, harsh strain, or intense mental friction",
      "Embarking upon long voyages by water",
      "Neglecting the natural need for rest and cheerful recreation"
    ],
    "fullText": "Here is a period that may be called the holiday of the year. It is a time for pleasure, amusement, relaxation, and entertainment. This does not mean, however, that business will not prosper and that regular affairs of life should be withheld or modified during this period, for all things that are legitimate and good will continue with almost as much success as during the preceding period. However, this is the time in which to deal specifically with certain affairs of life with more intensity than at other periods. Now is the time to make long or short visits for relaxation or for the renewing of friendships. It is a fine period for dealing with women, or for women to deal with men in the pleasurable things of life, and in the higher things of life. It is especially fortunate for such business matters as deal with the higher and more pleasant things of life such as with art, music, poetry, painting, sculpting, personal adornments, perfumes, incense, flowers, and so forth. Short journeys will be happy and successful during this time but not long voyages, or in fact any voyages by water. This is a good period for the consummation of transactions of a speculative nature, or to buy stocks and bonds or to engage employees and assistants."
  },
  {
    "number": 7,
    "days": "313th to 365th day",
    "name": "Critical, Disruptive and Reconstructive Period",
    "nature": "Transition and Cleansing - Utmost Caution and Protection",
    "summary": "The critical and disruptive period when devolution precedes evolution. The old is cleared for new rebuilding. Demands utmost conservatism, health vigilance, and no risky new ventures.",
    "favorable": [
      "Cooperate with natural reconstruction by closing pending matters and eliminating obsolete elements",
      "Postpone new plans and major launches until after the upcoming birthday anniversary",
      "Deal with elderly persons, judges, referees, and deliberate carefully before taking action",
      "Deal with patents, mechanical inventions, real estate, minerals, and products of the earth"
    ],
    "unfavorable": [
      "Launching new enterprises, making major new expenditures, or acting upon impulsive urges",
      "Entering into new affiliations, contracts, partnerships, or speculative gambles",
      "Surrendering to pessimism or discouragement during this subtle transitional period",
      "Undertaking long or short journeys by sea or land without protective necessity"
    ],
    "fullText": "This is the critical and disruptive period of life each year. I feel sure that after you have outlined the yearly cycle of your life for each year, if you will then look back over the last ten or more years of your life and note the things that occurred during the seventh period of each of your years, that you will see how true this is. It is that sort of a period when devolution precedes evolution, or when the breaking down begins in order that there may be a new building up. It is like the period when the house is torn down, brick by brick, and leveled in order to rebuild again. In one sense it is disruptive, and in another sense it is the first stage to reconstruction. For that reason, each should be warned to take advantage of the natural tendency of this period and at the same time guard against these tendencies that they may not go too far, or that one may not wrongly labor and run counter with the tendencies instead of cooperating with them. It is the period when most things that have been hanging fire and are about to end, or disrupt, do so. If a business or any other affair has been going poorly and has shown a tendency to fail, and go to pieces, this is the period when such a culmination is most apt to occur. If this result is not wanted, care must be exercised not to do those things which will help to bring it about The mind is very apt to become despondent, discouraged, or pessimistic during this period, and that must be kept in mind, for if this attitude is allowed to affect the actions in business or in personal affairs, it will help to bring about a disastrous result. The influences during this period are very subtle, and must be carefully analyzed and reasoned before being applied. We have said that during the fourth period of this cycle the rapidity with which ideas come to the mind, along with the cosmic influences creating them, makes it advisable to be quick and even impulsive in accepting and applying these ideas. The very reverse is true in the present period. Impulsiveness here will bring disaster. If matters that are pending or ideas that suggest themselves can be postponed and held over until past the coming birthday, and put into the first period or the second period of this cycle, it will assure greater success. This is a good period for dealing with elderly persons, judges, referees, or persons who must debate and consider carefully and for a long time before rendering their decisions. It is also a good time for business interests dealing with inventions and mechanical things, and even for applying for patents or government papers of protection. It is a very good period for dealing in real estate, mines, and minerals, and those things that are of the earth, and deeply seated in it, or in hidden or out-of-the-way places. For that reason it is a good period to deal with persons engaged in lines of business connected with these things, or with grain or fruits of the earth. Certainly it is the most unfavorable period in the whole year for starting anything new or launching a new business or giving a new impulse or new expenditure in business except for protective purposes. Voyages by sea, long or short, or on land, should be avoided unless their effects are to result in weeks and months of the future when they will fall in another period."
  }
];

  const BUSINESS_PERIODS_PT = [
  {
    "number": 1,
    "name": "Promoção Pública e Apoio de Autoridades",
    "focus": "Lançamentos e Captação de Patrocínios",
    "description": "Durante os primeiros 52 dias a partir do nascimento da empresa (ou aniversário do gestor), a empresa obterá maior sucesso em todas as formas de promoção que dependam da cooperação de personalidades de grande prestígio, instituições financeiras sólidas e líderes de opinião."
  },
  {
    "number": 2,
    "name": "Ajustes Operacionais e Mudanças Temporárias",
    "focus": "Adaptações e Flexibilidade de Métodos",
    "description": "Período ideal para fazer modificações temporárias em relação a colaboradores, alterar métodos de trabalho, testar novas rotinas ou produtos em caráter experimental e abrir novas frentes passageiras de negócios."
  },
  {
    "number": 3,
    "name": "Construção Vigorosa e Força Máxima de Vendas",
    "focus": "Impulso Produtivo e Comercial Agressivo",
    "description": "Momento de tremenda energia construtiva. Toda proposta de negócios deve ser empurrada com seu máximo vigor. Todas as instalações, canais de produção, equipe de vendas e distribuição devem operar com força total para conquistar mercado."
  },
  {
    "number": 4,
    "name": "Grandes Campanhas de Publicidade e Divulgação",
    "focus": "Comunicação em Massa e Contratos Formais",
    "description": "Época perfeita para deflagrar as maiores campanhas de propaganda, marketing, anúncios, malas-diretas, envio de catálogos e formalização de parcerias contratuais por escrito. O alcance da mensagem atinge o público com máxima eficácia."
  },
  {
    "number": 5,
    "name": "Crescimento Financeiro, Lucros e Expansão de Crédito",
    "focus": "Colheita de Resultados e Prosperidade",
    "description": "O período dourado para o crescimento financeiro do negócio. Fase apropriada para obter linhas de crédito bancário, atrair novos investidores sólidos, consolidar capital de giro e fechar negociações lucrativas de alto valor."
  },
  {
    "number": 6,
    "name": "Desaceleração, Férias da Diretoria e Confraternização",
    "focus": "Relaxamento Estratégico e Bem-Estar",
    "description": "Momento do ano comercial em que a empresa deve permitir pausas estratégicas, programar férias de executivos e funcionários importantes, comemorar conquistas alcançadas e evitar o esgotamento por excesso de atrito corporativo."
  },
  {
    "number": 7,
    "name": "Auditoria, Reestruturação e Prevenção de Riscos",
    "focus": "Balanço Geral e Proteção Patrimonial",
    "description": "Período de cautela redobrada. Não se deve iniciar novas linhas de produtos de alto risco, nem contrair dívidas pesadas. É o momento de cortar despesas desnecessárias, organizar inventários, cobrar inadimplências com método e fechar as contas para o novo ano."
  }
];
  const BUSINESS_PERIODS_EN = [
  {
    "number": 1,
    "name": "Public Promotion and Support of Authorities",
    "focus": "Launches and Securing Endorsements",
    "description": "During the first 52 days of the yearly cycle of each business, beginning with its birthday and covering the 52 days following, each business will find greater success in all forms of promotion that solicit or depend for their success upon the good will and the preferment of the public. It is not as excellent a period for the actual building up of sales and return of money as it is a period for securing approval, favor, recognition, and general good will. This would be the period to solicit endorsements or high recognition by eminent persons and concerns that would either result eventually in sales through such persons, or in giving widespread publicity and advertising to the concern. It is also an excellent period in which to advertise a business widely, not so much for direct sales as to build up prestige and public recognition. It is a good period for the sending forth of emissaries, representatives, or high members of the firm to meet other eminent persons in the business world and, therefore, secure recognition and high favor. For this reason it is an excellent period to deal with government officials, judges of the court, or senators, or congressmen from whom you desire preferment, special favors, or the passage of protective bills or regulations. This makes the period also good for the securing of political influence, political cooperation, and recognition. The thought of the concern during this period should be not of money, but of name, reputation, and prestige."
  },
  {
    "number": 2,
    "name": "Operational Adjustments and Temporary Changes",
    "focus": "Adaptations and Flexibility of Methods",
    "description": "During this period any firm or business of any nature will find that it is a good time to make important changes of a temporary nature in regard to important employees, modifications in business practice, temporary locations, and for trying out short-time plans and propositions. On the other hand, it is a very unfavorable period during which to make any new agreements, any new plans of a definite nature, or to enter into any contracts or agreements of any kind unless they are reduced to writing, and properly sealed and signed so as to give them a long-time standing. Verbal agreements and arrangements entered into at this time are apt to be cast aside quickly and changed very rapidly or suddenly, and amount to nothing. It is also a good period for the building up of business friendships, and every business firm would do well to take advantage of this period to contact new and prospective customers in a friendly way, for business friendships of a very helpful nature have generally been built up during this period."
  },
  {
    "number": 3,
    "name": "Vigorous Building and Maximum Sales Drive",
    "focus": "Aggressive Productive and Commercial Push",
    "description": "Here we have a period of construction and great energizing power. It is during this period that any business proposition should be pushed to its utmost. Every facility and every means of manufacturing, selling, producing, advertising, promoting, and extending the business should be adopted and utilized to the utmost during this period. It is also a good period for the arrangement of plans for collections, or to send out collectors or letters intended to collect money, but it is not a good period for attempting to fight any issues in court that have to do with the activities of business enemies, business rivals, or business competition. Other legal matters, however, may be pushed at this period, and will generally receive more favorable reaction than at any other period, especially if the matter is one that calls for the expenditure of a great deal of energy and of considerable fighting for the protection of certain issues or rights. On the other hand, every firm and business should watch out for dangerous accidents, disasters, and troubles through enemies, through fires, or through sudden explosions of wrath, enmity, or hatred during this period. Manufacturing plants and other propositions should be careful of fires or explosions from fires, gases, and stored-up energies of any kind during this period. It is during this period also that personal enemies of the business will attempt to wreck it or even to injure the character or life of a person connected with a business, if the business has attained any degree of enmity on the part of competitors or others. It is a very good period for dealing with army and navy matters, the military departments of the government, engineering, munitions, machinery, or firms or individuals associated with these."
  },
  {
    "number": 4,
    "name": "Major Advertising and Publicity Campaigns",
    "focus": "Mass Communication and Formal Contracts",
    "description": "This is the period in which any firm or business would do well to enter into its largest campaign of widespread advertising, whether this be nationwide advertising or the mere solicitation by letter of customers in a limited area. Whatever writing, planning, and scheming of promotion a business firm or individual may want to do in any year of its business, it will be found to be most successful during this period of the business cycle of each year. On the other hand, it is also an excellent period for the drawing up of new contracts, new agreements, papers of incorporation, documents, transfers, and so forth. It is an excellent period to deal with newspapermen, diplomats, arbitrators, or others who can use their mentalities or printed or written words to further the interests of the concern. On the other hand, firms must be careful during this period to watch out for deception by word of mouth or writing, for forgeries, and for tricky agreements or plans cleverly presented and which are apt to have a serious reaction in many ways."
  },
  {
    "number": 5,
    "name": "Financial Growth, Profits and Credit Expansion",
    "focus": "Harvest of Results and Commercial Prosperity",
    "description": "Here is a period of growth and financial success for any concern or business proposition. This is the period in which to seek investment, or seek to secure credit and extend the time in which payments must be made or negotiations closed. It is one of the best periods in the business year for selling, and the actual distribution of material on a sales basis, if immediate results and a quick and fair return of money are desired. It is an excellent period in which to collect bad or old debts, and it is an excellent time in which to bring matters into court where the favorable decision desired hangs by a slender thread. For all things being quick and right, this period is favorable to a constructive and just decision. It is an excellent period also for the promotion of the business into foreign lands or distant places or with large concerns that deal in international matters or have interna tional distribution and sales agreements. It seems to be an especially good period for business firms to promote their affairs with railroad, railway, and electric companies, and with all companies and concerns that deal in things that cater to the pleasures and happiness of the public."
  },
  {
    "number": 6,
    "name": "Slowdown, Board Vacations and Strategic Fellowship",
    "focus": "Strategic Relaxation and Well-Being",
    "description": "This is the period in each year when every business should relax its activities if it finds it necessary to relax at all, and should plan its periods for the vacation or absence of any of its important directors or operators. It is also an excellent period for the promotion of certain branches of business such as those that deal with the art world, or with music, poetry, sculpting, artists’ materials, women’s clothing, or articles of adornment, beauty preparations, high-grade shoes, hosiery, evening wraps, hats, luxurious automobiles, oriental rugs, antique furniture, fine books, expensive musical instruments, concerts, operas, and other things representing the luxuries, refinements, and clean and wholesome pleasures of life. Therefore, it is well to push the sale of things of this nature during this period, or to promote good will or interest among persons who are associated with such lines of business. This is an excellent period for the heads of a concern or the individual owner of any kind of business to make the acquaintance of his customers, and to make such intimate contacts with persons as may be helpful to the business or the individuals of the business in the near future. It is also a good period for the collection of money, the buying of stocks and bonds, or the promotion of the finances of the company through investment in conservative stocks of other concerns. Therefore, it would be an excellent period for the bringing about of partnerships, monopolistic corporations, and the formation of subsidiary associations and alliances of a similar nature."
  },
  {
    "number": 7,
    "name": "Auditing, Restructuring and Risk Prevention",
    "focus": "General Balance and Asset Protection",
    "description": "Here we have the reconstruction period for all business propositions, and during these last 52 days before the birthday of the concern or business, great care must be taken not to start any new line of activity or to go too heavily into advertising that is intended to build up a new department or a new phase of the business, or to do otherwise than cooperate with the cosmic tendencies to reconstruct. Since it is the period during which changes of a tearing down nature must be expected, it is a wrong period in which to plan to do reconstruction without the preliminary stage of tearing down. In other words, during this period no expansion must be expected unless it is associated in some way with a breaking down or tearing down process as a part of the reconstruction. Since some form of breaking down and change is very apt to take place during these 52 days, every business concern or individual should see that any contemplated changes or tearing down processes that have been in mind are brought to issue during this time, and therefore permitted to expend themselves or manifest themselves while such a period is favorable. Certainly no new alliances, affiliations, partnerships, or agreements, contracts, or offers of agreement or contract should be made during this period. It is an excellent time to consult with persons in retirement, or who have been in business and have retired, or with judges, referees, or advisers of any kind. All acts must be guarded with a conservative attitude, and extreme caution and providence manifested in every line of activity. Great diplomacy must be shown in every act, and every business should take advantage of this period to conserve its activities, hold steady to its line of progress, and not allow anything of a radical nature in either advertising, selling, buying, or planning to occur."
  }
];

  const HEALTH_PERIODS_PT = [
  {
    "number": 1,
    "name": "Vitalidade Máxima e Regeneração Natural",
    "warning": "Baixo Risco",
    "recommendation": "A vitalidade física e a capacidade de autorregeneração do organismo estão no seu nível máximo anual. Tratamentos naturais, dietas revigorantes e descanso adequado produzem recuperação rápida e fortalecem a imunidade."
  },
  {
    "number": 2,
    "name": "Sensibilidade Digestiva e Flutuações Passageiras",
    "warning": "Atenção Leve",
    "recommendation": "Possibilidade de desconfortos leves e passageiros no estômago, fígado e intestinos, além de flutuações de ânimo. Mantenha uma alimentação leve e hidratação abundante; evite comidas pesadas ou excessivamente condimentadas."
  },
  {
    "number": 3,
    "name": "Alerta para Incidentes Físicos e Tensão Muscular",
    "warning": "Cuidado com Acidentes",
    "recommendation": "Fase de excesso de energia muscular e nervosa. Recomenda-se muita prudência com objetos cortantes, fogo, ferramentas pontiagudas, quedas e trânsito veloz. Evite operações cirúrgicas repentinas por afobação, exceto em casos de emergência real."
  },
  {
    "number": 4,
    "name": "Tensão Nervosa, Inquietação e Higiene do Sono",
    "warning": "Cuidado com Esgotamento Mental",
    "recommendation": "O sistema nervoso é colocado à prova, podendo manifestar-se por insônia, inquietação e irritabilidade. Evite cafeína em excesso, busque ambientes calmos, pratique respiração ritmada profunda e proteja o repouso noturno."
  },
  {
    "number": 5,
    "name": "Vigor Físico Restaurado e Cura ao Ar Livre",
    "warning": "Período Muito Benéfico",
    "recommendation": "Excelente período para a saúde e bem-estar geral! O corpo responde esplendidamente a exercícios ao ar livre, caminhadas longas em meio à natureza, banhos de sol moderados e respiração de ar puro."
  },
  {
    "number": 6,
    "name": "Moderação Sensorial e Proteção das Vias Aéreas",
    "warning": "Evitar Excessos de Prazeres",
    "recommendation": "Evite excessos de qualquer natureza: comida, bebida, noitadas ou indulgências carnais. Atenção especial à garganta, cordas vocais, rins e sistema urinário/reprodutor. A sobriedade garante a manutenção do vigor."
  },
  {
    "number": 7,
    "name": "Ponto Crítico da Saúde Anual (Resfriados e Crônicos)",
    "warning": "Atenção Máxima à Imunidade",
    "recommendation": "O período mais delicado do organismo no ano. É nesta época que se contraem resfriados que teimam em não passar e doenças crônicas que demandam meses para cura. Agasalhe-se bem, evite mudanças bruscas de temperatura, repouse e não realize cirurgias eletivas adiáveis."
  }
];
  const HEALTH_PERIODS_EN = [
  {
    "number": 1,
    "name": "Maximum Vitality and Natural Regeneration",
    "warning": "Low Risk",
    "recommendation": "During this period the vitality and constitutional health should be at its best and, if it is below normal, it will be more quickly and easily increased and strengthened by normal living and the avoidance of the violation of any natural laws. Plenty of outdoor walking, good air, drinking plenty of water and eating proper foods, avoiding foods that are overheating, especially the starches and raw or rare meats—this will yield results. The eyes should be guarded against overuse or use in bright electric lights or sunlight, and if any operation is planned, or system of health building is to be adopted, this is the period in which to start these things."
  },
  {
    "number": 2,
    "name": "Digestive Sensitivity and Transient Fluctuations",
    "warning": "Mild Attention",
    "recommendation": "This is a period in which many light and temporary physical conditions may affect the body, and passing emotional conditions affect the mind. In other words, during this period a person may have temporary trouble with the stomach, bowels, bloodstream, and nerves. These conditions seem to come quickly, last but a few days, and pass away quickly. None of these should be neglected; each should be given immediate attention, but there need be no anxiety regarding the continuance of such conditions if immediate attention is given, for all of the influences tend to bring rapid changes in the health and physical condition of the body during these 52 days. During this period there are apt to be days with headaches, upset stomachs, trouble with the eyes or the ears, catarrh, coughs, aches and pains through mild forms of cold, and with women occasionally aches and pains in the breasts and abdomen. During this period everyone should try to be cheerful and not permit the mind to dwell upon the temporary conditions that affect the body, but simply attend promptly to the checking of any condition that may arise and then cast it out of the mind."
  },
  {
    "number": 3,
    "name": "Alert for Physical Incidents and Muscle Strain",
    "warning": "Caution with Accidents",
    "recommendation": "This is a period when accidents may happen, and often sudden operations come into one’s life, of either a minor or major nature. Likewise, suffering by fire or injury through sharp instruments, falls, or sudden blows, is more likely during this period than any other. Persons should be careful of their food and not overeat, and the body should be kept normally warm because during this period there will be a tendency toward colds, often resulting from overeating or overheating the body. The bloodstream should be kept clean and the bowels active, so that blood conditions will not result in sores, boils, eczema, rashes, or other more serious conditions of the skin and blood. The blood pressure also should be watched during this period, for there will be a tendency for it to rise, and overwork or strain should be avoided. Any abnormal strain upon any part of the body is very apt to bring a breaking down during this period."
  },
  {
    "number": 4,
    "name": "Nervous Tension, Restlessness and Sleep Hygiene",
    "warning": "Beware of Mental Exhaustion",
    "recommendation": "During this period the nervous system of your body will be tried to its utmost and there will be many tendencies toward nervousness expressing itself in the functioning of various organs or in an outer form of restlessness and uneasiness. Too much study, reading, planning, or use of the mind and nervous system will surely bring definite reactions during this period. More sleep and more rest are required during this period than in any other part of the year. Fretfulness and nervousness may also affect the digestion, the functioning of the stomach, and may also produce a nervous heart which may cause misgivings and inconvenience. Persons who have been laboring too long or too tediously with mental problems or work requiring mental strain should be forced to relax and rest during this period, or a mental breakdown is inevitable."
  },
  {
    "number": 5,
    "name": "Restored Physical Vigor and Outdoor Healing",
    "warning": "Highly Beneficial Period",
    "recommendation": "This is another good period, when the health should be very good, especially if normal living is indulged in, and the great outdoors utilized for deep breathing, fairly long walks, and good exercise. There will probably be a tendency during this period to overindulge in the things that please the flesh, such as the eating of preferred foods, elaborate meals and banquets, rich concoctions, spicy drinks, and so forth, and even overindulgence morally and ethically in many ways. All of this must be avoided during this period in order to prevent serious conditions. This is a good period in which to recover from fevers, chronic conditions, or other abnormal or subnormal conditions of the body which have been existing for some time. During this period, mental suggestions, metaphysical principles, and right thinking will have more effect upon the body and the health than at any other period."
  },
  {
    "number": 6,
    "name": "Sensory Moderation and Respiratory Protection",
    "warning": "Avoid Sensory Excesses",
    "recommendation": "This period is another one in which overindulgence should be carefully avoided in regard to work, mental strain, eating, or any of the pleasures of the flesh. It is a period during which the skin, throat, internal generative system, and kidneys may become affected. Therefore, plenty of water should be drunk during this period, the bowels kept open, and rest with outdoor exercise should be indulged in more frequently than mental strain or overwork."
  },
  {
    "number": 7,
    "name": "Critical Point of Annual Health (Colds and Chronic Issues)",
    "warning": "Maximum Attention to Immunity",
    "recommendation": "This is the period during which chronic or lingering conditions are often contracted, and which remain a long time and cause considerable trouble in overcoming. Everyone should be especially careful of catching colds or contracting serious contagious fevers during this period by avoiding the places where such things may be contacted. The mind and whole nature is very apt to be despondent and below normal in the ability to ward off and fight an incoming condition. Even the bloodstream may be lowered in its vitality at this period and, therefore, is unable to fight even the normal amount of germs or unfavorable influences that generally come in contact with every human being. It is not a good time, however, for taking medicine or having an operation performed, or for starting any new or drastic method of improving the health unless in an emergency or unless it is to be continued over a long period, so that its real effect will come into the next period of 52 days, which will be Period No. 1 of the next cycle. The eyes, the ears, and in fact any one of the five senses may become affected during this period, and care should be taken that colds or other conditions do not linger during this period or continue without proper expert attention. It is one of the most serious periods of the whole year for each person, in regard to diseases and chronic conditions."
  }
];

  const DAILY_TIME_SLOTS_PT = [
    { slotIndex: 1, name: "1º Período", timeRange: "00:00 às 03:25", startMinutes: 0, endMinutes: 205 },
    { slotIndex: 2, name: "2º Período", timeRange: "03:25 às 06:51", startMinutes: 205, endMinutes: 411 },
    { slotIndex: 3, name: "3º Período", timeRange: "06:51 às 10:17", startMinutes: 411, endMinutes: 617 },
    { slotIndex: 4, name: "4º Período", timeRange: "10:17 às 13:42", startMinutes: 617, endMinutes: 822 },
    { slotIndex: 5, name: "5º Período", timeRange: "13:42 às 17:08", startMinutes: 822, endMinutes: 1028 },
    { slotIndex: 6, name: "6º Período", timeRange: "17:08 às 20:34", startMinutes: 1028, endMinutes: 1234 },
    { slotIndex: 7, name: "7º Período", timeRange: "20:34 às 24:00", startMinutes: 1234, endMinutes: 1440 }
  ];

  const DAILY_TIME_SLOTS_EN = [
    { slotIndex: 1, name: "1st Period", timeRange: "12:00 AM to 03:25 AM", startMinutes: 0, endMinutes: 205 },
    { slotIndex: 2, name: "2nd Period", timeRange: "03:25 AM to 06:51 AM", startMinutes: 205, endMinutes: 411 },
    { slotIndex: 3, name: "3rd Period", timeRange: "06:51 AM to 10:17 AM", startMinutes: 411, endMinutes: 617 },
    { slotIndex: 4, name: "4th Period", timeRange: "10:17 AM to 01:42 PM", startMinutes: 617, endMinutes: 822 },
    { slotIndex: 5, name: "5th Period", timeRange: "01:42 PM to 05:08 PM", startMinutes: 822, endMinutes: 1028 },
    { slotIndex: 6, name: "6th Period", timeRange: "05:08 PM to 08:34 PM", startMinutes: 1028, endMinutes: 1234 },
    { slotIndex: 7, name: "7th Period", timeRange: "08:34 PM to 12:00 AM", startMinutes: 1234, endMinutes: 1440 }
  ];

  const DAILY_CHART_E = {
    0: ['G', 'A', 'B', 'C', 'D', 'E', 'F'],
    1: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    2: ['F', 'G', 'A', 'B', 'C', 'D', 'E'],
    3: ['B', 'C', 'D', 'E', 'F', 'G', 'A'],
    4: ['E', 'F', 'G', 'A', 'B', 'C', 'D'],
    5: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    6: ['D', 'E', 'F', 'G', 'A', 'B', 'C']
  };

  const DAILY_LETTER_MEANINGS_PT = {
  "A": {
    "letter": "A",
    "title": "Meditação, Planos Estratégicos e Favores de Nobres",
    "nature": "Positivo para Assuntos de Autoridade e Concentração Mental",
    "description": "Excelente para meditar ou concentrar-se profundamente sobre os detalhes de planos vindouros. Ótimo momento para solicitar favores a pessoas de alta posição, magistrados, diretores, clérigos e figuras de autoridade. Favorece a inspiração nobre e o contato com a sabedoria superior.",
    "favorable": "Meditação, busca de favores de superiores, petições formais, planejamento mental reservado.",
    "unfavorable": "Atividades banais, fofocas ou disputas mesquinhas."
  },
  "B": {
    "letter": "B",
    "title": "Artes, Música, Beleza, Romance e Convívio Social",
    "nature": "Agradável, Harmonioso e Sensível",
    "description": "Abençoado para assuntos ligados às belas-artes, música, embelezamento da pessoa e do ambiente doméstico. Momento ideal para compras de adornos, passeios românticos, confraternizações afetuosas e início harmonioso de novas tarefas agradáveis.",
    "favorable": "Música, artes, decoração, romance, compras de beleza e encontros sociais prazerosos.",
    "unfavorable": "Tarefas estressantes, trabalhos pesados e discussões frias ou ríspidas."
  },
  "C": {
    "letter": "C",
    "title": "Intelectualidade, Ciências, Ensino e Publicações",
    "nature": "Lúcido, Educacional e Científico",
    "description": "Especialmente afortunado para o intelecto superior, educação, pesquisas científicas, escrita, tipografia, publicação, conferências e atividades pedagógicas. Momento favorável para enviar propostas comerciais de caráter educacional ou formalizar acordos.",
    "favorable": "Estudos, escrita, leitura, pesquisa, aulas, contato com advogados e documentos intelectuais.",
    "unfavorable": "Assuntos puramente materiais ou irracionais desprovidos de lógica."
  },
  "D": {
    "letter": "D",
    "title": "Negócios Gerais, Contato com o Público e Transações",
    "nature": "Prático, Comercial e Construtivo",
    "description": "Excelente para assuntos comerciais do dia a dia, atendimento ao público geral, serviços agrícolas, contratação de novos empregados ou colaboradores e transações cotidianas de compra e venda ordinárias.",
    "favorable": "Comércio, contratação de serviços, agricultura, negociações diárias e atendimento a clientes.",
    "unfavorable": "Isolamento meditativo ou assuntos estritamente místicos que exijam solidão."
  },
  "E": {
    "letter": "E",
    "title": "Perseverança, Esforços Longos e Assuntos com Árbitros",
    "nature": "Severo - Exige Firmeza e Estratégia",
    "description": "Indicado para atividades que demandem profunda reflexão seguida de longas campanhas de ação firme e continuada. É um momento propício para apresentar causas perante árbitros, juízes ou mediadores neutros. Exige ponderação para não agir por impulso cego.",
    "favorable": "Campanhas de longo prazo, defesas jurídicas, paciência estratégica e perseverança.",
    "unfavorable": "Ações precipitadas, irritabilidade e decisões apressadas sem reflexão."
  },
  "F": {
    "letter": "F",
    "title": "O Período Mais Afortunado do Dia (A Grande Sorte)",
    "nature": "Altamente Afortunado para Conquistas e Sucesso",
    "description": "Considerado o período mais favorável de cada dia! É a hora da boa estrela: excelente para compras importantes de imóveis, bens duráveis, abertura de contas bancárias, assinatura de acordos felizes e inauguração de empreendimentos prósperos.",
    "favorable": "Iniciar negócios, compras de valor, investimentos, casamentos, viagens felizes e propostas vitais.",
    "unfavorable": "Desperdiçar essa hora privilegiada com inércia, hesitação ou sono desnecessário."
  },
  "G": {
    "letter": "G",
    "title": "Força Física, Vigor, Esportes e Superação de Desafios",
    "nature": "Enérgico, Marcial e Físico",
    "description": "Especialmente apropriado para atividades que exijam grande esforço muscular, resistência física, trabalhos mecânicos, esportes e superação enérgica de obstáculos que demandem coragem e determinação firme.",
    "favorable": "Trabalhos corporais pesados, cirurgias pontuais quando recomendadas, esportes e esforço físico.",
    "unfavorable": "Negociações delicadas que exijam diplomacia sutil, conciliação e ternura."
  }
};
  const DAILY_LETTER_MEANINGS_EN = {
  "A": {
    "title": "Meditation, Strategic Planning and Favors from Authorities",
    "nature": "Positive for High Authority and Mental Concentration",
    "favorable": "Meditation, formal petitions, seeking favors from superiors, reserved mental planning.",
    "unfavorable": "Trivial gossip, mundane arguments, or petty disputes.",
    "letter": "A",
    "description": "THERE are many things which may be done during this period of the day, with the hope of fortunate realization and cosmic cooperation. For instance, one may concentrate or meditate upon any plan for the purpose of evolving its details; he may ask favors from persons in high positions, especially when such favors relate to a promotion in position, in political power, or in social position; he may ask for stays or delays in legal procedure, the loan of money, the endorsement or recommendation of a proposition, the introduction to a person in high position. This is a propitious time for dealing with public officials, or persons of high rank; the signing of wills, deeds, or transfers, the writing of important letters that seek favors, promotions, or recommendations, or which carry to the mind of another person a high regard of one’s self, his business, or any plan he is proposing. It is a good time in which to talk to bankers or financiers for the purpose of building up personal credit or the credit of a business, the making of a public appearance or address for the purpose of bringing esteem and honor to yourself or your business, or for building up your reputation or the reputation of your affairs. It is not a good period to deal with criminals or evil matters, even as a lawyer or adviser. It is a time filled with energy which must be controlled. It is also a period filled with fiery impulses which must be governed, just as all words and acts must be cautiously controlled. It is not a good period to start a new business, a new plan, or a new proposition of any kind; it is not good for the buying of livestock; neither is it good for the signing of contracts or agreements. It is not a good period in which to start short journeys of several days’ duration, nor is it a good period in which to deal with marital affairs or to marry, or to go courting. It is a bad period in which to loan money, to move into a new location for either home or business, or to start the erection of a new building of any kind. And it is not a good time in which to make the first financial investment in a new business. It is not fortunate for buying real estate or even for selling or renting it. Nor is it a good period for surgical operations."
  },
  "B": {
    "title": "Arts, Music, Beauty, Romance and Social Fellowship",
    "nature": "Pleasant, Harmonious and Refined",
    "favorable": "Music, arts, decorative crafts, romance, personal adornment, and joyful gatherings.",
    "unfavorable": "Heavy manual labor, stressful confrontations, and harsh arguments.",
    "letter": "B",
    "description": "This period is fortunate for the following things: Matters dealing with art, music, the beautifying of the home or person, or with matters pertaining to purely material and sensual affairs. It is an excellent period for starting any new undertaking; for the enjoyment of art, music, and drama; for the buying of livestock; for the collecting of accounts; or for dealing with the public in connection with public administration, public affairs, and public utilities, or soliciting business from the public. It is also good for the hiring of agents, collectors, traveling representatives, salesmen, and employees for important positions in the business or home. New acquaintances made during this period are generally dependable and worthy of friendship and trust, if they come into your life purely in a social way. It is a good period to start short journeys, lasting for two or three days, or less than a month; a good time for marriage and courting, for loaning money or borrowing money; to put into material form any new plans for business or pleasure; for indulging in recreation and social function. It is also a good period for seeking favors in a social way, or business favors in social circles. It is also good for speculating, for games of chance, and for investments of a speculative nature; also a good period for dealing with women in either business or social matters. It is not a period of great ambition, and while it is changeable, it is easily adapted to many conditions. It is a fruitful period inasmuch as most things started or culminated during this period will be more prolific than one may anticipate. It also brings its impulses of an intellectual and social nature, which must be guarded against. It is not a good time for hiring servants or persons for menial positions, and is not a good time for starting long journeys, especially those which either by train or water take one far from home."
  },
  "C": {
    "title": "Intellectuality, Science, Education and Publishing",
    "nature": "Lucid, Educational and Scientific",
    "favorable": "Study, writing, reading, scientific research, legal drafting, and intellectual contracts.",
    "unfavorable": "Irrational or purely material activities lacking logical foundation.",
    "letter": "C",
    "description": "This period is especially fortunate for dealing with the fine arts, or the intellectual things of life, especially education, scientific research, publishing, printing, instructing in schools, colleges, universities, and in the promotion of campaigns involving an educational element. It is a good time for study, memory work, and absorption of special knowledge, analytical examination of documents, books, papers, and propositions, or to deal with legal arguments in court requiring the use of the intellect and logic. It is an especially good period for mental activity of any kind, including writing, thinking, speaking, and self-examination. It is also a good period to indulge in the drama, music, and art. The buying of livestock, or dealing in cattle or the livestock market, is fortunate during this period. It is a good time for the making of contracts providing same are not for long periods but of short duration, collecting of accounts, making of new acquaintances that are dependable, the hiring of business employees and servants of all kinds and classes. It is also a good time to start short journeys, to do literary and newspaper work, prepare advertising, start new advertising campaigns, or to send out literature to the public pertaining to business or social affairs. It is also a fortunate time for the taking of medicine or any system of therapeutics which is to benefit the physical body. It is a good time to lend money, but it is questionable whether it is a good period in which to borrow. It is a good time in which to erect new buildings, or to plan new undertakings; and students of the occult, the philosophical, and metaphysical will find that this is an excellent period for study and objective realization of great truths. It is a good period in which to take a chance with undertakings that are highly tricky, or questionable from a financial point of view, for one who has the means to do this without bringing financial embarrassment should the result not be all that is expected. It is a good period in which to have a few minutes of recreation or social intercourse, and for signing important papers of all kinds, and it is likewise the best period for traveling salesmen to call upon the most difficult of prospective customers. It is also a good time for writing important letters. This period is not good for dealing with private or public enemies or bringing them into court, or attempting to adjust matters with them, for this period will bring endless discussions and arguments without any beneficial results. It is a period that is quite changeable in many ways, giving great mental activity, but is not good for prudence and caution, and, therefore, no dependence should be placed in one’s usual cautiousness. It is not good for marriage, and it is a questionable period to deal with lawyers in regard to any problem, or to deal with inventions and mechanical problems, or to seek promotion in business, or to ask for the favor or recognition of public officials or prominent persons. It is not a good time to buy real estate, and it is questionable whether it is a good time to sell real estate. It is a doubtful period for seeking favors, or for spiritual development or concentration, and is a very unfortunate period for dealing with surgeons or having a surgical operation of any kind. It should be remembered that during this period one comes in contact with the nimbleness of mind and tongue. Any person presenting a proposition or plan to you at this time is very apt to exaggerate or mislead through his statements or his evidence. Forgers, blackmailers, and persons who are deceitful, lying, and too nimble with their expert fingers, are apt to present themselves during this period. Therefore guard yourself accordingly."
  },
  "D": {
    "title": "General Business, Public Dealings and Practical Affairs",
    "nature": "Practical, Commercial and Constructive",
    "favorable": "Commerce, engaging services, agriculture, public dealings, and daily negotiations.",
    "unfavorable": "Strictly solitary meditation or pursuits demanding complete isolation.",
    "letter": "D",
    "description": "Here we have a period that is especially fortunate for all general material affairs of business, dealings with the public in any general capacity, educational work of any kind, planting or farming operations, the making of new acquaintances, and the hiring of servants of all classes. It is also a good period in which to start short journeys or long journeys by water, and for writing, supervising, or dealing with literary or newspaper work. It is also a good period for marriage or for courting, for all marine affairs, for the taking of medicine or any system of therapeutic help for the body or mind, for metaphysical study and analysis, or for dealing with shipping interests, transportation interests, or the actual shipping of goods to places out of the city in which you may live. It is also good for dealing with surgeons or for surgical operations, and it is one of the good periods for salesmen, traveling agents, and others to solicit and sell, and for dealing especially with women. It is a period in which the ambitions may be highly aroused, and while these ambitions may be very impulsive, they will generally prove fruitful. It is not a good period for commencing any new undertaking, the buying of livestock, the making of contracts, or the signing of legal papers of any kind, or starting lawsuits or court actions. It is not a good period in which to borrow money or attempt to borrow it, nor sign any papers or notes pertaining to money matters, nor speculate, nor take part in games of chance of any kind. It is also a bad period for writing letters, pleas, or requests of any kind asking for important favors or aids in connection with business, personal, or social life."
  },
  "E": {
    "title": "Perseverance, Long Campaigns and Matters before Referees",
    "nature": "Disciplined - Demands Firmness and Strategy",
    "favorable": "Long-term campaigns, legal defenses, strategic patience, and persevering labor.",
    "unfavorable": "Rash actions, irritability, and hasty unconsidered decisions.",
    "letter": "E",
    "description": "This period is particularly good for aggressive pursuits, or those activities that require deep thought followed by a long campaign or a long period of steady action. It is good to begin these things during this period. It is an excellent time to have one’s affairs come before judges, referees, magistrates, police authorities, senators, governors, mayors, or the presidents of large corporations, or those persons who have within their power the privilege to decide or render decisions in any matters of dispute. It is a good period for bringing permanency to anything started or finished during it, and gives great persistency and endurance to all activities. It is also good for literary or newspaper work or advertising, or sales promotion by mail through the use of letters or brief printed communications. It is good, too, for starting any legal action in court, or for the submission of briefs or arguments, and for all inventions or mechanical problems or matters dealing with them, also for matters pertaining to metallurgy, or affairs with metal workers. It is a good time to move into a new house or to buy and sell real estate or to move into or transfer real estate. It is an excellent period for starting or indulging in scientific pursuits, and for spiritual meditation. This period, however, is also unfortunate for certain things, and these are quite definite; it should be noted that the unfortunate things will prove to be unfortunate indeed. They are: The making of contracts or agreements of any kind, other than the purchase of homes; attempting to collect money; the planting of seeds, or starting of farm operations; making new acquaintances for the first time; the hiring of servants, agents, salesmen, or collectors of any class or for any position. The period is also very unfortunate for starting long journeys especially by water; for marriage; the taking of medicine or any method of mental or physical cure; borrowing or loaning money; erecting new buildings; dealing with public officials or prominent persons from whom you seek personal favors or special recognition; starting any risky business; indulging in recreational or social affairs; speculating in business, in the stock market, or otherwise; being operated upon by a surgeon; or for writing letters of an important nature."
  },
  "F": {
    "title": "The Most Fortunate Period of the Day (Great Good Fortune)",
    "nature": "Highly Auspicious for Success and Achievement",
    "favorable": "Launching business, valuable purchases, investments, weddings, happy journeys, and key proposals.",
    "unfavorable": "Wasting this privileged hour in hesitation, inertia, or unnecessary sleep.",
    "letter": "F",
    "description": "This is one of the most fortunate periods in each day. It might be called the lucky period, just as the preceding one is generally considered the unlucky period. During this period of each day, we find conditions are fortunate for the starting of any new undertaking, such as the buying or marketing of cattle or livestock, either in speculation or for actual business purposes; for making contracts or signing contracts, agreements, and all papers of specific stipulation; for collecting accounts or raising money; for educational work and educational interests; or for making new acquaintances. It is also a good period for starting long journeys, either for business or pleasure, and also for short journeys by water and other means, and for literary and newspaper work, or for dealing with lawyers, or the submission of briefs of papers to court, or the actual starting of court procedure. It is also good for marriage or courting, for borrowing money, erecting of new buildings, working out the plans of new undertakings, and holding directors’ meetings for the discussion of business conditions or new ventures, for seeking promotion in business, or the building up of trade and credit reputes, dealing with public officials, or with the public mass in all affairs, or with prominent persons. It is a good time for the buying or selling of real estate, for all social affairs and recreations, for seeking favors and for signing papers dealing with important matters of any nature. It is the fortunate period for all forms of speculation, and for the writing of important letters. There are a few things that should be noticed in regard to this fortunate period, however. It is a period that brings a great deal of energy to the body and mind, and tempts one to overdraw in many ways. And yet with all the impulsiveness of this period it is generally fruitful, and, therefore, fortunate. It is a more fortunate period for men than for women in business affairs, but more fortunate for women than men in social affairs. It is a period of positiveness, and yet with a natural tendency toward caution and prudence. It generally gives and begets the spirit and love of justice, and the period makes for permanency. It is not a good time for hiring servants for any menial position, nor is it good for marine affairs."
  },
  "G": {
    "title": "Physical Stamina, Vigor, Athletics and Overcoming Obstacles",
    "nature": "Energetic, Determined and Physical",
    "favorable": "Heavy physical work, sports, overcoming material barriers, and decisive exertion.",
    "unfavorable": "Delicate diplomatic negotiations demanding subtle tact and gentleness.",
    "letter": "G",
    "description": "This period is especially good for mastering those affairs which require considerable energy and aggressiveness, endurance, and persistency. It is an excellent period for dealing with those matters that require the expenditure of more physical energy than mental energy, and require real labor and muscle. Therefore, all material and sensual affairs will be fortunate during this period, as well as the collecting of money, the hiring of traveling salesmen, agents or collectors, or the soliciting on their part. It is also fortunate for martial affairs, marine affairs, the working out of mechanical problems, inventions, or building plans, or matters dealing with metal and metal workers. It is also good for scientific pursuits. It is not a good period for any beneficent matters, or matters dealing with the receipt of gifts or favors, or public humanitarian activities, nor is this period fraught with much prudence and caution. It is an unfortunate period for the buying of cattle or livestock, or speculating with them, or for dealing with enemies, or for starting long journeys, or for legal actions, or dealings with lawyers or matters in court. Naturally it would be a bad period for marriage or for courting, and for seeking favors generally. It is very questionable whether it is a good period for surgical operations, or for dealing with women. This is the period in which accidents are apt to occur; therefore, one should be careful about being in any place of hazard or being near firearms, fire explosions, or other things that would affect the physical body. In illness, fevers are apt to be high during this time and the temperature of the body is naturally warmer during this period than at any other."
  }
};

  const SOUL_PERIODS_PT = [
  {
    "periodNumber": 1,
    "range": "22 de Março a 12 de Maio",
    "title": "A Alma Pioneira e Altruísta de Liderança",
    "generalMission": "Herança cósmica de uma natureza nobre e elevada, com profundo anseio inato de alcançar posição de honra e estima pública. Espírito pioneiro e realizador.",
    "polarities": {
      "A": {
        "range": "22 de Março a 17 de Abril",
        "type": "Polaridade A - Fogo Dinâmico",
        "traits": "Lutam com tremendo ardor para alcançar o ápice de suas aspirações. Empregam toda a sua energia vital e determinação para liderar, abrir caminhos e governar. Tendência a profissões de comando direto e iniciativa arrojada."
      },
      "B": {
        "range": "17 de Abril a 12 de Maio",
        "type": "Polaridade B - Expressão Refinada",
        "traits": "Buscam o sucesso e a estima através das artes plásticas, elegância de maneiras, educação formal e cultura. São mais gentis, moderados e persuasivos que os da polaridade A, conquistando respeito pelo bom gosto e integridade."
      }
    }
  },
  {
    "periodNumber": 2,
    "range": "13 de Maio a 04 de Julho",
    "title": "A Alma Intelectual, Comunicadora e Pedagógica",
    "generalMission": "Trazem de encarnações passadas memórias de experiências ricas no plano mental e social. Destacam-se no mundo das letras, do ensino e da comunicação de ideias.",
    "polarities": {
      "A": {
        "range": "13 de Maio a 08 de Junho",
        "type": "Polaridade A - Mente Rápida e Habilidade Manual",
        "traits": "Intelecto incrivelmente veloz e adaptável. Destreza tanto mental quanto manual (artesãos, cirurgiões, inventores, corretores e comerciantes). Sabem negociar com precisão e versatilidade."
      },
      "B": {
        "range": "08 de Junho a 04 de Julho",
        "type": "Polaridade B - Iluminação Filosófica e Ensino",
        "traits": "Grandes expoentes no campo da filosofia, docência superior, literatura e educação de massas. Inspiram jovens e estudantes através de conceitos elevados e elevação moral."
      }
    }
  },
  {
    "periodNumber": 3,
    "range": "04 de Julho a 24 de Agosto",
    "title": "A Alma Heroica, Corajosa e Governante",
    "generalMission": "Carregam do passado experiências de superação de grandes provações através da força de vontade, coragem indomável e autodomínio pessoal.",
    "polarities": {
      "A": {
        "range": "04 de Julho a 31 de Julho",
        "type": "Polaridade A - Desbravador e Aventureiro",
        "traits": "Espírito aventureiro nato. Atraídos por expedições, explorações geográficas, aviação, façanhas físicas heróicas e tarefas que exigem destemor absoluto diante do perigo material."
      },
      "B": {
        "range": "31 de Julho a 24 de Agosto",
        "type": "Polaridade B - Autoridade e Alta Governança",
        "traits": "Alcançam posições proeminentes à frente de grandes organizações cívicas, governamentais ou estatais. Possuem magnetismo de comando e senso inato de honra e responsabilidade pública."
      }
    }
  },
  {
    "periodNumber": 4,
    "range": "25 de Agosto a 15 de Outubro",
    "title": "A Alma Artística, Magistrada e Diplomática",
    "generalMission": "Trazem faculdades de elevado refinamento pessoal e poder de persuasão equilibrado, associando beleza artística e clareza de julgamento moral.",
    "polarities": {
      "A": {
        "range": "25 de Agosto a 20 de Setembro",
        "type": "Polaridade A - Mestres de Arte e Cultura",
        "traits": "Professores inspirados de música, belas-artes, harmonia e expressão cultural. Grande presença feminina nobre que enriquece os padrões estéticos da sociedade."
      },
      "B": {
        "range": "20 de Setembro a 15 de Outubro",
        "type": "Polaridade B - Julgamento Lógico e Diplomacia",
        "traits": "Capacidade analítica ímpar para pesar razões contrárias e tomar decisões serenas e justas. Excelentes juristas, juízes, diplomatas e pacificadores de controvérsias humanas."
      }
    }
  },
  {
    "periodNumber": 5,
    "range": "16 de Outubro a 06 de Dezembro",
    "title": "A Alma Tenaz, Construtora e Diplomática",
    "generalMission": "Capacidade de obter alta notoriedade e sucesso consolidado em suas atividades específicas, embora nem sempre ostentem títulos formais.",
    "polarities": {
      "A": {
        "range": "16 de Outubro a 11 de Novembro",
        "type": "Polaridade A - Conquista Comercial e Tenacidade",
        "traits": "Forte combatividade nos negócios. Conquistam posições de destaque no comércio e na indústria por pura tenacidade, vigor de trabalho e audácia calculada."
      },
      "B": {
        "range": "11 de Novembro a 06 de Dezembro",
        "type": "Polaridade B - Diplomacia Pacífica e Conciliação",
        "traits": "Quase o oposto da polaridade A em agressividade externa: são pacíficos, dedicados a pesquisas discretas, aconselhamento confidencial, ciências profundas e harmonia fraterna."
      }
    }
  },
  {
    "periodNumber": 6,
    "range": "07 de Dezembro a 27 de Janeiro",
    "title": "A Alma Compassiva, Benemérita e Reformadora",
    "generalMission": "Trazem uma bênção cósmica conquistada por meio de sacrifícios nobres em vidas passadas. Sensibilidade às dores do mundo e impulso de consolar e instruir.",
    "polarities": {
      "A": {
        "range": "07 de Dezembro a 01 de Janeiro",
        "type": "Polaridade A - Instrutores Espirituais e Benfeitores",
        "traits": "Desejo profundo de ensinar os mais elevados princípios espirituais e estéticos, fundando obras sociais, asilos, irmandades e divulgando preceitos de fraternidade cósmica."
      },
      "B": {
        "range": "01 de Janeiro a 27 de Janeiro",
        "type": "Polaridade B - Discernimento Crítico e Aperfeiçoamento",
        "traits": "Olhar crítico e detalhista que detecta falhas instantaneamente. Usam sua percepção sutil para lapidar métodos, elevar o nível técnico e reformar estruturas imperfeitas."
      }
    }
  },
  {
    "periodNumber": 7,
    "range": "28 de Janeiro a 21 de Março",
    "title": "A Alma Investigadora dos Grandes Mistérios Cósmicos",
    "generalMission": "Destinadas a trabalhos sérios e transcendentais na terra, decifrando enigmas da natureza, da psique humana e das leis ocultas do universo.",
    "polarities": {
      "A": {
        "range": "28 de Janeiro a 23 de Fevereiro",
        "type": "Polaridade A - Pesquisador Oculto e Cientista Notável",
        "traits": "Vocacionados para tarefas profundas e misteriosas: químicos, arqueólogos, criminologistas, historiadores antigos, pesquisadores de ciências ocultas e leis psíquicas."
      },
      "B": {
        "range": "23 de Fevereiro a 21 de Março",
        "type": "Polaridade B - Inspiração Lírica e Alívio da Humanidade",
        "traits": "Buscadores de alegria, música suave, artes teatrais e alívio do fardo humano. Transformam os mistérios solenes em beleza, amizade calorosa e esperança reconfortante."
      }
    }
  }
];
  const SOUL_PERIODS_EN = [
  {
    "periodNumber": 1,
    "range": "March 22 to May 12",
    "title": "The Pioneering and Altruistic Soul of Leadership",
    "generalMission": "THOSE in this period inherit from the Cosmic a very lofty nature, with a deep-seated desire to achieve a high place or a high position in the esteem of the public and in the hearts of their closest acquaintances. They carry over from their previous incarnations the lessons and tribulations which have taught them the necessity for looking above and beyond the commonplace things of life and holding a vision of the highest ideals as their goals. They also carry into this life recollections of the experience of having achieved a notable place or position in life in some foreign land, and having tasted of a full cup with many of the luxurious and beautiful things of earthly existence. Therefore, in this incarnation, no matter in what station socially, racially, or financially they may be, there is always the inner urge to try to live a noble life, or at least one that will be above the commonplace, and that will bring them the respect and perhaps the adoration of the multitude. There is not just the desire for wealth, or the material luxuries of life, although there is a taste for these things slightly beyond the average; but the great desire, the great longing, that actuates these persons in their subjective thinking and planning is the attainment of public renown and approval. For this reason, these persons reluctantly deal with sordid things and constantly struggle against things that are mean, lowly, or objectionable to good taste and high ethical standards. This means that if these persons are starting this incarnation or the lessons of this life in a lowly social or financial position, there is a continual restlessness and dissatisfaction that urges them onward and upward. They always sense the nobility of their last life. They are generally trustworthy, for they have learned in the past that deceit, falsity, underhandedness, and unethical practices hold them back in the progress they wish to make. Their words are generally their bonds, and their aspirations are not dreamy or mystical, but practical, and adhere to a straight line of progress. There is, of course, the natural tendency carried over from the past to want to rule and dominate, and, therefore, be the heads or be the leaders of any plan, organization, or group of interests with which they may be connected, and in such capacities they will succeed because of the other inherent qualities. They are generally careful in the selection of their words, and the use of language in writing, and have commanding personalities when they are allowed to develop properly, and well-developed dramatic faculties. Such persons are usually affable among their peers, with perhaps a slight tendency to be impatient with those who do not aspire to rise, or who may be classed in their subconscious minds as the lowly serfs of a past kingdom. These persons can always be reached and appealed to through suggestions of sumptuousness and magnificence, and whatever may be honorable. They will succeed best in business matters wherein they may be managers, directors, controllers, or overseers, mayors, governors, or any high governmental officers, or holders of important positions in the courts of law. In more humble positions they will succeed as sheriffs, magistrates of small courts, or executive positions of a similar nature. They have an excellent preparation and faculty for the study of law, and in an artistic manner they are fond of metals and working in metals, not as jewelers, but as designers and creators of beautiful and magnificent things of metal. As second choice, they would succeed as designers and creators of magnificent buildings or arrangers of beautiful homes, or the creators of beautiful costumes, and articles of adornment. The physical weakness which they have inherited in this life are affections of the heart and brain, perhaps through overwork mentally, and tendencies toward weakness of the eyes, and toward fevers. They will find joy and recollection of familiar things from the past in traveling in such countries as Chaldea, Phoenicia, Italy, Sicily, Switzerland, and Scotland.",
    "polarities": {
      "A": {
        "range": "March 22 to April 17",
        "type": "Polarity A - Dynamic Fire and Command",
        "traits": "Persons born in the first half of Period No. 1 will be more active in fighting their way to the top of the ladder of their ambitions than those in the B polarity. They will use all of their vital energy and power, and every physical means to achieve leadership and dominating positions, and they will be like warriors in mastering and controlling any situation or any line of work with which they are connected. Their constitutions will be fiery and strong, and their personal magnetism well developed, with excellent speaking voices and commanding style in writing."
      },
      "B": {
        "range": "April 17 to May 12",
        "type": "Polarity B - Refined Expression and Cultural Nobility",
        "traits": "Those born in the last half of Period No. 1 will have greater tendencies to seek the goals of their ambitions in the fine arts or in the more refined and delicate places of life. They will be more genteel than those in the A polarity, if given the opportunity to develop their inherent tendencies, and they will be more subtle, more smiling, and more quiet in their achievements of success than those in the A polarity. Nevertheless, there is the same determination, with an additional characteristic that some may call bull-headedness. These persons will be found associated with art, drama, and music, either as hobbies or as professions if they have the opportunities to allow their natural tendencies to guide them."
      }
    }
  },
  {
    "periodNumber": 2,
    "range": "May 12 to July 3",
    "title": "The Intellectual, Communicative and Pedagogical Soul",
    "generalMission": "Persons born in this period come into this life carrying from the Cosmic and from their last previous incarnations memories of many peculiar experiences and tendencies, characteristics, that make strange combinations. In the first place, they bring into this life from the past a deep-seated desire to travel and move about, or they have been successful and happy in this in a previous life. The continuation in this life in any one place or in any one line of thought, or in any one hobby for a long time spells monotony to these persons, and however they may try outwardly to associate themselves permanently with some place or set of conditions, the inner restlessness causes them to feel uncomfortable and to seek a change. In one of their incarnations they have been not only experienced in journeying, but in exploring, investigating, and in trying to taste all phases of life. Everything that they associate themselves with is of the more delicate, refined, and temperamental nature. They have inherent desires to be well-mannered, thereby expressing tender natures, and the wish to be well-received and well-considered. There is a cosmic desire to search for novelties and the passing pleasures of human life that are wholesome, and yet filled with joy and happiness. Yet there is another equally strong desire, carried over from an old incarnation by each of these persons, to delve occasionally into the sciences and the more practical things of life, and these two desires constitute the strange complex that occasionally manifests itself in the lives of these persons. They are practical, saving, conservative in many ways, and yet their lives are of the present hour always, and they have a tendency to let the future take care of itself because of their faith in the just reward that will come. They prefer to live free of the cares of this life, seeking peace and quiet whenever they are troubled; they are not easily led into quarrels, arguments, or disagreements. They love to spend much time in meditation. In many affairs there is a tendency to be fickle, or we may say that those judging them outwardly would believe this to be so, whereas in truth it is only another form of the expression of the desire for change and for new experiences. They are honest, careful, ethically precise in many ways, and clean and wholesome in character, but are very apt to be misjudged because of their changeable natures. These persons must guard against being led into the company of those who seek only the pleasures of the flesh, for once they are started on a downward path, they become heavy drinkers, and are beggarly, careless, and given to disregard the niceties of life. In the trades and professions, these persons will succeed well as traveling representatives, or persons connected with business affairs that require changes of location, changes of contact, with many branches, and fluctuating interests. There are inherent faculties and abilities which will make them excellent secretaries, designers, artists, saleswomen or salesmen, actors or actresses, concert entertainers, newspaper reporters, or servants in fine homes. A peculiar tendency on the part of these persons is that of marrying persons who will bestow titles upon them or will bring changes of position into their lives. Very often the women marry men who look upon them and treat them as queens or as countesses, and pay continued adoration to them, whereas the men often marry women who are well-to-do, and who look upon their husbands as kings in the homes. Inherited physical weaknesses give a tendency toward troubles with the bladder, and toward rheumatic diseases, colds, and coughs. Often these colds will manifest through disturbance in the stomach or in the feet or eyes. These persons will find joy and interest in traveling through such countries as Norway, Denmark, the Netherlands, and Belgium, where they will contact sights and conditions familiar to them from the past.",
    "polarities": {
      "A": {
        "range": "May 12 to June 8",
        "type": "Polarity A - Quick Mind and Manual Dexterity",
        "traits": "Those born in the first half of Period No. 2 will have very quick intellects, and will be more apt to enter into businesses that permit them to use their minds and fingers rather than all of the muscles of their bodies. In other words, quick minds, quick tongues, and quick hands will serve them usually well, and they are very apt to be employed in two occupations or have two hobbies and interests at the same time, and to give the impression to others that they are almost dual in their manner of living and expressing themselves. They should do everything that is in their power to develop the intellectual and mental side of their lives, because of inherited mental faculties. Persons in this polarity will make themselves known by their intellectual pursuits and will be credited with excellent education and excellent training, even if they have not actually had them in any school or academy."
      },
      "B": {
        "range": "June 8 to July 3",
        "type": "Polarity B - Literary, Scientific and Educational Harmony",
        "traits": "Those born in the last half of Period No. 2 are generally outstanding characters in the intellectual world, for they continually associate themselves with those interests or industries that deal with education, the fine arts, or the law. Their intellectual capabilities are more reserved and must be discovered, and they usually manifest in excellent memories, fine appreciation of language, intuitive senses that enable them to foresee and prophesy or perhaps sense oncoming conditions before anyone else may think of them. They are somewhat more stable in their physical changes of location, although the love of travel and of change of residence causes them to move occasionally. They will vacillate more in their intellectual pursuits and in their reading and studying than in their physical environment, however. These persons are able to serve as secretaries or associates in business to a greater degree than those in any other period or polarity."
      }
    }
  },
  {
    "periodNumber": 3,
    "range": "July 4 to August 25",
    "title": "The Heroic, Courageous and Governing Soul",
    "generalMission": "Persons born in this period carry from the past into this life the experiences of great struggles and achievement through determination and self-mastership. In other words, we have in this period those who are already potentially self-masters and masters of fate. And they have a strong constitution, a fiery, impetuous nature, and the will power and ability to accomplish against great odds, if there is sufficient motive and some encouragement. In addition to this inner nature, which is a part of their soul consciousness, their births during this period have given them from the Cosmic other related faculties and abilities which will enable them to be bold, confident, invisible characters in the achievement of any great purpose. These persons will challenge any obstacles that may arise in their lives, even though outwardly they may not realize that they have been stirred to action or aroused to a fighting spirit by obstacles that others may have looked upon as insurmountable or perhaps insignificant according to their natures. In other words, this is the type of person who can be encouraged and led into action by presenting an obstacle to him, as being one that others have failed to overcome. Naturally these persons are lovers of contest, and seekers of honors in contests, not merely for the aggrandizement, but because of the mastership it will establish. They are apt at times to be boastful of their abilities and in this thing demonstrate a weakness that must be overcome. They never hesitate to risk lives or limbs, or their best interests, to achieve anything that they believe was destined for them to master, whether it is in association with their own personal interests or not. Naturally these persons, if properly placed and properly trained, become great leaders in movements or employments calling for the use of strong will power, strong hands, and strong principles. If allowed to have their own choice in professions, they will most generally succeed as captains or officers in an army, or as leaders in great movements calling for strong, masterful leadership. In more conservative positions they will succeed as surgeons or chemists, or even as carpenters and contractors. They have an inherited inclination and liking, brought over from the past, for the making of small things that are intricate and of a mechanical nature. Therefore, they often are inventive and are successful in such lines as watchmaking, electrical designing, or the making of small mechanical devices of a very important nature. Their physical weaknesses may manifest in the tendency toward diseases of the blood, such as carbuncles, ringworm, eczema, sores of the skin, yellow jaundice, and similar conditions. There is also a tendency toward trouble from gallstones or burning fevers, and these persons should be very careful of their diet, for they are apt to eat highly seasoned foods and too much meat. We will find these per sons attracted to and interested in such places as Lombardy, Bavaria, northern France, and Paris, for there they will recall conditions that seem familiar.",
    "polarities": {
      "A": {
        "range": "July 4 to July 31",
        "type": "Polarity A - Trailblazer, Explorer and Adventurer",
        "traits": "Persons born in the first half of Period No. 3 are very apt to be adventuresome and to travel a great deal seeking adventure and the doing of things that call for the risking of life and limb, and they are, therefore, natural explorers and investigators. If unable to travel considerably, they will explore even in their own immediate country, and be known by their restless desires to delve into the mystery of conditions that baffle the conservative nature of a person who is not so ready to risk his life. These persons make good leaders of armies, or leaders of naval forces, and they are often associated with political or reform movements, for they love conquest and can carry an issue to victory. These persons often lead double lives in many ways, for they will have many interests and two outstanding occupations or methods of applying the faculties of their natures."
      },
      "B": {
        "range": "July 31 to August 24",
        "type": "Polarity B - Authority, Public Magnetism and Governance",
        "traits": "Those born in the last half of Period No. 3 generally succeed in achieving the attainment of some position that places them at the head of some great organization, as in some high political office equivalent to that of a governor, mayor, judge, or president. They are naturally kingly and queenly by all of their instincts and habits, and they love pomp and ceremony, limelight, and adoration and approval of the public. They live their lives in keeping with these desires, and, therefore, carefully guard their weaknesses and those habits which might jeopardize the high positions they seek, or which they attain, for they learned this lesson in a previous life. In any occupation, whether on the stage, in literary work, in business, or in social affairs, the persons in this polarity are leaders or outstanding characters, and the mediocre positions in life will not satisfy them. Children born in this polarity should be given every form of education and training that will enable them to hold high positions with efficiency and with honor to themselves and their parents."
      }
    }
  },
  {
    "periodNumber": 4,
    "range": "August 25 to October 15",
    "title": "The Artistic, Diplomatic and Discerning Soul",
    "generalMission": "Persons born in this period carry into this life from a previous incarnation the attainment of high personal powers, the positions of leadership that have to do with education, the fine arts, and especially the development of civilization, and the best interests of the public. Together with these characteristics, such persons have received from the Cosmic the additional benefits of wonderful faculties for study, and the attainment of knowledge, and the ability to express themselves in words or writing together with very fine memories, the ability to reason logically, and to live a life of estheticism if the opportunity is afforded. These persons are hard to become acquainted with objectively, for their intellectual abilities and knowledge enable them to clothe themselves with the colors of their environment and to meet persons on their own level. We may find these persons in the most humble positions of life, seemingly occupied with pursuits and affairs of a lowly type, and yet we will discover through acquaintanceship that they are truly prepared and trained for higher and better positions then those in which we find them. On the other hand, we may find these persons in the highest positions of the literary world, or at the head of educational institutions where they give more thought to the advancement of humanity than to their own advancement. The cosmic rhythm has created in them a natural desire for learning and for research, and they are very fond of mysteries, whether in fiction or in actuality. These persons also have the tendency to appreciate the power of words and the fine points in law and scientific knowledge. There is a tendency toward searching into the occult and into the secret and arcane wisdom of all ages, as well as into philosophy and religion, but in the latter sense the tendency is toward nonsectarianism and the building up of universal brotherhood and love. These persons are very capable in trade or business, and make excellent merchants because of their ability to read human nature and to understand the desires and wishes of others. For that reason they would make good salesmen or saleswomen, or good instructors of sales forces, or writers and preparers of advertising and sales literature. Their ability to reason logically and to express their ideas with logical arguments makes them qualified for many positions where this natural ability can be used. Very often their abilities lead them into politics, where they succeed well, but not to the same extent that they would in some truly humanitarian profession. These persons have usually acquired considerable advancement in metaphysical and occult illumination in a previous incarnation, and very often they were formerly adepts in one of the arcane brotherhoods, most often the Rosicrucian Order. There is something about their soul personality development and spiritual attainment that makes them truly great masters inwardly, and they are restless and unhappy until they contact in this incarnation that place or point in their soul progress where they left off in the last incarnation. These persons should be guided to the Rosicrucian work or some similar course of study and development at an early age, for that will be the beginning of another phase of rapid progress and development for them. Honor, temperance, and mystical idealism, accompanied by an unusually wonderful imagination, are the keynotes of their real inner characters. We find these persons very often occupied in the present incarnation as literary workers, mathematicians, secretaries, writers, sculptors, poets, orators, school teachers, college professors, bankers, clergymen, or ambassadors. The physical weaknesses, which are subtle physical tendencies of their natures, generally express themselves in so-called vertigoes, dizziness of the head or brain fatigue, accompanied sometimes by a slight degree of stammering or imperfection of enunciation, due to the rapid thinking and the attempt at rapid expression of thought. There may also be a tendency toward hoarseness, dry cough, or colds in the head. These persons will find great joy and happiness in visiting or traveling through such places as Flanders, Egypt, India, and most of all, the southern part of France.",
    "polarities": {
      "A": {
        "range": "August 25 to September 20",
        "type": "Polarity A - Masters of Art, Music and Culture",
        "traits": "Persons born in the first half of Period No. 4 are generally shining lights in the educational and intellectual world. More women than men come into this period and become teachers of music, fine arts, or in a more humble way creators of costumes or workers at fine sewing and other trades or arts requiring nimbleness of finger and hand. On the other hand, the men of this period have a natural tendency toward the spiritual things of life, and would be excellent clergymen or teachers of ethics, philosophy, and morals, if they could express themselves freely and outside of the limitations of sectarianism. Persons in this polarity are generally very genial, good-natured, polished, cultured, and artistically and musically inclined. But this polarity also gives great strength of character and a dominating magnetism that would make them well qualified as physicians and surgeons, or judges and magistrates. Children born in this polarity must be directed very carefully, because the imagination is highly developed and this may create in them imaginary ideas which they will represent as truth and thus fall into the habit of making false statements. They, too, much be guarded against a restlessness of nature, ever seeking the strange and peculiar things of life and ignoring the practical. Overstudy on the part of such children must be guarded against, because the nervous and mental systems will not stand the strain during childhood and early youth."
      },
      "B": {
        "range": "September 20 to October 15",
        "type": "Polarity B - Analytical Logic, Jurisprudence and Diplomacy",
        "traits": "Persons born in the last half of Period No. 4 are particularly well adapted to the use of their mental abilities and logical reasoning in making decisions and in coming to reasonable conclusions. They are well balanced in all of their faculties and have a great desire to balance all their thoughts and all their knowledge. In examining the evidence or the statements on any subject, or in any matter of dispute, they are sure to seek for the balance and to want to establish an equality in all things. The tendency in their lives is to be more or less esthetic, with a great love for the pretty, beautiful, luxurious, nice, and comfortable things of life. They are generally supporters or patrons of the arts and music, as well as drama, and make good artists and writers, especially of happy and fantastic tales with good moral principles involved. These persons are seldom ruffled or upset, and go through life with a tranquility and evenness that is a great help to others as well as themselves. They, therefore, should occupy such positions as enable them to hold conditions in certain bounds, or to direct the lives of children and young people along the lines of peace, harmony, and beauty."
      }
    }
  },
  {
    "periodNumber": 5,
    "range": "October 16 to December 6",
    "title": "The Tenacious, Constructive and Resolute Soul",
    "generalMission": "Persons born in this period are generally those who attain great success and fame in their particular callings, although this success may not always be measured in worldly things or in a financial way. These persons carry over from the past incarnation one lesson which they have learned well, and which becomes the keynote of their inner, secret natures, and that is, that as one gives and does for others, so one attains and succeeds in life. Therefore, these persons are fundamentally generous, good-natured, kindly, and often free in their actions and lives to such an extent that their own success and progress seems to be nil from a material point of view, and for this reason they are often misjudged as failures in life. On the other hand, they do acquire an unusual amount of knowledge, a great deal of culture and polish, an extreme amount of happiness and pleasure, and withal are comfortable and satisfied with their lot in life, even though it may be in poor circumstances or in humble position. In every crisis the Cosmic comes to their rescue and brings about satisfactory conditions. This, however, does not prevent them from seeking greater things and a greater abundance of this life’s blessings. But they are philosophically inclined through the lessons they have learned in the past, and believe that they should give thanks every morning for life itself, and not complain if they have the least of the worldly blessings, for they realize that they have in their knowledge and in their mystical powers a greater asset than most other human beings, and for this they are eternally thankful. These persons also bring into this life from the Cosmic, through the vibrations of the period in which they were born, an unusually philosophical nature, accompanied with the ability to acquire languages and to understand the spiritual and natural laws of the universe to an unusual degree. This makes it simple for them to acquire and master the principle of harmony in art, music, writing, and even in chemistry. Being capable, therefore, of expressing themselves in so many different ways, these persons are really in possession of more hobbies throughout life than those born in any other period. Whenever they seek relaxation or a change from occupation, they can turn their hands to music, to mechanics, to art, or to the sciences, and dabble in any one of these things to a degree that almost borders upon professional expertness. For this reason they may enter into various occupations in their youth and change often as they go through life. They finally settle into positions where their complex abilities can be used, one by one, throughout the weeks and months, and thereby hold unique positions which other persons could not fill. Fundamentally, there is a great love for animals, for outdoor sports, and for nature itself. They are open, frank, honest, and cheerful, and deplore deceit and underhandedness. They have carried over with them a very high degree of mystical development and of religious and spiritual attunement, and are often thrown into deep spells of spiritual meditation that others may look upon as despondency. They seem to sense the sufferings of the world as well as the pleasures of the world. These persons would make excellent directors of organizations, where they are concerned with the scope of larger plans and things of a national or international importance rather than with the smaller details of executive management. They are capable of planning great schemes and carrying them out successfully, and for this reason they may enter the profession of advertisement writing and planning, sales organization work, or the control and management of schools, colleges, and universities. In business methods, however, their generosity, charity, and liberal nature does not bring them personal fortune, nor help to build up the financial end of their plans, but it does bring success in every other direction, which eventually leads to financial success. We are more apt to find these persons in the positions of judges, senators, lawyers, priests, doctors of law, professors in universities, newspaper editors, or magazine editors, or conductors of shops or places of antiques, or dealers in the arcane and mystical things of life. In physical weaknesses the most common manifestation is in connection with inflammation of various parts of the body though colds or overwork, accompanied by conditions of the blood due to overeating or irregular eating, or the eating of rich foods. Skin diseases, rheumatic conditions, quinsy, and apoplexy are general conditions found with these people. These persons will find great joy and happiness in journeying through or visiting Babylon, Persia, Egypt, Palestine, and the strange byways of the Orient where they may come in contact with ancient familiarities, especially in Egypt, China, and Japan.",
    "polarities": {
      "A": {
        "range": "October 16 to November 11",
        "type": "Polarity A - Commercial Triumph and Tenacity",
        "traits": "Persons born in the first half of Period No. 5 are very aggressive in their business affairs because they have a nature that is filled with determination and energy. They do not rise to heights in the same channels as those in the B polarity, because those in the A polarity have a feeling that they must fight their way through life and must be everlastingly at something in order to keep themselves from slipping back into a mediocre position. The aggressiveness of the persons in this polarity leads them into many unique positions and makes them outstanding characters in their ability to accomplish difficult things. They have a tendency, however, toward accidents and toward delays through their own rash exertions. These persons will find themselves best fitted for positions in connection with the government, or as attorneys, occupied daily in arguments and dissensions, fighting for certain principles with considerable success."
      },
      "B": {
        "range": "November 11 to December 6",
        "type": "Polarity B - Peaceful Diplomacy and Discreet Research",
        "traits": "Those born in the last half of Period No. 5 are almost the opposite of those born in the A polarity in regard to aggressiveness. The warlike spirit of their nature is greatly subdued and they would rather stay away from a quarrel or argument than take any part in it. They believe that everything will eventually adjust itself successfully and properly without contention. They are more happy, cheerful, and free in their living than those in the A polarity, and while not seeking positions or labors or problems that call for strenuous physical effort, they do love to tackle problems that call for mystical understanding or intellectual mastership, and careful, logical reasoning for a solution. These persons make very dependable friends, are often leaders of humanitarian movements, and occupy themselves more in helping others than in helping themselves. They enjoy the nice things of life, but always have an inclination to seek places that are covered, secret, or out of the way, and to associate with the persons who are of lowly or humble station and try to help them. On the other hand, these persons live an open, noble life, and constantly try to rise to greatest of mystical heights and become spiritually attuned with the highest forces in the universe. Great masters, great adepts, and those ready for the highest forms of mystical initiation are generally found in this polarity."
      }
    }
  },
  {
    "periodNumber": 6,
    "range": "December 7 to January 27",
    "title": "The Compassionate, Beneficent and Reforming Soul",
    "generalMission": "Those persons born in this period bring with them from the past incarnation a benediction which they have earned through suffering and much trial and pain. This benediction is in the form of a reward, and brings to these persons that happiness, joy, and indulgence in the pleasant things of life which they have not had before, but which they may have had an opportunity to enjoy, but discarded or cast aside in some previous incarnation, and then had to do without for a long time to learn the great lesson. However, being born in this period brings the benediction and blessing of attainment, peace, and attunement with the pleasant, cheerful, lovely things of human life. As they use these pleasures, however, in this incarnation, so will they determine for themselves what their fate will be in their next incarnation. If they abuse the benediction that is theirs this time or cast it lightly aside in any way, it will be denied to them at the close of this incarnation and in a future one. To carry out this benediction, the cosmic vibrations of this period have given them certain faculties and functions which, if developed and applied properly, will bring them the joy and happiness they should have. Therefore, these persons have a natural tendency toward music, toward merriment, amusements, singing, pleasant voice, pleasing disposition, and a cheerful aspect of life. There is a distaste born in them in this incarnation for anything sordid or deceitful, and virtue and honor are constant urges of their present, inner dispositions. For this reason, these people are not usually given to quarrelling or wrangling, nor to viciousness of any kind. Early in childhood and all through life they will show a tendency toward cleanliness in health, cleanliness in habits, and even a conservative attitude toward all indulgences. This makes many of the persons born in this period of the esthetic type, and we may easily recognize most of them by their physical appearance, for they seem to be of the mental temperament, and what one would casually call the artistic or musical type. Seldom are they of very robust build or even of really robust health. Naturally, they tend to become musicians, artists, sculptors, actors, actresses, designers, or teachers of these arts and professions. The men make excellent jewelers, when they are not engaged in music, art, or drama, or dealers in silks and fine dress materials, embroideries, and things of this kind; for while they may go into these lines of business for the money there is in them, the real instinctive reason is their desire to be with and around fine materials and artistic creations. For the same reason they may go into the business of manufacturing and selling perfumes, or works of art, and become engravers or dealers in commodities that are for personal adornment or the decoration of homes. These characters are ones which need sympathy and understanding if one is to become well acquainted with them, and they should never be forced to go into lines of business that deal with mechanics or heavy machinery, or coarse and muscular occupations. They are easily frightened and easily annoyed, and should never be placed as children or young people where there is great disturbance and a lack of quiet and peace. For such persons to be driven into war or into the melee of Wall Street or conditions of this kind is to be forced into an early annihilation of their best faculties and abilities, and to bring about a gradual breaking down of the body leading to early transition. These persons are really the makers of the mirth in life, and are usually the wholesome, sweet characters that we love to idealize. In physical weaknesses, they generally suffer from nervousness due to overstudy or unpleasant environment, or very often from the suppression of natural functions due to an extreme moral viewpoint. In fact, this moral viewpoint may lead some of them to refrain from marriage until late in life, and in this repression they bring about a weakening of the constitution. Most of their physical suffering will be in parts of the body located in the abdomen, and especially in the bladder, kidneys, and bowels. These persons will find great joy and happiness in traveling through or visiting Arabia, parts of Austria, especially around Vienna, along the Mediterranean coast, and England and the New England states of America.",
    "polarities": {
      "A": {
        "range": "December 7 to January 2",
        "type": "Polarity A - Spiritual Teachers, Critics and Benefactors",
        "traits": "Persons born in the first half of Period No. 6 are a little more serious in life than those in Polarity B, for they generally have a tendency to want to teach and promulgate their esthetic ideas and to help establish these things in their own community or nation. For this reason they may become associated with reform movements, or with educational movements, promulgating philosophy and ethics. Very often these persons become critics of the drama or of art and music, for it is their desire to separate the bad from the best in life. Even in all that seems perfect to others they see flaws, and can constructively and helpfully analyze and point out the errors that others do not see. For this reason we find these persons in this polarity occupying very definite positions, generally as critics or teachers of a distinct class or even as judges in competitions, or as readers for magazines and newspapers, where they may pass judgment upon matter that is submitted for use. Their analytical minds enable them to accomplish a great deal of good for humanity, and especially in all of the arts and sciences, where they are more successful as analytical experts than as real developers of any one of the principles involved in any of the sciences and arts."
      },
      "B": {
        "range": "January 2 to January 27",
        "type": "Polarity B - Subtle Discernment and Creative Refinement",
        "traits": "Persons born in the last half of Period No. 6 are critical to an extreme extent, and while they do not allow this criticism to be applied for the benefit of others (for they hesitate to become known as reformers or to be identified with the criticism of matters of any kind), they nevertheless become critical of their own lives and of their own actions. This causes them considerable unrest and often makes them of that type which we call Aquarian. In other words, they often find themselves changing their opinions and doing things hastily and impulsively because of a sudden impression or a sudden critical attitude, and after the act is completed or the words spoken, they again analyze and criticize their actions and wonder why they did or said the things that have passed. These persons also become antiquarians and love to delve into old bookshops, museums, and places of research, for they find pleasure and happiness in analyzing and criticizing, examining and studying the unusual things of life. They make wonderful friends and are good entertainers, for they can talk well and long of unusual experiences and things which they have witnessed or enjoyed in life. There is the ability to build up stories and fictitious pictures and situations which enable them to become excellent writers of plays, dramas, or scenarios. These persons enjoy life in a peculiar way through indulgence in their own unique forms of pleasure, and are often looked upon as being Bohemian, queer, or unusual in life. They are never accused, however, of being peculiar in their mental equipment, or of being irrational in any sense. They are always greatly loved by a large number of friends, and in all parties, entertainments, and associations are far from being wallflowers, or undesirable elements. These persons often attract to themselves an excellent companion for life in either marriage or business, and are really one of the important types making up the complex nature of humanity."
      }
    }
  },
  {
    "periodNumber": 7,
    "range": "January 28 to March 21",
    "title": "The Inquiring Soul of Great Cosmic Mysteries",
    "generalMission": "Those born in this period carry from their previous lives into this one the necessity for accomplishing very serious and important work in connection with the evolution of humanity. They are those who have brought into their lives through their own actions in the last incarnation, the need for learning, first, the serious aspects of life and, second, teaching these things to others through their own living or through their instruction. They are usually those who have gone through a great many incarnations and are highly evolved and experienced in the lessons to be learned from all the experiences that life has to give in many foreign lands. For this reason, early in life these persons as children, or even as little babies, would be called old souls, and considered older than their years. From the Cosmic they have also inherited as a gift the ability to recall much of their past instruction, and most of the experiences they have had in life along with the additional faculty to systematize their knowledge and to acquire readily new knowledge and relate it to that which they have already stored up in the inner consciousness. Therefore, it is not surprising to find that these persons in this period have an unusually deep imagination that seems to be prophetic and capable of imagining things which occurred in great antiquity, or which will occur in the future. They also have the ability to argue, to explain logically, and to present their thoughts and pictures systematically. They are, however, reserved in their utterances and reserved and dignified in all of their actions. They give one the feeling constantly of a person who feels that he or she is being observed and watched and analyzed, and, therefore, must be on guard in connection with every thought and act. In judgment, they are severe because they are strict and careful. Unlike those in the fifth period, they do not allow their hearts to influence their judgments. To these persons the law is the law, and is both merciful and just, and no exceptions and no variations of the law must be allowed because of sentiment. Therefore, being stern and just they are generally greatly honored and respected, and seldom accused of being too severe or unfairly strict. These persons believe that the great things of life are attained through study, and the careful building up of acqui sitions along definite lines. They are extremely systematic, and take advantage of every principle of natural law and of man-made laws to assure themselves of the things they want in life and to protect what they have. They are not mercenary, but on the other hand they are not overly generous. They are, of course, naturally honest and more severe in regard to the exactness of statement and precision of things than those in any of the other periods. For all these reasons, these persons would make excellent judges, magistrates, or heads of large corporations and big business propositions. A peculiar thing, however, is that in moderate circumstances and when born in mediocre positions, they often become employed in connection with such lines as plumbing, bricklaying, plastering, building, gardening, dyeing of cloth, printing, or in one of the other trades or businesses that are usually united in unions or under define wage scales as labor-trades. If these persons only knew that their inherent desire for exactness, precision, and truthfulness could lead them into higher occupations, such as magistrates and judges, they would seek education and training for such positions early in life and succeed well indeed. On the other hand, their firm belief that the benefits of life and the necessities can be acquired only by slow acquisition and the careful attainment of them leads them into occupations that are well established, protected by union laws and government laws, and which seldom fluctuate in hours of employment or in salaries. Thus they hamper their own progress by a false understanding of the principles of life. Many of these persons also become nuns, monks, or members of monastic organizations or bodies, and live secluded lives where they can labor in their definite systematic manner to bring into their lives that which they feel is right. The diseases which are natural to them through the vibrations of their period are impediments of the ears, teeth, or eyes, and sometimes of speech, and such conditions as proceed from colds, such as tuberculosis, and often pneumonia. On the other hand, their excellent constitutions enable them to live to a very old age, and they suffer only from jaundice or dropsy, with occasionally a touch of palsy or apoplexy. These persons are not usually ill until late in life, and are able to fight off many of the ailments that come to others. They will find great joy and pleasure in visiting such countries as Turkey, the Balkan states, Spain, parts of Africa, and South America.",
    "polarities": {
      "A": {
        "range": "January 28 to February 23",
        "type": "Polarity A - Arcane Researcher and Noted Scientist",
        "traits": "Persons born in the first half of Period No. 7 are very often led into occupations that are unusual, such as those of chemical experts, criminologists, investigators, explorers, research workers in ancient history, archeology, geology, and similar subjects. They are easily classified as being profound in knowledge, and devoted to only one, or possibly two, subjects in life. They usually dress in a quiet manner and give the appearance of being much older than they are. They show extreme reserve, a tendency toward orthodox and religious devotion, caring little for the gaieties of life, and seldom patronizing anything that is frivolous or transitory. They are diligent workers, consistent, dependable, careful, and often employed in the same positions or same lines of work throughout their entire lives. These persons are often known as the salt of the earth, and are wonderful friends to those who can make a contact beneath the surface and win their favor. There is a desire to reform the world in certain regards, but these persons are consistent enough to adopt the reform themselves and live the life and set an example."
      },
      "B": {
        "range": "February 23 to March 21",
        "type": "Polarity B - Lyrical Inspiration and Relief of Humanity",
        "traits": "Persons born in the last half of Period No. 7 are quite opposite to those of Polarity A, inasmuch as they are not quite so serious in life and do seek some pleasure and happiness as a relaxation and reaction from their more serious studies and occupations. The persons in this polarity have an unusual tendency toward mysticism, occultism, and the mysterious things of the universe, and of nature. The persons in this polarity seem to acquire more fortune in a material sense than those in Polarity A, and often attain considerable fame in their particular fields of effort. However, they are quite dual in nature, and are capable of living a dual life inasmuch as they may be outwardly at the head of a great organization, or contacting the public in a smiling, happy mood, while at home or in the privacy of their own seclusion they may be quiet, reserved, and more interested in the deep, more serious things of life than one would suspect. These persons have a great magnetic power, which they can exert easily over others, and have a tendency to read easily the minds of other persons and to project their consciousness into space and there sense the thoughts and actions of others. These persons also love to be near the water and love to take long journeys, more for the purpose of studying human nature or studying the history and conditions of the country and place than for pleasure, although they do enjoy being on the water and in cities near it."
      }
    }
  }
];

  const MONTH_NAMES = {
    'pt-BR': [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
    'en-US': [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
  };

  const MONTH_SHORT_NAMES = {
    'pt-BR': ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    'en-US': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  };

  const DAYS_OF_WEEK = {
    'pt-BR': ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
    'en-US': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  };

  function normalizeLang(lang) {
    if (!lang) return 'pt-BR';
    if (lang === 'en-US' || lang === 'en' || lang.startsWith('en')) return 'en-US';
    return 'pt-BR';
  }

  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }

  function addDays(date, days) {
    const res = new Date(date.getTime());
    res.setDate(res.getDate() + days);
    return res;
  }

  function getOrdinalSuffix(num, lang = 'pt-BR') {
    const nLang = normalizeLang(lang);
    if (nLang === 'en-US') {
      const j = num % 10, k = num % 100;
      if (j === 1 && k !== 11) return 'st';
      if (j === 2 && k !== 12) return 'nd';
      if (j === 3 && k !== 13) return 'rd';
      return 'th';
    }
    return 'º';
  }

  function formatDate(date, lang = 'pt-BR', includeYear = true) {
    const nLang = normalizeLang(lang);
    const day = date.getDate();
    const dayPadded = String(day).padStart(2, '0');
    const monthIdx = date.getMonth();
    const year = date.getFullYear();

    if (nLang === 'en-US') {
      const month = MONTH_NAMES['en-US'][monthIdx];
      return includeYear ? `${month} ${dayPadded}, ${year}` : `${month} ${dayPadded}`;
    } else {
      const month = MONTH_NAMES['pt-BR'][monthIdx];
      return includeYear ? `${dayPadded} de ${month} de ${year}` : `${dayPadded} de ${month}`;
    }
  }

  function formatShortDate(date, lang = 'pt-BR', withYear = false) {
    const nLang = normalizeLang(lang);
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const y = date.getFullYear();

    if (nLang === 'en-US') {
      return withYear ? `${m}/${d}/${y}` : `${m}/${d}`;
    } else {
      return withYear ? `${d}/${m}/${y}` : `${d}/${m}`;
    }
  }

  function formatDateRange(pStart, pEnd, lang = 'pt-BR') {
    const nLang = normalizeLang(lang);
    if (nLang === 'en-US') {
      const sm = MONTH_SHORT_NAMES['en-US'][pStart.getMonth()];
      const sd = String(pStart.getDate()).padStart(2, '0');
      const em = MONTH_SHORT_NAMES['en-US'][pEnd.getMonth()];
      const ed = String(pEnd.getDate()).padStart(2, '0');
      return `${sm} ${sd} to ${em} ${ed}`;
    } else {
      return `${formatShortDate(pStart, 'pt-BR')} a ${formatShortDate(pEnd, 'pt-BR')}`;
    }
  }

  function formatFullRange(pStart, pEnd, lang = 'pt-BR') {
    const nLang = normalizeLang(lang);
    if (nLang === 'en-US') {
      return `${formatDate(pStart, 'en-US')} through ${formatDate(pEnd, 'en-US')}`;
    } else {
      return `${formatDate(pStart, 'pt-BR')} até ${formatDate(pEnd, 'pt-BR')}`;
    }
  }

  function calculateAge(birthDate, refDate = new Date()) {
    let age = refDate.getFullYear() - birthDate.getFullYear();
    const m = refDate.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && refDate.getDate() < birthDate.getDate())) {
      age--;
    }
    return Math.max(0, age);
  }

  // =======================================================================================
  // 3. MOTORES DE CÁLCULO DOS CICLOS (LOCALIZADOS)
  // =======================================================================================

  function calculateMajor7YearCycle(birthDate, refDate = new Date(), lang = 'pt-BR') {
    const nLang = normalizeLang(lang);
    const age = calculateAge(birthDate, refDate);
    const periodsList = nLang === 'en-US' ? SEVEN_YEAR_PERIODS_EN : SEVEN_YEAR_PERIODS_PT;
    const periodIndex = Math.min(Math.floor(age / 7), periodsList.length - 1);
    const yearInCurrentPeriod = (age % 7) + 1;
    const cycleData = periodsList[periodIndex];

    const cycleStartAge = Math.floor(age / 7) * 7;
    const cycleEndAge = cycleStartAge + 7;

    let summaryText = '';
    if (nLang === 'en-US') {
      const ySuff = getOrdinalSuffix(yearInCurrentPeriod, 'en-US');
      const pSuff = getOrdinalSuffix(periodIndex + 1, 'en-US');
      summaryText = `Currently ${age} years old, you are in the ${yearInCurrentPeriod}${ySuff} year of your ${periodIndex + 1}${pSuff} Major 7-Year Cycle (${cycleStartAge} to ${cycleEndAge} years).`;
    } else {
      summaryText = `Atualmente com ${age} anos, você está no ${yearInCurrentPeriod}º ano do seu ${periodIndex + 1}º Grande Ciclo de 7 Anos (${cycleStartAge} a ${cycleEndAge} anos).`;
    }

    return {
      currentAge: age,
      periodNumber: periodIndex + 1,
      yearInCycle: yearInCurrentPeriod,
      title: cycleData.title,
      ageRange: cycleData.ageRange,
      description: cycleData.description,
      summaryText: summaryText
    };
  }

  function calculate52DayCycle(startDateInput, refDate = new Date(), lang = 'pt-BR') {
    const nLang = normalizeLang(lang);
    const birthMonth = startDateInput.getMonth();
    const birthDay = startDateInput.getDate();

    let cycleYear = refDate.getFullYear();
    let cycleStart = new Date(cycleYear, birthMonth, birthDay);

    if (refDate < cycleStart) {
      cycleYear--;
      cycleStart = new Date(cycleYear, birthMonth, birthDay);
    }

    const periods = [];
    let currentCursor = new Date(cycleStart.getTime());
    let activePeriodIndex = -1;

    const personalList = nLang === 'en-US' ? YEARLY_PERSONAL_PERIODS_EN : YEARLY_PERSONAL_PERIODS_PT;
    const businessList = nLang === 'en-US' ? BUSINESS_PERIODS_EN : BUSINESS_PERIODS_PT;
    const healthList = nLang === 'en-US' ? HEALTH_PERIODS_EN : HEALTH_PERIODS_PT;

    for (let i = 0; i < 7; i++) {
      const pStart = new Date(currentCursor.getTime());
      let pEnd;
      if (i === 6) {
        pEnd = new Date(cycleYear + 1, birthMonth, birthDay);
        pEnd.setDate(pEnd.getDate() - 1);
      } else {
        pEnd = addDays(pStart, 51);
      }

      currentCursor = addDays(pEnd, 1);

      const refTime = new Date(refDate.getFullYear(), refDate.getMonth(), refDate.getDate()).getTime();
      const sTime = new Date(pStart.getFullYear(), pStart.getMonth(), pStart.getDate()).getTime();
      const eTime = new Date(pEnd.getFullYear(), pEnd.getMonth(), pEnd.getDate()).getTime();

      const isActive = (refTime >= sTime && refTime <= eTime);
      if (isActive) {
        activePeriodIndex = i;
      }

      const pInfo = personalList[i];
      const bInfo = businessList[i];
      const hInfo = healthList[i];

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
        startDateFormatted: formatDate(pStart, nLang),
        endDateFormatted: formatDate(pEnd, nLang),
        rangeFormatted: formatDateRange(pStart, pEnd, nLang),
        fullRangeFormatted: formatFullRange(pStart, pEnd, nLang),
        isActive: isActive,
        totalDays: totalDays,
        daysElapsed: daysElapsed,
        daysRemaining: daysRemaining,
        personal: pInfo,
        business: bInfo,
        health: hInfo
      });
    }

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

  function calculateDailyCycle(date = new Date(), lang = 'pt-BR') {
    const nLang = normalizeLang(lang);
    const dayOfWeek = date.getDay();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const totalMinutes = (hours * 60) + minutes;

    const daysNames = DAYS_OF_WEEK[nLang];
    const lettersForDay = DAILY_CHART_E[dayOfWeek];
    const letterMeanings = nLang === 'en-US' ? DAILY_LETTER_MEANINGS_EN : DAILY_LETTER_MEANINGS_PT;
    const timeSlots = nLang === 'en-US' ? DAILY_TIME_SLOTS_EN : DAILY_TIME_SLOTS_PT;

    let currentSlotIndex = -1;

    const slots = timeSlots.map((slot, idx) => {
      const letter = lettersForDay[idx];
      const meaning = letterMeanings[letter];
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

  function calculateSoulCycle(birthDate, lang = 'pt-BR') {
    const nLang = normalizeLang(lang);
    const m = birthDate.getMonth() + 1;
    const d = birthDate.getDate();

    let periodNumber = 1;
    let polarity = 'A';

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
      periodNumber = 7; polarity = 'B';
    }

    const soulList = nLang === 'en-US' ? SOUL_PERIODS_EN : SOUL_PERIODS_PT;
    const soulData = soulList[periodNumber - 1];
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

  function generateFullReport(userName, birthDate, options = {}) {
    const lang = normalizeLang(options.lang || (typeof window !== 'undefined' && window.CyclesI18n ? window.CyclesI18n.getCurrentLang() : 'pt-BR'));
    const refDate = options.referenceDate || new Date();
    const businessStartDate = options.businessStartDate || null;

    const majorCycle = calculateMajor7YearCycle(birthDate, refDate, lang);
    const personalCycle = calculate52DayCycle(birthDate, refDate, lang);

    const businessBaseDate = businessStartDate ? businessStartDate : birthDate;
    const businessCycle = calculate52DayCycle(businessBaseDate, refDate, lang);

    const dailyCycle = calculateDailyCycle(refDate, lang);
    const soulCycle = calculateSoulCycle(birthDate, lang);

    const defaultName = lang === 'en-US' ? 'Seeker of Light' : 'Buscador da Luz';

    return {
      lang: lang,
      userName: userName || defaultName,
      birthDate: birthDate,
      birthDateFormatted: formatDate(birthDate, lang),
      referenceDate: refDate,
      referenceDateFormatted: formatDate(refDate, lang),
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
    formatDate: formatDate,
    formatShortDate: formatShortDate,
    formatDateRange: formatDateRange,
    formatFullRange: formatFullRange,
    getOrdinalSuffix: getOrdinalSuffix,
    // Acessores dinâmicos por idioma
    getSevenYearPeriods: function (lang) { return normalizeLang(lang) === 'en-US' ? SEVEN_YEAR_PERIODS_EN : SEVEN_YEAR_PERIODS_PT; },
    getYearlyPersonalPeriods: function (lang) { return normalizeLang(lang) === 'en-US' ? YEARLY_PERSONAL_PERIODS_EN : YEARLY_PERSONAL_PERIODS_PT; },
    getBusinessPeriods: function (lang) { return normalizeLang(lang) === 'en-US' ? BUSINESS_PERIODS_EN : BUSINESS_PERIODS_PT; },
    getHealthPeriods: function (lang) { return normalizeLang(lang) === 'en-US' ? HEALTH_PERIODS_EN : HEALTH_PERIODS_PT; },
    getDailyLetterMeanings: function (lang) { return normalizeLang(lang) === 'en-US' ? DAILY_LETTER_MEANINGS_EN : DAILY_LETTER_MEANINGS_PT; },
    getSoulPeriods: function (lang) { return normalizeLang(lang) === 'en-US' ? SOUL_PERIODS_EN : SOUL_PERIODS_PT; },
    // Propriedades clássicas (mantidas para compatibilidade retroativa)
    DAILY_LETTER_MEANINGS: DAILY_LETTER_MEANINGS_PT,
    SOUL_PERIODS: SOUL_PERIODS_PT,
    SEVEN_YEAR_PERIODS: SEVEN_YEAR_PERIODS_PT,
    YEARLY_PERSONAL_PERIODS: YEARLY_PERSONAL_PERIODS_PT,
    BUSINESS_PERIODS: BUSINESS_PERIODS_PT,
    HEALTH_PERIODS: HEALTH_PERIODS_PT
  };

})();

// Exportação compatível com ambientes Node/Browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CyclesEngine;
}
