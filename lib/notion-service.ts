import { notion, DATABASE_ID } from "./notion";
import { NotionToMarkdown } from "notion-to-md";
import type { BlogPost } from "./types";

const n2m = new NotionToMarkdown({ notionClient: notion });

export async function getPosts(): Promise<BlogPost[]> {
    if (!DATABASE_ID) {
        console.error("❌ getPosts: Missing DATABASE_ID");
        return [];
    }

    try {
        console.log(`🔍 Fetching posts from DB ${DATABASE_ID}...`);

        // Use standard client method
        // Use standard client method
        const response = await notion.request({
            path: `databases/${DATABASE_ID}/query`,
            method: "post",
            body: {
                filter: {
                    property: "Published",
                    checkbox: {
                        equals: true,
                    },
                },
                sorts: [
                    {
                        property: "Date",
                        direction: "descending",
                    },
                ],
            },
        }) as any;

        console.log(`✅ Fetched ${response.results.length} posts.`);

        const posts = response.results.map((page: any) => {
            const props = page.properties;
            return {
                id: page.id,
                slug: props.Slug?.rich_text[0]?.plain_text || page.id,
                title: props.Name?.title[0]?.plain_text || "Untitled",
                date: props.Date?.date?.start || new Date().toISOString().split('T')[0],
                tags: props.Tags?.multi_select?.map((t: any) => t.name) || [],
                category: props.Category?.select?.name || "Uncategorized",
                summary: props.Summary?.rich_text[0]?.plain_text || "",
                content: "",
                published: props.Published?.checkbox || false,
            };
        });

        return posts;
    } catch (error) {
        console.error("❌ Error fetching posts from Notion:", error);
        return [];
    }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
    if (!DATABASE_ID) return undefined;

    try {
        const response = await notion.request({
            path: `databases/${DATABASE_ID}/query`,
            method: "post",
            body: {
                filter: {
                    and: [
                        {
                            property: "Slug",
                            rich_text: {
                                equals: slug,
                            },
                        },
                        {
                            property: "Published",
                            checkbox: {
                                equals: true,
                            },
                        },
                    ],
                },
                page_size: 1,
            },
        }) as any;

        if (response.results.length === 0) {
            return undefined;
        }

        const page = response.results[0] as any;
        const mdblocks = await n2m.pageToMarkdown(page.id);
        const mdString = n2m.toMarkdownString(mdblocks);

        // ... (rest of logic same)
        const content = typeof mdString.parent === 'string' ? mdString.parent : mdString.parent || "";

        const props = page.properties;

        return {
            id: page.id,
            slug: props.Slug?.rich_text[0]?.plain_text || page.id,
            title: props.Name?.title[0]?.plain_text || "Untitled",
            date: props.Date?.date?.start || new Date().toISOString().split('T')[0],
            tags: props.Tags?.multi_select?.map((t: any) => t.name) || [],
            category: props.Category?.select?.name || "Uncategorized",
            summary: props.Summary?.rich_text[0]?.plain_text || "",
            content: content,
            published: props.Published?.checkbox || false,
        };
    } catch (error) {
        console.error(`Error fetching post by slug ${slug}:`, error);
        return undefined;
    }
}
