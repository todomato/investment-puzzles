import { Client } from "@notionhq/client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

const databaseId = process.env.NOTION_DATABASE_ID;

async function listData() {
    console.log("📊 Fetching data from Notion Database...");

    try {
        const response = await notion.databases.query({
            database_id: databaseId,
        });

        console.log(`✅ Success! Found ${response.results.length} rows.`);

        if (response.results.length === 0) {
            console.log("⚠️  The database is empty. Please add a row in Notion to see data here.");
            return;
        }

        response.results.forEach((page, index) => {
            const props = page.properties;

            // Extract basic fields safely
            // @ts-ignore
            const title = props.Name?.title?.[0]?.plain_text || "Untitled";
            // @ts-ignore
            const slug = props.Slug?.rich_text?.[0]?.plain_text || "(No Slug)";
            // @ts-ignore
            const published = props.Published?.checkbox ? "✅" : "⬜";

            console.log(`\n📄 [Row ${index + 1}] ${published} ${title} (Slug: ${slug})`);
            // console.log(JSON.stringify(props, null, 2)); // Uncomment to see full raw structure
        });

    } catch (error) {
        console.error("❌ Failed to list data:");
        console.error(error.message);
    }
}

listData();
