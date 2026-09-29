/**
 * =========================================================================================
 * CONTROLADOR PRINCIPAL DO APLICATIVO DOS CICLOS DA VIDA
 * Integração da Interface de Usuário, Renderização Dinâmica e Relógio Cósmico em Tempo Real
 * =========================================================================================
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Elementos do DOM
  const form = document.getElementById('cycles-form');
  const inputName = document.getElementById('user-name');
  const inputBirthDate = document.getElementById('birth-date');
  const inputRefDate = document.getElementById('ref-date');
  const btnPrint = document.getElementById('btn-print-report');
  const btnReset = document.getElementById('btn-reset-form');

  // Relógio Diário ao Vivo
  const liveClockEl = document.getElementById('live-clock-time');
  const liveDateEl = document.getElementById('live-clock-date');
  const liveLetterEl = document.getElementById('live-slot-letter');
  const liveTitleEl = document.getElementById('live-slot-title');
  const liveDescEl = document.getElementById('live-slot-desc');

  // Painéis de Conteúdo
  const resultsContainer = document.getElementById('results-section');
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-content');

  // Estado Atual do Usuário
  let currentReport = null;

  // =======================================================================================
  // 1. INICIALIZAÇÃO DE DATAS E RECUPERAÇÃO DE DADOS SALVOS
  // =======================================================================================

  // Configura a data de referência padrão para a data de hoje (formato YYYY-MM-DD)
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  if (inputRefDate) {
    inputRefDate.value = todayStr;
  }

  // Tenta restaurar dados anteriores salvos no navegador (LocalStorage)
  try {
    const savedName = localStorage.getItem('rciclos_user_name');
    const savedBirth = localStorage.getItem('rciclos_user_birth');

    if (savedName) inputName.value = savedName;
    if (savedBirth) inputBirthDate.value = savedBirth;

    // Se já temos nome e data de nascimento salvos, calcula automaticamente
    if (savedBirth) {
      calculateAndRender();
    }
  } catch (err) {
    console.warn('LocalStorage indisponível:', err);
  }

  // =======================================================================================
  // 2. GERENCIAMENTO DE ABAS E NAVEGAÇÃO
  // =======================================================================================

  tabButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const targetId = this.getAttribute('data-tab');

      // Atualiza botões
      tabButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      // Atualiza painéis
      tabPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === targetId) {
          panel.classList.add('active');
        }
      });
    });
  });

  // =======================================================================================
  // 3. RELÓGIO CÓSMICO DIÁRIO EM TEMPO REAL (Opcional se presente no DOM)
  // =======================================================================================

  function updateLiveCosmicClock() {
    if (!liveClockEl) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString('pt-BR', { hour12: false });
    const dateStr = now.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    liveClockEl.textContent = timeStr;
    if (liveDateEl) liveDateEl.textContent = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);

    // Consulta o motor dos ciclos para o período do dia corrente
    const dailyInfo = CyclesEngine.calculateDailyCycle(now);
    const activeSlot = dailyInfo.currentPeriod;

    if (liveLetterEl) liveLetterEl.textContent = activeSlot.letter;
    if (liveTitleEl) liveTitleEl.textContent = `${activeSlot.timeRange} — Letra [ ${activeSlot.letter} ]: ${activeSlot.title}`;
    if (liveDescEl) liveDescEl.textContent = activeSlot.description;
  }

  // Inicia e mantém o relógio apenas se ele estiver presente na página
  if (liveClockEl) {
    updateLiveCosmicClock();
    setInterval(updateLiveCosmicClock, 1000);
  }

  // =======================================================================================
  // 4. SUBMISSÃO DO FORMULÁRIO E PROCESSAMENTO DOS CICLOS
  // =======================================================================================

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    calculateAndRender();
  });

  btnReset.addEventListener('click', function () {
    inputName.value = '';
    inputBirthDate.value = '';
    if (inputRefDate) inputRefDate.value = todayStr;
    try {
      localStorage.removeItem('rciclos_user_name');
      localStorage.removeItem('rciclos_user_birth');
    } catch (e) {}
    resultsContainer.style.display = 'none';
  });

  btnPrint.addEventListener('click', function () {
    window.print();
  });

  function calculateAndRender() {
    const name = inputName.value.trim() || 'Buscador da Luz';
    const birthVal = inputBirthDate.value;

    if (!birthVal) {
      alert('Por favor, informe a Data de Nascimento para calcular os Ciclos.');
      inputBirthDate.focus();
      return;
    }

    // Criação dos objetos Date com compensação de fuso para dia/mês/ano local
    const [bYear, bMonth, bDay] = birthVal.split('-').map(Number);
    const birthDate = new Date(bYear, bMonth - 1, bDay, 12, 0, 0);

    // Data de referência: dinamicamente hoje para frente
    let refDate;
    if (inputRefDate && inputRefDate.value) {
      const [rYear, rMonth, rDay] = inputRefDate.value.split('-').map(Number);
      refDate = new Date(rYear, rMonth - 1, rDay, 12, 0, 0);
    } else {
      const currentNow = new Date();
      refDate = new Date(currentNow.getFullYear(), currentNow.getMonth(), currentNow.getDate(), 12, 0, 0);
    }

    // Salva preferências no navegador
    try {
      localStorage.setItem('rciclos_user_name', name);
      localStorage.setItem('rciclos_user_birth', birthVal);
    } catch (e) {}

    // Geração do relatório consolidado através do CyclesEngine (baseado no aniversário pessoal)
    currentReport = CyclesEngine.generateFullReport(name, birthDate, {
      referenceDate: refDate
    });

    // Renderização dos blocos visuais na página
    renderHeroCard(currentReport);
    renderPersonalYearlyCycle(currentReport);
    renderBusinessCycle(currentReport);
    renderHealthCycle(currentReport);
    renderSoulCycle(currentReport);
    renderSeptennialCycles(currentReport);
    renderFullPrintableReport(currentReport);

    // Torna a seção de resultados visível
    resultsContainer.style.display = 'block';

    // Rola suavemente até os resultados
    resultsContainer.scrollIntoView({ behavior: 'smooth' });
  }

  // =======================================================================================
  // 5. FUNÇÕES DE RENDERIZAÇÃO DOS PAINÉIS
  // =======================================================================================

  /**
   * Renderiza o Cartão Destaque com o resumo do Momento Atual
   */
  function renderHeroCard(report) {
    const el = document.getElementById('hero-card-container');
    const pCycle = report.personalCycle;
    const activeP = pCycle.activePeriod;
    const major = report.majorCycle;
    const soul = report.soulCycle;

    const progressPct = Math.min(100, Math.round((activeP.daysElapsed / activeP.totalDays) * 100));

    el.innerHTML = `
      <div class="hero-current-card">
        <div class="hero-top-info">
          <div class="user-identity">
            <h3>${escapeHtml(report.userName)}</h3>
            <p>Nascimento: <strong>${report.birthDateFormatted}</strong> | Idade: <strong>${major.currentAge} anos</strong> | Consulta: <strong>${report.referenceDateFormatted}</strong></p>
          </div>
          <div class="status-badge-active">
            Sintonia Cósmica Ativa
          </div>
        </div>

        <div class="hero-grid">
          <div class="hero-item">
            <div class="hero-item-label">Ciclo Pessoal Atual (52 Dias)</div>
            <div class="hero-item-val">${activeP.number}º Período: ${activeP.personal.name}</div>
            <div class="hero-item-desc">${activeP.fullRangeFormatted}</div>
            <div class="progress-box">
              <div class="progress-labels">
                <span>Dia ${activeP.daysElapsed} de ${activeP.totalDays}</span>
                <span>Faltam ${activeP.daysRemaining} dias</span>
              </div>
              <div class="progress-track">
                <div class="progress-fill" style="width: ${progressPct}%"></div>
              </div>
            </div>
          </div>

          <div class="hero-item">
            <div class="hero-item-label">Grande Ciclo da Vida (Septênio)</div>
            <div class="hero-item-val">${major.periodNumber}º Ciclo de 7 Anos (${major.ageRange})</div>
            <div class="hero-item-desc">${major.yearInCycle}º ano do septênio: <em>${major.title}</em></div>
          </div>

          <div class="hero-item">
            <div class="hero-item-label">Ciclo da Alma (Missão Solar)</div>
            <div class="hero-item-val">${soul.periodNumber}º Período da Alma (${soul.polarityType})</div>
            <div class="hero-item-desc">${soul.title}</div>
          </div>

          <div class="hero-item">
            <div class="hero-item-label">Ciclo da Saúde e Vitalidade</div>
            <div class="hero-item-val">${activeP.health.name}</div>
            <div class="hero-item-desc">Alerta: ${activeP.health.warning}</div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Renderiza os 7 Períodos do Ciclo Anual (Vida Pessoal - Ciclo 2)
   */
  function renderPersonalYearlyCycle(report) {
    const container = document.getElementById('personal-timeline-container');
    const pCycle = report.personalCycle;

    let html = `
      <div class="section-intro" style="margin-bottom: 24px;">
        <h3 style="font-family: var(--font-serif); color: var(--gold-primary); font-size: 1.4rem;">Ciclo Nº 2: O Ciclo Anual da Vida Pessoal</h3>
        <p style="color: var(--text-secondary); font-size: 0.95rem;">
          Iniciado no seu aniversário (<strong>${report.birthDate.getDate()}/${report.birthDate.getMonth() + 1}</strong>), o seu ano divide-se em 7 períodos contíguos de aproximadamente 52 dias. Cada período carrega energias e oportunidades cósmicas específicas para os seus interesses pessoais.
        </p>
      </div>
      <div class="periods-timeline">
    `;

    pCycle.periods.forEach(p => {
      const activeClass = p.isActive ? 'is-active' : '';
      const pInfo = p.personal;

      html += `
        <div class="period-card ${activeClass}">
          <div class="period-card-header">
            <div class="period-badge-num">${p.number}</div>
            <div class="period-title-group">
              <h4>${p.number}º Período: ${pInfo.name}</h4>
              <span class="dates-tag">${p.fullRangeFormatted} (${p.totalDays} dias)</span>
            </div>
          </div>

          <p class="period-summary">${pInfo.fullText}</p>

          <div class="dos-donts-grid">
            <div class="dos-box">
              <h5>Ações Fomentadas e Auspiciosas</h5>
              <ul>
                ${pInfo.favorable.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
            <div class="donts-box">
              <h5>Ações Desfavoráveis e Advertências</h5>
              <ul>
                ${pInfo.unfavorable.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
      `;
    });

    html += `</div>`;
    container.innerHTML = html;
  }

  /**
   * Renderiza o Ciclo dos Negócios e Empreendimentos (Ciclo 3)
   */
  function renderBusinessCycle(report) {
    const container = document.getElementById('business-timeline-container');
    const bCycle = report.businessCycle;

    let html = `
      <div class="section-intro" style="margin-bottom: 24px;">
        <h3 style="font-family: var(--font-serif); color: var(--gold-primary); font-size: 1.4rem;">Ciclo Nº 3: O Ciclo dos Negócios e Empreendimentos</h3>
        <p style="color: var(--text-secondary); font-size: 0.95rem;">
          Calculado com base no seu <strong>Aniversário Pessoal</strong> (padrão clássico ensinado na obra para negócios individuais, autônomos e empreendimentos).
          Acompanhe os períodos para lançamentos, contratos, expansão de crédito, investimentos e auditorias.
        </p>
      </div>
      <div class="periods-timeline">
    `;

    bCycle.periods.forEach(p => {
      const activeClass = p.isActive ? 'is-active' : '';
      const bInfo = p.business;

      html += `
        <div class="period-card ${activeClass}">
          <div class="period-card-header">
            <div class="period-badge-num">${p.number}</div>
            <div class="period-title-group">
              <h4>${p.number}º Período Comercial: ${bInfo.name}</h4>
              <span class="dates-tag">${p.fullRangeFormatted} | Foco: ${bInfo.focus}</span>
            </div>
          </div>
          <p class="period-summary">${bInfo.description}</p>
        </div>
      `;
    });

    html += `</div>`;
    container.innerHTML = html;
  }

  /**
   * Renderiza o Ciclo da Saúde e Vitalidade (Ciclo 4 e Cap. 10)
   */
  function renderHealthCycle(report) {
    const container = document.getElementById('health-timeline-container');
    const pCycle = report.personalCycle;

    let html = `
      <div class="section-intro" style="margin-bottom: 24px;">
        <h3 style="font-family: var(--font-serif); color: var(--gold-primary); font-size: 1.4rem;">Ciclo Nº 4: O Ciclo da Saúde, Vitalidade e Cura</h3>
        <p style="color: var(--text-secondary); font-size: 0.95rem;">
          O corpo físico responde às ondas rítmicas cósmicas ao longo do ano solar. Conheça as épocas de vigor pleno e os períodos de maior vulnerabilidade biológica para prevenir distúrbios.
        </p>
      </div>
      <div class="periods-timeline">
    `;

    pCycle.periods.forEach(p => {
      const activeClass = p.isActive ? 'is-active' : '';
      const hInfo = p.health;

      html += `
        <div class="period-card ${activeClass}">
          <div class="period-card-header">
            <div class="period-badge-num">${p.number}</div>
            <div class="period-title-group">
              <h4>${p.number}º Período de Saúde: ${hInfo.name}</h4>
              <span class="dates-tag">${p.fullRangeFormatted} | Alerta: ${hInfo.warning}</span>
            </div>
          </div>
          <p class="period-summary">${hInfo.recommendation}</p>
        </div>
      `;
    });

    // Adiciona o ensinamento do Capítulo 10 sobre Doenças e Marés
    html += `
      <div class="hero-item" style="margin-top: 30px; background: rgba(19, 27, 46, 0.9); border: 1px solid var(--gold-border);">
        <h4 style="font-family: var(--font-serif); color: var(--gold-primary); margin-bottom: 10px;">Capítulo 10: As Leis Cósmicas das Enfermidades e Biorritmos</h4>
        <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin-bottom: 12px;">
          <strong>A Lei dos Sete Dias nas Enfermidades:</strong> As crises corporais e os pontos de virada das doenças ocorrem rigorosamente no 7º, 14º, 21º e 28º dia após os primeiros sintomas. O descanso absoluto nestes dias críticos é determinante para a cura.
        </p>
        <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;">
          <strong>Ondas de Maré e Lua:</strong> As 6 horas que antecedem o ponto máximo da maré alta são positivas e de fortalecimento vital. Já as 3 horas imediatamente posteriores à maré alta são de natureza negativa e repouso. No trabalho de parto e cirurgias delicadas, agir durante as unidades positivas minimiza a dor e potenciais complicações.
        </p>
      </div>
    `;

    html += `</div>`;
    container.innerHTML = html;
  }


  /**
   * Renderiza o Ciclo da Alma (Capítulos 14, 15, 16 - Tabela F)
   */
  function renderSoulCycle(report) {
    const container = document.getElementById('soul-cycle-container');
    const soul = report.soulCycle;

    container.innerHTML = `
      <div class="soul-card">
        <div class="soul-header">
          <span class="polarity-tag">${soul.polarityType} (${soul.polarityRange})</span>
          <h3>${soul.periodNumber}º Período da Alma Cósmica: ${soul.title}</h3>
          <p style="color: var(--text-secondary); font-size: 0.9rem;">
            Baseado no Ano Cósmico Solar iniciado no Equinócio da Primavera (22 de Março). Vigência geral do período: <strong>${soul.periodRange}</strong>.
          </p>
        </div>

        <div style="margin-bottom: 22px;">
          <h4 style="color: var(--gold-primary); font-size: 1.1rem; margin-bottom: 8px;">Missão Cósmica e Tendências da Encarnação</h4>
          <p style="color: var(--text-primary); font-size: 0.98rem; line-height: 1.6;">${soul.generalMission}</p>
        </div>

        <div style="background: rgba(10, 14, 23, 0.6); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--gold-border);">
          <h4 style="color: var(--accent-cyan); font-size: 1.05rem; margin-bottom: 8px;">Manifestação Específica da ${soul.polarityType}</h4>
          <p style="color: var(--text-secondary); font-size: 0.92rem; line-height: 1.6;">${soul.polarityTraits}</p>
        </div>
      </div>
    `;
  }

  /**
   * Renderiza os Grandes Ciclos de 7 Anos (Septênios) e o Ciclo de Reencarnação de 144 Anos
   */
  function renderSeptennialCycles(report) {
    const container = document.getElementById('septennial-container');
    const major = report.majorCycle;
    const periods = CyclesEngine.SEVEN_YEAR_PERIODS;

    let html = `
      <div class="section-intro" style="margin-bottom: 24px;">
        <h3 style="font-family: var(--font-serif); color: var(--gold-primary); font-size: 1.4rem;">Os Grandes Ciclos de 7 Anos da Existência (Septênios)</h3>
        <p style="color: var(--text-secondary); font-size: 0.95rem;">
          A vida do ser humano evolui através de oitavas sucessivas de 7 anos. Cada septênio traz transformações biológicas, emocionais, mentais e espirituais bem delimitadas.
        </p>
      </div>
      <div class="septennial-grid">
    `;

    periods.forEach(p => {
      const isActive = p.periodNumber === major.periodNumber;
      const activeClass = isActive ? 'is-active' : '';

      html += `
        <div class="septennial-card ${activeClass}">
          <div class="septennial-badge">${p.periodNumber}º Septênio — ${p.ageRange}</div>
          <h4 style="color: #ffffff; font-size: 1.1rem; margin-bottom: 8px;">${p.title}</h4>
          <p style="color: var(--text-secondary); font-size: 0.88rem; line-height: 1.5;">${p.description}</p>
          ${isActive ? `<p style="margin-top: 10px; font-weight: 700; color: var(--gold-primary); font-size: 0.85rem;">★ Você está vivenciando o ${major.yearInCycle}º ano deste ciclo.</p>` : ''}
        </div>
      `;
    });

    html += `</div>`;

    // Seção de Reencarnação (Capítulo 17)
    html += `
      <div class="hero-item" style="margin-top: 35px; background: rgba(19, 27, 46, 0.9); border: 1px solid var(--gold-border);">
        <h4 style="font-family: var(--font-serif); color: var(--gold-primary); margin-bottom: 12px; font-size: 1.25rem;">
          Capítulo 17: O Grande Ciclo Cósmico de Reencarnação de 144 Anos
        </h4>
        <p style="color: var(--text-primary); font-size: 0.92rem; line-height: 1.6; margin-bottom: 12px;">
          Assim como cada ano da nossa vida se divide em 7 períodos e o ciclo de vida se desdobra em períodos de 7 anos, a totalidade da nossa existência no cosmos é regida por ciclos maiores de aproximadamente <strong>144 anos</strong>.
        </p>
        <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;">
          Neste grande ciclo harmônico, o ser humano passa por fases de atuação no plano físico terrestre (aproximadamente metade do ciclo, ou 72 anos) e fases de assimilação, repouso e iluminação no plano espiritual superior cósmico. A alma humana jamais retrocede: cada encarnação agrega o domínio e a maestria necessários para a perfeição interior.
        </p>
      </div>
    `;

    container.innerHTML = html;
  }

  /**
   * Renderiza o Relatório Editorial Completo pronto para Impressão / PDF
   */
  function renderFullPrintableReport(report) {
    const container = document.getElementById('printable-report-container');
    const pCycle = report.personalCycle;
    const major = report.majorCycle;
    const soul = report.soulCycle;

    container.innerHTML = `
      <div class="printable-doc" style="padding: 20px 0;">
        <div style="border-bottom: 2px solid var(--gold-primary); padding-bottom: 16px; margin-bottom: 24px; text-align: center;">
          <h2 style="font-family: var(--font-serif); color: var(--gold-primary); font-size: 1.8rem; margin-bottom: 6px;">
            RELATÓRIO DOS CICLOS DA VIDA
          </h2>
          <p style="font-size: 0.9rem; color: var(--text-secondary);">
            Baseado fielmente na obra clássica de <em>Harvey Spencer Lewis, F.R.C., Ph.D.</em> — AMORC
          </p>
        </div>

        <div style="background: rgba(19, 27, 46, 0.5); padding: 18px; border-radius: 8px; margin-bottom: 24px;">
          <p><strong>Nome Completo:</strong> ${escapeHtml(report.userName)}</p>
          <p><strong>Data de Nascimento:</strong> ${report.birthDateFormatted}</p>
          <p><strong>Idade na Análise:</strong> ${major.currentAge} anos</p>
          <p><strong>Data de Consulta/Referência:</strong> ${report.referenceDateFormatted}</p>
        </div>

        <h3 style="color: var(--gold-primary); margin: 20px 0 10px; font-family: var(--font-serif);">1. Situação Atual no Ciclo de 52 Dias (Ano Pessoal)</h3>
        <p style="margin-bottom: 12px;"><strong>Período Ativo:</strong> ${pCycle.activePeriod.number}º Período — ${pCycle.activePeriod.personal.name} (${pCycle.activePeriod.fullRangeFormatted})</p>
        <p style="margin-bottom: 20px; line-height: 1.6;">${pCycle.activePeriod.personal.fullText}</p>

        <h3 style="color: var(--gold-primary); margin: 20px 0 10px; font-family: var(--font-serif);">2. Calendário Anual dos Sete Períodos de 52 Dias</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 0.88rem;">
          <thead>
            <tr style="border-bottom: 1px solid var(--gold-primary); text-align: left;">
              <th style="padding: 8px;">Nº</th>
              <th style="padding: 8px;">Período</th>
              <th style="padding: 8px;">Vigência</th>
              <th style="padding: 8px;">Natureza Principal</th>
            </tr>
          </thead>
          <tbody>
            ${pCycle.periods.map(p => `
              <tr style="border-bottom: 1px solid var(--border-subtle); ${p.isActive ? 'background: rgba(212, 175, 55, 0.15); font-weight: bold;' : ''}">
                <td style="padding: 8px;">${p.number}</td>
                <td style="padding: 8px;">${p.personal.name} ${p.isActive ? ' (ATIVO)' : ''}</td>
                <td style="padding: 8px;">${p.rangeFormatted}</td>
                <td style="padding: 8px;">${p.personal.nature}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <h3 style="color: var(--gold-primary); margin: 20px 0 10px; font-family: var(--font-serif);">3. Grande Ciclo de 7 Anos (Septênio Atual)</h3>
        <p style="margin-bottom: 8px;"><strong>${major.periodNumber}º Septênio (${major.ageRange}):</strong> ${major.title}</p>
        <p style="margin-bottom: 20px; line-height: 1.6;">${major.description}</p>

        <h3 style="color: var(--gold-primary); margin: 20px 0 10px; font-family: var(--font-serif);">4. Ciclo da Alma e Polaridade Cósmica (Tabela F)</h3>
        <p style="margin-bottom: 8px;"><strong>${soul.periodNumber}º Período da Alma Cósmica:</strong> ${soul.title} (${soul.periodRange})</p>
        <p style="margin-bottom: 8px;"><strong>Polaridade Específica:</strong> ${soul.polarityType} (${soul.polarityRange})</p>
        <p style="margin-bottom: 20px; line-height: 1.6;">${soul.polarityTraits}</p>

        <h3 style="color: var(--gold-primary); margin: 20px 0 10px; font-family: var(--font-serif);">5. Diretrizes de Negócios e Saúde no Período Ativo (Ciclos Nº 3 e 4)</h3>
        <p style="margin-bottom: 8px;"><strong>Negócios e Finanças (Ciclo 3):</strong> ${pCycle.activePeriod.business.name} — Foco: ${pCycle.activePeriod.business.focus}</p>
        <p style="margin-bottom: 14px; line-height: 1.6;">${pCycle.activePeriod.business.description}</p>
        <p style="margin-bottom: 8px;"><strong>Saúde e Vitalidade (Ciclo 4):</strong> ${pCycle.activePeriod.health.name} — Alerta: ${pCycle.activePeriod.health.warning}</p>
        <p style="margin-bottom: 16px; line-height: 1.6;">${pCycle.activePeriod.health.recommendation}</p>
      </div>
    `;
  }

  // Utilitário para escapar strings no HTML
  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, function (m) {
      switch (m) {
        case '&': return '&amp;';
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '"': return '&quot;';
        case "'": return '&#39;';
        default: return m;
      }
    });
  }

  // Atualiza relatório ao trocar o idioma
  window.addEventListener('rciclos:langchange', function () {
    if (currentReport) {
      calculateAndRender();
    }
  });

});

