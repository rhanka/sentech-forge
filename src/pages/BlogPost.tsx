import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-tech.jpg";
import { parseSingleSectionMarkdown } from "@/lib/markdownLoader";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

interface BlogArticle {
  title: string;
  content: string;
  date?: string;
  readTime?: string;
  tags?: string[];
  draft?: boolean;
}

const parseDate = (rawDate: string) => {
  const isoDateMatch = rawDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoDateMatch) {
    const [, year, month, day] = isoDateMatch;
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  return new Date(rawDate);
};

const formatDate = (rawDate: string, locale: string) => {
  const parsedDate = parseDate(rawDate);
  if (Number.isNaN(parsedDate.getTime())) return rawDate;

  const formatLocale = locale === "fr" ? "fr-FR" : "en-US";
  return new Intl.DateTimeFormat(formatLocale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(parsedDate);
};

const isDraftArticle = (article: { draft?: boolean; tags?: string[] }) => {
  if (article.draft) return true;
  return Array.isArray(article.tags) && article.tags.some((tag) => tag.toLowerCase() === "draft");
};

const SPECIAL_LINE = /^(##|###)\s|^-\s|^\d+\.\s|^\||^```|^!\[/;
const INLINE_TOKEN = /(!\[[^\]]*\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s)]+)/g;

function splitTableRow(line: string): string[] {
  const trimmed = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  return trimmed.split("|").map((cell) => cell.trim());
}

function isMarkdownSeparatorRow(line: string): boolean {
  const cells = splitTableRow(line);
  if (cells.length === 0) return false;
  return cells.every((cell) => /^:?-{3,}:?$/.test(cell));
}

function parseInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const tokens = text.split(INLINE_TOKEN).filter(Boolean);

  tokens.forEach((token, index) => {
    const imageMatch = token.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imageMatch) {
      const [, alt, src] = imageMatch;
      nodes.push(
        <img
          key={`${keyPrefix}-img-${index}`}
          src={src}
          alt={alt || ""}
          loading="lazy"
          decoding="async"
          className="my-4 w-full rounded-lg border border-border bg-card"
        />
      );
      return;
    }

    if (token.startsWith("http://") || token.startsWith("https://")) {
      nodes.push(
        <a
          key={`${keyPrefix}-url-${index}`}
          href={token}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-accent/80 underline underline-offset-2 break-all"
        >
          {token}
        </a>
      );
      return;
    }

    if (token.startsWith("`") && token.endsWith("`")) {
      nodes.push(
        <code key={`${keyPrefix}-code-${index}`} className="px-1.5 py-0.5 rounded bg-secondary text-sm">
          {token.slice(1, -1)}
        </code>
      );
      return;
    }

    if (token.startsWith("**") && token.endsWith("**")) {
      nodes.push(
        <strong key={`${keyPrefix}-bold-${index}`} className="font-semibold">
          {token.slice(2, -2)}
        </strong>
      );
      return;
    }

    const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      const external = href.startsWith("http");
      nodes.push(
        <a
          key={`${keyPrefix}-link-${index}`}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="text-accent hover:text-accent/80 underline underline-offset-2"
        >
          {label}
        </a>
      );
      return;
    }

    nodes.push(<span key={`${keyPrefix}-text-${index}`}>{token}</span>);
  });

  return nodes;
}

