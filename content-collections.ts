import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import remarkGfm from "remark-gfm";
import { z } from "zod";
import { remarkCodeMeta } from "./src/lib/remark-code-meta";

const posts = defineCollection({
    name: "posts",
    directory: "content",
    include: "*.mdx",
    schema: z.object({
        title: z.string(),
        publishedAt: z.string(),
        updatedAt: z.string().optional(),
        author: z.string().optional(),
        summary: z.string(),
        image: z.string().optional(),
        content: z.string(),
    }),
    transform: async (document, context) => {
        const mdx = await compileMDX(context, document, {
            remarkPlugins: [remarkGfm, remarkCodeMeta],
        });
        return {
        ...document,
            mdx,
        };
    },
});

const caseStudies = defineCollection({
    name: "caseStudies",
    directory: "content/case-studies",
    include: "*.mdx",
    schema: z.object({
        title: z.string(),
        summary: z.string(),
        publishedAt: z.string(),
        period: z.string(),
        role: z.string(),
        stack: z.array(z.string()),
        image: z.string(),
        // List order; the first three also show on the home page.
        order: z.number(),
        // Public URLs only — private and employer work gets none.
        links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
        content: z.string(),
    }),
    transform: async (document, context) => {
        const mdx = await compileMDX(context, document, {
            remarkPlugins: [remarkGfm, remarkCodeMeta],
        });
        return {
            ...document,
            slug: document._meta.path,
            mdx,
        };
    },
});

export default defineConfig({
    collections: [posts, caseStudies],
});

