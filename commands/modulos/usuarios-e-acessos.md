# Gestão de Usuários e Grupos de Acesso

Base de conhecimento sobre criação de usuários, grupos de acesso, permissões e controle de acesso ao sistema.

---

## Onde fica

**Configurações > Gestão de Usuários**

Duas abas:
- **Usuários** — lista de todos os usuários com acesso à conta
- **Grupos de Acesso** — configuração de perfis de permissão

---

## Pessoas vs. Usuários — distinção fundamental

| Conceito | Descrição |
|---|---|
| **Pessoa** | Colaborador cadastrado no diretório. Não implica acesso ao sistema. |
| **Usuário** | Conta com e-mail e senha que permite acesso ao sistema. Pode ou não estar vinculada a uma pessoa. |

Quando uma pessoa recebe acesso de usuário, é automaticamente alocada nos grupos **Colaborador** e **Público** — e no grupo **Líder** caso exerça liderança direta sobre outra pessoa.

---

## E-mail de acesso

O e-mail de acesso de um usuário vinculado a uma pessoa é sempre o **e-mail principal** do perfil dessa pessoa no diretório.

- Cada colaborador tem dois campos: **E-mail principal** e **E-mail secundário**
- Apenas o e-mail principal determina o acesso ao sistema
- Se o e-mail principal for editado no diretório, o e-mail de acesso do usuário é atualizado automaticamente
- Para usuários não vinculados a uma pessoa, o e-mail é definido manualmente na criação

---

## Fluxos de criação de usuário

### 1. Durante o fluxo de adição de pessoa

Ao adicionar uma pessoa — pelo botão individual, pela planilha de adição em massa, ou pela atualização em massa — é possível ao final escolher também criar um usuário.

Resultado:
- Usuário vinculado ao perfil da pessoa
- E-mail de acesso = e-mail principal da pessoa
- Inserido automaticamente nos grupos **Colaborador** e **Público**
- Grupo **Líder** também sugerido se a pessoa exercer liderança direta sobre alguém no sistema

### 2. Manualmente via Configurações > Gestão de Usuários

Botão **Novo usuário**. Primeira decisão: vincular ou não a uma pessoa.

**Usuário não vinculado a pessoa:**
- Admin preenche e-mail manualmente
- Define os grupos de acesso
- Usado para admins puros, consultores externos e perfis sem colaborador associado

**Usuário vinculado a pessoa:**
- Admin seleciona a pessoa na lista
- Sistema exibe automaticamente o e-mail principal como e-mail de acesso (não editável aqui — alteração ocorre no diretório)
- Sistema sugere automaticamente os grupos **Colaborador**, **Público** e **Líder** (se aplicável)
- Admin pode adicionar outros grupos conforme necessário

---

## Grupos de acesso — conceito base

Cada grupo define **o que** um usuário pode ver e editar, e **sobre quem** essas permissões se aplicam.

### Escopo do grupo

| Escopo | Descrição |
|---|---|
| **Próprio colaborador** | Permissões sobre os próprios dados do usuário |
| **Todos da empresa** | Permissões sobre todos os colaboradores da conta |
| **Liderados diretos** | Permissões sobre os liderados diretos do usuário |
| **Personalizado** | Admin seleciona manualmente as pessoas do escopo |

### Permissões são cumulativas

Se um usuário pertence a múltiplos grupos, **todas as permissões se somam**. Uma permissão concedida em qualquer grupo prevalece — não há anulação entre grupos.

> ⚠️ Isso requer atenção ao criar grupos customizados — uma configuração inadvertida pode conceder acesso a áreas sensíveis como Configurações e Folha de Pagamento.

---

## Grupos padrão do sistema

### Público
- **Escopo:** todos da empresa
- **Alocação:** automática para todo usuário do sistema
- Define o que qualquer usuário vê sobre qualquer pessoa da empresa
- Base de permissão mínima da conta

### Colaborador
- **Escopo:** próprio colaborador
- **Alocação:** automática para todo usuário vinculado a uma pessoa
- Define o que o colaborador vê e edita sobre si mesmo
- Não afeta usuários sem vínculo a pessoa (admin puro)

### Líder
- **Escopo:** liderados diretos
- **Alocação:** sugerida automaticamente quando a pessoa exerce liderança direta no sistema
- A liderança é definida pelo campo "Líder Direto" no perfil de cada colaborador

### Administrador
- **Escopo:** todos da empresa
- Acesso irrestrito a todas as funcionalidades
- **Limitação:** não pode criar nem excluir usuários Proprietário

### Proprietário
- **Escopo:** todos da empresa
- Acesso irrestrito
- Único que pode criar e excluir outros Proprietários
- **Proteção:** o sistema impede a exclusão do último Proprietário ativo

---

## Grupos customizados

O admin pode criar grupos com qualquer nome e escopo.

**Quando usar:**
- Consultores externos com acesso a pessoas específicas → escopo personalizado
- Perfis intermediários entre Colaborador e Líder
- Restrições específicas por área ou função

**Escopo personalizado:** admin seleciona manualmente as pessoas. Não se atualiza automaticamente — novas pessoas devem ser adicionadas manualmente.

> ⚠️ Grupos mal configurados podem conceder acesso indevido a módulos sensíveis. Restrições granulares por módulo para grupos customizados estão no roadmap.

---

## Como as permissões interagem com os campos do diretório

```
1. Vínculo do colaborador (ex: CLT)
      ↓
2. Permissões do grupo de acesso do usuário logado
      ↓
3. Exibe apenas campos que passam nos dois filtros
```

Se um campo não está associado ao vínculo do colaborador, ele não aparece — independentemente das permissões do grupo.

---

## Restrição por filial

O sistema não permite restringir acessos por entidade dentro de uma mesma conta. **Recomendação oficial:** criar contas separadas por unidade quando necessário isolamento de acesso.

---

## Corner cases e pontos de atenção

- **E-mail de acesso** é sempre o e-mail principal do diretório — editar lá atualiza o acesso automaticamente.
- **Permissões cumulativas:** ao diagnosticar problema de acesso, verificar todos os grupos do usuário e somar as permissões antes de concluir que é bug.
- **Usuário sem vínculo a pessoa:** regras do grupo Colaborador não se aplicam.
- **Último Proprietário:** não pode ser excluído pelo sistema.
- **Grupos customizados com escopo personalizado** não se atualizam automaticamente — novas pessoas devem ser adicionadas manualmente.
- **Sugestão automática de grupos:** o sistema sugere Líder ao vincular usuário a uma pessoa que é líder, mas a inclusão deve ser confirmada pelo admin.
- **Restrição por filial** não é nativa — criar contas separadas.
