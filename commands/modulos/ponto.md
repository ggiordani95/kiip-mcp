# Kiip Ponto — Integração multiplataforma

Base de conhecimento sobre o Kiip Ponto e sua integração com o Kiip Gestão: arquitetura de contas/unidades, a tela de configuração no Gestão, os pontos de integração entre as plataformas e as travas do sistema que tornam certos erros irreversíveis na prática.

---

## O que é o Kiip Ponto

O Kiip Ponto é um **produto separado** do Kiip Gestão — não é um módulo interno, é uma plataforma à parte com aplicações próprias, integrada ao Gestão por pontos de conexão definidos.

Aplicações que compõem o Kiip Ponto:

- **App do colaborador** (Android/iOS) — expõe, na visão do colaborador, apenas as funcionalidades de ponto.
- **App coletor / ponto coletivo** (Android) — dispositivo de marcação compartilhada.
- **Aplicação web do gestor do ponto** — painel de gestão das marcações e configurações.
- **Aplicação web do coletor** — versão online (navegador) do ponto coletivo.

---

## Arquitetura: contas, unidades e a entidade Empresa

O Kiip Ponto é dividido em **múltiplas contas** — a matriz e suas unidades. **Cada conta/unidade do Ponto tem que estar relacionada a uma entidade Empresa no Kiip Gestão** (via `Identificador da unidade`, configurado no bloco de integrações da entidade Empresa).

A diferença estrutural entre as plataformas:

- O **Kiip Gestão** cadastra pessoas de múltiplas empresas / múltiplos CNPJs em uma única conta.
- O **Kiip Ponto** divide essas pessoas **por unidade**. Cada unidade é uma conta própria, **de base zero** — pessoas, cargos, regras de jornada, jornadas, turnos e feriados são cadastrados separadamente em cada unidade.

> ⚠️ **Base zero por unidade — não há herança.** Configurações feitas na matriz (principalmente **regras de jornada e turnos**) **precisam ser replicadas manualmente em cada unidade**. Cada CNPJ = uma unidade de ponto começando do zero. Risco clássico: configurar só a matriz e, ao ativar pessoas de outra unidade, não ter jornada/regra/turno disponível ali. Verificar unidade por unidade antes de ativar.

Contrapartida positiva da divisão por unidade: permite **configurações diferentes de jornada** por unidade e permite que um **gestor de uma única unidade** tenha controle (inclusive funções mais gerenciais) restrito apenas às pessoas cadastradas naquela unidade.

---

## Onde fica no Kiip Gestão

**Caminho:** `Configurações > Kiip Ponto` (`/admin/settings/time-and-attendance`)

### O que a tela oferece

- **Painel de instruções:** reforça que, antes de ativar uma pessoa, é preciso ter no cadastro as informações pessoais obrigatórias (data de nascimento, e-mail e CPF) e ter em mãos as informações de Ponto (turno, regra e data de início no ponto), que são obtidas no painel do Ponto.
- **Acessar Ponto como proprietário** — botão que abre o painel do Ponto com acesso de proprietário.
- **Filtros:** busca por nome, filtro por Empresas, mais filtros.
- **Abas de status:** `Todas`, `Ativos`, `Desativados` — cada pessoa aparece com o status na sua respectiva conta de ponto (**Ativo** × **Desativado**).
- **Coluna Empresa:** mostra a unidade de ponto à qual a pessoa pertence.
- **Ações por linha:** `Ativar` (pessoa desativada) / `Desativar` (pessoa ativa).
- **Ações em massa:** `Ativar selecionados`, `Desativar selecionados`, `Sincronizar jornadas`.

---

## Integrações Gestão ↔ Ponto

São cinco pontos de integração entre as plataformas. Os dois primeiros são o alicerce (constroem a base no Ponto); os dois seguintes trafegam dados de operação; o último é um caso à parte de assinatura.

### 1. Sincronização de cargos (Gestão → Ponto)

O Gestão cadastra os cargos no Ponto **automaticamente** — o cliente não cria cargo manualmente no Ponto. A sincronização dispara em três situações:

1. **Ao criar/editar um cargo** que tenha CBO — sincroniza esse cargo com as contas de ponto relacionadas.
2. **Ao ativar uma conta de ponto para uma empresa** — o Gestão pega **todos os cargos com CBO** cadastrados na conta e os cria naquela unidade de ponto.
3. **Ao editar a entidade Empresa** — reativa a integração e comunica as contas de ponto relacionadas.

> ⚠️ **Cargos e CBOs precisam estar finalizados antes do sync.** Como a integração é configurada no nível da entidade Empresa e o sync empurra os cargos com CBO para o Ponto, sincronizar com cargo incompleto ou CBO errado leva o erro para dentro do Ponto. **Só cargos com CBO são sincronizados.**

### 2. Ativação / adição de pessoas (Gestão → Ponto)

