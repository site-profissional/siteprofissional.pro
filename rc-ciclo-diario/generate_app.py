# -*- coding: utf-8 -*-
"""
Gerador da Aplicação Web dos Ciclos Diários de Harvey Spencer Lewis.
Cria o arquivo index.html completo, com HTML5, CSS3 avançado e JavaScript modular.
Atualizado conforme solicitações:
1. Remoção da função e do localizador de horários por atividade.
2. Inclusão da fonte oficial e link de download gratuito do livro da Rosacruz no rodapé.
3. Preservação rigorosa da última linha do rodapé com o link azul exigido.
"""

import json
from build_site import PERIODS_DATA

periods_json = json.dumps(PERIODS_DATA, ensure_ascii=False, indent=2)

html_content = f'''<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sistema dos Ciclos Diários • Harvey Spencer Lewis | Relógio Cósmico de 24 Horas</title>
  <meta name="description" content="Aplicação completa baseada na obra Autodomínio e Destino com os Ciclos da Vida de Harvey Spencer Lewis. Descubra os 7 períodos diários, o relógio cósmico de 24 horas, zonas de transição e atividades favoráveis.">
  
  <!-- Fontes Clássicas e Modernas do Google -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">

  <style>
    /* ==========================================================================
       1. VARIÁVEIS DE DESIGN E SISTEMA DE CORES (DESIGN TOKENS)
       Estética clássica refinada: tons de pergaminho noturno, ouro antigo e contrastes nítidos.
       ========================================================================== */
    :root {{
      --bg-dark: #0a0e17;
      --bg-surface: #111827;
      --bg-card: #162032;
      --bg-card-hover: #1c2940;
      --border-gold: rgba(212, 175, 55, 0.28);
      --border-gold-bright: #d4af37;
      --gold-primary: #d4af37;
      --gold-light: #f6e088;
      --gold-glow: rgba(212, 175, 55, 0.45);
      --text-main: #f3f4f6;
      --text-muted: #9ca3af;
      --text-gold: #e6ca65;
      
      --accent-favorable: #10b981;
      --accent-favorable-bg: rgba(16, 185, 129, 0.12);
      --accent-avoid: #ef4444;
      --accent-avoid-bg: rgba(239, 68, 68, 0.12);
      --accent-transition: #f59e0b;
      --accent-transition-bg: rgba(245, 158, 11, 0.16);

      --font-display: 'Cinzel', serif;
      --font-serif: 'Cormorant Garamond', Georgia, serif;
      --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;

      --shadow-elevation: 0 10px 30px -5px rgba(0, 0, 0, 0.6), 0 0 20px rgba(212, 175, 55, 0.1);
      --radius-sm: 6px;
      --radius-md: 12px;
      --radius-lg: 18px;
    }}

    /* Reset e Estrutura Básica */
    *, *::before, *::after {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }}

    body {{
      background-color: var(--bg-dark);
      background-image: 
        radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.08) 0%, transparent 60%),
        radial-gradient(circle at 100% 50%, rgba(20, 30, 48, 0.5) 0%, transparent 50%),
        radial-gradient(circle at 0% 80%, rgba(15, 23, 42, 0.6) 0%, transparent 50%);
      color: var(--text-main);
      font-family: var(--font-body);
      line-height: 1.6;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
    }}

    /* Container Principal */
    .container {{
      width: 100%;
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 24px;
    }}

    /* ==========================================================================
       2. CABEÇALHO MONUMENTAL (HERO & INTRO)
       ========================================================================== */
    .site-header {{
      padding: 48px 0 28px;
      text-align: center;
      position: relative;
    }}

    .site-header::after {{
      content: '';
      display: block;
      width: 180px;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--gold-primary), transparent);
      margin: 24px auto 0;
    }}

    .badge-sublime {{
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 16px;
      background: rgba(212, 175, 55, 0.1);
      border: 1px solid var(--border-gold);
      border-radius: 9999px;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--gold-light);
      margin-bottom: 16px;
      backdrop-filter: blur(8px);
    }}

    .site-title {{
      font-family: var(--font-display);
      font-size: clamp(2rem, 4.5vw, 3.2rem);
      font-weight: 800;
      letter-spacing: 1px;
      color: #ffffff;
      text-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
      margin-bottom: 10px;
    }}

    .site-title span {{
      background: linear-gradient(135deg, var(--gold-light), var(--gold-primary), #b38728);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      display: inline-block;
    }}

    .site-subtitle {{
      font-family: var(--font-serif);
      font-size: clamp(1.1rem, 2vw, 1.45rem);
      color: var(--text-muted);
      max-width: 860px;
      margin: 0 auto 18px;
      font-weight: 400;
    }}

    .site-subtitle strong {{
      color: var(--gold-light);
      font-weight: 600;
    }}

    /* Navegação Rápida em Abas */
    .view-mode-tabs {{
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-top: 24px;
      flex-wrap: wrap;
    }}

    .tab-btn {{
      background: var(--bg-card);
      border: 1px solid var(--border-gold);
      color: var(--text-main);
      padding: 10px 22px;
      border-radius: var(--radius-md);
      font-size: 0.92rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }}

    .tab-btn:hover {{
      background: var(--bg-card-hover);
      border-color: var(--gold-primary);
      transform: translateY(-2px);
    }}

    .tab-btn.active {{
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.25), rgba(212, 175, 55, 0.08));
      border-color: var(--gold-primary);
      color: var(--gold-light);
      box-shadow: 0 0 16px var(--gold-glow);
    }}

    /* ==========================================================================
       3. PAINEL PRINCIPAL: RELÓGIO DE 24H E CICLO ATIVO
       ========================================================================== */
    .main-grid {{
      display: grid;
      grid-template-columns: 1fr;
      gap: 32px;
      margin: 32px 0 48px;
    }}

    @media (min-width: 1024px) {{
      .main-grid {{
        grid-template-columns: 460px 1fr;
        align-items: start;
      }}
    }}

    /* Coluna Esquerda: Mostrador Cósmico de 24 Horas */
    .dial-card {{
      background: var(--bg-surface);
      border: 1px solid var(--border-gold);
      border-radius: var(--radius-lg);
      padding: 24px;
      box-shadow: var(--shadow-elevation);
      position: sticky;
      top: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }}

    .dial-header {{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      border-bottom: 1px solid rgba(212, 175, 55, 0.15);
      padding-bottom: 12px;
    }}

    .dial-title {{
      font-family: var(--font-display);
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--gold-light);
      letter-spacing: 0.5px;
    }}

    .clock-live-indicator {{
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: var(--font-mono);
      font-size: 0.85rem;
      color: var(--accent-favorable);
    }}

    .pulsing-dot {{
      width: 8px;
      height: 8px;
      background: var(--accent-favorable);
      border-radius: 50%;
      box-shadow: 0 0 8px var(--accent-favorable);
      animation: pulse 2s infinite;
    }}

    @keyframes pulse {{
      0% {{ opacity: 0.4; transform: scale(0.9); }}
      50% {{ opacity: 1; transform: scale(1.15); }}
      100% {{ opacity: 0.4; transform: scale(0.9); }}
    }}

    /* SVG do Relógio */
    .dial-container {{
      width: 100%;
      max-width: 380px;
      aspect-ratio: 1;
      position: relative;
      margin: 12px 0 16px;
    }}

    .dial-svg {{
      width: 100%;
      height: 100%;
      filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.7));
      overflow: visible;
    }}

    .sector-arc {{
      cursor: pointer;
      transition: all 0.3s ease;
      stroke: rgba(212, 175, 55, 0.35);
      stroke-width: 1.5;
    }}

    .sector-arc:hover {{
      filter: brightness(1.35);
      stroke: var(--gold-primary);
      stroke-width: 2.5;
    }}

    .sector-arc.active-sector {{
      stroke: var(--gold-light);
      stroke-width: 3;
      filter: drop-shadow(0 0 12px var(--gold-glow)) brightness(1.2);
    }}

    .sector-text {{
      font-family: var(--font-display);
      font-size: 18px;
      font-weight: 700;
      fill: #ffffff;
      pointer-events: none;
      text-anchor: middle;
      dominant-baseline: central;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.9));
    }}

    .dial-legend {{
      width: 100%;
      display: flex;
      justify-content: space-around;
      font-size: 0.8rem;
      color: var(--text-muted);
      margin-top: 8px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 10px;
    }}

    .dial-actions {{
      width: 100%;
      margin-top: 14px;
      display: flex;
      gap: 10px;
    }}

    .btn-secondary {{
      flex: 1;
      padding: 9px 12px;
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--text-main);
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(212, 175, 55, 0.25);
      border-radius: var(--radius-sm);
      cursor: pointer;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }}

    .btn-secondary:hover {{
      background: rgba(212, 175, 55, 0.12);
      border-color: var(--gold-primary);
      color: var(--gold-light);
    }}

    /* Coluna Direita: O Período em Evidência */
    .status-panel {{
      display: flex;
      flex-direction: column;
      gap: 24px;
    }}

    /* Alerta da Zona de Transição */
    .transition-banner {{
      background: var(--accent-transition-bg);
      border: 1px solid var(--accent-transition);
      border-left: 5px solid var(--accent-transition);
      border-radius: var(--radius-md);
      padding: 16px 20px;
      display: flex;
      align-items: flex-start;
      gap: 14px;
      box-shadow: 0 4px 18px rgba(245, 158, 11, 0.15);
      animation: fadeIn 0.4s ease-out;
    }}

    .transition-icon {{
      font-size: 1.6rem;
      line-height: 1;
    }}

    .transition-title {{
      font-family: var(--font-display);
      font-size: 1rem;
      font-weight: 700;
      color: #fbbf24;
      margin-bottom: 4px;
    }}

    .transition-desc {{
      font-size: 0.9rem;
      color: #fef3c7;
      line-height: 1.45;
    }}

    /* Card Principal do Ciclo Ativo */
    .active-card {{
      background: var(--bg-surface);
      border: 1px solid var(--border-gold);
      border-radius: var(--radius-lg);
      padding: 32px;
      box-shadow: var(--shadow-elevation);
      position: relative;
      overflow: hidden;
    }}

    .active-card::before {{
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 250px;
      height: 250px;
      background: radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%);
      pointer-events: none;
    }}

    .cycle-top-meta {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 20px;
      padding-bottom: 16px;
      border-bottom: 1px solid rgba(212, 175, 55, 0.15);
    }}

    .day-and-date {{
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-gold);
      display: flex;
      align-items: center;
      gap: 8px;
    }}

    .live-clock-badge {{
      font-family: var(--font-mono);
      font-size: 1.15rem;
      font-weight: 700;
      background: rgba(0, 0, 0, 0.4);
      padding: 6px 14px;
      border-radius: var(--radius-sm);
      border: 1px solid rgba(212, 175, 55, 0.3);
      color: #ffffff;
      letter-spacing: 1px;
    }}

    .hero-period-display {{
      display: flex;
      align-items: center;
      gap: 24px;
      margin-bottom: 24px;
    }}

    .letter-emblem {{
      width: 88px;
      height: 88px;
      min-width: 88px;
      background: linear-gradient(135deg, #1c2738, #0e1624);
      border: 2px solid var(--gold-primary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-display);
      font-size: 3rem;
      font-weight: 900;
      color: var(--gold-light);
      box-shadow: 0 0 24px var(--gold-glow);
      position: relative;
    }}

    .period-title-group h2 {{
      font-family: var(--font-display);
      font-size: clamp(1.4rem, 2.5vw, 1.9rem);
      font-weight: 700;
      color: #ffffff;
      line-height: 1.25;
      margin-bottom: 6px;
    }}

    .period-tagline {{
      font-family: var(--font-serif);
      font-size: 1.15rem;
      font-style: italic;
      color: var(--gold-light);
    }}

    /* Grid de Métricas de Horário */
    .time-metrics {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 14px;
      margin-bottom: 28px;
    }}

    .metric-box {{
      background: rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(212, 175, 55, 0.18);
      border-radius: var(--radius-md);
      padding: 12px 16px;
      text-align: center;
    }}

    .metric-label {{
      font-size: 0.76rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--text-muted);
      margin-bottom: 4px;
      font-weight: 600;
    }}

    .metric-val {{
      font-family: var(--font-mono);
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--text-main);
    }}

    .metric-val.highlight {{
      color: var(--gold-light);
    }}

    /* Seções Detalhadas de Conteúdo */
    .nature-block {{
      background: rgba(22, 32, 50, 0.7);
      border-left: 4px solid var(--gold-primary);
      border-radius: 0 var(--radius-md) var(--radius-md) 0;
      padding: 18px 20px;
      margin-bottom: 28px;
      font-size: 0.98rem;
      color: #d1d5db;
      line-height: 1.65;
    }}

    .nature-block strong {{
      color: var(--gold-light);
      font-family: var(--font-display);
      font-size: 0.95rem;
      display: block;
      margin-bottom: 4px;
    }}

    .guidance-grid {{
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
      margin-bottom: 28px;
    }}

    @media (min-width: 768px) {{
      .guidance-grid {{
        grid-template-columns: 1fr 1fr;
      }}
    }}

    .guidance-card {{
      background: var(--bg-card);
      border-radius: var(--radius-md);
      padding: 22px;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }}

    .guidance-card.favorable {{
      border-top: 4px solid var(--accent-favorable);
    }}

    .guidance-card.avoid {{
      border-top: 4px solid var(--accent-avoid);
    }}

    .guidance-header {{
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 16px;
    }}

    .guidance-header h3 {{
      font-family: var(--font-display);
      font-size: 1.05rem;
      font-weight: 700;
    }}

    .guidance-card.favorable h3 {{
      color: #34d399;
    }}

    .guidance-card.avoid h3 {{
      color: #f87171;
    }}

    .guidance-list {{
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }}

    .guidance-list li {{
      font-size: 0.9rem;
      line-height: 1.5;
      color: #e5e7eb;
      position: relative;
      padding-left: 22px;
    }}

    .guidance-card.favorable .guidance-list li::before {{
      content: '✔';
      position: absolute;
      left: 0;
      color: var(--accent-favorable);
      font-size: 0.85rem;
      font-weight: bold;
    }}

    .guidance-card.avoid .guidance-list li::before {{
      content: '✖';
      position: absolute;
      left: 0;
      color: var(--accent-avoid);
      font-size: 0.85rem;
      font-weight: bold;
    }}

    /* Próximo Período */
    .next-period-bar {{
      background: linear-gradient(90deg, rgba(20, 28, 42, 0.9), rgba(28, 41, 64, 0.9));
      border: 1px solid rgba(212, 175, 55, 0.2);
      border-radius: var(--radius-md);
      padding: 16px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
    }}

    .next-meta {{
      display: flex;
      align-items: center;
      gap: 12px;
    }}

    .next-letter-pill {{
      background: var(--gold-primary);
      color: #000000;
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 1.1rem;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }}

    .next-info h4 {{
      font-family: var(--font-display);
      font-size: 0.95rem;
      color: #ffffff;
    }}

    .next-info p {{
      font-size: 0.82rem;
      color: var(--text-muted);
    }}

    /* ==========================================================================
       4. SEÇÃO DO CAPÍTULO 12: MODO "MOMENTO DE INÍCIO" / CONSULTA RETROSPECTIVA
       ========================================================================== */
    .retrospective-section {{
      background: var(--bg-surface);
      border: 1px solid var(--border-gold);
      border-radius: var(--radius-lg);
      padding: 32px;
      margin-bottom: 48px;
      box-shadow: var(--shadow-elevation);
    }}

    .section-headline {{
      font-family: var(--font-display);
      font-size: 1.6rem;
      font-weight: 700;
      color: var(--gold-light);
      margin-bottom: 8px;
    }}

    .section-subhead {{
      font-size: 0.95rem;
      color: var(--text-muted);
      margin-bottom: 24px;
      max-width: 800px;
    }}

    .genesis-rule-callout {{
      background: rgba(212, 175, 55, 0.08);
      border: 1px solid rgba(212, 175, 55, 0.25);
      border-radius: var(--radius-md);
      padding: 18px 22px;
      margin-bottom: 28px;
      font-family: var(--font-serif);
      font-size: 1.1rem;
      color: #f3f4f6;
      font-style: italic;
      line-height: 1.6;
    }}

    .genesis-rule-callout strong {{
      color: var(--gold-light);
      font-style: normal;
      font-family: var(--font-body);
      font-size: 0.88rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      display: block;
      margin-bottom: 6px;
    }}

    .retro-form-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
      align-items: end;
      margin-bottom: 24px;
    }}

    .form-group {{
      display: flex;
      flex-direction: column;
      gap: 6px;
    }}

    .form-group label {{
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-gold);
    }}

    .input-control {{
      background: var(--bg-dark);
      border: 1px solid rgba(212, 175, 55, 0.3);
      border-radius: var(--radius-sm);
      color: #ffffff;
      padding: 10px 14px;
      font-family: var(--font-mono);
      font-size: 0.95rem;
      outline: none;
      transition: border-color 0.2s ease;
    }}

    .input-control:focus {{
      border-color: var(--gold-primary);
      box-shadow: 0 0 10px var(--gold-glow);
    }}

    .btn-primary {{
      background: linear-gradient(135deg, var(--gold-primary), #b38728);
      color: #0a0e17;
      border: none;
      border-radius: var(--radius-sm);
      padding: 12px 24px;
      font-family: var(--font-display);
      font-size: 0.95rem;
      font-weight: 700;
      letter-spacing: 0.5px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
    }}

    .btn-primary:hover {{
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(212, 175, 55, 0.5);
      filter: brightness(1.1);
    }}

    .retro-result-box {{
      margin-top: 24px;
      padding: 24px;
      background: var(--bg-card);
      border: 1px solid var(--gold-primary);
      border-radius: var(--radius-md);
      display: none;
      animation: fadeIn 0.4s ease;
    }}

    /* ==========================================================================
       5. MATRIZ SEMANAL INTERATIVA (TABELA E - PÁGINA 105)
       ========================================================================== */
    .matrix-section {{
      background: var(--bg-surface);
      border: 1px solid var(--border-gold);
      border-radius: var(--radius-lg);
      padding: 32px;
      margin-bottom: 48px;
      box-shadow: var(--shadow-elevation);
    }}

    .table-responsive {{
      overflow-x: auto;
      margin-top: 20px;
      border-radius: var(--radius-md);
      border: 1px solid rgba(212, 175, 55, 0.2);
    }}

    .cycles-table {{
      width: 100%;
      border-collapse: collapse;
      text-align: center;
      font-size: 0.92rem;
      min-width: 680px;
    }}

    .cycles-table th, .cycles-table td {{
      padding: 14px 12px;
      border: 1px solid rgba(212, 175, 55, 0.15);
    }}

    .cycles-table th {{
      background: rgba(28, 41, 64, 0.9);
      font-family: var(--font-display);
      font-weight: 700;
      color: var(--gold-light);
      letter-spacing: 0.5px;
    }}

    .cycles-table th.th-time {{
      background: rgba(15, 23, 42, 0.95);
      width: 130px;
      font-family: var(--font-mono);
      font-size: 0.85rem;
    }}

    .cycles-table tbody tr:nth-child(even) {{
      background: rgba(255, 255, 255, 0.02);
    }}

    .cycles-table td.time-cell {{
      font-family: var(--font-mono);
      font-size: 0.85rem;
      color: var(--text-muted);
      background: rgba(10, 14, 23, 0.8);
      font-weight: 600;
    }}

    .matrix-letter-cell {{
      font-family: var(--font-display);
      font-size: 1.25rem;
      font-weight: 800;
      color: #ffffff;
      cursor: pointer;
      transition: all 0.25s ease;
      position: relative;
    }}

    .matrix-letter-cell:hover {{
      background: rgba(212, 175, 55, 0.18);
      color: var(--gold-light);
      transform: scale(1.08);
    }}

    .matrix-letter-cell.active-now {{
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.35), rgba(212, 175, 55, 0.12));
      color: var(--gold-light);
      box-shadow: inset 0 0 14px var(--gold-glow);
      border: 2px solid var(--gold-primary);
      animation: pulseCell 2s infinite;
    }}

    @keyframes pulseCell {{
      0% {{ box-shadow: inset 0 0 8px var(--gold-glow); }}
      50% {{ box-shadow: inset 0 0 20px var(--gold-glow); }}
      100% {{ box-shadow: inset 0 0 8px var(--gold-glow); }}
    }}

    /* ==========================================================================
       6. SEÇÃO EDUCATIVA E HISTÓRICA: O LIVRO E SUAS REGRAS
       ========================================================================== */
    .education-section {{
      background: var(--bg-surface);
      border: 1px solid var(--border-gold);
      border-radius: var(--radius-lg);
      padding: 36px;
      margin-bottom: 48px;
    }}

    .edu-grid {{
      display: grid;
      grid-template-columns: 1fr;
      gap: 28px;
      margin-top: 24px;
    }}

    @media (min-width: 768px) {{
      .edu-grid {{
        grid-template-columns: repeat(3, 1fr);
      }}
    }}

    .edu-card {{
      background: var(--bg-card);
      border-radius: var(--radius-md);
      padding: 24px;
      border-top: 3px solid var(--gold-primary);
    }}

    .edu-card h4 {{
      font-family: var(--font-display);
      font-size: 1.05rem;
      color: var(--gold-light);
      margin-bottom: 12px;
    }}

    .edu-card p {{
      font-size: 0.9rem;
      color: #d1d5db;
      line-height: 1.6;
    }}

    /* Isenção de Responsabilidade Ética */
    .disclaimer-card {{
      background: rgba(15, 23, 42, 0.7);
      border: 1px solid rgba(212, 175, 55, 0.2);
      border-radius: var(--radius-md);
      padding: 22px;
      margin-top: 32px;
      font-size: 0.85rem;
      color: #9ca3af;
      line-height: 1.6;
    }}

    .disclaimer-card strong {{
      color: #e5e7eb;
    }}

    /* Modal do Chart D Original */
    .modal-backdrop {{
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(8px);
      display: none;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      padding: 20px;
    }}

    .modal-box {{
      background: var(--bg-surface);
      border: 1px solid var(--gold-primary);
      border-radius: var(--radius-lg);
      max-width: 650px;
      width: 100%;
      padding: 24px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.9);
      position: relative;
    }}

    .modal-close {{
      position: absolute;
      top: 14px;
      right: 18px;
      font-size: 1.8rem;
      color: var(--text-muted);
      cursor: pointer;
      line-height: 1;
      border: none;
      background: transparent;
    }}

    .modal-close:hover {{
      color: #ffffff;
    }}

    .modal-img {{
      width: 100%;
      height: auto;
      border-radius: var(--radius-md);
      border: 1px solid rgba(212, 175, 55, 0.2);
      margin: 16px 0;
      background: #ffffff;
    }}

    /* ==========================================================================
       7. RODAPÉ OBRIGATÓRIO (CRÍTICO: ÚLTIMA LINHA COM O LINK AZUL EXATO)
       ========================================================================== */
    .site-footer {{
      margin-top: auto;
      background: #06090f;
      border-top: 1px solid rgba(212, 175, 55, 0.2);
      padding: 36px 0 28px;
      text-align: center;
    }}

    .footer-quote {{
      font-family: var(--font-serif);
      font-size: 1.05rem;
      font-style: italic;
      color: var(--gold-light);
      margin-bottom: 8px;
    }}

    .footer-meta {{
      font-size: 0.84rem;
      color: var(--text-muted);
      margin-bottom: 14px;
    }}

    /* Link da Fonte Rosacruz e Download gratuito do livro */
    .footer-rosicrucian-source {{
      background: rgba(212, 175, 55, 0.05);
      border: 1px solid rgba(212, 175, 55, 0.2);
      border-radius: var(--radius-md);
      max-width: 760px;
      margin: 0 auto 20px;
      padding: 12px 18px;
      font-size: 0.88rem;
      color: #e5e7eb;
      line-height: 1.5;
    }}

    .footer-rosicrucian-source strong {{
      color: var(--gold-light);
    }}

    .footer-rosicrucian-link {{
      color: #38bdf8 !important;
      text-decoration: underline;
      font-weight: 600;
      word-break: break-all;
      display: inline-block;
      margin-top: 4px;
      transition: color 0.2s ease;
    }}

    .footer-rosicrucian-link:hover {{
      color: #7dd3fc !important;
    }}

    .footer-signature {{
      font-size: 0.95rem;
      font-weight: 700;
      letter-spacing: 1px;
      color: #ffffff;
      padding-top: 16px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      margin-top: 16px;
    }}

    /* Estilo inegociável exigido pelo usuário: hiperlink azul */
    .footer-signature a {{
      color: #2563eb !important;
      text-decoration: underline;
      transition: color 0.2s ease;
    }}

    .footer-signature a:hover {{
      color: #3b82f6 !important;
    }}

    /* Utilitários */
    @keyframes fadeIn {{
      from {{ opacity: 0; transform: translateY(6px); }}
      to {{ opacity: 1; transform: translateY(0); }}
    }}
  </style>
</head>
<body>

  <!-- ========================================================================= -->
  <!-- TOPO: CABEÇALHO DA APLICAÇÃO                                              -->
  <!-- ========================================================================= -->
  <header class="site-header">
    <div class="container">
      <div class="badge-sublime">
        <span>✦</span> Obra Clássica de 1929 • Capítulos 11, 12 e 13 <span>✦</span>
      </div>
      <h1 class="site-title">
        SISTEMA DOS CICLOS DIÁRIOS <span>HARVEY SPENCER LEWIS</span>
      </h1>
      <p class="site-subtitle">
        Autodomínio e Destino com os Ciclos da Vida • As 24 horas divididas em sete períodos cósmicos de <strong>3h 25m 43s</strong>
      </p>

      <!-- Botões de Modo / Visualização -->
      <nav class="view-mode-tabs" aria-label="Navegação do Sistema">
        <button class="tab-btn active" id="btn-tab-live" onclick="app.switchTab('live')">
          <span>⏱</span> Relógio Cósmico em Tempo Real
        </button>
        <button class="tab-btn" id="btn-tab-matrix" onclick="app.switchTab('matrix')">
          <span>📅</span> Tabela Semanal (Pág. 105)
        </button>
        <button class="tab-btn" id="btn-tab-retro" onclick="app.switchTab('retro')">
          <span>🔍</span> Modo "Momento de Início" (Cap. 12)
        </button>
      </nav>
    </div>
  </header>

  <!-- ========================================================================= -->
  <!-- CONTEÚDO PRINCIPAL                                                        -->
  <!-- ========================================================================= -->
  <main class="container">

    <!-- SEÇÃO 1: RELÓGIO DE 24H E CICLO ATIVO EM TEMPO REAL -->
    <div class="main-grid" id="section-live">
      
      <!-- Coluna do Mostrador Vetorial 24H (Inspirado no Chart D da Página 103) -->
      <aside class="dial-card">
        <div class="dial-header">
          <div class="dial-title">MOSTRADOR DE 24 HORAS</div>
          <div class="clock-live-indicator">
            <div class="pulsing-dot"></div>
            <span id="live-status-tag">AO VIVO</span>
          </div>
        </div>

        <!-- SVG do Relógio Polar de 24 Horas -->
        <div class="dial-container">
          <svg class="dial-svg" id="dial-svg" viewBox="-220 -220 440 440" aria-label="Relógio Cósmico de 24 Horas"></svg>
        </div>

        <div class="dial-legend">
          <span>Meia-noite (00:00) ao Topo</span>
          <span>Meio-dia (12:00) à Base</span>
        </div>

        <div class="dial-actions">
          <button class="btn-secondary" onclick="app.openChartDModal()">
            <span>📜</span> Ver Chart D Original (1929)
          </button>
          <button class="btn-secondary" onclick="app.resetToCurrentTime()">
            <span>↺</span> Resetar para Agora
          </button>
        </div>
      </aside>

      <!-- Coluna com as Informações do Período Ativo -->
      <section class="status-panel">

        <!-- Banner de Alerta para Zona de Transição (±5 minutos) -->
        <div class="transition-banner" id="transition-banner" style="display: none;">
          <div class="transition-icon">⚠️</div>
          <div>
            <div class="transition-title" id="transition-title">ZONA DE TRANSIÇÃO CÓSMICA</div>
            <div class="transition-desc" id="transition-desc">
              Segundo o Cap. 11 de Harvey Spencer Lewis, uma margem de alguns minutos antes e depois dos limiares deve ser concedida para que as influências do novo ciclo se estabeleçam com plenitude.
            </div>
          </div>
        </div>

        <!-- Card Monumental do Período em Vigor -->
        <article class="active-card" id="active-card">
          <div class="cycle-top-meta">
            <div class="day-and-date">
              <span id="display-weekday">Segunda-feira</span> • 
              <span id="display-date" style="color: var(--text-muted); font-weight: 400;">--/--/----</span>
            </div>
            <div class="live-clock-badge" id="display-digital-clock">00:00:00</div>
          </div>

          <div class="hero-period-display">
            <div class="letter-emblem" id="display-letter">?</div>
            <div class="period-title-group">
              <h2 id="display-title">Carregando período...</h2>
              <div class="period-tagline" id="display-tagline">Identificando frequências do dia</div>
            </div>
          </div>

          <!-- Métricas de Tempo -->
          <div class="time-metrics">
            <div class="metric-box">
              <div class="metric-label">Período</div>
              <div class="metric-val" id="display-period-num">Nº - de 7</div>
            </div>
            <div class="metric-box">
              <div class="metric-label">Início Oficial</div>
              <div class="metric-val" id="display-start-time">--:--</div>
            </div>
            <div class="metric-box">
              <div class="metric-label">Término Oficial</div>
              <div class="metric-val" id="display-end-time">--:--</div>
            </div>
            <div class="metric-box">
              <div class="metric-label">Tempo Restante</div>
              <div class="metric-val highlight" id="display-countdown">--:--:--</div>
            </div>
          </div>

          <!-- Características & Natureza Vibratória -->
          <div class="nature-block">
            <strong>NATUREZA E VIBRAÇÃO DO PERÍODO</strong>
            <p id="display-nature">
              Aguarde a inicialização dos cálculos matemáticos astronômicos...
            </p>
          </div>

          <!-- Atividades: Favoráveis vs. Evitar -->
          <div class="guidance-grid">
            <div class="guidance-card favorable">
              <div class="guidance-header">
                <span>🌟</span>
                <h3>FAVORECE SEGUNDO A OBRA</h3>
              </div>
              <ul class="guidance-list" id="display-favors">
                <li>Carregando recomendações...</li>
              </ul>
            </div>

            <div class="guidance-card avoid">
              <div class="guidance-header">
                <span>⚠️</span>
                <h3>EVITAR SEGUNDO A OBRA</h3>
              </div>
              <ul class="guidance-list" id="display-avoids">
                <li>Carregando advertências...</li>
              </ul>
            </div>
          </div>

          <!-- Próximo Período -->
          <div class="next-period-bar">
            <div class="next-meta">
              <div class="next-letter-pill" id="next-letter">?</div>
              <div class="next-info">
                <h4 id="next-title">Próximo Período: --</h4>
                <p id="next-timing">Inicia aproximadamente às --:--</p>
              </div>
            </div>
            <button class="btn-secondary" id="btn-inspect-next" onclick="app.inspectNextPeriod()">
              Inspecionar Detalhes →
            </button>
          </div>

        </article>

      </section>

    </div>

    <!-- SEÇÃO 2: MATRIZ SEMANAL INTERATIVA (TABELA E - PÁGINA 105) -->
    <section class="matrix-section" id="section-matrix" style="display: none;">
      <h2 class="section-headline">TABELA DOS CICLOS SEMANAIS</h2>
      <p class="section-subhead">
        Mapeamento fiel do <strong>Gráfico E (página 105)</strong> do livro. O número do período permanece fixo no relógio, porém o dia da semana atribui uma nova letra e um novo significado a cada intervalo horário.
      </p>

      <div class="table-responsive">
        <table class="cycles-table" id="matrix-table">
          <thead>
            <tr>
              <th class="th-time">Horário Oficial</th>
              <th>Domingo</th>
              <th>Segunda</th>
              <th>Terça</th>
              <th>Quarta</th>
              <th>Quinta</th>
              <th>Sexta</th>
              <th>Sábado</th>
            </tr>
          </thead>
          <tbody id="matrix-body">
            <!-- Gerado via JavaScript -->
          </tbody>
        </table>
      </div>
      <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 14px; text-align: right;">
        💡 <em>Dica: Clique em qualquer letra da tabela para inspecionar as características completas daquele período.</em>
      </p>
    </section>

    <!-- SEÇÃO 3: MODO "MOMENTO DE INÍCIO" / CONSULTA RETROSPECTIVA (CAPÍTULO 12) -->
    <section class="retrospective-section" id="section-retro" style="display: none;">
      <h2 class="section-headline">MODO: MOMENTO DE INÍCIO (GÊNESE DO EVENTO)</h2>
      <p class="section-subhead">
        Em qual ciclo uma proposta, contato, reunião ou contrato surgiu pela primeira vez em sua vida?
      </p>

      <div class="genesis-rule-callout">
        <strong>A Regra Fundamental do Capítulo 12 de Harvey Spencer Lewis:</strong>
        "O momento em que a proposta entrou pela primeira vez em sua vida é aquele que governa o seu desfecho. Adiar artificialmente a assinatura de um contrato desfavorável para um período propício posterior não altera a sua influência cósmica originária."
      </div>

      <div class="retro-form-grid">
        <div class="form-group">
          <label for="retro-date">Data do Acontecimento:</label>
          <input type="date" id="retro-date" class="input-control">
        </div>
        <div class="form-group">
          <label for="retro-time">Horário da Proposta/Fato:</label>
          <input type="time" id="retro-time" class="input-control" step="60">
        </div>
        <div class="form-group">
          <button class="btn-primary" onclick="app.calculateRetroGenesis()">
            <span>✦</span> Determinar Ciclo de Gênese
          </button>
        </div>
      </div>

      <!-- Caixa de Resposta da Consulta Retrospectiva -->
      <div class="retro-result-box" id="retro-result-box">
        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
          <div class="letter-emblem" id="retro-letter" style="width: 64px; height: 64px; min-width: 64px; font-size: 2.2rem;">?</div>
          <div>
            <h3 id="retro-title" style="font-family: var(--font-display); color: #ffffff; font-size: 1.3rem;">--</h3>
            <p id="retro-meta" style="color: var(--gold-light); font-size: 0.9rem;">--</p>
          </div>
        </div>
        <p id="retro-interpretation" style="color: #e5e7eb; font-size: 0.95rem; line-height: 1.6; margin-bottom: 16px;"></p>
        <button class="btn-secondary" onclick="app.loadPeriodInMainView(app.lastRetroPeriod, app.lastRetroWeekday)">
          Carregar Relatório Completo deste Período ↑
        </button>
      </div>
    </section>

    <!-- SEÇÃO 4: FUNDAMENTOS DA OBRA E AVISOS ÉTICOS -->
    <section class="education-section">
      <h2 class="section-headline">FUNDAMENTOS DOS CICLOS DIÁRIOS</h2>
      <p class="section-subhead">
        Princípios estabelecidos por Harvey Spencer Lewis, F.R.C., em <em>Self-Mastery and Fate with the Cycles of Life</em>.
      </p>

      <div class="edu-grid">
        <div class="edu-card">
          <h4>1. O Ritmo Setenário de 24h</h4>
          <p>
            Assim como a escala musical se divide em 7 notas fundamentais (de A a G), o dia de 24 horas divide-se em 7 períodos matemáticos de aproximadamente 3 horas, 25 minutos e 43 segundos. O meio-dia solar é o centro exato do ciclo diário.
          </p>
        </div>
        <div class="edu-card">
          <h4>2. O Princípio da Importância</h4>
          <p>
            O autor ensina expressamente que não é necessário olhar o relógio para ninharias e fatos triviais do cotidiano. A consulta ao sistema eleva-se em relevância conforme a decisão envolve maior discernimento, riscos ou repercussão duradoura.
          </p>
        </div>
        <div class="edu-card">
          <h4>3. Horário Padrão vs. Horário de Verão</h4>
          <p>
            Lewis adverte que alterações civis temporárias do relógio (como horário de verão) devem ser sumariamente desconsideradas, preservando-se o horário padrão solar relacionado ao meridiano de Greenwich da localidade.
          </p>
        </div>
      </div>

      <div class="disclaimer-card">
        <strong>Nota Histórica, Ética e Isenção de Responsabilidade:</strong>
        Esta aplicação reproduz com máxima fidelidade textual e matemática o sistema histórico e esotérico publicado em 1929 por Harvey Spencer Lewis. As descrições relativas a saúde, cirurgias, medicamentos, investimentos financeiros, especulação ou litígios judiciais refletem exclusivamente o conteúdo filosófico do autor original, não devendo, sob hipótese alguma, substituir aconselhamento médico profissional, jurídico ou financeiro qualificado contemporâneo.
      </div>
    </section>

  </main>

  <!-- ========================================================================= -->
  <!-- MODAL DO CHART D ORIGINAL (ESCANEADO DA PÁGINA 103)                        -->
  <!-- ========================================================================= -->
  <div class="modal-backdrop" id="chart-modal" onclick="app.closeChartDModal(event)">
    <div class="modal-box">
      <button class="modal-close" onclick="app.closeChartDModal()">&times;</button>
      <h3 style="font-family: var(--font-display); color: var(--gold-light); font-size: 1.25rem;">
        CHART D • O RELÓGIO DE 24 HORAS ORIGINAL (1929)
      </h3>
      <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 4px;">
        Reprodução fac-símile da página 103 do livro de Harvey Spencer Lewis.
      </p>
      <img src="chart_d.png" alt="Chart D Original - Relógio de 24 horas de Harvey Spencer Lewis" class="modal-img" onerror="this.src='../chart_d.png'">
      <p style="font-size: 0.82rem; color: #d1d5db; line-height: 1.5;">
        Observe como meia-noite está no topo e meio-dia na base inferior. Todas as horas de um lado representam A.M. e do outro representam P.M., dividindo as 24 horas nos 7 períodos harmônicos.
      </p>
    </div>
  </div>

  <!-- ========================================================================= -->
  <!-- RODAPÉ OBRIGATÓRIO (CRÍTICO: ÚLTIMA LINHA COM LINK AZUL EXATO)            -->
  <!-- ========================================================================= -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-quote">
        "O homem que conhece as marés do Cósmico navega com a correnteza, e não contra ela."
      </div>
      <div class="footer-meta">
        Baseado em <em>Self-Mastery and Fate with the Cycles of Life</em> de Harvey Spencer Lewis, F.R.C., Ph.D.
      </div>

      <!-- Fonte Oficial Rosacruz e Download Gratuito do Livro -->
      <div class="footer-rosicrucian-source">
        <strong>Fonte da Obra e Download Gratuito do Livro (em inglês):</strong><br>
        Disponibilizado publicamente pela Grande Loja da Jurisdição de Língua Inglesa da Ordem Rosacruz (AMORC):<br>
        <a href="https://www.rosicrucian.org/rosicrucian-books-self-mastery-and-fate-with-the-cycles-of-life" target="_blank" rel="noopener noreferrer" class="footer-rosicrucian-link">
          https://www.rosicrucian.org/rosicrucian-books-self-mastery-and-fate-with-the-cycles-of-life
        </a>
      </div>
      
      <!-- AVISO CRÍTICO: Regra inegociável do usuário - Última coisa escrita no rodapé -->
      <div class="footer-signature">
        SITE DESENVOLVIDO POR <a href="https://siteprofissional.pro" target="_blank" rel="noopener noreferrer" style="color: #2563eb !important; text-decoration: underline; font-weight: bold;">SITEPROFISSIONAL.PRO</a>
      </div>
    </div>
  </footer>

  <!-- ========================================================================= -->
  <!-- JAVASCRIPT REATIVO E COMENTADO EM PORTUGUÊS (ARQUITETURA LIMPA)           -->
  <!-- ========================================================================= -->
  <script>
    /**
     * SISTEMA DOS CICLOS DIÁRIOS - HARVEY SPENCER LEWIS
     * Implementação matemática, vetorial e reativa fiel à obra original.
     */

    // Constante da duração de 1 período: 24 horas divididas por 7
    // 86.400 segundos / 7 = 12.342,857142857143 segundos (3h 25m 42.857s)
    const PERIOD_DURATION_SEC = 86400 / 7;

    // Horários oficiais arredondados apresentados pelo autor no livro
    const BOOK_BOUNDS = [
      {{ num: 1, start: "00:00", end: "03:25" }},
      {{ num: 2, start: "03:25", end: "06:51" }},
      {{ num: 3, start: "06:51", end: "10:17" }},
      {{ num: 4, start: "10:17", end: "13:42" }},
      {{ num: 5, start: "13:42", end: "17:08" }},
      {{ num: 6, start: "17:08", end: "20:34" }},
      {{ num: 7, start: "20:34", end: "00:00" }}
    ];

    // Matriz Semanal (Página 105 - Tabela E)
    // 0: Domingo, 1: Segunda, 2: Terça, 3: Quarta, 4: Quinta, 5: Sexta, 6: Sábado
    const WEEK_MATRIX = {{
      0: ["G", "A", "B", "C", "D", "E", "F"], // Domingo
      1: ["C", "D", "E", "F", "G", "A", "B"], // Segunda
      2: ["F", "G", "A", "B", "C", "D", "E"], // Terça
      3: ["B", "C", "D", "E", "F", "G", "A"], // Quarta
      4: ["E", "F", "G", "A", "B", "C", "D"], // Quinta
      5: ["A", "B", "C", "D", "E", "F", "G"], // Sexta
      6: ["D", "E", "F", "G", "A", "B", "C"]  // Sábado
    }};

    const WEEKDAY_NAMES = [
      "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira",
      "Quinta-feira", "Sexta-feira", "Sábado"
    ];

    // Banco de Dados completo e fidedigno dos Períodos A a G
    const PERIOD_DETAILS = {periods_json};

    /**
     * Classe controladora principal da aplicação
     */
    class CosmicCyclesApp {{
      constructor() {{
        this.selectedWeekday = null;
        this.selectedPeriodIdx = null;
        this.isCustomInspection = false;
        this.timerInterval = null;
        this.lastRetroPeriod = null;
        this.lastRetroWeekday = null;
      }}

      /**
       * Inicialização do sistema
       */
      init() {{
        this.buildMatrixTable();
        this.initRetroDefaults();
        
        // Atualização em tempo real (a cada 1 segundo)
        this.updateLiveTick();
        this.timerInterval = setInterval(() => this.updateLiveTick(), 1000);

        console.log("Sistema dos Ciclos Diários carregado com sucesso!");
      }}

      /**
       * Cálculo exato das horas e períodos
       */
      calculateCycle(dateObj) {{
        const weekday = dateObj.getDay(); // 0 a 6
        const hours = dateObj.getHours();
        const minutes = dateObj.getMinutes();
        const seconds = dateObj.getSeconds();

        // Segundos totais desde a meia-noite (0 a 86399)
        const totalSec = (hours * 3600) + (minutes * 60) + seconds;

        // Índice do período de 0 a 6 (período 1 a 7)
        const periodIdx = Math.min(6, Math.floor(totalSec / PERIOD_DURATION_SEC));
        const periodNum = periodIdx + 1;
        const letter = WEEK_MATRIX[weekday][periodIdx];

        // Segundos decorridos no período atual e tempo restante
        const secIntoPeriod = totalSec - (periodIdx * PERIOD_DURATION_SEC);
        const secRemaining = Math.max(0, PERIOD_DURATION_SEC - secIntoPeriod);

        // Verificação da Zona de Transição: ±5 minutos (300 segundos)
        let isTransition = false;
        let transitionMsg = "";
        let transitionTitle = "";

        if (secIntoPeriod <= 300) {{
          // Primeiros 5 minutos do período
          const prevIdx = (periodIdx - 1 + 7) % 7;
          const prevLetter = WEEK_MATRIX[weekday][prevIdx];
          isTransition = true;
          transitionTitle = `TRANSIÇÃO ${{prevLetter}} → ${{letter}}`;
          transitionMsg = `Transição recente de ${{prevLetter}} para ${{letter}}. Segundo Harvey Spencer Lewis (Cap. 11), alguns minutos devem ser concedidos no início do ciclo para que as condições cósmicas se estabeleçam plenamente.`;
        }} else if (secRemaining <= 300) {{
          // Últimos 5 minutos do período
          const nextIdx = (periodIdx + 1) % 7;
          const nextLetter = WEEK_MATRIX[weekday][nextIdx];
          isTransition = true;
          transitionTitle = `TRANSIÇÃO IMINENTE ${{letter}} → ${{nextLetter}}`;
          transitionMsg = `O período ${{letter}} está findando e o período ${{nextLetter}} se aproxima. O livro recomenda cautela durante os minutos de transição limítrofe.`;
        }}

        // Horários arredondados do livro
        const bounds = BOOK_BOUNDS[periodIdx];

        // Próximo período
        const nextIdx = (periodIdx + 1) % 7;
        const nextLetter = WEEK_MATRIX[weekday][nextIdx];
        const nextBounds = BOOK_BOUNDS[nextIdx];

        return {{
          weekday,
          periodIdx,
          periodNum,
          letter,
          secIntoPeriod,
          secRemaining,
          isTransition,
          transitionTitle,
          transitionMsg,
          bounds,
          nextIdx,
          nextLetter,
          nextBounds,
          totalSec
        }};
      }}

      /**
       * Loop contínuo de atualização visual (Relógio e Contadores)
       */
      updateLiveTick() {{
        const now = new Date();

        // Relógio digital no topo
        const hh = String(now.getHours()).padStart(2, '0');
        const mm = String(now.getMinutes()).padStart(2, '0');
        const ss = String(now.getSeconds()).padStart(2, '0');
        const digitalStr = `${{hh}}:${{mm}}:${{ss}}`;
        const clockEl = document.getElementById("display-digital-clock");
        if (clockEl) clockEl.innerText = digitalStr;

        // Data por extenso
        const dateEl = document.getElementById("display-date");
        if (dateEl) {{
          dateEl.innerText = now.toLocaleDateString('pt-BR', {{ day: '2-digit', month: 'long', year: 'numeric' }});
        }}

        const weekdayEl = document.getElementById("display-weekday");
        if (weekdayEl) weekdayEl.innerText = WEEKDAY_NAMES[now.getDay()];

        // Cálculo atual do ciclo cósmico
        const cycle = this.calculateCycle(now);

        // Se o usuário não estiver inspecionando manualmente outro setor, atualiza o painel principal
        if (!this.isCustomInspection) {{
          this.renderCycleDisplay(cycle.letter, cycle.periodNum, cycle.bounds, cycle.secRemaining, cycle.nextLetter, cycle.nextBounds, cycle.isTransition, cycle.transitionTitle, cycle.transitionMsg);
        }} else {{
          // Atualiza apenas o contador regressivo se for o mesmo período
          this.updateCountdownDisplay(cycle.secRemaining);
        }}

        // Atualiza o SVG do mostrador polar com o ângulo do ponteiro
        this.renderDialSvg(now.getDay(), cycle.periodIdx, cycle.totalSec);

        // Marca a célula ativa na tabela
        this.highlightMatrixActiveCell(now.getDay(), cycle.periodIdx);
      }}

      /**
       * Renderiza o Painel de Exibição do Período
       */
      renderCycleDisplay(letter, periodNum, bounds, secRemaining, nextLetter, nextBounds, isTransition, transTitle, transMsg) {{
        const details = PERIOD_DETAILS[letter];
        if (!details) return;

        // Letra, Título e Tagline
        document.getElementById("display-letter").innerText = letter;
        document.getElementById("display-title").innerText = `PERÍODO "${{letter}}" — ${{details.title}}`;
        document.getElementById("display-tagline").innerText = details.tagline;

        // Horários e Número do Período
        document.getElementById("display-period-num").innerText = `Nº ${{periodNum}} de 7`;
        document.getElementById("display-start-time").innerText = bounds.start;
        document.getElementById("display-end-time").innerText = bounds.end;
        this.updateCountdownDisplay(secRemaining);

        // Natureza Cósmica
        document.getElementById("display-nature").innerText = details.nature;

        // Listas de Favoráveis e Evitar
        const favList = document.getElementById("display-favors");
        favList.innerHTML = details.favors.map(item => `<li>${{item}}</li>`).join('');

        const avoidList = document.getElementById("display-avoids");
        avoidList.innerHTML = details.avoids.map(item => `<li>${{item}}</li>`).join('');

        // Próximo Período
        const nextDetails = PERIOD_DETAILS[nextLetter];
        document.getElementById("next-letter").innerText = nextLetter;
        document.getElementById("next-title").innerText = `Próximo Período: "${{nextLetter}}" — ${{nextDetails ? nextDetails.title : ''}}`;
        document.getElementById("next-timing").innerText = `Inicia aproximadamente às ${{nextBounds.start}} (vai até ${{nextBounds.end}})`;

        // Banner de Transição
        const transBanner = document.getElementById("transition-banner");
        if (isTransition) {{
          transBanner.style.display = "flex";
          document.getElementById("transition-title").innerText = transTitle;
          document.getElementById("transition-desc").innerText = transMsg;
        }} else {{
          transBanner.style.display = "none";
        }}
      }}

      /**
       * Formata e exibe o tempo restante
       */
      updateCountdownDisplay(secRemaining) {{
        const countEl = document.getElementById("display-countdown");
        if (!countEl) return;

        if (this.isCustomInspection) {{
          countEl.innerText = "Modo Inspeção";
          return;
        }}

        const hrs = Math.floor(secRemaining / 3600);
        const mins = Math.floor((secRemaining % 3600) / 60);
        const secs = Math.floor(secRemaining % 60);
        countEl.innerText = `${{String(hrs).padStart(2, '0')}}h ${{String(mins).padStart(2, '0')}}m ${{String(secs).padStart(2, '0')}}s`;
      }}

      /**
       * Constrói o Relógio SVG Polar de 24 Horas
       * Baseado fielmente no Chart D (página 103)
       */
      renderDialSvg(activeWeekday, activePeriodIdx, currentTotalSec) {{
        const svg = document.getElementById("dial-svg");
        if (!svg) return;

        // Ângulo por período: 360 / 7 = 51.42857 graus
        const anglePerSector = 360 / 7;

        // No Chart D do livro:
        // Meia-noite (00:00) está no TOPO (-90 graus no plano cartesiano padrão)
        // Meio-dia (12:00) está na BASE (90 graus)
        // O tempo corre no sentido horário: 24h = 360 graus => 1h = 15 graus
        const currentAngleDeg = (currentTotalSec / 86400) * 360;

        const R_OUTER = 195;
        const R_INNER = 95;
        const R_TEXT = 145;

        let svgHtml = '';

        // 1. Fundo do círculo
        svgHtml += `<circle cx="0" cy="0" r="${{R_OUTER + 8}}" fill="#0d1422" stroke="rgba(212,175,55,0.4)" stroke-width="2" />`;
        svgHtml += `<circle cx="0" cy="0" r="${{R_INNER}}" fill="#080c14" stroke="rgba(212,175,55,0.3)" stroke-width="1.5" />`;

        // 2. Os 7 setores harmônicos do dia
        const lettersOfDay = WEEK_MATRIX[activeWeekday];

        for (let i = 0; i < 7; i++) {{
          const startAngle = (i * anglePerSector) - 90; // inicia no topo
          const endAngle = ((i + 1) * anglePerSector) - 90;
          const letter = lettersOfDay[i];

          const isCurrentActive = (i === activePeriodIdx);
          const isSelected = (this.isCustomInspection && this.selectedPeriodIdx === i);

          // Coordenadas polares dos arcos
          const p1 = this.polarToCartesian(0, 0, R_OUTER, startAngle);
          const p2 = this.polarToCartesian(0, 0, R_OUTER, endAngle);
          const p3 = this.polarToCartesian(0, 0, R_INNER, endAngle);
          const p4 = this.polarToCartesian(0, 0, R_INNER, startAngle);

          const arcPath = `M ${{p1.x}} ${{p1.y}} A ${{R_OUTER}} ${{R_OUTER}} 0 0 1 ${{p2.x}} ${{p2.y}} L ${{p3.x}} ${{p3.y}} A ${{R_INNER}} ${{R_INNER}} 0 0 0 ${{p4.x}} ${{p4.y}} Z`;

          // Cores dos setores
          let fill = i % 2 === 0 ? "rgba(22, 32, 50, 0.75)" : "rgba(16, 24, 38, 0.75)";
          if (isCurrentActive) {{
            fill = "rgba(212, 175, 55, 0.35)";
          }}
          if (isSelected) {{
            fill = "rgba(59, 130, 246, 0.4)";
          }}

          const sectorClass = `sector-arc ${{isCurrentActive ? 'active-sector' : ''}}`;

          svgHtml += `<path d="${{arcPath}}" fill="${{fill}}" class="${{sectorClass}}" onclick="app.onSectorClick(${{activeWeekday}}, ${{i}})" data-period="${{i}}">
            <title>Período ${{i+1}}: Letra ${{letter}} (${{BOOK_BOUNDS[i].start}} às ${{BOOK_BOUNDS[i].end}}) - Clique para inspecionar</title>
          </path>`;

          // Posição do texto da Letra
          const midAngle = startAngle + (anglePerSector / 2);
          const textPos = this.polarToCartesian(0, 0, R_TEXT, midAngle);

          svgHtml += `<text x="${{textPos.x}}" y="${{textPos.y}}" class="sector-text" fill="${{isCurrentActive ? '#fef08a' : '#ffffff'}}">${{letter}}</text>`;
        }}

        // 3. Marcadores de Horas fundamentais ao redor (Meia-noite, Meio-dia, 6h, 18h)
        svgHtml += `<text x="0" y="-204" font-size="10" fill="#e6ca65" font-family="'JetBrains Mono', monospace" text-anchor="middle" font-weight="bold">00:00 (Meia-noite)</text>`;
        svgHtml += `<text x="0" y="214" font-size="10" fill="#e6ca65" font-family="'JetBrains Mono', monospace" text-anchor="middle" font-weight="bold">12:00 (Meio-dia)</text>`;
        svgHtml += `<text x="206" y="3" font-size="9" fill="#9ca3af" font-family="'JetBrains Mono', monospace" text-anchor="start">06:00 A.M.</text>`;
        svgHtml += `<text x="-206" y="3" font-size="9" fill="#9ca3af" font-family="'JetBrains Mono', monospace" text-anchor="end">18:00 P.M.</text>`;

        // 4. Ponteiro Horário em Tempo Real
        const pointerAngle = currentAngleDeg - 90;
        const pointerTip = this.polarToCartesian(0, 0, R_OUTER - 4, pointerAngle);
        const pointerTail = this.polarToCartesian(0, 0, 25, pointerAngle + 180);

        svgHtml += `
          <!-- Ponteiro Horário Real -->
          <line x1="${{pointerTail.x}}" y1="${{pointerTail.y}}" x2="${{pointerTip.x}}" y2="${{pointerTip.y}}" stroke="#ef4444" stroke-width="3" stroke-linecap="round" filter="drop-shadow(0 0 6px rgba(239,68,68,0.8))" />
          <circle cx="${{pointerTip.x}}" cy="${{pointerTip.y}}" r="4" fill="#ffffff" stroke="#ef4444" stroke-width="2" />
          <!-- Eixo Central Nobre -->
          <circle cx="0" cy="0" r="16" fill="url(#goldGrad)" stroke="#ffffff" stroke-width="2" />
          <circle cx="0" cy="0" r="6" fill="#0a0e17" />
          <!-- Gradiente do Eixo -->
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#fef08a" />
              <stop offset="100%" stop-color="#b45309" />
            </linearGradient>
          </defs>
        `;

        svg.innerHTML = svgHtml;
      }}

      /**
       * Converte coordenadas polares para cartesianas no SVG
       */
      polarToCartesian(centerX, centerY, radius, angleInDegrees) {{
        const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
        return {{
          x: centerX + (radius * Math.cos(angleInRadians)),
          y: centerY + (radius * Math.sin(angleInRadians))
        }};
      }}

      /**
       * Clique no setor do mostrador para inspecionar
       */
      onSectorClick(weekday, periodIdx) {{
        this.isCustomInspection = true;
        this.selectedWeekday = weekday;
        this.selectedPeriodIdx = periodIdx;

        const letter = WEEK_MATRIX[weekday][periodIdx];
        const bounds = BOOK_BOUNDS[periodIdx];
        const nextIdx = (periodIdx + 1) % 7;
        const nextLetter = WEEK_MATRIX[weekday][nextIdx];
        const nextBounds = BOOK_BOUNDS[nextIdx];

        document.getElementById("live-status-tag").innerText = "INSPECIONANDO";
        document.getElementById("live-status-tag").style.color = "#38bdf8";

        this.renderCycleDisplay(letter, periodIdx + 1, bounds, 0, nextLetter, nextBounds, false, "", "");

        // Rola suavemente até o cartão para leitura
        document.getElementById("active-card").scrollIntoView({{ behavior: 'smooth', block: 'nearest' }});
      }}

      /**
       * Reseta a visualização para o momento exato presente
       */
      resetToCurrentTime() {{
        this.isCustomInspection = false;
        document.getElementById("live-status-tag").innerText = "AO VIVO";
        document.getElementById("live-status-tag").style.color = "var(--accent-favorable)";
        this.updateLiveTick();
      }}

      /**
       * Avança para inspecionar o próximo período
       */
      inspectNextPeriod() {{
        const now = new Date();
        const cycle = this.calculateCycle(now);
        this.onSectorClick(now.getDay(), cycle.nextIdx);
      }}

      /**
       * Monta a Matriz Semanal (Página 105 - Tabela E)
       */
      buildMatrixTable() {{
        const tbody = document.getElementById("matrix-body");
        if (!tbody) return;

        let html = '';

        for (let p = 0; p < 7; p++) {{
          const bounds = BOOK_BOUNDS[p];
          html += `<tr>`;
          html += `<td class="time-cell">${{bounds.start}}–${{bounds.end}}</td>`;

          // Colunas dos 7 dias: Domingo(0) a Sábado(6)
          for (let d = 0; d < 7; d++) {{
            const letter = WEEK_MATRIX[d][p];
            html += `<td class="matrix-letter-cell" id="cell-${{d}}-${{p}}" onclick="app.onCellClick(${{d}}, ${{p}})">
              ${{letter}}
            </td>`;
          }}

          html += `</tr>`;
        }}

        tbody.innerHTML = html;
      }}

      /**
       * Destaca na tabela a célula do momento exato
       */
      highlightMatrixActiveCell(day, periodIdx) {{
        document.querySelectorAll(".matrix-letter-cell.active-now").forEach(el => {{
          el.classList.remove("active-now");
        }});

        const activeCell = document.getElementById(`cell-${{day}}-${{periodIdx}}`);
        if (activeCell) {{
          activeCell.classList.add("active-now");
        }}
      }}

      /**
       * Clique em qualquer célula da tabela para carregar relatório
       */
      onCellClick(day, periodIdx) {{
        this.switchTab('live');
        this.onSectorClick(day, periodIdx);
      }}

      /**
       * Inicializa os valores padrão do formulário retrospectivo
       */
      initRetroDefaults() {{
        const now = new Date();
        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const dd = String(now.getDate()).padStart(2, '0');
        const hh = String(now.getHours()).padStart(2, '0');
        const min = String(now.getMinutes()).padStart(2, '0');

        const dateInput = document.getElementById("retro-date");
        const timeInput = document.getElementById("retro-time");

        if (dateInput) dateInput.value = `${{yyyy}}-${{mm}}-${{dd}}`;
        if (timeInput) timeInput.value = `${{hh}}:${{min}}`;
      }}

      /**
       * Calcula a gênese do evento (Capítulo 12)
       */
      calculateRetroGenesis() {{
        const dateVal = document.getElementById("retro-date").value;
        const timeVal = document.getElementById("retro-time").value;

        if (!dateVal || !timeVal) {{
          alert("Por favor, preencha a data e o horário do acontecimento.");
          return;
        }}

        // Criar objeto Date local
        const [year, month, day] = dateVal.split('-').map(Number);
        const [hour, minute] = timeVal.split(':').map(Number);
        const targetDate = new Date(year, month - 1, day, hour, minute, 0);

        const cycle = this.calculateCycle(targetDate);
        const details = PERIOD_DETAILS[cycle.letter];

        this.lastRetroPeriod = cycle.periodIdx;
        this.lastRetroWeekday = cycle.weekday;

        const resultBox = document.getElementById("retro-result-box");
        resultBox.style.display = "block";

        document.getElementById("retro-letter").innerText = cycle.letter;
        document.getElementById("retro-title").innerText = `GÊNESE NO PERÍODO "${{cycle.letter}}" — ${{details.title}}`;
        document.getElementById("retro-meta").innerText = `${{WEEKDAY_NAMES[cycle.weekday]}} às ${{timeVal}} (${{cycle.bounds.start}}–${{cycle.bounds.end}}) • Período Nº ${{cycle.periodNum}} de 7`;

        let interpText = `Esta questão surgiu sob a influência do Período ${{cycle.letter}}. Conforme o Capítulo 12, esta vibração marca a raiz do acontecimento. `;
        if (cycle.letter === 'F' || cycle.letter === 'B') {{
          interpText += `Excelente auspício! O ciclo de gênese favorece amplamente novos acordos, cooperação e resultados frutíferos duradouros.`;
        }} else if (cycle.letter === 'E') {{
          interpText += `Atenção rigorosa: O período E é expressamente desfavorável para contratos comuns e acordos gerais. O autor adverte que mesmo que você adie a assinatura para um horário propício, o fato de ter surgido aqui exige cautela extrema e verificação meticulosa.`;
        }} else if (cycle.letter === 'A') {{
          interpText += `Período de energia forte que deve ser controlada. Não favorece a assinatura imediata de acordos comerciais, mas favorece a consulta a autoridades e meditação aprofundada antes de agir.`;
        }} else {{
          interpText += `Analise atentamente as recomendações específicas da obra para o Período ${{cycle.letter}} antes de tomar decisões definitivas.`;
        }}

        document.getElementById("retro-interpretation").innerText = interpText;
        resultBox.scrollIntoView({{ behavior: 'smooth', block: 'nearest' }});
      }}

      /**
       * Carrega o período do modo retrospectivo no painel principal
       */
      loadPeriodInMainView(periodIdx, weekday) {{
        this.switchTab('live');
        this.onSectorClick(weekday, periodIdx);
      }}

      /**
       * Alterna entre as abas principais
       */
      switchTab(tabId) {{
        // IDs das abas
        const tabs = ['live', 'matrix', 'retro'];
        tabs.forEach(t => {{
          const sectionEl = document.getElementById(`section-${{t}}`);
          const btnEl = document.getElementById(`btn-tab-${{t}}`);
          if (sectionEl) sectionEl.style.display = (t === tabId ? (t === 'live' ? 'grid' : 'block') : 'none');
          if (btnEl) btnEl.classList.toggle('active', t === tabId);
        }});

        window.scrollTo({{ top: 180, behavior: 'smooth' }});
      }}

      /**
       * Abre o modal do Chart D original
       */
      openChartDModal() {{
        document.getElementById("chart-modal").style.display = "flex";
      }}

      /**
       * Fecha o modal do Chart D original
       */
      closeChartDModal(event) {{
        if (!event || event.target.id === "chart-modal" || event.target.className === "modal-close") {{
          document.getElementById("chart-modal").style.display = "none";
        }}
      }}
    }}

    // Instanciação e Inicialização Global
    const app = new CosmicCyclesApp();
    document.addEventListener("DOMContentLoaded", () => {{
      app.init();
    }});
  </script>
</body>
</html>
'''

target_file = "/home/estudante/Documentos/antigravity/sites/rciclos/site-ciclo-diario/index.html"

with open(target_file, "w", encoding="utf-8") as f:
    f.write(html_content)

print("Arquivo gerado com sucesso em:", target_file)
