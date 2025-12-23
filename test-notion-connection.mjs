import { Client } from "@notionhq/client";
import dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

const databaseId = process.env.NOTION_DATABASE_ID;

async function testConnection() {
    console.log("Testing Notion Connection...");
    console.log(`Token: ${process.env.NOTION_TOKEN ? "Found (Ends with " + process.env.NOTION_TOKEN.slice(-4) + ")" : "Missing"}`);
    console.log(`Database ID: ${databaseId || "Missing"}`);

    if (!process.env.NOTION_TOKEN || !databaseId) {
        console.error("❌ Missing credentials. Please check .env.local");
        return;
    }

    try {
        const response = await notion.databases.retrieve({ database_id: databaseId });
        console.log("✅ Success! Connected to database:");
        // @ts-ignore
        console.log(`Title: ${response.title?.[0]?.plain_text || "Untitled"}`);
        console.log(`URL: ${response.url}`);

        // Also try to query rows
        const query = await notion.databases.query({ database_id: databaseId, page_size: 1 });
        console.log(`Found ${query.results.length} pages in the database.`);

    } catch (error) {
        console.error("❌ Connection Failed:");
        console.error(error.message);
        if (error.code === 'object_not_found') {
            console.error("Hint: Check if the Database ID is correct and if the Integration is added to the connection of that page.");
        }
        if (error.code === 'unauthorized') {
            console.error("Hint: Check if the Token is correct.");
        }
    }
}

testConnection();
