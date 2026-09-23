/**
 * portfolioData.ts
 * Estructura de datos fuertemente tipada para el portafolio de Santiago Trespalacios.
 * Cumple con los requerimientos del Proyecto Evaluativo 1 de Ingeniería Web.
 */

export interface ContactInfo {
  city: string;
  country: string;
  email: string;
  phone: string;
  availability: string;
  status: string;
}

export interface SkillProgress {
  name: string;
  percentage: number;
  level?: string;
}

export interface KnowledgeItem {
  id: string;
  titleKey: string;
  descKey: string;
  icon: string;
  tags: string[];
}

export interface EducationItem {
  id: string;
  institutionKey: string;
  degreeKey: string;
  datesKey: string;
  statusKey: string;
  descriptionKey: string;
  highlightsKeys: string[];
}

export interface ProjectItem {
  id: string;
  titleKey: string;
  summaryKey: string;
  image: string;
  tags: string[];
  pointsKeys: string[];
  links: {
    label: string;
    url: string;
  }[];
  detailedDescKey: string;
  architectureHighlightsKeys: string[];
}

export interface LanguageSkill {
  nameKey: string;
  percentage: number;
  levelKey: string;
}

export const PERSONAL_INFO = {
  name: "Santiago Trespalacios Bolívar",
  shortName: "Santiago Trespalacios",
  titleKey: "profile.title",
  avatar: "/profile_linkedin_img_ico.png",
  avatarNoColor: "/nocolor_sinfondo.webp",
  contact: {
    city: "Medellín",
    country: "Colombia",
    email: "santiagot3p@gmail.com",
    phone: "+57 3053644367",
  },
  cvUrl: "/files/cv_santiago_trespalacios_bolivar.pdf",
};

export const LANGUAGES: LanguageSkill[] = [
  {
    nameKey: "sidebar.lang_spanish",
    percentage: 100,
    levelKey: "sidebar.lang_spanish_level",
  },
  {
    nameKey: "sidebar.lang_english",
    percentage: 70,
    levelKey: "sidebar.lang_english_level",
  },
];

export const PROGRAMMING_LANGUAGES: SkillProgress[] = [
  { name: "Java", percentage: 90 },
  { name: "TypeScript", percentage: 85 },
  { name: "JavaScript", percentage: 85 },
  { name: "Python", percentage: 80 },
  { name: "PHP", percentage: 75 },
  { name: "SQL", percentage: 80 },
];

export const EXTRA_SKILLS: string[] = [
  "sidebar.extra_skills_list.git",
  "sidebar.extra_skills_list.clean_arch",
  "sidebar.extra_skills_list.scrum",
  "sidebar.extra_skills_list.junit",
  "sidebar.extra_skills_list.e2e",
  "sidebar.extra_skills_list.rest_jwt",
  "sidebar.extra_skills_list.docker",
  "sidebar.extra_skills_list.sse",
  "sidebar.extra_skills_list.teamwork",
  "sidebar.extra_skills_list.sonar",
];

export const KNOWLEDGE_ITEMS: KnowledgeItem[] = [
  {
    id: "backend",
    titleKey: "knowledge.backend.title",
    descKey: "knowledge.backend.desc",
    icon: "server",
    tags: ["Java", "Spring Boot", "Python", "FastAPI", "PHP", "REST APIs"],
  },
  {
    id: "frontend",
    titleKey: "knowledge.frontend.title",
    descKey: "knowledge.frontend.desc",
    icon: "layout",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5/CSS3"],
  },
  {
    id: "qa",
    titleKey: "knowledge.qa.title",
    descKey: "knowledge.qa.desc",
    icon: "shield-check",
    tags: ["JUnit 5", "Mockito", "Selenium", "Appium", "SonarCloud", "Postman"],
  },
  {
    id: "database",
    titleKey: "knowledge.database.title",
    descKey: "knowledge.database.desc",
    icon: "database",
    tags: ["PostgreSQL", "MySQL", "Spring Data JPA", "Hibernate", "SQL"],
  },
  {
    id: "devops",
    titleKey: "knowledge.devops.title",
    descKey: "knowledge.devops.desc",
    icon: "cloud",
    tags: ["Docker", "Kubernetes", "Git & GitHub", "Azure DevOps", "CI/CD"],
  },
  {
    id: "mobile",
    titleKey: "knowledge.mobile.title",
    descKey: "knowledge.mobile.desc",
    icon: "smartphone",
    tags: ["React Native", "Android", "iOS", "GPS Geolocation", "Real-Time Sync"],
  },
];

