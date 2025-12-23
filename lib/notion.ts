import { Client } from "@notionhq/client";

// Basic check - warn instead of throw to avoid build crash if env is missing during static collection (though it shouldn't be)
if (!process.env.NOTION_TOKEN) {
    console.warn("Missing NOTION_TOKEN environment variable");
}

if (!process.env.NOTION_DATABASE_ID) {
    console.warn("Missing NOTION_DATABASE_ID environment variable");
}

export const notion = new Client({
    auth: process.env.NOTION_TOKEN,
    notionVersion: "2022-06-28",
});

export const DATABASE_ID = process.env.NOTION_DATABASE_ID;
