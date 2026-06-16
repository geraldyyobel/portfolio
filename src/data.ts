import { Project, Experience, Education, Certification, Testimonial } from './types';

export const geraldyYobelAvatar = 'https://media.licdn.com/dms/image/v2/D5603AQGwZLbJDbib4Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1721152545020?e=2147483647&v=beta&t=AMESTvgcNTpExDK4yJohqWoJa5zxiPcRenaH16QA0rk';

export const personalInfo = {
  name: 'Emeralda Patrisnandari',
  avatar: 'https://media.licdn.com/dms/image/v2/D5603AQGwZLbJDbib4Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1721152545020?e=2147483647&v=beta&t=AMESTvgcNTpExDK4yJohqWoJa5zxiPcRenaH16QA0rk',
  pronouns: 'she/her',
  role: 'Full-Stack Software Engineer',
  location: 'Jakarta, Indonesia',
  shortBio: '5+ years building scalable web and mobile products. Passionate about clean architecture, sound developer tooling, and intuitive user experiences.',
  extendedBio: 'Over the past 5+ years, I\'ve worked across high-velocity Indonesian scaleups and fintech enterprises to orchestrate robust backend microservices and design interactive React applications. I believe software engineering is about solving human-centric business constraints cleanly—writing code that is self-documenting, performant, and resilient to change. I focus on optimizing product iteration cycles, building modular UI systems, and engineering low-latency data pipelines.',
  email: 'geraldyyobel17@gmail.com',
  phone: '+62 851-5671-6324',
  website: 'https://gydev.my.id',
  bookingUrl: 'https://calendly.com/emeralda', // mock booking link
  availability: 'Available for new client projects & technical consulting',
  skills: [
    'JavaScript',
    'React',
    'TypeScript',
    'Node.js',
    'Python',
    'PostgreSQL',
    'Docker',
    'AWS',
    'Git',
    'GraphQL',
    'Next.js',
    'Tailwind CSS',
    'Express',
    'Redis'
  ],
  languages: [
    { name: 'Indonesian', level: 'Native / Bilingual' },
    { name: 'English', level: 'Fluent / Professional' },
    { name: 'Japanese', level: 'Conversational' }
  ],
  socials: [
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/emeralda312312' },
    { platform: 'GitHub', url: 'https://github.com/emeralda312312312' },
    { platform: 'X', url: 'https://x.com/emeralda313123' },
    { platform: 'Instagram', url: 'https://instagram.com/emeralda312312' },
    { platform: 'YouTube', url: 'https://youtube.com/@emeralda4234312' },
    { platform: 'Threads', url: 'https://threads.net/@emeralda3123123' }
  ]
};

export const projects: Project[] = [
  {
    id: 'aether',
    title: 'Aether - Real-time Collaborative Engine',
    period: '2025',
    role: 'Lead Architect & UI developer',
    category: 'SaaS Platform',
    description: 'A rich multiplayer workspace letting users create connected dashboard visuals. Built with Node.js, WebSockets, and Canvas, reducing frame syncing latency under 45ms for groups up to 100.',
    tags: ['React', 'TypeScript', 'Node.js', 'WebSockets', 'Canvas API', 'Redis'],
    githubUrl: 'https://github.com/emeralda/aether-collab',
    liveUrl: 'https://aether.emeralda.dev'
  },
  {
    id: 'nusapay',
    title: 'Nusa Pay - Micro-transaction Gateway',
    period: '2024',
    role: 'Core Engine Designer',
    category: 'Fintech Solution',
    description: 'Designed Indonesia-compliant local QRIS merchant payment aggregator. Built automatic routing systems across virtual accounts, processing over 10,000 requests per minute securely.',
    tags: ['Node.js', 'Express', 'PostgreSQL', 'Docker', 'QRIS API', 'Jest'],
    githubUrl: 'https://github.com/emeralda/nusa-pay',
    liveUrl: 'https://nusapay.id'
  },
  {
    id: 'omnisearch',
    title: 'OmniSearch - Semantic Parse Pipeline',
    period: '2023',
    role: 'Backend & Data Engineer',
    category: 'AI Tooling',
    description: 'A vector-search middleware system capable of ingesting scattered PDF/docx attachments in enterprise workspaces and index them into Pinecone with instant NLP query fallback matching context.',
    tags: ['Python', 'FastAPI', 'Pinecone', 'LangChain', 'AWS Lambda', 'Docker'],
    githubUrl: 'https://github.com/emeralda/omnisearch'
  }
];