export const EDUCATION_ITEMS: EducationItem[] = [
  {
    id: "udea",
    institutionKey: "education.udea.institution",
    degreeKey: "education.udea.degree",
    datesKey: "education.udea.dates",
    statusKey: "education.udea.status",
    descriptionKey: "education.udea.desc",
    highlightsKeys: [
      "education.udea.h1",
      "education.udea.h2",
      "education.udea.h3",
    ],
  },
  {
    id: "certifications",
    institutionKey: "education.certs.institution",
    degreeKey: "education.certs.degree",
    datesKey: "education.certs.dates",
    statusKey: "education.certs.status",
    descriptionKey: "education.certs.desc",
    highlightsKeys: [
      "education.certs.h1",
      "education.certs.h2",
      "education.certs.h3",
    ],
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "facturacion",
    titleKey: "projects.facturacion.title",
    summaryKey: "projects.facturacion.summary",
    image: "/projects/facturacion.svg",
    tags: ["Java", "Spring Boot", "React", "TypeScript", "DIAN XML/CUFE"],
    pointsKeys: [
      "section.work.value.first.points.p1",
      "section.work.value.first.points.p2",
      "section.work.value.first.points.p3",
      "section.work.value.first.points.p4",
    ],
    links: [],
    detailedDescKey: "projects.facturacion.detailed",
    architectureHighlightsKeys: [
      "projects.facturacion.arch1",
      "projects.facturacion.arch2",
      "projects.facturacion.arch3",
    ],
  },
  {
    id: "logistics",
    titleKey: "projects.logistics.title",
    summaryKey: "projects.logistics.summary",
    image: "/projects/logistics.svg",
    tags: ["Java", "Spring Boot", "JWT", "SSE", "REST API"],
    pointsKeys: [
      "section.work.value.second.points.p1",
      "section.work.value.second.points.p2",
      "section.work.value.second.points.p3",
      "section.work.value.second.points.p4",
    ],
    links: [
      {
        label: "GitHub Repo",
        url: "https://github.com/S4NT14G0V/Logistics-processes-system-api",
      },
    ],
    detailedDescKey: "projects.logistics.detailed",
    architectureHighlightsKeys: [
      "projects.logistics.arch1",
      "projects.logistics.arch2",
      "projects.logistics.arch3",
    ],
  },
  {
    id: "fitness",
    titleKey: "projects.fitness.title",
    summaryKey: "projects.fitness.summary",
    image: "/projects/fitness.svg",
    tags: ["React Native", "Python", "Django", "Appium", "GPS Live"],
    pointsKeys: [
      "section.work.value.third.points.p1",
      "section.work.value.third.points.p2",
      "section.work.value.third.points.p3",
      "section.work.value.third.points.p4",
      "section.work.value.third.points.p5",
    ],
    links: [],
    detailedDescKey: "projects.fitness.detailed",
    architectureHighlightsKeys: [
      "projects.fitness.arch1",
      "projects.fitness.arch2",
      "projects.fitness.arch3",
    ],
  },
  {
    id: "school",
    titleKey: "projects.school.title",
    summaryKey: "projects.school.summary",
    image: "/projects/school.svg",
    tags: ["React", "Spring Boot", "PostgreSQL", "RBAC Auth"],
    pointsKeys: [
      "section.work.value.fourth.points.p1",
      "section.work.value.fourth.points.p2",
      "section.work.value.fourth.points.p3",
      "section.work.value.fourth.points.p4",
    ],
    links: [
      {
        label: "GitHub Frontend",
        url: "https://github.com/S4NT14G0V/School-management-frontend",
      },
      {
        label: "GitHub Backend",
        url: "https://github.com/David-Gomez49/school-management-backend",
      },
    ],
    detailedDescKey: "projects.school.detailed",
    architectureHighlightsKeys: [
      "projects.school.arch1",
      "projects.school.arch2",
      "projects.school.arch3",
    ],
  },
];
