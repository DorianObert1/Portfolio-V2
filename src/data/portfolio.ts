export type ColorKey = 'indigo' | 'cyan' | 'violet'

export interface Experience {
  id: string
  company: string
  role: string
  type: string
  period: string
  location: string
  description: string
  highlights: string[]
  stack: string[]
  color: ColorKey
}

export interface ProjectImage {
  label: string
  src?: string
  gradientFrom: string
  gradientVia: string
  gradientTo: string
  mockupType: 'landing' | 'catalog' | 'dashboard' | 'gallery' | 'collection'
}

export interface Project {
  id: string
  name: string
  tagline: string
  description: string
  url: string
  stack: string[]
  highlights: string[]
  type: 'Projet Client' | 'Projet Personnel'
  images: ProjectImage[]
  accentColor: string
}

export interface SkillGroup {
  category: string
  icon: string
  items: string[]
}

export interface Education {
  degree: string
  school: string
  period: string
  description: string
  badge: 'En cours' | 'Diplômé'
}

export interface Stat {
  value: string
  label: string
  description: string
}

export const portfolioData = {
  personal: {
    name: 'Dorian Obert',
    title: 'Développeur Fullstack & Ingénieur DevOps',
    animatedRoles: ['Ingénieur DevOps', 'Architecte Systèmes', 'Entrepreneur', 'Problem Solver'],
    tagline: 'Construire des logiciels de production pour des entreprises de premier plan.',
    bio: [
      "Développeur fullstack & DevOps de 22 ans avec 4+ ans d'expérience dans des environnements industriels exigeants.",
      "Chez Alstom, j'ai développé des simulateurs en temps réel pour valider les systèmes embarqués du train Eurotunnel — au sein d'une équipe de 9 ingénieurs logiciel sur une infrastructure critique.",
      "Chez Vallourec, je développe des plateformes B2B mondiales au service de 200+ licenciés dans le secteur Oil & Gas, de l'ajout de features à l'architecture microservices.",
      "En parallèle, j'ai fondé DO Development pour livrer des solutions numériques sur-mesure à de vrais clients — de la conception à la mise en production.",
    ],
    location: 'Lille, France',
    email: 'dorian.obert@icloud.com',
    linkedin: 'https://linkedin.com/in/dorian-obert',
    github: 'https://github.com/dorianobert',
    website: 'https://dorianobert.fr',
    availability: 'Disponible · CDI Fullstack / DevOps · Octobre 2026',
    cvUrl: '/CV_Dorian_Obert_Final.pdf',
  },

  stats: [
    {
      value: '4+',
      label: "Ans d'expérience",
      description: "En alternance dans de grands groupes industriels",
    },
    {
      value: '2',
      label: 'Grands Comptes',
      description: 'Alstom & Vallourec — environnements de classe mondiale',
    },
    {
      value: '200+',
      label: 'Utilisateurs mondiaux',
      description: "Servis par les plateformes que je développe",
    },
    {
      value: '3+',
      label: 'Projets en prod',
      description: "Applications livrées pour de vrais clients",
    },
  ] as Stat[],

  experiences: [
    {
      id: 'vallourec',
      company: 'Vallourec',
      role: 'Développeur Fullstack — Alternant',
      type: 'Alternance — Mastère',
      period: 'Sept. 2024 — Présent',
      location: 'Famars (59)',
      description:
        "Contribution au développement de deux plateformes web B2B mondiales dans le secteur Oil & Gas, utilisées par 200+ licenciés à travers le monde.",
      highlights: [
        "VAM Services — ajout de fonctionnalités et correctifs sur un outil de référence technique (configurateur de connexions, calculateur de couple, documentation)",
        "MyVAM — nouvelles features sur une architecture microservices à 6 services : royalties, utilisateurs, documentation...",
        "Drive 2.0 — script Python développé seul intégrant l'API VAM Services à Daxium via mapping automatisé, orchestré quotidiennement par Apache Airflow",
        "Pipelines GitLab CI/CD, SonarQube & Snyk pour la qualité et la sécurité du code",
        "Méthode Agile : sprints, daily stand-ups, backlog refinement, scrum poker, revues de sprint",
      ],
      stack: ['React', 'Angular', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Auth0', 'Keycloak', 'Python', 'Apache Airflow'],
      color: 'indigo',
    },
    {
      id: 'alstom',
      company: 'Alstom',
      role: 'Développeur Logiciel — Alternant',
      type: 'Alternance — BUT Informatique',
      period: 'Sept. 2022 — Août 2024',
      location: 'Crespin (59)',
      description:
        "Intégré à une équipe de 9 ingénieurs logiciel. Développement de simulateurs et d'outils de test pour valider les systèmes embarqués du train avant déploiement réel — projet rénovation Eurotunnel.",
      highlights: [
        "Simulateur global des états du train — visualisation temps réel des signaux électriques connecté aux baies de simulation physiques",
        "Simulateur du Pupitre Chef de Train — reproduction fidèle de l'interface de contrôle pour la formation du personnel",
        "Outil de gestion multi-baies — pilotage centralisé à distance via machines virtuelles, déployé à toute l'équipe",
        "Simulateur de lignes de train — modes manuel, semi-auto et automatique + script Python de génération depuis Excel",
        "Simulateur SIV — validation des écrans et annonces sonores du Système d'Information Voyageur embarqué",
      ],
      stack: ['C#', 'Python', 'VBA', 'MTF', 'RTSIM', 'BT TCMSTestbench'],
      color: 'cyan',
    },
    {
      id: 'do-development',
      company: 'DO Development',
      role: 'Fondateur & Développeur Fullstack',
      type: 'Freelance — Micro-entreprise',
      period: 'Oct. 2025 — Présent',
      location: 'Remote',
      description:
        "Mon propre studio digital en parallèle du Mastère. Développement d'applications web et mobiles sur-mesure pour des clients locaux, gestion complète du cycle de livraison.",
      highlights: [
        "Développement d'applications web et mobiles sur-mesure pour des clients locaux",
        "Ownership total : UX/UI, développement, déploiement et suivi post-lancement",
      ],
      stack: ['React', 'TypeScript', 'Node.js', 'Docker', 'PostgreSQL', 'GitLab CI/CD'],
      color: 'violet',
    },
  ] as Experience[],

  skills: [
    {
      category: 'Frontend',
      icon: 'Monitor',
      items: ['React', 'Angular', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML/CSS', 'Framer Motion'],
    },
    {
      category: 'Backend',
      icon: 'Server',
      items: ['Node.js', 'Express.js', 'Fastify', 'FastAPI', 'PHP'],
    },
    {
      category: 'DevOps & Cloud',
      icon: 'Cloud',
      items: ['Docker', 'GitLab CI', 'GitHub Actions', 'Nginx', 'Caddy', 'SonarQube', 'Snyk', 'Apache Airflow', 'Kubernetes'],
    },
    {
      category: 'Databases',
      icon: 'Database',
      items: ['PostgreSQL', 'MySQL', 'MariaDB', 'MongoDB', 'Prisma ORM'],
    },
    {
      category: 'Langages',
      icon: 'Code2',
      items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'C#', 'C/C++', 'PHP', 'Dart', 'SQL'],
    },
    {
      category: 'Outils & Méthodes',
      icon: 'Wrench',
      items: ['Git / GitFlow', 'Postman', 'JetBrains Suite', 'VS Code', 'Vitest', 'Selenium', 'Agile / Scrum'],
    },
  ] as SkillGroup[],

  projects: [
    {
      id: 'dezo-concept',
      name: 'Dezo Concept',
      tagline: 'Plateforme de location événementielle',
      description:
        "Plateforme web B2C complète pour une entreprise de location événementielle. Catalogue de matériel, composition de panier, génération de devis PDF, tableau de bord admin avec statistiques et gestion des réalisations.",
      url: 'https://dezoconcept.fr',
      stack: ['React 19', 'TypeScript', 'Vite', 'Zustand', 'Tailwind', 'Framer Motion', 'Express.js', 'Prisma', 'PostgreSQL', 'JWT', 'Nodemailer', 'Docker', 'GitLab CI/CD'],
      highlights: ['Génération automatique de devis PDF', 'Dashboard admin avec statistiques', 'Déploiement Dockerisé CI/CD'],
      type: 'Projet Client',
      accentColor: '#6366f1',
      images: [
        { label: 'Accueil', src: '/images/projects/dezo-concept-homepage.png', gradientFrom: '#1e1b4b', gradientVia: '#2e1065', gradientTo: '#09090b', mockupType: 'landing' },
        { label: 'Catalogue', src: '/images/projects/dezo-concept-catalogue.png', gradientFrom: '#2e1065', gradientVia: '#1e1b4b', gradientTo: '#0c0a1a', mockupType: 'catalog' },
        { label: 'Dashboard admin', src: '/images/projects/dezo-concept-admin.png', gradientFrom: '#09090b', gradientVia: '#1e1b4b', gradientTo: '#2e1065', mockupType: 'dashboard' },
        { label: 'Réalisations', src: '/images/projects/dezo-concept-realisations.png', gradientFrom: '#1e1b4b', gradientVia: '#09090b', gradientTo: '#2e1065', mockupType: 'gallery' },
      ],
    },
    {
      id: 'artfulls-bike',
      name: "Artfull's Bike",
      tagline: 'Studio de restauration moto',
      description:
        "Site professionnel pour un atelier de restauration moto. Galerie de réalisations, formulaire de demande de devis et panneau admin. Architecture Docker multi-environnements avec CI/CD GitLab automatisé et accès VPN sécurisé au VPS.",
      url: 'https://artfullsbike.fr',
      stack: ['React 18', 'Express.js', 'Prisma', 'PostgreSQL', 'JWT', 'Docker', 'Nginx', 'Caddy', 'Tailscale', 'GitLab CI/CD'],
      highlights: ['Déploiement VPS sécurisé par VPN', 'Architecture Docker multi-environnements', 'CI/CD GitLab automatisé'],
      type: 'Projet Client',
      accentColor: '#f59e0b',
      images: [
        { label: 'Accueil', src: '/images/projects/artfulls-bike-homepage.png', gradientFrom: '#431407', gradientVia: '#7c2d12', gradientTo: '#09090b', mockupType: 'landing' },
        { label: 'Atelier', src: '/images/projects/artfulls-bike-atelier.png', gradientFrom: '#78350f', gradientVia: '#431407', gradientTo: '#0c0a09', mockupType: 'gallery' },
        { label: 'Contact', src: '/images/projects/artfulls-bike-contact.png', gradientFrom: '#09090b', gradientVia: '#431407', gradientTo: '#78350f', mockupType: 'dashboard' },
      ],
    },
    {
      id: 'fh6-collection',
      name: 'FH6 Collection',
      tagline: 'Gestionnaire de collection automobiles',
      description:
        "Application web fullstack pour gérer une collection de voitures Forza Horizon 6. Auth JWT via cookie httpOnly, synchronisation automatique par scraping de forza.net, scheduler cron et panneau d'administration.",
      url: 'https://fh6collection.com',
      stack: ['React 18', 'TypeScript', 'Vite', 'Zustand', 'Tailwind', 'Node.js', 'Fastify', 'Prisma', 'PostgreSQL', 'Docker'],
      highlights: ['Synchronisation auto par web scraping', 'Authentification JWT httpOnly', 'Scheduler cron intégré'],
      type: 'Projet Personnel',
      accentColor: '#06b6d4',
      images: [
        { label: 'Collection', src: '/images/projects/fh6-collection-homepage.png', gradientFrom: '#082f49', gradientVia: '#0c4a6e', gradientTo: '#09090b', mockupType: 'collection' },
        { label: 'Catalogue', src: '/images/projects/fh6-collection-catalogue.png', gradientFrom: '#0c4a6e', gradientVia: '#1e3a5f', gradientTo: '#0f172a', mockupType: 'catalog' },
        { label: 'Admin', src: '/images/projects/fh6-collection-admin.png', gradientFrom: '#09090b', gradientVia: '#0e7490', gradientTo: '#082f49', mockupType: 'dashboard' },
      ],
    },
  ] as Project[],

  education: [
    {
      degree: 'Expert en Développement FullStack — Bac+5',
      school: 'Ynov Campus Lille',
      period: '2024 — 2026',
      description: "Titre RNCP Niveau 7. Programme expert fullstack alliant architecture avancée, DevOps et gestion de projet. Diplôme prévu octobre 2026.",
      badge: 'En cours',
    },
    {
      degree: 'BUT Informatique — Bac+3',
      school: 'Université Polytechnique Hauts-de-France',
      period: '2021 — 2024',
      description: "Spécialité développement logiciel. Formation en alternance dès la 2ème année, combinant apprentissage académique et expérience chez Alstom.",
      badge: 'Diplômé',
    },
    {
      degree: 'Baccalauréat Général',
      school: 'Lycée des Nerviens',
      period: '2018 — 2021',
      description: "Spécialités Mathématiques & NSI (Numérique et Sciences de l'Informatique). Solide base analytique et informatique.",
      badge: 'Diplômé',
    },
  ] as Education[],
}
