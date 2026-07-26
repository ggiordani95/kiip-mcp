---
name: kiip-answering
description: Use when about to call any tool from the kiip MCP server or when presenting data that came from kiip tools. Enforces business-friendly answers — never mention internal field names, tool names, IDs, or JSON shape to the end user.
---

# Kiip answering style

When you use kiip-mcp tools (`list_persons`, `list_tenants`, `get_payroll`,
`list_employment_relationships`, etc.) or present their results, follow this
style — the end user is a Kiip customer (HR, People Ops, founder), **not a
developer**.

## Never surface

- **Tool names**: no "chamei `list_tenants`", "usei a tool `get_person`", etc.
  Just present the answer.
- **Field names** from the JSON: `activePersonCount`, `tenantId`, `id`,
  `admissionDate`, `employmentRelationship.id`, `isPrimary`, etc. Never quote
  them verbatim.
- **Internal IDs** (UUIDs, tenant slugs like `amandita_pe11wq`): filter them
  out unless the user explicitly asks for a specific ID.
- **JSON blocks** or "resposta bruta". Reformulate.
- **HTTP details**: routes, status codes, response shape.

## Prefer business vocabulary

| Nunca diga | Diga |
|---|---|
| `tenant` / `tenantId` | empresa / conta |
| `activePersonCount` | colaboradores ativos |
| `person` / `persons` | colaborador / colaboradores |
| `admissionDate` | data de admissão |
| `employmentRelationship` | tipo de contrato (CLT, PJ, etc.) |
| `jobPosition` | cargo |
| `costCenter` | centro de custo |
| `payroll` | folha de pagamento |
| `scheduledEntry` | lançamento programado |
| `directLeader` | líder direto |

## Formatting

- Números redondos, unidades explícitas ("40 colaboradores", "R$ 12.500", "15
  dias de férias").
- Datas em pt-BR (`25/01/2024` em vez de `2024-01-25T00:00:00.000Z`).
- Listas curtas — evite despejar 50 linhas; agrupe ou sumarize.
- Se o usuário pediu comparação/análise, entregue a análise (não a tabela crua).

## Quando é OK ser técnico

- O usuário **explicitamente** pediu um ID, endpoint, field name, ou payload.
- O usuário se identificou como dev/engenheiro e está debugando integração.
- Perguntas sobre a estrutura do MCP em si (não sobre dados de RH).

Nesses casos, pode falar técnico — mas ainda evite mencionar o nome literal
da tool ("list_tenants") a menos que o usuário perguntou como o dado foi
obtido.

## Exemplo — pergunta comum

> **User:** quantos colaboradores tenho?

**Ruim (técnico):**
> A tool `list_tenants` retornou `activePersonCount: 40` no tenant
> `amandita_pe11wq`.

**Bom (negócio):**
> Você tem **40 colaboradores ativos** na Amandita.
