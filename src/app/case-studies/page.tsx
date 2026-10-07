import BlurFade from "@/components/magicui/blur-fade";
import { CaseStudyList } from "@/components/case-study-list";
import { allCaseStudies } from "content-collections";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DATA } from "@/data/resume";

const description =
  "How Aravind Govindhasamy built IoT platforms, offline-first ERP apps, RFID systems, and self-hosted infrastructure: the problem, the architecture, and the trade-offs.";

export const metadata: Metadata = {
  title: "Case Studies",
  description,
  alternates: {
    canonical: "/case-studies",
  },
  openGraph: {
    title: `Case Studies | ${DATA.name}`,
    description,
    url: `${DATA.url}/case-studies`,
    siteName: DATA.name,
    type: "website",
    images: [
      {
        url: `${DATA.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `Case Studies — ${DATA.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Case Studies | ${DATA.name}`,
    description,
    images: [`${DATA.url}/opengraph-image`],
  },
};

const BLUR_FADE_DELAY = 0.04;

export default function CaseStudiesPage() {
  const caseStudies = [...allCaseStudies].sort((a, b) => a.order - b.order);

  return (
    <section id="case-studies">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="text-2xl font-semibold tracking-tight mb-2">Case Studies <span className="ml-1 bg-card border border-border rounded-md px-2 py-1 text-muted-foreground text-sm">{caseStudies.length}</span></h1>
        <p className="text-sm text-muted-foreground mb-8">
          The longer story behind the projects: what the problem was, what I
          built, the decisions that mattered, and what is still unfinished.
        </p>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <CaseStudyList items={caseStudies} />
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <h2 id="studies" className="text-xl font-semibold tracking-tight mt-14 mb-2">Studies and experiments</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Smaller work: research, notes and tools I made to learn something or
          to get a job done.
        </p>
        <ul className="flex flex-col gap-5">
          {DATA.studies.map((study) => (
            <li key={study.title} className="flex flex-col gap-1">
              <p className="font-medium tracking-tight">
                {study.href ? (
                  <Link
                    href={study.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:underline"
                  >
                    {study.title}
                    <ArrowUpRight className="size-3.5 text-muted-foreground" aria-hidden />
                  </Link>
                ) : (
                  study.title
                )}
              </p>
              <p className="text-xs text-muted-foreground">{study.dates}</p>
              <p className="text-sm text-pretty text-muted-foreground">{study.description}</p>
            </li>
          ))}
        </ul>
      </BlurFade>
    </section>
  );
}
