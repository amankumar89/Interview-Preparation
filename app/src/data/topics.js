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
