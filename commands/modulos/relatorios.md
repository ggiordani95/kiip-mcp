# Relatórios

Base de conhecimento sobre o módulo de Relatórios: criação, configuração, salvamento e exportação de relatórios personalizados.

---

## O que é o módulo de Relatórios

O módulo de Relatórios permite exportar dados do diretório de colaboradores com controle total sobre quais pessoas e quais campos serão incluídos na exportação. Seu diferencial em relação à exportação direta do diretório é a possibilidade de **salvar a configuração** do relatório para reutilização futura.

Acessado pelo menu **Relatórios** na navegação lateral (`app.kiip.team/reports`).

> **Visão de futuro:** o módulo tende a evoluir para de fato gerar relatórios analíticos. Hoje ele funciona essencialmente como uma exportação de dados configurável e reutilizável.

---

## Acesso ao módulo

Apenas usuários com perfil **Administrador** ou **Proprietário** têm acesso ao módulo de Relatórios.

---

## Diferença entre Relatórios e exportação do Diretório

| | Exportação do Diretório | Módulo de Relatórios |
|---|---|---|
| **Onde fica** | Pessoas > Ações em massa > Exportar | Menu lateral > Relatórios |
| **Resultado da exportação** | Idêntico | Idêntico |
| **Salvar configuração** | Não | Sim — nome e descrição |
| **Reutilização** | Não | Sim — relatório salvo reaparece na listagem |

O formato e a lógica de exportação são os mesmos: uma coluna por campo, uma linha por pessoa.

---

## Tela principal — listagem de relatórios

Exibe todos os relatórios salvos da conta em formato de cards. Cada card mostra:
- Nome do relatório
- Descrição (quando preenchida)
- Tag **Personalizado** (todos os relatórios salvos recebem essa tag)

Ações disponíveis na listagem:
- **Buscar** relatórios pelo nome
- **Novo relatório** — inicia o fluxo de criação
- Menu de três pontos em cada card — acesso a editar e excluir

---

## Fluxo de criação — Novo relatório

Acessado pelo botão **Novo relatório**. O fluxo tem 3 etapas:

### Etapa 1 — Selecionar pessoas

- Lista todas as pessoas cadastradas na conta
- Colunas exibidas: Nome completo, Cargo, Área
- Seleção individual por checkbox ou seleção geral pelo checkbox do cabeçalho
- Filtros disponíveis para refinar a lista
- Campo de busca por nome
- O contador no rodapé mostra quantas pessoas estão selecionadas

### Etapa 2 — Selecionar campos

Interface dividida em dois painéis:

**Painel esquerdo — Selecionar campos:**
- Abas por categoria: Pessoal, Profissional, Documentos, Adicionais
- Campos organizados por grupo dentro de cada categoria (ex: "Endereço > Rua, Número, Complemento…")
- Busca de campos por nome
- Botão **Selecionar todos** para marcar todos os campos da categoria ativa

**Painel direito — Campos selecionados:**
- Lista dos campos já escolhidos, com indicação do grupo de origem
- Botão **Limpar** para remover todos
- Botão X individual para remover campo a campo
- Contador de campos selecionados

Ao finalizar a seleção, clicar em **Exportar relatório** dispara a exportação imediata.

### Etapa 3 — Salvar (pós-exportação)

Após a exportação, o sistema pergunta se o usuário deseja salvar o relatório para uso futuro:

- **Nome do relatório\*** — obrigatório
- **Descrição\*** — obrigatório (limite: 78 caracteres)
- **Salvar relatório** — salva e o relatório aparece na listagem
- **Não salvar** — exportação ocorre normalmente sem salvar

---

## Edição de relatório salvo

Ao abrir um relatório salvo, o modal exibe três abas independentes:

| Aba | O que edita |
|---|---|
| **Editar pessoas** | Redefine quais pessoas fazem parte do relatório |
| **Editar campos** | Redefine quais campos serão exportados |
| **Editar detalhes** | Nome e descrição do relatório |

Botões disponíveis no modal de edição:
- **Exportar** — exporta o relatório com a configuração atual sem precisar avançar até o final
- **Próximo** — avança entre as abas
- **Voltar** — retorna à aba anterior
- Ícone de lixeira — exclui o relatório

---

## Comportamento da exportação

O arquivo exportado segue a mesma lógica da exportação do diretório:
- Uma **coluna** por campo selecionado
- Uma **linha** por pessoa

**Comportamento para grupos de múltiplas respostas:**
Quando um campo de grupo de múltiplas respostas é incluído (ex: Cargos e Salários, Formação Acadêmica), todas as entradas históricas da pessoa são exportadas — cada uma em uma linha separada. O nome da pessoa aparece apenas na primeira linha; as linhas seguintes ficam sem o nome, representando as demais entradas do histórico.

---

## Corner cases e pontos de atenção

- **Acesso restrito:** apenas Administradores e Proprietários acessam o módulo. Colaboradores e Líderes não têm acesso.
- **Relatório salvo não atualiza automaticamente:** se novas pessoas forem adicionadas à conta, elas não entram automaticamente nos relatórios salvos — é necessário editar o relatório e incluí-las manualmente na seleção de pessoas.
- **Campos de múltiplas respostas geram múltiplas linhas:** comportamento esperado, não erro na exportação.
- **Descrição obrigatória no salvamento:** campos Nome e Descrição são obrigatórios ao salvar — não é possível salvar sem preencher os dois.
- **Exportar sem salvar é válido:** o usuário pode usar o módulo apenas para exportar pontualmente, sem salvar a configuração.
