export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    date: string;
    summary: string;
    tags: string[];
    category: string;
    published: boolean;
    content?: string; // For now HTML string, later Notion blocks
}
