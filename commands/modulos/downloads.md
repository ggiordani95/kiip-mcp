# Downloads

Base de conhecimento sobre o módulo de Downloads: download em massa de arquivos anexados aos perfis dos colaboradores.

---

## O que é o módulo de Downloads

O módulo de Downloads permite exportar em lote os arquivos anexados nos campos do diretório de colaboradores e os documentos vinculados ao módulo de Kiip Ponto. É usado quando o RH precisa baixar documentos pessoais, contratos ou comprovantes de múltiplos colaboradores de uma vez, sem precisar acessar perfil por perfil.

Acessado pelo menu **Downloads** na navegação lateral (`app.kiip.team/downloads`).

---

## Tela principal — listagem de downloads

Exibe todos os pacotes de download solicitados na conta. Cada linha representa uma solicitação.

### Colunas da listagem

| Coluna | Descrição |
|---|---|
| Nome | Nome do pacote (editável via ícone de lápis) |
| Solicitado por | Usuário que iniciou a solicitação |
| Solicitado em | Data e hora da solicitação |
| Pessoas | Quantidade de colaboradores incluídos |
| Arquivos | Quantidade de arquivos no pacote |
| Categorias | Categorias de arquivo incluídas |
| Status | Estado atual do pacote |
| Ações | Botão de download ou reprocessamento |

### Status de pacote

| Status | Descrição |
|---|---|
| **Pronto para baixar** | Pacote processado e disponível para download |
| **Processando** | Pacote em geração |
| **Com erro** | Falha no processamento |
| **Indisponível** | Pacote expirado ou removido — pode ser solicitado novamente |

### Ações disponíveis na listagem

- **Novo download** — inicia o fluxo de criação
- **Solicitar novamente** — reprocessa um pacote indisponível ou com erro
- **Ações em massa** — permite atualizar ou excluir múltiplos pacotes selecionados
- Ícone de lápis — renomeia o pacote

---

## Fluxo de criação — Download de arquivos em massa

Modal **Download de arquivos em massa**. Fluxo em 4 etapas:

### Etapa 1 — Pessoas

Lista todos os colaboradores cadastrados na conta. Colunas exibidas: Nome completo, Data de admissão.

- Seleção individual por checkbox ou seleção global pelo checkbox do cabeçalho
- Filtros e busca disponíveis para refinar a lista
- O rodapé exibe o resumo da seleção: quantidade de pessoas, categorias e tipos de arquivo

### Etapa 2 — Categorias

Define quais categorias de arquivo serão incluídas no pacote. Duas categorias disponíveis:

| Categoria | Descrição |
|---|---|
| **Campos do sistema** | Arquivos anexados em campos do tipo Anexo no diretório de colaboradores |
| **Ponto** | Justificativas de abono originadas no Kiip Ponto |

Cada categoria pode ser selecionada ou desmarcada independentemente.

### Etapa 3 — Arquivos

Lista os tipos de arquivo disponíveis dentro das categorias selecionadas. Cada categoria tem seu próprio bloco com botão **Selecionar todos**.

**Campos do sistema** — exibe todos os campos do tipo Anexo cadastrados na conta da empresa. A lista varia por empresa — cada conta tem seus próprios campos de anexo configurados no diretório. Os itens exibidos correspondem diretamente aos grupos e campos do tipo Anexo existentes em **Configurações > Campos do Sistema**.

**Ponto** — tipos de arquivo disponíveis:

| Tipo | Descrição |
|---|---|
| Anexos de abonos | Justificativas de abono enviadas no Kiip Ponto |

> Outros tipos de documento do Kiip Ponto (ex: espelho de ponto) ainda não estão disponíveis neste módulo — limitação conhecida, prevista para desenvolvimento futuro.

### Etapa 4 — Opções

Configurações finais do pacote:

**Nome personalizado do arquivo** — opcional; define o nome do pacote gerado. Se não preenchido, o sistema gera um nome automático com base na data da solicitação.

**Faixa de data** — opcional; filtra os arquivos pelo período em que foram anexados (data inicial e data final).

**Estrutura de saída** — define como os arquivos serão organizados no pacote:

| Opção | Comportamento |
|---|---|
| **Pastas separadas** | Os arquivos são organizados em pastas por pessoa e por categoria |
| **Pasta única** | Todos os arquivos em uma única pasta compactada |

Botão final: **Iniciar download** — o sistema processa o pacote e ele aparece na listagem com status **Processando**, evoluindo para **Pronto para baixar** quando concluído.

---

## Corner cases e pontos de atenção

- **Pacotes indisponíveis** podem ser reprocessados via "Solicitar novamente" — o sistema remonta o pacote com os dados atuais dos colaboradores no momento da nova solicitação.
- **Campos customizados de anexo** aparecem automaticamente na etapa de Arquivos conforme forem criados no diretório — não requerem configuração adicional no módulo de Downloads.
- **Faixa de data** filtra pela data de upload do arquivo, não pela data de referência do documento — atenção ao usar para documentos retroativos.
- **Estrutura de saída "Pastas separadas"** é a opção recomendada para volumes grandes, pois facilita a localização dos arquivos por colaborador após o download.
- **Documentos gerados pelo módulo de Documentos** (contratos assinados, fichas etc.) não estão disponíveis para download em massa neste módulo — essa categoria ainda não foi desenvolvida. Para baixar esses documentos, o caminho é acessá-los individualmente pela Gestão de Documentos.
