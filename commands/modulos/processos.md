# Processos

Base de conhecimento sobre o módulo de Processos: criação de fluxos de solicitação personalizados, etapas, formulários, notificações e gestão de cartões.

---

## O que é o módulo de Processos

O módulo de Processos permite que a empresa crie fluxos de solicitação personalizados — chamados de processos — para gerenciar qualquer tipo de demanda interna com etapas, formulários e responsáveis definidos. Cada solicitação aberta dentro de um processo é representada por um **cartão**, que avança por etapas até ser concluído ou reprovado.

Acessado pelo menu **Processos** na navegação lateral (`app.kiip.team/workflows`).

---

## Processos de sistema vs. processos personalizados

Nem todos os processos visíveis na tela principal são da mesma natureza:

| Tipo | Descrição | Exemplos |
|---|---|---|
| **Módulo de sistema** | Funcionalidade própria com comportamento específico desenvolvido pela Kiip | Gestão de Férias, Admissão |
| **Processo personalizado** | Fluxo genérico criado e configurado pela empresa usando a estrutura de processos | Fale com o RH, PDIs, Gestão de Abonos e Afastamentos, Solicitação de Ativos, Solicitação de Reembolsos |

> Os processos exibidos como exemplos na conta são instâncias da funcionalidade genérica, não módulos do sistema. A documentação deste documento cobre a funcionalidade genérica de processos personalizados.

---

## Visibilidade dos processos

Usuários que **não podem abrir cartões** em um processo e **não são administradores** dele não verão o processo na listagem — ele fica completamente oculto para eles. A visibilidade é determinada pela configuração de "quem pode criar um novo cartão" definida no processo.

---

## Tela principal — listagem de processos

Exibe todos os processos disponíveis para o usuário em formato de cards. Cada card mostra nome e descrição do processo.

Ações disponíveis:
- **Buscar** processos pelo nome
- **Novo Processo** — inicia o fluxo de criação

---

## Criação de processo — painel lateral com 5 abas

Botão **Novo Processo** abre um painel lateral com as abas: **Detalhes**, **Admins**, **Formulário inicial**, **Etapas** e **Notificações**.

---

### Aba Detalhes

- **Nome do processo\*** — obrigatório
- **Descrição** — opcional; limite de 350 caracteres; exibida no card do processo na listagem
- **Quem pode criar um novo cartão\*** — obrigatório; define quem pode abrir solicitações neste processo:

| Opção | Descrição |
|---|---|
| Qualquer pessoa da empresa | Todos os usuários da conta podem abrir cartões |
| Pessoa(s) específica(s) | Seleção manual de pessoas |
| Pessoas de uma ou mais áreas | Filtro por área |
| Pessoas de um ou mais centros de custos | Filtro por centro de custo |
| Pessoas de um ou mais vínculos | Filtro por vínculo empregatício |

---

### Aba Admins

Define quem administra o processo — pode visualizar todos os cartões, mover entre etapas e gerenciar configurações.

- O criador do processo é incluído automaticamente como **Proprietário**
- Botão **Adicionar admins** permite incluir outros usuários

---

### Aba Formulário inicial

O formulário inicial é preenchido por quem abre o cartão no momento da solicitação.

- **Orientações de preenchimento** — campo de texto rico (negrito, itálico, sublinhado, tachado, lista ordenada, lista não ordenada, link); instrução exibida acima do formulário
- **Campos do formulário** — adicionados via botão **Adicionar campo**

**Configuração de cada campo:**
- Nome do campo\*
- Preenchimento obrigatório (toggle)
- Dica de preenchimento (toggle)
- Tipo do campo

**Tipos de campo disponíveis:**

| Tipo | Descrição |
|---|---|
| Texto curto | Caixa de texto com limite de 256 caracteres |
| Texto longo | Caixa de texto sem limite de caracteres |
| Opção única | Lista de opções — usuário escolhe apenas uma |
| Múltipla escolha | Lista de opções — usuário escolhe quantas quiser |
| Checklist | Lista de itens que devem ser marcados; se obrigatório, todos devem ser selecionados para avançar |
| Nuvem de tags | Recomenda valores inseridos anteriormente em formato de tags |
| Numérico | Caixa de texto que só aceita números |
| Monetário | Formatação para moedas |
| Data | Formatação para datas |
| Faixa de data | Define um intervalo de tempo em dias |
| Horário | Formatação para horário |
| Telefone | Inclui seleção de código de país (+1, +55 etc.) |
| Email | Suporta endereço de e-mail |
| Link | Suporta um link clicável para site externo |
| Anexo | Suporta upload de arquivos PDF, JPG e PNG |

