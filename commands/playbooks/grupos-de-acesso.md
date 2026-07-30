# Playbook — Configuração de grupos de acesso

Como configurar os grupos de acesso para os cenários mais comuns, evitando os erros clássicos. Complementa a doc do módulo `usuarios-e-acessos`.

---

## Modelo mental

Cada grupo define **o que** o usuário vê/edita e **sobre quem** (escopo). As permissões de múltiplos grupos **se somam** — nenhum grupo anula outro. A exibição de um campo passa por dois filtros em sequência: o **vínculo** do colaborador determina quais campos existem no perfil; o **grupo de acesso** do usuário logado determina o que ele vê/edita desses campos.

---

## Os três grupos que exigem revisão dirigida

### Grupo Colaborador (escopo: próprio colaborador)

- **Os campos com permissão de preenchimento neste grupo são exatamente os campos que aparecem no link de admissão.** Configuração errada = link pede dado de menos ou de mais. Revisar **antes** de enviar qualquer link (inclusive em massa).
- **Visibilidade por status:** para o colaborador ver o próprio perfil, os status de atividade (Em admissão, Em férias, Em atividade, Afastado) **não** podem estar restritos. Restringir apenas **Desligado** — assim o desligado perde o acesso ao próprio perfil, mas o ativo mantém.

### Grupo Líder (escopo: liderados diretos)

- Verificar o que o líder pode **visualizar e preencher dos liderados diretos**. Define toda a camada de gestão intermediária.
- A liderança vem do campo **Líder Direto** no perfil de cada colaborador — não do líder da Área (são campos independentes, sem sincronização).

### Grupo Público (escopo: todos da empresa)

- Controla o que qualquer usuário vê **das demais pessoas** da conta.
- **Cenário-chave — "colaborador não vê colaborador":** restringir **todos os status** no grupo Público. Como o Público se refere sempre a terceiros, pode ficar totalmente bloqueado sem efeito colateral.
- **Não tentar resolver via permissão de campo** — a aba **Resumo** do perfil é nativamente pública e não obedece às permissões de campo. Editar permissões de campos do Resumo no grupo Público **não tem efeito** e não gera aviso na interface.

> Lógica a gravar: **Público bloqueado = isolamento entre pessoas; Colaborador liberado nos status ativos = a pessoa enxerga a si mesma.** Eixos diferentes, não conflitam.

---

## Grupos customizados

- Úteis para consultores externos (escopo personalizado com pessoas selecionadas manualmente) e perfis intermediários.
- **Escopo personalizado não se atualiza sozinho** — novas pessoas precisam ser adicionadas manualmente ao grupo.
- ⚠️ Pela natureza **cumulativa** das permissões, um grupo mal configurado pode conceder acesso indevido a módulos sensíveis (Configurações, Folha de Pagamento). Revisar o conjunto de grupos de cada usuário, não um grupo isolado.

---

## Limitações a conhecer

- **Sem restrição por empresa/filial dentro de uma conta.** Isolamento real de acesso = contas separadas (decisão de arquitetura na implantação).
- **Administrador** não cria/exclui Proprietários; **Proprietário** é o único que pode, e o sistema impede excluir o último Proprietário.
- **Aba Resumo:** nome, cargo e líder direto são entidades básicas e não ocultáveis; nível do cargo, contatos, curiosidades e talentos também aparecem hoje por limitação conhecida — não é bug.

---

## Diagnóstico de problemas de acesso

1. Listar **todos os grupos** do usuário e somar as permissões — a maioria dos "bugs" de acesso é acúmulo de permissões.
2. Verificar o **vínculo** do colaborador-alvo — campo fora do vínculo não aparece para ninguém.
3. Se o dado aparece "indevidamente" na aba Resumo, ver a limitação acima antes de reportar.
4. Verificar se o usuário está **vinculado a uma pessoa** — regras do grupo Colaborador não se aplicam a usuários sem vínculo.
