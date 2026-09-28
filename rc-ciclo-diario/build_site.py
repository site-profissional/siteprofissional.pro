# -*- coding: utf-8 -*-
"""
Script construtor para o Sistema dos Ciclos Diários de Harvey Spencer Lewis.
Gera a aplicação web completa em index.html.
"""

import os
import json

# Dados completos e fiéis dos períodos A a G conforme capítulos 11, 12 e 13 do livro
PERIODS_DATA = {
    "A": {
        "letter": "A",
        "title": "Ação com Autoridades e Concentração Mental",
        "tagline": "Cooperação Cósmica, Alta Posição, Meditação e Controle de Impulsos",
        "nature": "Período dotado de intensa energia e impulsos ardentes que demandam rigoroso autocontrole. As palavras e atos devem ser governados com vigilância. Não é um momento para começos impulsivos ou novos empreendimentos, mas sim para planejar profundamente, lapidar detalhes e recorrer a pessoas de alta posição social, política ou financeira.",
        "favors": [
            "Concentrar-se ou meditar sobre qualquer plano para desenvolver seus detalhes e estrutura.",
            "Pedir favores a pessoas em posições elevadas (promoção de cargo, poder político ou prestígio social).",
            "Solicitar suspensão ou adiamento de procedimentos legais.",
            "Pedir empréstimos de dinheiro, endosso ou recomendação de propostas a pessoas influentes.",
            "Lidar diretamente com funcionários públicos e autoridades de alto escalão.",
            "Assinatura de testamentos, escrituras, títulos ou transferências de propriedades.",
            "Escrever cartas importantes buscando favores, promoções ou transmitindo alta consideração pessoal/comercial.",
            "Conversar com banqueiros e financistas com o objetivo de construir crédito pessoal ou empresarial.",
            "Apresentações ou discursos públicos destinados a granjear estima, honra e reputação."
        ],
        "avoids": [
            "Iniciar um novo negócio, plano pioneiro ou nova proposta de qualquer espécie.",
            "Assinar contratos operacionais comuns ou novos acordos comerciais de parceria.",
            "Lidar com criminosos, pessoas desonestas ou assuntos malignos (mesmo na condição de advogado ou consultor).",
            "Fazer o primeiro investimento financeiro em um negócio recém-criado.",
            "Emprestar dinheiro a terceiros.",
            "Comprar animais ou gado.",
            "Começar viagens curtas com duração de vários dias.",
            "Assuntos matrimoniais, noivado, namoro ou casamento.",
            "Mudar-se para uma nova localização (residencial ou comercial).",
            "Iniciar a construção de novos edifícios.",
            "Comprar, vender ou alugar imóveis.",
            "Submeter-se a operações cirúrgicas."
        ],
        "keywords": ["Poder Político", "Banqueiros", "Meditação", "Escrituras", "Favores de Chefes", "Testamentos"]
    },
    "B": {
        "letter": "B",
        "title": "Expressão Artística, Harmonia Social e Novos Começos",
        "tagline": "Beleza, Prazer Sensorial, Amizades Sinceras e Fecundidade Abundante",
        "nature": "Período altamente fecundo, versátil e mutável, no qual coisas iniciadas produzem frutos muito mais abundantes do que o esperado. É marcado por impulsos de ordem intelectual, estética e social. Embora não seja propício a grandes ambições austeras, adapta-se com facilidade a múltiplas condições e harmoniza relações humanas.",
        "favors": [
            "Iniciar qualquer novo empreendimento ou colocar novos planos em forma material.",
            "Assuntos relacionados à arte, música, teatro, literatura, estética e embelezamento do lar ou da pessoa.",
            "Comprar animais de qualquer porte e efetuar cobrança de contas em aberto.",
            "Lidar com o público em geral: administração pública, serviços comunitários e solicitação de negócios.",
            "Contratar agentes, cobradores, representantes comerciais viajantes e funcionários para cargos de confiança.",
            "Fazer novos conhecidos sociais (costumam revelar-se dignos de sólida amizade e confiança).",
            "Iniciar viagens curtas (duração de 2 a 3 dias ou inferiores a um mês).",
            "Namoro, casamento e celebrações afetivas.",
            "Emprestar ou tomar dinheiro emprestado (favorável em ambas as direções).",
            "Recreação, funções sociais, recepções e banquetes.",
            "Procurar favores de natureza social ou oportunidades comerciais em círculos de convivência.",
            "Especulação, investimentos de risco calculado e transações de oportunidade.",
            "Tratar com mulheres em assuntos sociais, comerciais ou de parcerias."
        ],
        "avoids": [
            "Contratar funcionários para funções puramente servis, braçais ou subalternas.",
            "Iniciar viagens muito longas (especialmente de trem ou marítimas que distanciem excessivamente de casa).",
            "Trabalhos que exijam ambição inflexível, agressividade fria ou imposição enérgica."
        ],
        "keywords": ["Arte & Música", "Casamento", "Novos Empreendimentos", "Empréstimos", "Especulação", "Viagens Curtas"]
    },
    "C": {
        "letter": "C",
        "title": "Intelecto, Ciências, Comunicação e Assuntos Educacionais",
        "tagline": "Agilidade Mental, Estudos Ocultos, Publicações e Contratos Rápidos",
        "nature": "Período caracterizado por extrema agilidade de raciocínio, eloqüência verbal e rápida absorção de conhecimento. Estimula a investigação intelectual e metafísica, mas não favorece a cautela habitual nem a prudência conservadora. Há tendência a exageros e discursos persuasivos que demandam atenção crítica nas negociações.",
        "favors": [
            "Belas-artes, filosofia, ciências, metafísica e estudos do ocultismo (compreensão objetiva de grandes verdades).",
            "Educação, pesquisas científicas, publicações, edição gráfica, impressão e magistério em escolas e universidades.",
            "Estudo concentrado, exercícios de memória, autoexame e assimilação de saberes técnicos especiais.",
            "Análise crítica de documentos, livros, propostas, relatórios e processos.",
            "Elaboração de argumentos jurídicos que dependam de lógica afiada e poder de dialética.",
            "Trabalhos literários e jornalísticos, redação de anúncios e lançamento de campanhas publicitárias.",
            "Celebrar contratos de curta duração (com estipulações imediatas e transitórias).",
            "Cobrança de contas e negociações com clientes resistentes (excelente para visitas difíceis de vendas).",
            "Contratar funcionários comerciais e colaboradores em geral.",
            "Construir novos edifícios ou arquitetar empreendimentos intelectuais.",
            "Tomar medicamentos e iniciar sistemas terapêuticos destinados a revitalizar o corpo físico.",
            "Emprestar dinheiro a outros (com cautela, porém propício ao credor).",
            "Assumir riscos em empreendimentos altamente incertos (apenas se houver reservas financeiras sólidas)."
        ],
        "avoids": [
            "Lidar com inimigos, desafetos ou levá-los a julgamento (gera discussões estéreis sem resolução benéfica).",
            "Casamento e noivado (instabilidade mental e mutabilidade de sentimentos).",
            "Submeter-se a procedimentos cirúrgicos ou consultas com cirurgiões (período muito desfavorável).",
            "Comprar imóveis (desfavorável) e vender imóveis (muito questionável).",
            "Pedir dinheiro emprestado (duvidoso para o devedor).",
            "Pedir favores especiais a autoridades ou reconhecimento público.",
            "Confiar cegamente em promessas verbais (propensão alheia a floreios e declarações exageradas)."
        ],
        "keywords": ["Estudos & Exames", "Publicidade & Mídia", "Pesquisa Científica", "Cobranças", "Medicamentos", "Vendas Difíceis"]
    },
    "D": {
        "letter": "D",
        "title": "Negócios Materiais Gerais e Relações Práticas",
        "tagline": "Comércio Prático, Relações Públicas, Agricultura e Saúde Física",
        "nature": "Período altamente favorável à gestão material cotidiana dos negócios, ao contato direto com a clientela e aos assuntos ligados à terra e aos transportes. Desperta fortes ambições construtivas que, ainda que surjam com arroubos de entusiasmo impulsivo, tendem a manifestar resultados práticos e lucrativos.",
        "favors": [
            "Assuntos materiais cotidianos de empresas, lojas, oficinas e empreendimentos comerciais.",
            "Relacionamento direto e aberto com o público em geral.",
            "Trabalhos educacionais práticos e treinamento de pessoal.",
            "Plantio, semeadura, colheita e operações agropecuárias em fazendas e hortas.",
            "Fazer novos contatos e contratar empregados de todas as funções e categorias.",
            "Iniciar viagens de qualquer distância (especialmente viagens náuticas ou por água).",
            "Trabalhos literários, edição, supervisão editorial e atividade jornalística.",
            "Casamento, namoro e celebrações sentimentais.",
            "Assuntos marítimos, portuários, fretes náuticos e comércio exterior.",
            "Tomar medicamentos ou aplicar terapias físicas e mentais para recuperação da saúde.",
            "Consultar cirurgiões e realizar operações cirúrgicas (um dos melhores períodos do dia).",
            "Estudo e meditação metafísica.",
            "Tratar com transportadoras e despacho de cargas para outras cidades e regiões.",
            "Atividades de vendas ativas e abordagens de agentes comerciais.",
            "Relacionamento comercial ou social proveitoso com mulheres."
        ],
        "avoids": [
            "Iniciar qualquer negócio inteiramente pioneiro ou empreendimento desconhecido.",
            "Fazer contratos formais ou assinar documentos jurídicos vinculantes.",
            "Comprar animais ou negociar gado.",
            "Iniciar processos litigiosos ou processos judiciais em tribunais.",
            "Pedir dinheiro emprestado ou assinar notas promissórias e cheques a prazo.",
            "Especulação financeira de alto risco ou jogos de azar.",
            "Redigir apelos, pedidos ou súplicas buscando favores e socorro institucional."
        ],
        "keywords": ["Cirurgias & Saúde", "Agricultura & Terra", "Vendas Gerais", "Fretes & Viagens", "Casamento", "Público em Geral"]
    },
    "E": {
        "letter": "E",
        "title": "Ação Vigorosa, Persistência e Demandas Judiciais",
        "tagline": "Esforço Prolongado, Autoridades Decisórias, Mecânica e Imóveis",
        "nature": "Período austero, dotado de formidável poder de persistência e resistência inabalável. Ideal para encabeçar campanhas desafiadoras, disputas formais e causas que requeiram esforço contínuo e pensamento estratégico. As iniciativas sedimentadas neste ciclo adquirem um selo de permanência e tenacidade que desafia o tempo.",
        "favors": [
            "Apresentar casos cruciais perante juízes, árbitros, magistrados, prefeitos, governadores ou líderes de corporações.",
            "Iniciar ações judiciais e sustentar debates jurídicos formais nos tribunais.",
            "Conferir durabilidade e caráter permanente a planos e estruturas organizacionais.",
            "Trabalhos literários densos, tratados científicos, artigos jornalísticos e comunicação postal breve.",
            "Desenvolvimento de invenções, resolução de desafios da engenharia mecânica e eletromecânica.",
            "Trabalhos ligados à metalurgia, siderurgia e forja de metais.",
            "Mudar-se para uma nova residência ou sede comercial definitiva.",
            "Comprar, vender ou transferir escrituras de imóveis e terrenos.",
            "Comprar uma casa própria (única exceção contratual amplamente recomendada neste ciclo).",
            "Pesquisas laboratoriais avançadas e investigações científicas profundas.",
            "Meditação espiritual solitária e recolhimento contemplativo."
        ],
        "avoids": [
            "Assinar contratos ou parcerias comerciais gerais (com exceção direta da compra de imóveis residenciais).",
            "Tentar cobrar dinheiro ou exigir liquidação de duplicatas de clientes.",
            "Semear campos ou iniciar plantações agrícolas.",
            "Fazer novos conhecidos (relações iniciadas aqui tendem à frieza e atrito futuro).",
            "Contratar funcionários, representantes ou vendedores.",
            "Iniciar viagens longas (particularmente percursos marítimos ou sobre águas).",
            "Casamento, celebrações conjugais e declarações amorosas.",
            "Tomar medicamentos ou realizar terapias energéticas (pouca receptividade orgânica).",
            "Emprestar ou tomar dinheiro emprestado.",
            "Submeter-se a procedimentos cirúrgicos médicos.",
            "Construir edifícios novos ou lançar pedras fundamentais.",
            "Pedir favores pessoais ou concessões a mandatários e figuras públicas.",
            "Atividades de lazer fútil, festas sociais ou entretenimento descompromissado."
        ],
        "keywords": ["Ações Judiciais", "Comprar Imóveis", "Magistrados & Juízes", "Mecânica & Metais", "Persistência", "Mudança de Casa"]
    },
    "F": {
        "letter": "F",
        "title": "O Ciclo da Fortuna, Expansão e Sucesso Material",
        "tagline": "Um dos Períodos Mais Afortunados do Dia: Prosperidade, Contratos e Alianças",
        "nature": "Considerado pelo autor um dos momentos mais afortunados, férteis e vitoriosos das 24 horas. Imprime entusiasmo radiante, coragem construtiva e discernimento elevado. Inspira senso de justiça e elevação moral. Embora confira impulsividade decorrente do excesso de vitalidade física e mental, suas realizações são amplamente prósperas e duradouras.",
        "favors": [
            "Iniciar qualquer novo empreendimento comercial, projeto pioneiro ou empresa.",
            "Fazer e assinar contratos de relevo, escrituras e documentos contendo cláusulas formais estipuladas.",
            "Comprar, negociar ou comercializar animais com ótimo retorno financeiro.",
            "Cobrar contas atrasadas e levantar capital de investimento.",
            "Avanço em assuntos educacionais, bolsas acadêmicas e fundações de ensino.",
            "Fazer novas amizades e contatos comerciais influentes que gerarão fidelidade mútua.",
            "Iniciar viagens de qualquer modalidade (longas distâncias, lazer ou viagens de negócios).",
            "Tratar com advogados e protocolar petições ou iniciar demandas nos tribunais.",
            "Casamento, pedido de noivado e celebrações de enlace afetivo.",
            "Tomar dinheiro emprestado (as condições de retorno serão suaves e compensadoras).",
            "Lançar a construção de novos edifícios, indústrias e residências.",
            "Realizar reuniões de diretoria, conselhos de acionistas e assembleias estratégicas.",
            "Solicitar promoção de cargo, aumento de remuneração e honrarias funcionais.",
            "Consolidar a reputação mercantil e estabelecer linhas nobres de crédito bancário.",
            "Negociar com autoridades de governo, governantes e grandes líderes da sociedade.",
            "Comprar e vender propriedades imobiliárias com margens altamente lucrativas.",
            "Festas, encontros sociais solenes e recreação sadia.",
            "Investimentos de risco, bolsa de valores e negócios de oportunidade especulativa.",
            "Redigir cartas solenes, propostas comerciais de peso e requerimentos de favores."
        ],
        "avoids": [
            "Contratar colaboradores para funções de serviços subalternos ou puramente servis.",
            "Atividades ligadas estritamente a questões marítimas profundas ou navegação náutica remota.",
            "Excessos físicos ou desgaste além do limite natural do organismo."
        ],
        "keywords": ["Máxima Sorte", "Assinar Contratos", "Pedir Promoção", "Casamento", "Imóveis & Obras", "Reuniões de Diretoria"]
    },
    "G": {
        "letter": "G",
        "title": "Força Física, Conquistas Materiais e Rigor Mecânico",
        "tagline": "Energia Muscular, Invenções, Demandas Militares e Atenção a Riscos",
        "nature": "Período carregado de imensa agressividade cósmica, vigor físico e esforço braçal hercúleo. É soberano para dominar assuntos práticos que dependem de força física ao invés de elucubração sutil da mente. Exige alerta prudente quanto à integridade física: o calor corpóreo sobe, febres se acentuam e a suscetibilidade a choques e acidentes é maior.",
        "favors": [
            "Tarefas materiais e corporais pesadas que exijam força física, músculos e resistência física extrema.",
            "Cobrança enérgica de valores e recebimento direto de dinheiros pendentes.",
            "Contratação e envio de vendedores viajantes e cobradores assertivos para campo.",
            "Assuntos de ordem militar, policiamento ostensivo, armamentos e questões bélicas.",
            "Operações no mar e assuntos da marinha mercante e de defesa.",
            "Resolução prática de problemas mecânicos, máquinas pesadas, motores e projetos de engenharia civil.",
            "Metalurgia pesada, soldas, estruturas de ferro, aço e forjaria.",
            "Pesquisas laboratoriais aplicadas de ciências duras (física e química).",
            "Superação de barreiras materiais que pareciam intransponíveis através da determinação tenaz."
        ],
        "avoids": [
            "Procurar favores, caridade, concessões benevolentes ou presentes.",
            "Envolver-se em causas humanitárias públicas ou filantropia desinteressada.",
            "Ações judiciais, conciliações com advogados e idas a fóruns (tendência a confrontos ríspidos).",
            "Casamento, namoro, galanteios e assuntos sentimentais íntimos.",
            "Tratar com inimigos ou desafetos (risco de agressividade verbal ou física desmedida).",
            "Iniciar viagens longas e extenuantes.",
            "Comprar ou especular na aquisição de animais.",
            "Cirurgias eletivas delicadas ou procedimentos cirúrgicos de precisão.",
            "Locais de risco físico iminente, manipulação de pólvora, armas de fogo, fogo e fontes térmicas intensas."
        ],
        "keywords": ["Força Física", "Engenharia & Motores", "Cobrança Enérgica", "Assuntos Militares", "Metais & Forja", "Atenção a Acidentes"]
    }
}

