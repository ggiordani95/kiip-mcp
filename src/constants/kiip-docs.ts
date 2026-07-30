export const KIIP_MODULE_SLUGS = [
  'diretorio',
  'entidades',
  'usuarios-e-acessos',
  'ferias',
  'ponto',
  'admissoes',
  'processos',
  'documentos',
  'folha',
  'relatorios',
  'downloads',
  'lembretes',
] as const;

export const KIIP_PLAYBOOK_SLUGS = [
  'implantacao',
  'ativacao-ponto',
  'regularizacao-ferias',
  'atualizacao-em-massa',
  'grupos-de-acesso',
  'relatorios-rh',
] as const;

export type KiipModuleSlug = (typeof KIIP_MODULE_SLUGS)[number];
export type KiipPlaybookSlug = (typeof KIIP_PLAYBOOK_SLUGS)[number];

export const KIIP_INSTRUCTIONS = `A Kiip é uma plataforma SaaS de Departamento Pessoal que digitaliza os processos de gestão de pessoas do onboarding ao desligamento, com foco nos processos que impactam a folha de pagamento. Suporta colaboradores de múltiplos vínculos (CLT, PJ, RPA e outros) e múltiplas empresas (CNPJs) em uma mesma conta.

Antes de orientar o usuário ou executar tarefas sobre um módulo, chame o tool de documentação correspondente. Não presuma comportamento do sistema — a documentação é a fonte de verdade.

Módulos (chame get_module_docs com o slug):
- ${KIIP_MODULE_SLUGS.join(', ')}

Playbooks operacionais (chame get_playbook com o slug):
- ${KIIP_PLAYBOOK_SLUGS.join(', ')}

Para gerar qualquer relatório ou análise de RH, consulte sempre o playbook "relatorios-rh" antes.

Limites de escopo: a Kiip não processa folha (INSS/IRRF ficam com a contabilidade). A Kiip não é consultoria jurídica — para casos trabalhistas limítrofes, oriente o usuário a consultar a contabilidade ou um advogado trabalhista.`;
