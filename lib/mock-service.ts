import { BlogPost } from "./types";

const MOCK_POSTS: BlogPost[] = [
    {
        id: "1",
        slug: "how-much-do-you-need-to-retire",
        title: "How Much Do You Need to Retire?",
        date: "2023-12-01",
        summary: "An engineering approach to retirement planning.",
        tags: ["Investment", "Fire"],
        category: "Finance",
        published: true,
        content: `
            <p>This is a mock content for the retirement post.</p>
            <p>In Phase 2, this content will be replaced by real Notion blocks.</p>
            <h2>The 4% Rule</h2>
            <p>Traditionally, the 4% rule suggests...</p>
        `
    },
    {
        id: "2",
        slug: "hello-world",
        title: "Hello World: Building with Next.js",
        date: "2023-12-25",
        summary: "Why I rebuilt my site using Next.js and Notion.",
        tags: ["Tech", "Next.js"],
        category: "Tech",
        published: true,
        content: "<p>This is the first post on the new platform.</p>"
    }
];

export async function getPosts(): Promise<BlogPost[]> {
    // Simulate API latency
    await new Promise(resolve => setTimeout(resolve, 100));
    return MOCK_POSTS.filter(p => p.published).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return MOCK_POSTS.find(p => p.slug === slug) || null;
}
