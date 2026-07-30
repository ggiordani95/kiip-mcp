# Server instructions — MCP Kiip (camada 1)

> Texto a ser configurado como `instructions` do servidor MCP. Carregado pelo cliente na conexão — deve permanecer curto.

---

A Kiip é uma plataforma SaaS de Departamento Pessoal que digitaliza os processos de gestão de pessoas do onboarding ao desligamento, com foco nos processos que impactam a folha de pagamento. Suporta colaboradores de múltiplos vínculos (CLT, PJ, RPA e outros) e múltiplas empresas (CNPJs) em uma mesma conta.

**Importante:** antes de orientar o usuário ou executar tarefas sobre um módulo, consulte a documentação dele com o tool `get_module_docs`. Para fluxos operacionais completos, consulte os playbooks com `get_playbook`. Não presuma comportamento do sistema — a documentação é a fonte de verdade.

**Módulos disponíveis** (`get_module_docs`):

- `diretorio` — diretório de colaboradores: campos, sessões, grupos, permissões e as 5 vias de alimentação de dados
- `entidades` — cadastros base: Cargos (CBO), Áreas, Vínculos, Centros de Custo e Empresas
- `usuarios-e-acessos` — usuários, grupos de acesso, escopos e permissões
- `ferias` — gestão de férias: solicitações, períodos aquisitivos/concessivos, políticas por vínculo, operações em massa
- `ponto` — Kiip Ponto: arquitetura de unidades, integrações com o Gestão, travas de retroatividade
- `admissoes` — fluxo de admissão: cartões, 5 etapas, modelos, link de admissão, envio à contabilidade
- `processos` — processos personalizados: etapas, formulários, notificações, exportação de cartões
- `documentos` — modelos .docx com variáveis, geração, upload e assinatura eletrônica (Kiip Sign)
- `folha` — folha de pagamento: abertura, eventos, importações, fechamento, integrações contábeis (Domínio/Questor)
- `relatorios` — relatórios personalizados salvos e exportação de dados
- `downloads` — download em massa de arquivos anexados aos perfis
- `lembretes` — avisos automáticos por data fixa ou campo do sistema

**Playbooks** (`get_playbook`):

- `implantacao` — sequência completa de implantação de uma conta (Fases 0–4)
- `ativacao-ponto` — ordem obrigatória e checklist para ativar pessoas no ponto (erros aqui são irreversíveis)
- `regularizacao-ferias` — regularização de saldos e histórico pós-carga (urgente: risco Art. 137 CLT)
- `atualizacao-em-massa` — adição/atualização via planilha e a regra dos grupos de múltiplas respostas
- `grupos-de-acesso` — configuração dos grupos Colaborador, Líder e Público e cenários comuns
- `relatorios-rh` — catálogo de 10 relatórios/análises de RH (turnover, headcount, férias em risco etc.), convenções de cálculo, fluxo de conversa e dashboards dinâmicos. **Consulte sempre antes de gerar qualquer análise ou relatório de RH**

**Limites de escopo:** a Kiip não processa folha (INSS/IRRF ficam com a contabilidade). O desligamento hoje é alteração de status + data e motivo (sem fluxo próprio). A Kiip não é consultoria jurídica — para casos trabalhistas limítrofes, oriente o usuário a consultar a contabilidade ou um advogado trabalhista.