---

### Aba Etapas

Define o fluxo que os cartões percorrem após o formulário inicial ser preenchido.

**Etapas padrão (não removíveis):**

| Etapa | Descrição |
|---|---|
| **Caixa de entrada** | Etapa inicial — onde chegam os cartões com as respostas do formulário inicial |
| **Concluído** | Etapa final de encerramento com sucesso |
| **Reprovado** | Etapa final de encerramento com reprovação |

O admin pode criar etapas intermediárias entre a Caixa de entrada e o Concluído via botão **Criar etapa**.

**Configuração de cada etapa — 3 sub-abas:**

#### Sub-aba Detalhes
- **Nome\*** — obrigatório
- **Descrição** — opcional; limite de 350 caracteres
- **Cor\*** — obrigatório; paleta de cores para identificação visual da etapa no kanban
- **Responsáveis** — define quem é responsável pelos cartões nesta etapa:

| Opção | Descrição |
|---|---|
| Pessoa(s) específica(s) | Seleção manual |
| Pessoas de uma ou mais áreas | Filtro por área |
| Líder direto | Líder direto do colaborador que abriu o cartão |
| Líder da área | Líder da área do colaborador |
| A pessoa que criou o cartão | O próprio solicitante |

#### Sub-aba Formulário
Mesmo padrão de campos do formulário inicial — permite coletar informações adicionais específicas dessa etapa. Campos adicionados aqui são preenchidos pelo responsável ao processar o cartão nessa etapa.

#### Sub-aba Ações
Toggles que definem quais ações estarão disponíveis para o responsável ao processar um cartão nessa etapa:

| Ação | Descrição |
|---|---|
| Avançar para a próxima etapa | Move o cartão para a etapa seguinte |
| Retornar para a etapa anterior | Devolve o cartão à etapa anterior |
| Concluir > Finalizar o processo com sucesso | Encerra o cartão como Concluído |
| Reprovar > Finalizar o processo | Encerra o cartão como Reprovado |

---

### Aba Notificações

Configura os eventos de notificação para cada perfil de envolvido no processo. Três perfis disponíveis:

| Perfil | Descrição |
|---|---|
| **Administrador do processo** | Pessoa responsável pela gestão do processo |
| **Responsável da etapa** | Pessoa designada a aprovar/reprovar um cartão em uma determinada etapa |
| **Proprietário do cartão** | Pessoa que abriu o cartão ou a quem o cartão foi submetido |

**Eventos configuráveis por perfil:**

| Perfil | Eventos disponíveis |
|---|---|
| Administrador do processo | Aviso de abertura de cartão; Aviso de alteração de etapa de cartão |
| Responsável da etapa | Aviso de cartão aguardando aprovação |
| Proprietário do cartão | Aviso de abertura de cartão; Aviso de alteração de etapa de cartão |

**Canais de notificação por evento:** Sistema, WhatsApp, E-mail (configuráveis independentemente).

---

## Visão operacional — kanban do processo

Ao abrir um processo, a tela exibe um **kanban** com uma coluna por etapa. Cada cartão na coluna representa uma solicitação aberta.

**Filtros disponíveis:** Solicitantes, Responsáveis, Etapas.

Ao clicar em um cartão, abre um painel lateral com duas seções:

**Informações do cartão:**
- Colaborador vinculado (nome, cargo), data de criação
- Histórico de etapas percorridas
- Respostas do formulário inicial e dos formulários de cada etapa (expansíveis)

**Ações:**
- Próxima etapa sugerida
- Botão **Avançar**
- Etapa anterior + botão **Retornar**
- Botões **Concluir** e **Reprovar** (quando disponíveis para aquela etapa)
- **Excluir cartão** — disponível no rodapé do painel

---

## Exportação de dados

Os processos personalizados permitem exportar os dados dos cartões via planilha. O acesso é pelo menu de três pontos no canto superior direito do kanban — opção **Exportar cartões via planilha**.

### Fluxo em 4 etapas

#### Etapa 1 — Campos do colaborador

Seleciona quais campos do perfil do **proprietário do cartão** (colaborador que abriu a solicitação) serão incluídos na exportação. A interface tem o mesmo padrão do módulo de Relatórios: painel de seleção à esquerda (com abas Pessoal, Profissional, Documentos, Adicionais e busca) e painel de campos selecionados à direita.

#### Etapa 2 — Dados do cartão

