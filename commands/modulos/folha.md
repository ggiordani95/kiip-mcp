# Folha de Pagamento

Base de conhecimento sobre o módulo de Folha de Pagamento: abertura de folha, lançamentos, importações, fechamento, distribuição de documentos e configuração de eventos e modelos.

---

## O que é o módulo de Folha de Pagamento

O módulo de Folha de Pagamento é o consolidador central de dados para o fechamento mensal. Ele conecta informações de outros módulos (férias, ponto, benefícios) ao time de Departamento Pessoal, organizando os lançamentos para envio à contabilidade.

> **Posicionamento importante:** a Kiip **não é um software de processamento de folha**. O módulo não calcula INSS, imposto de renda ou outras incidências tributárias. A responsabilidade pelo processamento permanece na contabilidade parceira. O papel do sistema é consolidar e organizar os dados variáveis para facilitar esse trabalho.

O módulo opera hoje em **fase 1 — consolidação de dados**. Está prevista uma reescrita estrutural futura para suportar lançamentos incrementais (ao longo do mês) e maior performance para grandes volumes.

---

## Acesso ao módulo

Administradores com acesso ao módulo de folha **visualizam as folhas de todas as empresas cadastradas na conta**. Isso exige atenção ao configurar grupos de acesso — empresas com filiais que precisam de isolamento devem usar **contas separadas**.

---

## Tela principal — Gerenciar folhas

Acessado em `app.kiip.team/payroll`. Duas abas:
- **Gerenciar folhas** — listagem de todas as folhas da conta
- **Meus demonstrativos** — visão do colaborador para seus próprios demonstrativos

A listagem exibe: nome da folha (mês/ano + nome do modelo), data de criação, data da última edição, status, ícones de holerites e relatórios individuais, e ações.

### Status de folha

| Status | Descrição | Ações disponíveis |
|---|---|---|
| **Rascunho** | Folha aberta, ainda não fechada | Editar, Excluir |
| **Fechada** | Folha fechada | Visualizar, menu de ações (reabrir, baixar relatórios, enviar para contabilidade) |

> A folha pode ser **reaberta** a qualquer momento após o fechamento — o botão **Reabrir Folha** aparece no header da folha fechada. O sistema não bloqueia a reabertura com base em nenhum estado externo (ex: envio para a contabilidade). Essa responsabilidade é do gestor.

---

## Visão geral do fluxo

```
1. Abrir folha (período + modelo + pessoas)
      ↓
2. Lançamentos programados (férias etc.)
      ↓
3. Preencher eventos (automático / manual / importação)
      ↓
4. Fechar folha
      ↓
5. Baixar relatórios / Enviar para contabilidade / Distribuir documentos
```

---

## Etapa 1 — Abertura da folha

### Configurações iniciais

Modal **Nova folha de pagamento**. O gestor define:

- **Mês e Ano** — período de referência do fechamento
- **Dias úteis (mês seguinte)** — o sistema sugere o valor com base no calendário nacional. Tooltip: "Utilizado para calcular eventos variáveis com regra Valor x Dias Úteis (mês seguinte)". O gestor pode editar manualmente. O sistema **não possui cadastro de feriados locais** — isso está previsto para o módulo de ponto futuro.
- **Modelo de folha** — opcional; se selecionado, pré-define os eventos e pode filtrar pessoas por empresa

> Se o modelo não estiver associado a nenhuma empresa, a etapa de seleção de pessoas exibirá todos os colaboradores da conta.

### Seleção de pessoas

Modal **Selecionar Pessoas**. Colunas exibidas: Nome completo, Cargo, Área, **Status do período**.

- Filtros disponíveis por vínculo, setor, área etc.
- Se nenhuma pessoa for selecionada, todas as cadastradas no sistema serão incluídas automaticamente
- O sistema **exclui automaticamente desligados antigos**, mas **inclui colaboradores com status "desligado no período"** — pois podem precisar participar do fechamento daquele mês
- É possível abrir folhas de períodos passados para fins de histórico ou importação de holerites antigos

---

## Etapa 2 — Lançamentos programados

Antes de montar a tabela de lançamentos, o sistema verifica se existem **lançamentos programados** para o período.

Hoje o único lançamento programado tratado é o de **férias**: o sistema identifica colaboradores com férias no período, calcula os dias dentro da janela e sugere o lançamento correspondente.

