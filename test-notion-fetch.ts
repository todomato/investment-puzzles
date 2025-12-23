import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function testNotionFetch() {
    try {
        const { getPosts } = await import('./lib/notion-service');

        console.log('=== 測試 Notion API 資料抓取 ===\n');

        const posts = await getPosts();

        console.log(`📊 總共抓取到 ${posts.length} 筆資料\n`);

        if (posts.length > 0) {
            console.log('📄 資料內容預覽：\n');
            posts.forEach((post, index) => {
                console.log(`--- Post ${index + 1} ---`);
                console.log(`ID: ${post.id}`);
                console.log(`標題: ${post.title}`);
                console.log(`Slug: ${post.slug}`);
                console.log(`日期: ${post.date}`);
                console.log(`分類: ${post.category}`);
                console.log(`標籤: ${post.tags.join(', ') || '無'}`);
                console.log(`摘要: ${post.summary || '無'}`);
                console.log(`發布狀態: ${post.published ? '✅ 已發布' : '❌ 未發布'}`);
                console.log();
            });

            console.log('\n✅ Notion API 資料抓取成功！');
        } else {
            console.log('⚠️  沒有抓取到任何資料');
            console.log('可能原因：');
            console.log('1. Database 中沒有任何內容');
            console.log('2. 所有內容的 Published 都是 false（因為 filter 被註解掉了，這不應該是原因）');
        }

    } catch (error) {
        console.error('❌ 測試失敗:', error);
        if (error instanceof Error) {
            console.error('錯誤訊息:', error.message);
            console.error('錯誤堆疊:', error.stack);
        }
    }
}

testNotionFetch();
