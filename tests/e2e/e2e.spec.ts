import { test, expect } from '@playwright/test'

test.describe('ログイン後', () => {
  test.use({ storageState: 'authenticatedState.json' })

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000')
    // await page.waitForTimeout(3000)
    // await page.screenshot({ path: 'screenshot.png', fullPage: true })
  })

  // test('リストの登録', async ({ page }) => {})

  test('タスクの登録', async ({ page }) => {
    await expect(page.locator('data-testid=search')).not.toBeVisible()
    const createTaskButton = await page.locator(
      'data-testid=create-task-button'
    )
    await expect(createTaskButton).toHaveText('タスクを登録する')
    await createTaskButton.click()

    await page.locator('data-testid=search-input').fill('ダークナイト')
    await expect(page.locator('data-testid=search-results')).toBeVisible()
    await page.locator('data-testid=search-result >> nth=0').click()

    await page.locator('data-testid=task-list >> nth=0').click()
    await expect(page.locator('data-testid=task-title >> nth=0')).toHaveText(
      'ダークナイト ライジング'
    )
    await expect(page.locator('data-testid=task-notes >> nth=0')).toHaveText(
      'Netflix 164分'
    )
  })
})