export const experiences: Experience[] = [
  {
    id: 'gojek',
    role: 'Senior Full-Stack Engineer',
    company: 'Gojek (GoTo Group)',
    companyLogoUrl: 'GJ',
    period: 'Jan 2024 - Present',
    location: 'Jakarta, Indonesia',
    bullets: [
      'Architected driver dispatch telemetry visualization portal used internally by on-ground fleet managers, reducing query load page-render bottlenecks by 32%.',
      'Engineered React + Tailwind system integrations with internal micro-service backends, managing real-time coordinates of over a million daily active ride dispatches.',
      'Mentored 4 junior web developers, leading code-review processes and establishing rigid ESLint typescript type-casting guidelines.'
    ]
  },
  {
    id: 'traveloka',
    role: 'Full-Stack Web Developer',
    company: 'Traveloka',
    companyLogoUrl: 'TL',
    period: 'Mar 2022 - Dec 2023',
    location: 'Jakarta, Indonesia',
    bullets: [
      'Spearheaded performance optimization project on flight selection search grids, reducing overall load speeds and cumulative layout shifts (CLS) by 23%.',
      'Developed and shipped internal checkout validation widgets using Express and Redis, securing bookings against duplicate billing anomalies.',
      'Active participant in designing clean custom styled checkout forms and custom calendar-booking date components.'
    ]
  },
  {
    id: 'xendit',
    role: 'Associate Software Engineer',
    company: 'Xendit',
    companyLogoUrl: 'XD',
    period: 'Jun 2021 - Feb 2022',
    location: 'Jakarta, Indonesia',
    bullets: [
      'Engineered fault-tolerant transaction callback APIs for third-party e-wallet integrations, maintaining 99.99% service uptime.',
      'Refactored SQL queries, indexes, and database schemas on PostgreSQL cluster, speeding up daily accounting reconciliation exports by over 2x.',
      'Spearheaded developer onboarding kits, slashing environment bootstrap times down from 2 days to under an hour.'
    ]
  }
];

export const educations: Education[] = [
  {
    id: 'ui',
    degree: 'B.S. in Computer Science',
    institution: 'Universitas Indonesia (UI)',
    period: '2017 - 2021',
    location: 'Depok, Jawa Barat',
    bullets: [
      'Graduated with Honors (Magna Cum Laude equivalent, GPA 3.85 / 4.00).',
      'Concentration in Software Systems, Human-Computer Interaction, and Parallel Databases.',
      'Undergraduate research: Designed localized distributed peer-to-peer network nodes using Golang.'
    ]
  }
];

export const certifications: Certification[] = [
  {
    id: 'aws-assoc',
    title: 'AWS Certified Solutions Architect - Associate',
    issuer: 'Amazon Web Services',
    year: '2025',
    credentialUrl: 'https://aws.amazon.com/verification'
  },
  {
    id: 'scrum-psm',
    title: 'Professional Scrum Master I (PSM I)',
    issuer: 'Scrum.org',
    year: '2024',
    credentialUrl: 'https://scrum.org/verification'
  },
  {
    id: 'coursera-dl',
    title: 'Deep Learning Specialization',
    issuer: 'Coursera / DeepLearning.AI',
    year: '2023',
    credentialUrl: 'https://coursera.org/verification'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote: 'Emeralda Patrisnandari is a highly versatile engineer who was crucial in leading our React performance sprints. Her commitment to type safety and elegant spacing sets her apart in Jakarta\'s developer circle.',
    author: 'Siti Aminah',
    role: 'Engineering Director',
    company: 'Gojek (GoTo Group)'
  },
  {
    id: 't2',
    quote: 'Working with Emeralda during the Nusa Pay QRIS rollout was outstanding. She turned highly complex security specs from partner banks into simple, testable Express middleware without delay.',
    author: 'Budi Santoso',
    role: 'VP of Payments',
    company: 'Nusa Group'
  },
  {
    id: 't3',
    quote: 'Emeralda combines deep computer science rigor with highly intuitive front-end empathy. She doesn\'t just ship features; she builds high-fidelity software architectures that grow with the product.',
    author: 'Kenji Sato',
    role: 'Technical Lead',
    company: 'Traveloka'
  }
];
