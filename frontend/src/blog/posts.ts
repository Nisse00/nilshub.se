import { marked } from "marked";

// Every Markdown file in ./posts is a blog post; the file name is its URL (slug).
const files = import.meta.glob<string>("./posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

export interface Post {
  slug: string;
  title: string;
  /** YYYY-MM-DD */
  date: string;
  summary: string;
  /** The post body rendered to HTML */
  html: string;
}

/** Splits the `---`-fenced block of `key: value` lines at the top of a post from its body. */
function parseFrontmatter(path: string, source: string) {
  const match = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(source);
  if (!match) throw new Error(`${path} must start with a --- frontmatter block`);

  const fields: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const separator = line.indexOf(":");
    if (separator > 0) {
      fields[line.slice(0, separator).trim()] = line.slice(separator + 1).trim();
    }
  }
  for (const required of ["title", "date", "summary"]) {
    if (!fields[required]) throw new Error(`${path} is missing "${required}" in its frontmatter`);
  }
  return { fields, body: match[2] };
}

export const POSTS: Post[] = Object.entries(files)
  .map(([path, source]) => {
    const { fields, body } = parseFrontmatter(path, source);
    return {
      slug: path.slice(path.lastIndexOf("/") + 1, -".md".length),
      title: fields.title,
      date: fields.date,
      summary: fields.summary,
      // The posts are my own files in this repo, so rendering their HTML is safe
      html: marked.parse(body, { async: false }),
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

export function formatDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
