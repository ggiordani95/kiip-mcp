# Documentos

Base de conhecimento sobre o módulo de Documentos: gestão de documentos, modelos de documento, categorias, geração automática, upload de PDFs e assinatura eletrônica.

---

## O que é o módulo de Documentos

O módulo de Documentos centraliza a geração, organização e assinatura de documentos vinculados aos colaboradores. Ele permite que a empresa crie modelos de documentos em Word (.docx) com variáveis que o sistema preenche automaticamente com dados do diretório, envie esses documentos para assinatura eletrônica e gerencie todo o ciclo de vida documental em um único lugar.

Acessado pelo menu **Documentos** na navegação lateral (`app.kiip.team/document`).

**Assinatura eletrônica:** o módulo de Documentos integra com o **Kiip Sign**, serviço de assinatura eletrônica white label da Kiip. O Kiip Sign é um serviço à parte do módulo de gestão — a estrutura e organização dos documentos são desenvolvidas pela Kiip, mas o envio e processamento das assinaturas eletrônicas são realizados pelo Kiip Sign.

---

## Estrutura do módulo

O módulo tem três abas:

| Aba | Descrição |
|---|---|
| **Gestão de Documentos** | Lista todos os documentos gerados ou enviados para colaboradores |
| **Modelos de Documento** | Cadastro e gestão dos modelos .docx usados para geração automática |
| **Categorias** | Gerenciamento das categorias para classificação de documentos |

---

## Aba Categorias

Categorias organizam os documentos por tipo. São usadas tanto na gestão de documentos quanto nos modelos.

### Categorias padrão do sistema

As três categorias abaixo vêm pré-cadastradas em toda conta nova e não podem ser editadas nem excluídas:

| Categoria | Observação |
|---|---|
| **Admissão** | Pré-cadastrada — não pode ser editada nem excluída |
| **Desligamento** | Pré-cadastrada — não pode ser editada nem excluída |
| **Folha de Pagamento** | Pré-cadastrada — não pode ser editada nem excluída |

O admin pode criar categorias adicionais livremente. Categorias criadas pelo admin podem ser editadas e excluídas.

### Criar nova categoria

Botão **Nova categoria** na listagem de Categorias, ou inline ao cadastrar um modelo ou documento. Campo obrigatório: Nome da categoria.

---

## Aba Modelos de Documento

Os modelos são arquivos `.docx` criados pela empresa com variáveis que o sistema substitui automaticamente pelos dados do colaborador no momento da geração do documento.

### Como criar um modelo

Botão **Novo modelo** abre o modal de criação. Campos:

**Nome do modelo\*** — obrigatório

**Arquivo do documento\*** — upload de arquivo `.docx`. O sistema disponibiliza um botão **Baixar exemplo** na listagem para que o admin baixe um modelo de referência com variáveis já preenchidas.

**Categoria** — opcional; seleciona uma das categorias cadastradas ou cria nova inline

**Aplicabilidade** — define para quais colaboradores o modelo será sugerido por padrão:
- **Aplicar a todos os colaboradores** — toggle; quando ativado, o modelo é sugerido para qualquer pessoa
- **Cargos** — filtra por um ou mais cargos
- **Áreas** — filtra por uma ou mais áreas
- **Vínculos** — filtra por um ou mais vínculos
- **Centros de custo** — filtra por um ou mais centros de custo

> **Importante:** a aplicabilidade é uma sugestão de contexto, não uma restrição. Ela facilita a seleção do modelo correto no fluxo de admissão e em outros fluxos, mas não impede que o modelo seja usado para qualquer colaborador da conta. Um modelo sem aplicabilidade configurada ainda pode ser selecionado manualmente.

**Signatários adicionais** — define, no próprio modelo, quem além do colaborador deve assinar os documentos gerados a partir dele:
- **Líder do colaborador** — checkbox; inclui automaticamente o líder direto como signatário
- **Seleção manual** — escolhe pessoas específicas da conta; múltiplos signatários podem ser adicionados via "Adicionar outro"

### Ações na listagem de modelos

| Ação | Ícone |
|---|---|
| Baixar o modelo (.docx) | ícone de download |
| Editar | ícone de lápis |
| Excluir | disponível dentro do modal de edição |

A coluna **Aplicabilidade** exibe o resumo da configuração de cada modelo (ex: "Cargos: 1", "Todos os colaboradores", "-").

