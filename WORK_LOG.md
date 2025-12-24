# 📅 Daily Work Log

此文件用於記錄每日開發進度、完成項目與待辦事項。

## Template
\`\`\`markdown
### [YYYY-MM-DD]
**Status**: [Planning / In Progress / Completed]
**Focus**: [簡短描述今日重點]

#### ✅ Completed Tasks
- [ ] Task 1
- [ ] Task 2

#### 📝 Notes & Decisions
- 紀錄重要的技術決策或遇到的困難
\`\`\`

---

## 2025-12-24
**Status**: Completed
**Focus**: 修正 Notion API 整合、修復 Layout 問題、建立 E2E 測試架構

### ✅ Completed Tasks
#### 1. System Stability & Layout
- [x] 修復 Hydration Error (Body tag mismatch)。
- [x] 修正 Tailwind Typography 缺漏，解決文章樣式跑版問題。
- [x] 解決 Category Page 在中文路徑下的 `generateStaticParams` 錯誤。

#### 2. E2E Testing Infrastructure
- [x] 安裝並設定 **Playwright**。
- [x] 建立 `e2e/navigation.spec.ts` 涵蓋核心流程 (Home, Navbar, Category, Search, Post)。
- [x] 解決 PowerShell 執行 `npx` 權限問題 (新增 `npm run test` script)。
- [x] 建立 `TEST_CHECKLIST.md` 與更新 `README.md` 教學。

#### 3. Documentation
- [x] 新增 AI Agent Notion API 使用指引。
- [x] 建立此 Work Log。

#### 4. Maintenance
- [x] 關閉被佔用的 Port 3000 (PID: 14632)。
- [x] 修復 Blog Post 頁面重複 H1 標籤導致的測試錯誤 (降級 Markdown H1 為 H2)。

### 📝 Notes
- **E2E 測試注意事項**：測試前確保 Local Server (`npm run dev`) 已啟動。若遇到 Port 佔用問題，可使用 `taskkill /F /IM node.exe` 清理。
- **Notion API**：未來開發需注意不要在個別檔案 new Client，應統一使用 `lib/notion.ts`。
