import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import loginData from '../test-data/loginData.json';

test.describe('Login Tests', () => {

  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    await loginPage.navigate();
  });

  test('Verify login page is displayed', async ({ page }) => {

    await expect(page).toHaveURL(/login/);

    await expect(loginPage.usernameInput).toBeVisible();

    await expect(loginPage.passwordInput).toBeVisible();

    await expect(loginPage.loginButton).toBeVisible();

  });

  test('Login with valid credentials', async ({ page }) => {

    await loginPage.login(
      loginData.validUser.username,
      loginData.validUser.password
    );

    await expect(page).toHaveURL(/dashboard/);

    await expect(
      page.getByRole('heading', { name: 'Dashboard' })
    ).toBeVisible();

  });

  test('Login with invalid credentials', async () => {

    await loginPage.login(
      loginData.invalidUser.username,
      loginData.invalidUser.password
    );

    await expect(loginPage.errorMessage).toBeVisible();

  });

  test('Verify username field is mandatory', async () => {

    await loginPage.enterUsername('');

    await loginPage.enterPassword(
      loginData.validUser.password
    );

    await loginPage.clickLogin();

    await expect(
      loginPage.usernameInput
    ).toHaveAttribute('required', '');

  });

  test('Verify password field is mandatory', async () => {

    await loginPage.enterUsername(
      loginData.validUser.username
    );

    await loginPage.enterPassword('');

    await loginPage.clickLogin();

    await expect(
      loginPage.passwordInput
    ).toHaveAttribute('required', '');

  });

  test('Verify Forgot Password link', async ({ page }) => {

    await expect(
      loginPage.forgotPasswordLink
    ).toBeVisible();

    await loginPage.forgotPasswordLink.click();

    await expect(page).toHaveURL(/forgot-password/);

  });

});