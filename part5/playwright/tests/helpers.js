import { expect } from "@playwright/test"

const login = async (page, username, password) => {
  await page.getByLabel('Username:').fill(username)
  await page.getByLabel('Password:').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, uri) => {
  await page.getByRole('button', { name: 'create blog' }).click()
  await page.getByLabel('Title:').fill(title)
  await page.getByLabel('Author:').fill(author)
  await page.getByLabel('URL:').fill(uri)
  await page.getByRole('button', { name: 'Create' }).click()
  await page.getByText(title).waitFor()
}

const likeBlog = async (page, title) => {
  const blog = page.getByText(title).locator('..')
  await blog.getByRole('button', { name: 'view' }).click()

  const likes = blog.locator('.likes')
  const before = Number(await likes.textContent())
  
  await blog.getByRole('button', { name: 'like' }).click()
  await expect(likes).toHaveText(String(before + 1))
  await blog.getByRole('button', { name: 'hide' }).click()
}

export {
  login,
  createBlog,
  likeBlog,
}
