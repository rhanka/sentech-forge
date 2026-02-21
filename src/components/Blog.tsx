import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { ArrowUpRight, Calendar, Clock, LucideProps } from "lucide-react";
import { lazy, Suspense } from "react";
import { useBlogContent } from "@/hooks/useContent";
import { toDynamicIconKey } from "@/lib/iconResolver";
import { Link } from "react-router-dom";

interface IconProps extends Omit<LucideProps, "ref"> {
  name: keyof typeof dynamicIconImports;
}

const Icon = ({ name, ...props }: IconProps) => {
  const importer = dynamicIconImports[name];
  if (!importer || typeof importer !== "function") {
    console.warn(`Icon "${name}" not found in lucide-react dynamicIconImports`);
    return <div className="w-6 h-6" aria-hidden />;
  }

  const LucideIcon = lazy(() => importer());

  return (
    <Suspense fallback={<div className="w-6 h-6" />}>
      <LucideIcon {...props} />
    </Suspense>
  );
};

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

export const Blog = () => {
  const { t, i18n } = useTranslation();
  const { posts, loading } = useBlogContent();

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">{t("blog.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("blog.subtitle")}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t("common.loading", "Chargement...")}</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center p-8 rounded-xl border border-dashed border-border bg-card">
            <p className="text-muted-foreground">{t("blog.empty")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {posts.map((post) => {
              const iconName = toDynamicIconKey(post.icon || "newspaper");
              const postUrl = post.url && post.url !== "#" ? post.url : `/blog/${post.id}`;
              const isExternal = Boolean(postUrl.startsWith("http"));
              const publicationDate = post.date ? formatDate(post.date, i18n.language) : t("blog.soon");

              return (
                <Card key={post.id} className="hover:shadow-large transition-all duration-300 hover:-translate-y-1 border-border">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-4">
                      <Icon name={iconName} className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <div className="flex items-center flex-wrap gap-4 text-sm text-muted-foreground mb-2">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {publicationDate}
                      </span>
                      {post.readTime && (
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-2xl">{post.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">{post.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    {isExternal ? (
                      <a
                        href={postUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-accent hover:text-accent/80 transition-colors font-medium"
                      >
                        {t("blog.readArticle")}
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    ) : (
                      <Link
                        to={postUrl}
                        className="inline-flex items-center gap-1.5 text-accent hover:text-accent/80 transition-colors font-medium"
                      >
                        {t("blog.readArticle")}
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
