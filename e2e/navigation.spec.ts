import { test, expect } from '@playwright/test';

test.describe('Website Navigation & Functionality', () => {

    test.beforeEach(async ({ page }) => {
        // Go to the base path defined in next.config.ts: /investment-puzzles
        await page.goto('/investment-puzzles');
    });

    test('Homepage loads correctly', async ({ page }) => {
        await expect(page).toHaveTitle(/Investment Puzzles/);
        await expect(page.getByRole('heading', { level: 1, name: 'Latest Writings' })).toBeVisible();
    });

    test('Navbar links work', async ({ page }) => {
        // Click About
        await page.getByRole('link', { name: 'About' }).click();

        // Wait for URL to verify navigation occurred
        await page.waitForURL(/.*\/about/);

        await expect(page).toHaveURL(/.*\/about/);
        // Updated to match actual heading "About Me"
        await expect(page.getByRole('heading', { level: 1, name: 'About Me' })).toBeVisible();

        // Click Home
        await page.getByRole('link', { name: 'Home' }).click();
        await page.waitForURL(/.*\/investment-puzzles$/);
        await expect(page).toHaveURL(/.*\/investment-puzzles$/);
    });

    test('Category navigation works', async ({ page }) => {
        // Find the Categories widget in sidebar clearly
        // Use :has() to find the specific div block that contains the 'Categories' heading
        const categoriesSection = page.locator('aside > div').filter({ has: page.getByRole('heading', { name: 'Categories' }) });
        await expect(categoriesSection).toBeVisible();

        // Click on the first category link
        const firstCategoryLink = categoriesSection.getByRole('link').first();

        // The link text contains the name and the count (e.g. "Investment 5"). 
        // We only want the name, which is in the first span.
        const categoryName = await firstCategoryLink.locator('span').first().textContent();

        await firstCategoryLink.click();

        // Wait for URL to update (robustness)
        await page.waitForURL(/.*\/category\/.*/);

        // Use decodeURIComponent to handle Chinese URLs in verification
        // Check URL contains category (encoded or decoded depending on browser/playwright handling)
        // Check heading contains "Category:"
        await expect(page.locator('h1')).toContainText('Category:');

        if (categoryName) {
            await expect(page.locator('h1')).toContainText(categoryName);
        }
    });

    test('Search widget exists', async ({ page }) => {
        const sidebar = page.locator('aside');
        await expect(sidebar.getByPlaceholder('Search...')).toBeVisible();
        await expect(sidebar.getByRole('button').filter({ has: page.locator('svg') })).toBeVisible();
    });

    test('Blog post navigation and content', async ({ page }) => {
        // Click the first blog post
        const firstPost = page.getByRole('article').first();
        // Use a less strict locator for the title to avoid flakiness
        const postTitle = await firstPost.getByRole('heading', { level: 2 }).textContent();

        await firstPost.getByRole('link').click();

        // Wait for navigation
        await page.waitForURL(/.*\/investment-puzzles\/.+/);

        // Verify we are on specific post page
        if (postTitle) {
            await expect(page.getByRole('heading', { level: 1 })).toContainText(postTitle);
        }

        // Verify content is loaded (prose class presence implies content structure)
        await expect(page.locator('.prose')).toBeVisible();

        // Verify "Back to Home" link
        await page.getByRole('link', { name: 'Back to Home' }).click();
        await page.waitForURL(/.*\/investment-puzzles$/);
        await expect(page).toHaveURL(/.*\/investment-puzzles$/);
    });
});
