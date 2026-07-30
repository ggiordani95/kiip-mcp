# Férias

Base de conhecimento sobre o módulo de Gestão de Férias: fluxo de solicitação, gestão de saldo, configuração de políticas por vínculo e operações em massa.

---

## O que é o módulo de Férias

O módulo de Férias é um módulo de sistema — não um processo personalizado — que oferece um fluxo estruturado para solicitação, aprovação e acompanhamento de férias dos colaboradores. Ele gerencia automaticamente os períodos aquisitivos e concessivos de cada pessoa, controla o saldo disponível e integra com a contabilidade via e-mail ao aprovar uma solicitação.

Acessado em **Processos > Gestão de férias** (`app.kiip.team/workflows/[id]`).

Embora apareça na listagem de Processos, a Gestão de Férias tem comportamento próprio e lógica de automação específica — não é configurável da mesma forma que um processo personalizado. As configurações de política de férias ficam em **Configurações > Férias**.

---

## Estrutura do módulo

O módulo tem três abas:

| Aba | Visibilidade | Descrição |
|---|---|---|
| **Solicitação de férias** | Todos os usuários com acesso | Kanban com os cartões de solicitação em andamento |
| **Gestão de saldo** | Administradores e líderes diretos | Visão consolidada do saldo de férias de todos (admin) ou dos liderados diretos (líder) |
| **Meu saldo** | Todos os usuários | Visão do próprio saldo de férias do colaborador logado |

---

## Aba Solicitação de férias

### Kanban e etapas

A aba exibe um kanban com sete etapas fixas de processo. As quatro primeiras são etapas ativas de tramitação; as três últimas são etapas de encerramento ou espera.

| Etapa | Descrição |
|---|---|
| **Aprovação do líder** | Solicitação aberta pelo colaborador, aguardando aprovação do líder direto |
| **Aprovação do RH** | Aprovada pelo líder, aguardando aprovação do RH/DP |
| **Documentação** | Aprovada pelo RH; ao avançar para esta etapa, o sistema abre automaticamente o modal de envio para a contabilidade |
| **Aprovado** | Documentação concluída; férias aprovadas e aguardando início |
| **Em férias** | Colaborador no período de férias (transição automática pelo sistema) |
| **Concluído** | Período de férias encerrado (transição automática pelo sistema) |
| **Reprovado** | Solicitação reprovada em qualquer etapa |

### Filtros disponíveis no kanban

Busca por nome, filtro por Solicitantes, Responsáveis e Etapas.

### Automações do sistema

O sistema executa duas automações diárias após a meia-noite:

- **Início das férias:** verifica todos os cartões na etapa Aprovado e move para **Em férias** aqueles cuja data de início chegou. Atualiza automaticamente o status da pessoa para "Em férias".
- **Fim das férias:** verifica todos os cartões na etapa Em férias e move para **Concluído** aqueles cuja data de fim chegou. Atualiza automaticamente o status da pessoa para "Em atividade".

### Cartão de solicitação

Ao abrir um cartão, o painel exibe três seções:

**Informações do cartão (lado esquerdo):**
- Nome e cargo do colaborador
- Data de criação
- Histórico de etapas percorridas com data e responsável

**Formulário da etapa atual (centro):**
- Orientações de preenchimento configuradas pelo admin para aquela etapa
- Campo Comentário
- Campo Anexos

**Ações (lado direito):**
- Próxima etapa sugerida + botão **Avançar**
- Etapa anterior + botão **Retornar**
- Botão **Reprovar**
- Botão **Excluir cartão** (rodapé)

**Conteúdo expandível do histórico:** ao expandir uma etapa no histórico, são exibidos data de saída da etapa, comentário e anexos registrados. O Formulário inicial expande com todos os dados da solicitação: data de início, data de término, período aquisitivo, período concessivo, dias de férias, abono pecuniário, antecipação do 13º salário e comentário.

