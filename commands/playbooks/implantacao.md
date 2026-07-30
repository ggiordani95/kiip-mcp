# Playbook — Implantação e Onboarding de Cliente

Sequência recomendada de implantação de uma nova conta na Kiip, da arquitetura da conta à ativação no ponto. Define a ordem de dependências entre as etapas, o que pode andar em paralelo e os pontos onde um erro gera retrabalho ou problema irreversível no fechamento.

---

## Princípio geral

A implantação é montada **de baixo para cima**: estrutura de base → pessoas → camadas operacionais → folha. A ordem existe porque cada fase depende de insumos da anterior. Quebrar a ordem não impede a configuração, mas gera os dois retrabalhos mais caros da operação: refazer carga de colaboradores e — no caso do ponto — erro de fechamento sem correção automática.

Sequência macro:

```
Fase 0  Diagnóstico e arquitetura da conta (tenant)
Fase 1  Base estrutural
Fase 2  Carga e regularização de pessoas
Fase 3  Camadas operacionais (lembretes + ponto)
Fase 4  Folha preparatória para contabilidade
Transversais  Modelos de admissão · Distribuição de holerite
```

---

## Fase 0 — Diagnóstico e arquitetura da conta

Antes de configurar qualquer coisa: entender o organograma e a estrutura de gestão do grupo para decidir **conta única (tenant único) vs. múltiplas contas**.

- O gatilho da divisão é a necessidade de **isolamento da administração de pessoas** — quando há perfis administrativos com acesso amplo que precisam ficar segregados entre si.
- O sistema **não restringe acesso por empresa dentro de uma mesma conta**. Isolamento real de acesso exige contas separadas.
- Um mesmo login pode acessar mais de uma conta, o que reduz o atrito de operar com múltiplas contas — mas a decisão de quantas contas existir tem que ser tomada aqui, porque define toda a estrutura seguinte.

> Decisão de fase zero: define isolamento de acesso e a quantidade de contas a configurar. Não dá para reverter sem refazer a implantação.

---

## Fase 1 — Base estrutural (antes de qualquer pessoa entrar)

### 1.1 Entidades do sistema

Cadastrar em `Configurações`: **Cargos, Empresas, Áreas, Vínculos, Centros de Custo**.

- **Cargos com CBO antecipado** — trava de ordem, não só organização. A integração com o ponto é configurada **no nível da entidade Empresa**, e ao ser ativada o Kiip Gestão **mapeia todos os cargos cadastrados na conta e os cria no sistema de ponto**. Logo, os cargos precisam estar completos e com os **CBOs corretos antes de sincronizar** qualquer conta do ponto a uma empresa. Cargo criado ou CBO ajustado depois do sync não se reflete automaticamente da forma esperada.
- **Empresas corretas desde o princípio** — CNPJ e vínculo com a estrutura organizacional. A entidade Empresa é também o ponto de conexão com o sistema de ponto; é por ela que o sync de cargos acima é disparado.
- **Código contábil da empresa NÃO precisa entrar agora** — ele é editável e só se torna obrigatório na hora de processar a folha para envio à contabilidade (Fase 4).

### 1.2 Estrutura do diretório

Ajustar sessões, grupos e **campos customizados** em `Configurações > Campos do Sistema`, conforme a realidade da empresa.

- Criar **todos os campos customizados antes da carga** — a planilha de adição em massa é gerada com os campos existentes no momento do download; campo criado depois não entra na planilha já baixada.
- O tipo do campo não pode ser alterado após a criação — definir certo na primeira vez.

### 1.3 Grupos de acesso — verificação dirigida

A revisão não é genérica. Três grupos exigem olhar específico (ver playbook `grupos-de-acesso` para detalhes):

- **Grupo Colaborador** — os campos com permissão de preenchimento neste grupo são exatamente os que aparecem no **link de admissão**. Revisar antes de enviar qualquer link. Restringir status apenas em **Desligado** (restringir status ativos impede o colaborador de ver o próprio perfil).
- **Grupo Líder** — verificar o que o líder pode visualizar e preencher dos liderados diretos.
- **Grupo Público** — controla o que um usuário vê das demais pessoas. Para "colaborador não vê colaborador", **restringir todos os status no grupo Público** — não mexer em permissão de campo (a aba Resumo é nativamente pública).

### 1.4 Políticas de férias por vínculo

Em `Configurações > Férias`, habilitar e definir período/saldo por vínculo **antes da carga**. Se o vínculo estiver com férias desabilitada, o sistema não gera os períodos aquisitivos da pessoa na adição.

### 1.5 Modelos de contrato

Verificar e subir os modelos de contrato. Tê-los prontos habilita a etapa **Contratos** do fluxo de adição de pessoa (gerar / gerar e enviar para assinatura).

---

## Fase 2 — Carga e regularização de pessoas

### 2.1 Carga de colaboradores

Adição em massa via planilha (`Pessoas > Ações em massa > Adicionar via planilha`).

