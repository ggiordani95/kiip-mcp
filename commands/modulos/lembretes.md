# Lembretes

Base de conhecimento sobre o módulo de Lembretes: criação, agendamento, recorrência, destinatários e notificações adicionais.

---

## O que é o módulo de Lembretes

O módulo de Lembretes permite criar avisos automáticos vinculados a datas — fixas ou derivadas de campos do sistema — e enviá-los a destinatários específicos da conta. É usado para alertar o time de RH ou os próprios colaboradores sobre eventos relevantes como aniversários, vencimentos de contratos, revisões salariais ou qualquer outra data de interesse operacional.

Acessado em **Configurações > Lembretes** (`app.kiip.team/admin/settings/reminders`).

---

## Tela principal — listagem de lembretes

Exibe todos os lembretes cadastrados na conta em formato de lista. Colunas: **Lembrete** (nome) e **Ações** (editar, excluir).

Nenhum lembrete vem pré-cadastrado no sistema — todos devem ser criados pela empresa conforme sua necessidade.

Ações disponíveis:
- **Novo lembrete** — inicia o fluxo de criação
- Ícone de lápis — edita o lembrete
- Ícone de lixeira — exclui o lembrete

---

## Fluxo de criação — Novo lembrete

Modal **Criar lembrete**. Campos organizados em quatro seções:

---

### Seção 1 — Detalhes

**Título\*** — obrigatório. Nome do lembrete, exibido na listagem.

**Conteúdo\*** — obrigatório. Corpo da mensagem enviada ao destinatário. Suporta formatação rica: negrito, itálico, sublinhado, tachado, lista ordenada, lista não ordenada e link.

---

### Seção 2 — Agendamentos

Define quando o lembrete será disparado. Campo obrigatório: **A data do lembrete será...**

Duas opções:

#### Opção A — Uma data específica

O admin define manualmente o dia e a frequência de envio. Usado para lembretes de datas fixas no calendário (ex: prazo de entrega de documentos, reunião anual de avaliação).

#### Opção B — Uma data a partir de um campo do sistema

A data de disparo é calculada automaticamente com base em um campo do tipo data preenchido no perfil de cada colaborador. Usado para eventos individuais como aniversário, data de admissão, vencimento de experiência.

Quando esta opção é selecionada, configura-se:

- **Campo do sistema\*** — seleciona o campo de data de referência (ex: Data de Admissão — Informações Básicas)
- **Hora\*** — horário de disparo (ex: 16:00)
- **Recorrência\*** — define se o lembrete se repete:

| Opção | Comportamento |
|---|---|
| **Não se repete** | Dispara uma única vez na data calculada |
| **Personalizado** | Define frequência e intervalo customizados |

**Recorrência personalizada** abre um sub-modal com:

| Frequência | Campo adicional |
|---|---|
| Diariamente | A cada N dia(s) |
| Semanalmente | A cada N semana(s) |
| Mensalmente | A cada N mês(es) |
| Anualmente | A cada N ano(s) |

- **Termina em** — data de encerramento da recorrência (opcional). Se deixado em branco, o lembrete se repete por tempo indeterminado.

---

### Seção 3 — Destinatários

Define quem receberá o lembrete. Campo obrigatório: **Tipo de destinatário**.

Opções disponíveis (múltipla seleção):

| Tipo | Descrição |
|---|---|
| **Todas as pessoas da empresa** | Todos os colaboradores cadastrados na conta |
| **O próprio colaborador** | O colaborador cujo campo de data originou o lembrete |
| **Líderes de áreas** | Os líderes cadastrados nas áreas |
| **Pessoas específicas** | Seleção manual de pessoas da conta |
| **Pessoas de uma ou mais áreas** | Todos os colaboradores das áreas selecionadas |
| **Pessoas de um ou mais vínculos** | Colaboradores filtrados por vínculo empregatício |
| **Pessoas de um ou mais centros de custos** | Colaboradores filtrados por centro de custo |
| **Pessoas de um ou mais cargos** | Colaboradores filtrados por cargo |
| **Líder direto** | O líder direto do colaborador que originou o lembrete |
| **Pessoas da mesma área** | Colegas de área do colaborador que originou o lembrete |
| **Pessoas do mesmo vínculo** | Colaboradores com o mesmo vínculo do colaborador de referência |
| **Pessoas do mesmo centro de custo** | Colaboradores do mesmo centro de custo |
| **Pessoas do mesmo cargo** | Colaboradores com o mesmo cargo |

> Os tipos relacionais (líder direto, mesma área, mesmo vínculo etc.) fazem sentido apenas quando o lembrete usa a **Opção B** de agendamento — pois dependem de um colaborador de referência para calcular o contexto.

---

### Seção 4 — Notificações adicionais

Permite configurar alertas antecipados enviados antes da data principal do lembrete.

Botão **Adicionar notificação** abre um sub-modal com:

- **Quantidade de dias antes** — número inteiro (ex: 10, 30)
- **Unidade** — Dia(s) antes (única opção visível)
- Botão **Adicionar outra** — permite empilhar múltiplas antecedências (ex: avisar 30 dias antes e 10 dias antes)

> As notificações adicionais são enviadas para os mesmos destinatários configurados na Seção 3.

---

## Canal de envio

O envio dos lembretes é feito exclusivamente por **e-mail**.

**Formato do assunto do e-mail:**
- Lembrete na data principal: **"Lembrete: [título do lembrete] — [nome do colaborador]"**
- Notificações adicionais (antecipadas): **"Lembrete: Faltam X dias: [título do lembrete] — [nome do colaborador]"**

> O nome do colaborador é incluído no assunto apenas quando o lembrete é baseado em campo do sistema — pois nesse caso cada disparo está vinculado a um colaborador específico. Em lembretes de data específica enviados para grupos (ex: "Todas as pessoas da empresa"), o nome do colaborador não compõe o assunto.

---

## Corner cases e pontos de atenção

- **Lembretes baseados em campo do sistema** disparam individualmente por colaborador — cada pessoa com aquele campo preenchido gera um disparo separado na data correspondente.
- **Recorrência sem data de término** funciona por tempo indeterminado — atenção ao configurar lembretes anuais de processos que podem ser descontinuados.
- **Destinatários relacionais sem colaborador de referência** (ex: "Líder direto", "Pessoas da mesma área") só fazem sentido em lembretes baseados em campo do sistema. Em lembretes de data específica, esses tipos não têm contexto de referência.
- **Conteúdo do lembrete** não suporta variáveis de campo do sistema — o texto é estático. Se precisar de personalização por colaborador, isso não está disponível no momento.
