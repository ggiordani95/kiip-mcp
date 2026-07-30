# Admissões

Base de conhecimento sobre o módulo de Admissões: controle do fluxo de admissão de colaboradores, modelos de admissão, etapas do processo, documentos, checklist e integração com o diretório.

---

## O que é o módulo de Admissões

O módulo de Admissões é um módulo de sistema — não um processo personalizado — que oferece um fluxo estruturado e monitorável para a integração de novos colaboradores. Ele centraliza em um único lugar o envio de documentos para assinatura, o preenchimento de dados cadastrais pelo colaborador, o registro na contabilidade e o checklist de tarefas operacionais do onboarding.

Acessado em **Processos > Admissões** (`app.kiip.team/workflows/admissions`).

> **Distinção importante:** Admissões é um módulo de sistema com comportamento próprio. Embora apareça na listagem de Processos, não é configurável da mesma forma que um processo personalizado — suas etapas são predefinidas e sua lógica é específica para o fluxo de admissão.

---

## Tela principal — kanban de admissões

Exibe todos os cartões de admissão em três colunas fixas:

| Coluna | Descrição |
|---|---|
| **Em admissão** | Colaboradores com cartão aberto, ainda não em atividade |
| **Em atividade** | Colaboradores cujo processo de admissão está em andamento |
| **Concluído recentemente** | Admissões concluídas nos últimos 30 dias. Após esse prazo, o cartão é arquivado automaticamente. |

Cada cartão exibe: nome do colaborador, data de abertura do cartão e barra de progresso (%).

### Filtros disponíveis

- Busca por nome
- Empresas
- Mais filtros (outros critérios)

### Ações em massa

Disponíveis via botão **Ações em massa** após seleção de cartões.

**Disponíveis atualmente:**

| Ação | Descrição |
|---|---|
| **Arquivar cartões** | Move os cartões para o arquivo — removidos do kanban principal, mas consultáveis e recuperáveis |
| **Concluir cartões** | Finaliza os cartões como concluídos |
| **Reabrir cartões** | Reabre cartões previamente concluídos |
| **Excluir cartões** | Exclusão permanente dos cartões |

**Em desenvolvimento:**

| Ação | Descrição |
|---|---|
| **Enviar link de admissão em massa** | Envia o link de cadastro para todos os colaboradores selecionados de uma vez |
| **Enviar para a contabilidade em massa** | Envia o relatório de admissão para a contabilidade para todos os selecionados. O sistema gera uma planilha única com uma linha por colaborador. Valida previamente se os dados estão preenchidos — colaboradores com dados incompletos são bloqueados do envio em massa. |

---

## Arquivo de admissões

Acessado pelo menu **"..."** ao lado do botão "Novo cartão" → **Arquivo**.

Abre um painel lateral com a listagem de todas as admissões arquivadas da conta. Colunas: Nome do cartão, Abertura, Arquivado, Opções.

Ações disponíveis por cartão arquivado:
- **Visualizar** — abre o cartão em modo leitura
- **Desarquivar** — devolve o cartão ao kanban principal
- **Excluir** — exclusão permanente

> Cartões arquivados mantêm todo o histórico de etapas e documentos. A diferença em relação à exclusão é que o arquivo é reversível.

---

## Formas de iniciar uma admissão

### 1. Via módulo de Admissões — "Novo cartão"

Botão **Novo cartão** abre o modal **Nova admissão**. O admin:

1. Seleciona o **modelo de admissão** a ser utilizado
2. Seleciona as **pessoas** que seguirão esse modelo (com filtros: Empresas, Centros de Custo, Áreas, Vínculos, Cargos)
3. Clica em **Iniciar admissão**

As pessoas selecionadas devem estar previamente cadastradas no diretório.

### 2. Via módulo de Diretório — fluxo de adição individual

Ao adicionar uma nova pessoa pelo diretório (botão **Adicionar Pessoa**), existe a opção de selecionar um **modelo de admissão** ao final do fluxo. O colaborador é automaticamente inserido no controle de admissão com o modelo escolhido — sem necessidade de abrir um cartão manualmente depois.

Nesse mesmo momento, o usuário também escolhe se envia o link de admissão imediatamente ou não:

