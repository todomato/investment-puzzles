
const { Client } = require('@notionhq/client');
const { NotionToMarkdown } = require('notion-to-md');

const notion = new Client({ auth: 'secret_placeholder' });
const n2m = new NotionToMarkdown({ notionClient: notion });

console.log('Available methods on n2m:', Object.getPrototypeOf(n2m));