# Tabela Semanal (Página 105 - Tabela E)
WEEKLY_MATRIX = {
    0: {"name": "Domingo", "periods": ["G", "A", "B", "C", "D", "E", "F"]},
    1: {"name": "Segunda-feira", "periods": ["C", "D", "E", "F", "G", "A", "B"]},
    2: {"name": "Terça-feira", "periods": ["F", "G", "A", "B", "C", "D", "E"]},
    3: {"name": "Quarta-feira", "periods": ["B", "C", "D", "E", "F", "G", "A"]},
    4: {"name": "Quinta-feira", "periods": ["E", "F", "G", "A", "B", "C", "D"]},
    5: {"name": "Sexta-feira", "periods": ["A", "B", "C", "D", "E", "F", "G"]},
    6: {"name": "Sábado", "periods": ["D", "E", "F", "G", "A", "B", "C"]}
}

# Intervalos do livro (24h divididas em 7 períodos)
PERIOD_BOUNDS = [
    {"num": 1, "start": "00:00", "end": "03:25", "start_sec": 0, "end_sec": 12343},
    {"num": 2, "start": "03:25", "end": "06:51", "start_sec": 12343, "end_sec": 24686},
    {"num": 3, "start": "06:51", "end": "10:17", "start_sec": 24686, "end_sec": 37029},
    {"num": 4, "start": "10:17", "end": "13:42", "start_sec": 37029, "end_sec": 49371},
    {"num": 5, "start": "13:42", "end": "17:08", "start_sec": 49371, "end_sec": 61714},
    {"num": 6, "start": "17:08", "end": "20:34", "start_sec": 61714, "end_sec": 74057},
    {"num": 7, "start": "20:34", "end": "00:00", "start_sec": 74057, "end_sec": 86400}
]

print("Dados preparados com sucesso!")