---

## Variáveis nos modelos de documento

As variáveis são inseridas diretamente no arquivo `.docx` e substituídas pelos dados do colaborador no momento da geração.

### Sintaxe base

```
${nome-do-grupo#nome-do-campo}
```

**Regras de formatação:**
- Apenas letras minúsculas
- Espaços substituídos por traços (`-`)
- Grupo e campo separados por `#`
- Sem acentos ou caracteres especiais

**Variável especial sem grupo:**
```
${data-atual}   → data em que o documento é gerado
${data-atual%}  → data por extenso
```

---

### Modificadores de variável

Os modificadores são sufixos adicionados à variável para alterar seu comportamento. Podem ser combinados.

#### `@` — campo não obrigatório

Por padrão, toda variável declarada é obrigatória: se o campo correspondente não estiver preenchido no perfil do colaborador, o sistema bloqueia a geração do documento e marca o status como **Pendente de informações**, listando os campos faltantes.

Ao adicionar `@` ao final da variável, o campo deixa de ser obrigatório — o documento é gerado mesmo que o campo esteja vazio.

```
${dados-pessoais#nome-social@}              → campo opcional
${dados-bancarios#chave-pix@}               → campo opcional
```

#### `%` — valor por extenso

Para campos do tipo **monetário** ou **data**, o sufixo `%` converte o valor para sua forma escrita por extenso.

```
${cargos-e-salarios#salario%}               → "cinco mil reais"
${dados-pessoais#data-de-nascimento%}       → "vinte e três de abril de mil novecentos e noventa"
${data-atual%}                              → data atual por extenso
```

#### `[n]` — posição em grupos de múltiplas respostas

Para campos que pertencem a grupos de múltiplas respostas (ex: Lista de Dependentes), é necessário declarar a posição da resposta desejada usando colchetes com o número da posição. A posição `[1]` corresponde à resposta mais acima na listagem do diretório — a ordem pode ser ajustada pelo usuário diretamente no perfil.

```
${lista-de-dependentes#nome[1]}             → nome do 1º dependente
${lista-de-dependentes#nome[2]}             → nome do 2º dependente
```

#### Combinação de modificadores

Os modificadores podem ser combinados na mesma variável. A ordem recomendada é: `[n]` → `%` → `@`.

```
${lista-de-dependentes#data-de-nascimento%[1]}    → data por extenso, 1º dependente (obrigatório)
${lista-de-dependentes#data-de-nascimento[2]%@}   → data por extenso, 2º dependente (opcional)
${lista-de-dependentes#nome[3]@}                  → nome do 3º dependente (opcional)
```

---

### Variáveis de entidades do sistema

Além dos campos do diretório, é possível referenciar dados de entidades do sistema (Empresa e Cargo) usando o separador `!` após o campo-âncora.

**Sintaxe:**
```
${nome-do-grupo#campo-ancora!nome-do-campo-da-entidade}
```

**Dados da Empresa (vinculada ao colaborador):**

| Dado | Variável |
|---|---|
| Nome fantasia da empresa | `${informacoes-basicas#empresa!nome-fantasia}` |
| Razão social | `${informacoes-basicas#empresa!razao-social}` |
| CNPJ | `${informacoes-basicas#empresa!cnpj}` |
| Endereço completo | `${informacoes-basicas#empresa!endereco-completo}` |
| Inscrição estadual | `${informacoes-basicas#empresa!inscricao-estadual}` |
| Representante legal | `${informacoes-basicas#empresa!representante-legal}` |

**Dados do Cargo (CBO):**

| Dado | Variável |
|---|---|
| Código CBO do cargo | `${cargos-e-salarios#cargo!codigo-cbo}` |

---

### Tabela completa de variáveis padrão

#### Pessoal — Dados Pessoais

