import { CaseStudyList } from "@/components/case-study-list";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { allCaseStudies } from "content-collections";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CaseStudiesSection() {
    const caseStudies = [...allCaseStudies].sort((a, b) => a.order - b.order);

    return (
        <div className="flex min-h-0 flex-col gap-y-8">
            <div className="flex flex-col gap-y-4 items-center justify-center">
                <div className="flex items-center w-full">
                    <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
                    <div className="border bg-primary z-10 rounded-xl px-4 py-1">
                        <span className="text-background text-sm font-medium">Case Studies</span>
                    </div>
                    <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
                </div>
                <div className="flex flex-col gap-y-3 items-center justify-center">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">How these systems were built</h2>
                    <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
                        The problem, the architecture, the decisions that mattered,
                        and what is still unfinished.
                    </p>
                </div>
            </div>
            <CaseStudyList items={caseStudies.slice(0, 3)} />
            <Link
                href="/case-studies"
                className={cn(buttonVariants({ variant: "outline", size: "sm" }), "self-center")}
            >
                All {caseStudies.length} case studies
                <ArrowRight className="size-4" aria-hidden />
            </Link>
        </div>
    );
}
