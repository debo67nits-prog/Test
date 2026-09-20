import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  // Locators
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly forgotPasswordLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.getByLabel('Username');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.getByText('Invalid username or password');
    this.forgotPasswordLink = page.getByRole('link', {
      name: 'Forgot Password'
    });
  }

  // Navigate to login page
  async navigate(): Promise<void> {
    await this.page.goto('/login');
  }

  // Enter username
  async enterUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  // Enter password
  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  // Click login button
  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  // Complete login
  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }
}