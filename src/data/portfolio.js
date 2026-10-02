export const projects = [
  {
    id: "progress-tracker",
    category: "Web Design",
    title: "Progress Tracker EDN",
    image: "/img/progress-tracker.png",
    imageAlt: "Progress Tracker App",
    modalTitle: "Progress Tracker - Escola da Nuvem (EDN)",
    description:
      "Aplicação web para acompanhar o progresso de alunos nos Labs, Knowledge Checks e Competências Profissionais da formação em cloud na AWS. O projeto centraliza essas informações de forma visual e objetiva, facilitando a identificação do que já foi concluído e do que ainda precisa avançar. Desenvolvido como projeto pessoal, utilizando CloudFront, CodePipeline e Route 53, com foco em usabilidade, automação e boas práticas de arquitetura cloud.",
    links: [
      {
        label: "Ver projeto",
        href: "https://progresso.yagowalter.com.br",
        icon: "ri-external-link-line",
      },
      {
        label: "GitHub",
        href: "https://github.com/yagowalter/AWS-Projects/tree/main/aws-progress-tracker",
        icon: "ri-github-fill",
      },
    ],
  },
  {
    id: "portfolio",
    category: "Web Design",
    title: "Portfólio Pessoal",
    image: "/img/portfólio.png",
    imageAlt: "Prévia do portfólio pessoal",
    modalTitle: "Portfólio Pessoal com Deploy Automatizado na AWS",
    description:
      "Portfólio desenvolvido para apresentar meus projetos, experiências e certificações, com foco em infraestrutura em nuvem e automação. O site utiliza AWS CloudFront para distribuição, CodePipeline para deploy automatizado, Route 53 para domínio e CloudFormation para infraestrutura como código.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/yagowalter/AWS-Projects/tree/main/aws-progress-tracker",
        icon: "ri-github-fill",
      },
    ],
  },
  {
    id: "aws-projects",
    category: "Repositório",
    title: "AWS Projects",
    image: "/img/repo.png",
    imageAlt: "Repositório AWS Projects",
    modalTitle: "AWS Projects",
    description:
      "Repositório com labs práticos e projetos pessoais desenvolvidos durante meus estudos em desenvolvimento e cloud computing. Utilizado como ambiente de experimentação para aplicação de conceitos de AWS, automação, Git/GitHub e boas práticas de código.",
    links: [
      {
        label: "Ver projeto",
        href: "https://github.com/yagowalter/AWS-Projects/tree/main",
        icon: "ri-external-link-line",
      },
    ],
  },
];

export const experience = [
  {
    date: "2020 - 2021",
    title: "Estágio em Suporte",
    company: "Softcom Tecnologia",
    icon: "fas fa-headset",
    items: [
      "Atendimento técnico e resolução de incidentes.",
      "Suporte remoto a sistemas e equipamentos (AnyDesk).",
      "Troubleshooting e contato direto com usuários.",
      "Atendimento simultâneo de até 3 clientes.",
    ],
  },
  {
    date: "2022",
    title: "Desenvolvedor Flutter",
    company: "Fábrica de Software - UNIPÊ",
    icon: "fab fa-google-play",
    items: [
      "Desenvolvimento de interfaces e componentes em Flutter.",
      "Implementação e manutenção de funcionalidades em equipe.",
      "Ajustes de UI/UX com foco em usabilidade.",
      "Integração com funcionalidades existentes do projeto.",
    ],
  },
  {
    date: "2022-2023",
    title: "Estágio em Suporte Técnico",
    company: "HostBits",
    icon: "fas fa-server",
    items: [
      "Atendimento técnico e resolução de incidentes.",
      "Suporte a ambientes web em produção.",
      "Contato direto com clientes e troubleshooting.",
      "Vivência com sistemas reais e ambientes online.",
    ],
  },
  {
    date: "Atualmente",
    title: "Analista em Engenharia de Sistemas Jr.",
    company: "NTT DATA",
    icon: "fas fa-code",
    items: [
      "Desenvolvimento e manutenção de ecossistemas back-end utilizando Java.",
      "Modelagem, manipulação e integração com bancos de dados relacionais e não-relacionais.",
      "Atuação em soluções de infraestrutura e serviços em nuvem (Microsoft Azure).",
    ],
  },
];

export const stacks = [
  {
    title: "Web Development & Software Engineering",
    icon: "ri-pencil-ruler-2-fill",
    subtitle: "Performance - Usabilidade - Escalabilidade",
    heading: "O que eu desenvolvo",
    items: [
      "Aplicações Web reativas e responsivas",
      "APIs RESTful e microserviços em Java (Spring Boot)",
      "Arquitetura e integração com Bancos de Dados",
      "Interfaces focadas em UI/UX, acessibilidade e performance",
      "Código organizado e versionado",
    ],
  },
  {
    title: "Technical Support & Infrastructure",
    icon: "ri-customer-service-fill",
    subtitle: "Incidentes - Atendimento - Documentação",
    heading: "Principais atividades",
    items: [
      "Atendimento multicanal (telefone, WhatsApp e e-mail)",
      "Suporte remoto com AnyDesk",
      "Administração básica de cPanel",
      "Resolução de incidentes e chamados",
      "Documentação e suporte ao usuário",
      "Treinamento de clientes",
    ],
  },
  {
    title: "Cloud Computing & AWS",
    icon: "ri-cloud-fill",
    subtitle: "Deploy - Infra - Automação",
    heading: "O que estou aplicando na prática",
    items: [
      "Hospedagem de sites estáticos utilizando Amazon S3 + CloudFront",
      "Provisionamento de infraestrutura como código com AWS CloudFormation",
      "Automação de deploys com AWS CodePipeline integrado ao GitHub",
      "Gerenciamento de domínios e DNS com Amazon Route 53",
      "Conceitos de arquitetura em nuvem: escalabilidade, disponibilidade e custo",
    ],
  },
];

export const certificates = [
  {
    title: "Bacharelado em Ciência da Computação",
    school: "Unipê",
    date: "2019 - 2023",
    icon: "fas fa-graduation-cap",
    link: "/pdf/diploma.pdf",
    linkLabel: "Ver Diploma",
    className: "cert-card--grad-unified",
  },
  {
    title: "AWS Certified Cloud Practitioner (CLF-C02)",
    school: "Amazon Web Services",
    date: "MAR - 2026",
    image: "/img/clfc02.png",
    imageAlt: "AWS Cloud Practitioner",
    link: "https://www.credly.com/badges/a52c7f2b-809e-417c-8e23-15e8c1c90173/public_url",
    linkLabel: "Ver no Credly",
    highlight: true,
  },
  {
    title: "AWS Knowledge",
    school: "Amazon Web Services",
    date: "MAR - 2026",
    image: "/img/aws-knowledge-cloud-essentials-training-badge.png",
    imageAlt: "AWS Knowledge: Cloud Essentials Badge",
    link: "https://www.credly.com/badges/4a71a091-04cb-4027-a018-e66e87892f1b/public_url",
    linkLabel: "Ver no Credly",
  },
  {
    title: "AWS re/Start Graduate",
    school: "Escola da Nuvem",
    date: "FEV - 2026",
    image: "/img/aws-re-start-graduate.png",
    imageAlt: "AWS re/Start Graduate Badge",
    link: "https://www.credly.com/badges/27ed3e9c-df2c-4941-a95a-c5cff4ccefce/public_url",
    linkLabel: "Ver no Credly",
  },
];