| Campo | Variável | Observação |
|---|---|---|
| Nome completo | `${dados-pessoais#nome-completo}` | |
| Como gosta de ser chamado | `${dados-pessoais#como-gosta-de-ser-chamado}` | |
| Data de Nascimento | `${dados-pessoais#data-de-nascimento}` | Por extenso: `%` |
| Nacionalidade | `${dados-pessoais#nacionalidade}` | |
| UF Natal | `${dados-pessoais#uf-natal}` | |
| Cidade Natal | `${dados-pessoais#cidade-natal}` | |
| Gênero de Identificação | `${dados-pessoais#genero-de-identificacao}` | |
| Gênero no Documento | `${dados-pessoais#genero-no-documento}` | |
| Nome Social | `${dados-pessoais#nome-social}` | Opcional: `@` |
| Cor/Raça | `${dados-pessoais#corraca}` | |
| Estado Civil | `${dados-pessoais#estado-civil}` | |
| Nome da Mãe | `${dados-pessoais#nome-da-mae}` | |
| Nome do Pai | `${dados-pessoais#nome-do-pai}` | Opcional: `@` |

#### Pessoal — Dados Bancários

| Campo | Variável | Observação |
|---|---|---|
| Banco | `${dados-bancarios#banco}` | |
| Agência | `${dados-bancarios#agencia}` | |
| Tipo de Conta | `${dados-bancarios#tipo-de-conta}` | |
| Conta | `${dados-bancarios#conta}` | |
| Dígito | `${dados-bancarios#digito}` | |
| Chave Pix | `${dados-bancarios#chave-pix}` | Opcional: `@` |
| Observações | `${dados-bancarios#observacoes}` | Opcional: `@` |

#### Pessoal — Deficiência

| Campo | Variável | Observação |
|---|---|---|
| Possui alguma deficiência? | `${deficiencia#possui-alguma-deficiencia}` | |
| Observação | `${deficiencia#observacao}` | Opcional: `@` |

#### Pessoal — Formação Acadêmica

| Campo | Variável | Observação |
|---|---|---|
| Escolaridade | `${formacao-academica#escolaridade}` | |
| Instituição de Ensino | `${formacao-academica#instituicao-de-ensino}` | |
| Curso | `${formacao-academica#curso}` | |
| Ano | `${formacao-academica#ano}` | |
| Status | `${formacao-academica#status}` | |

#### Pessoal — Pensão Alimentícia

| Campo | Variável |
|---|---|
| Possui sentença e/ou realiza pagamento? | `${pensao-alimenticia#possui-sentenca-eou-realiza-pagamento-de-pensao-alimenticia}` |

#### Pessoal — Contatos

| Campo | Variável | Observação |
|---|---|---|
| Celular | `${contatos#celular}` | |
| Telefone Residencial | `${contatos#telefone-residencial}` | Opcional: `@` |
| Email Principal | `${contatos#email-principal}` | |
| Email Alternativo | `${contatos#email-alternativo}` | Opcional: `@` |

#### Pessoal — Endereço

| Campo | Variável | Observação |
|---|---|---|
| Rua | `${endereco#rua}` | |
| Número | `${endereco#numero}` | |
| Complemento | `${endereco#complemento}` | Opcional: `@` |
| Bairro | `${endereco#bairro}` | |
| Cidade | `${endereco#cidade}` | |
| Estado | `${endereco#estado}` | |
| País | `${endereco#pais}` | |
| CEP | `${endereco#cep}` | |

#### Pessoal — Lista de Dependentes (múltiplas respostas)

Usar `[n]` para indicar a posição do dependente. Campos opcionais recebem `@`.

| Campo | Variável base | Exemplo posição 1 |
|---|---|---|
| Nome | `${lista-de-dependentes#nome}` | `${lista-de-dependentes#nome[1]}` |
| Relação | `${lista-de-dependentes#relacao}` | `${lista-de-dependentes#relacao[1]}` |
| Data de Nascimento | `${lista-de-dependentes#data-de-nascimento}` | `${lista-de-dependentes#data-de-nascimento%[1]}` |
| Nome da Mãe | `${lista-de-dependentes#nome-da-mae}` | `${lista-de-dependentes#nome-da-mae[1]}` |
| CPF do Dependente | `${lista-de-dependentes#cpf-do-dependente}` | `${lista-de-dependentes#cpf-do-dependente[1]}` |
| Contato | `${lista-de-dependentes#contato}` | `${lista-de-dependentes#contato[1]}` |
| Email | `${lista-de-dependentes#email}` | `${lista-de-dependentes#email[1]}` |
| Observações | `${lista-de-dependentes#observacoes}` | `${lista-de-dependentes#observacoes[1]@}` |
| Incluir no IR | `${lista-de-dependentes#incluir-no-imposto-de-renda}` | `${lista-de-dependentes#incluir-no-imposto-de-renda[1]}` |
| Salário Família | `${lista-de-dependentes#salario-familia}` | `${lista-de-dependentes#salario-familia[1]}` |
| Estrangeiro | `${lista-de-dependentes#estrangeiro}` | `${lista-de-dependentes#estrangeiro[1]}` |

