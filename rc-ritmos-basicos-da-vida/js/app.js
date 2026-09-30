/**
 * =========================================================================================
 * CONTROLADOR PRINCIPAL DA APLICAÇÃO: RITMOS BÁSICOS DA VIDA (PEDRO RAUL MORALES)
 * =========================================================================================
 * Gerencia formulários, renderização do gráfico sinusoidal no Canvas, abas interativas,
 * relógio cósmico em tempo real, interatividade touch e geração de relatórios de impressão.
 * Todos os dados são processados exclusivamente no lado do cliente (memória da sessão).
 * =========================================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // Elementos do DOM
  const form = document.getElementById("cycles-form");
  const inputName = document.getElementById("user-name");
  const inputBirthDate = document.getElementById("birth-date");
  const inputBirthTime = document.getElementById("birth-time");
  const btnReset = document.getElementById("btn-reset-form");
  const btnPrint = document.getElementById("btn-print-report");
  const resultsSection = document.getElementById("results-section");
  const heroContainer = document.getElementById("hero-card-container");
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  // Armazena em memória de sessão o último cálculo para redesenho responsivo do Canvas
  let ultimoCalculo = null;
  let canvasHoverIndex = null; // Índice do dia inspecionado via toque ou mouse no Canvas

  // Inicia relógio ao vivo para o ciclo diário
  iniciarRelogioAoVivo();

  // Tratamento do formulário de submissão
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    executarCalculo();
  });

  // Limpar dados do formulário e ocultar resultados
  btnReset.addEventListener("click", () => {
    form.reset();
    ultimoCalculo = null;
    canvasHoverIndex = null;
    resultsSection.style.display = "none";
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Botão de Impressão / Salvar PDF
  if (btnPrint) {
    btnPrint.addEventListener("click", () => {
      window.print();
    });
  }

  // Alternância de Abas com acessibilidade ARIA e redesenho automático do Canvas
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetTab = btn.getAttribute("data-tab");
      
      tabButtons.forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      tabContents.forEach(c => c.classList.remove("active"));

      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      
      const content = document.getElementById(targetTab);
      if (content) content.classList.add("active");

      // Se abrir a aba de biorritmos, força o redesenho com as dimensões corretas da tela
      if (targetTab === "tab-biorhythms" && ultimoCalculo) {
        setTimeout(() => {
          desenharGraficoBiorritmos(
            ultimoCalculo.birthDate,
            ultimoCalculo.targetDate,
            ultimoCalculo.totalDays
          );
        }, 60);
      }
    });
  });

  // Redesenho responsivo automático quando a janela for redimensionada ou houver rotação de tela
  let redimensionarTimer;
  window.addEventListener("resize", () => {
    clearTimeout(redimensionarTimer);
    redimensionarTimer = setTimeout(() => {
      if (ultimoCalculo && resultsSection.style.display !== "none") {
        desenharGraficoBiorritmos(
          ultimoCalculo.birthDate,
          ultimoCalculo.targetDate,
          ultimoCalculo.totalDays
        );
      }
    }, 120);
  });

  // =========================================================================
  // FUNÇÃO PRINCIPAL: EXECUTA OS CÁLCULOS E RENDERIZAÇÃO
  // =========================================================================
  function executarCalculo() {
    const nome = inputName.value.trim() || "Estudante Rosacruz";
    const dataNascVal = inputBirthDate.value;
    const horaNascVal = inputBirthTime ? inputBirthTime.value : "";

    if (!dataNascVal) {
      alert("Por favor, selecione sua data de nascimento.");
      return;
    }

    const birthDate = new Date(dataNascVal + "T00:00:00");
    // A data de consulta/cálculo é sempre a data atual ("hoje")
    const targetDate = new Date();
    targetDate.setHours(0, 0, 0, 0);

    if (targetDate < birthDate) {
      alert("A data de nascimento informada não pode estar no futuro.");
      return;
    }

    // 1. Cálculos matemáticos usando o motor de Pedro Raul Morales
    const diasVividosInfo = MoralesEngine.calcularDiasVividos(birthDate, targetDate);
    const biorritmos = MoralesEngine.calcularBiorritmos(diasVividosInfo.totalDays);
    const anualInfo = MoralesEngine.calcularPeriodoAnual(birthDate, targetDate);
    const setenioInfo = MoralesEngine.calcularSetenio(diasVividosInfo.ageYears);
    const diarioInfo = MoralesEngine.calcularPeriodoDiario(new Date());
    const vibNascInfo = MoralesEngine.calcularVibracaoNascimento(birthDate, horaNascVal);
    const faseLunar = MoralesEngine.calcularFaseLunar(targetDate);

    // Salva o cálculo na memória volátil da sessão para manipulação do Canvas
    ultimoCalculo = {
      birthDate: birthDate,
      targetDate: targetDate,
      totalDays: diasVividosInfo.totalDays
    };

    // 2. Renderização das seções e abas
    renderizarHeroCard(nome, birthDate, targetDate, diasVividosInfo, biorritmos, anualInfo, setenioInfo, diarioInfo, faseLunar);
    renderizarAbaBiorritmos(diasVividosInfo, biorritmos, birthDate, targetDate);
    renderizarAbaAnual(anualInfo);
    renderizarAbaDiario(diarioInfo, vibNascInfo);
    renderizarAbaSetenio(setenioInfo, diasVividosInfo.ageYears);
    renderizarAbaCosmica(faseLunar);

    // 3. Exibição da seção de resultados e rolagem suave até ela
    resultsSection.style.display = "block";
    resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });

    // 4. Desenha o gráfico de ondas no Canvas após a montagem do DOM
    setTimeout(() => {
      desenharGraficoBiorritmos(birthDate, targetDate, diasVividosInfo.totalDays);
      configurarInteratividadeCanvas();
    }, 100);
  }

  // =========================================================================
  // 1. RENDERIZAÇÃO DO HERO CARD (RESUMO DO MOMENTO)
  // =========================================================================
  function renderizarHeroCard(nome, birthDate, targetDate, diasInfo, bio, anual, setenio, diario, lua) {
    const formatarData = (d) => d.toLocaleDateString("pt-BR");

    heroContainer.innerHTML = `
      <div class="hero-card">
        <div class="hero-profile">
          <div class="badge-sublime" style="margin-bottom: 8px;">✦ Mapa Pessoal Rosacruz</div>
          <h3>${nome}</h3>
          <p class="hero-meta">
            Nascimento: <strong>${formatarData(birthDate)}</strong> | 
            Idade: <strong>${diasInfo.ageYears} anos</strong> | 
            Dias Vividos: <strong>${diasInfo.totalDays.toLocaleString("pt-BR")} dias</strong>
          </p>

          <p style="font-size: 0.92rem; color: var(--text-main); margin-bottom: 12px; line-height: 1.55;">
            Atualmente vivenciando o <strong>${anual.current.name}</strong> do ciclo anual (${anual.current.title}) e o <strong>${setenio.period}º Septênio de Vida</strong> (${setenio.base}).
          </p>

          <div class="hero-badges-list">
            <span class="hero-pill pill-phys">Físico: Dia ${bio.physical.value} (${bio.physical.phase})</span>
            <span class="hero-pill pill-emot">Emocional: Dia ${bio.emotional.value} (${bio.emotional.phase})</span>
            <span class="hero-pill pill-intel">Intelectual: Dia ${bio.intellectual.value} (${bio.intellectual.phase})</span>
            <span class="hero-pill pill-annual">Ano Pessoal: ${anual.current.name}</span>
            <span class="hero-pill" style="background: rgba(255,255,255,0.08); color: #fff;">${lua.icon} ${lua.phaseName}</span>
          </div>
        </div>

        <div class="hero-clock-box">
          <div class="clock-header">
            <span style="font-size: 0.85rem; color: var(--text-gold); text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">
              ⏱ Horas Significativas (Agora)
            </span>
            <span class="cell-vibration">${diario.vibrationLetter}</span>
          </div>
          <div class="clock-time" id="live-clock-time">--:--:--</div>
          <div style="font-size: 0.92rem; font-weight: 600; color: var(--gold-light); margin-top: 4px;">
            ${diario.window.label}
          </div>
          <div style="font-size: 0.82rem; color: var(--text-muted);">
            Regência: <strong>${diario.vibrationInfo.planet}</strong> (Nota ${diario.vibrationInfo.note}) — ${diario.vibrationInfo.title}
          </div>
          <div class="clock-progress-bar">
            <div class="clock-progress-fill" style="width: ${diario.progressPercent}%;"></div>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono);">
            <span>Início: ${diario.window.start}</span>
            <span>Término: ${diario.window.end}</span>
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 2. RENDERIZAÇÃO DA ABA DOS BIORRITMOS (CAPÍTULO III)
  // =========================================================================
  function renderizarAbaBiorritmos(diasInfo, bio, birthDate, targetDate) {
    const container = document.getElementById("tab-biorhythms-content");
    if (!container) return;

    container.innerHTML = `
      <div class="biorhythm-chart-card">
        <div class="chart-header">
          <div class="chart-title">
            <h3>Curva Sinusoidal dos Biorritmos (Próximos 30 Dias)</h3>
            <p style="font-size: 0.85rem; color: var(--text-muted);">
              A linha vertical central marca a data de hoje. Acima da linha tracejada dourada (+): fase positiva de descarga; abaixo (-): recarga biológica; sobre a linha (0): dias críticos. Toque no gráfico para inspecionar outros dias.
            </p>
          </div>
          <div class="chart-legend">
            <div class="legend-item"><span class="legend-dot" style="background: var(--bio-phys);"></span> Físico (23 dias)</div>
            <div class="legend-item"><span class="legend-dot" style="background: var(--bio-emot);"></span> Emocional (28 dias)</div>
            <div class="legend-item"><span class="legend-dot" style="background: var(--bio-intel);"></span> Intelectual (33 dias)</div>
          </div>
        </div>

        <div class="canvas-wrapper">
          <canvas id="biorhythm-canvas"></canvas>
        </div>
      </div>

      <div class="biorhythm-cards-grid">
        <!-- FÍSICO -->
        <div class="bio-card card-phys">
          <div class="bio-card-header">
            <span class="bio-name" style="color: #fca5a5;">⚡ Biorritmo Físico</span>
            <span class="bio-val-pill ${bio.physical.phaseClass}">Dia ${bio.physical.value} / 23</span>
          </div>
          <div style="font-size: 0.82rem; color: var(--text-muted); font-family: var(--font-mono);">
            Fase: <strong>${bio.physical.phase}</strong> (${bio.physical.percentage > 0 ? "+" : ""}${bio.physical.percentage}%)
          </div>
          <div class="bio-bar-wrapper">
            <div class="bio-bar-fill" style="width: ${Math.max(10, Math.abs(bio.physical.percentage))}%; background: var(--bio-phys);"></div>
          </div>
          <p class="bio-card-text">${bio.physical.text}</p>
        </div>

        <!-- EMOCIONAL -->
        <div class="bio-card card-emot">
          <div class="bio-card-header">
            <span class="bio-name" style="color: #7dd3fc;">🌊 Biorritmo Emocional</span>
            <span class="bio-val-pill ${bio.emotional.phaseClass}">Dia ${bio.emotional.value} / 28</span>
          </div>
          <div style="font-size: 0.82rem; color: var(--text-muted); font-family: var(--font-mono);">
            Fase: <strong>${bio.emotional.phase}</strong> (${bio.emotional.percentage > 0 ? "+" : ""}${bio.emotional.percentage}%)
          </div>
          <div class="bio-bar-wrapper">
            <div class="bio-bar-fill" style="width: ${Math.max(10, Math.abs(bio.emotional.percentage))}%; background: var(--bio-emot);"></div>
          </div>
          <p class="bio-card-text">${bio.emotional.text}</p>
        </div>

        <!-- INTELECTUAL -->
        <div class="bio-card card-intel">
          <div class="bio-card-header">
            <span class="bio-name" style="color: #6ee7b7;">💡 Biorritmo Intelectual</span>
            <span class="bio-val-pill ${bio.intellectual.phaseClass}">Dia ${bio.intellectual.value} / 33</span>
          </div>
          <div style="font-size: 0.82rem; color: var(--text-muted); font-family: var(--font-mono);">
            Fase: <strong>${bio.intellectual.phase}</strong> (${bio.intellectual.percentage > 0 ? "+" : ""}${bio.intellectual.percentage}%)
          </div>
          <div class="bio-bar-wrapper">
            <div class="bio-bar-fill" style="width: ${Math.max(10, Math.abs(bio.intellectual.percentage))}%; background: var(--bio-intel);"></div>
          </div>
          <p class="bio-card-text">${bio.intellectual.text}</p>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 3. RENDERIZAÇÃO DA ABA DO CICLO ANUAL (CAPÍTULO IV)
  // =========================================================================
  function renderizarAbaAnual(anual) {
    const container = document.getElementById("tab-annual-content");
    if (!container) return;

    const formatarDataCurta = (d) => d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long" });

    let html = `
      <div style="margin-bottom: 20px;">
        <h3 style="font-family: var(--font-display); color: var(--gold-light); font-size: 1.3rem; margin-bottom: 4px;">
          O Ciclo Anual da Vida Humana (Períodos de 52 Dias)
        </h3>
        <p style="color: var(--text-muted); font-size: 0.92rem;">
          Iniciado na data do aniversário natalício, o ano pessoal divide-se em 7 períodos contíguos de aproximadamente 52 dias. O período destacado abaixo representa onde você está hoje.
        </p>
      </div>

      <div class="annual-schedule-list">
    `;

    anual.schedule.forEach(p => {
      const cardClass = p.isCurrent ? "period-item-card is-current" : "period-item-card";
      const badgeAtual = p.isCurrent ? `<span class="badge-sublime" style="margin-bottom:0;">★ PERÍODO ATUAL</span>` : "";

      html += `
        <div class="${cardClass}">
          <div class="period-header">
            <div>
              <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-gold); text-transform: uppercase;">
                ${p.name}
              </span>
              <h4 class="period-title">${p.title}</h4>
            </div>
            <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
              <span class="period-dates">🗓 ${formatarDataCurta(p.startDate)} a ${formatarDataCurta(p.endDate)} (${p.durationDays} dias)</span>
              ${badgeAtual}
            </div>
          </div>

          <p style="font-size: 0.92rem; color: var(--text-main); margin-bottom: 12px; line-height: 1.55;">
            ${p.description}
          </p>

          <div style="background: rgba(212, 175, 55, 0.08); border-left: 3px solid var(--gold-primary); padding: 10px 14px; border-radius: 4px; margin-bottom: 14px; font-size: 0.88rem;">
            <strong>🌿 Saúde & Fisiologia no Período:</strong> ${p.health}
          </div>

          <div class="period-body-grid">
            <div class="actions-box fav">
              <h4>Atividades Favoráveis</h4>
              <ul>
                ${p.favorable.map(item => `<li>${item}</li>`).join("")}
              </ul>
            </div>
            <div class="actions-box unfav">
              <h4>Atenção e Precauções</h4>
              <ul>
                ${p.unfavorable.map(item => `<li>${item}</li>`).join("")}
              </ul>
            </div>
          </div>
        </div>
      `;
    });

    html += `</div>`;
    container.innerHTML = html;
  }

  // =========================================================================
  // 4. RENDERIZAÇÃO DA ABA DO CICLO DIÁRIO (CAPÍTULO II)
  // =========================================================================
  function renderizarAbaDiario(diario, vibNasc) {
    const container = document.getElementById("tab-daily-content");
    if (!container) return;

    let html = `
      <div style="margin-bottom: 25px;">
        <h3 style="font-family: var(--font-display); color: var(--gold-light); font-size: 1.3rem; margin-bottom: 4px;">
          Os Períodos Diários de Horas Significativas (24 Horas)
        </h3>
        <p style="color: var(--text-muted); font-size: 0.92rem;">
          O dia de 24 horas divide-se em 7 períodos iguais de 3 horas e 35 minutos. Cada período vibra numa nota musical e frequência planetária impessoal da cosmologia tradicional.
        </p>
      </div>
    `;

    // Bloco da vibração de nascimento se calculada
    if (vibNasc) {
      html += `
        <div style="background: linear-gradient(135deg, #1b263b 0%, #111a29 100%); border: 1px solid var(--border-gold); border-radius: var(--radius-md); padding: 20px; margin-bottom: 25px;">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
            <span class="cell-vibration" style="width: 34px; height: 34px; line-height: 34px; font-size: 1.1rem;">${vibNasc.letter}</span>
            <div>
              <h4 style="font-family: var(--font-display); color: var(--gold-light); font-size: 1.1rem;">Vibração do Seu Nascimento: Letra "${vibNasc.letter}" (${vibNasc.info.planet} / Nota ${vibNasc.info.note})</h4>
              <span style="font-size: 0.85rem; color: var(--text-muted);">${vibNasc.window.label}</span>
            </div>
          </div>
          <p style="font-size: 0.9rem; color: var(--text-main); margin-bottom: 8px;">
            ${vibNasc.info.title}. Essa vibração marca sua matriz de ação e determinação prática na vida diária.
          </p>
        </div>
      `;
    }

    // Tabela Semanal Permanente (Tabela 1 de Pedro Morales)
    html += `
      <div class="table-responsive">
        <table class="custom-table">
          <thead>
            <tr>
              <th>Período do Dia</th>
              <th>Horário</th>
              <th>Domingo</th>
              <th>Segunda</th>
              <th>Terça</th>
              <th>Quarta</th>
              <th>Quinta</th>
              <th>Sexta</th>
              <th>Sábado</th>
            </tr>
          </thead>
          <tbody>
    `;

    MoralesEngine.dailyWindows.forEach((win, wIdx) => {
      html += `<tr>`;
      html += `<td><strong>${win.index}º Período</strong></td>`;
      html += `<td style="font-family: var(--font-mono); color: var(--text-gold);">${win.start} às ${win.end}</td>`;
      for (let day = 0; day < 7; day++) {
        const letter = MoralesEngine.weeklyMatrix[day][wIdx];
        const isCurrent = (day === diario.dayOfWeek && wIdx === MoralesEngine.dailyWindows.indexOf(diario.window));
        const cellStyle = isCurrent ? "background: rgba(212, 175, 55, 0.25); font-weight: bold; border: 1px solid var(--gold-primary);" : "";
        html += `<td style="${cellStyle}"><span class="cell-vibration">${letter}</span></td>`;
      }
      html += `</tr>`;
    });

    html += `
          </tbody>
        </table>
      </div>

      <!-- Guia de Aplicação das Letras A a G -->
      <h4 style="font-family: var(--font-display); color: var(--gold-light); font-size: 1.15rem; margin: 30px 0 16px;">
        Guia das 7 Vibrações Planetárias (A a G)
      </h4>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
    `;

    Object.keys(MoralesEngine.vibrationsInfo).forEach(letter => {
      const v = MoralesEngine.vibrationsInfo[letter];
      html += `
        <div style="background: var(--bg-card); border: 1px solid rgba(255,255,255,0.08); border-radius: var(--radius-md); padding: 16px;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
            <span class="cell-vibration">${letter}</span>
            <div>
              <strong style="color: var(--gold-light);">${v.planet} (Nota ${v.note})</strong>
              <div style="font-size: 0.78rem; color: var(--text-muted);">${v.tone}</div>
            </div>
          </div>
          <p style="font-size: 0.85rem; color: #a7f3d0; margin-bottom: 6px;"><strong>✓ Favorável:</strong> ${v.favorable}</p>
          <p style="font-size: 0.85rem; color: #fecdd3;"><strong>✕ Evitar:</strong> ${v.unfavorable}</p>
        </div>
      `;
    });

    html += `</div>`;
    container.innerHTML = html;
  }

  // =========================================================================
  // 5. RENDERIZAÇÃO DA ABA DO CICLO DE 144 ANOS (CAPÍTULO IV)
  // =========================================================================
  function renderizarAbaSetenio(setenio, idadeAnos) {
    const container = document.getElementById("tab-septennial-content");
    if (!container) return;

    let html = `
      <div style="margin-bottom: 25px;">
        <h3 style="font-family: var(--font-display); color: var(--gold-light); font-size: 1.3rem; margin-bottom: 4px;">
          O Ciclo de 144 Anos e os Graus de 7 Anos (Septênios)
        </h3>
        <p style="color: var(--text-muted); font-size: 0.92rem;">
          Na tradição Rosacruz, a existência humana aperfeiçoa-se através de ciclos sucessivos de 7 anos solares. Cada degrau desenvolve uma oitava superior da personalidade-alma.
        </p>
      </div>

      <div style="background: linear-gradient(145deg, #172236 0%, #101928 100%); border: 1px solid var(--border-gold); border-radius: var(--radius-lg); padding: 24px; margin-bottom: 25px;">
        <span class="badge-sublime" style="margin-bottom: 8px;">SEU SEPTÊNIO ATUAL (IDADE: ${idadeAnos} ANOS)</span>
        <h4 style="font-family: var(--font-display); color: var(--gold-light); font-size: 1.35rem; margin-bottom: 6px;">
          ${setenio.period}º Período: ${setenio.base} (Idade de ${setenio.range[0]} a ${setenio.range[1]} Anos)
        </h4>
        <p style="font-size: 0.95rem; color: var(--text-main); line-height: 1.6; margin-bottom: 12px;">
          ${setenio.desc}
        </p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 12px;">
    `;

    MoralesEngine.septennialPeriods.forEach(s => {
      const isCurrent = (s.period === setenio.period);
      const border = isCurrent ? "border: 1px solid var(--gold-primary); background: #192437;" : "border: 1px solid rgba(255,255,255,0.06); background: var(--bg-card);";

      html += `
        <div style="${border} border-radius: var(--radius-md); padding: 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
          <div>
            <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-gold);">Idade ${s.range[0]} a ${s.range[1]} anos</span>
            <h5 style="font-family: var(--font-display); color: var(--gold-light); font-size: 1.05rem;">${s.period}º Período: ${s.base}</h5>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 4px;">${s.desc}</p>
          </div>
          ${isCurrent ? '<span class="badge-sublime" style="margin:0;">★ ATUAL</span>' : ''}
        </div>
      `;
    });

    html += `</div>`;
    container.innerHTML = html;
  }

  // =========================================================================
  // 6. RENDERIZAÇÃO DA ABA COSMOBIOLÓGICA (SOL, LUA E JET-LAG)
  // =========================================================================
  function renderizarAbaCosmica(lua) {
    const container = document.getElementById("tab-cosmic-content");
    if (!container) return;

    container.innerHTML = `
      <div style="margin-bottom: 25px;">
        <h3 style="font-family: var(--font-display); color: var(--gold-light); font-size: 1.3rem; margin-bottom: 4px;">
          Cosmobiologia: Influências do Sol, da Lua e Crononutrição (Capítulos I e V)
        </h3>
        <p style="color: var(--text-muted); font-size: 0.92rem;">
          Pesquisas científicas e preceitos médicos rosacruzes sobre a influência do cosmos nos fluidos e no metabolismo humano.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
        <!-- Card Lunar -->
        <div class="bio-card" style="border-top: 3px solid var(--gold-primary);">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
            <span style="font-size: 2.2rem;">${lua.icon}</span>
            <div>
              <h4 style="font-family: var(--font-display); color: var(--gold-light); font-size: 1.15rem;">${lua.phaseName} (Dia Lunar ${lua.phaseAgeDays})</h4>
              <span style="font-size: 0.8rem; color: var(--text-muted);">Marés Biológicas e Fisiologia</span>
            </div>
          </div>
          <p style="font-size: 0.9rem; color: var(--text-main); line-height: 1.55;">
            ${lua.recommendation}
          </p>
        </div>

        <!-- Card Solar (Manchas Solares e Efeito Takata) -->
        <div class="bio-card" style="border-top: 3px solid #f59e0b;">
          <h4 style="font-family: var(--font-display); color: #fbbf24; font-size: 1.15rem; margin-bottom: 8px;">
            ☀️ Ciclo Solar de 11 Anos & Efeito Takata
          </h4>
          <p style="font-size: 0.9rem; color: var(--text-main); line-height: 1.55; margin-bottom: 8px;">
            O médico japonês Dr. Maki Takata demonstrou que as manchas solares e tempestades geomagnéticas alteram instantaneamente o índice de floculação do soro sanguíneo humano.
          </p>
          <p style="font-size: 0.85rem; color: var(--text-muted);">
            Em fases de intensa atividade solar, mantenha atitude serena, hidratação redobrada e pratique exercícios de relaxamento e meditação rosacruz.
          </p>
        </div>

        <!-- Card Crononutrição e Sono -->
        <div class="bio-card" style="border-top: 3px solid #10b981;">
          <h4 style="font-family: var(--font-display); color: #6ee7b7; font-size: 1.15rem; margin-bottom: 8px;">
            🥗 Crononutrição e o Relógio Metabólico
          </h4>
          <p style="font-size: 0.9rem; color: var(--text-main); line-height: 1.55; margin-bottom: 8px;">
            <strong>Pela Manhã:</strong> Carboidratos são prontamente queimados como energia ativa. O pico da pressão ocorre entre 8h e 10h.<br>
            <strong>À Tarde:</strong> A força muscular máxima ocorre entre 14h e 18h (ideal para exercícios físicos).<br>
            <strong>À Noite:</strong> A insulina perde eficiência e por volta da meia-noite o fígado ativa a síntese de colesterol. Evite farinhas e açúcares tarde da noite.
          </p>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 7. DESENHO DO GRÁFICO SINUSOIDAL NO CANVAS (ALTA RESOLUÇÃO & RESPONSIVO)
  // =========================================================================
  function desenharGraficoBiorritmos(birthDate, targetDate, totalDaysCenter) {
    const canvas = document.getElementById("biorhythm-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    // Se o canvas ainda estiver com largura zero (aba oculta), aborta
    if (rect.width <= 0) return;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    // Intervalo de dias a exibir: 5 dias antes até 25 dias depois do dia alvo (31 dias no total)
    const windowDays = 31;
    const offsetStart = -5;
    const centerY = height / 2;
    const amplitude = (height / 2) * 0.72;
    const stepX = width / (windowDays - 1);

    // Fundo limpo noturno
    ctx.fillStyle = "#0d131f";
    ctx.fillRect(0, 0, width, height);

    // Linhas de Grade Horizontal (+100%, -100%)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, centerY - amplitude);
    ctx.lineTo(width, centerY - amplitude);
    ctx.moveTo(0, centerY + amplitude);
    ctx.lineTo(width, centerY + amplitude);
    ctx.stroke();

    // Rótulos de porcentagem na grade (+100%, 0, -100%)
    ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
    ctx.font = "10px JetBrains Mono, monospace";
    ctx.fillText("+100%", 8, centerY - amplitude + 12);
    ctx.fillText("-100%", 8, centerY + amplitude - 4);

    // EIXO ZERO (Linha Crítica)
    ctx.strokeStyle = "rgba(212, 175, 55, 0.5)";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();
    ctx.setLineDash([]);

    // LINHA VERTICAL DO DIA DE HOJE / ALVO (offset 0 = índice 5)
    const targetX = (-offsetStart) * stepX;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(targetX, 0);
    ctx.lineTo(targetX, height);
    ctx.stroke();

    // Marcador textual "HOJE / CONSULTA"
    ctx.fillStyle = "#f3f4f6";
    ctx.font = "bold 10px Inter, sans-serif";
    ctx.fillText("HOJE", targetX + 4, 16);

    // Função auxiliar para calcular e traçar cada onda sinusoidal
    function traçarOnda(cycleDays, strokeColor) {
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2.5;
      ctx.beginPath();

      for (let i = 0; i < windowDays; i++) {
        const dayOffset = offsetStart + i;
        const currentDays = totalDaysCenter + dayOffset;
        let rest = currentDays % cycleDays;
        if (rest === 0) rest = cycleDays;

        const angle = (2 * Math.PI * (rest - 1)) / cycleDays;
        const yVal = centerY - Math.sin(angle) * amplitude;
        const xVal = i * stepX;

        if (i === 0) {
          ctx.moveTo(xVal, yVal);
        } else {
          ctx.lineTo(xVal, yVal);
        }
      }
      ctx.stroke();

      // Ponto no dia consultado (Hoje)
      const centerRest = totalDaysCenter % cycleDays || cycleDays;
      const centerAngle = (2 * Math.PI * (centerRest - 1)) / cycleDays;
      const centerYVal = centerY - Math.sin(centerAngle) * amplitude;

      ctx.fillStyle = strokeColor;
      ctx.beginPath();
      ctx.arc(targetX, centerYVal, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Se houver dia sob hover/touch, desenha ponto nele também
      if (canvasHoverIndex !== null && canvasHoverIndex >= 0 && canvasHoverIndex < windowDays) {
        const hOffset = offsetStart + canvasHoverIndex;
        const hDays = totalDaysCenter + hOffset;
        const hRest = hDays % cycleDays || cycleDays;
        const hAngle = (2 * Math.PI * (hRest - 1)) / cycleDays;
        const hYVal = centerY - Math.sin(hAngle) * amplitude;
        const hXVal = canvasHoverIndex * stepX;

        ctx.fillStyle = strokeColor;
        ctx.beginPath();
        ctx.arc(hXVal, hYVal, 4.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Traça as 3 curvas canônicas de biorritmos
    traçarOnda(23, "#ef4444"); // Físico (Vermelho)
    traçarOnda(28, "#38bdf8"); // Emocional (Ciano)
    traçarOnda(33, "#10b981"); // Intelectual (Verde)

    // Se o usuário estiver tocando/passando o mouse em um dia, traça uma linha guia vertical suave
    if (canvasHoverIndex !== null && canvasHoverIndex >= 0 && canvasHoverIndex < windowDays) {
      const hoverX = canvasHoverIndex * stepX;
      ctx.strokeStyle = "rgba(212, 175, 55, 0.7)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(hoverX, 0);
      ctx.lineTo(hoverX, height - 20);
      ctx.stroke();
      ctx.setLineDash([]);

      const hoveredDate = new Date(targetDate);
      hoveredDate.setDate(hoveredDate.getDate() + (offsetStart + canvasHoverIndex));
      const dateText = hoveredDate.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });

      ctx.fillStyle = "#fbbf24";
      ctx.font = "bold 11px JetBrains Mono, monospace";
      ctx.fillText(dateText, Math.max(10, Math.min(width - 45, hoverX - 16)), height - 26);
    }

    // Renderiza rótulos de datas na base do gráfico
    ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
    ctx.font = "9px JetBrains Mono, monospace";
    for (let i = 0; i < windowDays; i += 5) {
      const curDate = new Date(targetDate);
      curDate.setDate(curDate.getDate() + (offsetStart + i));
      const lbl = `${curDate.getDate()}/${curDate.getMonth() + 1}`;
      ctx.fillText(lbl, i * stepX + 2, height - 6);
    }
  }

  // =========================================================================
  // 8. INTERATIVIDADE TOUCH E MOUSE NO CANVAS DE BIORRITMOS
  // =========================================================================
  function configurarInteratividadeCanvas() {
    const canvas = document.getElementById("biorhythm-canvas");
    if (!canvas || canvas.dataset.hasEvents) return;
    canvas.dataset.hasEvents = "true";

    function processarInteracao(clientX) {
      if (!ultimoCalculo) return;
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const windowDays = 31;
      const stepX = rect.width / (windowDays - 1);
      const idx = Math.round(x / stepX);

      if (idx >= 0 && idx < windowDays) {
        canvasHoverIndex = idx;
        desenharGraficoBiorritmos(
          ultimoCalculo.birthDate,
          ultimoCalculo.targetDate,
          ultimoCalculo.totalDays
        );
      }
    }

    canvas.addEventListener("mousemove", (e) => {
      processarInteracao(e.clientX);
    });

    canvas.addEventListener("mouseleave", () => {
      canvasHoverIndex = null;
      if (ultimoCalculo) {
        desenharGraficoBiorritmos(
          ultimoCalculo.birthDate,
          ultimoCalculo.targetDate,
          ultimoCalculo.totalDays
        );
      }
    });

    canvas.addEventListener("touchmove", (e) => {
      if (e.touches && e.touches[0]) {
        processarInteracao(e.touches[0].clientX);
      }
    }, { passive: true });

    canvas.addEventListener("touchend", () => {
      setTimeout(() => {
        canvasHoverIndex = null;
        if (ultimoCalculo) {
          desenharGraficoBiorritmos(
            ultimoCalculo.birthDate,
            ultimoCalculo.targetDate,
            ultimoCalculo.totalDays
          );
        }
      }, 1500);
    });
  }

  // =========================================================================
  // 9. RELÓGIO EM TEMPO REAL PARA O CICLO DIÁRIO
  // =========================================================================
  function iniciarRelogioAoVivo() {
    setInterval(() => {
      const clockElem = document.getElementById("live-clock-time");
      if (clockElem) {
        const now = new Date();
        clockElem.textContent = now.toLocaleTimeString("pt-BR");
      }
    }, 1000);
  }

});
