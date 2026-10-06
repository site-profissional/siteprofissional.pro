/**
 * =========================================================================================
 * MÓDULO DE INTERNACIONALIZAÇÃO (i18n) - CICLOS DO ANO
 * Suporte completo e bilíngue para Português do Brasil (pt-BR) e Inglês (en-US)
 * Obra: Self-Mastery and Fate with the Cycles of Life - Harvey Spencer Lewis (1929)
 * =========================================================================================
 */

(function () {
  'use strict';

  const TRANSLATIONS = {
    'pt-BR': {
      // Metadados e Títulos
      'page_title': 'Ciclos do Ano • Harvey Spencer Lewis | Autodomínio e Destino com os Ciclos da Vida',
      'brand': 'Ciclos <span>do Ano</span>',
      'nav_daily': 'Ciclo Diário (24 Horas)',
      'nav_annual': 'Ciclos do Ano',
      
      // Cabeçalho Principal
      'header_badge': '✦ Sistema Rosacruz',
      'header_title': 'Ciclos do Ano <span>Harvey Spencer Lewis</span>',
      'header_subtitle': 'Cálculo exato e relatório interpretativo fiel baseado no livro de <strong>Harvey Spencer Lewis, F.R.C., Ph.D.</strong> (Primeiro Imperator da AMORC).',

      // Formulário
      'form_title': '⚖ Inserir Dados para Geração do Relatório Pessoal',
      'form_subtitle': 'Informe o nome e a data de nascimento para calcular todas as oitavas rítmicas ensinadas na obra.',
      'form_name_label': 'Nome',
      'form_name_placeholder': 'Seu Nome Aqui',
      'form_birth_label': 'Data de Nascimento (Obrigatória)',
      'form_birth_placeholder': 'DD/MM/AAAA (ex: 10/09/1980)',
      'form_birth_alert': 'Por favor, informe uma Data de Nascimento válida no formato DD/MM/AAAA (ex: 10/09/1980 ou 10091980).',
      'form_btn_reset': 'Limpar Dados',
      'form_btn_submit': 'Calcular Meus Ciclos da Vida ➔',

      // Abas e Botão de Impressão dos Resultados
      'tab_personal': '🌟 1. Ano Pessoal (52 Dias)',
      'tab_business': '💼 2. Negócios e Finanças',
      'tab_health': '🌿 3. Saúde e Biorritmo',
      'tab_soul': '✨ 4. Ciclo da Alma (Tabela F)',
      'tab_septennial': '🏛 5. Grandes Septênios (7 Anos)',
      'tab_report': '📄 6. Relatório de Impressão',
      'btn_print': '🖨 Imprimir / Salvar em PDF',

      // Hero Card (Momento Presente)
      'hero_birth': 'Nascimento',
      'hero_age': 'Idade',
      'hero_years_old': 'anos',
      'hero_consultation': 'Consulta',
      'hero_tuning_active': 'Sintonia Cósmica Ativa',
      'hero_personal_cycle_label': 'Ciclo Pessoal Atual (52 Dias)',
      'hero_period_label': '{num}º Período',
      'hero_progress_day': 'Dia {elapsed} de {total}',
      'hero_progress_left': 'Faltam {remaining} dias',
      'hero_septennial_label': 'Grande Ciclo da Vida (Septênio)',
      'hero_septennial_val': '{num}º Ciclo de 7 Anos ({range})',
      'hero_septennial_year': '{year}º ano do septênio: <em>{title}</em>',
      'hero_soul_label': 'Ciclo da Alma (Missão Solar)',
      'hero_soul_val': '{num}º Período da Alma ({polarity})',
      'hero_health_label': 'Ciclo da Saúde e Vitalidade',
      'hero_health_alert': 'Alerta: {warning}',

      // Seção 1: Ciclo Anual (52 Dias)
      'cycle2_header_title': 'Ciclo Nº 2: O Ciclo Anual da Vida Pessoal',
      'cycle2_header_desc': 'Iniciado no seu aniversário (<strong>{date}</strong>), o seu ano divide-se em 7 períodos contíguos de aproximadamente 52 dias. Cada período carrega energias e oportunidades cósmicas específicas para os seus interesses pessoais.',
      'card_period_title': '{num}º Período: {name}',
      'card_days_suffix': 'dias',
      'favorable_actions_title': 'Ações Fomentadas e Auspiciosas',
      'unfavorable_actions_title': 'Ações Desfavoráveis e Advertências',

      // Seção 2: Ciclo de Negócios (Ciclo 3)
      'cycle3_header_title': 'Ciclo Nº 3: O Ciclo dos Negócios e Empreendimentos',
      'cycle3_header_desc': 'Calculado com base no seu <strong>Aniversário Pessoal</strong> (padrão clássico ensinado na obra para negócios individuais, autônomos e empreendimentos). Acompanhe os períodos para lançamentos, contratos, expansão de crédito, investimentos e auditorias.',
      'card_business_title': '{num}º Período Comercial: {name}',
      'card_focus_label': 'Foco',

      // Seção 3: Ciclo de Saúde (Ciclo 4)
      'cycle4_header_title': 'Ciclo Nº 4: O Ciclo da Saúde, Vitalidade e Cura',
      'cycle4_header_desc': 'O corpo físico responde às ondas rítmicas cósmicas ao longo do ano solar. Conheça as épocas de vigor pleno e os períodos de maior vulnerabilidade biológica para prevenir distúrbios.',
      'card_health_title': '{num}º Período de Saúde: {name}',
      'card_alert_label': 'Alerta',
      'ch10_title': 'Capítulo 10: As Leis Cósmicas das Enfermidades e Biorritmos',
      'ch10_law_bold': 'A Lei dos Sete Dias nas Enfermidades:',
      'ch10_law_text': 'As crises corporais e os pontos de virada das doenças ocorrem rigorosamente no 7º, 14º, 21º e 28º dia após os primeiros sintomas. O descanso absoluto nestes dias críticos é determinante para a cura.',
      'ch10_tides_bold': 'Ondas de Maré e Lua:',
      'ch10_tides_text': 'As 6 horas que antecedem o ponto máximo da maré alta são positivas e de fortalecimento vital. Já as 3 horas imediatamente posteriores à maré alta são de natureza negativa e repouso. No trabalho de parto e cirurgias delicadas, agir durante as unidades positivas minimiza a dor e potenciais complicações.',

      // Seção 4: Ciclo da Alma
      'soul_header_title': '{num}º Período da Alma Cósmica: {title}',
      'soul_header_desc': 'Baseado no Ano Cósmico Solar iniciado no Equinócio da Primavera (22 de Março). Vigência geral do período: <strong>{range}</strong>.',
      'soul_mission_title': 'Missão Cósmica e Tendências da Encarnação',
      'soul_manifestation_title': 'Manifestação Específica da {polarity}',

      // Seção 5: Septênios e Reencarnação
      'septennial_header_title': 'Os Grandes Ciclos de 7 Anos da Existência (Septênios)',
      'septennial_header_desc': 'A vida do ser humano evolui através de oitavas sucessivas de 7 anos. Cada septênio traz transformações biológicas, emocionais, mentais e espirituais bem delimitadas.',
      'septennial_badge': '{num}º Septênio — {range}',
      'septennial_current_badge': '★ Você está vivenciando o {year}º ano deste ciclo.',
      'ch17_title': 'Capítulo 17: O Grande Ciclo Cósmico de Reencarnação de 144 Anos',
      'ch17_p1': 'Assim como cada ano da nossa vida se divide em 7 períodos e o ciclo de vida se desdobra em períodos de 7 anos, a totalidade da nossa existência no cosmos é regida por ciclos maiores de aproximadamente <strong>144 anos</strong>.',
      'ch17_p2': 'Neste grande ciclo harmônico, o ser humano passa por fases de atuação no plano físico terrestre (aproximadamente metade do ciclo, ou 72 anos) e fases de assimilação, repouso e iluminação no plano espiritual superior cósmico. A alma humana jamais retrocede: cada encarnação agrega o domínio e a maestria necessários para a perfeição interior.',

      // Relatório Editorial de Impressão / PDF
      'print_title': 'RELATÓRIO DOS CICLOS DA VIDA',
      'print_subtitle': 'Baseado na obra clássica de <em>Harvey Spencer Lewis, F.R.C., Ph.D.</em> (Estudo Independente • Obra de 1929)',
      'print_fullname': 'Nome Completo:',
      'print_birth': 'Data de Nascimento:',
      'print_age': 'Idade na Análise:',
      'print_consultation': 'Data de Consulta/Referência:',
      'print_sec1_title': '1. Situação Atual no Ciclo de 52 Dias (Ano Pessoal)',
      'print_active_period': 'Período Ativo:',
      'print_sec2_title': '2. Calendário Anual dos Sete Períodos de 52 Dias',
      'print_table_num': 'Nº',
      'print_table_period': 'Período',
      'print_table_dates': 'Vigência',
      'print_table_nature': 'Natureza Principal',
      'print_table_active_badge': '(ATIVO)',
      'print_sec3_title': '3. Grande Ciclo de 7 Anos (Septênio Atual)',
      'print_sec4_title': '4. Ciclo da Alma e Polaridade Cósmica (Tabela F)',
      'print_sec4_polarity': 'Polaridade Específica:',
      'print_sec5_title': '5. Diretrizes de Negócios e Saúde no Período Ativo (Ciclos Nº 3 e 4)',
      'print_business_label': 'Negócios e Finanças (Ciclo 3):',
      'print_health_label': 'Saúde e Vitalidade (Ciclo 4):',
      'print_focus': 'Foco:',
      'print_alert': 'Alerta:',
      'print_disclaimer_title': '⚖ Aviso Legal & Isenção de Responsabilidade:',
      'print_disclaimer_text': 'Este relatório constitui um estudo pessoal e acadêmico independente fundamentado na obra histórica "Self-Mastery and Fate with the Cycles of Life" (1929) de Harvey Spencer Lewis. Não possui natureza oficial, chancela ou filiação institucional com a Ordem Rosacruz AMORC, GLP ou Suprema Grande Loja. As diretrizes aqui dispostas possuem finalidade exclusivamente reflexiva e educativa, não configurando e não substituindo diagnósticos, prescrições ou tratamentos médicos, nem consultoria financeira, jurídica ou de investimentos.',

      // FAQ / GEO
      'faq_badge': 'Conhecimento Filosófico e Histórico',
      'faq_title': 'Perguntas Frequentes sobre Harvey Spencer Lewis e os Ciclos da Vida',
      'faq_subtitle': 'Esclarecimentos autênticos sobre o sistema de biorritmos cósmicos publicado em 1929 pela Ordem Rosacruz AMORC.',
      'faq_q1': 'Quem foi Harvey Spencer Lewis e qual sua importância histórica?',
      'faq_a1': 'Harvey Spencer Lewis (1883–1939) foi o fundador e primeiro Imperator da Ordem Rosacruz AMORC (Antiga e Mística Ordem Rosae Crucis) para a América. Filósofo, escritor prolífico e místico de renome internacional, Lewis dedicou sua vida ao resgate da sabedoria tradicional, demonstrando a perfeita harmonia entre as leis cósmicas da natureza e a vida prática do ser humano moderno.',
      'faq_q2': 'O que é o livro "Self-Mastery and Fate with the Cycles of Life"?',
      'faq_a2': 'Publicado originalmente em 1929, o clássico "Self-Mastery and Fate with the Cycles of Life" (Autodomínio e Destino com os Ciclos da Vida) apresenta a tese fundamental de que os seres humanos não são vítimas cegas do destino, mas sim navegadores cósmicos. A obra ensina a calcular as marés cósmicas periódicas: o ciclo diário de 24 horas (7 períodos de 3h 25m), o ciclo anual de 52 dias (Ciclo 2), os ciclos empresariais (Ciclo 3), biorritmos de vitalidade e grandes septênios de 7 anos.',
      'faq_q3': 'Como funcionam os Ciclos do Ano divididos em períodos de 52 dias?',
      'faq_a3': 'A cada aniversário natalício, o ano pessoal do indivíduo renova-se e divide-se em sete períodos contíguos de aproximadamente 52 dias e algumas horas (52 dias, 3 horas e 25 minutos). Cada período é regido por uma tendência cósmica particular: períodos propícios a novos começos e liderança (1º), viagens e expansão (2º), vigor físico e superação (3º), expressão intelectual e acordos (4º), sucesso material e consolidação (5º), lazer e celebração (6º) e reflexão ou transição final (7º).',
      'faq_q4': 'Qual a diferença entre os Ciclos Diários e os Ciclos do Ano?',
      'faq_a4': 'Enquanto os Ciclos do Ano (períodos de 52 dias) norteiam grandes projetos, investimentos, cirurgias e planos de médio a longo prazo a partir do aniversário natalício, os Ciclos Diários dividem o dia de 24 horas em 7 períodos exatos de 3 horas, 25 minutos e 43 segundos para orientar decisões cotidianas imediatas, tais como contatos com autoridades, assinaturas, concentração e repouso.',
      'faq_q5': 'Os ciclos ensinados por Harvey Spencer Lewis têm relação com astrologia?',
      'faq_a5': 'Não. Harvey Spencer Lewis enfatiza categoricamente na obra que este sistema não se fundamenta na astrologia convencional nem em mapas astrais. Trata-se de um sistema rítmico, harmônico e matemático baseado em ciclos universais e solares naturais de oitavas e frequências, análogo aos biorritmos e às leis de periodicidade que regem o universo físico e psíquico.',
      'faq_q6': 'Meus dados ficam salvos em algum banco de dados?',
      'faq_a6': 'Não. O sistema não armazena dados pessoais de ninguém em nenhum banco de dados ou servidor. É um sistema 100% estático que executa o cálculo diretamente no seu navegador, gerando o resultado na hora com total privacidade e segurança.',
      'faq_q7': 'Esse mapa tem algum custo?',
      'faq_a7': 'Não, o cálculo e o relatório não têm custo algum. Todo o projeto deste sistema foi feito para gerar valor e auxiliar rosacruzes e buscadores da luz maior a terem seus mapas dos ciclos da vida calculados com a técnica tradicional ensinada pelo querido Harvey Spencer Lewis.',
      'faq_q8': 'Onde encontrar o livro que gerou esse sistema?',
      'faq_a8': 'O livro físico em português ("Autodomínio e Destino com os Ciclos da Vida") pode ser adquirido diretamente no site da AMORC brasileira (<a href="https://www.ordemrosacruz.org.br/br/autodominio-e-o-destino-com-os-ciclos-da-vida-harvey-spencer-lewis" target="_blank" rel="noopener noreferrer">https://www.ordemrosacruz.org.br/br/autodominio-e-o-destino-com-os-ciclos-da-vida-harvey-spencer-lewis</a>). Já a versão clássica em inglês ("Self-Mastery and Fate with the Cycles of Life") pode ser baixada gratuitamente em PDF no site oficial da AMORC americana, através do link disponível no rodapé deste site (<a href="https://www.rosicrucian.org/rosicrucian-books-self-mastery-and-fate-with-the-cycles-of-life" target="_blank" rel="noopener noreferrer">https://www.rosicrucian.org/rosicrucian-books-self-mastery-and-fate-with-the-cycles-of-life</a>).',

      // Rodapé
      'footer_quote': '"Aquele que escolhe com retidão e trabalha em harmonia com a lei torna-se o senhor de seu destino; enquanto aquele que falha em escolher com retidão e opera fora da harmonia com a lei é escravo do fado e vítima de um destino criado inconscientemente."',
      'footer_meta': '— Harvey Spencer Lewis, <em>Autodomínio e Destino com os Ciclos da Vida</em> (Capítulo 2, pág. 24)',
      'footer_copy': 'Baseado na obra literária "Self-Mastery and Fate with the Cycles of Life" por Harvey Spencer Lewis. Tradução e cálculos para fins de estudo e autodomínio pessoal.',
      'footer_source_label': 'Fonte da Obra e Download Gratuito do Livro (em inglês):',
      'footer_source_org': 'Disponibilizado publicamente pela Grande Loja da Jurisdição de Língua Inglesa da Ordem Rosacruz (AMORC):',
      'footer_legal_trigger': '⚖ Aviso Legal, Segurança Jurídica & Termo de Isenção (Estudo Independente)',
      'footer_legal_body': '<h4>1. Natureza do Estudo e Não-Afiliação Institucional:</h4><p>Este site e seus motores de cálculo constituem uma iniciativa acadêmica, filosófica e de pesquisa pessoal estritamente independente, sem fins lucrativos. Não possui nenhum vínculo societário, filiação institucional, representação jurídica, patrocínio ou chancela oficial da Antiga e Mística Ordem Rosae Crucis (AMORC), da Grande Loja da Jurisdição de Língua Portuguesa (GLP) ou da Suprema Grande Loja da AMORC. As denominações "AMORC", "Ordem Rosacruz" e seus respectivos emblemas são marcas registradas de seus legítimos titulares, sendo aqui citadas unicamente a título de referência histórica, bibliográfica e educacional com base na obra clássica de 1929 de Harvey Spencer Lewis.</p><h4>2. Isenção de Responsabilidade Médica (Medical Disclaimer):</h4><p>Os apontamentos contidos nas seções de "Saúde e Vitalidade" fundamentam-se exclusivamente nas concepções rítmicas e filosóficas publicadas em 1929 e possuem propósito unicamente reflexivo, cultural e de autoconhecimento. Este sistema NÃO fornece diagnósticos médicos, NÃO prescreve tratamentos, NÃO realiza prognósticos e NÃO substitui a avaliação, acompanhamento ou orientação de médicos, cirurgiões e demais profissionais de saúde devidamente habilitados. Jamais inicie, altere, adie ou descontinue qualquer procedimento cirúrgico, consulta ou tratamento médico com base nas informações deste estudo.</p><h4>3. Isenção Financeira e Jurídica:</h4><p>As análises relativas ao ciclo de negócios e acordos expressam analogias históricas da obra e não configuram assessoria, parecer jurídico, recomendação contábil ou consultoria de investimentos financeiros.</p><h4>4. Propriedade Intelectual e Obra de Referência:</h4><p>Recomendamos vivamente aos leitores e buscadores a aquisição do livro físico oficial "Autodomínio e Destino com os Ciclos da Vida" editado pela Grande Loja da AMORC Brasil ou o acesso ao acervo disponibilizado pela Grande Loja de Língua Inglesa da AMORC.</p>'
    },
    'en-US': {
      // Metadata and Titles
      'page_title': 'Annual Cycles • Harvey Spencer Lewis | Self-Mastery and Fate with the Cycles of Life',
      'brand': 'Annual <span>Cycles</span>',
      'nav_daily': 'Daily Cycle (24 Hours)',
      'nav_annual': 'Annual Cycles',
      
      // Main Header
      'header_badge': '✦ Rosicrucian System',
      'header_title': 'ANNUAL CYCLES <span>HARVEY SPENCER LEWIS</span>',
      'header_subtitle': 'Exact calculation and faithful interpretive report based on the book by <strong>Harvey Spencer Lewis, F.R.C., Ph.D.</strong> (First Imperator of AMORC).',

      // Form
      'form_title': '⚖ Enter Data for Personal Report Generation',
      'form_subtitle': 'Provide your full name and date of birth to calculate all rhythmic octaves taught in the book.',
      'form_name_label': 'Name',
      'form_name_placeholder': 'Your Name Here',
      'form_birth_label': 'Date of Birth (Required)',
      'form_birth_placeholder': 'MM/DD/YYYY (e.g.: 09/10/1980)',
      'form_birth_alert': 'Please enter a valid Date of Birth in MM/DD/YYYY format (e.g.: 09/10/1980 or 09101980).',
      'form_btn_reset': 'Clear Data',
      'form_btn_submit': 'Calculate My Life Cycles ➔',

      // Tabs and Print Button
      'tab_personal': '🌟 1. Personal Year (52 Days)',
      'tab_business': '💼 2. Business & Finances',
      'tab_health': '🌿 3. Health & Biorhythm',
      'tab_soul': '✨ 4. Soul Cycle (Table F)',
      'tab_septennial': '🏛 5. Major Septennials (7 Years)',
      'tab_report': '📄 6. Printable Report',
      'btn_print': '🖨 Print / Save as PDF',

      // Hero Card (Present Moment)
      'hero_birth': 'Birth',
      'hero_age': 'Age',
      'hero_years_old': 'years old',
      'hero_consultation': 'Consultation',
      'hero_tuning_active': 'Active Cosmic Tuning',
      'hero_personal_cycle_label': 'Current Personal Cycle (52 Days)',
      'hero_period_label': '{num} Period',
      'hero_progress_day': 'Day {elapsed} of {total}',
      'hero_progress_left': '{remaining} days remaining',
      'hero_septennial_label': 'Major Life Cycle (Septennial)',
      'hero_septennial_val': '{num} 7-Year Cycle ({range})',
      'hero_septennial_year': 'Year {year} of septennial: <em>{title}</em>',
      'hero_soul_label': 'Soul Cycle (Solar Mission)',
      'hero_soul_val': '{num} Soul Period ({polarity})',
      'hero_health_label': 'Health & Vitality Cycle',
      'hero_health_alert': 'Alert: {warning}',

      // Section 1: Personal Cycle (52 Days)
      'cycle2_header_title': 'Cycle No. 2: The Yearly Cycle of Personal Life',
      'cycle2_header_desc': 'Beginning on your birthday (<strong>{date}</strong>), your year is divided into 7 contiguous periods of approximately 52 days. Each period carries specific cosmic energies and opportunities for your personal interests.',
      'card_period_title': '{num} Period: {name}',
      'card_days_suffix': 'days',
      'favorable_actions_title': 'Favorable and Auspicious Actions',
      'unfavorable_actions_title': 'Unfavorable Actions and Warnings',

      // Section 2: Business Cycle (Cycle 3)
      'cycle3_header_title': 'Cycle No. 3: Business and Enterprises Cycle',
      'cycle3_header_desc': 'Calculated on the basis of your <strong>Personal Birthday</strong> (the classical standard taught in the book for individual enterprises, self-employed pursuits, and ventures). Track favorable periods for launches, contracts, credit expansion, investments, and auditing.',
      'card_business_title': '{num} Commercial Period: {name}',
      'card_focus_label': 'Focus',

      // Section 3: Health Cycle (Cycle 4)
      'cycle4_header_title': 'Cycle No. 4: Health, Vitality and Healing Cycle',
      'cycle4_header_desc': 'The physical body responds to cosmic rhythmic waves throughout the solar year. Discover times of peak vigor and phases of biological sensitivity to safeguard well-being.',
      'card_health_title': '{num} Health Period: {name}',
      'card_alert_label': 'Alert',
      'ch10_title': 'Chapter 10: The Cosmic Laws of Illness and Biorhythms',
      'ch10_law_bold': 'The Law of Seven Days in Illness:',
      'ch10_law_text': 'Physical crises and turning points in illness occur strictly on the 7th, 14th, 21st, and 28th days after initial symptoms. Complete rest on these critical days is decisive for recovery.',
      'ch10_tides_bold': 'Tidal Waves and the Moon:',
      'ch10_tides_text': 'The 6 hours preceding the peak of high tide are positive and vitality-strengthening. The 3 hours immediately following high tide are negative and meant for rest. In labor and delicate surgery, acting during positive units minimizes pain and complications.',

      // Section 4: Soul Cycle
      'soul_header_title': '{num} Cosmic Soul Period: {title}',
      'soul_header_desc': 'Based on the Solar Cosmic Year beginning at the Vernal Equinox (March 22). General period duration: <strong>{range}</strong>.',
      'soul_mission_title': 'Cosmic Mission and Incarnation Tendencies',
      'soul_manifestation_title': 'Specific Manifestation of {polarity}',

      // Section 5: Septennials and Reincarnation
      'septennial_header_title': 'The Great 7-Year Cycles of Life (Septennials)',
      'septennial_header_desc': 'Human life evolves through successive 7-year harmonic octaves. Each septennial period brings well-defined biological, emotional, mental, and spiritual developments.',
      'septennial_badge': '{num} Septennial — {range}',
      'septennial_current_badge': '★ You are currently experiencing year {year} of this cycle.',
      'ch17_title': 'Chapter 17: The Great Cosmic 144-Year Reincarnation Cycle',
      'ch17_p1': 'Just as each year of our life divides into 7 periods and our life cycle unfolds in 7-year periods, our entire cosmic existence is governed by grand cycles of approximately <strong>144 years</strong>.',
      'ch17_p2': 'In this harmonic cycle, the human soul passes through phases of physical earthly expression (approximately half the cycle, or 72 years) and phases of assimilation, rest, and illumination in the higher cosmic spiritual realm. The human soul never regresses: each incarnation builds greater mastery toward inner perfection.',

      // Editorial Printable Report / PDF
      'print_title': 'REPORT OF LIFE CYCLES',
      'print_subtitle': 'Based on the classical work by <em>Harvey Spencer Lewis, F.R.C., Ph.D.</em> (Independent Study • 1929 Classic)',
      'print_fullname': 'Full Name:',
      'print_birth': 'Date of Birth:',
      'print_age': 'Age at Analysis:',
      'print_consultation': 'Consultation/Reference Date:',
      'print_sec1_title': '1. Current Status in the 52-Day Cycle (Personal Year)',
      'print_active_period': 'Active Period:',
      'print_sec2_title': '2. Annual Calendar of the Seven 52-Day Periods',
      'print_table_num': 'No.',
      'print_table_period': 'Period',
      'print_table_dates': 'Duration',
      'print_table_nature': 'Primary Nature',
      'print_table_active_badge': '(ACTIVE)',
      'print_sec3_title': '3. Major 7-Year Cycle (Current Septennial)',
      'print_sec4_title': '4. Soul Cycle and Cosmic Polarity (Table F)',
      'print_sec4_polarity': 'Specific Polarity:',
      'print_sec5_title': '5. Business and Health Guidelines for the Active Period (Cycles No. 3 & 4)',
      'print_business_label': 'Business & Finances (Cycle 3):',
      'print_health_label': 'Health & Vitality (Cycle 4):',
      'print_focus': 'Focus:',
      'print_alert': 'Alert:',
      'print_disclaimer_title': '⚖ Legal Notice & Disclaimer:',
      'print_disclaimer_text': 'This report represents an independent personal and academic study based on the historical 1929 literature "Self-Mastery and Fate with the Cycles of Life" by Harvey Spencer Lewis. It carries no official status, endorsement, or institutional affiliation with the Rosicrucian Order AMORC, GLP, or Supreme Grand Lodge. Insights provided herein are strictly for reflective and educational study, and do not constitute or replace medical diagnosis, prescription, healthcare treatment, or legal, financial, and investment counseling.',

      // FAQ / GEO
      'faq_badge': 'Philosophical & Historical Knowledge',
      'faq_title': 'Frequently Asked Questions about Harvey Spencer Lewis & Life Cycles',
      'faq_subtitle': 'Authentic insights into the system of cosmic biorhythms published in 1929 by the Rosicrucian Order AMORC.',
      'faq_q1': 'Who was Harvey Spencer Lewis and what was his historical role?',
      'faq_a1': 'Harvey Spencer Lewis (1883–1939) was the founder and first Imperator of the Rosicrucian Order AMORC (Ancient and Mystical Order Rosae Crucis) for the Americas. A philosopher, prolific writer, and mystic of international distinction, Lewis dedicated his career to restoring classical initiatory knowledge, demonstrating the harmonious relationship between cosmic laws of nature and the practical daily life of modern humanity.',
      'faq_q2': 'What is the book "Self-Mastery and Fate with the Cycles of Life"?',
      'faq_a2': 'Originally published in 1929, the masterpiece "Self-Mastery and Fate with the Cycles of Life" sets forth the principle that human beings are not helpless victims of blind fate, but conscious cosmic navigators. The work explains how to calculate recurrent natural rhythms: the 24-hour daily cycle (7 periods of 3h 25m), the 52-day yearly cycle (Cycle 2), enterprise cycles (Cycle 3), health biorhythms, and 7-year life septennials.',
      'faq_q3': 'How do the Annual Cycles work with their 52-day periods?',
      'faq_a3': 'Upon each birthday anniversary, an individual’s personal year begins anew, dividing into seven consecutive periods of approximately 52 days and a few hours (52 days, 3 hours, 25 minutes). Each period is guided by a specific cosmic tendency: leadership and new undertakings (1st), journeys and communications (2nd), physical vigor and overcoming obstacles (3rd), agreements and mental work (4th), material expansion and financial success (5th), social recreation and enjoyment (6th), and critical transition or introspection (7th).',
      'faq_q4': 'What is the distinction between Daily Cycles and Annual Cycles?',
      'faq_a4': 'While Annual Cycles (52-day periods) govern major endeavors, financial investments, surgical procedures, and long-range planning from birthday to birthday, the Daily Cycles divide each 24-hour day into seven exact periods of 3 hours, 25 minutes, and 43 seconds to assist with routine decisions such as dealing with officials, signing documents, mental focus, and rest.',
      'faq_q5': 'Do the cycles of Harvey Spencer Lewis rely on astrology?',
      'faq_a5': 'No. Harvey Spencer Lewis explicitly clarifies in the book that this cosmic system is entirely independent of traditional astrology and horoscopes. It is based upon universal harmonic octaves, mathematical periodicity, and natural biorhythms governing the physical and mental constitution of human beings.',
      'faq_q6': 'Are my personal details saved in any database?',
      'faq_a6': 'No. The system does not store any personal data in external servers or databases. It is a fully static and secure client-side application executed directly within your device browser, generating results instantly in real time.',
      'faq_q7': 'Does this life cycles map have any cost?',
      'faq_a7': 'No, this map is entirely free of charge. This system was designed to provide value and assist Rosicrucian students and sincere seekers of greater light in accessing their personal cycles of life based on the classical teachings of Dr. Harvey Spencer Lewis.',
      'faq_q8': 'Where can I find the book that originated this system?',
      'faq_a8': 'The physical book in Portuguese can be purchased from the Brazilian Grand Lodge (<a href="https://www.ordemrosacruz.org.br/br/autodominio-e-o-destino-com-os-ciclos-da-vida-harvey-spencer-lewis" target="_blank" rel="noopener noreferrer">https://www.ordemrosacruz.org.br/br/autodominio-e-o-destino-com-os-ciclos-da-vida-harvey-spencer-lewis</a>). The original English edition in free PDF format is publicly provided by the English Grand Lodge of AMORC (<a href="https://www.rosicrucian.org/rosicrucian-books-self-mastery-and-fate-with-the-cycles-of-life" target="_blank" rel="noopener noreferrer">https://www.rosicrucian.org/rosicrucian-books-self-mastery-and-fate-with-the-cycles-of-life</a>), with direct link also provided in the footer of this site.',

      // Footer
      'footer_quote': '"He who chooses rightly and works in harmony with the law becomes master of his fate; while he who fails to choose rightly and labors outside of harmony with the law is a slave to fate and a victim of a destiny unconsciously created."',
      'footer_meta': '— Harvey Spencer Lewis, <em>Self-Mastery and Fate with the Cycles of Life</em> (Chapter 2, p. 24)',
      'footer_copy': 'Faithfully based upon the literary classic "Self-Mastery and Fate with the Cycles of Life" by Harvey Spencer Lewis. Calculations and interpretation for personal study and self-mastery.',
      'footer_source_label': 'Official Rosicrucian Source & Free Book Download (English):',
      'footer_source_org': 'Publicly provided by the English Grand Lodge of the Rosicrucian Order (AMORC):',
      'footer_legal_trigger': '⚖ Legal Notice, Legal Protection & General Disclaimer (Independent Study)',
      'footer_legal_body': '<h4>1. Educational Nature & Non-Affiliation Statement:</h4><p>This website and its calculation engines represent an independent, non-profit academic, philosophical, and personal research project. It is NOT affiliated with, sponsored by, endorsed by, or in any way officially connected to the Supreme Grand Lodge of AMORC, the English Grand Lodge for the Americas, or any other Grand Lodge of the Ancient and Mystical Order Rosae Crucis (AMORC). The terms "AMORC", "Rosicrucian Order", and associated logos are registered trademarks of their respective owners and are mentioned herein strictly for historical, bibliographic, and educational identification concerning the 1929 classic literature by Dr. Harvey Spencer Lewis.</p><h4>2. Medical Disclaimer:</h4><p>The insights regarding physical vitality and health periods reflect philosophical and rhythmic concepts published in 1929 and are intended solely for educational, cultural, and self-mastery study. This application does NOT provide medical advice, diagnosis, prognosis, or healthcare treatment, and MUST NOT be construed as a substitute for professional medical care. Never postpone, modify, or disregard medical consultations, surgical operations, or clinical therapies based upon the information generated by this study. Always seek the advice of licensed healthcare physicians.</p><h4>3. Financial & Legal Disclaimer:</h4><p>Guidelines relating to business affairs and contractual undertakings reflect historical philosophical analogies and do NOT constitute financial, legal, tax, or investment advice.</p><h4>4. Source Literature:</h4><p>Seekers are warmly encouraged to acquire the authorized publications from the Rosicrucian Order AMORC or consult the official public reading resources provided by AMORC jurisdictions worldwide.</p>'
    }
  };

  /**
   * Obtém o idioma ativo, considerando query param (?lang=en ou ?lang=pt) e LocalStorage
   */
  function getCurrentLang() {
    try {
      // 1. Verifica parâmetro de URL
      if (typeof window !== 'undefined' && window.location && window.location.search) {
        const params = new URLSearchParams(window.location.search);
        const urlLang = params.get('lang');
        if (urlLang) {
          if (urlLang.toLowerCase().startsWith('en')) {
            return 'en-US';
          }
          if (urlLang.toLowerCase().startsWith('pt')) {
            return 'pt-BR';
          }
        }
      }

      // 2. Verifica LocalStorage
      const saved = localStorage.getItem('rciclos_lang');
      if (saved && (saved === 'en-US' || saved === 'pt-BR')) {
        return saved;
      }
    } catch (e) {}
    return 'pt-BR';
  }

  /**
   * Salva e aplica o idioma ativo
   */
  function setLanguage(lang) {
    if (lang !== 'pt-BR' && lang !== 'en-US') lang = 'pt-BR';
    try {
      localStorage.setItem('rciclos_lang', lang);
      // Atualiza URL de forma limpa sem recarregar a página
      if (typeof window !== 'undefined' && window.history && window.history.replaceState) {
        const url = new URL(window.location);
        url.searchParams.set('lang', lang === 'en-US' ? 'en' : 'pt');
        window.history.replaceState({}, '', url);
      }
    } catch (e) {}

    document.documentElement.lang = lang;
    updateStaticTranslations(lang);
    updateToggleButtons(lang);

    // Notifica os outros módulos da aplicação
    window.dispatchEvent(new CustomEvent('rciclos:langchange', { detail: { lang } }));
  }

  /**
   * Traduz todos os elementos com data-i18n
   */
  function updateStaticTranslations(lang) {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS['pt-BR'];

    // Atualiza título da página
    if (dict['page_title']) {
      document.title = dict['page_title'];
    }

    // Elementos com atributo data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    // Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) {
        el.placeholder = dict[key];
      }
    });
  }

  /**
   * Atualiza a exibição visual do botão de idioma
   */
  function updateToggleButtons(lang) {
    const flagEl = document.getElementById('lang-flag');
    const labelEl = document.getElementById('lang-label');
    const nextEl = document.getElementById('lang-next');

    if (lang === 'en-US') {
      if (flagEl) flagEl.textContent = '🇺🇸';
      if (labelEl) labelEl.textContent = 'EN-US';
      if (nextEl) nextEl.textContent = 'PT';
    } else {
      if (flagEl) flagEl.textContent = '🇧🇷';
      if (labelEl) labelEl.textContent = 'PT-BR';
      if (nextEl) nextEl.textContent = 'EN';
    }
  }

  /**
   * Função de tradução com interpolação de variáveis
   * Ex: t('hero_progress_day', { elapsed: 10, total: 52 })
   */
  function t(key, replacements) {
    const lang = getCurrentLang();
    const dict = TRANSLATIONS[lang] || TRANSLATIONS['pt-BR'];
    let text = dict[key] || (TRANSLATIONS['pt-BR'][key] || key);

    if (replacements && typeof replacements === 'object') {
      Object.keys(replacements).forEach(k => {
        text = text.replace(new RegExp('\\{' + k + '\\}', 'g'), replacements[k]);
      });
    }
    return text;
  }

  /**
   * Inicialização do módulo i18n
   */
  function init() {
    const initialLang = getCurrentLang();
    setLanguage(initialLang);

    // Event listener do botão seletor de idioma
    const btnToggle = document.getElementById('btn-lang-toggle');
    if (btnToggle) {
      btnToggle.addEventListener('click', function () {
        const current = getCurrentLang();
        const next = current === 'pt-BR' ? 'en-US' : 'pt-BR';
        setLanguage(next);
      });
    }
  }

  // Exportação global do i18n
  window.CyclesI18n = {
    init,
    getCurrentLang,
    setLanguage,
    t: t,
    TRANSLATIONS: TRANSLATIONS
  };

  // Inicializa quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
