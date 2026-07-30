# Diretório de Colaboradores

Base de conhecimento sobre configuração de campos, sessões, grupos, permissões e alimentação de dados do diretório.

---

## O que é o Diretório de Colaboradores

O Diretório é o repositório central de dados de pessoas na Kiip. Foi a primeira funcionalidade desenvolvida no sistema. Sua estrutura é flexível e configurável por empresa — cada cliente personaliza campos, sessões e grupos conforme sua necessidade, dentro dos limites do sistema.

Acessado pelo menu **Pessoas** na navegação lateral.
Configurado em **Configurações > Campos do Sistema**.

---

## Pessoas vs. Usuários

São dois conceitos distintos e independentes na Kiip:

| Conceito | Descrição |
|---|---|
| **Pessoa** | Qualquer colaborador cadastrado na plataforma, de qualquer vínculo (CLT, PJ, RPA etc.). Não implica acesso ao sistema. |
| **Usuário** | Uma pessoa que recebeu acesso à plataforma. Todo usuário precisa estar vinculado a uma conta com e-mail e senha. |

Um usuário pode ou não estar vinculado a uma pessoa cadastrada. Exemplos:
- Administrador sem perfil de colaborador: usuário sem vínculo a pessoa
- Colaborador com acesso: usuário vinculado a uma pessoa

Quando uma pessoa recebe acesso de usuário, ela é automaticamente alocada nos grupos de acesso **Colaborador** e **Público**.

A visão de futuro do sistema é que todas as pessoas da equipe tenham acesso a um aplicativo do colaborador para interagir com o ambiente de forma segura.

---

## Estrutura de dados

A hierarquia tem quatro níveis:

```
Categoria → Sessão → Grupo → Campo
```

### Categorias

São fixas — não podem ser criadas, renomeadas ou excluídas pelo admin. Existem quatro:

| Categoria | Comportamento |
|---|---|
| Pessoal | Fixa, vem pré-configurada |
| Profissional | Fixa, vem pré-configurada |
| Documentos | Fixa, vem pré-configurada |
| Adicionais | Fixa, vem em branco — totalmente configurável pela empresa |

Todas as categorias permitem criação de novas sessões e novos grupos pelo admin.

### Sessões

- Aparecem como chips/pills no topo da categoria, dentro de Configurações
- Criadas livremente pelo admin em qualquer categoria via botão `+ Nova seção`
- Sem limite de quantidade por categoria
- Exemplos padrão em Pessoal: "Informações Pessoais", "Contatos e Endereços", "Dependentes"
- Exemplos padrão em Profissional: "Informações de Trabalho", "Benefícios"

### Grupos

Aparecem como cards expansíveis dentro de cada sessão. Criados via botão `+ Novo Grupo` ao final da sessão.

Cada grupo tem dois comportamentos possíveis, definidos pelo toggle **"Permite mais de uma resposta"**:

| Tipo | Comportamento | Exemplos de grupos padrão |
|---|---|---|
| **Simples** | Aceita uma única resposta por campo — valor atual substitui o anterior | Dados pessoais, Dados bancários, Endereço |
| **Múltiplas respostas** | Pode ser respondido várias vezes — cada entrada gera um registro novo com data, formando histórico | Cargos e Salários, Formação Acadêmica |

> ⚠️ **Regra crítica para grupos de múltiplas respostas:** sempre que for inserir ou atualizar dados de um campo que pertence a um grupo de múltiplas respostas, todos os campos do grupo devem ser preenchidos juntos. Nunca preencher um campo isolado. Na adição em massa, preencher todas as colunas do grupo. Na atualização em massa, selecionar todos os campos do grupo antes de exportar a planilha. Isso ocorre porque o sistema insere uma nova entrada no histórico — não edita a anterior — e uma entrada incompleta gera registros inconsistentes.

### Campos

Cada grupo contém um ou mais campos. Os campos têm ícone indicativo do tipo na listagem de configurações.

