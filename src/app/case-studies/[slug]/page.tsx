/* eslint-disable @next/next/no-img-element */
import { allCaseStudies } from "content-collections";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXContent } from "@content-collections/mdx/react";
import { mdxComponents } from "@/mdx-components";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

export async function generateStaticParams() {
  return allCaseStudies.map((caseStudy) => ({ slug: caseStudy.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const caseStudy = allCaseStudies.find((c) => c.slug === slug);

  if (!caseStudy) {
    return undefined;
  }

  const { title, summary: description, publishedAt: publishedTime } = caseStudy;
  // Covers double as share images; there is no generated per-slug OG card.
  const image = `${DATA.url}${caseStudy.image}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/case-studies/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${DATA.url}/case-studies/${slug}`,
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  const caseStudies = [...allCaseStudies].sort((a, b) => a.order - b.order);
  const currentIndex = caseStudies.findIndex((c) => c.slug === slug);
  const caseStudy = caseStudies[currentIndex];

  if (!caseStudy) {
    notFound();
  }

  const previous = caseStudies[currentIndex - 1];
  const next = caseStudies[currentIndex + 1];

  const jsonLdContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: caseStudy.title,
    datePublished: caseStudy.publishedAt,
    description: caseStudy.summary,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${DATA.url}/case-studies/${slug}`,
    },
    image: `${DATA.url}${caseStudy.image}`,
    url: `${DATA.url}/case-studies/${slug}`,
    author: {
      "@type": "Person",
      name: DATA.name,
      url: DATA.url,
    },
  }).replace(/</g, "\\u003c");

  return (
    <section id="case-study">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: jsonLdContent,
        }}
      />
      <div className="flex justify-start gap-4 items-center">
        <Link href="/case-studies" className="text-sm text-muted-foreground hover:text-foreground transition-colors border border-border rounded-lg px-2 py-1 inline-flex items-center gap-1 mb-6 group" aria-label="Back to Case Studies">
          <ChevronLeft className="size-3 group-hover:-translate-x-px transition-transform" />
          Back to Case Studies
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="title font-semibold text-3xl md:text-4xl tracking-tighter leading-tight">
          {caseStudy.title}
        </h1>
        <p className="text-muted-foreground text-pretty">{caseStudy.summary}</p>
        <div className="flex flex-col gap-1 text-xs text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">Role:</span> {caseStudy.role}
          </p>
          <p>
            <span className="font-medium text-foreground">Period:</span> {caseStudy.period}
          </p>
        </div>
        <div className="flex flex-wrap gap-1">
          {caseStudy.stack.map((tag) => (
            <Badge
              key={tag}
              className="text-[11px] font-medium h-6 w-fit px-2"
              variant="secondary"
            >
              {tag}
            </Badge>
          ))}
        </div>
        {caseStudy.links.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {caseStudy.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Badge className="flex items-center gap-1 text-xs">
                  {link.label}
                  <ArrowUpRight className="size-3" aria-hidden />
                </Badge>
              </Link>
            ))}
          </div>
        )}
        <img
          src={caseStudy.image}
          alt=""
          className="w-full aspect-[2/1] rounded-lg border border-border object-cover"
        />
      </div>
      <div className="my-6 flex w-full items-center">
        <div
          className="flex-1 h-px bg-border"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          }}
        />
      </div>
      <article className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
        <MDXContent code={caseStudy.mdx} components={mdxComponents} />
      </article>

      <nav className="mt-12 pt-8 max-w-2xl">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          {previous ? (
            <Link
              href={`/case-studies/${previous.slug}`}
              className="group flex-1 flex flex-col gap-1 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
            >
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <ChevronLeft className="size-3" />
                Previous
              </span>
              <span className="text-sm font-medium group-hover:text-foreground transition-colors whitespace-normal wrap-break-word">
                {previous.title}
              </span>
            </Link>
          ) : (
            <div className="hidden sm:block flex-1" />
          )}

          {next ? (
            <Link
              href={`/case-studies/${next.slug}`}
              className="group flex-1 flex flex-col gap-1 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors text-right"
            >
              <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                Next
                <ChevronRight className="size-3" />
              </span>
              <span className="text-sm font-medium group-hover:text-foreground transition-colors whitespace-normal wrap-break-word">
                {next.title}
              </span>
            </Link>
          ) : (
            <div className="hidden sm:block flex-1" />
          )}
        </div>
      </nav>
    </section>
  );
}
