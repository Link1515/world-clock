import { test, expect } from '@playwright/test';

test.describe('World Clock App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display user timezone clock by default', async ({ page }) => {
    // 檢查是否至少有一個時鐘卡片
    await expect(page.locator('.card-content')).toHaveCount(1);
  });

  test('basic clock operations', async ({ page }) => {
    // 1. 點擊新增時鐘按鈕
    await page.click('.create-clock-btn');
    
    // 2. 在搜尋框中輸入並選擇時區
    await page.fill('.search-input', 'Tokyo');
    await page.click('.result:has-text("Asia/Tokyo")');
    await page.click('button:has-text("Add")');
    
    // 3. 確認新時鐘已添加
    await expect(page.locator('.card-content')).toHaveCount(2);
    await expect(page.locator('.card-content:has-text("Asia/Tokyo")')).toBeVisible();

    // 4. 切換到編輯模式
    await page.click('.setting-btn');

    // 5. 刪除東京時鐘
    await page.click('.card-content:has-text("Asia/Tokyo") .remove-btn');
    await page.click('.box:has-text("Asia/Tokyo") .confirm-remove-btn');
    
    // 6. 確認時鐘已被刪除
    await expect(page.locator('.card-content')).toHaveCount(1);
    await expect(page.locator('.card-content:has-text("Asia/Tokyo")')).not.toBeVisible();
  });

  test('hour format switching', async ({ page }) => {
    // 1. 點擊切換時間格式按鈕
    await page.click('.toggle-hour-display-btn');
    
    // 2. 確認時間格式已切換到 12 小時制
    await expect(page.locator('.toggle-hour-display-btn:has-text("12")')).toBeVisible();
    
    // 3. 檢查時間格式是否包含 AM/PM
    const timeText = await page.locator('.card-content .title').textContent();
    expect(timeText).toMatch(/(AM|PM)/);
  });

  test('theme switching', async ({ page }) => {
    // 1. 點擊主題切換按鈕
    await page.click('.toggle-theme-btn');
    
    // 2. 確認主題已切換
    await expect(page.locator('html[data-theme="dark"]')).toBeVisible();
  });
});