- **Se enviou o link na adição:** o cartão já abre com a tarefa "Enviar link de cadastro" marcada como concluída na etapa Dados do colaborador
- **Se não enviou:** pode enviar depois pelo fluxo de admissão, individualmente ou em massa (em desenvolvimento)

### 3. Via módulo de Diretório — adição em massa via planilha (em desenvolvimento)

A planilha de adição em massa também terá a opção de selecionar um modelo de admissão. Todas as pessoas incluídas na planilha serão automaticamente inseridas no controle de admissão com o modelo selecionado. A escolha de enviar ou não o link de admissão também estará disponível nesse fluxo.

---

## Progresso do cartão

A barra de progresso exibida em cada cartão representa a proporção de etapas concluídas sobre o total de etapas do modelo. O cálculo é simples: cada etapa concluída contribui igualmente para o total.

Exemplo: modelo com 5 etapas → cada etapa concluída = +20% de progresso.

---

## Cartão de admissão — estrutura

Ao clicar em um cartão, abre um painel duplo:

**Lado esquerdo — Informações da admissão:**
- Nome e foto do colaborador
- Data de abertura do cartão
- Status atual (ex: Em admissão, Arquivado)
- Dados resumidos: Área, Vínculo, Empresa, Data de admissão
- **Progresso geral:** barra de progresso com percentual e contagem de etapas (ex: 40% — 2/5)
- **Resumo das etapas:** lista de todas as etapas com status individual e data de conclusão quando aplicável

**Lado direito — Etapas do processo:**
- Detalhamento de cada etapa com suas tarefas, status e ações disponíveis

---

## Etapas do processo de admissão

O processo de admissão tem **5 etapas fixas e predefinidas** — não são configuráveis pelo cliente. O que o modelo de admissão configura é o conteúdo do checklist de tarefas (etapa 5) e a aplicabilidade.

### 1. Formulário inicial

Preenchido pelo administrador que abre o cartão. Contém a tarefa **"Preencher dados do colaborador"**, que dá acesso ao formulário de dados básicos da admissão.

### 2. Dados do colaborador

Controla o envio e preenchimento do link de admissão pelo próprio colaborador.

Tarefas desta etapa:
- **Enviar link de cadastro** — link de admissão do diretório. Ações disponíveis: Reenviar por e-mail, Copiar link. Ao copiar o link manualmente, o sistema marca automaticamente a tarefa como concluída — registrando que o link foi enviado por outro canal de comunicação.
- **Preencher dados** — monitora se o colaborador já finalizou o preenchimento. Ação: Acessar link

**Conclusão automática vs. manual:**
- A tarefa "Preencher dados" é **concluída automaticamente** quando o colaborador submete a última etapa do link de admissão
- Se a pessoa já tinha os dados preenchidos antes de ser incluída no fluxo de admissão (ex: colaborador antigo adicionado ao controle retroativamente), o sistema não detecta esse preenchimento anterior — o gestor precisa marcar a tarefa como concluída manualmente

> O link enviado nesta etapa é o mesmo link de admissão gerado pelo diretório de colaboradores.

### 3. Documentos

Lista todos os documentos associados ao colaborador **enquanto o cartão de admissão estiver aberto** — independentemente de terem sido gerados pelo módulo de Documentos ou pelo fluxo de adição de pessoa no diretório.

**Comportamento importante:**
- Enquanto o cartão estiver aberto, qualquer documento novo associado ao colaborador aparece automaticamente nesta etapa
- Quando o cartão for encerrado (concluído ou arquivado), o sistema salva o estado dos documentos naquele momento e o cartão passa a exibir apenas o histórico dos documentos que existiam até o fechamento
- Cada documento exibe seu status individual (ex: Aguardando assinatura, Assinado, Erro ao processar)

> **Dependência de etapa:** a etapa Documentos depende da conclusão da etapa "Dados do colaborador" para ser iniciada. Se a etapa anterior não estiver concluída, o sistema exibe a mensagem: *"Depende de informações da etapa Dados do colaborador para ser iniciada."*

### 4. Registro na contabilidade

Controla o envio das informações do novo colaborador para a contabilidade.