#### Profissional — Cargos e Salários

O sistema usa sempre a entrada mais atual do histórico.

| Campo | Variável | Observação |
|---|---|---|
| Vínculo | `${cargos-e-salarios#vinculo}` | |
| Cargo | `${cargos-e-salarios#cargo}` | |
| Nível do Cargo | `${cargos-e-salarios#nivel-do-cargo}` | |
| Tipo de Salário | `${cargos-e-salarios#tipo-de-salario}` | |
| Forma de Pagamento | `${cargos-e-salarios#forma-de-pagamento}` | |
| Salário | `${cargos-e-salarios#salario}` | Por extenso: `%` |
| Código CBO do cargo | `${cargos-e-salarios#cargo!codigo-cbo}` | Variável de entidade |

#### Profissional — Informações Básicas

| Campo | Variável | Observação |
|---|---|---|
| Data de Admissão | `${informacoes-basicas#data-de-admissao}` | Por extenso: `%` |
| Área | `${informacoes-basicas#area}` | |
| Líder Direto | `${informacoes-basicas#lider-direto}` | |
| Data de Desligamento | `${informacoes-basicas#data-de-desligamento}` | Opcional: `@`. Por extenso: `%` |
| Centro de Custo | `${informacoes-basicas#centro-de-custo}` | |
| Matrícula | `${informacoes-basicas#matricula}` | |
| Dias de Período de Experiência | `${informacoes-basicas#dias-de-periodo-de-experiencia}` | |
| Vencimento 1º período de experiência | `${informacoes-basicas#vencimento-1-periodo-de-experiencia}` | Por extenso: `%` |
| Vencimento 2º período de experiência | `${informacoes-basicas#vencimento-2-periodo-de-experiencia}` | Por extenso: `%` |

#### Profissional — Empresa (entidade vinculada ao colaborador)

| Campo | Variável |
|---|---|
| Nome fantasia | `${informacoes-basicas#empresa!nome-fantasia}` |
| Razão social | `${informacoes-basicas#empresa!razao-social}` |
| CNPJ | `${informacoes-basicas#empresa!cnpj}` |
| Endereço completo | `${informacoes-basicas#empresa!endereco-completo}` |
| Inscrição estadual | `${informacoes-basicas#empresa!inscricao-estadual}` |
| Representante legal | `${informacoes-basicas#empresa!representante-legal}` |

#### Documentos — RG

| Campo | Variável | Observação |
|---|---|---|
| Número | `${rg#numero}` | |
| Órgão Expeditor | `${rg#orgao-expeditor}` | |
| UF Expeditor | `${rg#uf-expeditor}` | |
| Data de Expedição | `${rg#data-de-expedicao}` | Por extenso: `%` |

#### Documentos — CPF

| Campo | Variável |
|---|---|
| Número | `${cpf#numero}` |

#### Documentos — Carteira de Trabalho

| Campo | Variável | Observação |
|---|---|---|
| Número | `${carteira-de-trabalho#numero}` | Opcional: `@` |
| Série | `${carteira-de-trabalho#serie}` | Opcional: `@` |
| Data de Emissão | `${carteira-de-trabalho#data-de-emissao}` | Por extenso: `%`. Opcional: `@` |
| UF Emissor | `${carteira-de-trabalho#uf-emissor}` | Opcional: `@` |
| PIS | `${carteira-de-trabalho#pis}` | Opcional: `@` |

#### Documentos — Título Eleitoral

| Campo | Variável |
|---|---|
| Número | `${titulo-eleitoral#numero}` |
| Seção Eleitoral | `${titulo-eleitoral#secao-eleitoral}` |
| Zona Eleitoral | `${titulo-eleitoral#zona-eleitoral}` |

#### Documentos — Reservista

| Campo | Variável | Observação |
|---|---|---|
| Número | `${reservista#numero}` | Opcional: `@` |
| Categoria | `${reservista#categoria}` | Opcional: `@` |

#### Documentos — Carteira de Motorista