**Tipos de campo disponíveis:**

| Tipo | Descrição |
|---|---|
| Texto curto | Caixa de texto com limite de 256 caracteres |
| Texto longo | Caixa de texto sem limite de caracteres |
| Opção única | Lista de opções — usuário escolhe apenas uma |
| Múltipla escolha | Lista de opções — usuário escolhe quantas quiser |
| Nuvem de tags | Recomenda valores inseridos anteriormente em formato de tags |
| Numérico | Aceita apenas números |
| Monetário | Formatação para moedas |
| Data | Formatação para datas |
| Faixa de data | Define um intervalo de tempo em dias |
| Horário | Formatação para horário |
| Telefone | Inclui seleção de código de país (+1, +55 etc.) |
| Email | Suporta endereço de e-mail |
| Link | Suporta um link clicável para site externo |
| Anexo | Suporta upload de arquivos PDF, JPG e PNG |

---

## Configurações de cada campo

Ao criar ou editar um campo, o admin configura:

### 1. Nome e tipo
- Nome do campo: livre
- Tipo: definido na criação — não pode ser alterado depois (alterar apagaria respostas existentes, o que não é permitido)

### 2. Permissões de preenchimento e visualização
Definidas separadamente por grupo de acesso (ex: Colaborador, Líder, Administrador).

- **Preenchimento:** quem pode editar o valor do campo
- **Visualização:** quem pode ver o valor do campo

As permissões são **cumulativas** — se um usuário pertence a múltiplos grupos, as permissões de todos os grupos se somam.

### 3. Vínculos / Obrigatoriedade
Define duas coisas simultaneamente:
- **Pertencimento:** o campo aparece apenas para colaboradores dos vínculos selecionados
- **Obrigatoriedade:** o preenchimento do campo é obrigatório ao editar o grupo, para os vínculos selecionados

Se o campo não está associado ao vínculo do colaborador, ele não aparece — independentemente das permissões de edição configuradas no grupo de acesso.

Vínculos disponíveis: CLT, Pessoa Jurídica, Sócio, Diretor Estatutário, Aprendiz, Trabalhador Autônomo, Trabalhador Voluntário, Trabalhador Temporário, Trabalhador Rural, Contrato Intermitente, Contrato por Tempo Determinado, Teletrabalho, Estágio, Freelancer 6 meses.

---

## Campos do sistema vs. campos customizados

| | Campos do sistema | Campos customizados |
|---|---|---|
| **Criação** | Gerados automaticamente na criação da conta via script de inicialização | Criados livremente pelo admin |
| **Nome** | Não pode ser alterado | Pode ser alterado |
| **Tipo** | Não pode ser alterado | Pode ser alterado |
| **Exclusão** | Não pode ser excluído | Pode ser excluído |
| **Opções de resposta** | Pode editar (campos de lista) | Pode editar |
| **Permissões** | Pode editar | Pode editar |
| **Vínculos/Obrigatoriedade** | Pode editar | Pode editar |


---

## Grupo de cargos e salários

É um grupo de **múltiplas respostas** dentro da categoria Profissional. Tem papel central no sistema pois carrega:

- **Vínculo empregatício** — obrigatório para qualquer pessoa cadastrada. Sem vínculo, o sistema não consegue montar o perfil nem o link de admissão.
- **Cargo**
- **Salário**
- **Forma de pagamento:** Mensal, Semanal, Diária, Por Hora, Por Tarefa, Comissionado
- **Tipo de salário:** Salário, Pró-Labore, Bolsa, Comissão, Pagamento por serviço prestado
- **Data de início**

Por ser de múltiplas respostas, guarda o histórico completo de todas as alterações. Ao atualizar via planilha, sempre selecionar e preencher todos os campos do grupo juntos.

---

## Lógica de montagem do perfil e do link de admissão

O sistema segue uma lógica de árvore para determinar quais campos exibir para cada colaborador:

