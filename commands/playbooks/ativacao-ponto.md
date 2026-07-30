# Playbook — Ativação de pessoas no Kiip Ponto

Checklist e ordem obrigatória para ativar colaboradores no Kiip Ponto sem gerar erros irreversíveis. Complementa a doc do módulo `ponto`.

---

## Por que a ordem é rígida

O Kiip Ponto **não reprocessa retroativo**: cada dia é processado com a regra de jornada, o turno e os feriados vigentes naquele momento. Regra, turno ou feriado ausente quando o dia foi processado **não se corrige sozinho** — vira ajuste manual ou erro de fechamento, e o reprocessamento exige abertura de chamado no suporte Kiip (procedimento técnico, sensível e demorado).

---

## Regra de ouro

> **NUNCA criar a pessoa manualmente no Ponto.** O botão existe e funciona, mas quebra a ponte entre as plataformas. A pessoa fica órfã da integração: **não importa para a folha** e **não recebe o abono automático de férias**. São falhas silenciosas — só aparecem no fechamento. O único caminho válido é: pessoa no Kiip Gestão → ativação via integração.

---

## Ordem obrigatória

1. **Criar as contas/unidades necessárias** dentro da estrutura do ponto. Cada CNPJ = uma unidade, sempre **de base zero** (sem herança da matriz).
2. **Linkar cada conta do ponto à sua entidade Empresa** no Kiip Gestão (`Configurações` → entidade Empresa → integrações → `Identificador da unidade`). ⚠️ No momento desse sync, o Gestão mapeia **todos os cargos com CBO** da conta e os cria no ponto — cargos e CBOs precisam estar finalizados **antes**.
3. **Criar todas as regras de jornada e turnos** corretos para cada perfil de colaborador — em **cada unidade**.
4. **Cadastrar todos os feriados locais** (municipais, estaduais e feriados-ponte) — em **cada unidade**. O ponto só traz o calendário nacional.
5. **Validar no Kiip Gestão, pessoa a pessoa:** cargo, CBO e e-mail. Dentro do ponto não é permitido atualizar cargo, e a edição de e-mail é bloqueada/complexa.
6. **Só então ativar as pessoas** — em `Configurações > Kiip Ponto`, individualmente ou em massa (seleção precisa ser da **mesma empresa/unidade**).

---

## Checklist pré-ativação (por pessoa)

| Item | Onde validar |
|---|---|
| E-mail único (nunca usado em nenhuma plataforma Kiip) | Perfil no Gestão |
| Cargo cadastrado | Perfil no Gestão |
| CBO válido no cargo | Configurações > Cargos |
| CPF | Perfil no Gestão |
| Data de nascimento | Perfil no Gestão |
| Matrícula preenchida | Perfil no Gestão |
| Data de admissão | Perfil no Gestão |
| Turno e regra de jornada existentes na unidade | Painel do Ponto |

No modal **Ativar ponto**, serão exigidos: **Turno**, **Regra** e **Data de início no ponto**.

---

## Decisões de uma chance só

- **Data de início das marcações:** pode ser retroativa (ex.: ativar dia 8 com marcações valendo desde o dia 1), mas **não pode ser editada depois da ativação**. Conferir antes de confirmar.
- **Regra e turno associados na ativação:** trocas posteriores só valem **para frente** — nunca para datas passadas.

---

## Erros comuns no modal de ativação

| Erro | Causa | Correção |
|---|---|---|
| `Cargo não informado.` | Pessoa sem cargo no Gestão | Preencher cargo no perfil |
| `CBO não informado no cargo.` | Cargo sem CBO | Adicionar CBO em Configurações > Cargos |
| `Cargo não registrado no Módulo de Ponto.` | Consequência dos anteriores — cargo sem CBO nunca sincronizou | Corrigir cargo/CBO; o sync ocorre ao editar o cargo |

---

## Depois da ativação

- Conferir as marcações regularmente e **sempre antes do fechamento do período** — reprocessamento pós-fechamento não é autoatendimento.
- Férias aprovadas no Gestão geram abono automático no ponto; **exclusão de férias não remove o abono** (remoção manual).
- Trocas de escala e folgas rotativas exigem planejamento — o sistema não prevê folga rotativa automática.
