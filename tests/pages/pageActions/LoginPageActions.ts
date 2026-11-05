import { expect, type Page } from '@playwright/test';
import { LoginPageObjects } from '../pageObjects/LoginPageObjects';

/**
 * Interactions with the login screen.
 * Locators live in {@link LoginPageObjects}.
 */
export class LoginPageActions {
  readonly page: Page;
  private readonly login: LoginPageObjects;

  constructor(page: Page) {
    this.page = page;
    this.login = new LoginPageObjects(page);
  }

  async goto(baseURL: string) {
    await this.page.goto(baseURL);
  }

  async loginAs(username: string, password: string) {
    await this.login.usernameInput.fill(username);
    await this.login.passwordInput.fill(password);
    await this.login.submitButton.click();
  }

  async expectLoginError(message?: string | RegExp) {
    await expect(this.login.errorMessage).toBeVisible();
    if (message) {
      await expect(this.login.errorMessage).toHaveText(message);
    }
  }
}
