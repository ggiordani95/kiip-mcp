# Playbook — Relatórios e análises de RH

Como gerar relatórios e análises de RH corretos a partir dos dados da Kiip. Este documento define as convenções de cálculo, o catálogo de análises disponíveis, o fluxo de conversa recomendado e a orientação para dashboards dinâmicos.

**Quando o administrador perguntar "que relatórios você consegue gerar?"**, apresente o catálogo da seção 2 de forma resumida e pergunte qual interessa.

---

## 1. Convenções transversais (valem para todos os relatórios)

Use sempre as mesmas réguas — senão o turnover de um relatório não bate com o headcount de outro.

### Quem é "ativo"

Todos os status representam vínculo ativo, **exceto dois**: **Em admissão** (ainda não iniciou a atividade) e **Desligado**. Portanto contam como ativos: Em atividade, Em férias, Afastado, Pendente de atualização — mesmo com o vínculo temporariamente suspenso (afastamento), o vínculo existe.

> "Desligado no período" **não é um status real** — é um filtro de conveniência usado na abertura de folha. Na prática a pessoa fica com status Desligado; o "no período" apenas filtra desligamentos ocorridos dentro de uma janela.

### Headcount em uma data

Número de pessoas com vínculo ativo naquela data: data de admissão ≤ data de referência **e** (sem data de desligamento **ou** data de desligamento > data de referência). Para séries históricas, calcule ponto a ponto pelas datas de admissão e desligamento — não pelo status atual.

### Headcount médio de um período

(headcount no início + headcount no fim) ÷ 2. Suficiente para períodos mensais; para períodos longos, média dos fechamentos mensais.

### Competência vs. data do evento

Eventos (admissão, desligamento, férias) pertencem ao período em que **ocorreram**, não ao período em que foram registrados no sistema. Use sempre os campos de data do evento.

### Recortes padrão

Todo relatório deve oferecer os recortes: **Empresa (CNPJ), Área, Cargo, Vínculo, Centro de Custo**. Pergunte ao usuário qual recorte interessa antes de gerar.

### Salário atual

Vem da entrada **mais recente** (por Data de início) do grupo Cargos e Salários. Nunca somar todas as entradas do histórico — grupos de múltiplas respostas guardam histórico, não valores vigentes.

### Dependências de dados

- **Absenteísmo e horas extras** dependem de a empresa usar o **Kiip Ponto com integração ativa** e de os dados terem sido importados nos fechamentos de folha. Antes de prometer esses relatórios, verifique se os dados existem para o período.
- **Turnover voluntário/involuntário** depende da qualidade do preenchimento do **motivo de desligamento**. Se houver muitos desligamentos sem motivo, informe a limitação e reporte só o turnover geral.

---

## 2. Catálogo de relatórios e análises

Menu a apresentar quando o administrador pedir opções:

| # | Relatório | Pergunta que responde |
|---|---|---|
| 1 | Headcount por período | Quantas pessoas temos e como isso evoluiu? |
| 2 | Turnover | Estamos perdendo gente demais? Onde? |
| 3 | Admissões × desligamentos | Estamos crescendo ou encolhendo? |
| 4 | Tempo de casa (tenure) | Quanto tempo as pessoas ficam? Onde perdemos cedo? |
| 5 | Risco de férias | Quem está perto de gerar pagamento em dobro? |
| 6 | Massa salarial | Quanto custa a folha e como se distribui? |
| 7 | Absenteísmo * | Quantas faltas e onde? |
| 8 | Horas extras * | Quanto de HE e onde está concentrada? |
| 9 | Demografia | Como é o perfil do quadro (gênero, cor/raça, idade, escolaridade)? |
| 10 | Vencimentos operacionais | Experiências vencendo, aniversariantes, tempo de casa |

\* Dependem de Kiip Ponto integrado (ver seção 1).

---

## 3. Fichas por indicador

### 3.1 Headcount por período

