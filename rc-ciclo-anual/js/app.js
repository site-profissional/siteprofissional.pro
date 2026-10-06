/**
 * =========================================================================================
 * CONTROLADOR PRINCIPAL DO APLICATIVO DOS CICLOS DA VIDA (BILÍNGUE: PT-BR / EN-US)
 * Integração da Interface de Usuário, Renderização Dinâmica e Relatório Editorial
 * =========================================================================================
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Elementos do DOM
  const form = document.getElementById('cycles-form');
  const inputName = document.getElementById('user-name');
  const inputBirthDate = document.getElementById('birth-date');
  const inputRefDate = document.getElementById('ref-date');
  const btnReset = document.getElementById('btn-reset-form');

  // Painéis de Conteúdo
  const resultsContainer = document.getElementById('results-section');

  // Estado Atual do Usuário
  let currentReport = null;
  let currentActiveLang = window.CyclesI18n ? window.CyclesI18n.getCurrentLang() : 'pt-BR';

  // =======================================================================================
  // 1. MÁSCARA AUTOMÁTICA E FACILITADORA PARA DATA DE NASCIMENTO (MOBILE FRIENDLY)
  // Aceita apenas números. Formata dinamicamente:
  // - pt-BR: DD/MM/AAAA
  // - en-US: MM/DD/YYYY
  // =======================================================================================

  if (inputBirthDate) {
    // Formatação em tempo real conforme a digitação
    inputBirthDate.addEventListener('input', function () {
      let digits = this.value.replace(/\D/g, '');
      if (digits.length > 8) {
        digits = digits.slice(0, 8);
      }

      let formatted = '';
      if (digits.length > 4) {
        formatted = digits.slice(0, 2) + '/' + digits.slice(2, 4) + '/' + digits.slice(4);
      } else if (digits.length > 2) {
        formatted = digits.slice(0, 2) + '/' + digits.slice(2);
      } else {
        formatted = digits;
      }

      this.value = formatted;
    });

    // Impede a entrada de qualquer caractere não numérico no teclado físico
    inputBirthDate.addEventListener('keydown', function (e) {
      const allowedKeys = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Enter', 'Home', 'End'];
      if (allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey) {
        return;
      }
      if (!/^[0-9]$/.test(e.key)) {
        e.preventDefault();
      }
    });
  }

  /**
   * Converte e valida a entrada de data conforme o idioma ativo
   * Em pt-BR: DD/MM/AAAA
   * Em en-US: MM/DD/YYYY
   */
  function parseBirthDateInput(val, lang) {
    if (!val) return null;
    const clean = val.replace(/\D/g, '');
    if (clean.length !== 8) return null;

    const nLang = lang || (window.CyclesI18n ? window.CyclesI18n.getCurrentLang() : 'pt-BR');
    let day, month, year;

    if (nLang === 'en-US') {
      // Formato padrão americano: MM/DD/YYYY
      month = parseInt(clean.slice(0, 2), 10);
      day = parseInt(clean.slice(2, 4), 10);
      year = parseInt(clean.slice(4, 8), 10);

      // Auto-correção resiliente: se o usuário digitou dia > 12 primeiro (ex: 25/11/1980)
      if (month > 12 && day <= 12) {
        const temp = month;
        month = day;
        day = temp;
      }
    } else {
      // Formato padrão brasileiro: DD/MM/AAAA
      day = parseInt(clean.slice(0, 2), 10);
      month = parseInt(clean.slice(2, 4), 10);
      year = parseInt(clean.slice(4, 8), 10);

      // Auto-correção resiliente: se o usuário digitou mês invertido (ex: 11/25/1980)
      if (day <= 12 && month > 12) {
        const temp = day;
        day = month;
        month = temp;
      }
    }

    if (month < 1 || month > 12) return null;
    if (day < 1 || day > 31) return null;
    if (year < 1850 || year > 2100) return null;

    const dateObj = new Date(year, month - 1, day, 12, 0, 0);
    if (dateObj.getFullYear() !== year || dateObj.getMonth() !== (month - 1) || dateObj.getDate() !== day) {
      return null;
    }

    return { day, month, year, dateObj };
  }

  // =======================================================================================
  // 2. INICIALIZAÇÃO DE DATAS E RECUPERAÇÃO DE DADOS SALVOS
  // =======================================================================================

  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  if (inputRefDate) {
    inputRefDate.value = todayStr;
  }

  // Tenta restaurar dados anteriores salvos no navegador (LocalStorage)
  try {
    const savedName = localStorage.getItem('rciclos_user_name');
    const savedBirthIso = localStorage.getItem('rciclos_user_birth_iso');
    const savedBirthRaw = localStorage.getItem('rciclos_user_birth');

    if (savedName && inputName) inputName.value = savedName;

    if (inputBirthDate) {
      if (savedBirthIso && /^\d{4}-\d{2}-\d{2}$/.test(savedBirthIso)) {
        const [y, m, d] = savedBirthIso.split('-');
        if (currentActiveLang === 'en-US') {
          inputBirthDate.value = `${m}/${d}/${y}`;
        } else {
          inputBirthDate.value = `${d}/${m}/${y}`;
        }
      } else if (savedBirthRaw) {
        inputBirthDate.value = savedBirthRaw;
      }
    }

    // Se já temos nome e data de nascimento válidos salvos, calcula automaticamente
    if (inputBirthDate && parseBirthDateInput(inputBirthDate.value, currentActiveLang)) {
      calculateAndRender();
    }
  } catch (err) {
    console.warn('LocalStorage indisponível:', err);
  }

  // =======================================================================================
  // 3. EVENTOS DOS BOTÕES DE IMPRESSÃO / SALVAR EM PDF
  // =======================================================================================

  function setupPrintButtons() {
    const printButtons = document.querySelectorAll('.btn-print-dossier, #btn-print-report');
    printButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        window.print();
      });
    });
  }
  setupPrintButtons();

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
      localStorage.removeItem('rciclos_user_birth_iso');
    } catch (e) {}
    resultsContainer.style.display = 'none';
    currentReport = null;
  });

  function calculateAndRender() {
    const activeLang = window.CyclesI18n ? window.CyclesI18n.getCurrentLang() : 'pt-BR';
    const defaultName = activeLang === 'en-US' ? 'Seeker of Light' : 'Buscador da Luz';
    const name = inputName.value.trim() || defaultName;
    const birthVal = inputBirthDate.value.trim();

    const parsedBirth = parseBirthDateInput(birthVal, activeLang);
    if (!parsedBirth) {
      const alertMsg = window.CyclesI18n ? window.CyclesI18n.t('form_birth_alert') : 'Por favor, informe uma Data de Nascimento válida.';
      alert(alertMsg);
      inputBirthDate.focus();
      return;
    }

    const birthDate = parsedBirth.dateObj;

    // Data de referência
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
      const yStr = String(parsedBirth.year).padStart(4, '0');
      const mStr = String(parsedBirth.month).padStart(2, '0');
      const dStr = String(parsedBirth.day).padStart(2, '0');
      localStorage.setItem('rciclos_user_birth_iso', `${yStr}-${mStr}-${dStr}`);
      localStorage.setItem('rciclos_user_birth', inputBirthDate.value);
    } catch (e) {}

    // Geração do relatório consolidado através do CyclesEngine com o idioma ativo
    currentReport = CyclesEngine.generateFullReport(name, birthDate, {
      referenceDate: refDate,
      lang: activeLang
    });

    // Renderização dos blocos visuais na página em fluxo contínuo
    renderHeroCard(currentReport, activeLang);
    renderPersonalYearlyCycle(currentReport, activeLang);
    renderBusinessCycle(currentReport, activeLang);
    renderHealthCycle(currentReport, activeLang);
    renderSoulCycle(currentReport, activeLang);
    renderSeptennialCycles(currentReport, activeLang);
    renderFullPrintableReport(currentReport, activeLang);

    // Torna a seção de resultados visível
    resultsContainer.style.display = 'block';

    // Rola suavemente até os resultados
    resultsContainer.scrollIntoView({ behavior: 'smooth' });
  }

  // =======================================================================================
  // 5. FUNÇÕES DE RENDERIZAÇÃO DOS PAINÉIS (BILÍNGUES E LOCALIZADAS)
  // =======================================================================================

  /**
   * Renderiza o Cartão Destaque com o resumo do Momento Atual
   */
  function renderHeroCard(report, lang) {
    const el = document.getElementById('hero-card-container');
    const t = window.CyclesI18n.t;
    const pCycle = report.personalCycle;
    const activeP = pCycle.activePeriod;
    const major = report.majorCycle;
    const soul = report.soulCycle;

    const progressPct = Math.min(100, Math.round((activeP.daysElapsed / activeP.totalDays) * 100));
    const pSuff = CyclesEngine.getOrdinalSuffix(activeP.number, lang);
    const mSuff = CyclesEngine.getOrdinalSuffix(major.periodNumber, lang);
    const sSuff = CyclesEngine.getOrdinalSuffix(soul.periodNumber, lang);

    el.innerHTML = `
      <div class="hero-current-card">
        <div class="hero-top-info">
          <div class="user-identity">
            <h3>${escapeHtml(report.userName)}</h3>
            <p>${t('hero_birth')}: <strong>${report.birthDateFormatted}</strong> | ${t('hero_age')}: <strong>${major.currentAge} ${t('hero_years_old')}</strong> | ${t('hero_consultation')}: <strong>${report.referenceDateFormatted}</strong></p>
          </div>
          <div class="status-badge-active">
            ${t('hero_tuning_active')}
          </div>
        </div>

        <div class="hero-grid">
          <div class="hero-item">
            <div class="hero-item-label">${t('hero_personal_cycle_label')}</div>
            <div class="hero-item-val">${activeP.number}${pSuff} ${lang === 'en-US' ? 'Period' : 'Período'}: ${activeP.personal.name}</div>
            <div class="hero-item-desc">${activeP.fullRangeFormatted}</div>
            <div class="progress-box">
              <div class="progress-labels">
                <span>${t('hero_progress_day', { elapsed: activeP.daysElapsed, total: activeP.totalDays })}</span>
                <span>${t('hero_progress_left', { remaining: activeP.daysRemaining })}</span>
              </div>
              <div class="progress-track">
                <div class="progress-fill" style="width: ${progressPct}%"></div>
              </div>
            </div>
          </div>

          <div class="hero-item">
            <div class="hero-item-label">${t('hero_septennial_label')}</div>
            <div class="hero-item-val">${t('hero_septennial_val', { num: `${major.periodNumber}${mSuff}`, range: major.ageRange })}</div>
            <div class="hero-item-desc">${t('hero_septennial_year', { year: major.yearInCycle, title: major.title })}</div>
          </div>

          <div class="hero-item">
            <div class="hero-item-label">${t('hero_soul_label')}</div>
            <div class="hero-item-val">${t('hero_soul_val', { num: `${soul.periodNumber}${sSuff}`, polarity: soul.polarityType })}</div>
            <div class="hero-item-desc">${soul.title}</div>
          </div>

          <div class="hero-item">
            <div class="hero-item-label">${t('hero_health_label')}</div>
            <div class="hero-item-val">${activeP.health.name}</div>
            <div class="hero-item-desc">${t('hero_health_alert', { warning: activeP.health.warning })}</div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Renderiza os 7 Períodos do Ciclo Anual (Vida Pessoal - Ciclo 2)
   */
  function renderPersonalYearlyCycle(report, lang) {
    const container = document.getElementById('personal-timeline-container');
    const t = window.CyclesI18n.t;
    const pCycle = report.personalCycle;
    const birthDayFormatted = CyclesEngine.formatShortDate(report.birthDate, lang);

    let html = `
      <div class="section-intro" style="margin-bottom: 24px;">
        <h3 style="font-family: var(--font-serif); color: var(--gold-primary); font-size: 1.4rem;">${t('cycle2_header_title')}</h3>
        <p style="color: var(--text-secondary); font-size: 0.95rem;">
          ${t('cycle2_header_desc', { date: birthDayFormatted })}
        </p>
      </div>
      <div class="periods-timeline">
    `;

    pCycle.periods.forEach(p => {
      const activeClass = p.isActive ? 'is-active' : '';
      const pInfo = p.personal;
      const pSuff = CyclesEngine.getOrdinalSuffix(p.number, lang);

      html += `
        <div class="period-card ${activeClass}">
          <div class="period-card-header">
            <div class="period-badge-num">${p.number}</div>
            <div class="period-title-group">
              <h4>${p.number}${pSuff} ${lang === 'en-US' ? 'Period' : 'Período'}: ${pInfo.name}</h4>
              <span class="dates-tag">${p.fullRangeFormatted} (${p.totalDays} ${t('card_days_suffix')})</span>
            </div>
          </div>

          <p class="period-summary">${pInfo.fullText}</p>

          <div class="dos-donts-grid">
            <div class="dos-box">
              <h5>${t('favorable_actions_title')}</h5>
              <ul>
                ${pInfo.favorable.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
            <div class="donts-box">
              <h5>${t('unfavorable_actions_title')}</h5>
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
  function renderBusinessCycle(report, lang) {
    const container = document.getElementById('business-timeline-container');
    const t = window.CyclesI18n.t;
    const bCycle = report.businessCycle;

    let html = `
      <div class="section-intro" style="margin-bottom: 24px;">
        <h3 style="font-family: var(--font-serif); color: var(--gold-primary); font-size: 1.4rem;">${t('cycle3_header_title')}</h3>
        <p style="color: var(--text-secondary); font-size: 0.95rem;">
          ${t('cycle3_header_desc')}
        </p>
      </div>
      <div class="periods-timeline">
    `;

    bCycle.periods.forEach(p => {
      const activeClass = p.isActive ? 'is-active' : '';
      const bInfo = p.business;
      const pSuff = CyclesEngine.getOrdinalSuffix(p.number, lang);

      html += `
        <div class="period-card ${activeClass}">
          <div class="period-card-header">
            <div class="period-badge-num">${p.number}</div>
            <div class="period-title-group">
              <h4>${p.number}${pSuff} ${lang === 'en-US' ? 'Commercial Period' : 'Período Comercial'}: ${bInfo.name}</h4>
              <span class="dates-tag">${p.fullRangeFormatted} | ${t('card_focus_label')}: ${bInfo.focus}</span>
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
  function renderHealthCycle(report, lang) {
    const container = document.getElementById('health-timeline-container');
    const t = window.CyclesI18n.t;
    const pCycle = report.personalCycle;

    let html = `
      <div class="section-intro" style="margin-bottom: 24px;">
        <h3 style="font-family: var(--font-serif); color: var(--gold-primary); font-size: 1.4rem;">${t('cycle4_header_title')}</h3>
        <p style="color: var(--text-secondary); font-size: 0.95rem;">
          ${t('cycle4_header_desc')}
        </p>
      </div>
      <div class="periods-timeline">
    `;

    pCycle.periods.forEach(p => {
      const activeClass = p.isActive ? 'is-active' : '';
      const hInfo = p.health;
      const pSuff = CyclesEngine.getOrdinalSuffix(p.number, lang);

      html += `
        <div class="period-card ${activeClass}">
          <div class="period-card-header">
            <div class="period-badge-num">${p.number}</div>
            <div class="period-title-group">
              <h4>${p.number}${pSuff} ${lang === 'en-US' ? 'Health Period' : 'Período de Saúde'}: ${hInfo.name}</h4>
              <span class="dates-tag">${p.fullRangeFormatted} | ${t('card_alert_label')}: ${hInfo.warning}</span>
            </div>
          </div>
          <p class="period-summary">${hInfo.recommendation}</p>
        </div>
      `;
    });

    // Adiciona o ensinamento do Capítulo 10 sobre Doenças e Marés
    html += `
      <div class="hero-item" style="margin-top: 30px; background: rgba(19, 27, 46, 0.9); border: 1px solid var(--gold-border);">
        <h4 style="font-family: var(--font-serif); color: var(--gold-primary); margin-bottom: 10px;">${t('ch10_title')}</h4>
        <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin-bottom: 12px;">
          <strong>${t('ch10_law_bold')}</strong> ${t('ch10_law_text')}
        </p>
        <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;">
          <strong>${t('ch10_tides_bold')}</strong> ${t('ch10_tides_text')}
        </p>
      </div>
    `;

    html += `</div>`;
    container.innerHTML = html;
  }

  /**
   * Renderiza o Ciclo da Alma (Capítulos 14, 15, 16 - Tabela F)
   */
  function renderSoulCycle(report, lang) {
    const container = document.getElementById('soul-cycle-container');
    const t = window.CyclesI18n.t;
    const soul = report.soulCycle;
    const sSuff = CyclesEngine.getOrdinalSuffix(soul.periodNumber, lang);

    container.innerHTML = `
      <div class="soul-card">
        <div class="soul-header">
          <span class="polarity-tag">${soul.polarityType} (${soul.polarityRange})</span>
          <h3>${soul.periodNumber}${sSuff} ${lang === 'en-US' ? 'Cosmic Soul Period' : 'Período da Alma Cósmica'}: ${soul.title}</h3>
          <p style="color: var(--text-secondary); font-size: 0.9rem;">
            ${t('soul_header_desc', { range: soul.periodRange })}
          </p>
        </div>

        <div style="margin-bottom: 22px;">
          <h4 style="color: var(--gold-primary); font-size: 1.1rem; margin-bottom: 8px;">${t('soul_mission_title')}</h4>
          <p style="color: var(--text-primary); font-size: 0.98rem; line-height: 1.6;">${soul.generalMission}</p>
        </div>

        <div style="background: rgba(10, 14, 23, 0.6); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--gold-border);">
          <h4 style="color: var(--accent-cyan); font-size: 1.05rem; margin-bottom: 8px;">${t('soul_manifestation_title', { polarity: soul.polarityType })}</h4>
          <p style="color: var(--text-secondary); font-size: 0.92rem; line-height: 1.6;">${soul.polarityTraits}</p>
        </div>
      </div>
    `;
  }

  /**
   * Renderiza os Grandes Ciclos de 7 Anos (Septênios) e o Ciclo de Reencarnação de 144 Anos
   */
  function renderSeptennialCycles(report, lang) {
    const container = document.getElementById('septennial-container');
    const t = window.CyclesI18n.t;
    const major = report.majorCycle;
    const periods = CyclesEngine.getSevenYearPeriods(lang);

    let html = `
      <div class="section-intro" style="margin-bottom: 24px;">
        <h3 style="font-family: var(--font-serif); color: var(--gold-primary); font-size: 1.4rem;">${t('septennial_header_title')}</h3>
        <p style="color: var(--text-secondary); font-size: 0.95rem;">
          ${t('septennial_header_desc')}
        </p>
      </div>
      <div class="septennial-grid">
    `;

    periods.forEach(p => {
      const isActive = p.periodNumber === major.periodNumber;
      const activeClass = isActive ? 'is-active' : '';
      const pSuff = CyclesEngine.getOrdinalSuffix(p.periodNumber, lang);

      html += `
        <div class="septennial-card ${activeClass}">
          <div class="septennial-badge">${p.periodNumber}${pSuff} ${lang === 'en-US' ? 'Septennial' : 'Septênio'} — ${p.ageRange}</div>
          <h4 style="color: #ffffff; font-size: 1.1rem; margin-bottom: 8px;">${p.title}</h4>
          <p style="color: var(--text-secondary); font-size: 0.88rem; line-height: 1.5;">${p.description}</p>
          ${isActive ? `<p style="margin-top: 10px; font-weight: 700; color: var(--gold-primary); font-size: 0.85rem;">${t('septennial_current_badge', { year: major.yearInCycle })}</p>` : ''}
        </div>
      `;
    });

    html += `</div>`;

    // Seção de Reencarnação (Capítulo 17)
    html += `
      <div class="hero-item" style="margin-top: 35px; background: rgba(19, 27, 46, 0.9); border: 1px solid var(--gold-border);">
        <h4 style="font-family: var(--font-serif); color: var(--gold-primary); margin-bottom: 12px; font-size: 1.25rem;">
          ${t('ch17_title')}
        </h4>
        <p style="color: var(--text-primary); font-size: 0.92rem; line-height: 1.6; margin-bottom: 12px;">
          ${t('ch17_p1')}
        </p>
        <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;">
          ${t('ch17_p2')}
        </p>
      </div>
    `;

    container.innerHTML = html;
  }

  /**
   * Renderiza o Relatório Editorial Completo pronto para Impressão / PDF
   */
  function renderFullPrintableReport(report, lang) {
    const container = document.getElementById('printable-report-container');
    const t = window.CyclesI18n.t;
    const pCycle = report.personalCycle;
    const major = report.majorCycle;
    const soul = report.soulCycle;
    const mSuff = CyclesEngine.getOrdinalSuffix(major.periodNumber, lang);
    const sSuff = CyclesEngine.getOrdinalSuffix(soul.periodNumber, lang);

    container.innerHTML = `
      <div class="printable-doc" style="padding: 20px 0;">
        <div style="border-bottom: 2px solid var(--gold-primary); padding-bottom: 16px; margin-bottom: 24px; text-align: center;">
          <h2 style="font-family: var(--font-serif); color: var(--gold-primary); font-size: 1.8rem; margin-bottom: 6px;">
            ${t('print_title')}
          </h2>
          <p style="font-size: 0.9rem; color: var(--text-secondary);">
            ${t('print_subtitle')}
          </p>
        </div>

        <div style="background: rgba(19, 27, 46, 0.5); padding: 18px; border-radius: 8px; margin-bottom: 24px;">
          <p><strong>${t('print_fullname')}</strong> ${escapeHtml(report.userName)}</p>
          <p><strong>${t('print_birth')}</strong> ${report.birthDateFormatted}</p>
          <p><strong>${t('print_age')}</strong> ${major.currentAge} ${t('hero_years_old')}</p>
          <p><strong>${t('print_consultation')}</strong> ${report.referenceDateFormatted}</p>
        </div>

        <h3 style="color: var(--gold-primary); margin: 20px 0 10px; font-family: var(--font-serif);">${t('print_sec1_title')}</h3>
        <p style="margin-bottom: 12px;"><strong>${t('print_active_period')}</strong> ${pCycle.activePeriod.number}${CyclesEngine.getOrdinalSuffix(pCycle.activePeriod.number, lang)} ${lang === 'en-US' ? 'Period' : 'Período'} — ${pCycle.activePeriod.personal.name} (${pCycle.activePeriod.fullRangeFormatted})</p>
        <p style="margin-bottom: 20px; line-height: 1.6;">${pCycle.activePeriod.personal.fullText}</p>

        <h3 style="color: var(--gold-primary); margin: 20px 0 10px; font-family: var(--font-serif);">${t('print_sec2_title')}</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 0.88rem;">
          <thead>
            <tr style="border-bottom: 1px solid var(--gold-primary); text-align: left;">
              <th style="padding: 8px;">${t('print_table_num')}</th>
              <th style="padding: 8px;">${t('print_table_period')}</th>
              <th style="padding: 8px;">${t('print_table_dates')}</th>
              <th style="padding: 8px;">${t('print_table_nature')}</th>
            </tr>
          </thead>
          <tbody>
            ${pCycle.periods.map(p => `
              <tr style="border-bottom: 1px solid var(--border-subtle); ${p.isActive ? 'background: rgba(212, 175, 55, 0.15); font-weight: bold;' : ''}">
                <td style="padding: 8px;">${p.number}</td>
                <td style="padding: 8px;">${p.personal.name} ${p.isActive ? ` ${t('print_table_active_badge')}` : ''}</td>
                <td style="padding: 8px;">${p.rangeFormatted}</td>
                <td style="padding: 8px;">${p.personal.nature}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <h3 style="color: var(--gold-primary); margin: 20px 0 10px; font-family: var(--font-serif);">${t('print_sec3_title')}</h3>
        <p style="margin-bottom: 8px;"><strong>${major.periodNumber}${mSuff} ${lang === 'en-US' ? 'Septennial' : 'Septênio'} (${major.ageRange}):</strong> ${major.title}</p>
        <p style="margin-bottom: 20px; line-height: 1.6;">${major.description}</p>

        <h3 style="color: var(--gold-primary); margin: 20px 0 10px; font-family: var(--font-serif);">${t('print_sec4_title')}</h3>
        <p style="margin-bottom: 8px;"><strong>${soul.periodNumber}${sSuff} ${lang === 'en-US' ? 'Cosmic Soul Period' : 'Período da Alma Cósmica'}:</strong> ${soul.title} (${soul.periodRange})</p>
        <p style="margin-bottom: 8px;"><strong>${t('print_sec4_polarity')}</strong> ${soul.polarityType} (${soul.polarityRange})</p>
        <p style="margin-bottom: 20px; line-height: 1.6;">${soul.polarityTraits}</p>

        <h3 style="color: var(--gold-primary); margin: 20px 0 10px; font-family: var(--font-serif);">${t('print_sec5_title')}</h3>
        <p style="margin-bottom: 8px;"><strong>${t('print_business_label')}</strong> ${pCycle.activePeriod.business.name} — ${t('print_focus')} ${pCycle.activePeriod.business.focus}</p>
        <p style="margin-bottom: 14px; line-height: 1.6;">${pCycle.activePeriod.business.description}</p>
        <p style="margin-bottom: 8px;"><strong>${t('print_health_label')}</strong> ${pCycle.activePeriod.health.name} — ${t('print_alert')} ${pCycle.activePeriod.health.warning}</p>
        <p style="margin-bottom: 16px; line-height: 1.6;">${pCycle.activePeriod.health.recommendation}</p>

        <!-- Aviso Legal e Isenção de Responsabilidade no Relatório Impresso -->
        <div style="margin-top: 35px; padding: 14px 18px; border-top: 1px solid var(--border-subtle); background: rgba(0, 0, 0, 0.2); border-radius: 6px; font-size: 0.76rem; color: var(--text-secondary); line-height: 1.5; text-align: justify;">
          <strong style="color: var(--gold-light);">${t('print_disclaimer_title')}</strong> ${t('print_disclaimer_text')}
        </div>
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

  // =======================================================================================
  // 6. EVENTO DE TROCA DINÂMICA DE IDIOMA (SEM RECARREGAR PÁGINA)
  // =======================================================================================
  window.addEventListener('rciclos:langchange', function (e) {
    const newLang = e.detail && e.detail.lang ? e.detail.lang : (window.CyclesI18n ? window.CyclesI18n.getCurrentLang() : 'pt-BR');
    const oldLang = currentActiveLang;
    currentActiveLang = newLang;

    // Atualiza o placeholder do campo de data
    if (inputBirthDate) {
      inputBirthDate.placeholder = newLang === 'en-US' ? 'MM/DD/YYYY (e.g.: 09/10/1980)' : 'DD/MM/AAAA (ex: 10/09/1980)';

      // Converte data já preenchida para o formato correspondente (DD/MM <-> MM/DD)
      if (inputBirthDate.value) {
        const clean = inputBirthDate.value.replace(/\D/g, '');
        if (clean.length === 8) {
          if (oldLang === 'pt-BR' && newLang === 'en-US') {
            const d = clean.slice(0, 2);
            const m = clean.slice(2, 4);
            const y = clean.slice(4, 8);
            inputBirthDate.value = `${m}/${d}/${y}`;
          } else if (oldLang === 'en-US' && newLang === 'pt-BR') {
            const m = clean.slice(0, 2);
            const d = clean.slice(2, 4);
            const y = clean.slice(4, 8);
            inputBirthDate.value = `${d}/${m}/${y}`;
          }
        }
      }
    }

    // Se um relatório já estiver na tela, recalcula e re-renderiza na hora!
    if (currentReport) {
      calculateAndRender();
    }
  });

});
