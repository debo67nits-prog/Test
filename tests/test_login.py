import pytest
from playwright.sync_api import Page, expect
from login_page import LoginPage

@pytest.mark.parametrize("username,password", [("validUser","ValidPass123!")])
def test_login_with_valid_credentials(page: Page, username: str, password: str):
    page.goto("https://www.saucedemo.com/")
    login = LoginPage(page)
    login.enter_username(username)
    login.enter_password(password)
    login.click_login()
    # Verify redirection to inventory page
    expect(page).to_have_url("https://www.saucedemo.com/inventory.html")
    # Verify that the inventory container is visible
    expect(page.get_by_text("Products")).to_be_visible()