- **Definição:** série temporal do número de vínculos ativos (regra da seção 1).
- **Fonte:** data de admissão e data de desligamento de todos os colaboradores.
- **Saídas típicas:** gráfico de linha mensal; tabela por recorte; foto atual por área.
- **Armadilhas:** não usar o status atual para reconstituir o passado; "Em admissão" não conta.

### 3.2 Turnover

- **Fórmula geral:** desligados no período ÷ headcount médio do período × 100.
- **Voluntário / involuntário:** classificar pelo **motivo de desligamento** (pedido de demissão = voluntário; demissão pela empresa, término de contrato etc. = involuntário). Reportar % de desligamentos sem motivo preenchido.
- **Saídas típicas:** taxa mensal/anualizada; ranking por área/cargo; voluntário vs. involuntário.
- **Armadilhas:** nunca usar headcount de fim de período como denominador; anualizar corretamente (taxa mensal × 12 é aproximação — sinalizar quando usada); períodos curtos com headcount pequeno geram taxas voláteis — sugerir janela maior.

### 3.3 Admissões × desligamentos

- **Definição:** contagem de admissões e desligamentos por período + saldo líquido.
- **Fonte:** datas de admissão e desligamento.
- **Saídas típicas:** gráfico de barras pareadas com linha de saldo; tabela por recorte.

### 3.4 Tempo de casa (tenure)

- **Definição:** para ativos, hoje − data de admissão; para desligados, data de desligamento − data de admissão.
- **Saídas típicas:** média e mediana por recorte; distribuição por faixas (<6m, 6–12m, 1–3a, 3–5a, >5a); tenure médio dos desligados do período (proxy de saída precoce — cruzar com turnover).
- **Armadilhas:** média isolada esconde distribuição — apresentar faixas; não misturar ativos e desligados no mesmo número sem avisar.

### 3.5 Risco de férias

- **Definição:** colaboradores com período aquisitivo em status **Vencido** (exposição já concretizada — Art. 137 CLT, pagamento em dobro) ou **Vencendo** (segunda metade do concessivo).
- **Fonte:** status dos períodos aquisitivos calculados pelo módulo de Férias (Gestão de saldo).
- **Saídas típicas:** lista priorizada por data de vencimento do concessivo; contagem por área; saldo total em risco (dias).
- **Armadilhas:** conferir se a conta regularizou os saldos na implantação — contas recém-implantadas sem regularização mostram falsos vencidos (ver playbook `regularizacao-ferias`).

### 3.6 Massa salarial

- **Definição:** soma dos salários vigentes dos ativos; média e mediana por recorte.
- **Fonte:** entrada mais recente do grupo Cargos e Salários (regra da seção 1). Atenção ao campo Tipo de Salário (salário, pró-labore, bolsa, comissão) e à Forma de Pagamento (mensal, por hora etc.) — não somar bases incomparáveis sem normalizar ou segmentar.
- **Saídas típicas:** total por área/CNPJ/vínculo; média por cargo; distribuição por faixas.
- **Armadilhas:** múltiplas entradas no histórico (usar só a vigente); misturar CLT e PJ no mesmo total sem segmentar (bases e encargos diferentes — sinalizar); dado sensível — confirmar que o usuário tem perfil adequado antes de detalhar por pessoa.

### 3.7 Absenteísmo *

- **Fórmula:** dias de falta ÷ dias úteis previstos do período × 100. Separar faltas justificadas e injustificadas (o Ponto fornece as duas, com datas das ocorrências).
- **Fonte:** importação Ponto → Folha nos fechamentos.
- **Armadilhas:** cobre apenas colaboradores ativos no Ponto via integração; atrasos não são importados (limitação atual) — o indicador é de faltas, não de horas perdidas.

### 3.8 Horas extras *

- **Definição:** total de HE por fator (50%, 100% etc.) por período e recorte; custo estimado = horas × valor-hora × (1 + fator).
- **Fonte:** totalizadores de HE por fator importados do Ponto na folha.
- **Armadilhas:** valor-hora depende da jornada mensal (220h padrão — confirmar jornada antes de estimar custo); custo estimado ≠ valor processado pela contabilidade — apresentar como estimativa; adicional noturno é outro evento, não misturar com HE.

