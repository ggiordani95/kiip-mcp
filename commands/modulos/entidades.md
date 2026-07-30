# Entidades do Sistema

Base de conhecimento sobre o cadastro e configuração das entidades base do sistema: Cargos, Áreas, Vínculos, Centros de Custo e Empresas.

---

## O que são entidades do sistema

Entidades são cadastros base que sustentam o funcionamento de múltiplos módulos. Precisam estar configuradas antes de adicionar colaboradores e são reutilizadas em campos do diretório, filtros, folha de pagamento e integrações.

Todas acessadas em **Configurações** no menu lateral.

---

## Cargos

**Onde fica:** `Configurações > Cargos` (`/admin/settings/job-positions`)

### O que é
Lista de cargos disponíveis na conta. Usado no grupo Cargos e Salários do diretório e exibido no perfil e na lista de pessoas.

### Configuração
Cada cargo tem:
- **Nome do cargo** — obrigatório
- **Código CBO** — opcional; permite vincular o cargo ao CBO correspondente para fins de eSocial e relatórios
- **Níveis** — opcional; toggle "Adicionar níveis" habilita a criação de níveis livres (ex: Júnior, Pleno, Sênior ou I, II, III); os níveis são reordenáveis via drag and drop

### Ações disponíveis
- Criar novo cargo via botão **Novo cargo**
- Editar via ícone de lápis
- Excluir via ícone de lixeira no modal de edição
- Buscar por nome

### Corner cases
- Um cargo pode ter zero ou múltiplos níveis — não há obrigatoriedade de níveis
- O nível do cargo é exibido no Histórico da aba Resumo do perfil (limitação conhecida — ver documento Diretório de Colaboradores)

---

## Áreas

**Onde fica:** `Configurações > Áreas` (`/admin/settings/departments`)

### O que é
Lista de áreas/departamentos da empresa. Usada no perfil do colaborador e como filtro no diretório, folha e outros módulos.

### Configuração
Cada área tem:
- **Nome da área** — obrigatório
- **Responde a** — opcional; outra área do sistema; permite montar uma hierarquia de áreas (ex: Desenvolvimento Mobile responde a Tecnologia)
- **Líder** — opcional; pessoa cadastrada no sistema responsável por aquela área

### Ações disponíveis
- Criar nova área via botão **Nova área**
- Editar via ícone de lápis
- Excluir via ícone de lixeira no modal de edição
- Buscar por nome

### Corner cases
- A hierarquia de áreas é informativa — não impacta automaticamente permissões ou liderança de colaboradores
- O líder da área é um campo separado do campo "Líder Direto" no perfil do colaborador — os dois não se sincronizam automaticamente

---

## Vínculos

**Onde fica:** `Configurações > Vínculos` (`/admin/settings/employment-relationships`)

### O que é
Lista de vínculos empregatícios disponíveis na conta. É o filtro primário que determina quais campos do diretório aparecem para cada colaborador — sem vínculo definido, o sistema não consegue montar o perfil.

### Vínculos padrão do sistema
O sistema carrega vínculos padrão na criação da conta: CLT, Contrato Intermitente, Contrato por Tempo Determinado, Diretor Estatutário, Estágio, Freelancer 6 meses, Pessoa Jurídica, Sócio, Teletrabalho, entre outros.

### Criação de novos vínculos
O admin pode criar vínculos adicionais via botão **Novo vínculo**. Útil para modalidades específicas não cobertas pelos padrões (ex: associado, cooperado).

### Configuração de cada vínculo
No modal de edição, o admin define:
- **Nome do vínculo** — obrigatório
- **Campos do sistema vinculados** — seleção de quais campos do diretório fazem parte deste vínculo, organizados por categoria (Pessoal, Profissional, Documentos, Adicionais). Para cada campo é possível:
  - Marcar/desmarcar o **pertencimento** ao vínculo (se o campo aparece para colaboradores deste vínculo)
  - Ativar/desativar a **obrigatoriedade** de preenchimento

### Campos com pertencimento bloqueado
Alguns campos do sistema têm o pertencimento fixo e não podem ser desvinculados — são campos essenciais para o funcionamento do sistema (ex: nome do colaborador, cargo). O admin pode editar a obrigatoriedade, mas não pode remover o campo do vínculo.

