/* eslint-disable @next/next/no-img-element */
import type { CaseStudy } from "content-collections";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

// Server component only: CaseStudy carries the compiled MDX body.
export function CaseStudyList({ items }: { items: CaseStudy[] }) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((caseStudy) => (
        <Link
          key={caseStudy.slug}
          href={`/case-studies/${caseStudy.slug}`}
          className="group flex items-start gap-4 rounded-xl border border-border p-3 transition-all duration-200 hover:ring-2 hover:ring-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <img
            src={caseStudy.image}
            alt=""
            loading="lazy"
            className="size-20 flex-none rounded-lg border border-border object-cover"
          />
          <div className="flex min-w-0 flex-col gap-1">
            <p className="font-medium tracking-tight">
              {caseStudy.title}
              <ChevronRight
                className="ml-1 inline-block size-4 stroke-3 text-muted-foreground opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
                aria-hidden
              />
            </p>
            <p className="text-sm text-pretty text-muted-foreground">
              {caseStudy.summary}
            </p>
            <p className="text-xs text-muted-foreground">
              {caseStudy.period} · {caseStudy.stack.slice(0, 3).join(" · ")}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
