import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function scrapeAndImportToNotion() {
    const { notion, DATABASE_ID } = await import('./lib/notion');

    // 8篇文章的資訊
    const articles = [
        { title: '投資最大的敵人 – 就是自己', url: 'https://investmentpuzzles.com/own-worst-enemy/', slug: 'own-worst-enemy' },
        { title: '學習逆向思考', url: 'https://investmentpuzzles.com/reverse-thinking/', slug: 'reverse-thinking' },
        { title: '相信運氣是投資的一環', url: 'https://investmentpuzzles.com/trust-in-fate/', slug: 'trust-in-fate' },
        { title: '不預測市場，擁抱不確定性', url: 'https://investmentpuzzles.com/embrace-uncertainty/', slug: 'embrace-uncertainty' },
        { title: '喜歡高配息ETF，要能接受跟複利效應說掰掰', url: 'https://investmentpuzzles.com/dividend-etf-stuff/', slug: 'dividend-etf-stuff' },
        { title: '瞭解股市的本質', url: 'https://investmentpuzzles.com/about-stock/', slug: 'about-stock' },
        { title: '我的信念們', url: 'https://investmentpuzzles.com/my-faiths/', slug: 'my-faiths' },
        { title: '建立自己的投資原則', url: 'https://investmentpuzzles.com/ground-rules/', slug: 'ground-rules' },
    ];

    console.log(`開始爬取並匯入 ${articles.length} 篇文章到 Notion...\n`);

    for (const article of articles) {
        try {
            console.log(`📖 處理: ${article.title}`);
            console.log(`   URL: ${article.url}`);

            // 爬取文章內容
            const response = await fetch(article.url);
            const html = await response.text();

            // 簡單的內容提取（提取文章主要內容）
            const contentMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
            let content = '';

            if (contentMatch) {
                // 移除 HTML 標籤，保留文字
                content = contentMatch[1]
                    .replace(/<script[\s\S]*?<\/script>/gi, '')
                    .replace(/<style[\s\S]*?<\/style>/gi, '')
                    .replace(/<[^>]+>/g, ' ')
                    .replace(/\s+/g, ' ')
                    .trim()
                    .substring(0, 2000); // 限制長度
            }

            // 創建 Notion 頁面
            const notionResponse = await notion.request({
                path: 'pages',
                method: 'post',
                body: {
                    parent: {
                        database_id: DATABASE_ID
                    },
                    properties: {
                        'Name': {
                            title: [
                                {
                                    text: {
                                        content: article.title
                                    }
                                }
                            ]
                        },
                        'Slug': {
                            rich_text: [
                                {
                                    text: {
                                        content: article.slug
                                    }
                                }
                            ]
                        },
                        'Category': {
                            select: {
                                name: '投資'
                            }
                        },
                        'Published': {
                            checkbox: true
                        },
                        'Date': {
                            date: {
                                start: new Date().toISOString().split('T')[0]
                            }
                        },
                        'Summary': {
                            rich_text: [
                                {
                                    text: {
                                        content: content.substring(0, 200) + '...'
                                    }
                                }
                            ]
                        }
                    },
                    children: [
                        {
                            object: 'block',
                            type: 'paragraph',
                            paragraph: {
                                rich_text: [
                                    {
                                        type: 'text',
                                        text: {
                                            content: content.substring(0, 2000)
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            });

            console.log(`   ✅ 成功匯入到 Notion\n`);

            // 避免 API rate limit
            await new Promise(resolve => setTimeout(resolve, 1000));

        } catch (error: any) {
            console.error(`   ❌ 失敗: ${error.message}\n`);
        }
    }

    console.log('🎉 完成！');
}

scrapeAndImportToNotion();