Tarefa: **Enviar para contabilidade** — abre modal com:
- **Etapa 1 — E-mail:** seleção de destinatários (contadores cadastrados na conta) e relatórios a anexar
- **Etapa 2 — Progresso:** acompanhamento do envio

Também disponibiliza botão **Baixar arquivo** para download direto do relatório.

**Relatório de admissão:** planilha no mesmo padrão das exportações de dados do sistema, com um conjunto de campos cadastrais pré-definidos. Quando enviado individualmente (dentro do cartão), gera uma linha com os dados daquele colaborador. Quando enviado em massa (ação em desenvolvimento), gera uma planilha única com uma linha por colaborador selecionado.

O conjunto de campos foi definido com o layout de importação do Domínio Sistemas como referência futura. Em versões posteriores, os campos serão mapeados para os códigos esperados pelo Domínio.

**Campos exportados no relatório de admissão (v1):**

| Seção | Campo | Observação |
|---|---|---|
| Cargos e Salários | Vínculo | |
| Cargos e Salários | Cargo | |
| Cargos e Salários | Nível do Cargo | |
| Cargos e Salários | Tipo de Salário | |
| Cargos e Salários | Forma de Pagamento | |
| Cargos e Salários | Salário | |
| Informações Básicas | Matrícula | |
| Informações Básicas | Empresa | |
| Informações Básicas | Área | |
| Informações Básicas | Centro de Custo | |
| Informações Básicas | Data de Admissão | |
| Dados Pessoais | Nome Completo | |
| Dados Pessoais | Data de Nascimento | |
| Dados Pessoais | Gênero no Documento | |
| Dados Pessoais | Cor/Raça | |
| Dados Pessoais | Estado Civil | |
| Dados Pessoais | Nome da Mãe | |
| Dados Pessoais | Nome do Pai | |
| Dados Pessoais | UF Natal | |
| Endereço | Rua | |
| Endereço | Número | |
| Endereço | Complemento | |
| Endereço | Bairro | |
| Endereço | Cidade | |
| Endereço | Estado | |
| Endereço | CEP | |
| Contatos | Celular | |
| Contatos | Telefone Residencial | |
| Contatos | Email Principal | |
| CPF | Número | |
| RG | Número | |
| RG | Órgão Expeditor | |
| RG | UF Expedidor | |
| RG | Data de Expedição | |
| Dados Bancários | Banco | |
| Dados Bancários | Tipo de Conta | |
| Dados Bancários | Conta | |
| Dados Bancários | Dígito | |

> **Roadmap:** está previsto o desenvolvimento de layouts específicos por sistema contábil (configuráveis por sistema, assim como já existe na Folha de Pagamento). A versão atual envia apenas o relatório padrão acima por e-mail.

### 5. Checklist de admissão

Lista de tarefas operacionais do onboarding, configuradas no modelo de admissão (ex: Crachê, Conta de e-mail, entrega de equipamentos).

- Cada tarefa pode ser marcada como concluída individualmente
- Tarefas concluídas podem ser reabertas via botão **Reabrir**
- É possível adicionar tarefas avulsas via botão **Nova tarefa** diretamente no cartão — essas tarefas ficam apenas naquele cartão e não alteram o modelo de admissão
- A etapa é considerada concluída quando todas as tarefas estiverem marcadas

---

## Ações no rodapé do cartão

| Ação | Disponibilidade |
|---|---|
| **Excluir cartão** | Sempre disponível — exclusão permanente |
| **Arquivar cartão** | Cartões ativos — move para o arquivo |
| **Desarquivar cartão** | Cartões arquivados — devolve ao kanban |
| **Concluir cartão** | Cartões ativos — encerra o processo como concluído |

> O admin pode concluir um cartão mesmo que uma ou mais etapas ainda não estejam concluídas. O sistema não bloqueia a conclusão — as etapas pendentes ficam registradas no histórico do cartão.

---

## Configuração de modelos de admissão

Acessado em **Configurações > Modelos de admissão** (`app.kiip.team/admin/settings/admission-templates`).

Criação via botão **Novo modelo**. Fluxo em 3 etapas:

### Etapa 1 — Detalhes

- **Nome do modelo\*** — obrigatório

### Etapa 2 — Aplicabilidade