```
1. Verifica o vínculo da pessoa (ex: CLT)
      ↓
2. Filtra os campos associados a esse vínculo
      ↓
3. Cruza com as permissões de preenchimento e visualização
   do grupo de acesso do usuário logado
      ↓
4. Exibe apenas os campos que passam nos dois filtros
```

Se o vínculo não estiver definido, o sistema não consegue montar o perfil. Por isso o vínculo é sempre o primeiro dado a ser preenchido.

---

## Aba Resumo do perfil do colaborador

Ao abrir o perfil de qualquer pessoa, a primeira tela exibida é a aba **Resumo**. Ela apresenta uma visão consolidada das principais informações daquele colaborador.

### Estrutura da tela

A tela é dividida em duas colunas:

**Coluna principal (esquerda):**
- **Sobre mim** — texto livre de apresentação
- Campos de curiosidades pessoais (ex: Alimentação, Esportes) — exibidos como nuvem de tags
- **Histórico** — entradas do grupo Cargos e Salários, exibindo: cargo, nível do cargo e data de início, em ordem cronológica reversa
- **Meu time** — lista os liderados diretos da pessoa (nome + cargo atual)

**Sidebar (direita):**
- Bloco **Profissional:** Cargo atual, Área, Líder Direto
- Bloco **Contatos:** E-mail, Telefone, LinkedIn, Instagram
- Bloco **Talentos** — nuvem de tags

### Comportamento em relação às permissões de campos

**A aba Resumo não obedece às configurações de permissão de visualização dos grupos de acesso.** Todas as informações exibidas são tratadas pelo sistema como nativamente públicas — qualquer usuário que tenha acesso ao perfil daquela pessoa verá o Resumo completo.

Isso significa que, mesmo que determinado campo esteja **desmarcado** nas permissões de visualização de um grupo de acesso, ele ainda aparecerá no Resumo. Isso **não é bug** — é o comportamento atual do sistema.

As abas **Pessoal, Profissional, Documentos e Adicionais** respeitam normalmente a lógica de permissões por grupo de acesso. Apenas o Resumo tem esse comportamento diferenciado.

### Informações nativamente públicas

Nome, cargo e líder direto são **entidades básicas** do sistema — aparecem inclusive na lista de pessoas do diretório. Não é possível ocultá-los sem restringir o acesso completo à visualização de outras pessoas.

Se a necessidade do cliente é que um colaborador não veja informações de outro, o caminho não é configurar permissões de campo — é restringir a visibilidade de pessoas no **grupo Público** (ver seção Grupos de acesso).

### Limitações conhecidas

As seguintes situações são limitações técnicas do sistema atual — não são bugs:

- **Nível do cargo aparece no Histórico** — informação que não deveria ser exposta publicamente, mas hoje é exibida junto ao histórico de cargos no Resumo
- **Dados de contato, curiosidades e talentos não são ocultáveis** — essas informações aparecem no Resumo independentemente das permissões configuradas nos grupos de acesso; idealmente deveriam ser controláveis
- **Configuração do grupo Público não está bloqueada para campos do Resumo** — o admin consegue editar permissões de campos que aparecem no Resumo no grupo Público, mas essa configuração não tem efeito sobre o que é exibido na aba; não há alerta ou aviso sobre isso na interface, o que pode gerar confusão

---

## Grupos de acesso

Gerenciados em **Configurações > Gestão de Usuários > Grupos de Acesso**.

Cada grupo de acesso define permissões com base em um **escopo** — sobre quais pessoas as configurações se aplicam:

| Escopo | Descrição | Grupos padrão |
|---|---|---|
| **Próprio colaborador** | Permissões sobre os próprios dados do usuário | Colaborador |
| **Todos da empresa** | Permissões sobre todos os colaboradores da conta | Administrador, Proprietário, Público |
| **Liderados diretos** | Permissões sobre os liderados diretos do usuário no sistema | Líder |
| **Personalizado** | Admin seleciona manualmente as pessoas do escopo | Grupos customizados |

