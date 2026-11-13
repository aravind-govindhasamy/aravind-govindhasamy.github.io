import Link from "next/link";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";

// Header/footer reuse DATA.navbar + DATA.contact.social so links never drift from the dock.
const HEADER_LINKS = ["Projects", "Case Studies", "Blog", "Resume"];
const MOBILE_HIDDEN = ["Projects", "Case Studies"]; // the dock already covers these on phones
const pill = "rounded-full px-3 py-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors";
const ext = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {});

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/70 backdrop-blur-xl">
      <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight" aria-label="Home">
          <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
            {DATA.initials}
          </span>
          <span className="hidden sm:inline">{DATA.name}</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm" aria-label="Header navigation">
          {DATA.navbar
            .filter((n) => HEADER_LINKS.includes(n.label))
            .map((n) => (
              <Link key={n.href} href={n.href} {...ext(n.href)}
                aria-label={`Go to ${n.label} section`}
                className={cn(pill, MOBILE_HIDDEN.includes(n.label) && "hidden sm:inline-block")}>
                {n.label}
              </Link>
            ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-border/60">
      <div className="max-w-2xl mx-auto px-6 pt-10 pb-28 flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          <div className="space-y-1">
            <p className="font-semibold tracking-tight">{DATA.name}</p>
            <p className="text-sm text-muted-foreground">{DATA.role}</p>
            <p className="text-sm text-muted-foreground">{DATA.location}</p>
          </div>
          <div className="flex gap-2">
            {Object.values(DATA.contact.social).map((s) => (
              <a key={s.name} href={s.url} aria-label={s.name} {...ext(s.url)}
                className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                <s.icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <nav className="grid grid-cols-2 sm:grid-cols-4 gap-y-2 text-sm" aria-label="Footer navigation">
          {DATA.navbar
            .filter((n) => n.label !== "Home")
            .map((n) => (
              <Link key={n.href} href={n.href} {...ext(n.href)}
                aria-label={`Footer link to ${n.label}`}
                className="text-muted-foreground hover:text-foreground transition-colors w-fit">
                {n.label}
              </Link>
            ))}
        </nav>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {DATA.name}. Built with Next.js, hosted on GitHub Pages.</p>
          <a href="#" className="hover:text-foreground transition-colors w-fit">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
