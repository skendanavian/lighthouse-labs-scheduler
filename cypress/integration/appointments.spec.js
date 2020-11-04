describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");

    cy.visit("/");

    cy.contains("Monday");
  });

  it("should book an interview", () => {
    cy.get("[alt=Add]").first().click();
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    cy.get("[alt='Sylvia Palmer']").click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    cy.contains(".appointment__card--show", "Archie Cohen");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
    cy.get("[alt=Edit]").first().click({ force: true });
    cy.get("[alt='Tori Malcolm']").click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Archie Cohen");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should book an interview", () => {
    cy.contains(".appointment__card--show", "Archie Cohen");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
    cy.get("[alt=Delete]").first().click({ force: true });
    cy.contains("Confirm").click();
    cy.contains("Cancelling");
    cy.get("Cancelling").should("not.exist");
    cy.get(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});
