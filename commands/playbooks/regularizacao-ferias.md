# Playbook — Regularização de férias pós-carga

Como regularizar saldos e histórico de férias imediatamente após a carga de colaboradores. É **a primeira ação obrigatória depois de cadastrar as pessoas** — inclusive as que já trabalham na empresa. Complementa a doc do módulo `ferias`.

---

## Por que é urgente

- Ao adicionar um colaborador, o sistema cria automaticamente **todos os períodos aquisitivos retroativos** desde a admissão, com **saldo integral**: períodos encerrados ficam como Utilizado; o concessivo atual fica como Disponível com saldo cheio. Sem regularização, o saldo não reflete o histórico real.
- O **serviço de encerramento de períodos roda diariamente após a meia-noite**. Uma pessoa cujo período concessivo vence em 1–2 dias vira **Vencido** na virada do dia se ninguém regularizou.
- **Risco legal:** período concessivo encerrado com saldo não usufruído = férias não concedidas no prazo → **pagamento em dobro (Art. 137 CLT)**.

---

## Ferramentas (em Gestão de férias > Gestão de saldo, menu "...")

### 1. Importar solicitações em massa

Regulariza o **histórico de solicitações** via planilha `.xlsx`.

- Aceita **datas fora do período concessivo** (para férias vencidas tiradas retroativamente)
- Não valida antecedência, tamanho mínimo de período ou dia de início
- Único bloqueio: a soma dos dias importados por período não pode ultrapassar o total recebido — a solicitação que estoura é rejeitada, as demais entram
- Solicitações importadas **não passam pelo fluxo de aprovação** — viram histórico direto
- Template: até 3 solicitações pré-criadas por período; duplicar a linha para mais

### 2. Editar saldo em massa

Ajusta os **valores** dos períodos (Recebido, Descontos, Utilizado, Abono) via planilha `.xlsx`.

- **Não altera datas** dos períodos
- Não alterar a estrutura da planilha; a coluna Planejado é calculada pelo sistema e ignorada na importação

### 3. Edição individual de período aquisitivo

Única forma de **alterar datas** (início/término do aquisitivo, vencimento do concessivo).

- Alterar o término do aquisitivo recalcula automaticamente o início do concessivo (dia seguinte)
- Em períodos intermediários, o sistema pergunta se propaga para os ciclos seguintes (a propagação usa a duração configurada no vínculo)
- O sistema bloqueia saldo disponível negativo
- Toda edição fica no Registro de alterações (quem, quando, de/para)

---

## Sequência recomendada

1. **Filtrar por status Vencendo e Vencido** na Gestão de saldo — priorizar quem está perto de estourar prazo
2. **Corrigir datas** de períodos divergentes (edição individual)
3. **Importar o histórico de solicitações** (planilha) para os períodos que a pessoa já usufruiu
4. **Ajustar valores residuais** (editar saldo em massa): descontos, abonos, dias utilizados fora do padrão
5. **Conferir o resultado** no painel Saldo de férias detalhado de amostras de colaboradores

---

## Pontos de atenção

- **Vínculo com férias desabilitada não gera períodos.** Se a política do vínculo não estava habilitada na carga, habilitar e verificar a criação dos períodos.
- **Bug conhecido (com workaround):** alterar o período aquisitivo de Personalizado de volta para "12 meses (Padrão CLT)" não dispara o recálculo em massa. Workaround: manter Personalizado e digitar 12 meses manualmente.
- **Férias vencidas não entram pela interface** — só pela importação em massa.
- **Desligamento interrompe o período automaticamente** — saldo restante vira abono (status Interrompido), sem ação manual.
- **Se a empresa usa Kiip Ponto:** férias regularizadas retroativamente também precisam de abono correspondente no ponto (ver playbook `ativacao-ponto`).