> No futuro, outros módulos (reembolsos, bônus) deverão gerar lançamentos programados automaticamente quando configurados para pagamento em folha.

---

## Etapa 3 — Preenchimento de eventos

A tabela de lançamentos lista todas as pessoas selecionadas com uma coluna por evento. Existem três formas de preencher:

### 3a. Preenchimento automático (por regra do evento)

Ao abrir a folha, o sistema percorre os eventos do modelo e, para cada um que possui uma regra configurada, tenta calcular o valor automaticamente. O valor calculado aparece preenchido na tabela.

### 3b. Preenchimento manual

Qualquer célula da tabela pode ser editada manualmente. Isso é **pontual** — altera apenas o documento de fechamento daquele mês. Não atualiza o perfil do colaborador para os meses seguintes. Se o dado estiver desatualizado no diretório, o correto é atualizar lá também para que o próximo mês venha correto automaticamente.

### 3c. Importação via planilha

Acessado pelo botão de importação dentro da folha aberta. Aceita arquivos **XLS ou XLSX** (não CSV). Tamanho máximo: 128MB.

**Regras de mapeamento:**
- **Coluna 1:** nome do colaborador — deve ser **idêntico** ao nome cadastrado no sistema
- **Demais colunas:** o nome da coluna deve ser **idêntico ao nome do evento** cadastrado no sistema
- Não é necessário seguir a mesma ordem das colunas da tabela de lançamentos
- Não é necessário incluir todos os eventos do modelo — pode-se importar apenas os eventos necessários

**Formatação do conteúdo das células por tipo de evento:**

| Tipo de regra | Formato esperado | Exemplo |
|---|---|---|
| Monetário | Número com ponto para milheiro e vírgula para centavos, sem símbolo de moeda | `1.500,00` |
| Numérico inteiro | Número inteiro puro | `3` |
| Horas:minutos | Horas dois-pontos minutos | `10:30` |
| Valor x Unidade | Número inteiro (quantidade de unidades) | `5` |

**Opções de importação:**
- **Somar aos dados já preenchidos** — recomendado quando o preenchimento foi feito manualmente ou ainda não foi iniciado; útil para unir múltiplos relatórios
- **Substituir os dados já preenchidos** — recomendado quando foram identificados erros no preenchimento ou em uma importação anterior

**Modelos de importação disponíveis:**

| Modelo | Descrição |
|---|---|
| **Via Planilha** | Qualquer planilha adaptada ao formato descrito acima |
| **Kiip Ponto** | Integração nativa com o módulo Kiip Ponto; importa horas extras, adicionais noturnos e faltas (justificadas e injustificadas) para um período específico |
| **Naveg** | Modelo específico para o relatório de atendimentos do sistema Naveg (gestão de saúde); disponível apenas para contas habilitadas |
| **Pontual** | Modelo criado com base no relatório de ponto do sistema Pontual; específico para clientes que usam esse sistema |

**Detalhes da integração Kiip Ponto:**
- Importa: horas extras, adicionais noturnos, faltas justificadas e faltas injustificadas
- Para faltas (justificadas e injustificadas): além da **quantidade** de faltas, o sistema importa uma segunda coluna com as **datas de todas as ocorrências**, que aparece no relatório de folha
- **Atrasos não são importados** — ainda não há suporte para importação de horas/minutos de atraso do período
- A folha deve conter **apenas pessoas da mesma unidade** do Kiip Ponto — misturar empresas causa erro na importação
- O período de ponto selecionado na importação é **independente** do período da folha (comum em empresas que fecham ponto do dia 25 ao dia 25)

---

## Etapa 4 — Fechamento da folha

Botão **Fechar Folha** no header. Após o fechamento, o header exibe: **Baixar relatórios**, **Enviar relatórios**, **Reabrir Folha**, e menu "...".

**Reabertura:** disponível a qualquer momento via botão **Reabrir Folha**. O sistema não bloqueia com base em nenhum estado externo. Responsabilidade do gestor controlar se a contabilidade já processou os dados.

---

## Etapa 5 — Relatórios e distribuição

### Baixar relatórios

Dropdown com os relatórios disponíveis para download, que variam conforme a integração configurada no modelo:

**Modelo com integração Domínio:**
- Relatório Folha (.csv)
- Lançamentos - Domínio (.txt)