Seleciona campos de controle do próprio cartão, organizados em três grupos:

| Grupo | Campos disponíveis |
|---|---|
| **Identificação** | ID do cartão, Etapa atual, Aberto por |
| **Datas** | Abertura, Última movimentação, Conclusão, Reprovação |
| **Dados por etapa** | Data de entrada na etapa, Data de saída da etapa, Ação realizada da etapa, Responsável pela ação |

> Os campos do grupo **Dados por etapa** geram colunas para cada etapa do processo — cada etapa tem seu próprio conjunto de Entrada, Saída, Ação e Responsável no arquivo exportado.

#### Etapa 3 — Campos do processo

Seleciona campos dos **formulários** do processo — formulário inicial e formulários de etapas intermediárias. Os campos exibidos correspondem exatamente ao que foi configurado em cada formulário.

#### Etapa 4 — Opções

Configura o arquivo final:

| Campo | Opções |
|---|---|
| **Ordenar por** | Data de abertura, Data da última movimentação, Data de conclusão, Nome do colaborador, ID do cartão, Etapa atual, Status |
| **Ordem** | Crescente, Decrescente |
| **Formato do arquivo** | XLSX, CSV |
| **Incluir histórico de movimentação** | Sim, Não |

Botão final: **Exportar**.

### Entrega por e-mail

Após confirmar a exportação, o sistema processa o arquivo em segundo plano e **envia por e-mail** ao usuário que solicitou assim que estiver pronto. O arquivo fica disponível para download por **7 dias** a partir do envio.

A confirmação antes da exportação informa: quantidade de cartões que serão exportados (definida pelos filtros aplicados no kanban ou pela seleção manual) e que o arquivo será enviado por e-mail.

### Estrutura do arquivo exportado

O arquivo contém duas abas:

**Aba Cartões** — uma linha por cartão. Colunas organizadas na ordem das etapas de seleção:
- Situação do cartão (ex: "Pendente na etapa 3 (Aprovação do DP)")
- Campos de dados do cartão selecionados (ID, etapa atual, aberto por, datas)
- Campos do colaborador selecionados (Nome completo, Centro de Custo, Matrícula, Empresa etc.)
- Campos do formulário inicial
- Colunas por etapa: Entrada, Saída, Ação, Responsável — uma coluna por etapa para cada campo de dados por etapa selecionado

**Aba Histórico** — uma linha por movimentação de cada cartão. Colunas fixas: ID do cartão, Processo, Ação (Criado / Enviado / Concluído etc.), Etapa origem, Etapa destino, Responsável — Nome, Responsável — E-mail, Data/hora. Disponível apenas quando "Incluir histórico de movimentação = Sim" é selecionado na etapa de Opções.

### Escopo da exportação

Os cartões incluídos na exportação são definidos pelos **filtros ativos no kanban** no momento da exportação (por solicitante, responsável ou etapa) combinados com qualquer **seleção manual** de cartões. Se não houver filtros nem seleção, todos os cartões visíveis são exportados.

---

## Corner cases e pontos de atenção

- **Visibilidade do processo:** usuários sem permissão de criar cartões e que não são admins não veem o processo na listagem.
- **Etapas padrão não são removíveis:** Caixa de entrada, Concluído e Reprovado existem em todo processo e não podem ser excluídas.
- **Formulário por etapa:** cada etapa intermediária pode ter seu próprio formulário — útil para coletar aprovações, pareceres ou informações adicionais ao longo do fluxo.
- **Responsável da etapa vs. admin do processo:** o responsável da etapa é quem processa o cartão naquela etapa específica; o admin tem visibilidade total do processo e pode mover cartões livremente.
- **Processos de sistema (Férias, Admissão)** aparecem na mesma listagem mas têm comportamento próprio — não são configuráveis pela empresa da mesma forma que os processos personalizados.
- **Exportação entregue por e-mail:** o arquivo não é baixado diretamente — o sistema envia para o e-mail do usuário e fica disponível por 7 dias. Orientar o cliente a verificar a caixa de entrada após confirmar a exportação.
- **Dados por etapa geram colunas por etapa:** se o processo tem 5 etapas e o campo "Responsável pela ação" foi selecionado, haverá uma coluna de Responsável para cada etapa no arquivo — atenção ao interpretar a planilha.
- **Escopo da exportação é definido pelos filtros do kanban:** aplicar filtros antes de exportar quando o objetivo é um subconjunto de cartões (ex: apenas os concluídos, apenas de um solicitante específico).