function renderMarkdown(content: string): ReactNode[] {
  const lines = content.split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const loopStart = i;
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (!line) {
      i += 1;
      continue;
    }

    if (line.startsWith("# ")) {
      i += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push(
        <h2 key={`h2-${key++}`} className="text-2xl sm:text-3xl font-semibold mt-10 mb-4">
          {line.slice(3)}
        </h2>
      );
      i += 1;
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push(
        <h3 key={`h3-${key++}`} className="text-xl sm:text-2xl font-semibold mt-8 mb-3">
          {line.slice(4)}
        </h3>
      );
      i += 1;
      continue;
    }

    if (line.startsWith("```")) {
      const codeLines: string[] = [];
      i += 1;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i += 1;
      }
      if (i < lines.length) i += 1;
      blocks.push(
        <pre key={`code-${key++}`} className="overflow-x-auto rounded-lg bg-secondary p-4 text-sm leading-relaxed my-4">
          <code>{codeLines.join("\n")}</code>
        </pre>
      );
      continue;
    }

    if (line.startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i]);
        i += 1;
      }

      if (tableLines.length >= 2 && isMarkdownSeparatorRow(tableLines[1])) {
        const headers = splitTableRow(tableLines[0]);
        const bodyRows = tableLines.slice(2).map((row) => splitTableRow(row));

        blocks.push(
          <div key={`table-${key++}`} className="overflow-x-auto my-6">
            <table className="min-w-full border border-border rounded-lg overflow-hidden text-sm">
              <thead className="bg-secondary">
                <tr>
                  {headers.map((header, idx) => (
                    <th key={`th-${idx}`} className="text-left p-3 border-b border-border font-semibold">
                      {parseInline(header, `th-${key}-${idx}`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, rowIdx) => (
                  <tr key={`tr-${rowIdx}`} className="border-b border-border last:border-b-0">
                    {headers.map((_, colIdx) => (
                      <td key={`td-${rowIdx}-${colIdx}`} className="p-3 align-top">
                        {parseInline(row[colIdx] ?? "", `td-${key}-${rowIdx}-${colIdx}`)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      } else {
        blocks.push(
          <pre key={`table-${key++}`} className="overflow-x-auto rounded-lg bg-secondary p-4 text-sm leading-relaxed my-4">
            {tableLines.join("\n")}
          </pre>
        );
      }
      continue;
    }

    const imageLineMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imageLineMatch) {
      const [, alt, src] = imageLineMatch;
      blocks.push(
        <figure key={`img-${key++}`} className="my-6">
          <img src={src} alt={alt || ""} loading="lazy" decoding="async" className="w-full rounded-lg border border-border bg-card" />
          {alt ? <figcaption className="mt-2 text-sm text-muted-foreground">{alt}</figcaption> : null}
        </figure>
      );
      i += 1;
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(lines[i].trim().slice(2));
        i += 1;
      }
      blocks.push(
        <ul key={`ul-${key++}`} className="list-disc pl-6 my-4 space-y-2">
          {items.map((item, idx) => (
            <li key={`li-${key}-${idx}`}>{parseInline(item, `ul-${key}-${idx}`)}</li>
          ))}
        </ul>
      );
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ""));
        i += 1;
      }
      blocks.push(
        <ol key={`ol-${key++}`} className="list-decimal pl-6 my-4 space-y-2">
          {items.map((item, idx) => (
            <li key={`oli-${key}-${idx}`}>{parseInline(item, `ol-${key}-${idx}`)}</li>
          ))}
        </ol>
      );
      continue;
    }

    const paragraphLines: string[] = [line];
    i += 1;
    while (i < lines.length) {
      const next = lines[i].trim();
      if (!next || SPECIAL_LINE.test(next) || next.startsWith("# ")) break;
      paragraphLines.push(next);
      i += 1;
    }

    blocks.push(
      <p key={`p-${key++}`} className="text-base sm:text-lg leading-relaxed my-4">
        {parseInline(paragraphLines.join(" "), `p-${key}`)}
      </p>
    );

    // Defensive guard: always force pointer progress to avoid parser dead-loops
    if (i === loopStart) {
      i += 1;
    }
  }

  return blocks;
}

const BlogPost = () => {
  const { t, i18n } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadArticle = async () => {
      setLoading(true);
      const locale = i18n.language as "fr" | "en";
      const modules = import.meta.glob("../content/blog/**/*.md", { query: "?raw", import: "default" });
      const articlePath = `../content/blog/${locale}/${slug}.md`;
      const loader = modules[articlePath];

      try {
        if (!slug || !loader) {
          if (!cancelled) setArticle(null);
          return;
        }

        const raw = (await loader()) as string;
        const parsed = parseSingleSectionMarkdown(raw);
        const id = String((parsed.metadata as { id?: string }).id || slug);
        const lines = parsed.content.trim().split("\n");
        const titleLine = lines.find((l) => l.trim().startsWith("# "));
        const title = titleLine ? titleLine.replace(/^#\s+/, "").trim() : id;

        if (cancelled) return;

        setArticle({
          title,
          content: parsed.content,
          date: (parsed.metadata as { date?: string }).date,
          readTime: (parsed.metadata as { readTime?: string }).readTime,
          tags: (parsed.metadata as { tags?: string[] }).tags,
          draft: (parsed.metadata as { draft?: boolean }).draft,
        });
      } catch (error) {
        console.error("Error loading blog article:", error);
        if (!cancelled) setArticle(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadArticle();
    return () => {
      cancelled = true;
    };
  }, [i18n.language, slug]);

  const renderedContent = useMemo(() => (article ? renderMarkdown(article.content) : []), [article]);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <section className="relative overflow-hidden pt-28 pb-16 sm:pb-20">
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${heroImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-hero opacity-90" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-primary-foreground">
              <Link
                to="/#blog"
                className="inline-flex items-center gap-2 text-primary-foreground/85 hover:text-primary-foreground transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                {t("blog.backToBlog", "Back to blog")}
              </Link>

              {loading ? (
                <p className="text-primary-foreground/85">{t("common.loading", "Loading...")}</p>
              ) : !article ? (
                <div className="rounded-xl border border-primary-foreground/25 bg-primary-foreground/10 backdrop-blur p-8">
                  <h1 className="text-2xl font-semibold mb-2">{t("blog.notFoundTitle", "Article not found")}</h1>
                  <p className="text-primary-foreground/85">
                    {t("blog.notFoundBody", "This article does not exist or is not available in this language.")}
                  </p>
                </div>
              ) : (
                <>
                  <h1 className="text-4xl sm:text-5xl font-bold mb-6">{article.title}</h1>
                  <div className="flex items-center flex-wrap gap-4 text-sm text-primary-foreground/85">
                    {article.date && (
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {formatDate(article.date, i18n.language)}
                      </span>
                    )}
                    {article.readTime && (
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {article.readTime}
                      </span>
                    )}
                    {isDraftArticle(article) && (
                      <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border border-primary-foreground/35">
                        {t("blog.draft", "Draft")}
                      </Badge>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {!loading && article ? <article className="text-foreground">{renderedContent}</article> : null}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
