import { Client } from "@notionhq/client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

const databaseId = process.env.NOTION_DATABASE_ID;

async function debugNotion() {
    console.log("Debug: Starting check...");
    console.log("Debug: Database ID:", databaseId);

    try {
        // 1. Check retrieve
        console.log("1. Calling databases.retrieve...");
        const result = await notion.databases.retrieve({ database_id: databaseId });
        console.log("--- Result Type ---");
        console.log("Object Type:", result.object);
        console.log("Title:", result.title ? JSON.stringify(result.title) : "No title");
        console.log("Keys available:", Object.keys(result));

        if (result.object !== 'database') {
            console.error("⚠️  WARNING: This ID seems to point to a '" + result.object + "', NOT a 'database'!");
            console.error("Please make sure you copied the ID of the DATABASE, not the Page containing the database.");
        } else {
            console.log("✅ Confirmed it is a Database.");
        }

        if (result.properties) {
            console.log("✅ Properties found:", Object.keys(result.properties));
        } else {
            console.error("❌ Properties are MISSING in the response.");
        }

        // 2. Check query method
        console.log("\n2. Checking databases.query method...");
        if (typeof notion.databases.query === 'function') {
            console.log("✅ notion.databases.query exists and is a function.");

            // Try to query headers only
            const query = await notion.databases.query({ database_id: databaseId, page_size: 1 });
            console.log("✅ Query successful. Found results:", query.results.length);
        } else {
            console.error("❌ notion.databases.query DOES NOT EXIST on this client instance!");
            console.log("Available methods on databases:", Object.keys(notion.databases));
        }

    } catch (error) {
        console.error("\n❌ API Error during debug:");
        console.error(error.message);
        if (error.body) console.log(JSON.stringify(error.body, null, 2));
    }
}

debugNotion();