### 3.9 Demografia

- **Definição:** distribuição do quadro ativo por gênero, cor/raça, faixa etária, escolaridade, estado civil.
- **Fonte:** campos do diretório (Dados Pessoais, Formação Acadêmica).
- **Armadilhas:** reportar % de não preenchidos; dados sensíveis (LGPD) — apresentar sempre agregado, nunca lista nominal por característica.

### 3.10 Vencimentos operacionais

- **Definição:** listas de ação — contratos de experiência vencendo (Vencimento 1º/2º período de experiência), aniversariantes do mês, aniversários de empresa.
- **Fonte:** campos de data do diretório.
- **Observação:** para recorrência automática, sugerir também o módulo de Lembretes da Kiip (avisos por e-mail sem depender do MCP).

---

## 4. Fluxo de conversa recomendado

Ao receber um pedido de relatório ou análise:

1. **Entenda a pergunta de negócio antes da métrica.** "Quero ver turnover" → pergunte: de qual período? Geral ou de alguma área? Interessa separar voluntário de involuntário?
2. **Defina o escopo em no máximo 2–3 perguntas:** período, recorte (empresa/área/cargo/vínculo), formato de saída (número, tabela, gráfico, arquivo).
3. **Verifique os dados antes de prometer.** Cheque se o período tem dados (ex.: integração de ponto, motivos de desligamento preenchidos). Se houver limitação, diga qual e ofereça a alternativa.
4. **Declare a convenção usada** junto do resultado (ex.: "headcount médio = média entre início e fim do mês; ativos excluem Em admissão e Desligado"). Isso torna os números auditáveis e comparáveis.
5. **Sinalize qualidade de dados:** % de registros sem o campo necessário (motivo de desligamento, salário, cor/raça) sempre que afetar o resultado.
6. **Ofereça o próximo passo:** relatório recorrente, outro recorte, ou consolidação em dashboard (seção 5).

---

## 5. Dashboard dinâmico

A Kiip intencionalmente **não entrega um módulo de dashboards** — a proposta é que o administrador construa suas visões com IA, personalizadas do seu jeito. Quando o usuário demonstrar interesse recorrente pelos mesmos indicadores, ofereça construir um dashboard.

Orientações para a construção:

1. **Selecionar 4–8 indicadores** do catálogo com o usuário (mais que isso vira relatório, não dashboard). Sugestão de composição executiva: headcount, turnover, admissões×desligamentos, risco de férias + 2 escolhas do usuário.
2. **Construir o dashboard como artefato HTML** (ou equivalente do cliente em uso), buscando os dados pelos tools do MCP no carregamento — assim o dashboard reflete os dados atuais a cada abertura, e não uma foto congelada.
3. **Fixar as convenções da seção 1 no código** do dashboard (regra de ativo, headcount médio etc.), para que a atualização automática não mude a metodologia.
4. **Períodos e recortes como filtros**, não hard-coded — o usuário vai querer variar.
5. **Atualização recorrente:** se o cliente em uso suporta tarefas agendadas, oferecer um resumo periódico (ex.: semanal) com os mesmos indicadores e destaques de variação.
6. **Volume:** em contas grandes, buscar dados agregados/paginados pelos tools — não carregar a base inteira no dashboard.

---

## 6. Limitações a comunicar com transparência

- Absenteísmo e HE: só com Kiip Ponto integrado e dados importados na folha.
- Atrasos não são importados do Ponto (limitação atual).
- A Kiip não processa folha — valores de INSS/IRRF/custo total do empregador não existem no sistema; custos derivados de salário são estimativas.
- Turnover por motivo depende do preenchimento do motivo de desligamento.
- Dados salariais e demográficos são sensíveis: respeitar o perfil de acesso do usuário e preferir visões agregadas.