### Corner cases
- Vínculo é sempre o primeiro dado a ser preenchido ao cadastrar um colaborador — sem ele o sistema não monta o perfil nem gera o link de admissão
- A lógica de exibição de campos é: vínculo filtra os campos disponíveis → permissões do grupo de acesso filtram o que o usuário logado pode ver/editar
- Vínculos customizados seguem as mesmas regras dos padrão após criados

---

## Centros de Custo

**Onde fica:** `Configurações > Centros de custo` (`/admin/settings/cost-center`)

### O que é
Lista de centros de custo da empresa. Usado no perfil do colaborador e como campo de identificação nos relatórios de folha de pagamento.

### Configuração
Cada centro de custo tem:
- **Nome** — obrigatório
- **Pessoas vinculadas** — seleção manual de colaboradores que pertencem a este centro; a interface divide em "Pessoas selecionadas" e "Pessoas não selecionadas", com busca e filtros

### Relação colaborador × centro de custo
A relação é **um para um**: um colaborador pode estar em apenas um centro de custo por vez. Um centro de custo pode ter N colaboradores.

A vinculação é gerenciada pelo centro de custo — o admin seleciona as pessoas dentro de cada CC, não o contrário. Ao adicionar uma pessoa a um novo CC, ela é automaticamente desvinculada do anterior.

### Ações disponíveis
- Criar novo centro via botão **Novo centro de custo**
- Editar via ícone de lápis
- Excluir via ícone de lixeira (disponível na listagem, não apenas no modal)
- Buscar por nome

### Limitação conhecida
O sistema não suporta alocação de um colaborador em múltiplos centros de custo simultaneamente.

---

## Empresas

**Onde fica:** `Configurações > Empresas` (`/admin/settings/companies`)

### O que é
Cadastro dos CNPJs/entidades jurídicas que compõem o grupo empresarial do cliente. É uma entidade central que conecta colaboradores, folha de pagamento, sistema contábil e sistema de ponto.

### Por que é importante
Uma conta Kiip pode ter múltiplas empresas. A entidade Empresa é o mecanismo que permite separar diferentes CNPJs e filiais dentro de uma mesma conta, mantendo colaboradores organizados por unidade jurídica.

### Configuração — fluxo em 3 etapas

**Etapa 1 — Detalhes:**
- Nome fantasia\*
- Razão social\*
- CNPJ\*
- Inscrição estadual\*
- Endereço completo\*
- Representante legal\*
- Contador responsável (opcional) — vincula um contador cadastrado em Configurações > Contadores

**Etapa 2 — Integrantes:**
- Seleção manual de colaboradores que pertencem a esta empresa
- ⚠️ Alerta do sistema: integrantes vinculados a outra unidade de ponto terão o vínculo com o controle de ponto removido ao serem adicionados a esta empresa

**Etapa 3 — Integrações:**

Bloco **Sistema contábil:**
- Toggle de ativação
- **Sistema contábil para integração** — seleção do sistema usado pela contabilidade (ex: Domínio, Questor)
- **Código da empresa** — código identificador desta empresa no sistema contábil; fornecido pela contabilidade; utilizado na geração dos arquivos de lançamento da folha (é o mesmo campo referenciado como "código de filial" na documentação de Folha de Pagamento)

Bloco **Controle de ponto:**
- Toggle de ativação
- **Sistema para integração** — seleção do sistema de ponto (ex: Kiip Ponto)
- **Identificador da unidade** — chave única que correlaciona esta empresa na Kiip com a conta correspondente no Kiip Ponto

### Integração com o Kiip Ponto
O Kiip Ponto é um sistema separado da Kiip Gestão. Cada filial/unidade no Kiip Ponto tem um identificador único de conta. A entidade Empresa é o ponto de conexão entre as duas plataformas — é aqui que se define qual conta do Kiip Ponto corresponde a qual empresa na Kiip Gestão. Isso permite que um grupo com múltiplas filiais mantenha tudo em uma única conta Kiip Gestão, com cada CNPJ mapeado para sua respectiva unidade de ponto.

### Corner cases
- **Empresa deve estar cadastrada antes** de adicionar colaboradores via planilha de adição em massa
- **Código da empresa sem preenchimento** impede a geração correta dos arquivos contábeis na folha — verificar sempre na implantação
- **Ao mover integrante entre empresas** com unidades de ponto distintas, o vínculo de ponto anterior é removido automaticamente — o sistema exibe alerta, mas não bloqueia a ação
- **Contas separadas por isolamento de acesso:** o sistema não restringe acesso por empresa dentro de uma mesma conta; para isolamento total, criar contas separadas