**Modelo com integração Questor:**
- Relatório Folha (.csv)
- Faltas (Questor: 602 - Inclusão Afastamentos) (.csv)
- Variáveis de ponto e folha (Questor: 700 - Variáveis Ponto) (.csv)

**Modelo sem integração:**
- Relatório Folha (.csv)

### Enviar para contabilidade

Fluxo acionado pelo botão **Enviar relatórios**. Varia conforme a integração do modelo:

**Modelo Domínio (2 etapas):**

Etapa 1 — E-mail:
- Selecionar destinatários (contadores cadastrados na conta)
- Selecionar relatórios a anexar: Relatório Folha (.csv) e/ou Lançamentos - Domínio (.txt)

Etapa 2 — Progresso: acompanhamento do envio

**Modelo Questor (3 etapas):**

Etapa 1 — E-mail:
- Selecionar destinatários (contadores cadastrados)
- Selecionar relatórios a anexar: Relatório Folha (.csv), Faltas - Questor 602 (.csv), Variáveis Ponto - Questor 700 (.csv)

Etapa 2 — Integração:
- Toggle **"Enviar Relatórios por API Questor"** — envia os dados diretamente via API para o sistema Questor

Etapa 3 — Progresso: barra de progresso separada para E-mail e Integração

> Os contadores aparecem como destinatários com o nome do escritório de contabilidade associado. São cadastrados em **Configurações > Contadores**.

### Compartilhar relatórios individuais

Card fixo no topo da folha fechada: **"Compartilhar relatórios individuais — Disponibilize os relatórios individuais (desdobramento bruto) aos colaboradores."**

Botão **Compartilhar** abre o fluxo de compartilhamento.

### Importar holerites em massa

Card fixo: **"Importar holerites em massa para a plataforma — Você pode fazer o upload dos holerites através de um único arquivo PDF e disponibilizá-los aos colaboradores."**

Botão **Importar** — quando holerites já foram importados, exibe status **"Importado ✓"**.

### Ações em massa sobre documentos

Disponíveis ao selecionar arquivos na lista de documentos da folha:

- Compartilhar relatórios individuais
- Indisponibilizar relatórios individuais
- Enviar relatórios individuais por e-mail
- Enviar relatórios individuais por WhatsApp
- Importar holerites
- Compartilhar holerites
- Indisponibilizar holerites
- Enviar holerites por e-mail
- Enviar holerites por WhatsApp
- Enviar para assinatura eletrônica
- Excluir holerites

### Comportamento da importação de holerites

- Aceita arquivos PDF com múltiplas páginas
- O sistema lê o documento inteiro e extrai as páginas que contêm o nome do colaborador
- Funciona tanto individualmente (uma pessoa) quanto em massa (arquivo com todos)
- Se o nome de um colaborador não for encontrado no documento, ele é ignorado silenciosamente

### Compartilhamento de demonstrativos e relatório individual

O **relatório individual** é um demonstrativo por colaborador com o desdobramento bruto de todos os eventos da folha. É especialmente útil para **colaboradores PJ**, pois permite detalhar os componentes do pagamento — valor fixo do contrato, variáveis de produtividade, comissões etc. — de forma transparente e rastreável. Muitos PJs precisam desse detalhamento para emitir nota fiscal ou para sua própria gestão financeira.

Para que o relatório individual se torne um documento válido para assinatura eletrônica, ele precisa ser **compartilhado** primeiro.

- Compartilhamento feito via **link seguro**, não pelo arquivo bruto
- O gestor pode **indisponibilizar** o link a qualquer momento (ex: se identificar erro)
- Link pode ser copiado e enviado por WhatsApp manualmente — opção "Enviar relatórios individuais por WhatsApp" nas ações em massa também está disponível

---

## Configuração de empresas (pré-requisito para integração contábil)

Acessado em **Configurações > Empresas**.

A configuração da entidade empresa é fundamental para que os relatórios contábeis sejam gerados corretamente. Para cada CNPJ cadastrado, é necessário definir:

- **Sistema contábil** — qual sistema a empresa usa (ex: Domínio, Questor)
- **Código da filial** — código utilizado pelo sistema contábil para identificar aquela empresa nos arquivos gerados (seja .txt para Domínio ou via API para Questor)

Sem essa configuração, os arquivos de lançamentos não serão gerados corretamente ao fechar a folha, independentemente de como os eventos estejam configurados no modelo.