- Obrigatórios: **ID, Nome completo, E-mail Principal, Data de Admissão, Empresa, Vínculo**.
- A empresa precisa estar previamente cadastrada (Fase 1).
- **Vínculo é o primeiro dado que importa** — sem ele o sistema não monta o perfil nem o link de admissão.
- **Grupos de múltiplas respostas (Cargos e Salários, Formação) preenchidos por inteiro**, nunca campo isolado — o sistema insere nova entrada no histórico; registro parcial fica inconsistente.
- Não alterar a estrutura da planilha exportada.

### 2.2 Revisão de férias — imediatamente após a carga

**É a primeira coisa a fazer depois de cadastrar as pessoas**, inclusive as que já trabalham na empresa. Ver playbook `regularizacao-ferias`.

- Ao adicionar a pessoa, o sistema cria automaticamente todos os períodos aquisitivos retroativos desde a admissão, com **saldo integral**. Sem regularizar, o saldo não reflete o histórico real.
- **Urgência:** o serviço de encerramento de períodos roda diariamente após a meia-noite. Uma pessoa cujo período concessivo vence em 1–2 dias vira **Vencido** na virada do dia se ninguém regularizou.
- **Risco legal:** período concessivo encerrado com saldo não usufruído = direito não concedido no prazo → **pagamento em dobro (Art. 137 CLT)**.

### 2.3 Usuários e acesso

- Criar usuários (no próprio fluxo de adição/atualização em massa ou em `Gestão de Usuários`).
- E-mail de acesso = **e-mail principal** do diretório (editar lá atualiza o acesso automaticamente).
- Após a carga, o admin pode optar por **enviar o link de admissão para todos** — inclusive quem já trabalha na empresa — para forçar a atualização dos dados pessoais. Por isso os grupos de acesso (1.3) precisavam estar prontos antes.

> Momento oportuno para completar o **código contábil** das empresas, se os dados já estiverem organizados.

---

## Fase 3 — Camadas operacionais

### 3.1 Lembretes

Configuração dos lembretes da conta (ver doc do módulo `lembretes`).

### 3.2 Ponto — o caminho da felicidade

Etapa mais sensível da implantação: **erros aqui são irreversíveis na prática**, porque o sistema de ponto não reprocessa retroativo. Seguir o playbook `ativacao-ponto` na ordem exata:

1. Criar as contas/unidades necessárias no ponto
2. Linkar cada conta do ponto à sua entidade Empresa no Gestão
3. Criar todas as regras de jornada e turnos
4. Cadastrar todos os feriados locais
5. Validar cargo, CBO e e-mail de cada pessoa no Gestão
6. Só então ativar as pessoas — sempre via integração, **nunca manualmente no ponto**

---

## Fase 4 — Folha preparatória para contabilidade

Vem **depois do ponto**, pois depende dos insumos consolidados (marcações, eventos do período).

- Configurar eventos/rubricas, modelo de folha e integração contábil (Domínio / Questor).
- É aqui que o **código contábil da empresa se torna obrigatório** — sem ele os arquivos contábeis da folha não são gerados corretamente.
- A integração com Férias é automática: ao abrir a folha, o sistema lê as solicitações de férias com início dentro do período de referência e importa os dias como lançamento programado.

---

## Transversais (entram conforme a dor inicial do cliente)

### Modelos de admissão

- Servem ao **onboarding contínuo pós-go-live** (checklist operacional + aplicabilidade). As 5 etapas do fluxo são fixas; só o checklist e a aplicabilidade são configuráveis.
- Quando a empresa contrata o sistema justamente para uma **carga grande de admissões**, dedica-se a esta camada mais cedo — antecipando contratos, modelos de contrato e modelos de admissão.
- **Ressalva de uso (contorno, não uso pretendido):** é possível usar o controle de admissão para *acompanhar* o cadastro de pessoas já ativas (envio do link, preenchimento de dados). O módulo **não foi desenhado para atualização de dados de quem já está na empresa** — tratar como contorno consciente, não como recomendação padrão.

### Distribuição de holerite / contracheque

- É a parte **pós-processamento** da folha — simples e utilizável desde cedo.
- Pode ser priorizada bem antes da Fase 4, independentemente da configuração preparatória de envio à contabilidade.

---

## Corner cases e pontos de atenção

- **Decisão de conta(s) é irreversível de Fase 0** — definir isolamento de acesso antes de qualquer configuração.
- **Campos customizados antes da carga** — campo criado após o download da planilha não entra na planilha já baixada.
- **Política de férias desabilitada no vínculo** = nenhum período aquisitivo gerado na adição. Habilitar antes da carga.
- **Revisão de férias é a primeira ação pós-carga** — risco de saldo virar Vencido em 1–2 dias (pagamento em dobro, Art. 137 CLT).
- **Grupo Colaborador define o link de admissão** — revisar antes de enviar links em massa.
- **Grupo Público bloqueado** é o caminho correto para "colaborador não vê colaborador".
- **Código contábil é editável e só obrigatório na Fase 4** — não bloquear a carga inicial por causa dele.
- **Ponto não reprocessa retroativo** — jornadas, regras e feriados locais cadastrados **antes** da ativação. Ordem inviolável.
- **NUNCA criar pessoa manualmente no ponto** — pessoa órfã não importa para a folha e não recebe abono automático de férias.
- **Cada CNPJ = uma unidade de ponto com base zero** — recadastrar turnos, regras e feriados em todas.
