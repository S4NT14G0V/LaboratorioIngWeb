export const SITE = {
  name: "Santiago Trespalacios Bolivar",
  email: "santiagot3p@gmail.com",
  github: "github.com/S4NT14G0V",
  linkedin: "linkedin.com/in/santiago-trespalacios-bolivar/",
  cvUrl: "/files/cv_santiago_trespalacios_bolivar.pdf",
} as const;

export const SITE_URLS = {
  email: `mailto:${SITE.email}`,
  github: `https://${SITE.github}`,
  linkedin: `https://${SITE.linkedin}`,
} as const;