### Envio para contabilidade

Ao avançar um cartão da etapa Aprovação do RH para Documentação, o sistema abre automaticamente o modal **Enviar para contabilidade**. O modal lista os contadores cadastrados na conta com seus escritórios de contabilidade. O responsável seleciona os destinatários e clica em **Enviar** — um e-mail com as informações da solicitação é enviado. A contabilidade não tem um caminho de retorno direto no sistema; a comunicação de resposta ocorre pelo canal habitual entre o DP e a contabilidade.

### Nova solicitação

Botão **Nova solicitação** abre o formulário de solicitação. O solicitante é pré-preenchido com o usuário logado e pode ser alterado pelo admin.

**Campos do formulário:**

- **Período concessivo\*** — dropdown com os períodos concessivos disponíveis para o colaborador; períodos futuros (saldo ainda não creditado) também aparecem, identificados com tag "Saldo futuro"
- **Período de férias\*** — calendário duplo para seleção das datas; o calendário só exibe datas dentro do período concessivo selecionado
- **Abono pecuniário** — campo numérico para informar a quantidade de dias de abono a converter em pecúnia; disponível conforme configuração do vínculo
- **Antecipação da 1ª parcela do 13º salário** — campo de opção única; disponível conforme configuração do vínculo
- **Comentário** — campo de texto livre para justificativa ou observação
- **Anexos** — upload de arquivos

**Indicadores em tempo real durante a seleção:**
- **Saldo disponível** — dias do período concessivo selecionado ainda não utilizados
- **Dias selecionados** — total de dias marcados no calendário
- **Saldo restante** — saldo disponível menos dias selecionados

**Requisitos exibidos na tela** (validados em tempo real, com status verde/vermelho):
- Os dias selecionados não devem exceder o saldo disponível
- Período mínimo (configurável por vínculo)
- Quantidade máxima de períodos por divisão
- Nenhum período deve ser inferior ao mínimo configurado
- Um dos períodos precisa ser igual ou maior que 14 dias (padrão CLT)
- Antecedência mínima (configurável por vínculo)
- A data de início deve anteceder feriado ou RSR em dois dias (padrão CLT)
- A data de início deve estar dentro do período concessivo
- A data de término deve estar dentro do período concessivo

> As validações dos requisitos são baseadas na política configurada para o vínculo do colaborador. Períodos futuros (saldo ainda não creditado) têm validações desabilitadas — os requisitos aparecem como círculos sem cor em vez de verde/vermelho.

---

## Aba Gestão de saldo

Acessada por administradores (visão de todos os colaboradores) e líderes diretos (visão apenas dos liderados). O colaborador sem perfil admin ou liderança não tem acesso a esta aba.

### Listagem de pessoas

Exibe uma linha por pessoa com as colunas: **Nome, Admissão, Saldo Total, Limite p/ Solicitação de Férias, Limite p/ Solicitação de Abono, Status prioritário**.

**Status prioritário** exibe o status mais crítico entre os períodos aquisitivos vigentes da pessoa (ver tabela de status abaixo).

**Abas de filtro rápido:** Todos, Disponível, Vencendo, Vencido, Planejado, Adquirindo.

**Filtros adicionais:** Áreas, Centros de Custos, Vínculos, Mais filtros.

**Ações disponíveis no menu "..." da listagem:**
- **Editar saldo em massa** — atualiza os valores de saldo dos períodos aquisitivos via planilha
- **Importar solicitações em massa** — cria solicitações históricas via planilha

### Status dos períodos aquisitivos

Cada período aquisitivo tem um status individual calculado automaticamente pelo sistema:

| Status | Condição |
|---|---|
| **Adquirindo** | O colaborador ainda está no período aquisitivo — ainda não tem período concessivo aberto com saldo disponível |
| **Disponível** | Período concessivo aberto com saldo disponível; ainda na primeira metade do período concessivo |
| **Vencendo** | Período concessivo aberto com saldo disponível; já passou da metade do período concessivo |
| **Planejado** | Todo o saldo recebido já está coberto por solicitações aprovadas ainda não concluídas — mas o período concessivo ainda não acabou |
| **Utilizado** | Saldo recebido integralmente consumido por solicitações já concluídas |
| **Vencido** | Período concessivo encerrado com saldo não consumido |
| **Interrompido** | Colaborador desligado durante o período concessivo — o sistema encerra o período automaticamente e converte o saldo restante em abono |

### Saldo de férias detalhado (por pessoa)

Ao clicar no ícone de olho ou no nome de um colaborador, abre o painel **Saldo de férias detalhado**. O painel tem dois blocos:

**Cabeçalho:** Disponível, Vencido e Total — somatório dos saldos disponíveis e vencidos de todos os períodos do colaborador.

**Tabela de períodos aquisitivos:** uma linha por período, com as colunas:

| Coluna | Descrição |
|---|---|
| Período aquisitivo | Datas de início e fim do período |
| Recebido | Dias creditados ao colaborador para aquele período |
| Descontos | Dias descontados (ex: faltas) |
| Planejado | Dias cobertos por solicitações aprovadas ainda não concluídas |
| Utilizado | Dias já utilizados em solicitações concluídas |
| Abono | Dias convertidos em abono pecuniário |
| Disponível | Saldo restante (Recebido − Descontos − Planejado − Utilizado − Abono) |
| Vencimento | Data de vencimento do período concessivo |
| Status | Status do período (ver tabela acima) |

Ao expandir uma linha da tabela (seta à direita), são exibidas as solicitações de férias relacionadas a aquele período, com: período de férias, dias de férias, dias de abono e etapa atual do cartão.

**Registro de alterações:** abaixo da tabela de períodos, lista todas as alterações manuais e automáticas realizadas sobre os períodos aquisitivos, com tipo (Automática / Manual), responsável, data e hora, e os campos alterados com valores de/para.

### Edição individual de período aquisitivo

No menu "..." de cada linha da tabela de períodos → **Editar período aquisitivo**. Esta é a única forma de alterar as datas de um período — a planilha de edição em massa altera apenas valores de saldo.

**Campos editáveis — bloco de datas:**

| Campo | Descrição |
|---|---|
| **Data de início** | Início do período aquisitivo |
| **Data de término** | Fim do período aquisitivo — campo-chave para propagação |
| **Data de vencimento** | Término do período concessivo (data de expiração do direito) |

**Campos editáveis — bloco de saldo:**

| Campo | Descrição | Editável |
|---|---|---|
| **Recebido** | Total de dias de férias que o colaborador tem direito neste ciclo | Sim |
| **Descontos** | Dias descontados do saldo por algum motivo | Sim |
| **Utilizado** | Dias de férias já usufruídos | Sim |
| **Abono** | Dias convertidos em abono pecuniário | Sim |
| **Disponível** | Recebido − Descontos − Utilizado − Abono | Calculado — não editável |

**Validação:** o sistema bloqueia o salvamento se o resultado for saldo disponível negativo, exibindo a mensagem "O saldo disponível não pode ser negativo". O botão Salvar permanece desabilitado até os valores serem ajustados.

#### Comportamento automático ao alterar o término do aquisitivo

A data de término do aquisitivo é o campo-chave do modal. Sempre que ela é alterada, o sistema recalcula automaticamente a data de início do período concessivo para o dia seguinte ao novo término — independentemente de qualquer outra escolha do admin.

#### Modal de confirmação de propagação

Quando a data de término do aquisitivo é alterada **e o período editado não é o último**, o sistema exibe o modal **Atualizar períodos seguintes?** com duas opções:

| Opção | Comportamento |
|---|---|
| **Atualizar períodos seguintes** | Recalcula início e término de todos os ciclos posteriores, respeitando a duração configurada no vínculo (ex: 12 meses para CLT) |
| **Salvar apenas este período** | Salva apenas o período editado; ciclos posteriores permanecem com as datas originais |

Se o período editado for o último, o sistema salva diretamente sem exibir o modal.

> A propagação usa a **duração configurada no vínculo**, não o intervalo do ciclo anterior. Um vínculo CLT sempre gera ciclos de 12 meses independentemente do tamanho do período editado manualmente.

#### Resumo do comportamento por tipo de edição

| Edição realizada | Modal exibido? | Início do concessivo atualiza? | Ciclos seguintes atualizam? |
|---|---|---|---|
| Alterar só o início do aquisitivo | Não | Não | Não |
| Alterar o fim do aquisitivo (último período) | Não | Sim, automaticamente | N/A |
| Alterar o fim do aquisitivo (intermediário) — confirmar propagação | Sim | Sim, automaticamente | Sim |
| Alterar o fim do aquisitivo (intermediário) — recusar propagação | Sim | Sim, automaticamente | Não |
| Alterar só o vencimento do concessivo | Não | Não | Não |
| Alterar qualquer campo de saldo | Não | Não | Não |

#### Registro de alterações

Cada edição gera uma entrada no Registro de alterações do colaborador com: quem editou, data/hora e campos alterados (de/para). Quando a propagação é recusada, o log registra "por escolha do administrador" — para diferenciar de uma omissão do sistema.

---

## Aba Meu saldo

Visão individual do colaborador logado. Exibe as mesmas informações do painel "Saldo de férias detalhado" descrito acima, mas referente apenas à própria pessoa. Inclui os blocos Disponível, Vencido, Total, tabela de períodos aquisitivos, expansão de solicitações por período e registro de alterações.

---

## Lógica de períodos aquisitivos e concessivos

### Geração automática ao adicionar colaborador

Ao cadastrar um colaborador, o sistema lê a data de admissão e a configuração do vínculo para calcular e criar automaticamente todos os períodos aquisitivos retroativos desde a admissão.

Para cada período já encerrado (período concessivo finalizado), o sistema registra automaticamente que o colaborador recebeu o saldo integral configurado para o vínculo e que todo esse saldo foi consumido — deixando o status como Utilizado.

Para o período concessivo atual (ainda em aberto), o sistema registra o saldo integral como disponível. Para o período aquisitivo ainda em andamento, deixa o saldo zerado (status Adquirindo).

Exemplo: colaborador CLT admitido há 5 anos adicionado agora — o sistema cria todos os 5 ciclos de períodos retroativos, marca os anteriores como utilizados, e deixa o período atual disponível.

### Serviço diário de encerramento de períodos

Todo dia, após a meia-noite, um serviço verifica se algum período aquisitivo foi encerrado naquele dia. Quando sim, o sistema:
1. Credita o saldo configurado para o vínculo no período concessivo que se abre
2. Cria um novo período aquisitivo (adquirindo) em sequência

### Desligamento e status Interrompido

Quando um colaborador é desligado, o sistema automaticamente encerra o período concessivo ativo e converte o saldo restante daquele período em abono. O período recebe o status Interrompido.

---

## Configuração de políticas por vínculo

Acessado em **Configurações > Férias** (`app.kiip.team/admin/settings/vacation`).

A tela lista todos os vínculos cadastrados na conta com seu status (Ativado / Desativado). Cada vínculo tem uma política de férias independente.

Ao clicar no ícone de lápis de um vínculo, abre o modal **Editar política de vínculo** com os seguintes campos:

### Habilitar férias para este vínculo
Toggle Sim / Não. Quando desativado, o vínculo não aparece no fluxo de solicitações e não gera períodos aquisitivos.

### Período aquisitivo
- **12 meses (Padrão CLT)** — período de 12 meses
- **Personalizado** — define um período em meses diferente do padrão

