describe("SignIn Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display validation errors when submitting empty form", () => {
    cy.get("button[type='submit']").click();
    cy.contains("Email is required!").should("be.visible");
    cy.contains("Password is required!").should("be.visible");
  });

  it("should show an error for invalid credentials", () => {
    cy.get("input[name='email']").type("wrong@example.com");
    cy.get("input[name='password']").type("wrongpassword");
    cy.get("button[type='submit']").click();
    cy.contains("Invalid credentials").should("be.visible");
  });

  it("should log in successfully with valid credentials", () => {
    cy.get("input[name='email']").type("test@example.com");
    cy.get("input[name='password']").type("password");
    cy.get("button[type='submit']").click();

    // Ensure redirection to store page
    cy.url().should("include", "/store");
    cy.window().its("localStorage.isAuthenticated").should("eq", "true");
  });

  it("should toggle password visibility", () => {
    cy.get("input[name='password']").should("have.attr", "type", "password");
    cy.get("[data-cy=toggle-password]").click();
    cy.get("input[name='password']").should("have.attr", "type", "text");
  });
});
