# Plano de Execução: SEO Local Ourinhos & Otimizações Técnicas

## 1. Visão Geral do Projeto
- **Domínio Principal (CNAME):** `https://siteprofissional.pro/`
- **Profissional:** Victor (Desenvolvedor Web & Especialista em Sites Profissionais, Certificado Google em TI e Cibersegurança, Análise e Desenvolvimento de Sistemas).
- **Contato Oficial:** WhatsApp `https://bit.ly/3NFNl6U` (+55 14 99771-5865).
- **Hospedagem:** GitHub Pages (estático, sem backend/PHP).

## 2. Divisão de Papéis e Agentes
| Agente | Responsabilidade |
|---|---|
| `project-planner` | Estruturação das etapas, mapeamento de requisitos e criação do plano de execução. |
| `seo-specialist` | SEO Técnico, SEO Local Ourinhos, GEO (mecanismos generativos/IA), Schemas JSON-LD, sitemap e robots.txt. |
| `frontend-specialist` | Criação de `programador/index.html` e `404.html`, correções semânticas e preservação de design/responsividade. |
| `test-engineer` | Validação de sintaxe, links internos, headings, Schemas JSON-LD e ausência de overflow. |
| `devops-engineer` | Remoção do tracking dos arquivos antigos sem exclusão local, atualização do `.gitignore`, commit e push. |

## 3. Fases de Implementação
- **Fase 1: Correções Técnicas de SEO no `index.html`**
  - Canonical: `https://siteprofissional.pro/`
  - Open Graph e Twitter Cards completos com URLs absolutas.
  - Correção das URLs do Schema.org para o domínio `siteprofissional.pro`.
  - Link interno sutil no rodapé para `/programador/`.
  - Conformidade do rodapé com a regra global.

- **Fase 2: Criação da Landing Page `/programador/index.html`**
  - Estrutura completa voltada a Ourinhos/SP sem keyword stuffing.
  - Identidade visual idêntica (Inter, cores, botões, cards, FAQ sanfonado).
  - Schemas JSON-LD (`ProfessionalService`, `Person`, `WebPage`, `BreadcrumbList`, `FAQPage`, `areaServed`).
  - Imagem do Victor otimizada com caminho relativo e atributos adequados.
  - CTAs direcionados para o WhatsApp oficial.
  - Conformidade do rodapé com a regra global.

- **Fase 3: Criação de `404.html`**
  - Página 404 estilizada, noindex, links para `/` e `/programador/`.
  - Conformidade do rodapé com a regra global.

- **Fase 4: Configuração de `robots.txt` e `sitemap.xml`**
  - Bloqueio de `/dev/` e `/rc-ciclo-anual/ambiente-teste/`.
  - Tags `<meta name="robots" content="noindex, nofollow">` nas páginas de dev/teste.
  - `sitemap.xml` com URLs canônicas públicas e `lastmod` real.

- **Fase 5: Git e `.gitignore`**
  - `git rm --cached` para `index - old.html` e `index - Copia gemini - Copia.html`.
  - Adição ao `.gitignore`.
  - Verificação de arquivos intactos em disco.

- **Fase 6: Testes, Auditoria e Push**
  - Execução de scripts de validação e lint.
  - Teste local de rotas e links.
  - Commit e git push.
