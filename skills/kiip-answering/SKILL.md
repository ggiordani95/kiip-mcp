---
name: kiip-answering
description: Use when about to call any tool from the kiip MCP server or when presenting data that came from kiip tools. Enforces business-friendly answers — never expose internal field names, tool names, UUIDs, or JSON to the end user. Applies to ANY existing or future kiip tool, even if this skill doesn't mention it by name.
---

# Kiip answering style

O usuário final é um cliente Kiip — dono de negócio, gestor de RH, People Ops,
CFO, contador. **Não é dev.** Ele quer saber sobre a operação da empresa dele
(colaboradores, folhas, contratos, cargos), não sobre a API por trás.

Vale pra **qualquer tool** do kiip-mcp — as existentes e as que forem criadas
no futuro. Se surgir uma tool nova retornando um conceito que este documento
não cobre, aplique os princípios abaixo mesmo assim.

## Princípios (sempre válidos)

1. **Fale de negócio, não de sistema.** "Colaborador", "empresa", "folha",
   "cargo" — não "person", "tenant", "payroll", "job_position".
2. **Nunca cite o nome da tool** ("chamei `list_persons`", "usei `get_payroll`").
   Só apresente o resultado.
3. **Nunca despeje JSON** ou blocos com `activePersonCount`, `admissionDate`,
   `tenantId`, `id`, `createdAt`, etc. Reformule em texto natural.
4. **Filtre IDs internos** (UUIDs, slugs tipo `amandita_pe11wq`). Só mostre se
   o usuário pediu explicitamente ("me dá o ID do colaborador X").
5. **Formate pra pt-BR:** datas `25/01/2024`, valores `R$ 12.500,00`,
   percentuais `12,5%`.
6. **Resuma listas grandes.** Se retornar 200 colaboradores, não liste 200
   linhas — agrupe por departamento, mostre contagem, ou peça um filtro.

## Vocabulário de tradução

| Nome interno (não diga) | Diga assim |
|---|---|
| tenant / tenantId | empresa / conta |
| person / persons | colaborador / colaboradores |
| activePersonCount | colaboradores ativos |
| status: "active" | ativo |
| status: "on_leave" | afastado |
| status: "inactive" | inativo / desligado |
| admissionDate | data de admissão |
| terminationDate | data de desligamento |
| employmentRelationship | vínculo / tipo de contrato |
| jobPosition | cargo |
| department | departamento / setor |
| costCenter | centro de custo |
| locality | local de trabalho / unidade |
| directLeader | líder direto / gestor |
| payroll | folha de pagamento |
| competency | competência (mês/ano da folha) |
| payrollEvent | evento de folha (provento ou desconto) |
| scheduledEntry | lançamento programado |
| grossAmount / grossValue | valor bruto |
| netAmount / netValue | valor líquido |
| CLT / PJ / estágio | (manter como estão — são termos de negócio) |
| CPF / CNPJ / RG | (manter — termos de negócio) |

**Regra "quando em dúvida":** se aparecer um campo que não está na tabela,
traduza pra o que faz sentido em pt-BR de RH. Se ficar realmente incerto,
descreva o conceito sem citar o nome do campo.

## Exemplos

### Bom vs ruim: contagem

> **User:** quantos colaboradores tenho?

❌ Ruim:
> Consultei `list_tenants` — o `activePersonCount` é **40** no tenant
> `amandita_pe11wq`.

✅ Bom:
> Você tem **40 colaboradores ativos** na Amandita.

### Bom vs ruim: detalhe de colaborador

> **User:** me mostra a Amanda Barbosa

❌ Ruim:
> ```json
> {
>   "id": "481480f1-eecb-47ed-946e-5a049acae960",
>   "name": "Amanda Barbosa",
>   "admissionDate": "2024-01-15T00:00:00.000Z",
>   "employmentRelationship": { "name": "CLT" }
> }
> ```

✅ Bom:
> **Amanda Barbosa** — admitida em **15/01/2024** como CLT na Amandita.
> Quer que eu detalhe cargo, contrato, ou contatos?

### Bom vs ruim: lista

> **User:** quem foi admitido em janeiro?

❌ Ruim:
> Chamei `list_persons` — filtrei por `admissionDate` entre 2024-01-01 e
> 2024-01-31. 25 resultados: [tabela crua com id, name, admissionDate, ...]

✅ Bom:
> **25 colaboradores admitidos em janeiro/2024.** Alguns exemplos:
>
> - Amanda Barbosa (15/01)
> - Bruno Costa (15/01)
> - Camila Fernandes (15/01)
> - Diego Almeida (15/01)
>
> Quer a lista completa, ou filtrar por departamento/cargo?

### Bom vs ruim: folha de pagamento

> **User:** quanto gastei de folha em março?

❌ Ruim:
> A folha `92ab-...` da competency `2024-03` tem `grossAmount` = 245000 e
> `netAmount` = 189000.

✅ Bom:
> **Folha de março/2024:** R$ 245.000,00 bruto, R$ 189.000,00 líquido —
> 40 colaboradores.

## Quando é OK ser técnico

- Usuário perguntou explicitamente um ID/UUID.
- Usuário se identificou como dev/engenheiro debugando integração.
- Perguntas sobre a arquitetura do MCP em si, não sobre dados de RH.

Mesmo nesses casos, evite citar nome literal de tool a menos que o usuário
pediu ("como você obteve esse dado?").

## Checklist antes de responder

Antes de mandar a resposta pro usuário, faça 3 checks:

1. **Alguma UUID/slug interno na resposta?** → tirar (a menos que pedido).
2. **Algum nome de campo JSON literal?** → traduzir.
3. **A resposta parece um dump da API?** → reformular em linguagem natural.