> Em contas com múltiplas empresas, cada CNPJ pode estar associado a um sistema contábil diferente — a configuração é feita individualmente por empresa.

---

## Configuração de eventos

Acessado em **Configurações > Folha de Pagamento > Eventos**.

### Tipo de evento

| Tipo | Descrição |
|---|---|
| **Fixo** | Valor calculado automaticamente por regra predefinida |
| **Variável** | Valor inserido manualmente ou via importação |

### Regras disponíveis por tipo

**Fixo:**
- **Valor de Campo do sistema** — o valor preenchido em um campo do diretório é lançado na folha (ex: salário)
- **% Fixo x Campo do sistema** — calcula o valor final automaticamente com base no percentual pré-definido de um valor preenchido em um campo do sistema do tipo monetário (ex: 20% do salário)

**Variável:**
- **Valor livre** — não há regra de cálculo; o valor é inserido livremente (manual ou via importação)
- **Valor x Unidade** — ao inserir a quantidade de unidades na folha, o sistema calcula o valor final automaticamente com base no valor fixo por unidade definido no evento
- **% Fixo x Valor Livre** — ao inserir o valor livremente na folha, o sistema calcula o valor final com base no percentual fixo pré-definido (ex: 2% de comissão sobre total vendido)
- **Horas:minutos** — o evento registra um valor de horas:minutos (ex: 10:30) a ser inserido no relatório desejado; usado para horas extras, adicional noturno etc.
- **Numérico** — o evento registra um valor numérico a ser inserido no relatório; sem cálculo associado
- **Valor x Dias úteis (mês seguinte)** — multiplica o valor de um campo monetário do colaborador pelo número de dias úteis do mês seguinte; utilizado para vale-alimentação e vale-transporte
- **Campo do sistema x Unidade** — o valor preenchido em um campo do sistema é multiplicado pela unidade informada na folha (útil quando o valor da unidade varia por colaborador)

> ⚠️ **Campos monetários e integração com a folha:** qualquer campo do tipo **Monetário** cadastrado no diretório pode ser vinculado a um evento de folha usando a regra "Valor de Campo do sistema". Isso permite automatizar o preenchimento de benefícios e descontos diretamente dos dados do colaborador, sem preenchimento manual.

> ⚠️ **Campos para integração com a folha devem ser de resposta simples (não múltipla resposta).** A exceção é o salário — o sistema sabe identificar o salário atual dentro do histórico de múltiplas respostas, desde que o grupo de Cargos e Salários esteja bem configurado com o campo **Data de início** preenchido corretamente. É a data de início que determina qual entrada é o salário atual. Para todos os demais campos monetários usados em eventos de folha (benefícios, descontos, valores de contrato etc.), usar sempre grupos de **resposta simples**.

> ⚠️ **Fórmulas personalizadas** (ex: cálculo de INSS, IRRF) **não estão disponíveis**. O módulo não processa impostos ou incidências tributárias — esse é o escopo intencional do sistema.

### Outras opções de configuração do evento

- **Este valor é subtraído na folha** — marca o evento como desconto (exibido em vermelho na tabela)
- **Incluir no relatório folha** — controla se o evento aparece no relatório padrão de fechamento
- **Mostrar no relatório individual** — controla se o evento aparece no demonstrativo do colaborador
- **Utilizar na integração com o Kiip Ponto** — disponível apenas para regras **Horas:minutos**; necessário para que a importação do ponto funcione corretamente para aquele evento
- **Este valor é tributável** — campo presente na interface mas **sem efeito prático no momento**; implementação incompleta

### Rúbricas

Cada evento pode ter **mais de uma rúbrica** associada. Isso permite usar o mesmo evento em modelos de folha de empresas diferentes, onde cada empresa usa uma rúbrica contábil distinta. O modelo de folha define qual rúbrica será utilizada em cada contexto.

---

## Configuração de modelos de folha

Acessado em **Configurações > Folha de Pagamento > Modelo de folha**.

Criação via botão **Novo modelo de folha**. O fluxo tem 3 etapas:

### Etapa 1 — Detalhes

- **Nome do modelo** — obrigatório
- **Empresa** — opcional; se preenchido, filtra automaticamente as pessoas na abertura da folha para aquela empresa
- **Contador** — opcional; vincula o modelo a um contador cadastrado
- **Importar informações do Kiip Ponto** — toggle que habilita a importação automática de horas extras com base no percentual de cada tipo de HE definido na regra de jornada do colaborador

