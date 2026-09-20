from playwright.sync_api import Page, expect

class LoginPage:
    def __init__(self, page: Page):
        self.page = page
        self.username_input = page.get_by_placeholder("Username")
        self.password_input = page.get_by_placeholder("Password")
        self.login_button = page.get_by_role("button", name="Login")

    def enter_username(self, username: str):
        self.username_input.fill(username)
        expect(self.username_input).to_have_value(username)

    def enter_password(self, password: str):
        self.password_input.fill(password)
        expect(self.password_input).to_have_value(password)

    def click_login(self):
        self.login_button.click()