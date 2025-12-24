This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## 🤖 For AI Agents: Notion API Implementation Guide

**此專案使用客製化的 Notion API 設定，為確保程式碼一致性與執行正確，請嚴格遵循以下指引：**

### 1. 核心原則：不要自行初始化 Client
**禁止** 在個別檔案中 `new Client()`。本專案已在 `lib/notion.ts` 中統一處理了環境變數檢查與 Client 初始化。

*   **正確做法**:
    ```typescript
    import { notion, DATABASE_ID } from "@/lib/notion";
    ```
*   **錯誤做法**:
    ```typescript
    // ❌ 不要這樣做
    const notion = new Client({ auth: process.env.NOTION_TOKEN });
    ```

### 2. 資料結構參考 (Source of Truth)
抓取邏輯請務必參考 **`lib/notion-service.ts`**。該檔案定義了：
*   如何正確查詢 Query (包含 `filter` 條件，如 `Published` checkbox)。
*   如何映射 (Map) Notion Properties 到專案的資料結構 (Slug, Title, Date, Tags 等)。
*   `notion-to-md` 的正確使用方式。

### 3. 環境變數檢查
若遇到連線問題，請優先檢查 `.env.local` 是否包含：
*   `NOTION_TOKEN`
*   `NOTION_DATABASE_ID`

---
