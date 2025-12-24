const https = require('https');

async function checkUpdates() {
    try {
        console.log("Starting Notion update check...");
        const databaseId = process.env.NOTION_DATABASE_ID;
        const token = process.env.NOTION_TOKEN;

        if (!databaseId || !token) {
            console.error("Error: Missing NOTION_DATABASE_ID or NOTION_TOKEN.");
            process.exit(1);
        }

        const timeWindow = 60 * 60 * 1000;
        const threshold = new Date(Date.now() - timeWindow);

        console.log(`Checking for updates since: ${threshold.toISOString()}`);

        let dbId = databaseId;
        // Format UUID if needed
        if (databaseId.length === 32) {
            dbId = `${databaseId.slice(0, 8)}-${databaseId.slice(8, 12)}-${databaseId.slice(12, 16)}-${databaseId.slice(16, 20)}-${databaseId.slice(20)}`;
        }

        console.log(`Querying database: ${dbId}`);

        const body = JSON.stringify({
            sorts: [
                {
                    timestamp: "last_edited_time",
                    direction: "descending",
                },
            ],
            page_size: 1,
        });

        const options = {
            hostname: 'api.notion.com',
            path: `/v1/databases/${dbId}/query`,
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json',
                'Content-Length': body.length
            }
        };

        const req = https.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                if (res.statusCode !== 200) {
                    console.error(`Error: Notion API returned status ${res.statusCode}`);
                    console.error(`Response: ${data}`);
                    process.exit(1);
                }

                const response = JSON.parse(data);

                if (response.results.length === 0) {
                    console.log("No pages found in database.");
                    setOutput(false);
                    return;
                }

                const lastEditedTime = new Date(response.results[0].last_edited_time);
                console.log(`Latest post edited at: ${lastEditedTime.toISOString()}`);

                if (lastEditedTime > threshold) {
                    console.log("✅ Found recent updates. Proceeding with deployment.");
                    setOutput(true);
                } else {
                    console.log("Mq No recent updates found. Skipping deployment.");
                    setOutput(false);
                }
            });
        });

        req.on('error', (error) => {
            console.error("Error checking updates:", error);
            process.exit(1);
        });

        req.write(body);
        req.end();

    } catch (error) {
        console.error("Error checking updates:", error);
        process.exit(1);
    }
}

function setOutput(hasUpdates) {
    if (process.env.GITHUB_OUTPUT) {
        const fs = require("fs");
        fs.appendFileSync(process.env.GITHUB_OUTPUT, `has_updates=${hasUpdates}\n`);
    } else {
        console.log(`OUTPUT: has_updates=${hasUpdates}`);
    }
}

checkUpdates();