| Campo | Variável | Observação |
|---|---|---|
| Número CNH | `${carteira-de-motorista#numero-cnh}` | Opcional: `@` |
| Categoria | `${carteira-de-motorista#categoria}` | Opcional: `@` |
| Data de Emissão | `${carteira-de-motorista#data-de-emissao}` | Opcional: `@` |
| Validade | `${carteira-de-motorista#validade}` | Opcional: `@` |
| Primeira Habilitação | `${carteira-de-motorista#primeira-habilitacao}` | Opcional: `@` |

#### Documentos — CNPJ (do colaborador PJ)

| Campo | Variável | Observação |
|---|---|---|
| Razão Social | `${cnpj#razao-social}` | |
| Nome Fantasia | `${cnpj#nome-fantasia}` | Opcional: `@` |
| Número | `${cnpj#numero}` | |
| Rua | `${cnpj#rua}` | |
| Nº | `${cnpj#n}` | |
| Bairro | `${cnpj#bairro}` | |
| Cidade | `${cnpj#cidade}` | |
| Estado | `${cnpj#estado}` | |
| CEP | `${cnpj#cep}` | |

#### Variáveis de campos customizados

Campos personalizados criados pela empresa seguem o mesmo padrão — nome do grupo e nome do campo exatamente como cadastrados no sistema, em letras minúsculas com traços no lugar de espaços, sem acentos.

---

## Aba Gestão de Documentos

Lista todos os documentos associados a colaboradores da conta, gerados pelo sistema ou enviados por upload.

### Colunas da listagem

| Coluna | Descrição |
|---|---|
| Pessoa | Nome e documento do colaborador |
| Criação | Data de criação/envio |
| Status | Estado atual do documento |
| Assinatura | Plataforma de assinatura (ex: Kiip Sign, Manual) |
| Ações | Menu de ações individuais |

### Status de documento

| Status | Descrição |
|---|---|
| **Aguardando assinatura** | Documento enviado, pendente de assinatura por um ou mais signatários |
| **Assinado** | Todos os signatários concluíram a assinatura |
| **Erro ao processar** | Falha no processamento pelo Kiip Sign |
| **Pendente de informações** | Um ou mais campos obrigatórios do modelo não estão preenchidos no perfil do colaborador — o documento não foi gerado |
| **Pronto para download** | Documento gerado (via "Apenas gerar"), disponível para download sem assinatura eletrônica |
| **Recusado** | Um signatário recusou a assinatura |

### Comportamento de "Pendente de informações"

Quando o sistema identifica variáveis obrigatórias sem valor no perfil do colaborador, o documento não é gerado e fica com status **Pendente de informações**. Ao clicar no documento nesse status, um modal exibe:

- Qual signatário está com informações faltantes (ex: "Signatário principal (colaborador)")
- A lista dos campos pendentes com seus grupos (ex: "Informações Básicas — Área", "Informações Básicas — Matrícula")
- Dois botões de ação: **Atualizar** (tenta reprocessar) e **Editar perfil do colaborador** (abre o perfil para preenchimento)

O documento permanece nesse status até que os campos sejam preenchidos e o documento seja reprocessado.

### Filtros disponíveis

**Filtro principal — Status:**
- Aguardando assinatura
- Assinado
- Erro ao processar
- Pendente de informações
- Pronto para download
- Recusado

**Mais filtros:**
- Data do documento (faixa de datas)
- Data de referência (faixa de datas)
- Áreas
- Cargos
- Centros de Custo
- Empresas
- Método de assinatura
- Categorias
- Modelo de sistema
- Modelo de documento
- Vínculos

### Criar novo documento

Botão **Novo documento** abre um dropdown com duas opções:

---

## Via 1 — Gerar a partir de modelos

Gera documentos preenchidos automaticamente com os dados dos colaboradores e os disponibiliza para download ou envio para assinatura via Kiip Sign.

**Fluxo em 3 etapas:**

### Etapa 1 — Pessoas

Seleciona os colaboradores para os quais o documento será gerado. Suporta busca e filtros. Seleção individual ou global.

### Etapa 2 — Modelos

Lista os modelos cadastrados na conta. O admin seleciona um ou mais modelos.

### Etapa 3 — Opções

**Geração e assinatura eletrônica:**

