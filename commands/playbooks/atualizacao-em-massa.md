# Playbook — Adição e atualização de dados em massa

Melhores práticas para operações em massa no diretório de colaboradores via planilha. Complementa a doc do módulo `diretorio`.

---

## As duas operações

| Operação | Caminho | Seleção prévia | Uso |
|---|---|---|---|
| **Adicionar via planilha** | Pessoas > Ações em massa > Adicionar via planilha | Não | Carga inicial ou lote de novos colaboradores |
| **Atualizar via planilha** | Pessoas > Ações em massa > Atualizar via planilha | Sim (selecionar pessoas) | Corrigir ou complementar dados de quem já existe |

Formatos: `.csv` e `.xlsx`. Tamanho máximo: 128MB.

---

## Antes de baixar a planilha

1. **Criar todos os campos customizados primeiro** — a planilha é gerada com os campos existentes no momento do download; campo criado depois não entra na planilha já baixada.
2. **Empresas cadastradas** — a adição exige empresa previamente existente em Configurações > Empresas.
3. Na atualização, **selecionar todos os campos de um grupo de múltiplas respostas juntos** antes de exportar (ver regra crítica abaixo).

---

## Regra crítica — grupos de múltiplas respostas

Grupos como **Cargos e Salários** e **Formação Acadêmica** não editam a entrada anterior: cada importação **insere uma nova entrada no histórico**.

> **Sempre preencher todos os campos do grupo juntos. Nunca campo isolado.** Uma entrada parcial (ex.: só o salário, sem vínculo/cargo/data de início) gera registro inconsistente no histórico.

- Na **adição**: preencher todas as colunas do grupo.
- Na **atualização**: selecionar todos os campos do grupo na etapa de seleção; as colunas virão em branco e a importação criará a nova entrada completa.
- O campo **Data de início** do grupo Cargos e Salários é o que determina qual entrada é a atual — preencher corretamente (impacta inclusive eventos de folha vinculados ao salário).

---

## Estrutura da planilha

**Adição:**
- Linha 2: campos obrigatórios (\*) — **ID, Nome completo, Email Principal, Data de Admissão, Empresa, Vínculo**
- Linha 3: agrupamento por categoria/sessão · Linha 4: instruções de formato · Linha 5: cabeçalhos · Linha 6+: uma pessoa por linha

**Atualização:**
- Coluna A: **ID único do colaborador (UUID)** — identificador crítico
- Grupos simples vêm com os valores atuais preenchidos; grupos de múltiplas respostas vêm em branco

> ⚠️ **Nunca reordenar linhas sem garantir que o ID acompanha os dados** — reordenar errado grava dados no perfil de outra pessoa.
> ⚠️ **Não alterar a estrutura da planilha** (linhas de cabeçalho, ordem de colunas geradas).

---

## Pontos de atenção

- **Vínculo é o primeiro dado que importa** — sem ele o sistema não monta o perfil nem o link de admissão.
- **Edição manual na folha não atualiza o diretório** — se o dado precisa persistir, corrigir no diretório (via atualização em massa se for volume).
- **Criação de usuários** pode ser feita no próprio fluxo em massa — e-mail de acesso = e-mail principal.
- **Duplicação de dados em campos de resposta única** é problemática e pode exigir acionamento do suporte Kiip — conferir a planilha antes de importar.
- Após a carga inicial, seguir imediatamente para a **regularização de férias** (playbook `regularizacao-ferias`).