### Grupos padrão

| Grupo | Características |
|---|---|
| **Administrador** | Acesso irrestrito. Não pode criar usuários Proprietário. |
| **Proprietário** | Acesso irrestrito. Único que pode criar/excluir outros Proprietários. O sistema impede a exclusão do último Proprietário da conta. |
| **Colaborador** | Escopo próprio. Todo usuário vinculado a uma pessoa é automaticamente alocado neste grupo. |
| **Líder** | Escopo de liderados diretos. |
| **Público** | Escopo todos da empresa. Todo usuário é automaticamente alocado neste grupo. |

**Permissões são cumulativas:** se um usuário pertence a múltiplos grupos, todas as permissões se somam. Isso requer atenção ao criar grupos customizados — uma configuração mal planejada pode conceder acesso indevido a áreas sensíveis como Configurações e Folha de Pagamento.

### Grupos customizados
O admin pode criar grupos adicionais definindo o escopo livremente. O escopo personalizado permite selecionar manualmente as pessoas — útil para consultores externos (ex: psicólogos, coaches) que precisam acessar dados de pessoas específicas.

> ⚠️ Grupos customizados devem ser usados com cautela. Devido à natureza cumulativa das permissões, um grupo mal configurado pode dar acesso indevido a módulos sensíveis.

### Restrição por filial
O sistema não permite restringir acessos por entidade ou empresa dentro de uma mesma conta. A recomendação oficial para empresas com filiais que precisam de isolamento de acesso é **criar contas separadas** por unidade.

---

## Formas de alimentar o diretório

Existem **5 vias** para inserir ou atualizar dados de colaboradores:

### 1. Adição manual individual

Botão **Adicionar Pessoa** na lista de Pessoas. Fluxo em 3 etapas:

**Etapa 1 — Dados básicos**

Seção Pessoal:
- Nome completo\*
- E-mail principal\*
- Telefone celular\*

Seção Profissional:
- Data de Admissão\*
- Área (opcional)
- Líder Direto (opcional)
- Cargo Atual\*
- Nível do cargo (opcional)
- Salário Atual\*
- Data de início\*
- Forma de pagamento\*
- Tipo de salário\*
- Centro de Custo (opcional)
- Vínculo\*
- Empresa\*

**Etapa 2 — Contratos**

Lista os contratos configurados pela empresa, divididos em:
- **Aplicável:** compatíveis com o vínculo selecionado — podem ser ativados/desativados individualmente
- **Não aplicável:** incompatíveis com o vínculo — exibidos desabilitados

Para cada contrato ativo, escolha entre **Apenas gerar** ou **Gerar e enviar**.

**Etapa 3 — Opções**

- Canal de envio para assinatura: WhatsApp ou E-mail (por signatário)
- Ordem de envio: todos ao mesmo tempo ou um por vez (signatários adicionais primeiro, colaborador por último)
- Conceder acesso ao sistema: Sim / Não
- Como prosseguir: enviar link para o colaborador preencher ou preencher manualmente

---

### 2. Edição pelo perfil do colaborador

Diretamente no perfil da pessoa, nas abas Pessoal, Profissional, Documentos e Adicionais. Qualquer usuário com permissão de preenchimento pode editar os campos permitidos pelo seu grupo de acesso.

---

### 3. Adição em massa via planilha

Acessado via **Ações em massa > Adicionar via planilha**.

O sistema gera uma planilha com todos os campos do diretório da conta. Estrutura:

- **Linha 2:** campos obrigatórios (\*)
- **Linha 3:** agrupamento por categoria e sessão
- **Linha 4:** instruções de preenchimento (formatos, opções válidas)
- **Linha 5:** cabeçalhos dos campos
- **Linha 6+:** uma pessoa por linha, células em branco

**Campos obrigatórios:** ID, Nome completo, Email Principal, Data de Admissão, Empresa, Vínculo