| Opção | Comportamento |
|---|---|
| **Apenas gerar documento** | Documento gerado e disponibilizado para download (status: Pronto para download). O admin pode fazer upload da versão assinada manualmente depois. |
| **Gerar e enviar para assinatura eletrônica** | Documento gerado e enviado automaticamente para assinatura via Kiip Sign. |

Quando a assinatura eletrônica é selecionada, configura-se:

**Canal de envio** (por tipo de signatário):
- Signatário principal (Colaborador): WhatsApp ou E-mail
- Signatários adicionais: WhatsApp ou E-mail

**Ordem de envio:**
- **Enviar para todos ao mesmo tempo** — todos os signatários recebem simultaneamente
- **Enviar um por vez** — o documento segue a ordem: signatários adicionais na sequência em que foram cadastrados no modelo → colaborador por último

---

## Via 2 — Upload de documentos

Envia arquivos PDF já prontos para assinatura via Kiip Sign ou apenas para registro.

**Fluxo em 5 etapas:**

### Etapa 1 — Pessoas

Seleciona o(s) colaborador(es) aos quais o documento será vinculado.

### Etapa 2 — Upload

Área de upload de arquivo(s) PDF. Formato permitido: `.pdf`. Suporta múltiplos arquivos.

### Etapa 3 — Signatários adicionais

Define quem além do colaborador deve assinar:
- **Líder do colaborador** — checkbox para incluir automaticamente
- **Seleção manual** — busca e seleciona pessoas da conta

> Todos os signatários adicionais definidos aqui são incluídos em todos os documentos deste envio.

### Etapa 4 — Opções

Mesmas opções de canal de envio e ordem de envio da Via 1.

### Etapa 5 — Detalhes

- **Nome do documento\*** — obrigatório
- **Categoria** — seleciona categoria existente ou cria nova inline
- **Data de referência** — data associada ao documento para fins de organização e filtro (ex: competência do mês a que o documento se refere, independentemente da data de criação)

---

## Envio para assinatura a partir do módulo de Folha de Pagamento

Documentos também podem ser enviados para assinatura diretamente do módulo de Folha, sem passar pela Gestão de Documentos. Isso se aplica a holerites e relatórios individuais importados ou gerados na folha.

O fluxo é iniciado na folha fechada, selecionando os arquivos desejados e usando as ações em massa de assinatura eletrônica.

Quando o envio é feito por essa via, dois campos são preenchidos automaticamente:
- **Categoria**: definida como **Folha de Pagamento**
- **Data de referência**: definida como o período da folha (ex: se a folha é de abril/2026, a data de referência é abril/2026 — mesmo que o envio ocorra em maio)

Esses documentos aparecem na Gestão de Documentos e podem ser filtrados normalmente.

---

## Corner cases e pontos de atenção

- **Variáveis obrigatórias sem preenchimento bloqueiam a geração:** quando um campo obrigatório no modelo não está preenchido no perfil do colaborador, o documento não é gerado — o status fica como "Pendente de informações" com indicação dos campos faltantes. Para campos opcionais, usar o modificador `@`.
- **Aplicabilidade não é restrição:** modelos sem aplicabilidade configurada ainda podem ser selecionados manualmente no fluxo de geração. A aplicabilidade apenas sugere contexto.
- **Categorias padrão Admissão, Desligamento e Folha de Pagamento** não podem ser editadas ou excluídas.
- **Ordem de assinatura "um por vez":** o colaborador sempre assina por último. A ordem dos signatários adicionais segue a sequência de cadastro no modelo.
- **Data de referência vs. data de criação:** são campos distintos e filtráveis separadamente. A data de referência é especialmente útil para documentos de folha ou documentos que se referem a períodos passados.
- **Campos customizados nas variáveis:** o nome do grupo e do campo deve ser exatamente igual ao cadastrado no sistema, em minúsculas com traços. Qualquer divergência faz a variável não ser substituída.
- **Grupos de múltiplas respostas:** a posição `[1]` corresponde à resposta mais acima na listagem do perfil. A ordem pode ser alterada pelo usuário diretamente no diretório.
- **Variáveis de entidade (Empresa, CBO):** usam o separador `!` após o campo-âncora, seguido do nome do campo da entidade.
- **Kiip Sign é serviço separado:** falhas de assinatura (status "Erro ao processar", "Recusado") são originadas no Kiip Sign e podem requerer análise específica do serviço.