O **caminho único e obrigatório** para as plataformas funcionarem: a pessoa é inserida no Kiip Gestão com os dados corretos e **ativada no Ponto pela integração** (Gestão → Ponto).

> ⚠️ **NUNCA criar a pessoa manualmente no Ponto.** O botão existe e funciona, mas quebra a ponte entre as plataformas: a pessoa fica órfã da integração, **não importa para a folha** e **não recebe o abono automático de férias** na aprovação. São falhas silenciosas — aparecem só no fechamento.

**Pré-requisitos obrigatórios (no Kiip Gestão, antes de ativar).** Sem qualquer um destes, a ativação falha:

- **E-mail único** — nunca cadastrado em nenhuma plataforma do Kiip antes; é a chave da conexão.
- **Cargo** cadastrado no Kiip Gestão.
- **CBO válido** salvo nesse cargo.
- **CPF**
- **Data de nascimento**
- **Matrícula** (valor preenchido)
- **Data de admissão**

> ⚠️ **Validar cargo, CBO e e-mail no Gestão antes de ativar.** Dentro do Ponto **não é permitido atualizar o cargo** e a **edição de e-mail é bloqueada/complexa**. Corrigir depois, do lado do Ponto, é caro ou inviável.

**O que é preenchido no momento da ativação.** No modal **Ativar ponto** (não vem do cadastro):

- **Turno** (obrigatório)
- **Regra** (obrigatório) — regra de jornada
- **Data de início no ponto** (obrigatório)

Turno e regra vêm do painel do Ponto; por isso precisam existir na unidade **antes** da ativação.

**Ativação em massa.** Via `Ações em massa > Ativar selecionados`, **desde que todas as pessoas selecionadas pertençam à mesma empresa/unidade** — porque cada conta do Ponto corresponde a uma entidade Empresa e as configurações (turno/regra) são por unidade.

**Modal de erros na ativação.** Se faltar informação obrigatória, o Gestão bloqueia e abre **"Erros na ativação de pessoas"**, listando `Nome completo`, `Motivo do erro` e a ação `Ver perfil`. Exemplo real de motivos combinados numa mesma pessoa:

- `Cargo não informado.`
- `CBO não informado no cargo.`
- `Cargo não registrado no Módulo de Ponto.`

O terceiro motivo é consequência dos dois primeiros: sem cargo com CBO no Gestão, o cargo nunca foi sincronizado para o Ponto.

### 3. Férias → Ponto (abono automático)

Integração que **envia** informação do Gestão para o Ponto.

Quando um colaborador está associado a uma empresa com integração de ponto e sua solicitação de férias é **aprovada** — ou seja, passa da etapa de **documentação** para o funil **Aprovado** —, o módulo de Férias comunica automaticamente o Kiip Ponto, **gerando um abono com o motivo "férias"** sobre o período aprovado.

- **Benefício:** o gestor **não precisa repetir** essa informação no Kiip Ponto — o abono é lançado sozinho.
- ⚠️ **A exclusão não é automática.** Se a solicitação de férias for excluída, o abono correspondente **precisa ser removido manualmente**.

### 4. Folha ← Ponto (leitura / importação de dados)

Integração de **leitura**: a Folha da Kiip lê e interpreta dados do Ponto. Fatores lidos por colaborador:

- **Totalizadores de horas extras por fator** (cada percentual)
- **Adicional noturno**
- **Faltas justificadas**
- **Faltas injustificadas**

**Como funciona.** Ao abrir uma folha de pagamento existe a opção **importar dados**. A Kiip lê os colaboradores inseridos naquela folha, puxa os dados do Ponto **sobre o período selecionado na importação, dia por dia**, e contabiliza os fatores acima.

Se a Folha identificar um fator de hora extra que ainda **não existe como evento de folha**, ela **cria e adiciona o evento automaticamente** — mas o ideal é que isso nunca seja necessário.

> ⚠️ **Recomendação:** quem usa a importação Ponto → Folha deve **criar previamente os eventos de folha** com **todos os percentuais possíveis** cadastrados nas regras de jornada do Ponto. Ex.: se uma regra de jornada do cliente contempla hora extra de 75% e 150%, esses eventos já devem existir na folha da Kiip antes da importação.

### 5. Assinatura do espelho de ponto (caso à parte)

> ⚠️ **Fonte recorrente de confusão.** No universo Kiip, a assinatura eletrônica de documentos é feita pelo **Kiip Sign**. O **espelho de ponto é a única exceção**.

Toda vez que um ponto é fechado, é gerado um **fechamento de ponto** dentro do Kiip Ponto, que produz o **espelho de ponto** e o envia para assinatura **direto pelo aplicativo do Ponto** — **não** pelos canais tradicionais do Kiip Sign.

Portanto: o espelho de ponto é **o único documento assinável no universo Kiip que não passa pelo Kiip Sign** — a assinatura é integrada diretamente à ferramenta do Ponto.