O sistema sempre cria um período concessivo de mesmo tamanho que o aquisitivo, iniciando um dia após o término do aquisitivo.

### Saldo de férias
- **30 dias (Padrão CLT)**
- **Personalizado** — define quantidade de dias diferente

### Quantidade de períodos para divisão de férias
- **Três (3) com restrições (Padrão CLT)** — permite até 3 períodos, com as restrições do Art. 134 da CLT (um período ≥ 14 dias, nenhum período < 5 dias)
- **Livre** — sem restrições de quantidade ou tamanho mínimo de período
- **Desabilitado** — férias precisam ser tiradas de uma vez só

### Colaboradores menores de 18 anos e maiores de 50 têm direito à divisão de férias?
- **Sim** — permite divisão para essas faixas
- **Não (Padrão CLT)** — não permite divisão para essas faixas (conforme Art. 134 §2º CLT)

### Antecedência mínima para solicitação de férias
- **Até 30 dias (Padrão CLT)** — a solicitação deve ser feita com pelo menos 30 dias de antecedência
- **Personalizado** — define antecedência diferente

### Abono pecuniário
- **Um terço do saldo de férias do período (Padrão CLT)** — permite converter até 1/3 dos dias em pecúnia
- **Desabilitado** — abono não está disponível para o vínculo
- **Personalizado** — define as opções de quantidade de dias de abono disponíveis para seleção (lista de valores configurável, ex: 1, 2, 3... até 10 dias); também define o prazo limite para solicitação de abono:
  - **Até 15 antes do término do período aquisitivo**
  - **A qualquer momento, até o fim do período concessivo**

### Dias de início das férias
- **Até dois dias antes de feriado ou RSR (Padrão CLT)** — a data de início não pode ser véspera de feriado nem véspera de repouso semanal remunerado
- **Qualquer dia útil** — sem restrição de dia de início

### Permitir solicitação de antecipação da 1ª parcela do 13º salário
- **Não**
- **Sim (Padrão CLT)** — permite solicitar a antecipação, mas o colaborador escolhe se quer ou não no formulário
- **Sim (livre)** — antecipação é solicitada automaticamente sem opção de recusa pelo colaborador

---

### Edição de política com impacto nos períodos existentes

Quando uma alteração na política de vínculo pode afetar períodos aquisitivos já criados, o sistema identifica esse impacto e exibe um modal perguntando ao administrador como aplicar a mudança. As duas situações que disparam esse fluxo são:

- **Habilitação ou desabilitação do módulo de férias para o vínculo**
- **Alteração do tamanho do período aquisitivo** (ex: de 12 para 6 meses)

O admin escolhe entre duas opções:

- **A partir de uma data** — a alteração vale apenas para períodos criados a partir daquela data; os períodos existentes não são recalculados
- **Retroativo para todos** — o sistema recalcula e atualiza os períodos de todos os colaboradores associados ao vínculo

> **Bug conhecido:** quando o período aquisitivo está configurado como Personalizado e o admin altera de volta para a opção **12 meses (Padrão CLT)**, o fluxo de atualização em massa dos colaboradores **não é disparado**. A alteração é salva, mas os períodos existentes não são recalculados.
>
> **Workaround:** em vez de selecionar "12 meses (Padrão CLT)", manter a opção **Personalizado** e digitar 12 meses manualmente. Nesse caso o sistema identifica a mudança corretamente e dispara o fluxo de atualização. Este bug está em desenvolvimento.

---

## Operações em massa — Gestão de saldo

### Editar saldo em massa (via planilha)

Permite atualizar os valores de saldo dos períodos aquisitivos de múltiplos colaboradores de uma vez. **Não altera as datas dos períodos** — apenas os valores de Recebido, Descontos, Utilizado e Abono.

**Fluxo em 3 etapas:**

