export interface Tech {
  key: string;
  icon?: { light: string; dark: string };
}

export const TECHS: Tech[] = [
  { key: "tech.java", icon: { light: "java.svg", dark: "java.svg" } },
  { key: "tech.python", icon: { light: "python.svg", dark: "python.svg" } },
  { key: "tech.javascript", icon: { light: "javascript.svg", dark: "javascript.svg" } },
  { key: "tech.typescript", icon: { light: "typescript.svg", dark: "typescript.svg" } },
  { key: "tech.php", icon: { light: "php.svg", dark: "php_dark.svg" } },
  { key: "tech.springboot", icon: { light: "spring.svg", dark: "spring.svg" } },
  { key: "tech.fastapi", icon: { light: "fastapi.svg", dark: "fastapi.svg" } },
  { key: "tech.graphql", icon: { light: "graphql.svg", dark: "graphql.svg" } },
  { key: "tech.springdatajpa" },
  { key: "tech.jwt", icon: { light: "jwt.svg", dark: "jwt.svg" } },
  { key: "tech.react", icon: { light: "react_light.svg", dark: "react_light.svg" } },
  { key: "tech.reactnative" },
  { key: "tech.nextjs", icon: { light: "nextjs_icon_dark.svg", dark: "nextjs_icon_dark.svg" } },
  { key: "tech.html5", icon: { light: "html5.svg", dark: "html5.svg" } },
  { key: "tech.css", icon: { light: "css_old.svg", dark: "css_old.svg" } },
  { key: "tech.tailwind", icon: { light: "tailwindcss.svg", dark: "tailwindcss.svg" } },
  { key: "tech.junit" },
  { key: "tech.mockito" },
  { key: "tech.selenium" },
  { key: "tech.postman", icon: { light: "postman.svg", dark: "postman.svg" } },
  { key: "tech.sonarcloud" },
  { key: "tech.postgresql", icon: { light: "postgresql.svg", dark: "postgresql.svg" } },
  { key: "tech.mysql", icon: { light: "mysql-icon-light.svg", dark: "mysql-icon-dark.svg" } },
  { key: "tech.docker", icon: { light: "docker.svg", dark: "docker.svg" } },
  { key: "tech.kubernetes", icon: { light: "kubernetes.svg", dark: "kubernetes.svg" } },
  { key: "tech.git", icon: { light: "git.svg", dark: "git.svg" } },
  { key: "tech.github", icon: { light: "GitHub_light.svg", dark: "GitHub_dark.svg" } },
  { key: "tech.azuredevops" },
];

export function techIcon(tech: Tech, theme: "light" | "dark"): string | undefined {
  if (!tech.icon) return undefined;
  return theme === "dark" ? tech.icon.dark : tech.icon.light;
}