---

## Travas do sistema — o caminho da felicidade (ordem que NÃO pode ser quebrada)

Esta é a parte mais sensível. O Kiip Ponto **não reprocessa retroativo**: todos os dias, ao fechar o dia, o Ponto processa os valores daquele dia a partir da **regra de jornada e do turno associados naquele momento**. O que foi processado **não volta atrás sozinho**.

**Consequências diretas:**

- **Regra e turno só mudam para frente.** Uma vez que o colaborador é associado a uma regra de jornada e a um turno, é possível trocar — **desde que a movimentação seja para datas futuras**. **Nunca** é possível trocar regra/turno para uma data passada. (Ao criar uma conta de ponto existe um turno e uma regra de jornada **padrão** de referência.)
- **A data de início das marcações pode ser retroativa, mas é definida uma única vez.** Na ativação, escolhe-se a data de início no Ponto pelo Gestão; ela pode ser passada (ex.: ativa no dia 8, marcações valendo desde o dia 1 — os dias intermediários ficam sem marcação e podem ser ajustados/corrigidos depois). **Porém, uma vez confirmada a ativação com uma regra e um turno para aquele intervalo, isso não pode mais ser editado.**
- **Distinção-chave:** a **data de início das marcações** é retroativa (mas única/imutável); a **parametrização** (jornadas, regras, turnos, feriados) **não é retroativa**.

> ⚠️ **Recomendação crítica:** criar **todas as regras de jornada e turnos** e cadastrar **todos os feriados locais** **antes de ativar qualquer pessoa** no Ponto. Regra, turno ou feriado ausente no momento em que o dia foi processado não se corrige sozinho — vira ajuste manual ou erro de fechamento.

> ⚠️ **Reprocessamento exige suporte Kiip.** Corrigir valores já processados que dependam de troca de regra/turno/feriado **só é possível via abertura de chamado no suporte Kiip** — é um procedimento técnico, sensível e que pode ser demorado. Não é autoatendimento. Por isso, **sempre conferir as informações de ponto antes do fechamento do período.**

---

## Feriados

O Kiip Ponto carrega **nativamente apenas os feriados nacionais do Brasil**.

- **Feriados locais** (municipais e estaduais) e **feriados-ponte** que impactem o cliente **precisam ser cadastrados manualmente**, por unidade.
- Feriado segue o **mesmo rigor** das regras de jornada e da associação de turno: precisa estar cadastrado **antes** de o dia acontecer.
- Um dia processado sem o feriado cadastrado **não se corrige sozinho** — o reprocessamento exige abertura de chamado no suporte Kiip e pode ser demorado.

> ⚠️ Cadastrar os feriados **de forma bastante antecipada**, dentro da estrutura de onboarding/configuração, **antes de iniciar os registros de ponto**. Muitas empresas operam feriado-ponte — mapear tudo previamente.

---

## Férias retroativas — workaround

O sistema **não permite solicitação retroativa de férias pela interface** (não é possível lançar um cartão de férias depois que as férias já começaram e avançar de fase). Quando o RH não registrou antes:

1. Lançar via **planilha de importação de solicitações em massa** (módulo Férias) — aceita datas retroativas.
2. **Abonar os dias no Ponto** correspondentes ao período.

> O caminho correto continua sendo **registrar as férias antes do início**; o workaround acima serve para regularizar o que passou.

---

## Corner cases

- **Pessoa criada manualmente no Ponto fica órfã** — não importa para a folha e não recebe abono automático de férias. Falhas silenciosas, aparecem no fechamento.
- **Ativação em massa exige mesma empresa/unidade** — seleção com pessoas de unidades diferentes não é ativável em lote.
- **Cargo sem CBO não é sincronizado** para o Ponto — e a pessoa com esse cargo não ativa (erro "Cargo não registrado no Módulo de Ponto").
- **Cargo não pode ser atualizado dentro do Ponto** e a **edição de e-mail é bloqueada/complexa** — validar tudo no Gestão antes de ativar.
- **Data de início das marcações não é editável após a ativação** — conferir antes de confirmar.
- **Regra/turno não retrocedem** — troca só para datas futuras; correção de período passado é reprocessamento via suporte Kiip.
- **Feriados locais e feriados-ponte não vêm no Ponto** — apenas o calendário nacional; cadastrar manualmente e antecipadamente, por unidade.
- **Exclusão de férias não remove o abono automaticamente** — remoção manual necessária.
- **Espelho de ponto não passa pelo Kiip Sign** — assinatura integrada ao próprio Ponto; único documento assinável fora do Kiip Sign.
- **Férias retroativas não entram pela interface** — regularizar via planilha + abono no ponto.
- **Conferir tudo antes de fechar o ponto** — reprocessamento pós-fechamento não é autoatendimento e é o caso de suporte mais sensível da operação.