Define para quais colaboradores o modelo será sugerido por padrão ao iniciar uma admissão. Filtros disponíveis:

- **Aplicar a todos os colaboradores** — toggle
- **Cargos** — um ou mais cargos
- **Áreas** — uma ou mais áreas
- **Vínculos** — um ou mais vínculos
- **Centros de custos** — um ou mais centros de custo
- **Empresas** — uma ou mais empresas

> A aplicabilidade é uma sugestão de filtro na seleção de pessoas — não uma restrição. O modelo pode ser usado para qualquer colaborador da conta, independentemente da aplicabilidade configurada.

### Etapa 3 — Checklist de tarefas

Define as tarefas que aparecerão na etapa **Checklist de admissão** do cartão.

- Campo de texto + botão **Adicionar tarefa**
- Tarefas reordenáveis via drag and drop
- Cada tarefa pode ser excluída individualmente
- Botão final: **Criar modelo**

> Tarefas adicionadas diretamente dentro de um cartão de admissão (via "Nova tarefa") ficam apenas naquele cartão. Para alterar o modelo, é necessário editar o modelo em Configurações > Modelos de admissão.

---

## Corner cases e pontos de atenção

- **Documentos da etapa Documentos são dinâmicos enquanto o cartão estiver aberto:** qualquer documento associado ao colaborador aparece automaticamente, independente da origem (módulo de Documentos, fluxo de adição) e da data de geração. Ao encerrar o cartão, o histórico congela com os documentos existentes até a data de conclusão.
- **Colaborador com dados já preenchidos:** se a pessoa já tinha os dados do link de admissão preenchidos antes de entrar no fluxo, a tarefa "Preencher dados" não é marcada automaticamente — o gestor precisa concluir manualmente.
- **Copiar link marca envio automaticamente:** ao copiar o link de admissão pelo botão "Copiar link", o sistema registra que o link foi enviado (por canal externo) e marca a tarefa correspondente como concluída.
- **Conclusão do cartão não exige etapas completas:** o admin pode concluir o cartão a qualquer momento, mesmo com etapas pendentes. O registro das etapas inconcluídas fica no histórico do cartão.
- **Dependência entre etapas:** a etapa Documentos depende de "Dados do colaborador" para ser iniciada. Se o link de admissão não foi enviado/concluído, os documentos não podem ser processados.
- **"Erro ao processar" na etapa Documentos** origina-se no Kiip Sign — seguir o mesmo diagnóstico do módulo de Documentos (verificar variáveis pendentes no perfil do colaborador).
- **Progresso % é calculado por etapas concluídas**, não por tarefas individuais. Cada etapa tem peso igual no total.
- **Checklist de admissão pode ser concluído independentemente** das demais etapas — não tem dependência de outras etapas.
- **Arquivar ≠ Excluir:** cartões arquivados são recuperáveis via Arquivo. Exclusão é permanente.
- **Arquivamento automático após 30 dias:** admissões concluídas são automaticamente arquivadas após 30 dias — saem da coluna "Concluído recentemente" e vão para o Arquivo.
- **Admissão via diretório (individual):** ao adicionar pessoa pelo diretório e selecionar um modelo de admissão, o colaborador é automaticamente inserido no controle de admissão — não é necessário abrir um cartão manualmente depois.
- **Admissão via planilha em massa** (em desenvolvimento): seguirá o mesmo comportamento — seleção do modelo aplicada a todos da planilha.
- **Nova tarefa no cartão não altera o modelo:** para mudanças permanentes no checklist, editar o modelo em Configurações.
- **Envio em massa para contabilidade** (em desenvolvimento): o sistema valida dados antes de enviar — colaboradores com dados incompletos são bloqueados individualmente, sem impedir o envio dos demais.
- **As 5 etapas são fixas:** não é possível adicionar, remover ou reordenar etapas do processo de admissão — apenas o checklist de tarefas é configurável via modelo.
- **Contadores como destinatários** no Registro na contabilidade precisam estar cadastrados em **Configurações > Contadores**.
- **Grupos de múltiplas respostas no relatório de admissão:** quando o colaborador tem múltiplos registros em um grupo de múltiplas respostas (ex: Dados Bancários), o relatório exporta apenas o registro mais recente — comportamento da v1.