1. **Selecionar pessoas** — lista de colaboradores com filtros por Status, Centro de custo e outros
2. **Baixar template** — download da planilha `.xlsx` com todos os períodos aquisitivos das pessoas selecionadas; colunas: ID, Pessoa, Período aquisitivo, Recebido, Descontos, Planejado, Utilizado, Abono
3. **Upload do arquivo** — importação da planilha editada; formato `.xlsx`; tamanho máximo: 128MB

> Não alterar a estrutura da planilha. Modificar apenas os campos de valores (Recebido, Descontos, Utilizado, Abono). A coluna Planejado é calculada automaticamente pelo sistema e ignorada na importação mesmo que alterada.

### Importar solicitações em massa (via planilha)

Permite registrar o histórico de solicitações de férias de múltiplos colaboradores de uma vez. Usado principalmente na implantação para regularizar o histórico do time.

**Fluxo em 3 etapas:**

1. **Selecionar pessoas** — lista de colaboradores com filtros
2. **Baixar template** — download da planilha `.xlsx`; colunas: ID, Pessoa, Período aquisitivo, Solicitação (1, 2, 3), Solicitação - Início, Solicitação - Fim; cada período aquisitivo já vem com linhas pré-criadas para até 3 solicitações; para mais de 3 solicitações no mesmo período, duplicar a linha correspondente
3. **Upload do arquivo** — importação da planilha preenchida; formato `.xlsx`; tamanho máximo: 128MB

**Regras de validação na importação em massa:**

A importação via planilha aplica um conjunto menor de regras do que o fluxo de solicitação pela interface. As principais diferenças são:

- É permitido registrar uma solicitação fora do período concessivo (útil para férias vencidas tiradas retroativamente)
- Não são verificados os requisitos de antecedência, tamanho mínimo de período, dia de início, etc.

O único bloqueio que se mantém é o seguinte: a soma dos dias de todas as solicitações importadas para um período aquisitivo não pode ultrapassar o total de dias recebidos daquele período. Se isso acontecer, o sistema importa as solicitações que cabem dentro do saldo e rejeita a última solicitação que ultrapassaria o limite.

> Solicitações importadas em massa não passam pelo fluxo de aprovação — são registradas diretamente como histórico.

---

## Configuração do processo de solicitação

O processo de solicitação de férias é configurável pelo admin nos mesmos moldes de um processo personalizado. Acessado pelo menu "..." no canto superior direito do kanban → **Editar processo**.

O painel lateral tem cinco abas:

**Detalhes:** Nome do processo, Descrição, Quem pode criar um novo cartão (padrão: Qualquer pessoa da empresa).

**Admins:** Lista de administradores do processo com acesso total ao kanban. O criador é adicionado automaticamente como Proprietário.

**Formulário inicial:** Campos exibidos no formulário de solicitação. Além dos campos fixos de período e datas (gerados automaticamente pelo sistema), o admin pode adicionar campos customizados como Abono pecuniário, Antecipação da 1ª parcela do 13º salário, Comentário e Anexos. Suporta os mesmos tipos de campo disponíveis nos processos personalizados.

**Etapas:** Lista as 7 etapas do processo (Aprovação do líder, Aprovação do RH, Documentação, Aprovado, Em férias, Concluído, Reprovado). Cada etapa é editável com sub-abas Detalhes (nome, descrição, cor, responsáveis), Formulário (campos adicionais por etapa) e Ações (toggles de avançar, retornar, concluir, reprovar).

**Notificações:** Configura canais de notificação (Sistema, WhatsApp, E-mail) para três perfis: Administrador do processo (aviso de abertura e de alteração de etapa), Responsável da etapa (aviso de cartão aguardando aprovação) e Proprietário do cartão (aviso de abertura e de alteração de etapa).

### Exportação de cartões

Disponível no menu "..." → **Exportar cartões via planilha**. Segue o mesmo fluxo em 4 etapas da funcionalidade genérica de processos: Campos do colaborador → Dados do cartão → Campos do processo → Opções. O arquivo é enviado por e-mail e fica disponível por 7 dias.