> ⚠️ A empresa deve estar previamente cadastrada no sistema.
> ⚠️ Não altere a estrutura da planilha. Novos campos devem ser criados antes em Configurações > Campos do Sistema.
> ⚠️ Para campos de grupos de múltiplas respostas, preencher todas as colunas do grupo juntas.

Formatos aceitos: `.csv`, `.xlsx`. Tamanho máximo: 128MB.

---

### 4. Atualização em massa via planilha

Acessado via **Ações em massa > Atualizar via planilha** após selecionar colaboradores.

**Fluxo:**
1. Selecionar pessoas na lista
2. Ações em massa > Atualizar via planilha
3. Selecionar os campos desejados (Pessoal, Profissional, Documentos, Adicionais)
4. Continuar → baixar planilha em `.csv` ou `.xlsx`
5. Preencher dados
6. Upload + Iniciar atualização

**Estrutura da planilha:**
- Coluna A: ID único do colaborador (hash UUID) — identificador crítico
- Colunas seguintes: campos selecionados
- Campos de grupos simples: valores atuais já preenchidos
- Campos de grupos de múltiplas respostas: em branco — importação insere nova entrada no histórico

> ⚠️ Nunca reordenar linhas sem garantir que o ID acompanha os dados.
> ⚠️ Para grupos de múltiplas respostas, selecionar e preencher todos os campos do grupo juntos.

---

### 5. Link de admissão

Gerado durante o fluxo de adição manual (etapa 3) ou via **Ações em massa > Reenviar links de admissão**.

O link é enviado ao colaborador para que ele mesmo preencha seus dados. Os campos exibidos no formulário seguem a lógica de árvore: vínculo → permissões do grupo de acesso → campos visíveis.

**Suporte:** o sistema tem suporte primário ao **Chrome**. Falhas no link de admissão que não se replicam em conta demo são geralmente causadas por instabilidade de conexão ou uso de outro navegador. Orientação padrão: usar Chrome em rede estável.

O formulário exige que todo um grupo seja preenchido e salvo de uma vez — não campo a campo — para evitar duplicação de dados.

---

### Menu Ações em massa — opções disponíveis

| Ação | Observação |
|---|---|
| Adicionar via planilha | Sem necessidade de seleção prévia |
| Atualizar via planilha | Requer seleção prévia de pessoas |
| Exportar | Exporta dados das pessoas selecionadas |
| Reenviar links de admissão | Disponível apenas com pessoas em admissão selecionadas |

---

## Corner cases e pontos de atenção

- **Aba Resumo é nativamente pública:** as configurações de permissão de campos não se aplicam ao Resumo. Cargo, nome e líder direto são entidades básicas — não ocultáveis. Nível do cargo, dados de contato, curiosidades e talentos também são expostos hoje por limitação técnica conhecida. Não é bug. Editar permissões no grupo Público não tem efeito sobre o Resumo e não gera aviso na interface.
- **Vínculo obrigatório:** sem vínculo definido, o sistema não monta o perfil nem o link de admissão.
- **Campos de sistema não podem ser excluídos ou renomeados** — orientar criação de campos customizados se necessário.
- **Grupos de múltiplas respostas:** sempre preencher o grupo inteiro. Nunca campo isolado.
- **Reordenar linhas na planilha de atualização** sem o ID causa gravação no perfil errado.
- **Permissões cumulativas:** um usuário em múltiplos grupos acumula todas as permissões — atenção ao criar grupos customizados.
- **Restrição por filial** não é nativa — criar contas separadas.
- **Empresa deve estar cadastrada** antes de adicionar colaboradores via planilha.
- **Contratos na etapa 2** são filtrados pelo vínculo da etapa 1 — incompatíveis aparecem como "Não aplicável".
- **Duplicação de dados** em campos de resposta única (ex: nome) é problemática e pode exigir acionamento do suporte Kiip.
- **Bugs específicos de cliente** que não se replicam em conta demo devem ser reportados ao suporte Kiip.
