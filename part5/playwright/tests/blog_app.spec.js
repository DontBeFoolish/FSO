const { test, expect, beforeEach, describe } = require('@playwright/test')
import { login, createBlog, likeBlog } from './helpers'


describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'DontBeFoolish',
        username: '418',
        password: 'test'
      }
    })
    await page.goto('/')
  })
  test('Login form is shown', async ({ page }) => {
    await expect(page.getByLabel('Username:')).toBeVisible()
    await expect(page.getByLabel('Password:')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })
  test('Good login succeeds', async ({ page }) => {
    await login(page, '418', 'test')
    await expect(page.getByText('DontBeFoolish')).toBeVisible()
  })
  test('Bad login fails', async ({ page }) => {
    await login(page, 'bad', 'creds')
    await expect(page.locator('.error')).toContainText('invalid credentials')
  })

  describe('While logged in', () => {
    beforeEach(async ({ page }) => {
      await login(page, '418', 'test')
    })
    test('new blog can be created', async ({ page }) => {
      await createBlog(page, 'new blog', 'author', 'google.com')
      await expect(page.locator('.blog')).toBeVisible()
      await expect(page.locator('.success')).toContainText('successfully added blog')
    })
    test('blog can be liked', async ({ page }) => {
      await createBlog(page, 'new blog', 'author', 'google.com')
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.locator('.likes')).toHaveText('1')
    })
    test('blog can be deleted', async ({ page }) => {
      await createBlog(page, 'new blog', 'author', 'google.com')
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'delete' }).click()
      await expect(page.locator('.success')).toHaveText('removed blog')
      await expect(page.locator('.blog')).toHaveCount(0)
    })
    test('only owner can see delete button', async ({ page, request }) => {
      await request.post('/api/users', {
        data: {
          name: 'user2',
          username: 'user2',
          password: 'test'
        }
    })
      await createBlog(page, 'new blog', 'author', 'google.com')
      await page.getByRole('button', { name: 'logout' }).click()
      await login(page, 'user2', 'test')
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.locator('#delete')).toHaveCount(0)
    })
    test('blogs are sorted in descending order', async ({ page }) => {
      await createBlog(page, 'blog1', 'author1', 'facebook.com')
      await createBlog(page, 'blog2', 'author2', 'apple.com')
      await createBlog(page, 'blog3', 'author3', 'google.com')
      await likeBlog(page, 'blog2')
      await likeBlog(page, 'blog2')
      await likeBlog(page, 'blog2')
      await likeBlog(page, 'blog3')

      const blogs = await page.locator('.blog').all()
      await expect(blogs[0]).toContainText('blog2')
      await expect(blogs[1]).toContainText('blog3')
    })
  })
})