---

## Integrações automáticas

### Integração com a Folha de Pagamento

Ao abrir uma folha de pagamento, o sistema verifica automaticamente se existem solicitações de férias concluídas ou em andamento cujo início caia dentro do período de referência da folha. Para cada colaborador incluído na folha, o sistema lê as solicitações correspondentes e calcula quantos dias daquela solicitação pertencem ao período de referência em questão — caso as férias se estendam além do período, apenas os dias dentro da janela são considerados.

Essa informação é importada automaticamente como lançamento programado na folha, sem necessidade de preenchimento manual. Para mais detalhes sobre como os lançamentos de férias aparecem e são tratados na abertura da folha, ver a documentação do módulo de Folha de Pagamento.

### Integração com o Kiip Ponto

Quando uma solicitação de férias é aprovada (avança para a etapa Aprovado), o sistema envia automaticamente ao Kiip Ponto uma solicitação de abono com motivo "Férias" para todos os dias contemplados pela solicitação. Isso ocorre apenas para colaboradores que estão ativos no Kiip Ponto e vinculados a uma unidade configurada na conta.

Essa automação evita que o gestor precise lançar o período de férias manualmente no sistema de ponto. O abono é enviado no momento da aprovação — não na data de início das férias.

---

## Limitações conhecidas e débitos técnicos

- **Férias coletivas:** não há fluxo automatizado para férias coletivas. O registro pode ser feito manualmente via edição de períodos aquisitivos e importação em massa de solicitações, mas é um processo manual sem automação de aprovação em lote.
- **Solicitação de férias vencidas pela interface:** não é possível criar via interface uma solicitação para um período concessivo já vencido. Esse registro deve ser feito via planilha de importação em massa.
- **Vínculo Estágio:** a CLT prevê que estagiários devem usufruir das férias durante o próprio período aquisitivo (contrato de 6 meses). O sistema não trata essa especificidade — o período concessivo é criado após o aquisitivo, como nos demais vínculos, o que não corresponde à lógica legal do estágio.
- **Atrasos do Kiip Ponto não geram descontos automáticos no saldo de férias:** qualquer desconto por falta precisa ser registrado manualmente no campo Descontos do período aquisitivo.

---

## Corner cases e pontos de atenção

- **Períodos retroativos na implantação:** ao adicionar um colaborador com anos de histórico, o sistema cria todos os períodos automaticamente com saldo integral. A empresa precisa regularizar esse saldo via edição em massa ou individual para refletir o histórico real.
- **Edição de datas do período aquisitivo:** só possível pela edição individual na interface — a planilha de edição em massa não permite alterar datas.
- **Importação em massa de solicitações aceita datas fora do período concessivo:** comportamento esperado para regularização de histórico. Não usar para solicitações futuras.
- **Limite de importação por saldo:** a importação rejeita apenas a solicitação que ultrapassaria o saldo — não cancela o lote inteiro.
- **Automações de status do cartão são diárias:** a transição para Em férias e para Concluído ocorre na virada do dia após a meia-noite, não no horário exato de início ou fim das férias.
- **Envio para contabilidade é disparado automaticamente** ao avançar da etapa Aprovação do RH — o responsável precisa selecionar os destinatários no modal que se abre antes de confirmar o avanço.
- **Status Interrompido é automático no desligamento:** ao desligar um colaborador, o saldo residual vira abono sem ação manual necessária.
- **Período futuro no formulário de solicitação:** colaboradores podem abrir solicitações para períodos concessivos ainda não disponíveis (saldo futuro). As validações de requisitos ficam desabilitadas nesses casos.
- **Configuração de abono pecuniário "Personalizado":** permite definir exatamente quais quantidades de dias de abono o colaborador pode escolher (ex: 1 a 10 dias). O prazo limite de solicitação de abono também é configurável por este modo.