> Se o modelo não estiver associado a nenhuma empresa, a abertura da folha exibirá todas as pessoas da conta — o gestor filtra manualmente.

### Etapa 2 — Eventos

Lista todos os eventos cadastrados na conta. Para cada evento:
- **Toggle de ativação** — define se o evento faz parte deste modelo
- **Ícone de engrenagem** — abre o sub-modal "Adicionar ao relatório contábil" com:
  - **Rubrica do sistema contábil\*** — obrigatório para que o evento seja incluído no relatório contábil; deve ser fornecida pela contabilidade. O evento precisa ter rúbrica vinculada para ser incluído no relatório contábil.
  - **Enviar para (Integração)** — Sim/Não; define se o evento é enviado na integração com o sistema contábil (ex: Domínio)

A ordem dos eventos nesta etapa define a ordem de exibição tanto na tabela de lançamentos quanto nos relatórios.

### Etapa 3 — Relatório Folha

Define quais **campos de identificação** do colaborador aparecerão no relatório folha ao lado dos eventos. Campos pré-selecionados por padrão incluem: Nome completo, Centro de Custo, Matrícula, Data de Desligamento, Área, Vínculo, Cargo, Nível do Cargo, Número (RG). O admin pode adicionar qualquer campo do diretório (Pessoal, Profissional, Documentos, Adicionais).

### Configuração da integração Domínio

Para gerar o arquivo .txt de lançamentos:
1. A empresa deve estar associada a um sistema contábil com o **código de filial** preenchido (configurado em Empresas)
2. Cada evento relevante deve ter a **rúbrica correta** e **"Enviar para (Integração)" = Sim** no modelo
3. As rúbricas devem ser fornecidas pela contabilidade

O arquivo exportado segue o layout padrão da Domínio — não é um layout criado pela Kiip.

**O que é enviado pela integração Domínio:**
- Eventos variáveis monetários com rúbrica e integração ativados
- Eventos de hora e minuto com rúbrica e integração ativados
- Faltas injustificadas

**O que ainda não é enviado automaticamente:**
- Atrasos

---

## Divisão da folha por critério

Empresas frequentemente dividem o fechamento por:
- Centro de custo
- Tipo de vínculo (CLT / PJ)
- Departamento ou área

Isso é feito na etapa de seleção de pessoas, usando os filtros disponíveis. Não há uma "folha por departamento" nativa — a divisão é feita pela seleção manual de pessoas em cada abertura.

---

## Corner cases e pontos de atenção

- **Edição manual não atualiza o perfil:** alterar um valor na tabela de lançamentos é pontual. Se o dado correto precisa persistir nos meses seguintes, atualizar no diretório.
- **Abertura da folha é um snapshot:** ao abrir, o sistema captura o estado atual dos campos. Atualizações feitas no diretório **depois** da abertura não refletem automaticamente na folha já aberta.
- **Kiip Ponto requer folha com pessoas da mesma unidade:** misturar empresas causa erro na importação.
- **Atrasos não são importados pelo Kiip Ponto:** horas/minutos de atraso ainda não têm suporte de importação — limitação conhecida.
- **Campos de múltipla resposta não são recomendados para integração com folha:** usar campos simples específicos por benefício.
- **"Este valor é tributável" não tem efeito prático:** não criar expectativa sobre esse campo.
- **Relatório individual deve ser compartilhado antes** de ficar disponível para assinatura eletrônica.
- **Reabertura da folha é responsabilidade do gestor:** o sistema não valida se a contabilidade já processou.
- **Feriados locais não são cadastrados no sistema** — o gestor deve ajustar os dias úteis manualmente se necessário.
- **Cálculo de INSS/IRRF fora do escopo:** o processamento fica com a contabilidade.
- **Acesso ao módulo expõe todas as empresas da conta:** atenção em grupos de acesso e contas multi-empresa.
- **Filtros na tela de documentos** são baseados nas pessoas da folha — se não há PJ incluído, o filtro PJ não aparece; comportamento esperado, não bug.
- **Evento sem rúbrica não entra no relatório contábil:** ao configurar o modelo, o sistema exige rúbrica para incluir o evento no envio à contabilidade.
- **Integração Questor suporta envio por API** além do e-mail; integração Domínio só exporta arquivo .txt — não há envio por API.
