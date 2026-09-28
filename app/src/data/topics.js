const FOLDER_LABELS = {
  "html-css": "HTML & CSS",
  javascript: "JavaScript",
  typescript: "TypeScript",
  react: "React",
  "frontend-state": "Frontend State",
  nextjs: "Next.js",
  java: "Java",
  dsa: "DSA",
  "spring-core": "Spring Core",
  "spring-boot": "Spring Boot",
  "spring-security": "Spring Security",
  "jpa-hibernate": "JPA & Hibernate",
  "sql-postgresql": "SQL & PostgreSQL",
  "node-express": "Node & Express",
  "rest-api": "REST APIs",
  "database-design": "Database Design",
  "system-design": "System Design",
  docker: "Docker",
  aws: "AWS",
  "git-devops": "Git & DevOps",
  projects: "Projects",
  "resume-defense": "Resume Defense",
  "hr-behavioral": "HR & Behavioral",
  "ai-agentic-development": "AI & Agentic Dev",
};

export const TOPIC_CATEGORIES = [
  {
    id: "frontend",
    name: "Frontend",
    mark: "FE",
    description: "HTML, CSS, JavaScript, TypeScript, React, and Next.js",
    prefixes: ["01", "02", "03", "04", "05", "06"],
  },
  {
    id: "backend",
    name: "Backend",
    mark: "BE",
    description: "Java, Spring, APIs, messaging, and services",
    prefixes: ["07", "08", "11", "12", "13", "15", "16", "18", "19"],
  },
  {
    id: "databases",
    name: "Databases",
    mark: "DB",
    description: "SQL, PostgreSQL, JPA, and Redis",
    prefixes: ["09", "10", "14", "17"],
  },
  {
    id: "devops",
    name: "DevOps & Cloud",
    mark: "DC",
    description: "Git, Docker, AWS, and delivery pipelines",
    prefixes: ["20", "21", "22", "23"],
  },
  {
    id: "algorithms",
    name: "DSA & Algorithms",
    mark: "DS",
    description: "Data structures and problem-solving patterns",
    prefixes: ["24", "25"],
  },
  {
    id: "design",
    name: "Design & Architecture",
    mark: "DA",
    description: "Design patterns, LLD, HLD, and system design",
    prefixes: ["26", "27", "28", "29"],
  },
  {
    id: "ai",
    name: "AI Engineering",
    mark: "AI",
    description: "LLMs, retrieval, agents, and evaluation",
    prefixes: ["30", "31", "32", "33", "34", "35", "36", "37", "38"],
  },
  {
    id: "interview",
    name: "Interview Projects",
    mark: "IP",
    description: "Project-based interview preparation",
    prefixes: ["39"],
  },
];

const CATEGORY_BY_PREFIX = new Map(
  TOPIC_CATEGORIES.flatMap((category) =>
    category.prefixes.map((prefix) => [prefix, category.id]),
  ),
);

export function categoryForFolder(folder) {
  const prefix = folder.match(/^(\d{2})-/)?.[1];
  return CATEGORY_BY_PREFIX.get(prefix) || "other";
}

const ACRONYMS = new Set([
  "html",
  "css",
  "js",
  "jsx",
  "ts",
  "tsx",
  "sql",
  "api",
  "apis",
  "rest",
  "jpa",
  "aws",
  "hr",
  "ai",
  "jwt",
  "cors",
  "dom",
  "http",
  "https",
  "crud",
  "orm",
  "ci",
  "cd",
]);

function titleCaseFallback(slug) {
  return slug
    .split("-")
    .map((word) =>
      ACRONYMS.has(word.toLowerCase())
        ? word.toUpperCase()
        : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(" ");
}

export function prettyFolder(folder) {
  const match = folder.match(/^(\d+)-(.+)$/);
  const slug = match ? match[2] : folder;
  return FOLDER_LABELS[slug] || titleCaseFallback(slug);
}

export function prettyNote(name) {
  const match = name.match(/^(\d+)-(.+)$/);
  const slug = match ? match[2] : name;
  return titleCaseFallback(slug);
}

export function buildTree(modules) {
  const tree = {};

  for (const [filePath, content] of Object.entries(modules)) {
    const parts = filePath.replace("../../topics/", "").split("/");
    const fileName = parts.pop();
    const folder = parts.join("/") || "root";
    const name = fileName.replace(/\.md$/, "");
    tree[folder] ??= [];
    tree[folder].push({ slug: `${folder}/${name}`, name, content });
  }

  for (const folder of Object.keys(tree)) {
    tree[folder].sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { numeric: true }),
    );
  }

  return Object.fromEntries(
    Object.entries(tree).sort(([a], [b]) =>
      a.localeCompare(b, undefined, { numeric: true }),
    ),
  );
}

export function flattenNotes(tree) {
  return Object.entries(tree).flatMap(([folder, items]) =>
    items.map((item) => ({ ...item, folder })),
  );
}
